const assert=require('node:assert/strict');const {harness}=require('./release.cjs');
(async()=>{
 const {run}=harness();await run('bootReady');run('profile().onboardingComplete=true;tab="Workout"');
 assert.equal(run('unitFor(MOVES["lib-side-plank"])'),'sec');assert.equal(run('unitFor(MOVES["lib-kneeling-side-plank"])'),'sec');assert.equal(run('unitFor(MOVES.hipcircle)'),'reps');
 assert(run('countingHint(MOVES["lib-side-plank"]).includes("seconds together")'));assert(run('countingHint(MOVES.hipcircle).includes("both directions on both sides")'));assert(run('countingHint(MOVES["lib-kettlebell-suitcase-march"]).includes("weight on each side")'));assert(run('countingHint(MOVES["lib-step-jacks"]).includes("do not double")'));
 for(const id of ['lib-alternating-dumbbell-floor-press','lib-cable-front-raise','lib-cable-external-rotation','lib-cross-body-hammer-curl','lib-seated-band-hamstring-curl','lib-kettlebell-single-leg-glute-bridge'])assert(run(`MOVES['${id}'].reps.includes('/ side')`),id);
 assert(run('Object.values(MOVES).filter(m=>m.equipment.includes("Resistance Bands")&&/anchor/i.test(m.description)).every(m=>m.equipment.includes("Band Anchor"))'));
 assert(run('Object.values(MOVES).filter(m=>/ankle strap/i.test(m.description)).every(m=>m.equipment.includes("Ankle Strap"))'));
 for(const id of ['lib-barbell-reverse-curl','lib-barbell-drag-curl','lib-barbell-lying-triceps-extension'])assert(!run(`MOVES['${id}'].equipment.includes('Squat Rack')`));
 run('profile().equipment=["Resistance Bands","Bodyweight"];profile().bans=[]');assert(!run('allowed(MOVES.face)'));run('profile().equipment.push("Band Anchor")');assert(run('allowed(MOVES.face)'));assert(!run('allowed(MOVES["lib-standing-band-hamstring-curl"])'));run('profile().equipment.push("Ankle Strap")');assert(run('allowed(MOVES["lib-standing-band-hamstring-curl"])'));
 assert(run('MOVES["lib-dumbbell-single-leg-calf-raise"].challenge>MOVES.singlecalf.challenge'));assert(run('MOVES.sidelift.challenge>MOVES.sideleg.challenge'));assert.equal(run('MOVES.squat.challenge'),1);
 assert(run('PRESETS.Pull[2].every(id=>MOVES[id].pattern!=="high pull")'));
 run('day=0;profile().equipment=EQUIPMENT.slice();profile().schedule[0].custom=circuit().map((r,i)=>i===4?{main:clone(MOVES["lib-side-plank"]),alt:null}:r);start();addReps(4,10)');assert.equal(run('countTotal(repEntries(activeSession()),"sec")'),10);assert.equal(run('countTotal(repEntries(activeSession()))'),0);
 assert(run('validateState(state)'));assert.equal(run('reviewedMovement({...MOVES["lib-side-plank"],reps:"20–30 sec"}).reps'),'20–30 sec / side');assert.equal(run('reviewedMovement({...MOVES["lib-side-plank"],reps:"45 sec"}).reps'),'45 sec');assert(run('Object.values(MOVES).every(m=>m.description&&m.pattern&&m.reps&&m.equipment.every(e=>EQUIPMENT.includes(e)))'));
 console.log('PASS: per-side targets and hold seconds; direction/step counting; anchor and strap filters; rack requirements; relative levels; Pull presets; seconds logging and valid state.');
})().catch(e=>{console.error(e);process.exit(1)});
