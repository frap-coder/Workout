const {chromium}=require('playwright'),http=require('http'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const root=path.join(__dirname,'../dist');const server=http.createServer((req,res)=>{const file=path.join(root,new URL(req.url,'http://local').pathname.slice(1)||'index.html');fs.readFile(file,(err,b)=>{res.writeHead(err?404:200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html'});res.end(err?'Not found':b);});});await new Promise(r=>server.listen(4176,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  const ctx=await browser.newContext({viewport:{width:390,height:844}}),page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  let searches=0;await ctx.route('https://www.google.com/search?*',async route=>{searches++;await route.fulfill({status:200,contentType:'text/html',body:'<h1>Google Videos test destination</h1>'});});
  await page.goto('http://127.0.0.1:4176');await page.evaluate(async()=>{await bootReady;chooseLanguage('nl');profile().onboardingComplete=true;tab='Workout';openSetup();});
  assert.equal(await page.locator('label[for="setup-system"]').textContent(),'Schema');assert.equal(await page.locator('#setup-system option[value="ppl"]').textContent(),'Push / Pull / Lower');
  await page.evaluate(()=>{setupDraft.step=2;setupDraft.equipment=['Bodyweight','Kettlebells'];render();});
  assert(await page.getByRole('heading',{name:'Heb je twee kettlebells van hetzelfde gewicht?',exact:true}).isVisible());
  await page.getByRole('button',{name:'Ja, gelijk paar',exact:true}).click();assert.equal(await page.evaluate(()=>setupDraft.kettlebellCount),2);
  await page.getByRole('button',{name:'Geen gelijk paar',exact:true}).click();assert.equal(await page.evaluate(()=>setupDraft.kettlebellCount),1);
  await page.evaluate(()=>{const p=profile();p.equipment=['Bodyweight','Dumbbells','Kettlebells'];p.kettlebellCount=1;p.experience='beginner';p.schedule=[{type:'Full Body',custom:null}];p.mode='rotation';p.rotationIndex=0;p.history=[];p.session=null;p.workoutOverrides=null;setupDraft=null;day=0;tab='Workout';persist();render();});
  const names=await page.evaluate(()=>currentCircuit().map(r=>r.main.name)),saved=await page.evaluate(()=>JSON.stringify(profile().schedule));
  assert.equal(await page.getByRole('link',{name:'Examples',exact:true}).count(),5);assert.equal(searches,0);
  await page.getByRole('button',{name:'Verras me',exact:true}).click();const surprised=await page.evaluate(()=>currentCircuit().map(r=>r.main.name));assert.notDeepEqual(surprised,names);assert.equal(await page.evaluate(()=>JSON.stringify(profile().schedule)),saved);
  assert(await page.evaluate(()=>currentCircuit().every(r=>allowed(r.main)&&techniqueLevel(r.main)<=2)));
  await page.getByRole('button',{name:'Vorige selectie',exact:true}).click();assert.deepEqual(await page.evaluate(()=>currentCircuit().map(r=>r.main.name)),names);
  await page.getByRole('button',{name:'Verras me',exact:true}).click();const next=await page.evaluate(()=>currentCircuit().map(r=>r.main.name));await page.reload();await page.locator('.compact-exercise').first().waitFor();assert.deepEqual(await page.evaluate(()=>currentCircuit().map(r=>r.main.name)),next);
  const example=page.locator('.workout-compact-list > li > .examples-link').first(),href=await example.getAttribute('href'),name=await example.getAttribute('data-examples-name');
  const popupEvent=page.waitForEvent('popup');await example.click();const popup=await popupEvent;await popup.waitForURL('https://www.google.com/search?*');const url=new URL(popup.url());assert.equal(url.searchParams.get('tbm'),'vid');assert(url.searchParams.get('q').includes(name));assert.equal(searches,1);await popup.close();assert(new URL(href).searchParams.get('q').includes(name));
  for(const width of [320,390,1280]){await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,JSON.stringify(await page.evaluate(()=>({width:innerWidth,overflow:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({tag:e.tagName,cls:e.className,right:e.getBoundingClientRect().right,text:e.textContent.slice(0,45)})).slice(0,10)}))));}
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/workout-surprise-pair-examples.png',fullPage:true});
  await page.locator('.compact-exercise').first().click();assert(await page.locator('[data-action="surprise-slot"]').isEnabled());await page.locator('[data-action="surprise-slot"]').click();await page.locator('.picker-top button').click();
  await page.locator('#start-btn').click();await page.locator('.training-screen').waitFor();assert(await page.locator('.exercise > .examples-link').isVisible());
  await page.locator('[data-action="focus"]').click();assert(await page.locator('[data-action="surprise-workout"]').isDisabled());
  assert.deepEqual(errors,[]);console.log('PASS: Dutch Schema and English workout names; matching-weight pair choices; surprise, undo, reload, individual replacement and active-session protection; Examples opens Google Videos on the exercise name; responsive layout.');
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exit(1)});
