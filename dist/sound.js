'use strict';
const FINISH_NOTES=[[523.25,0,.18],[659.25,.18,.18],[783.99,.36,.24],[880,.63,.18],[783.99,.81,.18],[1046.5,1.02,.62],[523.25,1.02,.62],[659.25,1.02,.62],[783.99,1.02,.62]];
const FINISH_SOUNDS={
 melody:{label:'Victory melody',notes:FINISH_NOTES},
 bell:{label:'Bright bells',notes:[[880,0,.55],[1318.51,.6,.55],[1760,1.2,.7]]},
 pulse:{label:'Triple signal',notes:[[740,0,.3],[740,.45,.3],[988,.9,.65]]}
};
function finishSound(){return Object.hasOwn(FINISH_SOUNDS,profile().preferences?.finishSound)?profile().preferences.finishSound:'melody';}
function finishVolume(){const value=profile().preferences?.finishVolume;return typeof value==='number'&&Number.isFinite(value)?Math.max(0,Math.min(1,value)):.8;}
let finishTuneUntil=0,scheduledFinish=null;
function createFinishTune(base){
 const nodes=[];if(finishVolume()===0)return nodes;
 FINISH_SOUNDS[finishSound()].notes.forEach(([frequency,offset,duration],i)=>{
  const oscillator=audioCtx.createOscillator(),gain=audioCtx.createGain();oscillator.type='sine';oscillator.frequency.value=frequency;oscillator.connect(gain);gain.connect(audioCtx.destination);
  const at=base+offset,volume=(i>=6?.07:.28)*finishVolume()/.8;gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(volume,at+.015);gain.gain.exponentialRampToValueAtTime(.001,at+duration);oscillator.start(at);oscillator.stop(at+duration+.02);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};nodes.push(oscillator);
 });return nodes;
}
function cancelFinishAudio(){if(scheduledFinish)for(const node of scheduledFinish.nodes)try{node.stop();node.disconnect();}catch{}scheduledFinish=null;}
function syncFinishAudio(){
 cancelFinishAudio();const s=activeSession();if(!s?.running||s.finished||s.overtime||s.milestoneNotified||profile().preferences?.sound===false||audioCtx?.state!=='running')return;
 try{const base=audioCtx.currentTime+remaining(s)/1000;scheduledFinish={id:s.id,base,nodes:createFinishTune(base)};}catch{cancelFinishAudio();}
}
function playFinishTune(){
 const scheduled=scheduledFinish;const alreadyPlayed=scheduled&&scheduled.id===activeSession()?.id&&audioCtx?.state==='running'&&audioCtx.currentTime>=scheduled.base;
 if(alreadyPlayed){scheduledFinish=null;return;}
 cancelFinishAudio();if(profile().preferences?.sound===false||audioCtx?.state!=='running'||audioCtx.currentTime<finishTuneUntil)return;
 try{const base=audioCtx.currentTime+.02;finishTuneUntil=base+1.7;createFinishTune(base);}catch{}
}
