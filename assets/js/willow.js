(function(){
  'use strict';
  const ta=document.getElementById('wishText');
  const counter=document.getElementById('wishLen');
  const btn=document.getElementById('wishBtn');
  const num=document.getElementById('wishCount');
  const blackout=document.getElementById('blackout');
  const ending=document.getElementById('ending');
  const story=document.getElementById('endingStory');
  const thanks=document.getElementById('thanks');
  const skip=document.getElementById('endingSkip');
  const replay=document.getElementById('replayEnding');
  const page=document.getElementById('willowPage');
  const residue=document.getElementById('residue');
  const endingWish=document.getElementById('endingWish');
  const label=document.getElementById('treeCarouselLabel');
  const slides=[...document.querySelectorAll('.tree-slide')];
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const captions=['FRAME 01 / EAST FIELD / SOURCE LOST','FRAME 02 / ATTACHMENT / PARTIAL','FRAME 03 / OWNER / NULL'];
  let current=0;
  let carousel=null;
  let thanksTimer=null;
  let submitted=false;

  function showSlide(index){
    slides.forEach((slide,i)=>slide.classList.toggle('active',i===index));
    if(label)label.textContent=captions[index];
  }
  function startCarousel(){
    if(slides.length<2||reduced||carousel||document.hidden)return;
    carousel=window.setInterval(()=>{current=(current+1)%slides.length;showSlide(current);},6200);
  }
  function stopCarousel(){if(carousel)window.clearInterval(carousel);carousel=null;}
  document.addEventListener('visibilitychange',()=>{document.hidden?stopCarousel():startCarousel();});
  startCarousel();

  function showThanks(){
    if(thanksTimer)window.clearTimeout(thanksTimer);
    story.classList.add('is-past');
    thanks.hidden=false;
    requestAnimationFrame(()=>thanks.classList.add('show'));
  }
  function replayStory(){
    thanks.classList.remove('show');
    thanks.hidden=true;
    story.classList.remove('is-past');
    story.classList.remove('replay');
    void story.offsetWidth;
    story.classList.add('replay');
    thanksTimer=window.setTimeout(showThanks,reduced?1200:11000);
  }
  function submitWish(){
    if(submitted)return;
    if(!ta.value.trim()){
      residue.textContent='empty input / waiting';
      ta.focus();
      return;
    }
    submitted=true;
    if(endingWish)endingWish.textContent=ta.value.trim();
    stopCarousel();
    num.textContent='18342';
    btn.disabled=true;
    ta.disabled=true;
    residue.textContent='writing to volatile memory…';
    page.classList.add('decay-1');
    window.setTimeout(()=>{page.classList.add('decay-2');residue.textContent='received / form target: null';},reduced?80:450);
    window.setTimeout(()=>{page.classList.add('decay-3');residue.textContent='received';},reduced?160:950);
    window.setTimeout(()=>{
      blackout.classList.add('show');
      ending.classList.add('show');
      thanksTimer=window.setTimeout(showThanks,reduced?1200:11000);
    },reduced?260:1550);
  }

  ta?.addEventListener('input',()=>{
    if(ta.value.length>80)ta.value=ta.value.slice(0,80);
    counter.textContent=ta.value.length+'/80';
  });
  ta?.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter')submitWish();});
  btn?.addEventListener('click',submitWish);
  skip?.addEventListener('click',showThanks);
  replay?.addEventListener('click',replayStory);
})();
