const assert=require('node:assert/strict'),{harness}=require('./release.cjs');
(async()=>{
 const h=harness();await h.run('bootReady');const {run}=h;
 run('profile().onboardingComplete=true;profile().session=null;profile().bans=[];profile().dumbbellCount=2;profile().kettlebellCount=2;profile().schedule=["Push","Pull","Lower","Full Body"].map(type=>({type,custom:null}))');
 for(const exp of ['beginner','intermediate','advanced'])for(const gear of [['Bodyweight'],['Bodyweight','Dumbbells'],['Bodyweight','Kettlebells'],['Bodyweight','Resistance Bands','Band Anchor'],run('EQUIPMENT.slice()')]){
  Object.assign(h.context,{exp,gear});run('profile().experience=exp;profile().equipment=gear');
  for(let d=0;d<4;d++){
   h.context.d=d;run('day=d');const before=run('JSON.stringify(circuit())');
   run('globalThis.randomRows=surpriseRows(circuit(),profile(),null,()=>.4)');
   assert(run('randomRows.every(r=>r.main&&allowed(r.main)&&techniqueLevel(r.main)<=({beginner:2,intermediate:3,advanced:5}[profile().experience]))'));
   assert.equal(run('new Set(randomRows.map(r=>r.main.name)).size'),5);assert.equal(run('JSON.stringify(circuit())'),before);
   assert(run('randomRows.every((r,i)=>r.main.group===circuit()[i].main.group)'));
   if(exp==='beginner')assert(run('randomRows.every(r=>r.main.loadDependent||r.main.challenge<=2)'));
   if(exp==='beginner')assert(!run('randomRows.some(r=>r.main.family==="rdl"&&/single-leg/i.test(r.main.name))'));
  }
 }
 run('day=1;profile().experience="beginner";profile().equipment=["Bodyweight","Dumbbells"];profile().history=[];globalThis.rows=circuit();globalThis.eligible=Object.values(MOVES).filter(m=>!m.retired&&!m.libraryAlias&&m.group==="biceps"&&allowed(m)&&techniqueLevel(m)<=2&&sameMovement(rows[3].main,m)&&m.name!==rows[3].main.name);globalThis.target=eligible.at(-1);profile().history=[{type:"Pull",repEntries:eligible.map(m=>({name:m.name,count:m.name===target.name?0:5}))}]');
 assert.equal(run('surpriseRows(rows,profile(),3,()=>0)[3].main.name'),run('target.name'),'prefer unlogged exercise over already logged alternatives');
 run('profile().history=[];profile().mode="rotation";profile().rotationIndex=0;profile().schedule=[{type:"Full Body",custom:null}];day=0;profile().workoutOverrides=null;profile().schedule[0].custom=clone(circuit());globalThis.originalNames=currentCircuit().map(r=>r.main.name);globalThis.saved=JSON.stringify(profile().schedule);surpriseWorkout()');
 assert.equal(run('JSON.stringify(profile().schedule)'),run('saved'));assert.notDeepEqual(run('currentCircuit().map(r=>r.main.name)'),run('originalNames'));
 const raw=run('JSON.stringify(state)'),restored=harness({'daily-reps-engine-v2':raw});await restored.run('bootReady');assert.deepEqual(Array.from(restored.run('currentCircuit().map(r=>r.main.name)')),Array.from(run('currentCircuit().map(r=>r.main.name)')));
 run('undoSurprise()');assert.deepEqual(run('currentCircuit().map(r=>r.main.name)'),run('originalNames'));
 run('start();addReps(0,5)');const session=run('JSON.stringify(activeSession())');run('surpriseWorkout();undoSurprise()');assert.equal(run('JSON.stringify(activeSession())'),session);
 assert(run('MOVES.squeezepress.retired'));assert(!run('libraryForGroup("press").some(m=>m.id==="squeezepress")'));
 const link=run('examplesLink(MOVES.dbpress)'),url=new URL(link.match(/href="([^"]+)"/)[1].replace(/&amp;/g,'&'));
 assert.equal(url.origin,'https://www.google.com');assert.equal(url.searchParams.get('tbm'),'vid');assert(url.searchParams.get('q').includes('Dumbbell Floor Press'));assert(link.includes('noopener noreferrer'));
 run('chooseLanguage("nl")');assert.equal(run('translateText("Push / Pull / Lower")'),'Push / Pull / Lower');assert.equal(run('translateText("Training structure")'),'Schema');
 assert(run('kettlebellQuantityControls(2,"setup").includes("Yes, matching pair")'));assert(run('equipmentCaption(MOVES["doublekb-frontsquat"]).includes("matching pair required")'));
 console.log('PASS: surprise selection across 60 configurations; novelty, expertise, filters, no duplicates, undo/reload and active-session protection; Google Video links, English workout labels, matching-pair wording and archived squeeze press.');
})().catch(e=>{console.error(e);process.exit(1)});
