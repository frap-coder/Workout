const {chromium}=require('playwright'),http=require('http'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const root=path.join(__dirname,'../dist'),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
 const server=http.createServer((req,res)=>{const file=path.join(root,new URL(req.url,'http://localhost').pathname.slice(1)||'index.html');if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':types[path.extname(file)]||'text/plain'});res.end(err?'Not found':data);});});
 await new Promise(r=>server.listen(4175,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  const ctx=await browser.newContext({viewport:{width:390,height:844}}),page=await ctx.newPage(),errors=[],external=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/mayoclinic|nhs\.uk/.test(r.url()))external.push(r.url());});
  await page.goto('http://127.0.0.1:4175');await page.waitForFunction(()=>typeof bootReady!=='undefined');
  await page.evaluate(async()=>{await bootReady;chooseLanguage('en');const p=profile();p.onboardingComplete=true;p.equipment=['Bodyweight','Dumbbells'];p.mode='rotation';p.rotationIndex=0;p.schedule=[{type:'Full Body',custom:['dbsquat','dbpress','dbrow','rdl','plank'].map(id=>({main:clone(MOVES[id]),alt:null}))}];p.session=null;setupDraft=null;tab='Workout';day=0;start();});
  const panel=page.locator('.exercise-instructions');assert.equal(await panel.getAttribute('open'),null);
  assert(await page.locator('.quick-form-cue').isVisible());
  await panel.locator(':scope > summary').focus();await page.keyboard.press('Space');
  assert(await panel.getByRole('heading',{name:'Starting position',exact:true}).isVisible());assert.equal(await panel.locator('ol > li').count(),3);
  await panel.locator('.demonstration-sources > summary').click();
  assert.equal(await panel.getByRole('link').count(),2);assert.deepEqual(external,[]);
  for(const width of [320,390,1280]){await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,JSON.stringify(await page.evaluate(()=>({width:innerWidth,overflow:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({tag:e.tagName,cls:e.className,right:e.getBoundingClientRect().right,text:e.textContent.slice(0,60)})).slice(0,12)}))));}
  const before=await page.evaluate(()=>workoutElapsed(activeSession()));await page.waitForTimeout(150);assert(await page.evaluate(()=>workoutElapsed(activeSession()))>before);
  await page.getByRole('button',{name:'Add 5 reps',exact:true}).click();assert.equal(await page.evaluate(()=>countTotal(repEntries(activeSession()))),5);
  await page.evaluate(()=>chooseLanguage('nl'));await panel.locator(':scope > summary').click();
  await page.getByText('Zo doe je deze oefening',{exact:true}).waitFor();assert(await panel.getByRole('heading',{name:'Uitvoering in drie stappen',exact:true}).isVisible());
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/workout-exercise-guidance-nl.png',fullPage:true});
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await ctx.setOffline(true);await page.reload();await page.locator('.exercise-instructions > summary').click();
  assert(await page.getByRole('heading',{name:'Uitvoering in drie stappen',exact:true}).isVisible());assert.equal(await page.evaluate(()=>countTotal(repEntries(activeSession()))),5);
  assert.deepEqual(errors,[]);console.log('PASS: native keyboard disclosure, three steps, mobile/desktop layout, running timer, rep logging, Dutch guidance, no unsolicited external requests and offline reload.');
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exit(1)});
