'use strict';
// Text-only coaching: no generated people, poses or schematic figures.
function movementGuide(m){m=reviewedMovement(m);return `<section class="movement-coaching" aria-label="Exercise instructions"><span class="eyebrow">FORM CUES</span><p>${esc(m.description)}</p><p class="counting-help">${esc(countingHint(m))}</p><p class="small muted">${esc(groupLabel(m))} · ${esc(movePattern(m)||'Custom movement')}.</p><p class="small muted">Use controlled movement and a manageable range.</p></section>`;}
