const assert=require('node:assert/strict'),{harness}=require('./release.cjs');
(async()=>{
 const h=harness();await h.run('bootReady');const {run}=h;
 run('profile().onboardingComplete=true;profile().session=null;profile().bans=[];profile().dumbbellCount=2;profile().kettlebellCount=2');
 for(const experience of ['beginner','intermediate','advanced'])for(const equipment of [['Bodyweight'],['Bodyweight','Dumbbells'],['Bodyweight','Kettlebells'],['Bodyweight','Resistance Bands','Band Anchor'],run('EQUIPMENT.slice()')])for(const type of ['Push','Pull','Lower','Full Body']){
  Object.assign(h.context,{experience,equipment,type});
  run('profile().experience=experience;profile().equipment=equipment;profile().history=[];profile().schedule=[{type,custom:null}];profile().workoutOverrides=null;profile().session=null;profile().rotationIndex=0;day=0');
  let previous;
  for(let n=0;n<6;n++){
   const rows=run('circuit()'),names=rows.map(r=>r.main.name);
   assert.equal(new Set(names).size,5);
   assert(run('circuit().every(r=>allowed(r.main))'));
   if(equipment.includes('Dumbbells')||equipment.includes('Kettlebells')){
    if(type==='Pull')assert.equal(rows[0].main.pattern,'row');
    if(type==='Full Body')assert.equal(rows[2].main.pattern,'row');
   }
   if(experience==='beginner')assert(run('circuit().every(r=>techniqueLevel(r.main)<=2)'));
   if(previous)assert.notDeepEqual(names,previous,`${experience}/${equipment}/${type}: repeated circuit`);
   assert.deepEqual(run('circuit()').map(r=>r.main.name),names,'preview remains stable');
   // Save real sessions, including zero-count exercises, to drive the next selection.
   run('start()');assert.deepEqual(run('currentCircuit()').map(r=>r.main.name),names);
   h.advance(1200000);run('finish(activeSession())');previous=names;
  }
 }
 // Actual storage reload and backup import preserve the next selection.
 const expected=run('circuit().map(r=>r.main.name)'),raw=run('JSON.stringify(state)');
 const restored=harness({'daily-reps-engine-v2':raw});await restored.run('bootReady');
 assert.deepEqual(Array.from(restored.run('circuit(0).map(r=>r.main.name)')),Array.from(expected));
 h.context.payload=run('JSON.stringify(backupPayload())');
 assert.deepEqual(Array.from(run('plannedCircuit(0,decodeBackup(payload).profiles[0]).map(r=>r.main.name)')),Array.from(expected));
 // Custom routines remain fixed across completion and active circuits never reshuffle.
 run('profile().schedule[0].custom=clone(circuit());profile().session=null');
 const custom=run('circuit().map(r=>r.main.name)');run('start()');h.advance(1200000);run('finish(activeSession())');
 assert.deepEqual(run('circuit().map(r=>r.main.name)'),custom);
 run('profile().schedule[0].custom=null;profile().session=null;start()');
 const active=run('currentCircuit().map(r=>r.main.name)');
 run('profile().history.push(clone(profile().history.at(-1)))');
 assert.deepEqual(run('currentCircuit().map(r=>r.main.name)'),active);
 // Restrictive filters still win over variety, even when only one option remains per slot.
 run('profile().session=null;profile().schedule=[{type:"Full Body",custom:null}];profile().bans=Object.values(MOVES).filter(m=>!circuit().some(r=>r.main.name===m.name)).map(m=>"move:"+m.id)');
 assert(run('circuit().every(r=>r.main&&allowed(r.main))'));
 console.log('PASS: six successive workouts across 60 equipment/level/type combinations; stable preview, real saves, reload/backup, custom routines, active sessions and restrictive filters.');
})().catch(e=>{console.error(e);process.exit(1)});
