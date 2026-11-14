'use strict';
const CACHE='daily-reps-web-20261114-varied-workouts1';
const CORE=["./", "./index.html", "./style.css?v=20261114-varied-workouts1", "./storage.js?v=20261114-varied-workouts1", "./data.js?v=20261114-varied-workouts1", "./app.js?v=20261114-varied-workouts1", "./sound.js?v=20261114-varied-workouts1", "./guides.js?v=20261114-varied-workouts1", "./platform.js?v=20261114-varied-workouts1", "./training.js?v=20261114-varied-workouts1", "./setup.js?v=20261114-varied-workouts1", "./calendar.js?v=20261114-varied-workouts1", "./families.js?v=20261114-varied-workouts1", "./exclusions.js?v=20261114-varied-workouts1", "./i18n.js?v=20261114-varied-workouts1", "./locales.js?v=20261114-varied-workouts1", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
const coreURLs=new Set(CORE.map(path=>new URL(path,self.location).href));
async function checkedResponse(url){const response=await fetch(new Request(url,{cache:'reload',credentials:'same-origin'}));if(!response.ok||response.redirected)throw Error('Offline asset unavailable');const type=response.headers.get('content-type')||'';if(type.includes('text/html')){const html=await response.clone().text();if(!html.includes('data-reps-app="4"'))throw Error('Not the app shell');}return response;}
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);try{for(const path of CORE){const url=new URL(path,self.location).href;await cache.put(url,await checkedResponse(url));}}catch(error){await caches.delete(CACHE);throw error;}})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith('daily-reps-web-')&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin)return;
 if(request.mode==='navigate'&&(url.pathname===new URL('./',self.location).pathname||url.pathname===new URL('./index.html',self.location).pathname)){
  // Keep HTML and its versioned scripts together. A waiting update is activated
  // only by the user, after the workout, never halfway through a session.
  event.respondWith((async()=>{const cache=await caches.open(CACHE);return (await cache.match(new URL('./',self.location).href))||fetch(request);})());return;
 }
 if(coreURLs.has(url.href))event.respondWith((async()=>{const cache=await caches.open(CACHE);return (await cache.match(request))||fetch(request);})());
});
