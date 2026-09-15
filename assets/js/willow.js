(function(){
  const ta=document.getElementById('wishText');
  const n=document.getElementById('wishLen');
  const btn=document.getElementById('wishBtn');
  const num=document.getElementById('wishCount');
  const black=document.getElementById('blackout');
  const ending=document.getElementById('ending');
  const page=document.getElementById('willowPage');
  const residue=document.getElementById('residue');
  const label=document.getElementById('treeCarouselLabel');
  const slides=[...document.querySelectorAll('.tree-slide')];
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const captions=['FRAME 01 / 东操场北侧 / 21:46','FRAME 02 / HQ-2014-0524 / 折枝复查','FRAME 03 / YL-E-017 / owner null'];
  let current=0;
  let carousel=null;
  const showSlide=index=>{
    slides.forEach((slide,i)=>slide.classList.toggle('active',i===index));
    if(label)label.textContent=captions[index];
  };
  if(slides.length>1&&!reduced){
    carousel=window.setInterval(()=>{
      current=(current+1)%slides.length;
      showSlide(current);
    },6200);
  }

  let base=18341;
  if(ta)ta.addEventListener('input',()=>{
    if(ta.value.length>80)ta.value=ta.value.slice(0,80);
    n.textContent=ta.value.length+'/80';
  });
  if(btn)btn.addEventListener('click',()=>{
    if(!ta.value.trim()){
      residue.textContent='empty input / waiting';
      ta.focus();
      return;
    }
    if(carousel)window.clearInterval(carousel);
    num.textContent=String(base+1);
    btn.disabled=true;
    ta.disabled=true;
    residue.textContent='writing to volatile memory…';
    page.classList.add('decay-1');
    window.setTimeout(()=>{
      page.classList.add('decay-2');
      residue.textContent='received / form target: null';
    },450);
    window.setTimeout(()=>{
      page.classList.add('decay-3');
      residue.textContent='received';
    },950);
    window.setTimeout(()=>{
      black.classList.add('show');
      window.setTimeout(()=>ending.classList.add('show'),420);
    },1550);
  });
})();
