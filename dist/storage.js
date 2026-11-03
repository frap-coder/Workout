'use strict';
const DATA_VERSION=4,RECOVERY_KEY='daily-reps-engine-recovery';
let storageHealth='Checking storage…',storageRecovered=false,storageDb=null,storageQueue=Promise.resolve(),pendingRestore=null,pendingRestoreExportAt=null;
function parseSafeJSON(raw){return JSON.parse(raw,(key,value)=>{if(['__proto__','prototype','constructor'].includes(key))throw Error('Unsafe backup field.');return value;});}
function validMovement(m){return m&&typeof m.name==='string'&&m.name.length<=100&&typeof m.reps==='string'&&m.reps.length<=100&&Array.isArray(m.equipment)&&m.equipment.length<=12&&m.equipment.every(x=>typeof x==='string')&&(m.weightKg==null||(Number.isFinite(m.weightKg)&&m.weightKg>=0&&m.weightKg<=1000));}
function validateEntries(entries){if(entries!=null&&(!Array.isArray(entries)||entries.some(e=>typeof e.name!=='string'||!['reps','sec'].includes(e.unit)||!Number.isFinite(e.count)||e.count<0||(e.weightKg!=null&&(!Number.isFinite(e.weightKg)||e.weightKg<0||e.weightKg>1000)))))throw Error('Invalid rep entries.');}
function validateLogs(logs){if(logs!=null&&(!Array.isArray(logs)||logs.some(e=>typeof e.name!=='string'||!['reps','sec'].includes(e.unit)||!Number.isFinite(e.amount)||e.amount<0||!Number.isFinite(e.at)||e.at<0||e.at>Number.MAX_SAFE_INTEGER||!Number.isInteger(e.slot)||e.slot<0||e.slot>4||(e.weightKg!=null&&(!Number.isFinite(e.weightKg)||e.weightKg<0||e.weightKg>1000)))))throw Error('Invalid rep timeline.');}
function validateState(value){
 if(!value||!Array.isArray(value.profiles)||!value.profiles.length||value.profiles.length>100||typeof value.active!=='string')throw Error('Not a Daily Reps backup.');
 if(value.schemaVersion!=null&&(!Number.isInteger(value.schemaVersion)||value.schemaVersion<1))throw Error('Invalid backup version.');
 if(value.schemaVersion>DATA_VERSION)throw Error('This backup needs a newer version of Daily Reps.');
 const ids=new Set();
 for(const p of value.profiles){
  if(typeof p.id!=='string'||ids.has(p.id)||typeof p.name!=='string'||p.name.length>100)throw Error('Invalid profile.');ids.add(p.id);
  if(p.dumbbellCount!=null&&![1,2].includes(p.dumbbellCount))throw Error('Invalid dumbbell quantity.');
  if(p.preferences?.finishSound!=null&&!['melody','bell','pulse'].includes(p.preferences.finishSound))throw Error('Invalid finish sound.');
  if(p.preferences?.finishVolume!=null&&(typeof p.preferences.finishVolume!=='number'||!Number.isFinite(p.preferences.finishVolume)||p.preferences.finishVolume<0||p.preferences.finishVolume>1))throw Error('Invalid finish volume.');
  if(p.preferences?.weightUnit!=null&&!['kg','lb'].includes(p.preferences.weightUnit))throw Error('Invalid weight unit.');
  if(p.kettlebellCount!=null&&![1,2].includes(p.kettlebellCount))throw Error('Invalid kettlebell quantity.');
  if(p.onboardingComplete!=null&&typeof p.onboardingComplete!=='boolean')throw Error('Invalid setup status.');
  if(p.experience!=null&&!['beginner','intermediate','advanced'].includes(p.experience))throw Error('Invalid experience level.');
  if(p.loads&&(typeof p.loads!=='object'||Array.isArray(p.loads)||Object.values(p.loads).some(v=>v!=null&&(!Number.isFinite(v)||v<0||v>1000))))throw Error('Invalid saved loads.');
  if(p.preferences&&(typeof p.preferences!=='object'||Array.isArray(p.preferences)||Object.entries(p.preferences).some(([k,v])=>['sound','compact','keepAwake'].includes(k)&&typeof v!=='boolean')))throw Error('Invalid preferences.');
  if(p.rotationIndex!=null&&(!Number.isInteger(p.rotationIndex)||p.rotationIndex<0))throw Error('Invalid rotation.');
  if(!Array.isArray(p.equipment)||p.equipment.some(x=>typeof x!=='string')||!Array.isArray(p.bans)||p.bans.some(x=>typeof x!=='string'))throw Error('Invalid equipment or exclusions.');
  if(!Array.isArray(p.schedule)||!p.schedule.length||p.schedule.length>30||!Array.isArray(p.history)||p.history.length>50000)throw Error('Invalid schedule or history.');
  for(const d of p.schedule){
   if(!['Push','Pull','Lower','Legs','Upper','Conditioning','Full Body','Rest'].includes(d.type))throw Error('Unknown workout type.');
   if(d.custom&&(!Array.isArray(d.custom)||d.custom.length!==5||d.custom.some(r=>!validMovement(r.main)||(r.alt&&!validMovement(r.alt)))))throw Error('A custom circuit must contain five valid movements.');
  }
  for(const h of p.history){validateLogs(h.repLog);
   if(h.durationMs!=null&&(!Number.isFinite(h.durationMs)||h.durationMs<1200000||h.durationMs>Number.MAX_SAFE_INTEGER))throw Error('Invalid workout duration.');
   if(h.overtimeMs!=null&&(!Number.isFinite(h.overtimeMs)||h.overtimeMs<0||h.overtimeMs>Number.MAX_SAFE_INTEGER))throw Error('Invalid overtime duration.');
   if(typeof h.id!=='string'||!Number.isFinite(h.finishedAt)||typeof h.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(h.date)||typeof h.type!=='string')throw Error('Invalid session history.');
   if(h.repEntries&&(!Array.isArray(h.repEntries)||h.repEntries.some(e=>typeof e.name!=='string'||!['reps','sec'].includes(e.unit)||!Number.isFinite(e.count)||e.count<0||(e.weightKg!=null&&(!Number.isFinite(e.weightKg)||e.weightKg<0||e.weightKg>1000)))))throw Error('Invalid rep history.');
  }
  if(p.session){const s=p.session;if(s.overtime!=null&&typeof s.overtime!=='boolean')throw Error('Invalid overtime state.');if(s.milestoneNotified!=null&&typeof s.milestoneNotified!=='boolean')throw Error('Invalid milestone state.');if(s.overtimeMs!=null&&(!Number.isFinite(s.overtimeMs)||s.overtimeMs<0||s.overtimeMs>Number.MAX_SAFE_INTEGER))throw Error('Invalid overtime timer.');if(s.overtime&&s.remaining!==0)throw Error('Overtime must follow the 20-minute target.');if(typeof s.type!=='string')throw Error('Invalid active workout.');validateEntries(s.repEntries);validateLogs(s.repLog);if(s.activeSlot!=null&&(!Number.isInteger(s.activeSlot)||s.activeSlot<0||s.activeSlot>4))throw Error('Invalid active movement.');if(typeof s.id!=='string'||!Number.isInteger(s.day)||s.day<0||s.day>=p.schedule.length||!Array.isArray(s.circuit)||s.circuit.length!==5||s.circuit.some(r=>!validMovement(r.main))||!Number.isFinite(s.remaining)||s.remaining<0||s.remaining>1200000||(s.running&&!Number.isFinite(s.endAt)))throw Error('Invalid active session.');}
 }
 if(!ids.has(value.active))throw Error('Active profile is missing.');
 return value;
}
function readStoredState(key='daily-reps-engine-v2'){
 try{const raw=localStorage.getItem(key);return raw?validateState(parseSafeJSON(raw)):null;}catch{return null;}
}
function migrateState(value){
 validateState(value);
 for(const p of value.profiles){
  p.equipment=normalizeEquipment([...p.equipment,'Bodyweight']);p.kettlebellCount??=1;p.dumbbellCount??=2;
  if(p.onboardingComplete===undefined)p.onboardingComplete=true;
  p.loads??={};p.preferences??={keepAwake:true,sound:true,compact:true};
  // Saved history and live circuits are immutable. Only old built-in compound
  // movements in upcoming custom plans are replaced with one movement.
  if(!(p.session&&!p.session.finished)){
   for(const d of p.schedule)for(const r of d.custom||[])for(const key of ['main','alt']){
    const m=r[key];if(!m)continue;
    if(m.name==='Overhead Triceps Extension + V-Ups')r[key]=JSON.parse(JSON.stringify(MOVES.dbextension));
    if(m.name==='Calf Raises + Hollow Hold')r[key]=JSON.parse(JSON.stringify(MOVES.calf));
   }
   if((value.schemaVersion||1)<3)p.workoutOverrides=null;
  }
 }
 value.schemaVersion=DATA_VERSION;return value;
}
function openStorageDb(){
 if(typeof indexedDB==='undefined')return Promise.resolve(null);
 return new Promise(resolve=>{let done=false;const finish=v=>{if(!done){done=true;resolve(v);}};const timer=setTimeout(()=>finish(null),2000);let request;
 try{request=indexedDB.open('daily-reps-data',1);}catch{clearTimeout(timer);finish(null);return;}
 request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('snapshots'))request.result.createObjectStore('snapshots');};
 request.onsuccess=()=>{clearTimeout(timer);if(done)request.result.close();else finish(request.result);};
 request.onerror=request.onblocked=()=>{clearTimeout(timer);finish(null);};
 });
}
function dbRead(db){return new Promise(resolve=>{try{const req=db.transaction('snapshots').objectStore('snapshots').get('latest');req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>resolve(null);}catch{resolve(null);}});}
function mirrorState(raw){
 if(!storageDb)return;
 storageQueue=storageQueue.catch(()=>{}).then(()=>new Promise(resolve=>{try{const tx=storageDb.transaction('snapshots','readwrite');tx.objectStore('snapshots').put(raw,'latest');tx.oncomplete=()=>{storageHealth='Saved locally · recovery copy ready';resolve();};tx.onerror=tx.onabort=()=>{storageHealth='Local save only · export a backup';resolve();};}catch{resolve();}}));
}
function saveState(value,{backup=true}={}){
 const raw=JSON.stringify(value);let saved=false;
 try{const previous=localStorage.getItem(KEY);if(backup&&previous&&previous!==raw){try{validateState(parseSafeJSON(previous));localStorage.setItem(RECOVERY_KEY,previous);}catch{}}
 localStorage.setItem(KEY,raw);saved=true;storageHealth=storageDb?'Saved locally · recovery copy ready':'Saved locally · export a backup';
 }catch{storageHealth='Browser storage is full or unavailable. Export a backup now.';}
 mirrorState(raw);return saved;
}
async function recoverStorage(){
 storageDb=await openStorageDb();let recovered=readStoredState();
 if(!recovered){recovered=readStoredState(RECOVERY_KEY);if(recovered)storageRecovered=true;}
 if(!recovered&&storageDb){try{const raw=await dbRead(storageDb);if(raw){recovered=validateState(parseSafeJSON(raw));storageRecovered=true;}}catch{}}
 state=migrateState(recovered||state);
 saveState(state,{backup:false});
}
function backupPayload(){return {app:'daily-reps',formatVersion:1,exportedAt:new Date().toISOString(),state:JSON.parse(JSON.stringify(state))};}
function exportBackup(){
 const url=URL.createObjectURL(new Blob([JSON.stringify(backupPayload(),null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`daily-reps-backup-${localDate()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);profile().lastExportAt=Date.now();persist();toast('Backup downloaded. Keep it somewhere safe.');
}
function decodeBackup(raw){
 if(raw.length>25*1024*1024)throw Error('Backup is too large (25 MB maximum).');
 const file=parseSafeJSON(raw);if(file.app!=='daily-reps'||file.formatVersion!==1)throw Error('Choose a Daily Reps JSON backup.');
 const next=migrateState(validateState(file.state));pendingRestoreExportAt=Date.parse(file.exportedAt);return next;
}
async function previewImport(file){
 if(!file||hasActive()){toast('Finish or reset your session before restoring.');return;}
 try{if(file.size>25*1024*1024)throw Error('Backup is too large.');pendingRestore=decodeBackup(await file.text());
 modal(`<h2>Restore this backup?</h2><p>${pendingRestore.profiles.length} profiles · ${pendingRestore.profiles.reduce((n,p)=>n+p.history.length,0)} completed sessions.</p><p>This replaces all profiles and history on this browser. Export your current data first if you want to keep it.</p><div class="builder-actions"><button data-action="close">Cancel</button><button data-action="export-backup">Export current data</button><button class="primary" data-action="confirm-import">Restore backup</button></div>`);
 }catch(error){pendingRestore=null;toast(error.message);}
}
function restoreBackup(){
 if(!pendingRestore||hasActive())return;const next=pendingRestore;pendingRestore=null;
 // Imported timers are always paused. A backup must never silently run a timer.
 for(const p of next.profiles){const s=p.session;if(s&&!s.finished&&s.running){const snapshotAt=Number.isFinite(pendingRestoreExportAt)?pendingRestoreExportAt:Date.now();const delta=snapshotAt-s.endAt;if(s.overtime||delta>=0){s.overtime=true;s.overtimeMs=Math.max(0,delta);s.remaining=0;s.milestoneNotified=true;}else{s.remaining=Math.min(1200000,-delta);}s.running=false;}}
 state=next;saveState(state);day=hasActive()?activeSession().day:defaultWorkoutIndex();tab='Workout';focusMode=hasActive();openAlts.clear();document.querySelector('#modal').close();render();syncSessionRuntime();toast('Backup restored. Any unfinished session is paused.');
}
function deleteLocalData(){
 cancelFinishAudio();state={schemaVersion:DATA_VERSION,profiles:[newProfile('My profile')]};state.active=state.profiles[0].id;
 try{localStorage.removeItem(KEY);localStorage.removeItem(RECOVERY_KEY);}catch{}
 saveState(migrateState(state),{backup:false});day=0;tab='Workout';focusMode=false;pendingRestore=null;document.querySelector('#modal').close();render();syncSessionRuntime();toast('All local profiles and history deleted.');
}
