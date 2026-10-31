'use strict';
const FINISH_NOTES=[[523.25,0,.18],[659.25,.18,.18],[783.99,.36,.24],[880,.63,.18],[783.99,.81,.18],[1046.5,1.02,.62],[523.25,1.02,.62],[659.25,1.02,.62],[783.99,1.02,.62]];
let finishTuneUntil=0,scheduledFinish=null;
function createFinishTune(base){
 const nodes=[];
 FINISH_NOTES.forEach(([frequency,offset,duration],i)=>{
  const oscillator=audioCtx.createOscillator(),gain=audioCtx.createGain();oscillator.type='sine';oscillator.frequency.value=frequency;oscillator.connect(gain);gain.connect(audioCtx.destination);
  const at=base+offset,volume=i>=6?.025:.09;gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(volume,at+.015);gain.gain.exponentialRampToValueAtTime(.001,at+duration);oscillator.start(at);oscillator.stop(at+duration+.02);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};nodes.push(oscillator);
 });return nodes;
}
function cancelFinishAudio(){if(scheduledFinish)for(const node of scheduledFinish.nodes)try{node.stop();node.disconnect();}catch{}scheduledFinish=null;}
function syncFinishAudio(){
 cancelFinishAudio();const s=activeSession();if(!s?.running||s.finished||profile().preferences?.sound===false||audioCtx?.state!=='running')return;
 try{const base=audioCtx.currentTime+remaining(s)/1000;scheduledFinish={id:s.id,base,nodes:createFinishTune(base)};}catch{cancelFinishAudio();}
}
function playFinishTune(){
 const scheduled=scheduledFinish;const alreadyPlayed=scheduled&&scheduled.id===activeSession()?.id&&audioCtx?.state==='running'&&audioCtx.currentTime>=scheduled.base;
 if(alreadyPlayed){scheduledFinish=null;return;}
 cancelFinishAudio();if(profile().preferences?.sound===false||audioCtx?.state!=='running'||audioCtx.currentTime<finishTuneUntil)return;
 try{const base=audioCtx.currentTime+.02;finishTuneUntil=base+1.7;createFinishTune(base);}catch{}
}
