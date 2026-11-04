const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');const root=path.join(__dirname,'../dist');
(async()=>{
 let s={id:'test',running:true,finished:false},muted=false;const tones=[];
 const audio={state:'running',currentTime:1,destination:{},createOscillator(){const o={frequency:{},connect(){},disconnect(){},start(at){this.at=at},stop(at){this.until=at;this.cancelled=at===undefined}};tones.push(o);return o},createGain(){return {gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}}}};
 const sound={audioCtx:audio,activeSession:()=>s,profile:()=>({preferences:{sound:!muted}}),remaining:()=>1200000};vm.createContext(sound);vm.runInContext(fs.readFileSync(path.join(root,'sound.js'),'utf8'),sound);const run=c=>vm.runInContext(c,sound);
 run('syncFinishAudio()');assert.equal(tones.length,9);assert.equal(tones[0].at,1201);s.running=false;run('syncFinishAudio()');assert(tones.every(o=>o.cancelled));
 s.running=true;s.overtime=true;run('syncFinishAudio()');assert.equal(tones.length,9,'overtime must not schedule the milestone again');s.overtime=false;run('syncFinishAudio()');audio.currentTime=1201;s.finished=true;s.running=false;run('playFinishTune()');assert.equal(tones.length,18,'already scheduled finish must not replay');
 s={id:'new',running:false,finished:true};audio.currentTime=1300;run('playFinishTune();playFinishTune()');assert.equal(tones.length,27);assert(Math.max(...tones.slice(-9).map(o=>o.until))-1300<1.8);
 muted=true;audio.currentTime=1400;run('playFinishTune()');assert.equal(tones.length,27);audio.state='suspended';run('playFinishTune()');assert.equal(tones.length,27);
 // Run actual service-worker handlers with a cache/fetch test double.
 const listeners={},stores=new Map();let failed=false,claims=0,skips=0,fetches=0;
 const caches={async open(name){if(!stores.has(name))stores.set(name,new Map());const store=stores.get(name);return {async put(key,value){store.set(typeof key==='string'?key:key.url,value.clone())},async match(key){return store.get(typeof key==='string'?key:key.url)?.clone()}}},async keys(){return [...stores.keys()]},async delete(name){return stores.delete(name)}};
 const sw={URL,Request,Response,Set,console,caches,self:{location:new URL('https://reps.test/sw.js'),addEventListener:(type,fn)=>listeners[type]=fn,clients:{claim:async()=>claims++},skipWaiting:()=>skips++},fetch:async req=>{fetches++;if(failed)return new Response('<html>Sign in</html>',{headers:{'content-type':'text/html'}});return new Response(req.url.endsWith('/')||req.url.endsWith('index.html')?'<html data-reps-app="4"></html>':'asset',{headers:{'content-type':req.url.endsWith('/')||req.url.endsWith('index.html')?'text/html':'text/javascript'}})}};
 vm.createContext(sw);vm.runInContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'),sw);
 let pending;listeners.install({waitUntil:p=>pending=p});await pending;assert.equal(stores.size,1);const cache=[...stores.values()][0];assert.equal(cache.size,17);
 stores.set('unrelated-cache',new Map());stores.set('daily-reps-web-old',new Map());listeners.activate({waitUntil:p=>pending=p});await pending;assert.equal(claims,1);assert(stores.has('unrelated-cache'));assert(!stores.has('daily-reps-web-old'));
 const before=fetches;listeners.fetch({request:{method:'GET',mode:'navigate',url:'https://reps.test/'},respondWith:p=>pending=p});assert((await (await pending).text()).includes('data-reps-app'));assert.equal(fetches,before,'navigation uses the matching cached shell');
 let intercepted=false;listeners.fetch({request:{method:'GET',mode:'navigate',url:'https://reps.test/sign-in'},respondWith:()=>intercepted=true});assert(!intercepted);
 listeners.message({data:{type:'ACTIVATE_UPDATE'}});assert.equal(skips,1);
 stores.clear();failed=true;listeners.install({waitUntil:p=>pending=p});await assert.rejects(pending);assert.equal(stores.size,0,'never cache a sign-in page as the app');
 console.log('PASS: scheduled chime, pause cancellation, single finish, mute/suspended fallback; complete offline precache; no auth-page caching; matching HTML/scripts; deferred updates; scoped cache cleanup.');
})().catch(error=>{console.error(error);process.exit(1);});
