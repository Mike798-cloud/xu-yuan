(function(){
  document.documentElement.classList.add('js');

  const reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body=document.body;
  const siteConfig=body.classList.contains('oa-server-path')?{
    after:'.term-top',slides:false,assetBase:'../assets/img/',reel:true,
    labels:['SCAN / EASTFIELD','ATTACHMENT / HQ','ORPHAN / WILLOW'],
    lines:['03:14:22　static inventory scan running…','03:14:23　manifest diff +1 / unresolved','03:14:24　/willow/wish.html　owner: null','archive-web-02　public read-only mirror']
  }:body.classList.contains('site-minglan')?{
    host:'.ml-head .inner',after:'.ml-head',slides:true,assetBase:'../assets/img/',reel:true,
    labels:['校园影像 / 东区','后勤附件 / 旧体育馆','旧站留存 / YL-E-017'],
    lines:['★ 春季绿化养护进行中 ★ 图书馆周末开放 ★ 南门施工请绕行','校内信息公开：东区夜跑请按保卫处现场指引通行','网络中心：旧版学生论坛仅保留只读镜像','明德笃行 · 岚风致远　请勿攀折校园树木']
  }:body.classList.contains('site-bbs')?{
    host:'.bbs-head',after:'.bbs-head',slides:true,assetBase:'../assets/img/',reel:true,
    labels:['附件缓存 / IMG_0420','旧帖图床 / HQ-0524','校园随拍 / 东区'],
    lines:['★ 旧版论坛只读镜像 · 附件与头像可能失效 ★','今日热帖：317今晚有热水吗　|　南门文印店几点关门','服务器时间 2017-04-20 22:17　访客模式 / READ ONLY','旧帖恢复任务运行中……部分楼层顺序可能错位']
  }:body.classList.contains('site-press')?{
    host:'.press-head',after:'.press-head',slides:true,assetBase:'../assets/img/',reel:true,
    labels:['摄影部资料 / 东操场','校报附件 / 绿化复查','第102期 / 校园版'],
    lines:['校报资料室：2012—2017 数字化稿件开放查询','本期勘误：广播节目中断时间更正为 12:01','原稿缺页 7　扫描件正在按期号重新装订','广播旧稿 FM-2016-0411 已恢复索引']
  }:body.classList.contains('site-houqin')?{
    host:'.hq-head',after:'.hq-head',slides:true,assetBase:'../assets/img/',reel:true,
    labels:['CAM-E / 区域定位','IMG_0524 / 工单附件','YL-E-017 / 资产影像'],
    lines:['HQDATA_02 / PUBLIC　最近同步 2017-04-20 10:24','工单 HQ-2017-0418　东区绿地　状态：已结','树木资产 YL-E-017　非养护性折断记录待复核','旧库迁移完成　未归属静态文件：1']
  }:body.classList.contains('site-oa')?{
    host:'.oa-head',after:'.oa-head',slides:true,assetBase:'../assets/img/',reel:true,
    labels:['BA-P27 / PAPER','CAM-E04 / DEVICE','DISP-3 / ROUTE'],
    lines:['MLU-ARC / READ ONLY　INDEX 1842 RECORDS','REC_QUERY READY　日期按事件发生日归档','2016-11-17 / EASTFIELD　3 SOURCES PRESERVED','STATIC INVENTORY DIFF +1 / OWNER NULL']
  }:body.classList.contains('entry-cache')?{
    host:'.cap-head',after:'.cap-head',slides:true,assetBase:'assets/img/',reel:true,
    labels:['FORWARD / CAMPUS','ATTACHMENT / LOST','CACHE / WILLOW'],
    lines:['FORWARD_CACHE / public snapshot / 2017-04-20','原回复 19　恢复 17　附件 1　校验 7e3a','链接预览来自 minglan.edu.cn 历史页面','缓存节点只读 · 原附件可能已经失效']
  }:null;

  function mountTicker(config){
    if(!config||!config.after)return;
    const anchor=document.querySelector(config.after);
    if(!anchor)return;
    let bar=body.classList.contains('site-minglan')?document.querySelector('.ml-marquee'):null;
    if(!bar&&anchor.parentNode.querySelector('.legacy-ticker'))return;
    if(!bar)bar=document.createElement('div');
    bar.classList.add('legacy-ticker','tone-0');
    bar.setAttribute('aria-label','旧站轮播信息');
    const text=bar.querySelector('span')||document.createElement('span');
    text.className='legacy-ticker-text';
    if(!text.parentNode)bar.appendChild(text);
    if(!bar.parentNode)anchor.insertAdjacentElement('afterend',bar);
    let index=0;
    const render=()=>{
      text.classList.remove('is-entering');
      void text.offsetWidth;
      text.textContent=config.lines[index];
      bar.classList.remove('tone-0','tone-1','tone-2','tone-3');
      bar.classList.add('tone-'+(index%4));
      text.classList.add('is-entering');
      index=(index+1)%config.lines.length;
    };
    render();
    if(!reduceMotion)window.setInterval(render,6500);
  }

  function mountSlides(config){
    if(!config||!config.slides)return;
    const host=document.querySelector(config.host);
    if(!host||host.querySelector('.legacy-slides'))return;
    const holder=document.createElement('div');
    holder.className='legacy-slides';
    const base=config.assetBase||'../assets/img/';
    const sources=[base+'campus_event.jpg',base+'branch_workorder.jpg',base+'willow_main.jpg'];
    sources.forEach((src,i)=>{
      const slide=document.createElement('span');
      slide.className='legacy-slide'+(i===0?' active':'');
      slide.style.backgroundImage='url("'+src+'")';
      holder.appendChild(slide);
    });
    host.appendChild(holder);
    if(reduceMotion)return;
    let current=0;
    window.setInterval(()=>{
      const slides=[...holder.children];
      slides[current].classList.remove('active');
      current=(current+1)%slides.length;
      slides[current].classList.add('active');
    },7200);
  }

  function mountMemoryReel(config){
    if(!config||!config.reel||document.querySelector('.legacy-memory-reel'))return;
    const ticker=document.querySelector('.legacy-ticker');
    if(!ticker)return;
    const base=config.assetBase||'../assets/img/';
    const sources=[base+'campus_event.jpg',base+'branch_workorder.jpg',base+'willow_main.jpg'];
    const reel=document.createElement('div');
    reel.className='legacy-memory-reel';
    reel.setAttribute('aria-label','旧站影像轮播');
    const track=document.createElement('div');
    track.className='legacy-memory-track';
    [...sources,...sources].forEach((src,index)=>{
      const item=document.createElement('figure');
      item.className='legacy-memory-item memory-'+(index%3);
      const picture=document.createElement('img');
      picture.src=src;
      picture.alt='';
      const caption=document.createElement('figcaption');
      caption.textContent=config.labels[index%3];
      item.append(picture,caption);
      track.appendChild(item);
    });
    reel.appendChild(track);
    ticker.insertAdjacentElement('afterend',reel);
  }


  function addRouteNotes(){
    const path=location.pathname;
    const notes={
      '/minglan/notice-east.html':['网传截图如需核对原始来源，请查看网络文明专题保留的旧版论坛镜像。','network-civility.html'],
      '/bbs/thread-east2017.html':['缓存楼层号并非写入顺序；更早记录请从“旧帖存档”按年份查找。','archive.html'],
      '/oa/incidents.html':['归档日期以事件发生日为准；凌晨发布的帖子可能描述的是前一晚。','']
    };
    const key=Object.keys(notes).find(k=>path.endsWith(k));
    if(!key)return;
    const main=document.querySelector('main');
    if(!main||main.querySelector('.archive-route-note'))return;
    const note=document.createElement('p');
    note.className='archive-route-note';
    note.innerHTML='<span>索引说明：</span>'+notes[key][0]+(notes[key][1]?' <a href="'+notes[key][1]+'">查看相关索引</a>':'');
    main.appendChild(note);
  }

  mountTicker(siteConfig);
  mountSlides(siteConfig);
  mountMemoryReel(siteConfig);
  addRouteNotes();
})();
