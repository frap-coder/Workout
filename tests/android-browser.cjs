// Browser-level verification of the Android JS bridge path; not an emulator test.
const {chromium}=require('playwright'),http=require('http'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const root=path.join(__dirname,'../dist');
 const server=http.createServer((req,res)=>{const file=path.join(root,new URL(req.url,'http://local').pathname.slice(1)||'index.html');fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html'});res.end(err?'Not found':data);});});
 await new Promise(r=>server.listen(4177,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  const ctx=await browser.newContext({viewport:{width:390,height:844}});
  await ctx.addInitScript(()=>{globalThis.nativeCalls=[];globalThis.Capacitor={isNativePlatform:()=>true,nativePromise:async(plugin,method,options)=>{nativeCalls.push({plugin,method,options});return {saved:true};}};});
  const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:4177');
  await page.locator('[data-code="nl"]').click();await page.locator('[data-action="language-continue"]').click();
  assert.equal(await page.locator('[data-action="export-backup"]').count(),0);
  assert(!/browser/i.test(await page.locator('footer').textContent()));
  await page.locator('[data-action="about-app"]').click();
  assert(!/GitHub|browser|back.?up/i.test(await page.locator('#modal').textContent()));
  await page.locator('#modal [data-action="close"]').click();
  await page.locator('.setup-actions .primary').click();
  await page.locator('.extra-equipment summary').click();
  const materials=await page.locator('.extra-equipment [data-setup="equipment"]').evaluateAll(nodes=>nodes.slice(0,3).map(n=>n.dataset.value));
  for(const value of materials){
   await page.locator('.extra-equipment [data-value="'+value+'"]').click();
   assert(await page.locator('.extra-equipment').evaluate(n=>n.open),'extra equipment stays open after selection');
  }
  await page.locator('.setup-actions .primary').click();
  await page.locator('.setup-actions .primary').click();
  assert(!/hoofdbeweging/i.test(await page.locator('.experience-options').textContent()));
  await page.locator('.setup-actions .primary').click();
  await page.locator('[data-setup="apply"]').click();await page.locator('.compact-exercise').first().waitFor();
  await page.waitForFunction(()=>document.querySelector('#runtime-status')?.textContent==='Android-app · offline beschikbaar');
  assert.equal(await page.evaluate(async()=>(await navigator.serviceWorker.getRegistrations()).length),0);
  await page.locator('.workout-compact-list > li > .examples-link').first().click();
  await page.waitForFunction(()=>nativeCalls.some(c=>c.method==='openExternal'));
  const query=new URL(await page.evaluate(()=>nativeCalls.find(c=>c.method==='openExternal').options.url));assert.equal(query.searchParams.get('tbm'),'vid');assert.equal(ctx.pages().length,1);
  await page.locator('[data-action="tab"][data-tab="Settings"]').click();assert.equal(await page.locator('#update-app-button').count(),0);
  assert((await page.locator('main').textContent()).includes('Google Play'));
  assert.equal(await page.locator('[data-action="export-backup"], #backup-file, [data-action="recover-copy"]').count(),0);
  assert(!/browser|GitHub|back.?up/i.test(await page.locator('main').textContent()));
  assert(await page.evaluate(()=>workoutHandleBack()));await page.locator('#start-btn').click();
  await page.waitForFunction(()=>nativeCalls.some(c=>c.method==='setKeepAwake'&&c.options.enabled));
  await page.locator('[data-action="add-reps"][data-amount="5"]').click();await page.locator('#start-btn').click();
  await page.waitForFunction(()=>nativeCalls.filter(c=>c.method==='setKeepAwake').at(-1)?.options.enabled===false);
  await page.reload();await page.locator('.training-screen').waitFor();assert.equal(await page.locator('.rep-count strong').textContent(),'5');
  await page.locator('[data-action="alt"]').click();assert(await page.evaluate(()=>workoutHandleBack()));assert.equal(await page.locator('#modal').evaluate(n=>n.open),false);
  await page.screenshot({path:'/tmp/workout-native-preview.png',fullPage:true});
  const policy=await ctx.request.get('http://127.0.0.1:4177/privacy.html');assert.equal(policy.status(),200);assert((await policy.text()).includes('frap-coder'));
  assert.deepEqual(errors,[]);console.log('PASS: Android-mode onboarding, offline bundled status, no service worker/web updater, native external search, app-only copy without backup controls, extra equipment stays open, wake flag, pause/reload and back handling. Native OS dialogs still need device testing.');
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exit(1)});
