const assert=require('node:assert/strict'),{harness}=require('./release.cjs');
(async()=>{
 const calls=[];let saved=true;
 const h=harness({}, {Capacitor:{isNativePlatform:()=>true,nativePromise:async(plugin,method,options)=>{calls.push({plugin,method,options});return {saved};}}});
 await h.run('bootReady');const {run}=h;
 assert(run('isNativeApp()'));assert.equal(run('runtimeStatus()'),'Android app · available offline');
 assert(!run('reliabilitySettings()').includes('id="update-app-button"'));
 let registered=0;h.context.navigator.serviceWorker={register:()=>{registered++;}};await run('initOffline()');assert.equal(registered,0);
 run('profile().onboardingComplete=true;tab="Workout";profile().session=null;day=nextWorkoutIndex();start()');
 await run('syncWakeLock()');assert(calls.some(c=>c.method==='setKeepAwake'&&c.options.enabled));
 run('start()');await run('syncWakeLock()');assert.equal(calls.filter(c=>c.method==='setKeepAwake').at(-1).options.enabled,false);
 await run('exportBackup()');const backup=calls.find(c=>c.method==='saveBackup');assert(backup);assert.equal(JSON.parse(backup.options.data).app,'daily-reps');assert(backup.options.filename.endsWith('.json'));assert(run('!!profile().lastExportAt'));
 run('profile().lastExportAt=null');saved=false;await run('exportBackup()');assert.equal(run('profile().lastExportAt'),null);
 h.context.document.querySelector('#modal').open=true;assert.equal(run('workoutHandleBack()'),true);assert.equal(h.nodes.get('#modal').open,false);
 run('tab="Settings"');assert.equal(run('workoutHandleBack()'),true);assert.equal(run('tab'),'Workout');
 run('focusMode=false');assert.equal(run('workoutHandleBack()'),false);assert(run('!!activeSession()'));
 const browser=harness();await browser.run('bootReady');assert(!browser.run('isNativeApp()'));assert(browser.run('reliabilitySettings()').includes('id="update-app-button"'));
 console.log('PASS: Android bundled/offline mode, no web updater or service worker, native wake flag, document export/cancel and back navigation; browser behavior retained.');
})().catch(e=>{console.error(e);process.exit(1)});
