const assert=require('node:assert/strict'),{harness}=require('./release.cjs');
(async()=>{
 const h=harness();await h.run('bootReady');const {run}=h;
 assert.equal(run('EXERCISE_GUIDES.length'),20);
 assert(run('EXERCISE_GUIDES.every(([ids,cue,start,steps,mistakes,easier])=>ids.every(id=>MOVES[id])&&cue&&start&&steps.length===3&&mistakes.length===2&&easier)'));
 for(const id of run('[...guideById.keys()]')){
  h.context.id=id;
  assert(run('!!exerciseGuideData(MOVES[id])'),id);
  const html=run('movementGuide(MOVES[id])');
  for(const heading of ['Starting position','Three steps','Watch for these mistakes','Target & counting','Weight & progression','Easier option'])assert(html.includes(heading),id+': '+heading);
  assert(html.includes(run('countingHint(MOVES[id])')));
 }
 // Untailored and custom exercises keep their own specific instructions and escaping.
 assert(run('movementGuide(MOVES["kb-snatch"]).includes(esc(MOVES["kb-snatch"].description))'));
 assert.equal(run('exerciseGuideData({...MOVES.rdl,description:"My own coaching"})'),null);
 const custom=run('movementGuide({name:"My exercise",description:"<script>alert(1)</script>",equipment:["Bodyweight"],reps:"8"})');
 assert(!custom.includes('<script>'));assert(custom.includes('&lt;script&gt;'));
 assert(run('movementGuide(MOVES.plank).includes("Log seconds held, not reps.")'));
 assert(run('movementGuide(MOVES.rdl).includes("smallest available weight step")'));
 assert(!run('movementGuide(MOVES.plank).includes("increase by the smallest available weight step")'));
 // Native details render closed; no external resource is loaded before user action.
 const html=run('exerciseInstructionPanel(MOVES.rdl)');
 assert(html.includes('<details class="exercise-instructions">'));assert(!html.includes(' open'));
 assert(!/<(?:iframe|video|img)\b/.test(html));assert(html.includes('rel="noopener noreferrer"'));
 // All guide content participates in the existing offline localization packs.
 for(const lang of ['nl','de','es','fr','it']){
  h.context.lang=lang;run('chooseLanguage(lang)');
  assert(run('EXERCISE_GUIDES.every(([,cue,start,steps,mistakes,easier])=>[cue,start,...steps,...mistakes,easier].every(text=>!!translationPack()[text]))'),lang);
  assert.notEqual(run('translateText("How to do this exercise")'),'How to do this exercise');
 }
 run('chooseLanguage("en");profile().session=null;profile().onboardingComplete=true;day=nextWorkoutIndex();start()');
 assert(run('trainingView(activeSession(),currentCircuit()).includes("quick-form-cue")'));
 assert(run('trainingView(activeSession(),currentCircuit()).includes("exercise-instructions")'));
 const fingerprint=run('activeSession().fingerprint');run('movementGuide(currentCircuit()[0].main);addReps(0,5)');
 assert.equal(run('activeSession().fingerprint'),fingerprint);assert.equal(run('countTotal(repEntries(activeSession()))'),5);
 console.log('PASS: 20 structured guides, exact exercise mapping, original/custom fallback, counting and load advice, closed offline cards, five translations and unchanged workout logging.');
})().catch(e=>{console.error(e);process.exit(1)});
