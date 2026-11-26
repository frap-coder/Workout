'use strict';
let screenLock=null,wakePending=false,wakeStatus='Not active',offlineStatus='Checking offline availability…',swRegistration=null;
const browserNavigator=()=>typeof navigator==='undefined'?{}:navigator;
function isNativeApp(){return typeof globalThis.Capacitor?.isNativePlatform==='function'&&globalThis.Capacitor.isNativePlatform();}
function callNative(method,options={}){return globalThis.Capacitor.nativePromise('WorkoutNative',method,options);}
function runtimeStatus(){if(isNativeApp())return 'Android app · available offline';return `${browserNavigator().onLine===false?'Offline':'Online'} · ${swRegistration?.waiting?(hasActive()?'Update ready · finish your session before installing':'Update ready · tap Install update'):offlineStatus}`;}
function offlineUpdateSettings(){return isNativeApp()?'<section class="section"><h2>Offline & updates</h2><p>The app files are included. Workouts work without an internet connection.</p><p class="small muted">App updates are delivered through Google Play. Video searches need internet.</p></section>':'<section class="section"><h2>Offline & updates</h2><p class="small" id="offline-detail">'+esc(runtimeStatus())+'</p><p class="small muted">Open once online and wait for “Offline copy ready” before training without a connection. Device storage can still be cleared by your browser.</p><button id="update-app-button" data-action="update-app" style="margin-top:16px">Check for updates</button></section>';}
function paintRuntimeStatus(){
 const sound=document.querySelector('#sound-state'),enable=document.querySelector('#sound-enable');if(sound)sound.textContent=profile().preferences?.sound===false?'20-minute chime off':audioCtx?.state==='running'?'20-minute chime ready · keep the page open':'Tap to enable the 20-minute chime';if(enable)enable.hidden=profile().preferences?.sound===false||audioCtx?.state==='running';
 const status=document.querySelector('#runtime-status');if(status)status.textContent=runtimeStatus();
 const wake=document.querySelector('#wake-status');if(wake)wake.textContent=wakeStatus;
 const offline=document.querySelector('#offline-detail');if(offline)offline.textContent=runtimeStatus();
 const notice=document.querySelector('#app-update-notice');if(notice){notice.hidden=!swRegistration?.waiting||hasActive();notice.innerHTML=notice.hidden?'':'<span>A new version is ready. Your local training data stays saved.</span><button data-action="update-app">Install update</button>';}
 const update=document.querySelector('#update-app-button');if(update){update.textContent=swRegistration?.waiting?'Install update':'Check for updates';update.disabled=hasActive();}
 const storage=document.querySelector('#storage-health');if(storage)storage.textContent=storageHealth;
}
function wantsWakeLock(){return !!(activeSession()?.running&&!activeSession().finished&&profile().preferences?.keepAwake!==false&&!document.hidden);}
async function syncWakeLock(){
 if(isNativeApp()){
  const enabled=wantsWakeLock();try{await callNative('setKeepAwake',{enabled});wakeStatus=enabled?'Screen stays awake':'Not active';}catch{wakeStatus='Unavailable · check battery settings';}paintRuntimeStatus();return;
 }
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
 if(isNativeApp()){offlineStatus='App files included';paintRuntimeStatus();return;}
 const nav=browserNavigator();if(!('serviceWorker' in nav)){offlineStatus='Offline caching unavailable';paintRuntimeStatus();return;}
 try{
  swRegistration=await nav.serviceWorker.register('./sw.js',{updateViaCache:'none'});
  const refresh=async()=>{offlineStatus=nav.serviceWorker.controller?'Offline copy ready':'Preparing offline copy';paintRuntimeStatus();};
  nav.serviceWorker.addEventListener('controllerchange',refresh);
  swRegistration.addEventListener('updatefound',()=>{const worker=swRegistration.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='redundant'){offlineStatus='Offline copy unavailable · retry while online';paintRuntimeStatus();}else refresh();});});
  await refresh();
 }catch{offlineStatus='Offline copy unavailable · open again while online';paintRuntimeStatus();}
}
async function updateOfflineApp(){
 if(isNativeApp())return;
 if(hasActive()){toast('Finish or reset the session before updating.');return;}
 if(swRegistration?.waiting){browserNavigator().serviceWorker.addEventListener('controllerchange',()=>location.reload(),{once:true});swRegistration.waiting.postMessage({type:'ACTIVATE_UPDATE'});}
 else if(browserNavigator().onLine!==false){await swRegistration?.update();toast('Checked for updates. Reopen Settings if an update is ready.');}
 else toast('Connect to the internet to check for updates.');
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();syncSessionRuntime();}else syncWakeLock();});
window.addEventListener('online',()=>{paintRuntimeStatus();initOffline();});window.addEventListener('offline',paintRuntimeStatus);
window.addEventListener('pagehide',()=>{persist();});
document.addEventListener('workoutPause',()=>{persist();});
document.addEventListener('workoutResume',()=>{tick();syncSessionRuntime();});
globalThis.workoutHandleBack=()=>{
 const modal=document.querySelector('#modal');if(modal?.open){modal.close();return true;}
 if(profile().onboardingComplete===false)return false;
 if(tab!=='Workout'){tab='Workout';setupDraft=null;render();return true;}
 if(focusMode){focusMode=false;render();return true;}
 persist();return false;
};
document.addEventListener('click',event=>{
 if(!isNativeApp())return;const link=event.target.closest?.('a[href]');if(!link)return;
 const url=new URL(link.href,location.href);if(url.protocol!=='https:'||url.origin===location.origin)return;
 event.preventDefault();callNative('openExternal',{url:url.href}).catch(()=>toast('Could not open the browser.'));
},true);

// Android copy describes local app storage; website-only controls stay in the web build.
function appDataFooter(){return isNativeApp()?'<span>Saved on this device · <button class="text-button" data-action="about-app">About & data</button></span>':'<span>Saved on this browser · <button class="text-button" data-action="export-backup">Back up data</button> · <button class="text-button" data-action="about-app">About & data</button></span>';}
function nativeDataSettings(){return '<section class="section"><h2>Your data</h2><p>Your plan, equipment, weights and workout history are saved on this device. There is no account or automatic synchronization.</p><p class="small muted">Uninstalling the app or clearing its data removes your saved workouts.</p><button class="danger-button" data-action="delete-data">Delete all local data</button></section>';}
function showNativeAbout(){modal(`<h2>About Daily Reps</h2><p>20-minute circuits with your own equipment, exercise choices and rep tracking. Choose your app language in Settings.</p><h3>Your data</h3><p>Your plan, equipment, weights and workout history are saved on this device. There is no account or automatic synchronization.</p><p>Uninstalling the app or clearing its data removes your saved workouts.</p><p>The app contains no advertising or analytics SDK. Your workout history is not automatically uploaded.</p><p>You can delete your local data in Settings. Enable sound and keep the app open for the chime. A closed or suspended app cannot guarantee an alarm.</p><p><a href="https://frap-coder.github.io/Workout/privacy.html" target="_blank" rel="noopener">Privacy policy</a></p><button class="primary" data-action="close">Close</button>`);document.querySelector('#modal').setAttribute('aria-label','About Daily Reps and local data');}
