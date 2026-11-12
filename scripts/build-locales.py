"""Generate static locale packs at build time. Never called by the user's browser."""
import concurrent.futures,hashlib,html,json,os,re,time,urllib.parse,urllib.request
from pathlib import Path
messages=json.loads(Path('scripts/messages.en.json').read_text());languages=['nl','de','es','fr','it'];all_packs={}
manual=json.loads(Path('scripts/locale-overrides.json').read_text())
# Protect exercise and equipment labels in every language unless editorial wording is supplied.
terms=json.loads(Path('scripts/fitness-terms.en.json').read_text())
for lang in languages:
 for label in terms['names']+terms['equipment']:
  manual[lang].setdefault(label,label)
# Family headings use established English fitness names in every app language.
# Override cached machine translations explicitly; setdefault would retain mistakes.
for lang in languages:
 for label in terms.get('families',[]):manual[lang][label]=label
controlled=json.loads(Path('scripts/controlled-cues.en.json').read_text())
CUE_REVISION='fitness-cues-20261104-1'
try:
 old=Path('dist/locales.js').read_text();all_packs=json.loads(old.split('globalThis.DAILY_REPS_TRANSLATIONS=',1)[1].strip().rstrip(';'))
except Exception:pass

def request(text,lang):
 url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode(dict(client='gtx',sl='en',tl=lang,dt='t',q=text))
 for attempt in range(5):
  try:
   req=urllib.request.Request(url,headers={'User-Agent':'DailyReps-build/1.0'})
   with urllib.request.urlopen(req,timeout=35) as response:data=json.load(response)
   return ''.join(p[0] for p in data[0] if p[0])
  except Exception:
   if attempt==4:raise
   time.sleep(2**attempt)

def build(lang):
 pack=all_packs.get(lang,{})
 for key in ['__proto__','prototype','constructor']:pack.pop(key,None)
 revise=lang in ['de','es','fr','it'] and pack.get('__fitness_cues_revision')!=CUE_REVISION
 pending=[s for s in messages if (not pack.get(s) or (revise and s in controlled)) and s not in manual[lang]]
 def source_text(s):return controlled.get(s,s) if lang in ['de','es','fr','it'] else s
 # Each numbered line is independently aligned; never silently shift translations to the wrong exercise.
 batches=[];batch=[];length=0
 for s in pending:
  if length+len(source_text(s))>2600 and batch:batches.append(batch);batch=[];length=0
  batch.append(s);length+=len(source_text(s))+12
 if batch:batches.append(batch)
 for index,batch in enumerate(batches):
  result=request('\n'.join(f'[{i}] {source_text(s)}' for i,s in enumerate(batch)),lang)
  matches=list(re.finditer(r'\[\s*(\d+)\s*\]\s*',result))
  if len(matches)==len(batch) and [int(m[1]) for m in matches]==list(range(len(batch))):
   for i,m in enumerate(matches):pack[batch[i]]=result[m.end():matches[i+1].start() if i+1<len(matches) else len(result)].strip()
  else:
   for s in batch:pack[s]=request(source_text(s),lang).strip();time.sleep(.1)
  print(lang,index+1,'/',len(batches),flush=True);time.sleep(.2)
 pack.update(manual[lang])
 if lang in ['de','es','fr','it']:pack['__fitness_cues_revision']=CUE_REVISION
 for source in messages:
  if not pack.get(source):
   print('Retry empty translation',lang,repr(source),flush=True)
   pack[source]=request(source,lang).strip() or source
 assert all(isinstance(pack.get(s),str) and pack[s] for s in messages)
 return lang,pack
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
 for lang,pack in executor.map(build,languages):all_packs[lang]=pack
Path('dist/locales.js').write_text('// Static translations. Generated at build time; no online translation at runtime.\nglobalThis.DAILY_REPS_TRANSLATIONS='+json.dumps(all_packs,ensure_ascii=False,separators=(',',':'))+';\n')
print('COMPLETE', {lang:len(pack) for lang,pack in all_packs.items()},flush=True)

for lang in languages:
 print('REVIEW',lang,json.dumps({k:all_packs[lang].get(k) for k in ['Start workout','Choose your language','Dumbbell Floor Press','Kettlebell Swings','Forearm Plank','Finish & save','Overtime','Restore this backup?']},ensure_ascii=False),flush=True)
