const assert=require('node:assert/strict');
const {harness}=require('./release.cjs');
(async()=>{
 const {run,context,events}=harness();await run('bootReady');
 const counts=run('Object.fromEntries(Object.keys(MUSCLE_GROUPS).map(g=>[g,libraryForGroup(g).length]))');
 for(const [group,count] of Object.entries(counts))assert(count>=20,`${group}: ${count}, expected at least 20 exercises`);
 assert(run('Object.values(MOVES).every(m=>m.description&&m.pattern&&m.equipment.every(e=>EQUIPMENT.includes(e)))'));
 assert.equal(run('new Set(Object.values(MOVES).filter(m=>!m.libraryAlias).map(m=>m.name)).size'),run('Object.values(MOVES).filter(m=>!m.libraryAlias).length'));
 run('profile().equipment=EQUIPMENT.slice();profile().bans=[]');
 for(let day=0;day<3;day++){
  run(`day=${day}`);
  for(let i=0;i<5;i++){
   context.slot=i;
   // Every matching non-duplicate library entry must appear, not just the first five.
   assert(run(`(()=>{const rows=currentCircuit(),r=rows[slot],got=alternativesFor(r,slot);return libraryForGroup(moveGroup(r.main)).filter(m=>allowed(m)&&!rows.some(r=>r.main?.name===m.name)).every(m=>got.some(a=>a.id===m.id));})()`));
   assert(run('alternativesFor(currentCircuit()[slot],slot).length')>=20);
  }
  assert(!run('builder()').includes('<optgroup label="'+(day===2?'Chest':'Calves')+'">'));
 }
 run('day=2');
 assert(run('alternativesFor(currentCircuit()[0],0).some(m=>m.id==="lunge")'));
 assert(run('alternativesFor(currentCircuit()[0],0).some(m=>m.name==="Dumbbell Walking Lunges")'));
 run('profile().bans=["lunge"]');assert(!run('alternativesFor(currentCircuit()[0],0).some(m=>/lunge/i.test(m.name))'));
 run('profile().bans=[];profile().equipment=["Bodyweight"];openAlts.add(0)');
 assert(run('alternativesFor(currentCircuit()[0],0).every(m=>m.equipment.every(e=>e==="Bodyweight"))'));
 const html=run('exercise(currentCircuit()[0],0,null)');assert(html.includes('data-exercise-search'));assert(html.includes('Quads &amp; legs'));assert(!html.includes('<svg'));assert(!html.includes('<img'));
 // A filtered result keeps its original choice index, then swaps that exact exercise.
 run('profile().equipment=EQUIPMENT.slice();profile().bans=[]');
 const chosen=run('alternativesFor(currentCircuit()[0],0).findIndex(m=>m.id==="lunge")');
 run(`swapExercise(0,${chosen})`);assert.equal(run('currentCircuit()[0].main.id'),'lunge');
 // Exercise choice remains after reload; explicit saving is kept in future routines.
 const save=events.click.find(fn=>fn.toString().includes('remember-workout'));save({target:{closest:()=>({disabled:false})}});
 assert.equal(run('profile().schedule[2].custom[0].main.id'),'lunge');
 run('profile().workoutOverrides=null');assert.equal(run('circuit()[0].main.id'),'lunge');
 assert(!run('movementGuide(MOVES.lunge)').includes('<svg'));
 // Search AND-matches terms, hides non-matches and reports an empty state.
 const nodes=[{dataset:{search:'dumbbell walking lunges quads legs'},hidden:false},{dataset:{search:'kettlebell goblet squat'},hidden:false}];
 const count={},empty={};context.document.querySelectorAll=()=>nodes;context.document.querySelector=sel=>sel.includes('count')?count:empty;
 const input=events.input[events.input.length-1];input({target:{dataset:{exerciseSearch:'0'},value:'db lunges'}});assert.equal(nodes[0].hidden,false);assert.equal(nodes[1].hidden,true);assert.equal(count.textContent,'1 options');
 input({target:{dataset:{exerciseSearch:'0'},value:'nothing matches'}});assert.equal(empty.hidden,false);
 console.log('PASS: >=20 unique exercises per group; complete untruncated choices; lunges; equipment and bans; workout-specific builder; saved routine; text-only coaching; search and empty state.');console.log(counts);
})().catch(e=>{console.error(e);process.exit(1)});
