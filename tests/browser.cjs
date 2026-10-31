const {chromium}=require('playwright'),http=require('http'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'../dist');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
(async()=>{
 const server=http.createServer((req,res)=>{const p=path.join(root,new URL(req.url,'http://localhost').pathname.replace(/^\//,'')||'index.html');if(!p.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}fs.readFile(p,(e,data)=>{res.writeHead(e?404:200,{'Content-Type':types[path.extname(p)]||'text/plain'});res.end(e?'Not found':data);});});await new Promise(r=>server.listen(4173,'127.0.0.1',r));
 let browser;
 try{
  browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173');await page.getByRole('heading',{name:'When will you train?'}).waitFor();
  await page.getByRole('button',{name:'Choose equipment',exact:true}).click();await page.getByRole('button',{name:'Choose exclusions',exact:true}).click();
  await page.locator('#setup-ban').fill('Jump');await page.getByRole('button',{name:'Add',exact:true}).click();await page.getByRole('button',{name:'Choose starting level',exact:true}).click();
  await page.getByRole('button',{name:'Preview my plan',exact:true}).click();await page.getByRole('button',{name:'Use plan & open first workout',exact:true}).click();
  await page.getByRole('heading',{name:'Full Body workout',exact:true}).waitFor();
  let start=await page.locator('#start-btn').boundingBox();const nav=await page.locator('nav').boundingBox();assert(start.y+start.height<nav.y,JSON.stringify({start,nav}));assert.equal(await page.locator('.compact-exercise').count(),5);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:'/tmp/workout-home-mobile.png',fullPage:true});
  await page.locator('.compact-exercise').nth(1).click();await page.locator('#search-1').fill('push');assert(await page.locator('[data-exercise-option]:visible').count()>0);await page.locator('#level-filter').selectOption('harder');assert(await page.locator('[data-exercise-option]:visible').count()>0);
  const choice=page.locator('[data-exercise-option]:visible').first();const name=await choice.locator('h3').textContent();await choice.getByRole('button',{name:'Choose',exact:false}).click();assert((await page.locator('.picker-current strong').textContent()).includes(name));
  await page.screenshot({path:'/tmp/workout-picker-mobile.png',fullPage:true});await page.getByRole('button',{name:'Save current choices as my routine'}).click();assert.equal(await page.locator('#modal').evaluate(n=>n.open),false);
  await page.reload();await page.getByRole('heading',{name:'Full Body workout',exact:true}).waitFor();assert((await page.locator('.compact-exercise').nth(1).textContent()).includes(name));
  await page.locator('#start-btn').click();await page.locator('.training-screen').waitFor();await page.getByRole('button',{name:'Add 5 reps',exact:true}).click();await page.getByRole('button',{name:/Repeat last set/}).click();assert.equal(await page.locator('.rep-count strong').textContent(),'10');
  await page.getByRole('button',{name:'Undo',exact:true}).click();assert.equal(await page.locator('.rep-count strong').textContent(),'5');await page.locator('#start-btn').click();assert.equal(await page.locator('#timer-status').textContent(),'Paused');await page.reload();await page.locator('.training-screen').waitFor();assert.equal(await page.locator('.rep-count strong').textContent(),'5');assert.equal(await page.locator('#timer-status').textContent(),'Paused');
  await page.getByRole('button',{name:'Form & change exercise'}).click();await page.locator('button[data-action=picker-swap]').first().click();await page.getByRole('button',{name:'Close exercise picker'}).click();assert.equal(await page.locator('.session-rep-total').textContent(),'5 reps');
  await page.setViewportSize({width:360,height:740});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.setViewportSize({width:1280,height:900});await page.getByRole('button',{name:'Show full workout'}).click();assert.equal(await page.locator('.compact-exercise').count(),5);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:'/tmp/workout-desktop.png',fullPage:true});assert.deepEqual(errors,[]);console.log('PASS: real Chromium 390px/360px/desktop; first-run setup; Start above mobile navigation; picker search and challenge filter; saved choice reload; repeat/undo; pause and reload; running swap; no overflow or JS errors.');
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exit(1)});
