const V='nb-v2';
const CORE=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','html2canvas.min.js','jspdf.umd.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='nb-fonts').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r)));return}
 if(/fonts\.(googleapis|gstatic)\.com$/.test(u.host)){e.respondWith(caches.open('nb-fonts').then(async c=>{const m=await c.match(r);const f=fetch(r).then(x=>{c.put(r,x.clone());return x}).catch(()=>m);return m||f}))}});
