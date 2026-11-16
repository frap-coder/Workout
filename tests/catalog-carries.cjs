const assert=require('node:assert/strict'),{harness}=require('./release.cjs');
(async()=>{
 const h=harness();await h.run('bootReady');const {run}=h;
 assert.equal(run('Object.values(MOVES).filter(m=>m.equipment.some(e=>ARCHIVED_EQUIPMENT.includes(e))).length'),10);
 assert(run('ARCHIVED_EQUIPMENT.every(e=>!EQUIPMENT.includes(e)&&!EXTENDED_GYM_EQUIPMENT.includes(e))'));
 run('profile().equipment=[...EQUIPMENT,...ARCHIVED_EQUIPMENT];profile().bans=[];profile().onboardingComplete=true;tab="Workout";day=0');
 assert(run('Object.values(MOVES).filter(m=>m.equipment.some(e=>ARCHIVED_EQUIPMENT.includes(e))).every(m=>m.retired&&!allowed(m))'));
 run('setupDraft=draftForProfile()');assert(!run('equipmentStep()').includes('Preacher Bench'));assert(!run('settings()').includes('data-value="Landmine Attachment"'));
 for(const type of ['Pull','Full Body'])for(const gear of ['Dumbbells','Kettlebells']){
  Object.assign(h.context,{type,gear});run('profile().history=[];profile().session=null;profile().workoutOverrides=null;profile().equipment=["Bodyweight",gear];profile().dumbbellCount=2;profile().kettlebellCount=2;profile().experience="beginner";profile().mode="rotation";profile().rotationIndex=0;profile().schedule=[{type,custom:null}];day=0');
  const families=[];
  for(let i=0;i<4;i++){
   families.push(run('movementFamily(circuit().find(r=>r.main.group==="core").main)[0]'));
   assert(run('circuit().every(r=>allowed(r.main)&&techniqueLevel(r.main)<=2)'));
   run('start()');h.advance(1200000);run('finish(activeSession())');
  }
  assert.deepEqual(families.slice(1),['farmer','suitcase','march']);
 }
 // Scarce material and exclusions must never force an unavailable carry.
 run('profile().equipment=["Bodyweight"];profile().bans=["category:carry"];profile().session=null');
 assert(run('circuit().every(r=>r.main&&allowed(r.main))'));
 // Old equipment, history, and an ongoing specialist exercise remain recoverable.
 run('profile().equipment=[...EQUIPMENT,...ARCHIVED_EQUIPMENT];profile().bans=[];profile().session=null;profile().schedule=[{type:"Full Body",custom:null}];start();activeSession().circuit[0].main=clone(MOVES["new-preacher-curl"]);addReps(0,7)');
 const raw=run('JSON.stringify(state)'),restored=harness({'daily-reps-engine-v2':raw});await restored.run('bootReady');
 assert.equal(restored.run('activeSession().circuit[0].main.id'),'new-preacher-curl');assert.equal(restored.run('countTotal(repEntries(activeSession()))'),7);
 assert(restored.run('profile().equipment.every(e=>!ARCHIVED_EQUIPMENT.includes(e))'));
 restored.advance(1200000);restored.run('finish(activeSession(),{early:true})');
 assert(restored.run('profile().history.at(-1).repEntries.some(e=>e.name==="Single-Arm Dumbbell Preacher Curl"&&e.count===7)'));
 assert(restored.run('circuit().every(r=>!r.main.retired)'));assert(restored.run('decodeBackup(JSON.stringify(backupPayload()))'));
 for(const id of ['new-farmer-carry','kb-farmer-carry','kb-suitcase-carry','snatch','kb-snatch','doublekb-snatch','clean','kb-clean-jerk','doublekb-clean-jerk','thruster','doublekb-thruster','swing']){
  h.context.id=id;assert(run('!!exerciseGuideData(MOVES[id])'),id);
 }
 console.log('PASS: specialist equipment removed; four-phase core rotation with both weight types; filters; legacy active session, reps/history and backup; carry and technical exercise guidance.');
})().catch(e=>{console.error(e);process.exit(1)});
