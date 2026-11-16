const assert=require('node:assert/strict'),{harness}=require('./release.cjs');
(async()=>{
 const h=harness();await h.run('bootReady');const {run}=h;
 run('profile().onboardingComplete=true;profile().schedule=[{type:"Pull",custom:null}];profile().equipment=["Bodyweight","Dumbbells","Kettlebells","Resistance Bands"];profile().dumbbellCount=1;profile().kettlebellCount=1;profile().bans=[];profile().session=null;day=0');
 assert.equal(run('FOREARM_MOVEMENTS.length'),8);
 for(const [id] of run('FOREARM_MOVEMENTS')){
  h.context.id=id;
  assert(run('allowed(MOVES[id])'),id);assert(run('alternativesFor(circuit()[3],3).some(m=>m.id===id)'),id);
  assert(run('MOVEMENT_FAMILIES[MOVES[id].family].ids.includes(id)'));
 }
 run('chooseLanguage("nl")');
 assert.equal(run('translateText("Overtime · running")'),'Extra tijd · timer loopt');
 assert.equal(run('translateText("Overtime · paused")'),'Extra tijd · gepauzeerd');
 assert(!run('/hardlopen|overuren/i.test(translateText("Overtime · running"))'));
 run('profile().schedule[0].custom=clone(circuit());profile().schedule[0].custom[3].main=clone(MOVES["forearm-db-grip-hold"]);start();addReps(3,5)');
 assert.equal(run('countTotal(repEntries(activeSession()),"sec")'),5);assert.equal(run('countTotal(repEntries(activeSession()),"reps")'),0);
 const raw=run('JSON.stringify(state)'),restored=harness({'daily-reps-engine-v2':raw});await restored.run('bootReady');
 assert.equal(restored.run('activeSession().circuit[3].main.id'),'forearm-db-grip-hold');assert.equal(restored.run('countTotal(repEntries(activeSession()),"sec")'),5);
 run('profile().session=null;profile().bans=["move:forearm-db-wrist-curl"]');assert(!run('allowed(MOVES["forearm-db-wrist-curl"])'));
 console.log('PASS: eight direct forearm exercises available on Pull with one weight; stable families, per-side seconds, reload and exclusions; correct Dutch overtime status.');
})().catch(e=>{console.error(e);process.exit(1)});
