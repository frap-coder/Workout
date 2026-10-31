const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');
const root=path.join(__dirname,'../dist');
function harness(seed={},extras={}){
 const nodes=new Map(),data={...seed},events={};let now=Date.now();
 class Clock extends Date{constructor(...args){super(...(args.length?args:[now]));}static now(){return now;}}
 const node=()=>({innerHTML:'',textContent:'',style:{setProperty(){}},dataset:{},open:false,setAttribute(){},addEventListener(){},classList:{add(){},remove(){}},showModal(){this.open=true},close(){this.open=false}});
 const document={hidden:false,querySelector:s=>{if(!nodes.has(s))nodes.set(s,node());return nodes.get(s)},getElementById:s=>nodes.get('#'+s),addEventListener:(event,fn)=>(events[event]??=[]).push(fn),body:node()};
 const context={crypto:require('crypto').webcrypto,Date:Clock,console,setTimeout:()=>1,clearTimeout(){},setInterval(){},localStorage:{getItem:k=>data[k]||null,setItem:(k,v)=>data[k]=v,removeItem:k=>delete data[k]},document,window:{addEventListener(){}},navigator:{onLine:true},Blob,URL,location:{reload(){}},Promise,...extras};vm.createContext(context);
 for(const name of ['storage','data','app','sound','guides','platform','training','setup','calendar'])vm.runInContext(fs.readFileSync(path.join(root,name+'.js'),'utf8'),context,{filename:name+'.js'});
 const run=s=>vm.runInContext(s,context);return {context,run,data,nodes,events,advance:ms=>now+=ms};
}
if(require.main===module)(async()=>{
 const h=harness();await h.run('bootReady');const {run}=h;
 assert.equal(run('state.schemaVersion'),3);assert.equal(run('profile().mode'),'rotation');
 for(let d=0;d<3;d++){
  run(`day=${d}`);assert.equal(run('currentCircuit().length'),5);assert(run('currentCircuit().every(r=>r.main&&!r.main.name.includes(" + "))'));
  for(let i=0;i<5;i++){assert(run(`alternativesFor(currentCircuit()[${i}],${i}).length`)>5,`default ${d}/${i}: all compatible choices`);assert(run(`alternativesFor(currentCircuit()[${i}],${i}).every(m=>allowed(m)&&moveGroup(m)===moveGroup(currentCircuit()[${i}].main))`));}
 }
 run('day=0');assert(run('!alternativesFor(currentCircuit()[0],0).some(m=>m.group==="shoulder")'));
 assert(run('alternativesFor(currentCircuit()[3],3).some(m=>m.id==="halo"&&swapRelation(currentCircuit()[3].main,m).startsWith("Different"))'));
 for(const equipment of [['Bodyweight'],['Dumbbells','Bodyweight'],['1x Kettlebell','Bodyweight'],['Resistance Bands','Bodyweight']]){
  run(`profile().equipment=${JSON.stringify(equipment)};profile().bans=['hip thrust'];day=2`);assert(run('currentCircuit().every(r=>r.main&&allowed(r.main))'));assert(run('currentCircuit().every((r,i)=>alternativesFor(r,i).every(m=>allowed(m)))'));
 }
 run("profile().equipment=EQUIPMENT.slice();profile().bans=[];day=0;saveLoad(0,'24');start();addReps(0,10)");assert.equal(run('activeSession().repEntries[0].weightKg'),24);assert(run('focusMode'));assert(run('workout().includes("move-selector")'));
 run("saveLoad(0,'30');addReps(0,5)");assert.equal(run('activeSession().repEntries.length'),2);assert(run('activeSession().echoInvalid'));assert.equal(run('countTotal(repEntries(activeSession()))'),15);
 run('undoReps(0)');assert.equal(run('activeSession().repEntries[1].count'),0);assert.equal(run('activeSession().repEntries[0].count'),10);
 const before=run('currentCircuit()[0].main.name');run('swapExercise(0,0);addReps(0,5)');assert.notEqual(run('currentCircuit()[0].main.name'),before);assert.equal(run('countTotal(repEntries(activeSession()))'),15);
 const snapshot=JSON.parse(h.data['daily-reps-engine-v2']);const reloaded=harness({'daily-reps-engine-v2':JSON.stringify(snapshot)});await reloaded.run('bootReady');assert.equal(reloaded.run('countTotal(repEntries(activeSession()))'),15);assert.equal(reloaded.run('activeSession().circuit[0].main.name'),run('activeSession().circuit[0].main.name'));
 h.advance(1200001);run('tick();tick()');assert.equal(run('profile().history.length'),1);assert.equal(run('profile().rotationIndex'),1);assert.equal(run('profile().history[0].repEntries.find(e=>e.weightKg===24).count'),10);
 const history=run('JSON.stringify(profile().history)');run('migrateState(state)');assert.equal(run('JSON.stringify(profile().history)'),history);
 run('day=1;start()');h.advance(10000);run('start()');assert(run('!activeSession().running'));assert.equal(run('remaining()'),1190000);assert.equal(run('nextWorkoutIndex()'),1);run('start()');h.advance(1190001);run('tick()');assert.equal(run('nextWorkoutIndex()'),2);
 // Timed holds remain seconds; bodyweight and loaded reps stay separate.
 run("day=2;profile().schedule[2].custom=circuit().map((r,i)=>i===4?{main:clone(MOVES.plank),alt:null}:r);start();addReps(4,10);addReps(0,5)");assert.equal(run("countTotal(repEntries(activeSession()),'sec')"),10);assert.equal(run('countTotal(repEntries(activeSession()))'),5);
 const payload=run('JSON.stringify(backupPayload())');h.context.rawBackup=payload;assert.equal(run('decodeBackup(rawBackup).profiles[0].history.length'),2);
 for(const bad of ['{}','{"app":"daily-reps","formatVersion":9}',payload.replace('"schemaVersion":3','"schemaVersion":999'),'{"__proto__":{}}']){h.context.bad=bad;assert.throws(()=>run('decodeBackup(bad)'));}
 const restore=harness();await restore.run('bootReady');restore.context.rawBackup=payload;restore.run('pendingRestore=decodeBackup(rawBackup);restoreBackup()');assert.equal(restore.run('profile().history.length'),2);assert(!restore.run('activeSession().running'));
 let mirrored=null;const fakeDb={close(){},transaction(){const tx={objectStore:()=>({get(){const req={result:JSON.stringify(snapshot)};queueMicrotask(()=>req.onsuccess?.());return req;},put(raw){mirrored=raw;}})};queueMicrotask(()=>tx.oncomplete?.());return tx;}};
 const indexedDB={open(){const req={result:fakeDb};queueMicrotask(()=>req.onsuccess?.());return req;}};
 const dbRecovery=harness({}, {indexedDB});await dbRecovery.run('bootReady');await dbRecovery.run('storageQueue');assert(dbRecovery.run('storageRecovered'));assert.equal(dbRecovery.run('countTotal(repEntries(activeSession()))'),15);assert(mirrored);
 dbRecovery.context.localStorage.setItem=()=>{throw Error('QuotaExceededError');};dbRecovery.run('persist()');assert(dbRecovery.run('storageWarning'));assert(dbRecovery.run('backupPayload().state.profiles.length')===1);
 const recovery=harness({'daily-reps-engine-v2':'broken','daily-reps-engine-recovery':JSON.stringify(snapshot)});await recovery.run('bootReady');assert(recovery.run('storageRecovered'));assert.equal(recovery.run('countTotal(repEntries(activeSession()))'),15);
 const legacy=JSON.parse(JSON.stringify(snapshot));delete legacy.schemaVersion;legacy.profiles[0].session=null;legacy.profiles[0].schedule[0].custom=run('clone(circuit(0))');legacy.profiles[0].schedule[0].custom[4].main={name:'Overhead Triceps Extension + V-Ups',reps:'10 extensions + 8 V-ups',equipment:['Dumbbells'],description:'Old'};
 const migration=harness({'daily-reps-engine-v2':JSON.stringify(legacy)});await migration.run('bootReady');assert.equal(migration.run('profile().schedule[0].custom[4].main.name'),'Dumbbell Overhead Triceps Extension');
 restore.run('deleteLocalData()');assert.equal(restore.run('profile().history.length'),0);assert(!restore.data['daily-reps-engine-recovery']);
 // Actual wake lock promise lifecycle: pause and reset release it.
 let acquired=0,released=0;h.context.navigator.wakeLock={request:async()=>{acquired++;return {release:async()=>{released++},addEventListener(){}}}};
 run('profile().session=null;day=nextWorkoutIndex();start()');await new Promise(setImmediate);assert.equal(acquired,1);run('start()');await new Promise(setImmediate);assert.equal(released,1);
 // Every rendered page and guide is executable without unavailable browser APIs.
 run('profile().session=null;focusMode=false');for(const view of ['workout()','builder()','progress()','settings()','setupView()'])assert(run(view).length>100);
 for(const id of run('Object.keys(MOVES)')){h.context.moveId=id;assert(run('movementGuide(MOVES[moveId])').length>40);}
 console.log('PASS: 5-slot circuits; all compatible swaps; searchable text-only library; halo label; equipment exclusions; single-movement presets; load-aware logs/undo/Echo; timer deadlines; pause/resume; persisted reload; v3 migration; malformed-backup rejection; restore and deletion; wake-lock lifecycle; all views and guides.');
})().catch(error=>{console.error(error);process.exit(1);});

module.exports={harness};
