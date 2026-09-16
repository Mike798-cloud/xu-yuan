(function(){
  'use strict';
  const body=document.body;
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root=body.classList.contains('entry-cache')?'assets/img/':'../assets/img/';
  let archiveVerified=false;
  try{archiveVerified=localStorage.getItem('xuYuanEvidenceGateV16')==='verified';}catch(_error){}

  const configs={
    minglan:{test:'site-minglan',after:'.ml-head',host:'.ml-head .inner',kind:'portal',lines:['★ 春季绿化养护进行中 ★ 图书馆周末开放 ★ 南门施工请绕行','校内信息公开：东区夜跑请按保卫处现场指引通行','网络中心：旧版学生论坛仅保留只读镜像','明德笃行 · 岚风致远　请勿攀折校园树木'],images:[['campus_event.jpg','校园风采 / 春季活动'],['branch_workorder.jpg','公开附件 / 绿化复查'],['campus_event.jpg','校园影像 / 资料留存']]},
    bbs:{test:'site-bbs',after:'.bbs-head',kind:'bbs',lines:['★ 旧版论坛只读镜像 · 附件与头像可能失效 ★','今日热帖：317今晚有热水吗　|　南门文印店几点关门','服务器时间 2017-04-20 22:17　访客模式 / READ ONLY','旧帖恢复任务运行中……最后同步 22:11']},
    press:{test:'site-press',after:'.press-head',kind:'press',lines:['校报资料室：2012—2017 数字化稿件开放查询','本期勘误：广播节目中断时间更正为 12:01','原稿缺页 7　扫描件正在按期号重新装订','广播旧稿 FM-2016-0411 已恢复索引'],images:[['campus_event.jpg','第102期 / 校园版'],['branch_workorder.jpg','摄影附件 / 绿化复查'],['campus_event.jpg','底片索引 / 社团活动']]},
    houqin:{test:'site-houqin',after:'.hq-head',kind:'houqin',lines:['HQDATA_02 / PUBLIC　最近同步 2017-04-20 10:24','工单 HQ-2017-0418　东区绿地　状态：已结','树木资产 YL-E-017　非养护性折断记录待复核','公开查询仅显示已结工单摘要　个人字段不显示']},
    oa:{test:'site-oa',after:'.oa-head',kind:'oa',lines:archiveVerified?['MLU-ARC / READ ONLY　INDEX 1843 RECORDS','UNOWNED PATH RETAINED　OWNER FIELD NULL','BACKUP NODE 02　MANIFEST DIFF +1','SOURCE RECORDS PRESERVED SEPARATELY']:['MLU-ARC / READ ONLY　INDEX 1842 RECORDS','REC_QUERY READY　PUBLIC FIELDS ONLY','BACKUP NODE 02　LAST VERIFY 2017-04-20','SOURCE RECORDS PRESERVED SEPARATELY']},
    entry:{test:'entry-cache',after:'.cap-head',host:'.cap-head',kind:'entry',lines:['FORWARD_CACHE / public snapshot / 2017-04-20','原回复 19　恢复 17　附件 1　校验 7e3a','链接预览来自 minglan.edu.cn 历史页面','缓存节点只读 · 原附件可能已经失效'],images:[['campus_event.jpg','FORWARD / CAMPUS'],['branch_workorder.jpg','ATTACHMENT / LOST'],['campus_event.jpg','CACHE / PUBLIC']]}
  };
  const config=Object.values(configs).find(item=>body.classList.contains(item.test));
  if(!config)return;
  if(config.kind==='oa'&&archiveVerified)body.classList.add('oa-state-verified');

  const anchor=document.querySelector(body.classList.contains('oa-server-path')?'.term-top':config.after);
  if(!anchor)return;
  const ticker=document.createElement('div');
  ticker.className='legacy-ticker tone-0 motion-'+config.kind+'-ticker';
  ticker.setAttribute('aria-label','旧站轮播信息');
  const tickerText=document.createElement('span');
  tickerText.className='legacy-ticker-text';
  ticker.appendChild(tickerText);
  anchor.insertAdjacentElement('afterend',ticker);

  function buildHeaderSlides(){
    if(!config.host||!config.images)return null;
    const host=document.querySelector(config.host);
    if(!host)return null;
    const slides=document.createElement('div');
    slides.className='legacy-slides';
    config.images.forEach((item,index)=>{
      const slide=document.createElement('span');
      slide.className='legacy-slide'+(index===0?' active':'');
      slide.style.backgroundImage='url("'+root+item[0]+'")';
      slides.appendChild(slide);
    });
    host.appendChild(slides);
    return slides;
  }

  function buildPortal(){
    buildHeaderSlides();
    const rail=document.createElement('div');
    rail.className='motion-portal-rail';
    rail.innerHTML='<span>校园要闻</span><i></i><span>通知公告</span><i></i><span>公开信息</span><b>2017 / 04</b>';
    ticker.insertAdjacentElement('afterend',rail);
    return rail;
  }

  function buildBbs(){
    const bar=document.createElement('section');
    bar.className='motion-bbs-console';
    bar.setAttribute('aria-label','论坛服务器状态');
    bar.innerHTML='<span><b>HOT</b> 今日主题 126</span><span><b>ONLINE</b> <i data-online>47</i> 人</span><span><b>ARCHIVE</b> 已恢复 1842 主题</span><span data-drift><b>SYNC</b> 22:11 完成</span>';
    ticker.insertAdjacentElement('afterend',bar);
    return bar;
  }

  function buildPress(){
    const strip=document.createElement('section');
    strip.className='motion-press-strip';
    strip.setAttribute('aria-label','校报底片接触印样');
    config.images.forEach((item,index)=>{
      const figure=document.createElement('figure');
      figure.className=index===0?'is-reading':'';
      figure.innerHTML='<img alt=""><figcaption></figcaption>';
      figure.querySelector('img').src=root+item[0];
      figure.querySelector('figcaption').textContent=item[1];
      strip.appendChild(figure);
    });
    const scan=document.createElement('i');
    scan.className='press-scanhead';
    strip.appendChild(scan);
    ticker.insertAdjacentElement('afterend',strip);
    return strip;
  }

  function buildHouqin(){
    const plot=document.createElement('section');
    plot.className='motion-hq-plot';
    plot.setAttribute('aria-label','后勤工单区域状态');
    plot.innerHTML='<div class="hq-plot-map"><i></i><i></i><i></i><span data-node></span></div><dl><div><dt>E-01</dt><dd>东区巡查 / 正常</dd></div><div><dt>YL-E-017</dt><dd>树木资产 / 记录完整</dd></div><div><dt>HQ-0524</dt><dd>附件 / 可读</dd></div></dl>';
    ticker.insertAdjacentElement('afterend',plot);
    return plot;
  }

  function buildOa(){
    const ledger=document.createElement('section');
    ledger.className='motion-oa-ledger';
    ledger.setAttribute('aria-label','历史节点索引状态');
    ledger.innerHTML='<div><b>DOC-143</b><span>行政楼</span><small>PAPER</small></div><div><b>LOG-812</b><span>网络中心</span><small>DEVICE</small></div><div data-oa-orphan><b>'+(archiveVerified?'IDX-045':'IDX-044')+'</b><span>'+(archiveVerified?'owner: null':'东区')+'</span><small>'+(archiveVerified?'UNOWNED':'ROUTE')+'</small></div><i class="oa-readhead"></i>';
    ticker.insertAdjacentElement('afterend',ledger);
    return ledger;
  }

  function buildEntry(){
    buildHeaderSlides();
    const recovery=document.createElement('section');
    recovery.className='motion-entry-recovery';
    recovery.setAttribute('aria-label','转发缓存恢复进度');
    recovery.innerHTML='<div class="recovery-photo"></div><div class="recovery-copy"><b>PUBLIC_FORWARD / TH-238771</b><span>正文 17 / 19</span><span>附件 0 / 1</span><span data-recovery>checksum 7e3a</span></div>';
    recovery.querySelector('.recovery-photo').style.backgroundImage='url("'+root+'branch_workorder.jpg")';
    ticker.insertAdjacentElement('afterend',recovery);
    return recovery;
  }

  const builders={portal:buildPortal,bbs:buildBbs,press:buildPress,houqin:buildHouqin,oa:buildOa,entry:buildEntry};
  const scene=builders[config.kind]?.();

  let line=0;
  let active=0;
  const renderLine=()=>{
    tickerText.textContent=config.lines[line];
    ticker.className='legacy-ticker tone-'+(line%4)+' motion-'+config.kind+'-ticker';
    tickerText.classList.remove('is-entering');
    void tickerText.offsetWidth;
    tickerText.classList.add('is-entering');
    line=(line+1)%config.lines.length;
  };
  const animateScene=()=>{
    const slides=document.querySelectorAll('.legacy-slide');
    if(slides.length){
      slides[active%slides.length]?.classList.remove('active');
      active=(active+1)%slides.length;
      slides[active]?.classList.add('active');
    }else active++;
    if(config.kind==='press'&&scene){
      const items=[...scene.querySelectorAll('figure')];
      items.forEach((item,index)=>item.classList.toggle('is-reading',index===active%items.length));
    }
    if(config.kind==='bbs'&&scene){const node=scene.querySelector('[data-online]');if(node)node.textContent=String(44+(active%7));}
    if(config.kind==='houqin'&&scene)scene.style.setProperty('--plot-step',String(active%3));
    if(config.kind==='oa'&&scene)scene.style.setProperty('--ledger-step',String(active%3));
    if(config.kind==='entry'&&scene){const node=scene.querySelector('[data-recovery]');if(node)node.textContent=active%2?'checksum 7e3a':'attachment timeout';}
  };

  function setNarrativeTicker(message){
    tickerText.textContent=message;
    ticker.className='legacy-ticker narrative-drift motion-'+config.kind+'-ticker';
    tickerText.classList.remove('is-entering');
    void tickerText.offsetWidth;
    tickerText.classList.add('is-entering');
  }

  function showSignal(kicker,message){
    document.querySelector('.narrative-signal')?.remove();
    const signal=document.createElement('aside');
    signal.className='narrative-signal signal-'+config.kind;
    signal.setAttribute('aria-live','polite');
    signal.innerHTML='<span></span><strong></strong>';
    signal.querySelector('span').textContent=kicker;
    signal.querySelector('strong').textContent=message;
    body.appendChild(signal);
    requestAnimationFrame(()=>signal.classList.add('show'));
    window.setTimeout(()=>{
      signal.classList.remove('show');
      window.setTimeout(()=>signal.remove(),700);
    },reduced?1400:4200);
  }

  renderLine();
  let narrativeShifted=false;
  document.addEventListener('xu:thread-edge',event=>{
    if(narrativeShifted||!event.detail?.message)return;
    narrativeShifted=true;
    setNarrativeTicker(event.detail.message);
    const drift=scene?.querySelector('[data-drift]');
    if(drift)drift.innerHTML='<b>SYNC</b> 楼层顺序未通过校验';
    showSignal('CACHE ORDER MISMATCH',event.detail.message);
  });
  document.addEventListener('xu:evidence-verified',event=>{
    if(!event.detail?.message)return;
    narrativeShifted=true;
    setNarrativeTicker(event.detail.message);
    const orphan=scene?.querySelector('[data-oa-orphan]');
    if(orphan){
      orphan.querySelector('b').textContent='IDX-045';
      orphan.querySelector('span').textContent='owner: null';
      orphan.querySelector('small').textContent='UNOWNED';
    }
    body.classList.add('oa-state-verified');
    showSignal('INDEX REBUILD',event.detail.message);
  });

  if(!reduced){
    let lineTimer=null;
    let sceneTimer=null;
    const start=()=>{
      if(lineTimer||document.hidden)return;
      lineTimer=window.setInterval(renderLine,6200);
      sceneTimer=window.setInterval(animateScene,5200);
    };
    const stop=()=>{
      if(lineTimer)window.clearInterval(lineTimer);
      if(sceneTimer)window.clearInterval(sceneTimer);
      lineTimer=null;
      sceneTimer=null;
    };
    document.addEventListener('visibilitychange',()=>{document.hidden?stop():start();});
    start();
  }
  requestAnimationFrame(()=>body.classList.add('motion-ready'));
})();
