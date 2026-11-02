'use strict';
const EQUIPMENT=['Dumbbells','Kettlebells','Sandbag','Resistance Bands','Barbell','Bodyweight','Pulley','Ab Wheel'];
const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const TYPES=['Push','Pull','Legs','Upper','Lower','Conditioning','Rest'];
const MOVES={};
function move(id,name,equipment,group,reps,description,tags=''){MOVES[id]={id,name,equipment,group,reps,description,tags:name+' '+tags};}
move('dbpress','Dumbbell Floor Press',['Dumbbells'],'press','10–12 reps','Lower with control until your upper arms touch the floor. Press up.');
move('kbpress','Single-Arm KB Floor Press',['Kettlebells'],'press','8–10 / side','Keep your wrist stacked and ribs down. Complete both sides.');
move('pushup','Push-ups',['Bodyweight'],'press','8–15 reps','Keep a straight body line. Lower your chest and press away.');
move('bandpush','Banded Deficit Push-ups',['Resistance Bands','Dumbbells'],'press','8–12 reps','Use stable flat-sided handles and a secure band. Use only a comfortable depth.');
move('ohp','Dumbbell Overhead Press',['Dumbbells'],'shoulder','8–12 reps','Brace your trunk and press overhead without arching your back.');
move('seated','Seated Dumbbell Press',['Dumbbells'],'shoulder','8–12 reps','Sit tall on a stable seat. Press upward with control.');
move('kbohp','Single-Arm Overhead Press',['Kettlebells'],'shoulder','8 / side','Brace, press overhead, then lower slowly. Complete both sides.');
move('barohp','Barbell Overhead Press',['Barbell'],'shoulder','8–10 reps','Brace your midsection and keep the bar path close.');
move('pike','Pike Push-ups',['Bodyweight'],'shoulder','6–10 reps','Raise your hips and bend your elbows to lower your head between your hands.');
move('lateral','Dumbbell Lateral Raises',['Dumbbells'],'shoulder','12–15 reps','Lift light weights to shoulder height with softly bent elbows.');
move('pullapart','Banded Pull-Aparts',['Resistance Bands'],'back','12–15 reps','Keep arms at chest height. Pull the band apart without shrugging.');
move('triceps','Overhead Triceps Extension + V-Ups',['Dumbbells'],'triceps','10 extensions + 8 V-ups','Use one dumbbell with both hands, then set it down for controlled V-ups.');
move('kbtri','KB Triceps Extension',['Kettlebells'],'triceps','10–12 reps','Hold one kettlebell securely with both hands. Keep elbows pointed forward.');
move('pushdown','Triceps Pushdowns',['Pulley'],'triceps','12–15 reps','Keep elbows close to your sides; extend without swinging.');
move('bandtri','Banded Triceps Pushdowns',['Resistance Bands'],'triceps','12–15 reps','Use a rated overhead anchor and extend your elbows.');
move('closepush','Close-Grip Push-ups',['Bodyweight'],'triceps','6–12 reps','Keep elbows close. Use your knees if needed.');
move('dbrow','Single-Arm Dumbbell Row',['Dumbbells'],'back','10 / side','Hinge at the hips, keep your back steady and row toward your hip.');
move('kbrow','Single-Arm Kettlebell Row',['Kettlebells'],'back','10 / side','Keep hips square and draw your elbow toward your back pocket.');
move('sandrow','Sandbag Bent-Over Row',['Sandbag'],'back','10–12 reps','Hinge and brace. Pull the bag toward your lower ribs.');
move('barrow','Barbell Row',['Barbell'],'back','10–12 reps','Maintain a steady hinge and row without jerking.');
move('lat','Banded Lat Pulldowns',['Resistance Bands'],'back','12–15 reps','Use a rated overhead anchor. Pull your elbows toward your sides.');
move('bandrow','Resistance Band Seated Rows',['Resistance Bands'],'back','12–15 reps','Secure the band at foot level and draw elbows back.');
move('pulleyrow','Cable Seated Rows',['Pulley'],'back','10–12 reps','Sit tall and row toward your lower ribs.');
move('prone','Prone W Raises',['Bodyweight'],'back','12–15 reps','Lie face down. Lift bent arms into a W and gently squeeze your shoulder blades.');
move('reverseangel','Reverse Snow Angels',['Bodyweight'],'back','10–12 reps','Lie face down and slowly sweep your arms overhead and back.');
move('high','Kettlebell High Pull',['Kettlebells'],'back','10 / side','Drive through your hips, keep the bell close and use a controlled range.');
move('dbhigh','Dumbbell High Pull',['Dumbbells'],'back','10 reps','Use a light load and keep the pull close to your body.');
move('face','Banded Face Pulls',['Resistance Bands'],'back','12–15 reps','Use a secure face-height anchor. Pull toward your forehead.');
move('curl','Dumbbell Bicep Curls',['Dumbbells'],'biceps','10–12 reps','Keep your upper arms still and lower the weights slowly.');
move('hammer','Hammer Curls',['Dumbbells'],'biceps','10–12 reps','Keep palms facing inward and avoid swinging.');
move('kbcurl','Two-Hand Kettlebell Curls',['Kettlebells'],'biceps','10–12 reps','Hold the bell securely with both hands and curl with control.');
move('barcurl','Barbell Bicep Curls',['Barbell'],'biceps','10–12 reps','Keep elbows by your sides and use a comfortable grip.');
move('bandcurl','Resistance Band Curls',['Resistance Bands'],'biceps','12–15 reps','Stand securely on the band and curl with steady tension.');
move('selfcurl','Self-Resisted Bicep Curls',['Bodyweight'],'biceps','10 / side','Use the opposite hand to provide gentle resistance through the curl.');
move('wheel','Ab Wheel Rollouts',['Ab Wheel'],'core','6–10 reps','Start on your knees. Roll only as far as you can keep your trunk controlled.');
move('vup','V-Ups',['Bodyweight'],'core','8–12 reps','Lift legs and upper body together. Bend your knees to make it easier.');
move('twist','Kettlebell Russian Twists',['Kettlebells'],'core','10 / side','Keep feet grounded and rotate slowly through a comfortable range.');
move('hollow','Hollow Hold',['Bodyweight'],'core','20–30 sec','Keep your lower back against the floor. Bend knees if needed.');
move('plank','Forearm Plank',['Bodyweight'],'core','30 sec','Stack elbows below shoulders and keep breathing steadily.');
move('goblet','Kettlebell Goblet Squat',['Kettlebells'],'squat','10–15 reps','Hold the bell at your chest. Sit between your hips and stand tall.');
move('dbsquat','Dumbbell Goblet Squat',['Dumbbells'],'squat','10–15 reps','Hold one dumbbell at your chest and squat through a comfortable range.');
move('sandbag','Sandbag Hug Squat',['Sandbag'],'squat','10–15 reps','Hug the bag to your chest and keep your feet planted.');
move('bandsquat','Resistance Band Front Squat',['Resistance Bands'],'squat','12–15 reps','Stand on the band, hold it at your shoulders and squat with control.');
move('squat','Bodyweight Squats',['Bodyweight'],'squat','15 reps','Keep heels planted and move through a comfortable depth.');
move('rdl','Dumbbell Romanian Deadlift',['Dumbbells'],'hinge','10–12 reps','Soften knees and push hips back. Keep weights close to your legs.');
move('barrdl','Barbell Romanian Deadlift',['Barbell'],'hinge','10–12 reps','Hinge from your hips and keep the bar close; stop before your back rounds.');
move('sandrdl','Sandbag Romanian Deadlift',['Sandbag'],'hinge','10–12 reps','Hold the bag close and push your hips back with a braced trunk.');
move('kbrdl','Kettlebell Romanian Deadlift',['Kettlebells'],'hinge','12 reps','Hold the bell with both hands and hinge at the hips.');
move('stiff','Dumbbell Stiff-Legged Deadlift',['Dumbbells'],'hinge','10 reps','Keep knees softly unlocked and hinge only as far as you can control.');
move('swing','Kettlebell Swings',['Kettlebells'],'hinge','15 reps','Drive from your hips, not your arms. Use a crisp hinge and a braced trunk.');
move('lunge','Alternating Reverse Lunges',['Bodyweight'],'squat','8 / side','Step back, lower with control and push through your front foot.');
move('good','Banded Good Mornings',['Resistance Bands'],'hinge','12–15 reps','Secure the band under your feet and across your upper back, away from your neck. Hinge slowly.');
move('bridge','Glute Bridges',['Bodyweight'],'hinge','15 reps','Drive through your heels and lift hips without arching your back.');
move('calf','Calf Raises + Hollow Hold',['Bodyweight'],'core','15 raises + 20 sec hold','Rise onto your toes with control, then move to the floor for the hold.');
move('thruster','Dumbbell Thrusters',['Dumbbells'],'full','10 reps','Squat with weights at your shoulders, then stand and press overhead.');
move('clean','Kettlebell Clean & Press',['Kettlebells'],'full','6 / side','Clean into a stable rack, pause, then press. Use a movement you already know.');
move('snatch','Single-Arm Dumbbell Snatch',['Dumbbells'],'full','6 / side','Drive through your hips and guide a light weight overhead with control.');
move('bandpull','Banded High Pulls',['Resistance Bands'],'full','12 reps','Stand on the band securely and pull up through a comfortable range.');
move('climber','Mountain Climbers',['Bodyweight'],'full','20 alternating reps','From a high plank, bring knees toward your chest with steady control.');
move('march','Squat to Knee Drive',['Bodyweight'],'full','10 alternating reps','Squat, stand, and lift one knee. Alternate sides.');
const PRESETS={
Push:[['dbpress','bandpush','kbpress','pushup'],['ohp','seated','kbohp','barohp','pike'],['kbpress','kbohp','dbpress','pushup'],['lateral','bandpush','pullapart','pike'],['triceps','pushdown','twist','kbtri','bandtri','closepush']],
Pull:[['dbrow','kbrow','sandrow','barrow','prone'],['lat','bandrow','pulleyrow','reverseangel'],['high','dbhigh','face','prone'],['curl','hammer','kbcurl','barcurl','bandcurl','selfcurl'],['wheel','vup','twist','hollow']],
Legs:[['goblet','sandbag','dbsquat','bandsquat','squat'],['rdl','barrdl','sandrdl','stiff','kbrdl','bridge'],['swing','lunge'],['good','bandsquat','bridge'],['calf','wheel','hollow']],
Upper:[['dbrow','kbrow','prone'],['dbpress','kbpress','pushup'],['face','high','dbhigh','reverseangel'],['curl','hammer','kbcurl','bandcurl','selfcurl'],['triceps','pushdown','kbtri','bandtri','closepush']],
Conditioning:[['thruster','clean','march'],['snatch','high','bandpull','climber'],['lunge','goblet','dbsquat'],['pushup','dbpress','kbpress'],['plank','wheel','hollow']]
};
PRESETS.Lower=PRESETS.Legs;
const FOCUS={Push:'Chest, shoulders, triceps & core',Pull:'Back, biceps & core',Legs:'Legs & core',Upper:'Upper body hybrid',Lower:'Lower body & core',Conditioning:'Full body & core',Rest:'Recovery day'};
move('kneepush','Kneeling Push-ups',['Bodyweight'],'press','10–15 reps','Keep a straight line from knees to shoulders and lower with control.');
move('wallslide','Wall Slides',['Bodyweight'],'shoulder','12–15 reps','Stand against a wall and slide your arms upward without arching your back.');
move('pronet','Prone T Raises',['Bodyweight'],'back','12–15 reps','Lie face down with arms out to the sides. Lift gently without shrugging.');
move('bodyhinge','Bodyweight Good Mornings',['Bodyweight'],'hinge','15 reps','Soften knees, push hips back and return to standing with control.');
TYPES.splice(TYPES.length-1,0,'Full Body');
PRESETS['Full Body']=[['dbsquat','goblet','sandbag','bandsquat','squat'],['dbpress','kbpress','pushup'],['dbrow','kbrow','bandrow','prone'],['rdl','kbrdl','good','bridge'],['vup','hollow','plank']];
FOCUS['Full Body']='Legs, push, pull & core';
// Keep legacy presets readable in saved history; offer the requested three-workout system.
TYPES.splice(0,TYPES.length,'Push','Pull','Lower','Rest');
move('halo','Kettlebell Halo',['Kettlebells'],'shoulder','6 / direction','Hold a light kettlebell by the horns with both hands. Slowly circle it around your head, keeping your ribs down and your neck still. Alternate directions. One complete circle counts as one rep.');
PRESETS.Push[1].splice(1,0,'halo');

// Lower: squat, hinge, hip extension, lateral hip work, then calves/core.
move('hipthrust','Dumbbell Hip Thrust',['Dumbbells'],'glutes','12–15 reps','Rest your upper back on a stable, secured bench or sofa. Pad the dumbbell across your hips. Lift until your hips are level, without arching your back.');
move('bwhipthrust','Bodyweight Hip Thrust',['Bodyweight'],'glutes','15 reps','Rest your upper back on a stable, secured bench or sofa. Keep feet planted and lift your hips with control. Use a floor bridge if no stable support is available.');
move('kbbridge','Kettlebell Glute Bridge',['Kettlebells'],'glutes','12–15 reps','Lie on the floor. Hold a padded kettlebell securely across your hips and lift with control.');
move('dbbridge','Dumbbell Glute Bridge',['Dumbbells'],'glutes','12–15 reps','Hold a padded dumbbell securely across your hips. Lift from the floor and pause at the top.');
move('sandbridge','Sandbag Glute Bridge',['Sandbag'],'glutes','12–15 reps','Place the sandbag across your hips and hold it steady. Lift from the floor without arching your back.');
move('singlebridge','Single-Leg Glute Bridge',['Bodyweight'],'glutes','8–10 / side','Keep one foot planted and lift your hips without twisting. Finish both sides.');
move('frog','Frog Pumps',['Bodyweight'],'glutes','15–20 reps','Lie on your back with soles together and knees open comfortably. Lift your hips in a small controlled range.');
move('marchbridge','Glute Bridge March',['Bodyweight'],'glutes','10 / side','Hold a bridge and lift one foot slightly at a time. Keep your hips level.');
move('heelsbridge','Heel-Dig Glute Bridge',['Bodyweight'],'glutes','12–15 reps','Plant your heels on the floor with toes lifted. Raise your hips and lower slowly.');
move('bandbridge','Banded Glute Bridge',['Resistance Bands'],'glutes','15 reps','Place a loop band above your knees. Lift your hips from the floor while keeping knees aligned.');
MOVES.bridge.group='glutes';
move('bandwalk','Lateral Band Walk',['Resistance Bands'],'hips','10 steps / side','Place a loop band above your knees. Bend your knees slightly and take small sideways steps. Count each step as one rep.');
move('sideleg','Side-Lying Hip Abduction',['Bodyweight'],'hips','12–15 / side','Lie on your side with hips stacked. Lift the top leg without rolling backward.');
move('clamshell','Clamshells',['Bodyweight'],'hips','12–15 / side','Lie on your side with knees bent and feet together. Open your top knee while keeping your pelvis still.');
move('bandclam','Banded Clamshells',['Resistance Bands'],'hips','12 / side','Place a loop band above your knees. Keep feet together and open your top knee with control.');
move('hydrant','Quadruped Hip Abduction',['Bodyweight'],'hips','10–12 / side','On hands and knees, lift one bent knee sideways without shifting your trunk.');
move('standhip','Standing Hip Abduction',['Bodyweight'],'hips','12–15 / side','Use a wall for balance. Move one leg sideways without leaning your body.');
move('hipcircle','Controlled Hip Circles',['Bodyweight'],'hips','6 / direction / side','On hands and knees, make slow circles with one bent knee. Keep the rest of your body still. Each circle is one rep.');
move('sidelift','Side-Plank Hip Abduction',['Bodyweight'],'hips','6–8 / side','From a side plank on your forearm and bottom knee, lift the top leg slowly. Keep your hips steady.');
move('bandstandhip','Standing Banded Hip Abduction',['Resistance Bands'],'hips','12 / side','Place a loop band above your knees. Hold a wall for balance and move one leg sideways with control.');
move('dbreverselunge','Dumbbell Reverse Lunges',['Dumbbells'],'squat','8 / side','Hold weights by your sides. Step back, lower with control and return to standing.');
move('split','Split Squats',['Bodyweight'],'squat','10 / side','Take a split stance. Lower straight down and push through your front foot.');
move('lateralunge','Lateral Lunges',['Bodyweight'],'squat','8 / side','Step sideways and sit into that hip. Keep the other leg comfortably straight, then return.');
move('sumosquat','Bodyweight Sumo Squats',['Bodyweight'],'squat','15 reps','Use a comfortable wide stance with toes slightly outward. Squat and stand with control.');
move('kickstand','Dumbbell Kickstand Romanian Deadlift',['Dumbbells'],'hinge','10 / side','Use your back foot lightly for balance. Hinge over your front leg with hips square.');
move('singlehinge','Single-Leg Bodyweight Hinge',['Bodyweight'],'hinge','10 / side','Hold a wall for balance if needed. Hinge over one leg without rotating your hips.');
move('tempo','Tempo Push-ups',['Bodyweight'],'press','6–10 reps','Lower for three seconds, then press up. Use knees if needed.');
move('pausepush','Paused Push-ups',['Bodyweight'],'press','6–10 reps','Pause briefly near the floor before pressing up. Keep your body steady.');
move('squeezepress','Dumbbell Squeeze Floor Press',['Dumbbells'],'press','10–12 reps','Hold two dumbbells together above your chest. Maintain gentle inward pressure as you lower and press.');
move('dbtri','Dumbbell Triceps Kickbacks',['Dumbbells'],'triceps','12 / side','Hinge forward and keep your upper arm still. Straighten your elbow with a light weight.');
move('dbskull','Dumbbell Lying Triceps Extensions',['Dumbbells'],'triceps','10–12 reps','Lie on the floor. Bend elbows to lower light dumbbells beside your head, then extend.');
move('dbextension','Dumbbell Overhead Triceps Extension',['Dumbbells'],'triceps','10–12 reps','Hold one dumbbell with both hands. Bend and extend elbows without arching your back.');
move('reversecurl','Dumbbell Reverse Curls',['Dumbbells'],'biceps','10–12 reps','Use light weights with palms facing down. Keep elbows still and lower slowly.');
move('concentration','Dumbbell Concentration Curls',['Dumbbells'],'biceps','10 / side','Sit on a stable seat. Support your elbow against your inner thigh and curl slowly.');
PRESETS.Lower=[['dbsquat','goblet','sandbag','bandsquat','squat'],['rdl','barrdl','sandrdl','kbrdl','good','bodyhinge'],['hipthrust','kbbridge','sandbridge','bandbridge','bwhipthrust','bridge'],['bandwalk','sideleg','clamshell','standhip'],['calf','vup','hollow','plank']];
FOCUS.Lower='Legs, glutes, hips & core';
move('deadbug','Dead Bugs',['Bodyweight'],'core','10 / side','Lie on your back with arms raised and knees bent. Slowly extend the opposite arm and leg while keeping your lower back steady.');
move('birddog','Bird Dogs',['Bodyweight'],'core','10 / side','From hands and knees, extend the opposite arm and leg. Keep your hips level and return slowly.');

// One movement and one counting unit per circuit slot.
Object.assign(MOVES.triceps,{name:'Dumbbell Overhead Triceps Extension',reps:'10–12 reps',description:MOVES.dbextension.description,tags:'dumbbell overhead triceps extension'});
Object.assign(MOVES.calf,{name:'Standing Calf Raises',group:'calves',reps:'15–20 reps',description:'Hold a wall for balance. Rise onto the balls of your feet, pause, then lower your heels slowly.',tags:'calf calves raises'});
move('dbcalf','Dumbbell Calf Raises',['Dumbbells'],'calves','15–20 reps','Hold dumbbells by your sides and use support for balance as needed. Rise onto your toes and lower slowly.');
move('kbcalf','Kettlebell Calf Raises',['Kettlebells'],'calves','15–20 reps','Hold the kettlebell by your side and use your free hand for balance. Rise and lower with control.');
move('singlecalf','Single-Leg Calf Raises',['Bodyweight'],'calves','10 / side','Hold a wall for balance. Lift one foot, then raise and lower the heel of your standing foot.');
move('seatedcalf','Seated Calf Raises',['Bodyweight'],'calves','15–20 reps','Sit on a stable seat with knees bent and feet flat. Lift both heels, pause and lower.');
move('dbseatedcalf','Seated Dumbbell Calf Raises',['Dumbbells'],'calves','15–20 reps','Sit with knees bent. Rest padded dumbbells just above your knees, hold them still and raise your heels.');
move('kneecalf','Bent-Knee Calf Raises',['Bodyweight'],'calves','15 reps','Hold a wall. Keep knees slightly bent as you lift and lower your heels.');
PRESETS.Push=[['dbpress','kbpress','pushup','kneepush'],['ohp','seated','kbohp','barohp','pike'],['squeezepress','kbpress','tempo','pausepush','pushup'],['lateral','halo','wallslide'],['dbextension','kbtri','pushdown','bandtri','closepush']];
PRESETS.Lower[4]=['calf','singlecalf','dbcalf','kbcalf','seatedcalf'];
FOCUS.Push='Chest, shoulders & triceps';FOCUS.Lower='Legs, glutes, hips & calves';
const PATTERN_GROUPS={
 'horizontal press':['dbpress','kbpress','pushup','kneepush','bandpush','tempo','pausepush','squeezepress'],
 'overhead press':['ohp','seated','kbohp','barohp','pike'],
 'shoulder raise':['lateral'],'shoulder control':['halo','wallslide'],
 'row':['dbrow','kbrow','sandrow','barrow','bandrow','pulleyrow'],
 'pulldown':['lat'],'scapular control':['face','pullapart','prone','pronet','reverseangel'],
 'high pull':['high','dbhigh'],'hip hinge':['rdl','barrdl','sandrdl','kbrdl','stiff','good','bodyhinge','kickstand','singlehinge'],
 'swing':['swing'],'squat':['goblet','dbsquat','sandbag','bandsquat','squat','sumosquat'],
 'lunge':['lunge','dbreverselunge','split','lateralunge'],
 'hip extension':['hipthrust','bwhipthrust','kbbridge','dbbridge','sandbridge','bridge','bandbridge','singlebridge','frog','marchbridge','heelsbridge'],
 'hip abduction':['bandwalk','sideleg','clamshell','bandclam','hydrant','standhip','hipcircle','sidelift','bandstandhip'],
 'calf raise':['calf','singlecalf','dbcalf','kbcalf','seatedcalf','dbseatedcalf','kneecalf']
};
for(const [pattern,ids] of Object.entries(PATTERN_GROUPS))for(const id of ids)MOVES[id].pattern=pattern;
for(const m of Object.values(MOVES))m.pattern??=m.group;
// Preserve useful distinctions instead of calling every core/hip option equivalent.
for(const id of ['wheel','plank','hollow','deadbug'])MOVES[id].pattern='anti-extension';
MOVES.vup.pattern='trunk flexion';MOVES.twist.pattern='trunk rotation';MOVES.birddog.pattern='trunk stability';
for(const id of ['clamshell','bandclam'])MOVES[id].pattern='hip external rotation';
MOVES.hipcircle.pattern='hip control';MOVES.bandwalk.pattern='lateral stepping';
MOVES.halo.pattern='shoulder circling';MOVES.wallslide.pattern='shoulder sliding';
MOVES.closepush.pattern='close-grip press';

// Expanded library. Patterns describe the stimulus within each muscle group.
EQUIPMENT.push('Stable Bench / Support','Squat Rack');
const MUSCLE_GROUPS={press:'Chest',shoulder:'Shoulders',triceps:'Triceps',back:'Back',biceps:'Biceps & forearms',core:'Core',squat:'Quads & legs',hinge:'Hamstrings & posterior chain',glutes:'Glutes',hips:'Hip abductors & adductors',calves:'Calves',full:'Full body'};
const EXPANDED_MOVES=[
 {
  "id": "lib-wall-push-ups",
  "name": "Wall Push-ups",
  "equipment": [
   "Bodyweight"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Stand facing a wall. Keep your body straight as you lower your chest toward it.",
  "pattern": "horizontal press",
  "tags": "Wall Push-ups press horizontal press"
 },
 {
  "id": "lib-incline-push-ups",
  "name": "Incline Push-ups",
  "equipment": [
   "Bodyweight",
   "Stable Bench / Support"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Place hands on a secured raised surface. Keep elbows at a comfortable angle.",
  "pattern": "horizontal press",
  "tags": "Incline Push-ups press horizontal press"
 },
 {
  "id": "lib-wide-push-ups",
  "name": "Wide Push-ups",
  "equipment": [
   "Bodyweight"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Place hands slightly wider than shoulders. Lower only through a comfortable range.",
  "pattern": "horizontal press",
  "tags": "Wide Push-ups press horizontal press"
 },
 {
  "id": "lib-staggered-push-ups",
  "name": "Staggered Push-ups",
  "equipment": [
   "Bodyweight"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Set one hand slightly forward. Keep hips square and change hand positions each set.",
  "pattern": "horizontal press",
  "tags": "Staggered Push-ups press horizontal press"
 },
 {
  "id": "lib-eccentric-push-ups",
  "name": "Eccentric Push-ups",
  "equipment": [
   "Bodyweight"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Lower slowly to the floor, then use your knees to reset at the top.",
  "pattern": "horizontal press",
  "tags": "Eccentric Push-ups press horizontal press"
 },
 {
  "id": "lib-hand-release-push-ups",
  "name": "Hand-Release Push-ups",
  "equipment": [
   "Bodyweight"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Lower to the floor, briefly lift your hands, then press up with your trunk braced.",
  "pattern": "horizontal press",
  "tags": "Hand-Release Push-ups press horizontal press"
 },
 {
  "id": "lib-dumbbell-neutral-grip-floor-press",
  "name": "Dumbbell Neutral-Grip Floor Press",
  "equipment": [
   "Dumbbells"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Keep palms facing inward. Lower upper arms to the floor without bouncing.",
  "pattern": "horizontal press",
  "tags": "Dumbbell Neutral-Grip Floor Press press horizontal press"
 },
 {
  "id": "lib-alternating-dumbbell-floor-press",
  "name": "Alternating Dumbbell Floor Press",
  "equipment": [
   "Dumbbells"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Hold one weight above the chest while pressing the other. Alternate arms.",
  "pattern": "horizontal press",
  "tags": "Alternating Dumbbell Floor Press press horizontal press"
 },
 {
  "id": "lib-single-arm-dumbbell-floor-press",
  "name": "Single-Arm Dumbbell Floor Press",
  "equipment": [
   "Dumbbells"
  ],
  "group": "press",
  "reps": "8–12 / side",
  "description": "Brace against rotation. Press one weight and complete both sides.",
  "pattern": "horizontal press",
  "tags": "Single-Arm Dumbbell Floor Press press horizontal press"
 },
 {
  "id": "lib-dumbbell-floor-fly",
  "name": "Dumbbell Floor Fly",
  "equipment": [
   "Dumbbells"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Use light weights and softly bent elbows. Stop when upper arms touch the floor.",
  "pattern": "chest fly",
  "tags": "Dumbbell Floor Fly press chest fly"
 },
 {
  "id": "lib-standing-band-chest-press",
  "name": "Standing Band Chest Press",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Use a rated chest-height anchor behind you. Brace and press forward.",
  "pattern": "horizontal press",
  "tags": "Standing Band Chest Press press horizontal press"
 },
 {
  "id": "lib-standing-band-chest-fly",
  "name": "Standing Band Chest Fly",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Use a rated anchor behind you. Bring softly bent arms together without shrugging.",
  "pattern": "chest fly",
  "tags": "Standing Band Chest Fly press chest fly"
 },
 {
  "id": "lib-cable-chest-press",
  "name": "Cable Chest Press",
  "equipment": [
   "Pulley"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Set handles at chest height. Use a staggered stance and press forward.",
  "pattern": "horizontal press",
  "tags": "Cable Chest Press press horizontal press"
 },
 {
  "id": "lib-cable-chest-fly",
  "name": "Cable Chest Fly",
  "equipment": [
   "Pulley"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Set handles at chest height. Bring hands together with elbows softly bent.",
  "pattern": "chest fly",
  "tags": "Cable Chest Fly press chest fly"
 },
 {
  "id": "lib-barbell-floor-press",
  "name": "Barbell Floor Press",
  "equipment": [
   "Barbell",
   "Squat Rack"
  ],
  "group": "press",
  "reps": "10–15 reps",
  "description": "Use a rack with correctly set safety arms. Lower upper arms to the floor; do not bounce.",
  "pattern": "horizontal press",
  "tags": "Barbell Floor Press press horizontal press"
 },
 {
  "id": "lib-arnold-press",
  "name": "Arnold Press",
  "equipment": [
   "Dumbbells"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Start with palms facing you. Rotate gradually as you press through a comfortable range.",
  "pattern": "overhead press",
  "tags": "Arnold Press shoulder overhead press"
 },
 {
  "id": "lib-half-kneeling-dumbbell-press",
  "name": "Half-Kneeling Dumbbell Press",
  "equipment": [
   "Dumbbells"
  ],
  "group": "shoulder",
  "reps": "8–12 / side",
  "description": "Kneel on one knee, brace, and press one weight without leaning. Complete both sides.",
  "pattern": "overhead press",
  "tags": "Half-Kneeling Dumbbell Press shoulder overhead press"
 },
 {
  "id": "lib-dumbbell-z-press",
  "name": "Dumbbell Z Press",
  "equipment": [
   "Dumbbells"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Sit on the floor with legs forward. Use a light load and keep your torso upright.",
  "pattern": "overhead press",
  "tags": "Dumbbell Z Press shoulder overhead press"
 },
 {
  "id": "lib-alternating-dumbbell-overhead-press",
  "name": "Alternating Dumbbell Overhead Press",
  "equipment": [
   "Dumbbells"
  ],
  "group": "shoulder",
  "reps": "8–12 / side",
  "description": "Press one arm at a time. Keep ribs down and complete both sides.",
  "pattern": "overhead press",
  "tags": "Alternating Dumbbell Overhead Press shoulder overhead press"
 },
 {
  "id": "lib-dumbbell-front-raise",
  "name": "Dumbbell Front Raise",
  "equipment": [
   "Dumbbells"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Lift light weights in front to shoulder height. Lower without swinging.",
  "pattern": "shoulder raise",
  "tags": "Dumbbell Front Raise shoulder shoulder raise"
 },
 {
  "id": "lib-dumbbell-scaption-raise",
  "name": "Dumbbell Scaption Raise",
  "equipment": [
   "Dumbbells"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Lift arms slightly forward of your sides with thumbs up, stopping at shoulder height.",
  "pattern": "shoulder raise",
  "tags": "Dumbbell Scaption Raise shoulder shoulder raise"
 },
 {
  "id": "lib-bent-arm-dumbbell-lateral-raise",
  "name": "Bent-Arm Dumbbell Lateral Raise",
  "equipment": [
   "Dumbbells"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Keep elbows bent and raise them out to shoulder height without shrugging.",
  "pattern": "shoulder raise",
  "tags": "Bent-Arm Dumbbell Lateral Raise shoulder shoulder raise"
 },
 {
  "id": "lib-band-lateral-raise",
  "name": "Band Lateral Raise",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Stand securely on the band. Raise arms sideways through a comfortable range.",
  "pattern": "shoulder raise",
  "tags": "Band Lateral Raise shoulder shoulder raise"
 },
 {
  "id": "lib-band-front-raise",
  "name": "Band Front Raise",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Stand securely on the band. Lift hands forward to shoulder height.",
  "pattern": "shoulder raise",
  "tags": "Band Front Raise shoulder shoulder raise"
 },
 {
  "id": "lib-band-overhead-press",
  "name": "Band Overhead Press",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Stand on the band, brace, and press upward without arching your back.",
  "pattern": "overhead press",
  "tags": "Band Overhead Press shoulder overhead press"
 },
 {
  "id": "lib-cable-lateral-raise",
  "name": "Cable Lateral Raise",
  "equipment": [
   "Pulley"
  ],
  "group": "shoulder",
  "reps": "8–12 / side",
  "description": "Use a low pulley and light load. Lift one arm sideways and complete both sides.",
  "pattern": "shoulder raise",
  "tags": "Cable Lateral Raise shoulder shoulder raise"
 },
 {
  "id": "lib-cable-front-raise",
  "name": "Cable Front Raise",
  "equipment": [
   "Pulley"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Face away from a low pulley. Raise the handle forward with a softly bent elbow.",
  "pattern": "shoulder raise",
  "tags": "Cable Front Raise shoulder shoulder raise"
 },
 {
  "id": "lib-dumbbell-rear-delt-fly",
  "name": "Dumbbell Rear Delt Fly",
  "equipment": [
   "Dumbbells"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Hinge with your back steady. Open softly bent arms to the sides with light weights.",
  "pattern": "rear delt fly",
  "tags": "Dumbbell Rear Delt Fly shoulder rear delt fly"
 },
 {
  "id": "lib-band-external-rotation",
  "name": "Band External Rotation",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Keep elbows tucked at your sides. Rotate forearms outward with gentle tension.",
  "pattern": "shoulder rotation",
  "tags": "Band External Rotation shoulder shoulder rotation"
 },
 {
  "id": "lib-cable-external-rotation",
  "name": "Cable External Rotation",
  "equipment": [
   "Pulley"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Set the pulley at elbow height. Keep your elbow by your side as you rotate outward.",
  "pattern": "shoulder rotation",
  "tags": "Cable External Rotation shoulder shoulder rotation"
 },
 {
  "id": "lib-prone-y-raises",
  "name": "Prone Y Raises",
  "equipment": [
   "Bodyweight"
  ],
  "group": "shoulder",
  "reps": "10–15 reps",
  "description": "Lie face down, arms in a Y. Lift gently with thumbs up without arching your back.",
  "pattern": "shoulder control",
  "tags": "Prone Y Raises shoulder shoulder control"
 },
 {
  "id": "lib-single-arm-dumbbell-overhead-extension",
  "name": "Single-Arm Dumbbell Overhead Extension",
  "equipment": [
   "Dumbbells"
  ],
  "group": "triceps",
  "reps": "8–12 / side",
  "description": "Keep the upper arm steady beside your head. Bend and straighten the elbow, then switch sides.",
  "pattern": "elbow extension",
  "tags": "Single-Arm Dumbbell Overhead Extension triceps elbow extension"
 },
 {
  "id": "lib-single-arm-dumbbell-kickback",
  "name": "Single-Arm Dumbbell Kickback",
  "equipment": [
   "Dumbbells"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Hinge and brace with a light weight. Keep the upper arm still while straightening the elbow.",
  "pattern": "elbow extension",
  "tags": "Single-Arm Dumbbell Kickback triceps elbow extension"
 },
 {
  "id": "lib-dumbbell-tate-press",
  "name": "Dumbbell Tate Press",
  "equipment": [
   "Dumbbells"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Lie on the floor with light weights over your chest. Bend elbows outward and extend with control.",
  "pattern": "elbow extension",
  "tags": "Dumbbell Tate Press triceps elbow extension"
 },
 {
  "id": "lib-dumbbell-neutral-grip-lying-extension",
  "name": "Dumbbell Neutral-Grip Lying Extension",
  "equipment": [
   "Dumbbells"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Lie on the floor with palms inward. Lower weights beside your head, keeping upper arms steady.",
  "pattern": "elbow extension",
  "tags": "Dumbbell Neutral-Grip Lying Extension triceps elbow extension"
 },
 {
  "id": "lib-dumbbell-cross-body-triceps-extension",
  "name": "Dumbbell Cross-Body Triceps Extension",
  "equipment": [
   "Dumbbells"
  ],
  "group": "triceps",
  "reps": "8–12 / side",
  "description": "Lie on the floor. Lower one light weight toward the opposite shoulder, then extend. Switch sides.",
  "pattern": "elbow extension",
  "tags": "Dumbbell Cross-Body Triceps Extension triceps elbow extension"
 },
 {
  "id": "lib-band-overhead-triceps-extension",
  "name": "Band Overhead Triceps Extension",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Use a secure low anchor behind you. Keep elbows forward and extend without arching.",
  "pattern": "elbow extension",
  "tags": "Band Overhead Triceps Extension triceps elbow extension"
 },
 {
  "id": "lib-single-arm-band-pushdown",
  "name": "Single-Arm Band Pushdown",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "triceps",
  "reps": "8–12 / side",
  "description": "Use a rated high anchor. Keep one elbow tucked and extend downward. Complete both sides.",
  "pattern": "elbow extension",
  "tags": "Single-Arm Band Pushdown triceps elbow extension"
 },
 {
  "id": "lib-band-triceps-kickback",
  "name": "Band Triceps Kickback",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Use a secure low anchor in front. Hinge and straighten elbows without moving upper arms.",
  "pattern": "elbow extension",
  "tags": "Band Triceps Kickback triceps elbow extension"
 },
 {
  "id": "lib-cable-rope-pushdown",
  "name": "Cable Rope Pushdown",
  "equipment": [
   "Pulley"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Keep elbows near your sides. Extend the rope down and lower the load slowly.",
  "pattern": "elbow extension",
  "tags": "Cable Rope Pushdown triceps elbow extension"
 },
 {
  "id": "lib-cable-reverse-grip-pushdown",
  "name": "Cable Reverse-Grip Pushdown",
  "equipment": [
   "Pulley"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Use an underhand grip and light weight. Keep wrists steady and elbows tucked.",
  "pattern": "elbow extension",
  "tags": "Cable Reverse-Grip Pushdown triceps elbow extension"
 },
 {
  "id": "lib-cable-overhead-triceps-extension",
  "name": "Cable Overhead Triceps Extension",
  "equipment": [
   "Pulley"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Face away from a high pulley. Brace in a split stance and extend your elbows.",
  "pattern": "elbow extension",
  "tags": "Cable Overhead Triceps Extension triceps elbow extension"
 },
 {
  "id": "lib-single-arm-cable-pushdown",
  "name": "Single-Arm Cable Pushdown",
  "equipment": [
   "Pulley"
  ],
  "group": "triceps",
  "reps": "8–12 / side",
  "description": "Keep your upper arm by your side and straighten one elbow. Complete both sides.",
  "pattern": "elbow extension",
  "tags": "Single-Arm Cable Pushdown triceps elbow extension"
 },
 {
  "id": "lib-wall-triceps-extensions",
  "name": "Wall Triceps Extensions",
  "equipment": [
   "Bodyweight"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Place hands on a wall. Bend elbows toward the wall, then straighten while keeping your trunk steady.",
  "pattern": "elbow extension",
  "tags": "Wall Triceps Extensions triceps elbow extension"
 },
 {
  "id": "lib-kneeling-close-grip-push-ups",
  "name": "Kneeling Close-Grip Push-ups",
  "equipment": [
   "Bodyweight"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Keep hands under shoulders and elbows close. Maintain a straight line from knees to head.",
  "pattern": "close-grip press",
  "tags": "Kneeling Close-Grip Push-ups triceps close-grip press"
 },
 {
  "id": "lib-incline-close-grip-push-ups",
  "name": "Incline Close-Grip Push-ups",
  "equipment": [
   "Bodyweight",
   "Stable Bench / Support"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Use a secured raised surface. Keep hands near shoulder width and elbows close to your sides.",
  "pattern": "close-grip press",
  "tags": "Incline Close-Grip Push-ups triceps close-grip press"
 },
 {
  "id": "lib-barbell-lying-triceps-extension",
  "name": "Barbell Lying Triceps Extension",
  "equipment": [
   "Barbell",
   "Squat Rack"
  ],
  "group": "triceps",
  "reps": "10–15 reps",
  "description": "Lie on the floor with a light bar. Keep upper arms steady and lower the bar behind your head.",
  "pattern": "elbow extension",
  "tags": "Barbell Lying Triceps Extension triceps elbow extension"
 },
 {
  "id": "lib-double-dumbbell-bent-over-row",
  "name": "Double Dumbbell Bent-Over Row",
  "equipment": [
   "Dumbbells"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Hinge and brace. Row both weights toward your lower ribs without swinging.",
  "pattern": "row",
  "tags": "Double Dumbbell Bent-Over Row back row"
 },
 {
  "id": "lib-dumbbell-underhand-row",
  "name": "Dumbbell Underhand Row",
  "equipment": [
   "Dumbbells"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Hinge with palms facing forward. Keep elbows close and row toward your waist.",
  "pattern": "row",
  "tags": "Dumbbell Underhand Row back row"
 },
 {
  "id": "lib-dumbbell-wide-elbow-row",
  "name": "Dumbbell Wide-Elbow Row",
  "equipment": [
   "Dumbbells"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Use a light load. Row with elbows wider to target the upper back without shrugging.",
  "pattern": "row",
  "tags": "Dumbbell Wide-Elbow Row back row"
 },
 {
  "id": "lib-band-bent-over-row",
  "name": "Band Bent-Over Row",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Stand securely on the band and hinge. Draw elbows back while keeping your trunk still.",
  "pattern": "row",
  "tags": "Band Bent-Over Row back row"
 },
 {
  "id": "lib-single-arm-cable-row",
  "name": "Single-Arm Cable Row",
  "equipment": [
   "Pulley"
  ],
  "group": "back",
  "reps": "8–12 / side",
  "description": "Keep hips square and draw the handle toward your lower ribs. Complete both sides.",
  "pattern": "row",
  "tags": "Single-Arm Cable Row back row"
 },
 {
  "id": "lib-cable-lat-pulldown",
  "name": "Cable Lat Pulldown",
  "equipment": [
   "Pulley"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Use a high pulley. Pull elbows toward your sides without leaning far backward.",
  "pattern": "pulldown",
  "tags": "Cable Lat Pulldown back pulldown"
 },
 {
  "id": "lib-straight-arm-band-pulldown",
  "name": "Straight-Arm Band Pulldown",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Use a rated overhead anchor. Keep elbows softly bent and pull hands toward your thighs.",
  "pattern": "straight-arm pulldown",
  "tags": "Straight-Arm Band Pulldown back straight-arm pulldown"
 },
 {
  "id": "lib-straight-arm-cable-pulldown",
  "name": "Straight-Arm Cable Pulldown",
  "equipment": [
   "Pulley"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Use a high pulley and light load. Pull arms down without moving your torso.",
  "pattern": "straight-arm pulldown",
  "tags": "Straight-Arm Cable Pulldown back straight-arm pulldown"
 },
 {
  "id": "lib-cable-face-pull",
  "name": "Cable Face Pull",
  "equipment": [
   "Pulley"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Use a face-height rope attachment. Pull toward your forehead without shrugging.",
  "pattern": "scapular control",
  "tags": "Cable Face Pull back scapular control"
 },
 {
  "id": "lib-band-high-row",
  "name": "Band High Row",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Use a rated chest-height anchor. Draw elbows outward and back with control.",
  "pattern": "row",
  "tags": "Band High Row back row"
 },
 {
  "id": "lib-prone-w-to-y-raise",
  "name": "Prone W-to-Y Raise",
  "equipment": [
   "Bodyweight"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Lie face down. Lift arms gently from a W toward a Y without arching your lower back.",
  "pattern": "scapular control",
  "tags": "Prone W-to-Y Raise back scapular control"
 },
 {
  "id": "lib-dumbbell-pullover-on-floor",
  "name": "Dumbbell Pullover on Floor",
  "equipment": [
   "Dumbbells"
  ],
  "group": "back",
  "reps": "10–15 reps",
  "description": "Lie on the floor holding one light weight securely. Lower overhead only as far as your ribs stay down.",
  "pattern": "straight-arm pulldown",
  "tags": "Dumbbell Pullover on Floor back straight-arm pulldown"
 },
 {
  "id": "lib-alternating-dumbbell-curl",
  "name": "Alternating Dumbbell Curl",
  "equipment": [
   "Dumbbells"
  ],
  "group": "biceps",
  "reps": "8–12 / side",
  "description": "Curl one arm at a time, keeping upper arms still and completing both sides.",
  "pattern": "elbow flexion",
  "tags": "Alternating Dumbbell Curl biceps elbow flexion"
 },
 {
  "id": "lib-cross-body-hammer-curl",
  "name": "Cross-Body Hammer Curl",
  "equipment": [
   "Dumbbells"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Keep palm inward. Curl one weight toward the opposite shoulder without swinging.",
  "pattern": "elbow flexion",
  "tags": "Cross-Body Hammer Curl biceps elbow flexion"
 },
 {
  "id": "lib-dumbbell-zottman-curl",
  "name": "Dumbbell Zottman Curl",
  "equipment": [
   "Dumbbells"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Curl palms up, rotate at the top, then lower palms down with a light load.",
  "pattern": "elbow flexion",
  "tags": "Dumbbell Zottman Curl biceps elbow flexion"
 },
 {
  "id": "lib-seated-dumbbell-curl",
  "name": "Seated Dumbbell Curl",
  "equipment": [
   "Dumbbells",
   "Stable Bench / Support"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Sit upright on a stable seat. Keep elbows still and lower weights slowly.",
  "pattern": "elbow flexion",
  "tags": "Seated Dumbbell Curl biceps elbow flexion"
 },
 {
  "id": "lib-dumbbell-drag-curl",
  "name": "Dumbbell Drag Curl",
  "equipment": [
   "Dumbbells"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Keep weights close to your torso and gently draw elbows back as you curl.",
  "pattern": "elbow flexion",
  "tags": "Dumbbell Drag Curl biceps elbow flexion"
 },
 {
  "id": "lib-dumbbell-wide-curl",
  "name": "Dumbbell Wide Curl",
  "equipment": [
   "Dumbbells"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Turn forearms slightly outward while keeping upper arms by your sides. Curl without swinging.",
  "pattern": "elbow flexion",
  "tags": "Dumbbell Wide Curl biceps elbow flexion"
 },
 {
  "id": "lib-single-arm-band-curl",
  "name": "Single-Arm Band Curl",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "biceps",
  "reps": "8–12 / side",
  "description": "Stand securely on the band. Keep the working elbow still and complete both sides.",
  "pattern": "elbow flexion",
  "tags": "Single-Arm Band Curl biceps elbow flexion"
 },
 {
  "id": "lib-band-hammer-curl",
  "name": "Band Hammer Curl",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Hold band handles with palms inward. Stand securely on the band and curl with control.",
  "pattern": "elbow flexion",
  "tags": "Band Hammer Curl biceps elbow flexion"
 },
 {
  "id": "lib-band-reverse-curl",
  "name": "Band Reverse Curl",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Use an overhand grip with light tension. Keep wrists neutral and elbows steady.",
  "pattern": "elbow flexion",
  "tags": "Band Reverse Curl biceps elbow flexion"
 },
 {
  "id": "lib-cable-biceps-curl",
  "name": "Cable Biceps Curl",
  "equipment": [
   "Pulley"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Use a low pulley. Keep elbows close and curl without leaning backward.",
  "pattern": "elbow flexion",
  "tags": "Cable Biceps Curl biceps elbow flexion"
 },
 {
  "id": "lib-single-arm-cable-curl",
  "name": "Single-Arm Cable Curl",
  "equipment": [
   "Pulley"
  ],
  "group": "biceps",
  "reps": "8–12 / side",
  "description": "Use a low pulley with one handle. Keep the upper arm still and switch sides.",
  "pattern": "elbow flexion",
  "tags": "Single-Arm Cable Curl biceps elbow flexion"
 },
 {
  "id": "lib-cable-rope-hammer-curl",
  "name": "Cable Rope Hammer Curl",
  "equipment": [
   "Pulley"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Hold rope ends with palms inward. Curl without moving your shoulders.",
  "pattern": "elbow flexion",
  "tags": "Cable Rope Hammer Curl biceps elbow flexion"
 },
 {
  "id": "lib-cable-reverse-curl",
  "name": "Cable Reverse Curl",
  "equipment": [
   "Pulley"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Use a low pulley and overhand grip. Keep wrists steady with a light load.",
  "pattern": "elbow flexion",
  "tags": "Cable Reverse Curl biceps elbow flexion"
 },
 {
  "id": "lib-barbell-reverse-curl",
  "name": "Barbell Reverse Curl",
  "equipment": [
   "Barbell",
   "Squat Rack"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Use a light bar with palms down. Keep elbows close and wrists steady.",
  "pattern": "elbow flexion",
  "tags": "Barbell Reverse Curl biceps elbow flexion"
 },
 {
  "id": "lib-barbell-drag-curl",
  "name": "Barbell Drag Curl",
  "equipment": [
   "Barbell",
   "Squat Rack"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Draw elbows gently backward as you curl the bar close to your body.",
  "pattern": "elbow flexion",
  "tags": "Barbell Drag Curl biceps elbow flexion"
 },
 {
  "id": "lib-sandbag-biceps-curl",
  "name": "Sandbag Biceps Curl",
  "equipment": [
   "Sandbag"
  ],
  "group": "biceps",
  "reps": "10–15 reps",
  "description": "Hold secure handles. Keep elbows close and curl the bag without swinging.",
  "pattern": "elbow flexion",
  "tags": "Sandbag Biceps Curl biceps elbow flexion"
 },
 {
  "id": "lib-side-plank",
  "name": "Side Plank",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "20–30 sec",
  "description": "Stack your elbow under your shoulder. Lift your hips and breathe; repeat on both sides.",
  "pattern": "anti-lateral flexion",
  "tags": "Side Plank core anti-lateral flexion"
 },
 {
  "id": "lib-kneeling-side-plank",
  "name": "Kneeling Side Plank",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "20–30 sec",
  "description": "Support on your forearm and bottom knee. Keep hips lifted; repeat on both sides.",
  "pattern": "anti-lateral flexion",
  "tags": "Kneeling Side Plank core anti-lateral flexion"
 },
 {
  "id": "lib-plank-shoulder-taps",
  "name": "Plank Shoulder Taps",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "8–12 / side",
  "description": "From a high plank, tap the opposite shoulder without rocking your hips. Alternate sides.",
  "pattern": "anti-rotation",
  "tags": "Plank Shoulder Taps core anti-rotation"
 },
 {
  "id": "lib-reverse-crunch",
  "name": "Reverse Crunch",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "10–15 reps",
  "description": "Lie on your back. Gently curl your pelvis off the floor without swinging your legs.",
  "pattern": "trunk flexion",
  "tags": "Reverse Crunch core trunk flexion"
 },
 {
  "id": "lib-bent-knee-crunch",
  "name": "Bent-Knee Crunch",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "10–15 reps",
  "description": "Keep feet planted and lift shoulder blades slightly. Avoid pulling your neck.",
  "pattern": "trunk flexion",
  "tags": "Bent-Knee Crunch core trunk flexion"
 },
 {
  "id": "lib-heel-taps",
  "name": "Heel Taps",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "10–15 reps",
  "description": "Lie on your back with knees bent. Lift shoulders gently and reach sideways toward each heel.",
  "pattern": "trunk flexion",
  "tags": "Heel Taps core trunk flexion"
 },
 {
  "id": "lib-supine-toe-taps",
  "name": "Supine Toe Taps",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "8–12 / side",
  "description": "Hold knees over hips. Lower one foot at a time without arching your lower back.",
  "pattern": "anti-extension",
  "tags": "Supine Toe Taps core anti-extension"
 },
 {
  "id": "lib-dead-bug-heel-slide",
  "name": "Dead Bug Heel Slide",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "10–15 reps",
  "description": "Lie with knees bent. Slide one heel away while keeping your ribs and pelvis steady.",
  "pattern": "anti-extension",
  "tags": "Dead Bug Heel Slide core anti-extension"
 },
 {
  "id": "lib-hollow-body-rocks",
  "name": "Hollow Body Rocks",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "10–15 reps",
  "description": "Keep your lower back rounded toward the floor and rock gently. Bend knees if needed.",
  "pattern": "anti-extension",
  "tags": "Hollow Body Rocks core anti-extension"
 },
 {
  "id": "lib-seated-knee-tucks",
  "name": "Seated Knee Tucks",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "10–15 reps",
  "description": "Sit with hands on the floor beside you. Draw knees toward your chest without jerking.",
  "pattern": "trunk flexion",
  "tags": "Seated Knee Tucks core trunk flexion"
 },
 {
  "id": "lib-bear-plank",
  "name": "Bear Plank",
  "equipment": [
   "Bodyweight"
  ],
  "group": "core",
  "reps": "20–30 sec",
  "description": "From hands and knees, lift knees slightly. Keep your back level and breathe.",
  "pattern": "anti-extension",
  "tags": "Bear Plank core anti-extension"
 },
 {
  "id": "lib-band-pallof-press",
  "name": "Band Pallof Press",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "core",
  "reps": "8–12 / side",
  "description": "Use a rated chest-height side anchor. Press hands forward without twisting. Complete both sides.",
  "pattern": "anti-rotation",
  "tags": "Band Pallof Press core anti-rotation"
 },
 {
  "id": "lib-cable-pallof-press",
  "name": "Cable Pallof Press",
  "equipment": [
   "Pulley"
  ],
  "group": "core",
  "reps": "8–12 / side",
  "description": "Stand side-on to a chest-height pulley. Press forward and resist turning. Switch sides.",
  "pattern": "anti-rotation",
  "tags": "Cable Pallof Press core anti-rotation"
 },
 {
  "id": "lib-kettlebell-suitcase-march",
  "name": "Kettlebell Suitcase March",
  "equipment": [
   "Kettlebells"
  ],
  "group": "core",
  "reps": "8–12 / side",
  "description": "Hold the bell by one side and march slowly without leaning. Complete both sides.",
  "pattern": "anti-lateral flexion",
  "tags": "Kettlebell Suitcase March core anti-lateral flexion"
 },
 {
  "id": "lib-dumbbell-suitcase-march",
  "name": "Dumbbell Suitcase March",
  "equipment": [
   "Dumbbells"
  ],
  "group": "core",
  "reps": "8–12 / side",
  "description": "Hold one weight by your side. March with hips level, then switch sides.",
  "pattern": "anti-lateral flexion",
  "tags": "Dumbbell Suitcase March core anti-lateral flexion"
 },
 {
  "id": "lib-standing-band-wood-chop",
  "name": "Standing Band Wood Chop",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "core",
  "reps": "10–15 reps",
  "description": "Use a rated high anchor. Rotate gently through hips and trunk without wrenching your back.",
  "pattern": "trunk rotation",
  "tags": "Standing Band Wood Chop core trunk rotation"
 },
 {
  "id": "lib-forward-lunges",
  "name": "Forward Lunges",
  "equipment": [
   "Bodyweight"
  ],
  "group": "squat",
  "reps": "8–12 / side",
  "description": "Step forward and lower with control. Push through the front foot to return. Alternate sides.",
  "pattern": "lunge",
  "tags": "Forward Lunges squat lunge"
 },
 {
  "id": "lib-walking-lunges",
  "name": "Walking Lunges",
  "equipment": [
   "Bodyweight"
  ],
  "group": "squat",
  "reps": "8–12 / side",
  "description": "Use a clear level space. Step forward, lower, then bring the back leg through. Alternate sides.",
  "pattern": "lunge",
  "tags": "Walking Lunges squat lunge"
 },
 {
  "id": "lib-dumbbell-forward-lunges",
  "name": "Dumbbell Forward Lunges",
  "equipment": [
   "Dumbbells"
  ],
  "group": "squat",
  "reps": "8–12 / side",
  "description": "Hold weights by your sides. Step forward, lower steadily and return. Alternate sides.",
  "pattern": "lunge",
  "tags": "Dumbbell Forward Lunges squat lunge"
 },
 {
  "id": "lib-dumbbell-walking-lunges",
  "name": "Dumbbell Walking Lunges",
  "equipment": [
   "Dumbbells"
  ],
  "group": "squat",
  "reps": "8–12 / side",
  "description": "Hold weights by your sides in a clear space. Keep each step controlled and alternate sides.",
  "pattern": "lunge",
  "tags": "Dumbbell Walking Lunges squat lunge"
 },
 {
  "id": "lib-dumbbell-split-squat",
  "name": "Dumbbell Split Squat",
  "equipment": [
   "Dumbbells"
  ],
  "group": "squat",
  "reps": "8–12 / side",
  "description": "Use a stable split stance. Lower straight down with weights by your sides. Complete both sides.",
  "pattern": "lunge",
  "tags": "Dumbbell Split Squat squat lunge"
 },
 {
  "id": "lib-kettlebell-reverse-lunge",
  "name": "Kettlebell Reverse Lunge",
  "equipment": [
   "Kettlebells"
  ],
  "group": "squat",
  "reps": "8–12 / side",
  "description": "Hold the bell at your chest. Step back, lower with control and return. Alternate sides.",
  "pattern": "lunge",
  "tags": "Kettlebell Reverse Lunge squat lunge"
 },
 {
  "id": "lib-sandbag-reverse-lunge",
  "name": "Sandbag Reverse Lunge",
  "equipment": [
   "Sandbag"
  ],
  "group": "squat",
  "reps": "8–12 / side",
  "description": "Hug the bag to your chest. Step backward and lower without twisting. Alternate sides.",
  "pattern": "lunge",
  "tags": "Sandbag Reverse Lunge squat lunge"
 },
 {
  "id": "lib-dumbbell-lateral-lunge",
  "name": "Dumbbell Lateral Lunge",
  "equipment": [
   "Dumbbells"
  ],
  "group": "squat",
  "reps": "8–12 / side",
  "description": "Hold weights close. Step sideways and sit into that hip before returning. Complete both sides.",
  "pattern": "lunge",
  "tags": "Dumbbell Lateral Lunge squat lunge"
 },
 {
  "id": "lib-kettlebell-split-squat",
  "name": "Kettlebell Split Squat",
  "equipment": [
   "Kettlebells"
  ],
  "group": "squat",
  "reps": "8–12 / side",
  "description": "Hold the bell at your chest. Lower in a split stance without shifting your feet. Complete both sides.",
  "pattern": "lunge",
  "tags": "Kettlebell Split Squat squat lunge"
 },
 {
  "id": "lib-dumbbell-front-squat",
  "name": "Dumbbell Front Squat",
  "equipment": [
   "Dumbbells"
  ],
  "group": "squat",
  "reps": "10–15 reps",
  "description": "Hold weights at your shoulders. Keep heels planted and squat through a controlled range.",
  "pattern": "squat",
  "tags": "Dumbbell Front Squat squat squat"
 },
 {
  "id": "lib-kettlebell-sumo-squat",
  "name": "Kettlebell Sumo Squat",
  "equipment": [
   "Kettlebells"
  ],
  "group": "squat",
  "reps": "10–15 reps",
  "description": "Use a comfortable wide stance. Hold the bell low and stand without rounding your back.",
  "pattern": "squat",
  "tags": "Kettlebell Sumo Squat squat squat"
 },
 {
  "id": "lib-dumbbell-sumo-squat",
  "name": "Dumbbell Sumo Squat",
  "equipment": [
   "Dumbbells"
  ],
  "group": "squat",
  "reps": "10–15 reps",
  "description": "Hold one weight securely with both hands. Squat in a comfortable wide stance.",
  "pattern": "squat",
  "tags": "Dumbbell Sumo Squat squat squat"
 },
 {
  "id": "lib-paused-bodyweight-squat",
  "name": "Paused Bodyweight Squat",
  "equipment": [
   "Bodyweight"
  ],
  "group": "squat",
  "reps": "10–15 reps",
  "description": "Pause briefly at a comfortable squat depth, then stand without bouncing.",
  "pattern": "squat",
  "tags": "Paused Bodyweight Squat squat squat"
 },
 {
  "id": "lib-tempo-goblet-squat",
  "name": "Tempo Goblet Squat",
  "equipment": [
   "Kettlebells"
  ],
  "group": "squat",
  "reps": "10–15 reps",
  "description": "Hold the bell at your chest. Lower for three seconds and stand with control.",
  "pattern": "squat",
  "tags": "Tempo Goblet Squat squat squat"
 },
 {
  "id": "lib-single-leg-dumbbell-romanian-deadlift",
  "name": "Single-Leg Dumbbell Romanian Deadlift",
  "equipment": [
   "Dumbbells"
  ],
  "group": "hinge",
  "reps": "8–12 / side",
  "description": "Hold light weights and hinge over one leg, keeping hips square. Complete both sides.",
  "pattern": "hip hinge",
  "tags": "Single-Leg Dumbbell Romanian Deadlift hinge hip hinge"
 },
 {
  "id": "lib-kettlebell-kickstand-romanian-deadlift",
  "name": "Kettlebell Kickstand Romanian Deadlift",
  "equipment": [
   "Kettlebells"
  ],
  "group": "hinge",
  "reps": "8–12 / side",
  "description": "Use the back toes lightly for balance. Hinge over the front hip and complete both sides.",
  "pattern": "hip hinge",
  "tags": "Kettlebell Kickstand Romanian Deadlift hinge hip hinge"
 },
 {
  "id": "lib-single-leg-kettlebell-romanian-deadlift",
  "name": "Single-Leg Kettlebell Romanian Deadlift",
  "equipment": [
   "Kettlebells"
  ],
  "group": "hinge",
  "reps": "8–12 / side",
  "description": "Hinge over one leg with a light bell. Keep hips square and complete both sides.",
  "pattern": "hip hinge",
  "tags": "Single-Leg Kettlebell Romanian Deadlift hinge hip hinge"
 },
 {
  "id": "lib-band-romanian-deadlift",
  "name": "Band Romanian Deadlift",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "hinge",
  "reps": "10–15 reps",
  "description": "Stand on the band securely. Push hips back with softly bent knees and return tall.",
  "pattern": "hip hinge",
  "tags": "Band Romanian Deadlift hinge hip hinge"
 },
 {
  "id": "lib-band-pull-through",
  "name": "Band Pull-Through",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "hinge",
  "reps": "10–15 reps",
  "description": "Use a rated low anchor behind you. Hinge with hands between legs, then stand tall.",
  "pattern": "hip hinge",
  "tags": "Band Pull-Through hinge hip hinge"
 },
 {
  "id": "lib-cable-pull-through",
  "name": "Cable Pull-Through",
  "equipment": [
   "Pulley"
  ],
  "group": "hinge",
  "reps": "10–15 reps",
  "description": "Face away from a low pulley. Hinge and extend hips without arching your lower back.",
  "pattern": "hip hinge",
  "tags": "Cable Pull-Through hinge hip hinge"
 },
 {
  "id": "lib-kettlebell-deadlift",
  "name": "Kettlebell Deadlift",
  "equipment": [
   "Kettlebells"
  ],
  "group": "hinge",
  "reps": "10–15 reps",
  "description": "Set the bell between your feet. Hinge, brace and stand while keeping the load close.",
  "pattern": "hip hinge",
  "tags": "Kettlebell Deadlift hinge hip hinge"
 },
 {
  "id": "lib-dumbbell-suitcase-deadlift",
  "name": "Dumbbell Suitcase Deadlift",
  "equipment": [
   "Dumbbells"
  ],
  "group": "hinge",
  "reps": "10–15 reps",
  "description": "Keep weights outside your feet. Hinge, bend knees as needed and stand without twisting.",
  "pattern": "hip hinge",
  "tags": "Dumbbell Suitcase Deadlift hinge hip hinge"
 },
 {
  "id": "lib-sandbag-deadlift",
  "name": "Sandbag Deadlift",
  "equipment": [
   "Sandbag"
  ],
  "group": "hinge",
  "reps": "10–15 reps",
  "description": "Use secure handles. Brace and stand with the bag close to your body.",
  "pattern": "hip hinge",
  "tags": "Sandbag Deadlift hinge hip hinge"
 },
 {
  "id": "lib-bodyweight-kickstand-hinge",
  "name": "Bodyweight Kickstand Hinge",
  "equipment": [
   "Bodyweight"
  ],
  "group": "hinge",
  "reps": "8–12 / side",
  "description": "Use the back toes for balance. Push your front hip back with a steady spine. Switch sides.",
  "pattern": "hip hinge",
  "tags": "Bodyweight Kickstand Hinge hinge hip hinge"
 },
 {
  "id": "lib-prone-hamstring-curl",
  "name": "Prone Hamstring Curl",
  "equipment": [
   "Bodyweight"
  ],
  "group": "hinge",
  "reps": "8–12 / side",
  "description": "Lie face down and slowly bend one knee, then extend. Keep your pelvis on the floor.",
  "pattern": "knee flexion",
  "tags": "Prone Hamstring Curl hinge knee flexion"
 },
 {
  "id": "lib-standing-band-hamstring-curl",
  "name": "Standing Band Hamstring Curl",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "hinge",
  "reps": "8–12 / side",
  "description": "Use a secure low anchor and ankle strap. Hold a wall, bend the knee and switch sides.",
  "pattern": "knee flexion",
  "tags": "Standing Band Hamstring Curl hinge knee flexion"
 },
 {
  "id": "lib-seated-band-hamstring-curl",
  "name": "Seated Band Hamstring Curl",
  "equipment": [
   "Resistance Bands",
   "Stable Bench / Support"
  ],
  "group": "hinge",
  "reps": "10–15 reps",
  "description": "Sit on a stable seat facing a secure low anchor. Use an ankle strap and draw your heel back.",
  "pattern": "knee flexion",
  "tags": "Seated Band Hamstring Curl hinge knee flexion"
 },
 {
  "id": "lib-hamstring-walkouts",
  "name": "Hamstring Walkouts",
  "equipment": [
   "Bodyweight"
  ],
  "group": "hinge",
  "reps": "10–15 reps",
  "description": "Start in a low bridge. Take small heel steps out and back while keeping hips controlled.",
  "pattern": "hip extension",
  "tags": "Hamstring Walkouts hinge hip extension"
 },
 {
  "id": "lib-single-leg-hip-thrust",
  "name": "Single-Leg Hip Thrust",
  "equipment": [
   "Bodyweight",
   "Stable Bench / Support"
  ],
  "group": "glutes",
  "reps": "8–12 / side",
  "description": "Support upper back on a secured bench. Lift hips on one leg without twisting. Complete both sides.",
  "pattern": "hip extension",
  "tags": "Single-Leg Hip Thrust glutes hip extension"
 },
 {
  "id": "lib-dumbbell-single-leg-glute-bridge",
  "name": "Dumbbell Single-Leg Glute Bridge",
  "equipment": [
   "Dumbbells"
  ],
  "group": "glutes",
  "reps": "8–12 / side",
  "description": "Hold a padded light weight over your hips. Bridge on one foot with hips level. Switch sides.",
  "pattern": "hip extension",
  "tags": "Dumbbell Single-Leg Glute Bridge glutes hip extension"
 },
 {
  "id": "lib-kettlebell-single-leg-glute-bridge",
  "name": "Kettlebell Single-Leg Glute Bridge",
  "equipment": [
   "Kettlebells"
  ],
  "group": "glutes",
  "reps": "10–15 reps",
  "description": "Hold a padded light bell securely across hips. Lift with one planted foot, then switch.",
  "pattern": "hip extension",
  "tags": "Kettlebell Single-Leg Glute Bridge glutes hip extension"
 },
 {
  "id": "lib-band-hip-thrust",
  "name": "Band Hip Thrust",
  "equipment": [
   "Resistance Bands",
   "Stable Bench / Support"
  ],
  "group": "glutes",
  "reps": "10–15 reps",
  "description": "Use secured upper-back support and a loop above knees. Lift hips without arching.",
  "pattern": "hip extension",
  "tags": "Band Hip Thrust glutes hip extension"
 },
 {
  "id": "lib-sandbag-hip-thrust",
  "name": "Sandbag Hip Thrust",
  "equipment": [
   "Sandbag",
   "Stable Bench / Support"
  ],
  "group": "glutes",
  "reps": "10–15 reps",
  "description": "Use secured upper-back support. Hold the padded bag across hips and lift with control.",
  "pattern": "hip extension",
  "tags": "Sandbag Hip Thrust glutes hip extension"
 },
 {
  "id": "lib-quadruped-hip-extension",
  "name": "Quadruped Hip Extension",
  "equipment": [
   "Bodyweight"
  ],
  "group": "glutes",
  "reps": "8–12 / side",
  "description": "From hands and knees, lift one bent leg behind you without arching your back. Switch sides.",
  "pattern": "hip extension",
  "tags": "Quadruped Hip Extension glutes hip extension"
 },
 {
  "id": "lib-band-donkey-kick",
  "name": "Band Donkey Kick",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "glutes",
  "reps": "8–12 / side",
  "description": "Secure a loop band appropriately. From hands and knees extend one hip without twisting. Switch sides.",
  "pattern": "hip extension",
  "tags": "Band Donkey Kick glutes hip extension"
 },
 {
  "id": "lib-standing-band-kickback",
  "name": "Standing Band Kickback",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "glutes",
  "reps": "8–12 / side",
  "description": "Use a secure low anchor and ankle strap. Hold support and extend the hip gently. Switch sides.",
  "pattern": "hip extension",
  "tags": "Standing Band Kickback glutes hip extension"
 },
 {
  "id": "lib-cable-glute-kickback",
  "name": "Cable Glute Kickback",
  "equipment": [
   "Pulley"
  ],
  "group": "glutes",
  "reps": "8–12 / side",
  "description": "Use a low pulley and ankle strap. Keep your pelvis steady and extend the hip. Switch sides.",
  "pattern": "hip extension",
  "tags": "Cable Glute Kickback glutes hip extension"
 },
 {
  "id": "lib-prone-bent-knee-hip-extension",
  "name": "Prone Bent-Knee Hip Extension",
  "equipment": [
   "Bodyweight"
  ],
  "group": "glutes",
  "reps": "8–12 / side",
  "description": "Lie face down with one knee bent. Lift the thigh slightly without arching. Complete both sides.",
  "pattern": "hip extension",
  "tags": "Prone Bent-Knee Hip Extension glutes hip extension"
 },
 {
  "id": "lib-wide-stance-glute-bridge",
  "name": "Wide-Stance Glute Bridge",
  "equipment": [
   "Bodyweight"
  ],
  "group": "glutes",
  "reps": "10–15 reps",
  "description": "Plant feet slightly wider than hips. Lift your pelvis without letting your knees cave inward.",
  "pattern": "hip extension",
  "tags": "Wide-Stance Glute Bridge glutes hip extension"
 },
 {
  "id": "lib-paused-glute-bridge",
  "name": "Paused Glute Bridge",
  "equipment": [
   "Bodyweight"
  ],
  "group": "glutes",
  "reps": "10–15 reps",
  "description": "Lift hips from the floor and pause for two seconds at the top before lowering.",
  "pattern": "hip extension",
  "tags": "Paused Glute Bridge glutes hip extension"
 },
 {
  "id": "lib-dumbbell-frog-pump",
  "name": "Dumbbell Frog Pump",
  "equipment": [
   "Dumbbells"
  ],
  "group": "glutes",
  "reps": "10–15 reps",
  "description": "Hold a padded light weight over hips, soles together. Use a small controlled hip lift.",
  "pattern": "hip extension",
  "tags": "Dumbbell Frog Pump glutes hip extension"
 },
 {
  "id": "lib-seated-band-hip-abduction",
  "name": "Seated Band Hip Abduction",
  "equipment": [
   "Resistance Bands",
   "Stable Bench / Support"
  ],
  "group": "hips",
  "reps": "10–15 reps",
  "description": "Sit tall on a stable seat with a loop above knees. Open knees without rocking your trunk.",
  "pattern": "hip abduction",
  "tags": "Seated Band Hip Abduction hips hip abduction"
 },
 {
  "id": "lib-standing-cable-hip-abduction",
  "name": "Standing Cable Hip Abduction",
  "equipment": [
   "Pulley"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Use a low pulley and ankle strap. Hold support, move the leg sideways and switch sides.",
  "pattern": "hip abduction",
  "tags": "Standing Cable Hip Abduction hips hip abduction"
 },
 {
  "id": "lib-side-lying-banded-leg-raise",
  "name": "Side-Lying Banded Leg Raise",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Place a loop above your knees. Keep hips stacked and lift the top leg slowly. Switch sides.",
  "pattern": "hip abduction",
  "tags": "Side-Lying Banded Leg Raise hips hip abduction"
 },
 {
  "id": "lib-banded-quadruped-hip-abduction",
  "name": "Banded Quadruped Hip Abduction",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Use a loop above knees. Lift one bent knee sideways with a steady pelvis. Switch sides.",
  "pattern": "hip abduction",
  "tags": "Banded Quadruped Hip Abduction hips hip abduction"
 },
 {
  "id": "lib-monster-walk",
  "name": "Monster Walk",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "hips",
  "reps": "10–15 reps",
  "description": "Use a loop above knees. Take short diagonal forward steps while keeping knees aligned.",
  "pattern": "lateral stepping",
  "tags": "Monster Walk hips lateral stepping"
 },
 {
  "id": "lib-diagonal-backward-band-walk",
  "name": "Diagonal Backward Band Walk",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "hips",
  "reps": "10–15 reps",
  "description": "Use a loop above knees. Take small diagonal backward steps in a clear space.",
  "pattern": "lateral stepping",
  "tags": "Diagonal Backward Band Walk hips lateral stepping"
 },
 {
  "id": "lib-standing-hip-adduction",
  "name": "Standing Hip Adduction",
  "equipment": [
   "Bodyweight"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Hold a wall. Bring one leg gently across the midline without leaning. Complete both sides.",
  "pattern": "hip adduction",
  "tags": "Standing Hip Adduction hips hip adduction"
 },
 {
  "id": "lib-side-lying-hip-adduction",
  "name": "Side-Lying Hip Adduction",
  "equipment": [
   "Bodyweight"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Lie on your side with the top foot planted in front. Lift the lower leg gently. Switch sides.",
  "pattern": "hip adduction",
  "tags": "Side-Lying Hip Adduction hips hip adduction"
 },
 {
  "id": "lib-standing-cable-hip-adduction",
  "name": "Standing Cable Hip Adduction",
  "equipment": [
   "Pulley"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Use a low pulley and ankle strap. Draw the working leg across your body without twisting. Switch sides.",
  "pattern": "hip adduction",
  "tags": "Standing Cable Hip Adduction hips hip adduction"
 },
 {
  "id": "lib-standing-band-hip-adduction",
  "name": "Standing Band Hip Adduction",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Use a secure low side anchor and ankle strap. Draw the leg inward without leaning. Switch sides.",
  "pattern": "hip adduction",
  "tags": "Standing Band Hip Adduction hips hip adduction"
 },
 {
  "id": "lib-reverse-clamshell",
  "name": "Reverse Clamshell",
  "equipment": [
   "Bodyweight"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Lie on your side with knees bent together. Raise the top foot without separating knees. Switch sides.",
  "pattern": "hip internal rotation",
  "tags": "Reverse Clamshell hips hip internal rotation"
 },
 {
  "id": "lib-seated-hip-internal-rotation",
  "name": "Seated Hip Internal Rotation",
  "equipment": [
   "Bodyweight",
   "Stable Bench / Support"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Sit on a stable seat. Keep knees in place and move one foot outward gently. Switch sides.",
  "pattern": "hip internal rotation",
  "tags": "Seated Hip Internal Rotation hips hip internal rotation"
 },
 {
  "id": "lib-side-lying-hip-circles",
  "name": "Side-Lying Hip Circles",
  "equipment": [
   "Bodyweight"
  ],
  "group": "hips",
  "reps": "10–15 reps",
  "description": "Keep hips stacked and make small slow circles with the top leg. Repeat both directions and sides.",
  "pattern": "hip control",
  "tags": "Side-Lying Hip Circles hips hip control"
 },
 {
  "id": "lib-standing-band-hip-flexion",
  "name": "Standing Band Hip Flexion",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "hips",
  "reps": "8–12 / side",
  "description": "Use a secure low anchor and ankle strap. Lift one knee without leaning back. Complete both sides.",
  "pattern": "hip flexion",
  "tags": "Standing Band Hip Flexion hips hip flexion"
 },
 {
  "id": "lib-single-leg-bent-knee-calf-raise",
  "name": "Single-Leg Bent-Knee Calf Raise",
  "equipment": [
   "Bodyweight"
  ],
  "group": "calves",
  "reps": "8–12 / side",
  "description": "Hold a wall, soften the standing knee and lift the heel. Complete both sides.",
  "pattern": "calf raise",
  "tags": "Single-Leg Bent-Knee Calf Raise calves calf raise"
 },
 {
  "id": "lib-dumbbell-single-leg-calf-raise",
  "name": "Dumbbell Single-Leg Calf Raise",
  "equipment": [
   "Dumbbells"
  ],
  "group": "calves",
  "reps": "8–12 / side",
  "description": "Hold one weight and support with your free hand. Raise and lower on one foot. Switch sides.",
  "pattern": "calf raise",
  "tags": "Dumbbell Single-Leg Calf Raise calves calf raise"
 },
 {
  "id": "lib-kettlebell-single-leg-calf-raise",
  "name": "Kettlebell Single-Leg Calf Raise",
  "equipment": [
   "Kettlebells"
  ],
  "group": "calves",
  "reps": "8–12 / side",
  "description": "Hold the bell by your side and use support. Lift one heel slowly and complete both sides.",
  "pattern": "calf raise",
  "tags": "Kettlebell Single-Leg Calf Raise calves calf raise"
 },
 {
  "id": "lib-sandbag-standing-calf-raise",
  "name": "Sandbag Standing Calf Raise",
  "equipment": [
   "Sandbag"
  ],
  "group": "calves",
  "reps": "10–15 reps",
  "description": "Hug the bag securely. Rise onto both forefeet and lower slowly near stable support.",
  "pattern": "calf raise",
  "tags": "Sandbag Standing Calf Raise calves calf raise"
 },
 {
  "id": "lib-band-standing-calf-raise",
  "name": "Band Standing Calf Raise",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "calves",
  "reps": "10–15 reps",
  "description": "Stand securely on the band, holding ends by your sides. Raise heels with control.",
  "pattern": "calf raise",
  "tags": "Band Standing Calf Raise calves calf raise"
 },
 {
  "id": "lib-seated-kettlebell-calf-raise",
  "name": "Seated Kettlebell Calf Raise",
  "equipment": [
   "Kettlebells",
   "Stable Bench / Support"
  ],
  "group": "calves",
  "reps": "8–12 / side",
  "description": "Sit on a stable seat. Hold a padded bell above one knee and lift that heel. Switch sides.",
  "pattern": "calf raise",
  "tags": "Seated Kettlebell Calf Raise calves calf raise"
 },
 {
  "id": "lib-seated-sandbag-calf-raise",
  "name": "Seated Sandbag Calf Raise",
  "equipment": [
   "Sandbag",
   "Stable Bench / Support"
  ],
  "group": "calves",
  "reps": "10–15 reps",
  "description": "Sit on a stable seat. Hold the bag across thighs above knees and raise both heels.",
  "pattern": "calf raise",
  "tags": "Seated Sandbag Calf Raise calves calf raise"
 },
 {
  "id": "lib-single-leg-seated-calf-raise",
  "name": "Single-Leg Seated Calf Raise",
  "equipment": [
   "Bodyweight",
   "Stable Bench / Support"
  ],
  "group": "calves",
  "reps": "8–12 / side",
  "description": "Sit on a stable seat. Lift one heel with the knee bent and switch sides.",
  "pattern": "calf raise",
  "tags": "Single-Leg Seated Calf Raise calves calf raise"
 },
 {
  "id": "lib-single-leg-seated-dumbbell-calf-raise",
  "name": "Single-Leg Seated Dumbbell Calf Raise",
  "equipment": [
   "Dumbbells",
   "Stable Bench / Support"
  ],
  "group": "calves",
  "reps": "8–12 / side",
  "description": "Hold a padded weight above one bent knee. Lift the heel with control and switch sides.",
  "pattern": "calf raise",
  "tags": "Single-Leg Seated Dumbbell Calf Raise calves calf raise"
 },
 {
  "id": "lib-dumbbell-bent-knee-calf-raise",
  "name": "Dumbbell Bent-Knee Calf Raise",
  "equipment": [
   "Dumbbells"
  ],
  "group": "calves",
  "reps": "10–15 reps",
  "description": "Use a light weight and stable support. Keep knees softly bent as you lift both heels.",
  "pattern": "calf raise",
  "tags": "Dumbbell Bent-Knee Calf Raise calves calf raise"
 },
 {
  "id": "lib-kettlebell-bent-knee-calf-raise",
  "name": "Kettlebell Bent-Knee Calf Raise",
  "equipment": [
   "Kettlebells"
  ],
  "group": "calves",
  "reps": "10–15 reps",
  "description": "Hold a light bell and use support. Keep knees bent while raising and lowering heels.",
  "pattern": "calf raise",
  "tags": "Kettlebell Bent-Knee Calf Raise calves calf raise"
 },
 {
  "id": "lib-paused-standing-calf-raise",
  "name": "Paused Standing Calf Raise",
  "equipment": [
   "Bodyweight"
  ],
  "group": "calves",
  "reps": "10–15 reps",
  "description": "Hold support and pause two seconds at the top of each heel raise before lowering.",
  "pattern": "calf raise",
  "tags": "Paused Standing Calf Raise calves calf raise"
 },
 {
  "id": "lib-slow-eccentric-calf-raise",
  "name": "Slow Eccentric Calf Raise",
  "equipment": [
   "Bodyweight"
  ],
  "group": "calves",
  "reps": "10–15 reps",
  "description": "Hold support, raise both heels, then lower for three seconds without bouncing.",
  "pattern": "calf raise",
  "tags": "Slow Eccentric Calf Raise calves calf raise"
 },
 {
  "id": "lib-wall-lean-calf-raise",
  "name": "Wall-Lean Calf Raise",
  "equipment": [
   "Bodyweight"
  ],
  "group": "calves",
  "reps": "10–15 reps",
  "description": "Lean hands against a wall with a straight body. Raise heels while keeping toes planted.",
  "pattern": "calf raise",
  "tags": "Wall-Lean Calf Raise calves calf raise"
 },
 {
  "id": "lib-split-stance-calf-raise",
  "name": "Split-Stance Calf Raise",
  "equipment": [
   "Bodyweight"
  ],
  "group": "calves",
  "reps": "8–12 / side",
  "description": "Use a wall for support. Load the front foot and raise that heel. Complete both sides.",
  "pattern": "calf raise",
  "tags": "Split-Stance Calf Raise calves calf raise"
 },
 {
  "id": "lib-dumbbell-split-stance-calf-raise",
  "name": "Dumbbell Split-Stance Calf Raise",
  "equipment": [
   "Dumbbells"
  ],
  "group": "calves",
  "reps": "8–12 / side",
  "description": "Hold one weight and support with the free hand. Raise the front heel, then switch sides.",
  "pattern": "calf raise",
  "tags": "Dumbbell Split-Stance Calf Raise calves calf raise"
 },
 {
  "id": "lib-step-jacks",
  "name": "Step Jacks",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "8–12 / side",
  "description": "Step one foot sideways while raising arms, then return. Alternate sides without jumping.",
  "pattern": "conditioning",
  "tags": "Step Jacks full conditioning"
 },
 {
  "id": "lib-jumping-jacks",
  "name": "Jumping Jacks",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "10–15 reps",
  "description": "Land softly with knees aligned. Use step jacks for a lower-impact option.",
  "pattern": "conditioning",
  "tags": "Jumping Jacks full conditioning"
 },
 {
  "id": "lib-high-knee-march",
  "name": "High-Knee March",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "8–12 / side",
  "description": "March in place with an upright torso and controlled knee lifts. Alternate sides.",
  "pattern": "conditioning",
  "tags": "High-Knee March full conditioning"
 },
 {
  "id": "lib-standing-cross-body-knee-drive",
  "name": "Standing Cross-Body Knee Drive",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "8–12 / side",
  "description": "Bring one knee toward the opposite hand without pulling on your neck. Alternate sides.",
  "pattern": "conditioning",
  "tags": "Standing Cross-Body Knee Drive full conditioning"
 },
 {
  "id": "lib-standing-shadow-boxing",
  "name": "Standing Shadow Boxing",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "10–15 reps",
  "description": "Use light controlled punches with soft knees. Count each punch and avoid snapping elbows.",
  "pattern": "conditioning",
  "tags": "Standing Shadow Boxing full conditioning"
 },
 {
  "id": "lib-squat-to-calf-raise",
  "name": "Squat to Calf Raise",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "10–15 reps",
  "description": "Squat through a comfortable range, stand and lift heels with control.",
  "pattern": "conditioning",
  "tags": "Squat to Calf Raise full conditioning"
 },
 {
  "id": "lib-step-back-burpee",
  "name": "Step-Back Burpee",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "10–15 reps",
  "description": "Step back into a high plank, then step forward and stand. No jump or push-up is required.",
  "pattern": "conditioning",
  "tags": "Step-Back Burpee full conditioning"
 },
 {
  "id": "lib-skater-steps",
  "name": "Skater Steps",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "10–15 reps",
  "description": "Step sideways and lightly tap the other foot behind. Keep landings and knee alignment controlled.",
  "pattern": "conditioning",
  "tags": "Skater Steps full conditioning"
 },
 {
  "id": "lib-plank-step-outs",
  "name": "Plank Step-Outs",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "8–12 / side",
  "description": "From a high plank step one foot sideways and return. Alternate sides with hips steady.",
  "pattern": "conditioning",
  "tags": "Plank Step-Outs full conditioning"
 },
 {
  "id": "lib-bear-crawl-steps",
  "name": "Bear Crawl Steps",
  "equipment": [
   "Bodyweight"
  ],
  "group": "full",
  "reps": "10–15 reps",
  "description": "Keep knees hovering near the floor. Move opposite hand and foot in small controlled steps.",
  "pattern": "conditioning",
  "tags": "Bear Crawl Steps full conditioning"
 },
 {
  "id": "lib-dumbbell-farmer-march",
  "name": "Dumbbell Farmer March",
  "equipment": [
   "Dumbbells"
  ],
  "group": "full",
  "reps": "8–12 / side",
  "description": "Hold weights by your sides. March upright without swaying and count each step.",
  "pattern": "loaded march",
  "tags": "Dumbbell Farmer March full loaded march"
 },
 {
  "id": "lib-kettlebell-goblet-march",
  "name": "Kettlebell Goblet March",
  "equipment": [
   "Kettlebells"
  ],
  "group": "full",
  "reps": "8–12 / side",
  "description": "Hold the bell at your chest and march without leaning backward. Count each step.",
  "pattern": "loaded march",
  "tags": "Kettlebell Goblet March full loaded march"
 },
 {
  "id": "lib-sandbag-bear-hug-march",
  "name": "Sandbag Bear-Hug March",
  "equipment": [
   "Sandbag"
  ],
  "group": "full",
  "reps": "8–12 / side",
  "description": "Hug the bag close and march with hips level. Count each step.",
  "pattern": "loaded march",
  "tags": "Sandbag Bear-Hug March full loaded march"
 },
 {
  "id": "lib-band-resisted-march",
  "name": "Band-Resisted March",
  "equipment": [
   "Resistance Bands"
  ],
  "group": "full",
  "reps": "10–15 reps",
  "description": "Use a light loop over your feet and march slowly without leaning. Keep the band secure.",
  "pattern": "conditioning",
  "tags": "Band-Resisted March full conditioning"
 },
 {
  "id": "lib-dumbbell-squat-to-front-raise",
  "name": "Dumbbell Squat to Front Raise",
  "equipment": [
   "Dumbbells"
  ],
  "group": "full",
  "reps": "10–15 reps",
  "description": "Use light weights. Stand from a squat, then raise weights to shoulder height.",
  "pattern": "conditioning",
  "tags": "Dumbbell Squat to Front Raise full conditioning"
 }
];
for(const m of EXPANDED_MOVES)MOVES[m.id]=m;
for(const id of ['seated','concentration','seatedcalf','dbseatedcalf','hipthrust','bwhipthrust'])MOVES[id].equipment.push('Stable Bench / Support');
MOVES.triceps.id='triceps';
// Retain legacy IDs for saved workouts without duplicating the library entry.
MOVES.dbextension.libraryAlias='triceps';

for(const m of Object.values(MOVES)){if(m.group==='biceps')m.pattern='elbow flexion';if(m.group==='triceps'&&m.pattern!=='close-grip press')m.pattern='elbow extension';}

// Reference challenge at a typical controlled working load, within a muscle group.
// This is a selection aid, not a measurement of personal effort, calories or strength.
move('benchpress','Barbell Bench Press',['Barbell','Stable Bench / Support','Squat Rack'],'press','8–12 reps','Use a secured bench and correctly set rack safety arms or a spotter. Keep feet planted, lower the bar under control and press without bouncing.');
MOVES.benchpress.pattern='horizontal press';
move('dbbench','Dumbbell Bench Press',['Dumbbells','Stable Bench / Support'],'press','8–12 reps','Use a stable bench. Keep wrists stacked, lower through a comfortable range and press with control.');
MOVES.dbbench.pattern='horizontal press';
const PATTERN_LEVELS={'horizontal press':3,'overhead press':3,'shoulder raise':2,'shoulder control':1,'shoulder circling':2,'shoulder sliding':1,'shoulder rotation':1,'rear delt fly':2,'row':3,'pulldown':3,'scapular control':1,'straight-arm pulldown':2,'high pull':4,'hip hinge':3,'swing':4,'squat':3,'lunge':3,'hip extension':2,'knee flexion':2,'hip abduction':1,'hip adduction':1,'hip internal rotation':1,'hip external rotation':1,'hip control':1,'hip flexion':2,'lateral stepping':2,'calf raise':2,'elbow extension':2,'elbow flexion':2,'close-grip press':3,'anti-extension':3,'anti-rotation':2,'anti-lateral flexion':2,'trunk flexion':2,'trunk rotation':2,'trunk stability':1,'conditioning':3,'loaded march':3};
const LEVEL_OVERRIDES={kneepush:1,pushup:3,tempo:4,pausepush:4,pike:4,wallslide:1,halo:2,dbpress:3,kbpress:3,benchpress:4,dbbench:4,squat:1,bodyhinge:1,bridge:1,bwhipthrust:2,singlebridge:3,lunge:3,split:2,lateralunge:3,swing:4,wheel:5,vup:4,plank:2,hollow:3,deadbug:1,birddog:1,selfcurl:1,prone:1,pronet:1,reverseangel:1,closepush:4,calf:1,singlecalf:3,kneecalf:1,seatedcalf:1,clamshell:1,hydrant:1,sideleg:1,standhip:1,thruster:4,clean:5,snatch:5,climber:3,march:2};
const NAMED_LEVELS={'Wall Push-ups':1,'Incline Push-ups':2,'Eccentric Push-ups':2,'Hand-Release Push-ups':3,'Single-Arm Dumbbell Floor Press':4,'Kneeling Close-Grip Push-ups':2,'Incline Close-Grip Push-ups':2,'Wall Triceps Extensions':1,'Single-Leg Dumbbell Romanian Deadlift':4,'Single-Leg Kettlebell Romanian Deadlift':4,'Bodyweight Kickstand Hinge':2,'Forward Lunges':3,'Walking Lunges':3,'Dumbbell Forward Lunges':4,'Dumbbell Walking Lunges':4,'Dumbbell Reverse Lunges':4,'Dumbbell Split Squat':4,'Kettlebell Split Squat':4,'Dumbbell Lateral Lunge':4,'Kettlebell Reverse Lunge':4,'Sandbag Reverse Lunge':4,'Paused Bodyweight Squat':2,'Side Plank':3,'Kneeling Side Plank':1,'Bear Plank':2,'Dead Bug Heel Slide':1,'Supine Toe Taps':1,'Hollow Body Rocks':4,'Single-Leg Hip Thrust':4,'Dumbbell Single-Leg Glute Bridge':4,'Kettlebell Single-Leg Glute Bridge':4,'Step Jacks':1,'Jumping Jacks':3,'High-Knee March':1,'Standing Shadow Boxing':2,'Step-Back Burpee':4,'Bear Crawl Steps':4};
for(const m of Object.values(MOVES)){
 const body=m.equipment.every(e=>e==='Bodyweight'||e==='Stable Bench / Support');
 m.challenge=NAMED_LEVELS[m.name]??LEVEL_OVERRIDES[m.id]??PATTERN_LEVELS[m.pattern]??({shoulder:2,triceps:2,biceps:2,core:2,full:4}[m.group])??2;
 if(body&&m.group==='squat'&&m.pattern==='squat'&&!NAMED_LEVELS[m.name]&&!Object.prototype.hasOwnProperty.call(LEVEL_OVERRIDES,m.id))m.challenge=2;
 m.loadDependent=!body;
}

if(!TYPES.includes('Full Body'))TYPES.splice(TYPES.length-1,0,'Full Body');

// Instruction cross-check: stable IDs preserve saved workouts and history.
const INSTRUCTION_REVIEW={
 "dbpress": {
  "description": "Lie on your back with knees bent and feet flat. Hold dumbbells above your chest, wrists over elbows. Lower until upper arms gently touch the floor, then press up without bouncing."
 },
 "kbpress": {
  "description": "Lie on your back with knees bent. Hold one kettlebell with your wrist stacked over your elbow. Lower the upper arm to the floor, press up, then complete the same reps on the other side."
 },
 "bandpush": {
  "challenge": 4,
  "description": "Use flat-sided dumbbells that cannot roll as handles. Pass a long resistance band across your upper back, below your neck, and trap each end firmly under your hands. Keep a straight body line and use a comfortable depth. Choose regular push-ups if the handles or band cannot be held securely."
 },
 "barohp": {
  "description": "Begin with a manageable bar at shoulder height, hands just wider than shoulders. Brace, press the bar overhead and lower to your shoulders without leaning back. Use a rack to get into position if needed; the rack is not assumed to be available."
 },
 "closepush": {
  "description": "Start in a high plank with hands near shoulder width, elbows close to your sides. Lower your chest and press up with a straight body line. For the knee-supported version, choose Kneeling Close-Grip Push-ups."
 },
 "bandrow": {
  "description": "Sit with knees softly bent and a long band around the arches of both feet, away from your toes. Hold the ends, sit tall and pull your elbows toward your lower ribs. Keep the band seated securely; do not lean back to pull."
 },
 "high": {
  "description": "Use one light kettlebell. Hinge back, then drive through your hips to guide the bell close to your torso. Let the elbow bend without forcing it high, then control the return into the hinge. Complete both sides. This is a hip-powered high pull, not a strict row."
 },
 "dbhigh": {
  "description": "Hold two light dumbbells in front of your thighs. Use a small hip drive to guide the weights close to your torso, bending elbows only through a comfortable range. Lower with control. This is a hip-powered high pull, not a strict row."
 },
 "face": {
  "challenge": 2,
  "description": "Use a secure face-height band anchor. Stand tall with light tension, pull your hands toward your forehead and let elbows open comfortably. Return slowly without leaning backward."
 },
 "lib-cable-face-pull": {
  "challenge": 2
 },
 "lib-alternating-dumbbell-floor-press": {
  "reps": "8–12 / side",
  "description": "Lie on your back with knees bent. Hold both weights above your chest, keep one arm up while lowering and pressing the other, then alternate. One arm press is one rep; complete the target on each arm."
 },
 "lib-cable-front-raise": {
  "reps": "10–15 / side",
  "description": "Face away from a low pulley holding one handle by your side. Raise that hand forward to shoulder height with a softly bent elbow. Lower slowly, then complete the same reps on the other side."
 },
 "lib-cable-external-rotation": {
  "reps": "10–15 / side",
  "description": "Stand side-on to an elbow-height pulley. Hold the handle with the far hand, elbow bent to 90 degrees and tucked against your side. Rotate that forearm outward without moving the elbow; lower and repeat on the other side."
 },
 "lib-single-arm-dumbbell-kickback": {
  "libraryAlias": "dbtri",
  "reps": "12 / side",
  "description": "Hinge forward and keep your upper arm beside your torso. Straighten the elbow with a light dumbbell without swinging your shoulder. Lower slowly and complete both sides."
 },
 "lib-band-triceps-kickback": {
  "description": "Use a secure low band anchor in front. Hinge forward, draw both upper arms alongside your torso and keep them still while straightening your elbows. Bend the elbows slowly to return."
 },
 "lib-barbell-reverse-curl": {
  "equipment": [
   "Barbell"
  ]
 },
 "lib-barbell-drag-curl": {
  "equipment": [
   "Barbell"
  ]
 },
 "lib-barbell-lying-triceps-extension": {
  "equipment": [
   "Barbell"
  ],
  "description": "Lie on the floor with a light bar held above your chest. Keep upper arms steady while bending the elbows to lower the bar just behind your head, then extend. Use a load you can position and set down under control."
 },
 "lib-cross-body-hammer-curl": {
  "reps": "10–12 / side",
  "description": "Stand with a dumbbell in each hand, palms inward. Curl one weight toward the opposite shoulder without swinging, lower and alternate. Complete the target on both arms."
 },
 "lib-side-plank": {
  "reps": "20–30 sec / side",
  "description": "Lie on your side with your elbow below your shoulder and legs straight. Lift your hips so your body forms a straight line. Hold while breathing, then repeat on the other side. Log the combined seconds."
 },
 "lib-kneeling-side-plank": {
  "reps": "20–30 sec / side",
  "description": "Support yourself on your forearm and bent bottom knee, elbow below shoulder. Lift your hips and hold while breathing. Repeat on the other side and log the combined seconds."
 },
 "lib-heel-taps": {
  "reps": "10–15 / side",
  "description": "Lie on your back with knees bent and feet flat. Lift your shoulder blades slightly and reach one hand toward the heel on the same side. Alternate sides; count each reach as one rep."
 },
 "lib-dead-bug-heel-slide": {
  "reps": "8–12 / side",
  "description": "Lie on your back with knees bent and feet flat. Brace gently, slide one heel away and return it without arching your lower back. Alternate legs; each completed slide out and back is one rep."
 },
 "lib-standing-band-wood-chop": {
  "reps": "8–12 / side",
  "description": "Stand side-on to a secure high band anchor. Hold the band with both hands and draw it diagonally toward the opposite hip, turning your feet and hips with your trunk. Return slowly, then face the other way for the other side."
 },
 "lib-kettlebell-suitcase-march": {
  "reps": "10 steps / load side",
  "description": "Hold the kettlebell beside one hip and march slowly without leaning. Each knee lift is one step. Do 10 steps holding it on the left, then 10 holding it on the right; log 20 steps in total."
 },
 "lib-dumbbell-suitcase-march": {
  "reps": "10 steps / load side",
  "description": "Hold one dumbbell beside one hip and march with your torso upright. Each knee lift is one step. Do 10 steps with the weight on the left, then 10 on the right; log 20 steps in total."
 },
 "swing": {
  "description": "Start with the kettlebell slightly in front of you. Hinge to hike it between your legs, then stand sharply by extending your hips so the bell floats up to about chest height. Keep arms relaxed and let the bell return into the hinge; do not turn it into a squat or overhead lift."
 },
 "lunge": {
  "description": "Stand tall, step one foot backward and bend both knees through a comfortable range. Push through the front foot to return. Alternate legs, keeping the front knee in line with the toes. Do the target on each leg and log both together."
 },
 "lib-seated-band-hamstring-curl": {
  "reps": "10–15 / side",
  "description": "Sit on a stable seat facing a secure low band anchor. Attach the band to one ankle with an ankle strap. Start with that leg partly extended, draw the heel back under the seat, then return slowly. Complete both sides."
 },
 "lib-hamstring-walkouts": {
  "reps": "6–10 reps",
  "description": "Begin in a low glute bridge. Take small alternating heel steps away from your hips, then back toward them, keeping your pelvis controlled. One complete walk out and back is one rep."
 },
 "hipthrust": {
  "challenge": 3
 },
 "lib-kettlebell-single-leg-glute-bridge": {
  "reps": "8–12 / side",
  "description": "Lie on your back with one foot planted. Hold a padded light kettlebell securely over your hips. Lift without twisting or arching, lower, and complete the same reps on the other leg."
 },
 "lib-band-donkey-kick": {
  "description": "Place a loop band around your thighs just above your knees. From hands and knees, keep one knee bent and move that thigh backward and slightly upward, without arching your back. Return with control and complete both sides."
 },
 "sidelift": {
  "challenge": 3
 },
 "lib-side-lying-hip-circles": {
  "reps": "6 / direction / side",
  "description": "Lie on your side with hips stacked. Lift the top leg slightly and make six small controlled circles each way. Repeat on the other side. One complete circle is one rep; log 24 circles in total."
 },
 "lib-dumbbell-single-leg-calf-raise": {
  "challenge": 4
 },
 "lib-kettlebell-single-leg-calf-raise": {
  "challenge": 4
 },
 "lib-standing-cross-body-knee-drive": {
  "challenge": 2
 },
 "lib-band-standing-calf-raise": {
  "description": "Stand securely on a long band under the balls of both feet and hold its ends by your sides with gentle tension. Raise your heels slowly and lower under control. If balancing with the band is awkward, choose a supported bodyweight calf raise."
 },
 "lib-step-jacks": {
  "reps": "20 alternating reps",
  "description": "Step one foot sideways while raising your arms, then return to the starting position. Alternate sides without jumping. One step out and back is one rep; log the total across both sides."
 },
 "lib-jumping-jacks": {
  "description": "Start with feet together and arms by your sides. Jump feet apart as arms rise, then return. Land softly with knees aligned; one out-and-back cycle is one rep. Choose Step Jacks for no jumping."
 },
 "lib-skater-steps": {
  "reps": "20 alternating reps",
  "description": "Step sideways and lightly tap the other foot behind without jumping. Keep your knee aligned with the stepping foot. One sideways step and tap is one rep; count both directions together."
 },
 "lib-monster-walk": {
  "reps": "20 alternating steps",
  "description": "Place a loop band above your knees, soften your knees and take short diagonal forward steps without letting your knees cave inward. Count each step as one rep; log the total across both feet."
 },
 "lib-diagonal-backward-band-walk": {
  "reps": "20 alternating steps",
  "description": "Place a loop band above your knees and soften your knees. Take small diagonal backward steps in a clear space, keeping tension in the band. Each step is one rep; count both feet together."
 },
 "lib-bear-crawl-steps": {
  "reps": "10–20 alternating steps",
  "description": "Begin on hands and knees, then lift knees just off the floor. Move one hand and the opposite foot forward together, then the other pair. Each paired movement is one step; count the total steps."
 },
 "clean": {
  "description": "Use a light kettlebell and a clean you already know. Hinge, drive through your hips and guide the bell close around the hand into the rack at your shoulder rather than flipping it onto your wrist. Pause, brace and press overhead. Lower to the rack, then reset. One clean followed by one press is one rep; complete both sides."
 },
 "snatch": {
  "description": "Use a light dumbbell and a snatch you already know. Hinge with the weight between your legs, drive through your hips and guide it close before punching the hand overhead. Finish with the arm stable, then lower under control and reset. One lift overhead is one rep; complete both sides."
 },
 "lib-dumbbell-squat-to-front-raise": {
  "description": "Use light dumbbells. Squat through a comfortable range, stand fully, then lift the weights in front to shoulder height and lower them. One squat followed by one raise is one rep."
 },
 "lib-dumbbell-tate-press": {
  "description": "Lie on the floor holding light dumbbells above your chest with palms toward your feet. Bend the elbows outward so the weights move toward your upper chest, then straighten the elbows. Keep the movement controlled and avoid turning it into a shoulder press."
 }
};
for(const [id,changes] of Object.entries(INSTRUCTION_REVIEW))Object.assign(MOVES[id],changes);

EQUIPMENT.push('Band Anchor','Ankle Strap');
for(const m of Object.values(MOVES)){
 if(m.equipment.includes('Resistance Bands')&&/anchor/i.test(m.description)&&!m.equipment.includes('Band Anchor'))m.equipment.push('Band Anchor');
 if(/ankle strap/i.test(m.description)&&!m.equipment.includes('Ankle Strap'))m.equipment.push('Ankle Strap');
}
// Hip-powered high pulls remain available, but the normal Pull slot starts with back control.
PRESETS.Pull[2]=['face','lib-cable-face-pull','prone','pronet','reverseangel'];

Object.assign(MOVES.dbcalf,{description:'Hold one or two dumbbells by your sides. If you need a hand on a wall for balance, use just one dumbbell and keep the other hand free. Rise onto the balls of your feet, pause and lower slowly.'});
Object.assign(MOVES.tempo,{description:'Begin in a high plank with a straight body line. Lower for three seconds, then press up with control. Choose a knee-supported or incline variation from the library if you need less challenge.'});
Object.assign(MOVES.pike,{description:'Start with hands on the floor and hips raised in an inverted V. Bend your elbows and lower your head toward the floor slightly in front of your hands, without resting weight on your head. Press back up with control.'});
Object.assign(MOVES.twist,{description:'Sit with feet planted and hold the kettlebell close with both hands. Lean back slightly only if you can keep your torso controlled. Rotate gently left and right; each turn to one side is one rep. Complete the target on each side and log the combined total.'});
Object.assign(MOVES['lib-band-resisted-march'],{reps:'20 alternating steps',description:'Place a light loop band over the midfoot of both shoes and stand tall. Lift one knee, lower it, then alternate without leaning backward. Each knee lift is one step; log the total across both legs.'});

// Refresh only unchanged built-in text in saved choices; preserve user-edited targets.
const INSTRUCTION_BASELINES={
 "dbpress": {
  "description": "Lower with control until your upper arms touch the floor. Press up."
 },
 "kbpress": {
  "description": "Keep your wrist stacked and ribs down. Complete both sides."
 },
 "bandpush": {
  "description": "Use stable flat-sided handles and a secure band. Use only a comfortable depth."
 },
 "barohp": {
  "description": "Brace your midsection and keep the bar path close."
 },
 "pike": {
  "description": "Raise your hips and bend your elbows to lower your head between your hands."
 },
 "bandtri": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "closepush": {
  "description": "Keep elbows close. Use your knees if needed."
 },
 "lat": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "bandrow": {
  "description": "Secure the band at foot level and draw elbows back."
 },
 "high": {
  "description": "Drive through your hips, keep the bell close and use a controlled range."
 },
 "dbhigh": {
  "description": "Use a light load and keep the pull close to your body."
 },
 "face": {
  "description": "Use a secure face-height anchor. Pull toward your forehead.",
  "equipment": [
   "Resistance Bands"
  ]
 },
 "twist": {
  "description": "Keep feet grounded and rotate slowly through a comfortable range."
 },
 "swing": {
  "description": "Drive from your hips, not your arms. Use a crisp hinge and a braced trunk."
 },
 "lunge": {
  "description": "Step back, lower with control and push through your front foot."
 },
 "clean": {
  "description": "Clean into a stable rack, pause, then press. Use a movement you already know."
 },
 "snatch": {
  "description": "Drive through your hips and guide a light weight overhead with control."
 },
 "tempo": {
  "description": "Lower for three seconds, then press up. Use knees if needed."
 },
 "dbcalf": {
  "description": "Hold dumbbells by your sides and use support for balance as needed. Rise onto your toes and lower slowly."
 },
 "lib-alternating-dumbbell-floor-press": {
  "reps": "10–15 reps",
  "description": "Hold one weight above the chest while pressing the other. Alternate arms."
 },
 "lib-standing-band-chest-press": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-standing-band-chest-fly": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-cable-front-raise": {
  "reps": "10–15 reps",
  "description": "Face away from a low pulley. Raise the handle forward with a softly bent elbow."
 },
 "lib-cable-external-rotation": {
  "reps": "10–15 reps",
  "description": "Set the pulley at elbow height. Keep your elbow by your side as you rotate outward."
 },
 "lib-dumbbell-tate-press": {
  "description": "Lie on the floor with light weights over your chest. Bend elbows outward and extend with control."
 },
 "lib-band-overhead-triceps-extension": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-single-arm-band-pushdown": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-band-triceps-kickback": {
  "description": "Use a secure low anchor in front. Hinge and straighten elbows without moving upper arms.",
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-barbell-lying-triceps-extension": {
  "description": "Lie on the floor with a light bar. Keep upper arms steady and lower the bar behind your head.",
  "equipment": [
   "Barbell",
   "Squat Rack"
  ]
 },
 "lib-straight-arm-band-pulldown": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-band-high-row": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-cross-body-hammer-curl": {
  "reps": "10–15 reps",
  "description": "Keep palm inward. Curl one weight toward the opposite shoulder without swinging."
 },
 "lib-barbell-reverse-curl": {
  "equipment": [
   "Barbell",
   "Squat Rack"
  ]
 },
 "lib-barbell-drag-curl": {
  "equipment": [
   "Barbell",
   "Squat Rack"
  ]
 },
 "lib-side-plank": {
  "reps": "20–30 sec",
  "description": "Stack your elbow under your shoulder. Lift your hips and breathe; repeat on both sides."
 },
 "lib-kneeling-side-plank": {
  "reps": "20–30 sec",
  "description": "Support on your forearm and bottom knee. Keep hips lifted; repeat on both sides."
 },
 "lib-heel-taps": {
  "reps": "10–15 reps",
  "description": "Lie on your back with knees bent. Lift shoulders gently and reach sideways toward each heel."
 },
 "lib-dead-bug-heel-slide": {
  "reps": "10–15 reps",
  "description": "Lie with knees bent. Slide one heel away while keeping your ribs and pelvis steady."
 },
 "lib-band-pallof-press": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-kettlebell-suitcase-march": {
  "reps": "8–12 / side",
  "description": "Hold the bell by one side and march slowly without leaning. Complete both sides."
 },
 "lib-dumbbell-suitcase-march": {
  "reps": "8–12 / side",
  "description": "Hold one weight by your side. March with hips level, then switch sides."
 },
 "lib-standing-band-wood-chop": {
  "reps": "10–15 reps",
  "description": "Use a rated high anchor. Rotate gently through hips and trunk without wrenching your back.",
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-band-pull-through": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-standing-band-hamstring-curl": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-seated-band-hamstring-curl": {
  "reps": "10–15 reps",
  "description": "Sit on a stable seat facing a secure low anchor. Use an ankle strap and draw your heel back.",
  "equipment": [
   "Resistance Bands",
   "Stable Bench / Support"
  ]
 },
 "lib-hamstring-walkouts": {
  "reps": "10–15 reps",
  "description": "Start in a low bridge. Take small heel steps out and back while keeping hips controlled."
 },
 "lib-kettlebell-single-leg-glute-bridge": {
  "reps": "10–15 reps",
  "description": "Hold a padded light bell securely across hips. Lift with one planted foot, then switch."
 },
 "lib-band-donkey-kick": {
  "description": "Secure a loop band appropriately. From hands and knees extend one hip without twisting. Switch sides."
 },
 "lib-standing-band-kickback": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-cable-glute-kickback": {
  "equipment": [
   "Pulley"
  ]
 },
 "lib-standing-cable-hip-abduction": {
  "equipment": [
   "Pulley"
  ]
 },
 "lib-monster-walk": {
  "reps": "10–15 reps",
  "description": "Use a loop above knees. Take short diagonal forward steps while keeping knees aligned."
 },
 "lib-diagonal-backward-band-walk": {
  "reps": "10–15 reps",
  "description": "Use a loop above knees. Take small diagonal backward steps in a clear space."
 },
 "lib-standing-cable-hip-adduction": {
  "equipment": [
   "Pulley"
  ]
 },
 "lib-standing-band-hip-adduction": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-side-lying-hip-circles": {
  "reps": "10–15 reps",
  "description": "Keep hips stacked and make small slow circles with the top leg. Repeat both directions and sides."
 },
 "lib-standing-band-hip-flexion": {
  "equipment": [
   "Resistance Bands"
  ]
 },
 "lib-band-standing-calf-raise": {
  "description": "Stand securely on the band, holding ends by your sides. Raise heels with control."
 },
 "lib-step-jacks": {
  "reps": "8–12 / side",
  "description": "Step one foot sideways while raising arms, then return. Alternate sides without jumping."
 },
 "lib-jumping-jacks": {
  "description": "Land softly with knees aligned. Use step jacks for a lower-impact option."
 },
 "lib-skater-steps": {
  "reps": "10–15 reps",
  "description": "Step sideways and lightly tap the other foot behind. Keep landings and knee alignment controlled."
 },
 "lib-bear-crawl-steps": {
  "reps": "10–15 reps",
  "description": "Keep knees hovering near the floor. Move opposite hand and foot in small controlled steps."
 },
 "lib-band-resisted-march": {
  "reps": "10–15 reps",
  "description": "Use a light loop over your feet and march slowly without leaning. Keep the band secure."
 },
 "lib-dumbbell-squat-to-front-raise": {
  "description": "Use light weights. Stand from a squat, then raise weights to shoulder height."
 }
};
function reviewedMovement(m){
 if(!m)return m;const eq=normalizeEquipment(m.equipment||[]);if(JSON.stringify(eq)!==JSON.stringify(m.equipment))m={...m,equipment:eq};const known=(m.id&&MOVES[m.id])||Object.values(MOVES).find(x=>x.name===m.name);const old=known&&INSTRUCTION_BASELINES[known.id];
 if(!old)return m;let copy=null;
 for(const [field,value] of Object.entries(old))if(JSON.stringify(m[field])===JSON.stringify(value)){
  copy??={...m};copy[field]=Array.isArray(known[field])?[...known[field]]:known[field];
 }
 return copy||m;
}

// Kettlebells are a general material; quantity is a separate preference.
function normalizeEquipment(items){return [...new Set(items.map(e=>e==='1x Kettlebell'?'Kettlebells':e))];}
function requiredKettlebells(m){if(!m)return 0;const known=(m.id&&MOVES[m.id])||Object.values(MOVES).find(x=>x.name===m.name);return Math.max(m.kettlebellCount||0,known?.kettlebellCount||0,normalizeEquipment(m.equipment||[]).includes('Kettlebells')?1:0);}
function equipmentCaption(m){return normalizeEquipment(m.equipment||[]).map(e=>e==='Dumbbells'&&requiredDumbbells(m)>1?'Dumbbells (2 required)':e==='Kettlebells'&&requiredKettlebells(m)>1?'Kettlebells (2 required)':e).join(' + ');}
EQUIPMENT.push('Step / Platform');
const ADDITIONAL_EQUIPMENT_MOVES=[
 {
  "id": "doublekb-floorpress",
  "name": "Double Kettlebell Floor Press",
  "equipment": [
   "Kettlebells"
  ],
  "group": "press",
  "pattern": "horizontal press",
  "challenge": 4,
  "reps": "8–12 reps",
  "description": "Lie on your back with knees bent and one kettlebell in each hand. Stack wrists above elbows, lower both upper arms gently to the floor and press up without bouncing. One press with both arms is one rep.",
  "tags": "Double Kettlebell Floor Press press horizontal press",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-ohp",
  "name": "Double Kettlebell Overhead Press",
  "equipment": [
   "Kettlebells"
  ],
  "group": "shoulder",
  "pattern": "overhead press",
  "challenge": 4,
  "reps": "6–10 reps",
  "description": "Begin with two manageable kettlebells racked at your shoulders. Brace, press both overhead without leaning back, then lower to the rack. One simultaneous press is one rep.",
  "tags": "Double Kettlebell Overhead Press shoulder overhead press",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-alternatingpress",
  "name": "Alternating Double Kettlebell Press",
  "equipment": [
   "Kettlebells"
  ],
  "group": "shoulder",
  "pattern": "overhead press",
  "challenge": 4,
  "reps": "6–8 / side",
  "description": "Rack one manageable kettlebell at each shoulder. Press one overhead while keeping the other racked, lower and alternate. Complete the target on both arms and log each arm press once.",
  "tags": "Alternating Double Kettlebell Press shoulder overhead press",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-row",
  "name": "Double Kettlebell Bent-Over Row",
  "equipment": [
   "Kettlebells"
  ],
  "group": "back",
  "pattern": "row",
  "challenge": 3,
  "reps": "8–12 reps",
  "description": "Hold a kettlebell in each hand, hinge at the hips and brace your trunk. Row both bells toward your lower ribs without jerking, then lower. One row with both arms is one rep.",
  "tags": "Double Kettlebell Bent-Over Row back row",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-frontsquat",
  "name": "Double Kettlebell Front Squat",
  "equipment": [
   "Kettlebells"
  ],
  "group": "squat",
  "pattern": "squat",
  "challenge": 4,
  "reps": "8–12 reps",
  "description": "Rack two manageable kettlebells at your shoulders with elbows close. Keep heels planted, squat through a controlled range and stand tall. One squat is one rep.",
  "tags": "Double Kettlebell Front Squat squat squat",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-reverselunge",
  "name": "Double Kettlebell Reverse Lunge",
  "equipment": [
   "Kettlebells"
  ],
  "group": "squat",
  "pattern": "lunge",
  "challenge": 4,
  "reps": "6–8 / side",
  "description": "Hold one kettlebell by each side. Step one foot back, bend both knees through a comfortable range and return. Alternate legs and log each return to standing as one rep.",
  "tags": "Double Kettlebell Reverse Lunge squat lunge",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-rdl",
  "name": "Double Kettlebell Romanian Deadlift",
  "equipment": [
   "Kettlebells"
  ],
  "group": "hinge",
  "pattern": "hip hinge",
  "challenge": 4,
  "reps": "8–12 reps",
  "description": "Hold two kettlebells in front of your thighs. Soften knees, push hips back and lower the bells close to your legs. Stand by extending your hips without leaning back.",
  "tags": "Double Kettlebell Romanian Deadlift hinge hip hinge",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-deadlift",
  "name": "Double Kettlebell Deadlift",
  "equipment": [
   "Kettlebells"
  ],
  "group": "hinge",
  "pattern": "hip hinge",
  "challenge": 3,
  "reps": "8–12 reps",
  "description": "Set two kettlebells beside your feet. Hinge and bend knees enough to grip them, brace and stand with the weights close. Lower both bells under control before the next rep.",
  "tags": "Double Kettlebell Deadlift hinge hip hinge",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-farmermarch",
  "name": "Double Kettlebell Farmer March",
  "equipment": [
   "Kettlebells"
  ],
  "group": "full",
  "pattern": "loaded march",
  "challenge": 3,
  "reps": "20 alternating steps",
  "description": "Hold a manageable kettlebell by each side. Stand tall and march without swaying. Each knee lift is one step; log the combined total across both legs.",
  "tags": "Double Kettlebell Farmer March full loaded march",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-rackmarch",
  "name": "Double Kettlebell Front-Rack March",
  "equipment": [
   "Kettlebells"
  ],
  "group": "core",
  "pattern": "anti-extension",
  "challenge": 3,
  "reps": "20 alternating steps",
  "description": "Rack a manageable kettlebell at each shoulder. Keep ribs over hips and march slowly without leaning back. Each knee lift is one step; count both legs together.",
  "tags": "Double Kettlebell Front-Rack March core anti-extension",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-calf",
  "name": "Double Kettlebell Calf Raise",
  "equipment": [
   "Kettlebells"
  ],
  "group": "calves",
  "pattern": "calf raise",
  "challenge": 3,
  "reps": "12–15 reps",
  "description": "Hold one light kettlebell by each side. Raise both heels, pause and lower with control. If you need a free hand for support, choose the single-kettlebell version instead.",
  "tags": "Double Kettlebell Calf Raise calves calf raise",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-thruster",
  "name": "Double Kettlebell Thruster",
  "equipment": [
   "Kettlebells"
  ],
  "group": "full",
  "pattern": "conditioning",
  "challenge": 5,
  "reps": "6–10 reps",
  "description": "Begin with two light kettlebells in a secure front rack. Squat, stand and use that leg drive to press overhead. Lower to the rack before the next squat. One squat followed by one press is one rep.",
  "tags": "Double Kettlebell Thruster full conditioning",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "doublekb-hammer",
  "name": "Double Kettlebell Hammer Curl",
  "equipment": [
   "Kettlebells"
  ],
  "group": "biceps",
  "pattern": "elbow flexion",
  "challenge": 3,
  "reps": "8–12 reps",
  "description": "Hold one light kettlebell by its handle in each hand, palms inward. Keep upper arms by your sides, curl both with control and lower without swinging. One simultaneous curl is one rep.",
  "tags": "Double Kettlebell Hammer Curl biceps elbow flexion",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "stepup",
  "name": "Step-ups",
  "equipment": [
   "Bodyweight",
   "Step / Platform"
  ],
  "group": "squat",
  "pattern": "step-up",
  "challenge": 2,
  "reps": "8–12 / side",
  "description": "Place one whole foot on a low, stable exercise step. Push through that foot to stand on the step, then step down with control. Finish the target leading with each leg. One ascent and controlled return is one rep; use a platform, not an unstable chair.",
  "tags": "Step-ups squat step-up",
  "loadDependent": false
 },
 {
  "id": "db-stepup",
  "name": "Dumbbell Step-ups",
  "equipment": [
   "Dumbbells",
   "Step / Platform"
  ],
  "group": "squat",
  "pattern": "step-up",
  "challenge": 3,
  "reps": "8–10 / side",
  "description": "Hold weights by your sides and place one whole foot on a low, stable step. Stand through the leading leg without jumping, then step down slowly. Complete the target leading with each leg.",
  "tags": "Dumbbell Step-ups squat step-up",
  "loadDependent": true
 },
 {
  "id": "kb-stepup",
  "name": "Kettlebell Goblet Step-ups",
  "equipment": [
   "Kettlebells",
   "Step / Platform"
  ],
  "group": "squat",
  "pattern": "step-up",
  "challenge": 3,
  "reps": "8–10 / side",
  "description": "Hold one kettlebell at your chest. Step onto a low, stable platform with the whole leading foot, stand and lower with control. Complete the target on each leading leg.",
  "tags": "Kettlebell Goblet Step-ups squat step-up",
  "loadDependent": true
 },
 {
  "id": "doublekb-stepup",
  "name": "Double Kettlebell Step-ups",
  "equipment": [
   "Kettlebells",
   "Step / Platform"
  ],
  "group": "squat",
  "pattern": "step-up",
  "challenge": 4,
  "reps": "6–8 / side",
  "description": "Hold one manageable kettlebell by each side. Step onto a low, stable platform without jumping, stand and lower slowly. Complete both leading legs and count each ascent and return as one rep.",
  "tags": "Double Kettlebell Step-ups squat step-up",
  "loadDependent": true,
  "kettlebellCount": 2
 },
 {
  "id": "lateral-stepup",
  "name": "Lateral Step-ups",
  "equipment": [
   "Bodyweight",
   "Step / Platform"
  ],
  "group": "squat",
  "pattern": "step-up",
  "challenge": 2,
  "reps": "8–12 / side",
  "description": "Stand beside a low, stable step. Place the nearer foot fully on it, push through that leg to stand, then lower slowly. Turn around to work the other side. One ascent and return is one rep.",
  "tags": "Lateral Step-ups squat step-up",
  "loadDependent": false
 },
 {
  "id": "db-lateral-stepup",
  "name": "Dumbbell Lateral Step-ups",
  "equipment": [
   "Dumbbells",
   "Step / Platform"
  ],
  "group": "squat",
  "pattern": "step-up",
  "challenge": 3,
  "reps": "8–10 / side",
  "description": "Hold light dumbbells by your sides and stand beside a low, stable platform. Step up through the nearer leg, then lower slowly. Complete the target on both sides without bouncing off the floor.",
  "tags": "Dumbbell Lateral Step-ups squat step-up",
  "loadDependent": true
 },
 {
  "id": "stepdown",
  "name": "Controlled Step-downs",
  "equipment": [
   "Bodyweight",
   "Step / Platform"
  ],
  "group": "squat",
  "pattern": "step-down",
  "challenge": 3,
  "reps": "6–10 / side",
  "description": "Stand on a low, stable step. Keep one foot planted on it and bend that knee slowly until the opposite heel lightly touches the floor. Push through the standing leg to return. Complete both sides.",
  "tags": "Controlled Step-downs squat step-down",
  "loadDependent": false
 },
 {
  "id": "db-stepdown",
  "name": "Dumbbell Controlled Step-downs",
  "equipment": [
   "Dumbbells",
   "Step / Platform"
  ],
  "group": "squat",
  "pattern": "step-down",
  "challenge": 4,
  "reps": "6–8 / side",
  "description": "Hold light weights on a low, stable step. Keep one foot planted, lower the opposite heel toward the floor and return through the standing leg without dropping onto the other foot. Complete both sides.",
  "tags": "Dumbbell Controlled Step-downs squat step-down",
  "loadDependent": true
 },
 {
  "id": "wallsit",
  "name": "Wall Sit",
  "equipment": [
   "Bodyweight"
  ],
  "group": "squat",
  "pattern": "isometric knee extension",
  "challenge": 2,
  "reps": "20–30 sec",
  "description": "Slide your back down a sturdy wall with feet slightly forward. Hold a manageable knee bend, keep feet flat and breathe steadily. Stand when done. Log seconds held, not reps.",
  "tags": "Wall Sit squat isometric knee extension",
  "loadDependent": false
 },
 {
  "id": "db-wallsit",
  "name": "Dumbbell Wall Sit",
  "equipment": [
   "Dumbbells"
  ],
  "group": "squat",
  "pattern": "isometric knee extension",
  "challenge": 3,
  "reps": "20–30 sec",
  "description": "Hold one light dumbbell close to your chest with both hands. Lean your back against a sturdy wall and hold a comfortable knee bend with feet flat. Log seconds held; put the weight down under control before standing if needed.",
  "tags": "Dumbbell Wall Sit squat isometric knee extension",
  "loadDependent": true
 },
 {
  "id": "kb-wallsit",
  "name": "Kettlebell Wall Sit",
  "equipment": [
   "Kettlebells"
  ],
  "group": "squat",
  "pattern": "isometric knee extension",
  "challenge": 3,
  "reps": "20–30 sec",
  "description": "Hold one light kettlebell at your chest. With your back against a sturdy wall, hold a manageable knee bend and breathe. Log the seconds you hold, not reps.",
  "tags": "Kettlebell Wall Sit squat isometric knee extension",
  "loadDependent": true
 },
 {
  "id": "band-legextension",
  "name": "Seated Band Leg Extension",
  "equipment": [
   "Resistance Bands",
   "Band Anchor",
   "Ankle Strap",
   "Stable Bench / Support"
  ],
  "group": "squat",
  "pattern": "knee extension",
  "challenge": 2,
  "reps": "10–15 / side",
  "description": "Sit on a stable seat with a band attached to a secure low anchor behind you and an ankle strap on one leg. Keeping your thigh supported, straighten that knee through a comfortable range, then bend it slowly. Complete both sides. This isolates the quads more than a squat.",
  "tags": "Seated Band Leg Extension squat knee extension",
  "loadDependent": true
 },
 {
  "id": "cable-legextension",
  "name": "Seated Cable Leg Extension",
  "equipment": [
   "Pulley",
   "Ankle Strap",
   "Stable Bench / Support"
  ],
  "group": "squat",
  "pattern": "knee extension",
  "challenge": 2,
  "reps": "10–15 / side",
  "description": "Sit on a stable seat in front of a low pulley behind you, with an ankle strap on one leg. Keep the thigh supported as you straighten the knee, then return slowly. Complete both sides. This is quad isolation rather than a whole-leg squat movement.",
  "tags": "Seated Cable Leg Extension squat knee extension",
  "loadDependent": true
 },
 {
  "id": "reverse-nordic",
  "name": "Short-Range Reverse Nordic",
  "equipment": [
   "Bodyweight"
  ],
  "group": "squat",
  "pattern": "knee extension",
  "challenge": 4,
  "reps": "6–8 reps",
  "description": "Kneel tall with knees about hip-width apart and toes relaxed or tucked comfortably. Keep hips extended and torso in line with thighs, lean back a small controlled distance from the knees, then return. Do not fold at your hips; start with a short range.",
  "tags": "Short-Range Reverse Nordic squat knee extension",
  "loadDependent": false
 },
 {
  "id": "sitstand",
  "name": "Sit-to-Stand",
  "equipment": [
   "Bodyweight",
   "Stable Bench / Support"
  ],
  "group": "squat",
  "pattern": "squat",
  "challenge": 1,
  "reps": "10–15 reps",
  "description": "Sit near the front of a sturdy seat with feet planted. Lean forward slightly, push through your feet to stand fully, then sit down with control. One stand and return is one rep.",
  "tags": "Sit-to-Stand squat squat",
  "loadDependent": false
 }
];
for(const m of ADDITIONAL_EQUIPMENT_MOVES)MOVES[m.id]=m;

// Material quantity is explicit for public users with a single dumbbell too.
const SINGLE_DUMBBELL_IDS=new Set(['triceps','dbextension','dbrow','dbsquat','snatch','hipthrust','dbbridge','dbtri','concentration','dbcalf','lib-single-arm-dumbbell-floor-press','lib-half-kneeling-dumbbell-press','lib-single-arm-dumbbell-overhead-extension','lib-single-arm-dumbbell-kickback','lib-dumbbell-cross-body-triceps-extension','lib-dumbbell-pullover-on-floor','lib-dumbbell-suitcase-march','lib-dumbbell-sumo-squat','lib-dumbbell-single-leg-glute-bridge','lib-dumbbell-frog-pump','lib-dumbbell-single-leg-calf-raise','lib-single-leg-seated-dumbbell-calf-raise','lib-dumbbell-bent-knee-calf-raise','lib-dumbbell-split-stance-calf-raise','db-wallsit']);
for(const m of Object.values(MOVES))if(m.equipment.includes('Dumbbells'))m.dumbbellCount=SINGLE_DUMBBELL_IDS.has(m.id)?1:2;
function requiredDumbbells(m){if(!m)return 0;const known=(m.id&&MOVES[m.id])||Object.values(MOVES).find(x=>x.name===m.name);return Math.max(m.dumbbellCount||0,known?.dumbbellCount||0,(m.equipment||[]).includes('Dumbbells')?1:0);}
const EXCLUSION_SUGGESTIONS=['Jump','Overhead Press','Lunge'];

function sameEquipmentSelection(a,b){return JSON.stringify(normalizeEquipment([...a,'Bodyweight']).sort())===JSON.stringify(normalizeEquipment([...b,'Bodyweight']).sort());}

for(const m of Object.values(MOVES))m.loadDependent=m.equipment.some(e=>['Dumbbells','Kettlebells','Sandbag','Resistance Bands','Barbell','Pulley'].includes(e));
