var tl = new TimelineMax({delay:1});
CustomBounce.create("bounce", {squash:4, strength:0.5});


tl.fromTo("#happy", 3, {drawSVG:"0%", visibility:"visible"}, {drawSVG:"100%", ease:Power1.easeInOut})
  .add(dropLetters(), "-=1.8")
  .to("#tween", 0.5, {autoAlpha:1, repeat:1, yoyo:true, ease:RoughEase.ease.config({clamp:true, strength:3})}, "-=0.3")
  .add(lighteningStrike(), "-=0.7")
  .add(spiderDrop(), "-=1");



function dropLetters() {
  var tl = new TimelineLite(),
      stagger = 0.08,
      letters = document.querySelectorAll("#h, #a, #l, #l2, #o, #t, #w, #e, #e2, #n");
  tl.staggerTo(letters, 0.3, {autoAlpha:1, transformOrigin:"center bottom"}, stagger, 0)
  tl.staggerFrom(letters, 3, {y:-300, ease:"bounce"}, stagger, 0);
  tl.staggerTo(letters, 3, {scaleY:0.5, ease:"bounce-squash"}, stagger, 0);
  return tl;
}

function lighteningStrike() {
  var tl = new TimelineLite();
  tl.to("#flash", 0.3, {autoAlpha:0.9, yoyo:true, repeat:1, ease:RoughEase.ease.config({strength:3, clamp:true})})
    .to("#t", 2, {physics2D:{angle:-70, velocity:600, gravity:1000}, rotation:240}, 0.2)
    .to("#o", 2, {physics2D:{angle:-110, velocity:700, gravity:1000}, rotation:-100}, 0.2)
    .set("#t, #o", {visibility:"hidden"});
  return tl;
}

function spiderDrop() {
  var tl = new TimelineLite();
  tl.fromTo("#spider", 1.8, {y:-300, autoAlpha:1}, {y:-120, immediateRender:false})
    .to("#spider", 2.6, {y:0, ease:Elastic.easeOut})
    .to("#pupil1, #pupil2", 0.6, {x:3}, "-=1.7")
    .to("#pupil1, #pupil2", 0.6, {x:-6}, "+=0.1")
    .to("#pupil1, #pupil2", 0.5, {x:-2, y:-4}, "+=0.9")
    .to("#spiderBody", 1.5, {rotation:7, svgOrigin:"443 230", ease:CustomWiggle.create("", {wiggles:25, type:"easeInOut"})});
  return tl;
}

CustomWiggle.create("lights", {type:"random", wiggles:10});
var lights = document.querySelectorAll(".light");
TweenLite.from(lights, 3, {opacity:0});
for (i = 0; i < lights.length; i++) {
  TweenMax.to(lights[i], 4, {delay:3, opacity:0.5, ease:CustomWiggle.create("", {wiggles:Math.random() * 8 + 12, type:"random"}), repeat:-1})
}