(function(){
  'use strict';
  const ta=document.getElementById('wishText');
  const counter=document.getElementById('wishLen');
  const btn=document.getElementById('wishBtn');
  const num=document.getElementById('wishCount');
  const residue=document.getElementById('residue');
  const overlay=document.getElementById('endingOverlay');
  const label=document.getElementById('treeCarouselLabel');
  const slides=[...document.querySelectorAll('.tree-slide')];
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const captions=['夜间东操场 / 来源未标注','后勤工单附件 / 东区绿化复查','校园资料图 / 明岚大学'];
  let current=0;
  let timer=null;
  let submitted=false;

  function showSlide(index){
    slides.forEach((slide,i)=>slide.classList.toggle('active',i===index));
    if(label)label.textContent=captions[index]||'';
  }
  function startCarousel(){
    if(reduced||slides.length<2||timer||document.hidden)return;
    timer=window.setInterval(()=>{
      current=(current+1)%slides.length;
      showSlide(current);
    },6200);
  }
  function stopCarousel(){
    if(timer)window.clearInterval(timer);
    timer=null;
  }
  document.addEventListener('visibilitychange',()=>{document.hidden?stopCarousel():startCarousel();});
  startCarousel();

  function finish(){
    if(submitted)return;
    const wish=(ta?.value||'').trim();
    if(!wish){
      if(residue)residue.textContent='先写下一句话。';
      ta?.focus();
      return;
    }
    submitted=true;
    stopCarousel();
    if(num)num.textContent='18342';
    if(btn)btn.disabled=true;
    if(ta)ta.disabled=true;
    if(residue)residue.textContent='已经写下来了。';
    document.body.classList.add('wish-submitted');

    window.setTimeout(()=>{
      if(!overlay)return;
      overlay.hidden=false;
      requestAnimationFrame(()=>overlay.classList.add('show'));
      window.setTimeout(()=>overlay.classList.add('show-credits'),reduced?0:3900);
    },reduced?0:700);
  }

  ta?.addEventListener('input',()=>{
    if(ta.value.length>80)ta.value=ta.value.slice(0,80);
    if(counter)counter.textContent=ta.value.length+' / 80';
    if(residue&&ta.value.trim())residue.textContent='';
  });
  ta?.addEventListener('keydown',event=>{
    if((event.ctrlKey||event.metaKey)&&event.key==='Enter')finish();
  });
  btn?.addEventListener('click',finish);
})();
