'use strict';
let screenLock=null,wakePending=false,wakeStatus='Not active',offlineStatus='Checking offline availability…',swRegistration=null;
const browserNavigator=()=>typeof navigator==='undefined'?{}:navigator;
function runtimeStatus(){return `${browserNavigator().onLine===false?'Offline':'Online'} · ${offlineStatus}`;}
function paintRuntimeStatus(){
 const sound=document.querySelector('#sound-state'),enable=document.querySelector('#sound-enable');if(sound)sound.textContent=profile().preferences?.sound===false?'Finish sound off':audioCtx?.state==='running'?'Finish sound ready · keep the page open':'Tap to enable the finish sound';if(enable)enable.hidden=profile().preferences?.sound===false||audioCtx?.state==='running';
 const status=document.querySelector('#runtime-status');if(status)status.textContent=runtimeStatus();
 const wake=document.querySelector('#wake-status');if(wake)wake.textContent=wakeStatus;
 const offline=document.querySelector('#offline-detail');if(offline)offline.textContent=runtimeStatus();
 const storage=document.querySelector('#storage-health');if(storage)storage.textContent=storageHealth;
}
function wantsWakeLock(){return !!(activeSession()?.running&&!activeSession().finished&&profile().preferences?.keepAwake!==false&&!document.hidden);}
async function syncWakeLock(){
 if(!wantsWakeLock()){
  const previous=screenLock;screenLock=null;if(previous)try{await previous.release();}catch{}
  wakeStatus=browserNavigator().wakeLock?'Not active':'Not supported by this browser';paintRuntimeStatus();return;
 }
 if(screenLock||wakePending)return;
 if(!browserNavigator().wakeLock){wakeStatus='Not supported by this browser';paintRuntimeStatus();return;}
 wakePending=true;
 try{const lock=await browserNavigator().wakeLock.request('screen');if(!wantsWakeLock()){await lock.release();return;}
 screenLock=lock;wakeStatus='Screen stays awake';lock.addEventListener('release',()=>{if(screenLock===lock){screenLock=null;wakeStatus='Released by device';paintRuntimeStatus();}});
 }catch{wakeStatus='Unavailable · check battery or browser settings';}finally{wakePending=false;paintRuntimeStatus();}
}
function syncSessionRuntime(){syncWakeLock();syncFinishAudio();paintRuntimeStatus();}
async function initOffline(){
 const nav=browserNavigator();if(!('serviceWorker' in nav)){offlineStatus='Offline caching unavailable';paintRuntimeStatus();return;}
 try{
  swRegistration=await nav.serviceWorker.register('./sw.js',{updateViaCache:'none'});
  const refresh=async()=>{offlineStatus=nav.serviceWorker.controller?'Offline copy ready':'Preparing offline copy';if(swRegistration.waiting)offlineStatus='Update ready · finish your session before reloading';paintRuntimeStatus();};
  nav.serviceWorker.addEventListener('controllerchange',refresh);
  swRegistration.addEventListener('updatefound',()=>{const worker=swRegistration.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='redundant'){offlineStatus='Offline copy unavailable · retry while online';paintRuntimeStatus();}else refresh();});});
  await refresh();
 }catch{offlineStatus='Offline copy unavailable · open again while online';paintRuntimeStatus();}
}
async function updateOfflineApp(){
 if(hasActive()){toast('Finish or reset the session before updating.');return;}
 if(swRegistration?.waiting){swRegistration.waiting.postMessage({type:'ACTIVATE_UPDATE'});browserNavigator().serviceWorker.addEventListener('controllerchange',()=>location.reload(),{once:true});}
 else if(browserNavigator().onLine!==false){await swRegistration?.update();toast('Checked for updates. Reopen Settings if an update is ready.');}
 else toast('Connect to the internet to check for updates.');
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();syncSessionRuntime();}else syncWakeLock();});
window.addEventListener('online',()=>{paintRuntimeStatus();initOffline();});window.addEventListener('offline',paintRuntimeStatus);
window.addEventListener('pagehide',()=>{persist();});
