const assert=require('node:assert/strict'),{harness}=require('./release.cjs');
(async()=>{
 const h=harness();await h.run('bootReady');const {run}=h;
 run('profile().onboardingComplete=true;profile().mode="rotation";profile().rotationIndex=0;profile().schedule=[{type:"Pull",custom:null}];profile().dumbbellCount=2;profile().kettlebellCount=2;profile().experience="beginner";day=0');
 for(const [equipment,expected] of [
  [['Bodyweight','Dumbbells'],['curl','hammer-curl','reverse-curl']],
  [['Bodyweight','Dumbbells','Stable Bench / Support'],['curl','hammer-curl','reverse-curl','supported-curl']],
  [['Bodyweight','Kettlebells'],['curl','hammer-curl']],
  [['Bodyweight'],['curl']]
 ]){
  h.context.equipment=equipment;run('profile().equipment=equipment;profile().history=[];profile().session=null;profile().bans=[];profile().workoutOverrides=null');
  const got=[];
  for(let n=0;n<expected.length*2;n++){
   got.push(run('movementFamily(circuit()[3].main)[0]'));assert(run('circuit().every(r=>r.main&&allowed(r.main))'));
   assert(run('circuit().every(r=>r.main.group!=="triceps")'));
   run('start()');h.advance(1200000);run('finish(activeSession())');
  }
  assert.deepEqual(got,[...expected,...expected]);
 }
 run('profile().equipment=["Bodyweight","Dumbbells"];profile().history=[];profile().session=null;profile().schedule[0].custom=clone(circuit())');
 const custom=run('circuit()[3].main.name');run('start()');h.advance(1200000);run('finish(activeSession())');assert.equal(run('circuit()[3].main.name'),custom);
 run('profile().schedule[0].custom=null;profile().bans=["move:hammer","move:lib-cross-body-hammer-curl"]');assert(run('circuit().every(r=>r.main&&allowed(r.main))'));
 for(const m of run('Object.values(MOVES)')){h.context.m=m;const html=run('movementGuide(m)');assert(!html.includes('mayoclinic.org'));assert(!html.includes('nhs.uk'));assert(!html.includes('demonstration-sources'));}
 console.log('PASS: biceps, hammer, reverse and supported curl rotation; equipment fallback, saved routines, exclusions; no external examples in any exercise instructions.');
})().catch(e=>{console.error(e);process.exit(1)});
