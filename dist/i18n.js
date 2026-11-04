'use strict';
// Translate presentation only: movement IDs, stored names, equipment values and logs remain canonical.
const APP_LANGUAGES={en:'English',nl:'Nederlands',de:'Deutsch',es:'Español',fr:'Français',it:'Italiano'};
const LANGUAGE_LOCALES={en:'en-GB',nl:'nl-NL',de:'de-DE',es:'es-ES',fr:'fr-FR',it:'it-IT'};
const LANGUAGE_KEY='daily-reps-language';
let rememberedLanguage='en';try{const saved=localStorage.getItem(LANGUAGE_KEY);if(Object.hasOwn(APP_LANGUAGES,saved))rememberedLanguage=saved;}catch{}
const translatedNodes=new WeakMap(),translatedAttributes=new WeakMap(),searchSources=new WeakMap(),phraseMatchers={};
function currentLanguage(){return Object.hasOwn(APP_LANGUAGES,state.language)?state.language:rememberedLanguage;}
function languageLocale(){return LANGUAGE_LOCALES[currentLanguage()];}
function languageChosen(){return Object.hasOwn(APP_LANGUAGES,state.language)||(()=>{try{return Object.hasOwn(APP_LANGUAGES,localStorage.getItem(LANGUAGE_KEY));}catch{return false;}})();}
function translationPack(){return (globalThis.DAILY_REPS_TRANSLATIONS||{})[currentLanguage()]||{};}
function translateText(value){
 const text=String(value??''),pack=translationPack();if(currentLanguage()==='en'||!text.trim())return text;
 const trimmed=text.trim();if(Object.prototype.hasOwnProperty.call(pack,trimmed))return text.replace(trimmed,pack[trimmed]);
 const lang=currentLanguage();if(!phraseMatchers[lang]){const keys=Object.keys(pack).filter(k=>/[A-Za-z]/.test(k)&&k.length>1).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));phraseMatchers[lang]=new RegExp('(?<![\\p{L}\\p{N}_])(?:'+keys.join('|')+')(?![\\p{L}\\p{N}_])','gu');}
 return text.replace(phraseMatchers[lang],word=>pack[word]??word);
}
function translateDOM(root=document.body){
 if(!root||!document.createTreeWalker)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
 while((n=walker.nextNode())){if(n.parentElement?.closest('script,style,textarea,[data-no-i18n]'))continue;const old=translatedNodes.get(n),source=old&&n.nodeValue===old.output?old.source:n.nodeValue,output=translateText(currentLanguage()!=='en'&&n.parentElement?.tagName==='BUTTON'&&source.trim()==='Back'?'Go back':source);translatedNodes.set(n,{source,output});if(n.nodeValue!==output)n.nodeValue=output;}
 for(const el of root.querySelectorAll('[aria-label],[placeholder],[title],[alt],option,[data-search]')){
  if(el.closest('[data-no-i18n]'))continue;
  // A translated option must never change the value submitted by a form.
  if(el.tagName==='OPTION'&&!el.hasAttribute('value')){const old=translatedNodes.get(el.firstChild);el.setAttribute('value',old?.source??el.textContent);}
  let saved=translatedAttributes.get(el);if(!saved){saved={};translatedAttributes.set(el,saved);}
  for(const attr of ['aria-label','placeholder','title','alt'])if(el.hasAttribute(attr)){const value=el.getAttribute(attr),old=saved[attr],source=old&&value===old.output?old.source:value,output=translateText(source);saved[attr]={source,output};if(value!==output)el.setAttribute(attr,output);}
  if(el.hasAttribute('data-search')){const value=el.getAttribute('data-search');let base=searchSources.get(el);if(!base){base=el.getAttribute('data-search-source')||value;searchSources.set(el,base);}const translated=translateText(base);el.setAttribute('data-search',norm(base+' '+translated));}
 }
 if(document.documentElement)document.documentElement.lang=currentLanguage();
 document.title=translateText('Daily Reps — 20-minute workouts');
 const description=document.querySelector('meta[name="description"]');if(description)description.setAttribute('content',translateText('20-minute circuits with equipment filters, rep tracking and rolling or fixed schedules.'));
}
function chooseLanguage(code){if(!Object.hasOwn(APP_LANGUAGES,code))return;rememberedLanguage=code;state.language=code;try{localStorage.setItem(LANGUAGE_KEY,code);}catch{}persist();translateDOM();}
function languageSelector(){return `<section class="section language-settings"><h2>Language</h2><label for="app-language">App language</label><select id="app-language" data-language-selector data-no-i18n>${Object.entries(APP_LANGUAGES).map(([code,label])=>`<option value="${code}" ${currentLanguage()===code?'selected':''}>${label}</option>`).join('')}</select></section>`;}
function languageSetup(){return `<section class="onboarding language-setup"><div class="setup-heading"><span class="eyebrow">WELCOME TO DAILY REPS · 1 / 6</span><h1>Choose your language</h1><p class="muted">You can change this later in Settings.</p></div><section class="section"><div class="language-choices" role="group" aria-label="App language">${Object.entries(APP_LANGUAGES).map(([code,label])=>`<button data-action="choose-language" data-code="${code}" data-no-i18n aria-pressed="${currentLanguage()===code}" class="${currentLanguage()===code?'selected':''}">${label}</button>`).join('')}</div><button class="primary" data-action="language-continue">Continue</button></section></section>`;}
document.addEventListener('change',e=>{if(e.target.matches?.('[data-language-selector]')){chooseLanguage(e.target.value);render();}});
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-action]');if(!b)return;if(b.dataset.action==='choose-language'){chooseLanguage(b.dataset.code);document.querySelectorAll('[data-action="choose-language"]').forEach(el=>{const selected=el.dataset.code===currentLanguage();el.setAttribute('aria-pressed',selected);el.classList.toggle('selected',selected);});}if(b.dataset.action==='language-continue'){chooseLanguage(currentLanguage());render();}});
if(typeof MutationObserver!=='undefined'&&document.body){
 const observer=new MutationObserver(()=>{observer.disconnect();translateDOM();observer.observe(document.body,{childList:true,subtree:true,characterData:true});});
 observer.observe(document.body,{childList:true,subtree:true,characterData:true});
}

function movementSearchText(m){const fields=[m.name,MUSCLE_GROUPS[m.group]||'',m.pattern||''];return fields.concat(Object.values(globalThis.DAILY_REPS_TRANSLATIONS||{}).flatMap(pack=>fields.map(text=>pack[text]||text))).join(' ');}

let exclusionIndex=null;
function canonicalExclusion(value){
 if(!exclusionIndex){exclusionIndex=new Map();const fields=[...new Set([...Object.values(MOVES).flatMap(m=>[m.name,m.pattern]),...Object.values(MUSCLE_GROUPS),...EXCLUSION_SUGGESTIONS].filter(Boolean))];for(const text of fields)exclusionIndex.set(norm(text),text);for(const pack of Object.values(globalThis.DAILY_REPS_TRANSLATIONS||{}))for(const text of fields){const key=norm(pack[text]||'');if(key&&!exclusionIndex.has(key))exclusionIndex.set(key,text);}}
 return exclusionIndex.get(norm(value))||value;
}
