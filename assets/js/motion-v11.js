(function(){
  const body=document.body;
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const config=body.classList.contains('oa-server-path')?{
    after:'.term-top',base:'../assets/img/',labels:['SCAN / EASTFIELD','ATTACHMENT / HQ','ORPHAN / WILLOW'],
    lines:['03:14:22　static inventory scan running…','03:14:23　manifest diff +1 / unresolved','03:14:24　/willow/wish.html　owner: null']
  }:body.classList.contains('site-minglan')?{
    after:'.ml-head',host:'.ml-head .inner',base:'../assets/img/',labels:['校园影像 / 东区','后勤附件 / 旧体育馆','旧站留存 / YL-E-017']
  }:body.classList.contains('site-bbs')?{
    after:'.bbs-head',host:'.bbs-head',base:'../assets/img/',labels:['附件缓存 / IMG_0420','旧帖图床 / HQ-0524','校园随拍 / 东区']
  }:body.classList.contains('site-press')?{
    after:'.press-head',host:'.press-head',base:'../assets/img/',labels:['摄影部资料 / 东操场','校报附件 / 绿化复查','第102期 / 校园版']
  }:body.classList.contains('site-houqin')?{
    after:'.hq-head',host:'.hq-head',base:'../assets/img/',labels:['CAM-E / 区域定位','IMG_0524 / 工单附件','YL-E-017 / 资产影像']
  }:body.classList.contains('site-oa')?{
    after:'.oa-head',host:'.oa-head',base:'../assets/img/',labels:['BA-P27 / PAPER','CAM-E04 / DEVICE','DISP-3 / ROUTE']
  }:body.classList.contains('entry-cache')?{
    after:'.cap-head',host:'.cap-head',base:'assets/img/',labels:['FORWARD / CAMPUS','ATTACHMENT / LOST','CACHE / WILLOW']
  }:null;
  if(!config)return;

  let ticker=document.querySelector('.legacy-ticker');
  if(!ticker){
    const anchor=document.querySelector(config.after);
    if(!anchor)return;
    ticker=document.createElement('div');
    ticker.className='legacy-ticker tone-0';
    ticker.setAttribute('aria-label','旧站轮播信息');
    const text=document.createElement('span');
    text.className='legacy-ticker-text';
    ticker.appendChild(text);
    anchor.insertAdjacentElement('afterend',ticker);
    const lines=config.lines||['明岚大学旧站镜像 / READ ONLY','缓存影像正在轮转显示','部分原始附件已经失效'];
    let line=0;
    const update=()=>{
      text.textContent=lines[line];
      ticker.classList.remove('tone-0','tone-1','tone-2','tone-3');
      ticker.classList.add('tone-'+(line%4));
      line=(line+1)%lines.length;
    };
    update();
    if(!reduced)window.setInterval(update,6500);
  }

  if(config.host&&!document.querySelector(config.host+' > .legacy-slides')){
    const host=document.querySelector(config.host);
    if(host){
      const holder=document.createElement('div');
      holder.className='legacy-slides';
      ['campus_event.jpg','branch_workorder.jpg','willow_main.jpg'].forEach((name,index)=>{
        const slide=document.createElement('span');
        slide.className='legacy-slide'+(index===0?' active':'');
        slide.style.backgroundImage='url("'+config.base+name+'")';
        holder.appendChild(slide);
      });
      host.appendChild(holder);
      if(!reduced){
        let active=0;
        window.setInterval(()=>{
          holder.children[active].classList.remove('active');
          active=(active+1)%holder.children.length;
          holder.children[active].classList.add('active');
        },7200);
      }
    }
  }

  if(document.querySelector('.legacy-memory-reel'))return;
  const reel=document.createElement('div');
  reel.className='legacy-memory-reel';
  reel.setAttribute('aria-label','旧站影像轮播');
  const track=document.createElement('div');
  track.className='legacy-memory-track';
  const names=['campus_event.jpg','branch_workorder.jpg','willow_main.jpg'];
  [...names,...names].forEach((name,index)=>{
    const item=document.createElement('figure');
    item.className='legacy-memory-item memory-'+(index%3);
    const image=document.createElement('img');
    image.src=config.base+name;
    image.alt='';
    const caption=document.createElement('figcaption');
    caption.textContent=config.labels[index%3];
    item.append(image,caption);
    track.appendChild(item);
  });
  reel.appendChild(track);
  ticker.insertAdjacentElement('afterend',reel);
})();
