'use strict';
function movementFamily(m){const known=MOVES[m?.id]||Object.values(MOVES).find(x=>x.name===m?.name),key=known?.family;return key?[key,MOVEMENT_FAMILIES[key].label]:['move-'+(m?.id||m?.name),m?.name||'Custom movement'];}
function groupedChoices(choices){const groups=new Map();for(const m of choices){const [key,label]=movementFamily(m),id=m.group+':'+key;if(!groups.has(id))groups.set(id,{id,label,group:m.group,choices:[]});groups.get(id).choices.push(m);}return [...groups.values()];}
function renderChoiceFamilies(choices,renderRow){return groupedChoices(choices).map(f=>f.choices.length===1?renderRow(f.choices[0]):`<details class="exercise-family" data-exercise-family><summary><span><strong data-no-i18n>${esc(f.label)}</strong><small>${esc(MUSCLE_GROUPS[f.group])} · <span data-family-count>${f.choices.length}</span> ${esc(message('variants'))}</small></span><span class="family-open-label">View variants</span></summary><div class="family-variants">${f.choices.map(renderRow).join('')}</div></details>`).join('');}
function movementFunction(m){if(!m)return '';const family=movementFamily(m)[0];if(['floor-press','chest-press','pushup'].includes(family)&&moveGroup(m)==='press')return 'horizontal press';if(['pulldown'].includes(family)||m.pattern==='vertical pull')return 'vertical pull';return family;}
function sameMovement(a,b){return !!a&&!!b&&moveGroup(a)===moveGroup(b)&&movementFunction(a)===movementFunction(b);}
function techniqueLevel(m){return MOVES[m?.id]?.skillLevel||Object.values(MOVES).find(x=>x.name===m?.name)?.skillLevel||2;}
function plannedCircuit(d,p){
 const plan=p.schedule[d];if(!plan||plan.type==='Rest')return [];const used=new Set(),families=[];
 return PRESETS[plan.type].map((ids,i)=>{
  const custom=plan.custom?.[i],group=moveGroup(custom?.main)||MOVES[ids[0]].group;
  if(!custom&&group==='core'&&p.experience==='beginner')ids=['deadbug','plank','birddog'];
  const base=ids.map(id=>MOVES[id]).filter(Boolean),preferred=new Set(base.map(m=>movementFunction(m)));
  let candidates=Object.values(MOVES).filter(m=>m.group===group&&!m.retired&&!m.libraryAlias&&allowed(m,p)&&!used.has(m.name));
  if(custom){const chosen=[custom.main,custom.alt].map(reviewedMovement).filter(m=>m&&allowed(m,p)&&!used.has(m.name));candidates=[...chosen,...candidates];}
  else{
   const exp=p.experience||'intermediate',cap=exp==='beginner'?2:exp==='intermediate'?3:5;
   const manageable=candidates.filter(m=>techniqueLevel(m)<=cap&&(m.loadDependent||exp!=='beginner'||m.challenge<=2));if(manageable.length)candidates=manageable;
   const target=exp==='beginner'?1:exp==='advanced'?4:3;
   candidates.sort((a,b)=>{
    const score=m=>Number(!preferred.has(movementFunction(m)))*1000+Number(families.includes(movementFunction(m)))*250+Number(!m.loadDependent)*35+(m.loadDependent?techniqueLevel(m)*2:Math.abs(m.challenge-target)*10)+(ids.includes(m.id)?ids.indexOf(m.id):40);
    return score(a)-score(b);
   });
  }
  const main=candidates[0];if(main){used.add(main.name);families.push(movementFunction(main));}
  const alt=candidates.find(m=>m.name!==main?.name&&sameMovement(main,m));return {main:main?clone(reviewedMovement(main)):null,alt:alt?clone(reviewedMovement(alt)):null};
 });
}
function workoutDistribution(rows=currentCircuit()){const counts=new Map();for(const r of rows)if(r.main){const label=groupLabel(r.main);counts.set(label,(counts.get(label)||0)+1);}return [...counts].map(([group,count])=>message('{count} × {group}',{count,group:translateText(group)})).join(' · ');}
function pullingLimit(rows=currentCircuit()){return rows.some(r=>moveGroup(r.main)==='back')&&!rows.some(r=>['row','vertical pull'].includes(movementFunction(r.main)))?'Without rowing or pulling equipment, these back exercises mainly train control; they do not replace loaded rows or pulldowns.':'';}
function workoutSelectionNote(rows=currentCircuit()){const note=pullingLimit(rows);return `${note?`<p class="small muted selection-note">${esc(note)}</p>`:''}${rows.some(r=>techniqueLevel(r.main)>=4)?'<p class="small muted selection-note">Technical lifts: use a technique you already know and allow extra rest. They train several muscle groups.</p>':''}`;}
function recommendedChoices(main,choices){const result=[],seen=new Set();for(const m of choices){if(!sameMovement(main,m))continue;const key=movementFamily(m)[0]+':'+m.equipment.join(':');if(seen.has(key))continue;seen.add(key);result.push(m);if(result.length===3)break;}return result;}

function renderPickerChoices(choices,main,renderRow){const suggested=recommendedChoices(main,choices),ids=new Set(suggested.map(m=>m.name));return `${suggested.length?`<section class="suggested-exercises" data-suggested><h3>Suggested alternatives</h3><p class="small muted">The same movement, matched to your available equipment. Adjust the weight to suit you.</p>${suggested.map(renderRow).join('')}</section>`:''}<h3 class="all-exercises-label">All other alternatives</h3>${renderChoiceFamilies(choices.filter(m=>!ids.has(m.name)),renderRow)}`;}
