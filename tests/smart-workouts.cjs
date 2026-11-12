const assert=require('node:assert/strict'),fs=require('node:fs'),{harness}=require('./release.cjs');
(async()=>{
 const h=harness();await h.run('bootReady');const {run}=h;
 run('profile().onboardingComplete=true;profile().session=null;profile().bans=[];profile().schedule=["Push","Pull","Lower","Full Body"].map(type=>({type,custom:null}));profile().dumbbellCount=2;profile().kettlebellCount=2');
 // Exercise functions, equipment and unique slots hold across real setup combinations.
 for(const experience of ['beginner','intermediate','advanced'])for(const equipment of [['Bodyweight'],['Bodyweight','Dumbbells'],['Bodyweight','Kettlebells'],['Bodyweight','Resistance Bands','Band Anchor'],run('EQUIPMENT.slice()')]){
  h.context.exp=experience;h.context.eq=equipment;run('profile().experience=exp;profile().equipment=eq');
  for(let d=0;d<4;d++){h.context.d=d;assert(run('circuit(d).every(r=>r.main&&allowed(r.main))'));assert.equal(run('new Set(circuit(d).map(r=>r.main.name)).size'),5);assert(run('circuit(d).every((r,i)=>r.main.group===MOVES[PRESETS[profile().schedule[d].type][i][0]].group)'));}
  if(equipment.includes('Dumbbells')||equipment.includes('Kettlebells')){assert(run('circuit(1)[0].main.pattern==="row"'));assert(run('circuit(0)[0].main.loadDependent'));}
  if(experience==='beginner')assert(run('circuit(3).every(r=>techniqueLevel(r.main)<=2)'));
 }
 run('profile().equipment=EQUIPMENT.slice();profile().experience="beginner";day=0');assert.equal(run('circuit(0)[2].main.pattern'),'chest fly');assert.equal(run('circuit(1)[4].main.id'),'deadbug');
 for(const pair of [['split','new-bulgarian'],['thruster','doublekb-thruster'],['lib-band-pull-through','lib-cable-pull-through'],['lib-band-pallof-press','lib-cable-pallof-press'],['triceps','kbtri']]){
  h.context.a=pair[0];h.context.b=pair[1];assert(run('!!MOVES[a]&&!!MOVES[b]'));assert(run('movementFamily(MOVES[a])[0]===movementFamily(MOVES[b])[0]'));
 }
 assert(run('Object.values(MOVES).filter(m=>!m.retired&&!m.libraryAlias).every(m=>!!m.family&&MOVEMENT_FAMILIES[m.family].ids.includes(m.id))'));
 assert(run('groupedChoices(libraryForGroup("biceps")).length>=4'));
 assert.equal(run('challengeDirection(MOVES.dbrow,MOVES.face)'),'movement');assert.equal(run('challengeDirection(MOVES.dbrow,MOVES.lat)'),'movement');assert.equal(run('challengeDirection(MOVES.benchpress,MOVES.kneepush)'),'lighter');
 run('profile().equipment=["Bodyweight"]');assert(run('pullingLimit(circuit(1)).length>0'));run('profile().equipment=EQUIPMENT.slice()');assert.equal(run('pullingLimit(circuit(1))'),'');
 run('day=1');const choices=run('alternativesFor(currentCircuit()[0],0)');assert(choices.length>20);assert(run('recommendedChoices(currentCircuit()[0].main,alternativesFor(currentCircuit()[0],0)).every(m=>sameMovement(currentCircuit()[0].main,m))'));
 run('profile().schedule[1].custom=circuit(1);profile().schedule[1].custom[0].main=clone(MOVES.curl)');assert(run('workoutDistribution().includes("2 × Biceps")'));assert(!run('workoutDistribution().includes("3 × Back")'));
 // Missing arithmetic messages and all numeric per-side captions are now complete messages.
 for(const lang of ['nl','de','es','fr','it']){
  h.context.lang=lang;run('chooseLanguage(lang)');
  for(const id of ['kb-snatch','kb-clean-jerk','kb-farmer-carry','kb-suitcase-carry','plank']){h.context.id=id;assert(run('Object.hasOwn(translationPack(),countingHint(MOVES[id]))'),lang+' '+id);}
  assert(!run('/Complete the target|each side|with the command/i.test(translateText(countingHint(MOVES["kb-snatch"])))'));
  assert(!run('/zijkant|\\/ side/.test(translateText("4–6 / side"))'));
  for(const key of ['{count} options','{time} · shortened workout','Your selected muscle groups: {distribution}','Technique: {level}/5']){h.context.key=key;assert(run('Object.hasOwn(translationPack(),key)'));}
 }
 run('chooseLanguage("nl")');assert.equal(run('translateText("4–6 / side")'),'4–6 per kant');assert(run('countingHint(MOVES["kb-farmer-carry"]).includes("walked")'));run('chooseLanguage("it")');assert(!run('/comando|tavola/i.test(translateText(MOVES.tempo.description))'));
 const extractor=fs.readFileSync('scripts/extract-messages.cjs','utf8');assert(!extractor.includes('/[{}=<>]/'));
 // Early saving is explicit, exact, pause-aware, durable and excluded from full-session Echo.
 run('chooseLanguage("en");profile().session=null;profile().schedule=[{type:"Full Body",custom:null}];profile().rotationIndex=0;profile().history=[];profile().workoutOverrides=null;day=0;start();addReps(0,7)');h.advance(180000);run('start()');h.advance(60000);run('finish(activeSession())');assert.equal(run('profile().history.length'),0);
 run('finish(activeSession(),{early:true});finish(activeSession(),{early:true})');assert.equal(run('profile().history.length'),1);assert.equal(run('profile().history[0].durationMs'),180000);assert.equal(run('profile().history[0].totalReps'),7);assert(run('profile().history[0].shortened'));assert(!run('profile().history[0].echoEligible'));assert(run('durationCaption(profile().history[0]).startsWith("03:00")'));assert(run('validateState(state)'));
 const raw=run('JSON.stringify(state)'),restored=harness({'daily-reps-engine-v2':raw});await restored.run('bootReady');assert.equal(restored.run('profile().history[0].durationMs'),180000);const payload=run('JSON.stringify(backupPayload())');h.context.payload=payload;assert.equal(run('decodeBackup(payload).profiles[0].history[0].totalReps'),7);
 run('profile().history[0].shortened=false');assert.throws(()=>run('validateState(state)'));
 console.log('PASS: 60 material/experience/workout combinations, beginner loaded movements, functional swaps, stable families, complete counting messages in five translations, actual muscle balance and pause-aware early-save round trips.');
})().catch(e=>{console.error(e);process.exit(1)});
