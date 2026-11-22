'use strict';
function movementFamily(m){const known=MOVES[m?.id]||Object.values(MOVES).find(x=>x.name===m?.name),key=known?.family;return key?[key,MOVEMENT_FAMILIES[key].label]:['move-'+(m?.id||m?.name),m?.name||'Custom movement'];}
function groupedChoices(choices){const groups=new Map();for(const m of choices){const [key,label]=movementFamily(m),id=m.group+':'+key;if(!groups.has(id))groups.set(id,{id,label,group:m.group,choices:[]});groups.get(id).choices.push(m);}return [...groups.values()];}
function renderChoiceFamilies(choices,renderRow){return groupedChoices(choices).map(f=>f.choices.length===1?renderRow(f.choices[0]):`<details class="exercise-family" data-exercise-family><summary><span><strong data-no-i18n>${esc(f.label)}</strong><small>${esc(MUSCLE_GROUPS[f.group])} · <span data-family-count>${f.choices.length}</span> ${esc(message('variants'))}</small></span><span class="family-open-label">View variants</span></summary><div class="family-variants">${f.choices.map(renderRow).join('')}</div></details>`).join('');}
function movementFunction(m){if(!m)return '';const family=movementFamily(m)[0];if(['floor-press','chest-press','pushup'].includes(family)&&moveGroup(m)==='press')return 'horizontal press';if(['pulldown'].includes(family)||m.pattern==='vertical pull')return 'vertical pull';return family;}
function sameMovement(a,b){return !!a&&!!b&&moveGroup(a)===moveGroup(b)&&movementFunction(a)===movementFunction(b);}
function techniqueLevel(m){return MOVES[m?.id]?.skillLevel||Object.values(MOVES).find(x=>x.name===m?.name)?.skillLevel||2;}
function plannedCircuit(d,p){
 const plan=p.schedule[d];if(!plan||plan.type==='Rest')return [];const used=new Set(),families=[];
 // History makes the next selection different while previews/reloads stay stable.
 // Only comparable workouts affect the rotation; saved custom routines keep priority.
 const lastUsed=new Map();let occurrence=0;
 for(const h of p.history||[])if(h.type===plan.type){occurrence++;for(const e of h.repEntries||[])lastUsed.set(e.name,occurrence);}
 return PRESETS[plan.type].map((ids,i)=>{
  const custom=plan.custom?.[i],group=moveGroup(custom?.main)||MOVES[ids[0]].group;
  if(!custom&&group==='core'&&p.experience==='beginner')ids=['deadbug','plank','birddog'];
  const base=ids.map(id=>MOVES[id]).filter(Boolean),preferred=new Set(base.map(m=>movementFunction(m)));
  let candidates=Object.values(MOVES).filter(m=>m.group===group&&!m.retired&&!m.libraryAlias&&allowed(m,p)&&!used.has(m.name));
  if(custom){const chosen=[custom.main,custom.alt].map(reviewedMovement).filter(m=>m&&allowed(m,p)&&!used.has(m.name));candidates=[...chosen,...candidates];}
  else{
   const exp=p.experience||'intermediate',cap=exp==='beginner'?2:exp==='intermediate'?3:5;
   const manageable=candidates.filter(m=>techniqueLevel(m)<=cap&&(m.loadDependent||exp!=='beginner'||m.challenge<=2));if(manageable.length)candidates=manageable;
   // Keep the primary training function when available (e.g. a loaded row,
   // rather than rotating to a back-control drill simply because it is unused).
   const primary=movementFunction(base[0]);
   if(candidates.some(m=>movementFunction(m)===primary)){preferred.clear();preferred.add(primary);}
   // Rotate core work through regular trunk work, farmer, suitcase and marches.
   // Filters still win, and saved custom circuits bypass this automatic choice.
   const coreFamily=[null,'farmer','suitcase','march'][occurrence%4];
   if(group==='core'&&coreFamily&&candidates.some(m=>movementFamily(m)[0]===coreFamily)){
    preferred.clear();preferred.add(coreFamily);
   }
   if(group==='biceps'){
    const armFamilies=['curl','hammer-curl','reverse-curl','supported-curl'].filter(f=>candidates.some(m=>movementFamily(m)[0]===f));
    if(armFamilies.length){preferred.clear();preferred.add(armFamilies[occurrence%armFamilies.length]);}
   }
   const target=exp==='beginner'?1:exp==='advanced'?4:3;
   candidates.sort((a,b)=>{
    const score=m=>Number(!preferred.has(movementFunction(m)))*1000+Number(families.includes(movementFunction(m)))*250+Number(!m.loadDependent)*35+(m.loadDependent?techniqueLevel(m)*2:Math.abs(m.challenge-target)*10)+(ids.includes(m.id)?ids.indexOf(m.id):40);
    return Number(!preferred.has(movementFunction(a)))-Number(!preferred.has(movementFunction(b)))
     ||Number(families.includes(movementFunction(a)))-Number(families.includes(movementFunction(b)))
     ||(lastUsed.get(a.name)||0)-(lastUsed.get(b.name)||0)
     ||score(a)-score(b);
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

let surpriseUndo=null;
function surpriseRows(rows,p=profile(),slot=null,rng=Math.random){
 const next=clone(rows),seen=new Set((p.history||[]).flatMap(h=>(h.repEntries||[]).filter(e=>e.count>0).map(e=>e.name)));
 const cap={beginner:2,intermediate:3,advanced:5}[p.experience||'intermediate'];
 for(let i=0;i<next.length;i++){
  if(slot!==null&&i!==slot)continue;
  const current=rows[i].main;if(!current)continue;
  const occupied=new Set(next.filter((_,n)=>n!==i).map(r=>r.main?.name));
  const candidates=Object.values(MOVES).filter(m=>!m.retired&&!m.libraryAlias&&m.group===moveGroup(current)&&allowed(m,p)&&techniqueLevel(m)<=cap&&(p.experience!=='beginner'||m.loadDependent||m.challenge<=2)&&!occupied.has(m.name)&&m.name!==current.name);
  const pools=[candidates.filter(m=>!seen.has(m.name)&&sameMovement(current,m)),candidates.filter(m=>!seen.has(m.name)),candidates.filter(m=>sameMovement(current,m)),candidates];
  const pool=pools.find(items=>items.length);if(!pool)continue;
  const chosen=pool[Math.min(pool.length-1,Math.max(0,Math.floor(rng()*pool.length)))];
  next[i]={main:clone(reviewedMovement(chosen)),alt:clone(current)};
 }
 return next;
}
function surpriseWorkout(slot=null){
 if(hasActive())return;
 const p=profile(),rows=currentCircuit(),next=surpriseRows(rows,p,slot);
 if(next.every((r,i)=>r.main?.name===rows[i].main?.name)){toast('No other exercises match your equipment and level.');return;}
 surpriseUndo={profile:p.id,day,rows:clone(rows)};
 if(p.workoutOverrides?.date!==localDate())p.workoutOverrides={date:localDate(),slots:{}};
 p.workoutOverrides.slots[day]=next;persist();render();
 if(slot!==null)openExercisePicker(slot);
 toast('New exercises selected. Your saved routine is unchanged.');
}
function undoSurprise(){
 if(hasActive()||surpriseUndo?.profile!==profile().id||surpriseUndo.day!==day)return;
 profile().workoutOverrides={date:localDate(),slots:{...(profile().workoutOverrides?.date===localDate()?profile().workoutOverrides.slots:{}),[day]:clone(surpriseUndo.rows)}};
 surpriseUndo=null;persist();render();
}
function surpriseControls(){return `<div class="surprise-controls"><button data-action="surprise-workout" ${hasActive()?'disabled':''} title="Prefer exercises you have not logged yet, matched to your equipment and level.">Surprise me</button>${surpriseUndo?.profile===profile().id&&surpriseUndo.day===day?`<button class="text-button" data-action="undo-surprise" ${hasActive()?'disabled':''}>Undo surprise</button>`:''}</div>`;}
document.addEventListener('click',event=>{const b=event.target.closest?.('[data-action]');if(!b||b.disabled)return;const action=b.dataset.action;if(action==='surprise-workout')surpriseWorkout();if(action==='surprise-slot')surpriseWorkout(Number(b.dataset.i));if(action==='undo-surprise')undoSurprise();});
