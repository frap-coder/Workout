'use strict';
// Text-only coaching: no generated people, poses or schematic figures.
function movementGuide(m){return `<section class="movement-coaching" aria-label="Exercise instructions"><span class="eyebrow">FORM CUES</span><p>${esc(m.description)}</p><p class="small muted">${esc(groupLabel(m))} · ${esc(movePattern(m)||'Custom movement')}. Move with control, use a comfortable range and stop if you feel pain.</p></section>`;}
