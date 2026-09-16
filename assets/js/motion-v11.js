(function(){
  'use strict';
  const body=document.body;
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root=body.classList.contains('entry-cache')?'assets/img/':'../assets/img/';
  const configs={
    minglan:{test:'site-minglan',after:'.ml-head',host:'.ml-head .inner',kind:'photos',lines:['★ 春季绿化养护进行中 ★ 图书馆周末开放 ★ 南门施工请绕行','校内信息公开：东区夜跑请按保卫处现场指引通行','网络中心：旧版学生论坛仅保留只读镜像','明德笃行 · 岚风致远　请勿攀折校园树木'],cards:[['campus_event.jpg','校园风采 / 春季活动'],['branch_workorder.jpg','公开附件 / 东区绿化'],['campus_event.jpg','校内影像 / 社团活动']]},
    bbs:{test:'site-bbs',after:'.bbs-head',kind:'bulletin',lines:['★ 旧版论坛只读镜像 · 附件与头像可能失效 ★','今日热帖：317今晚有热水吗　|　南门文印店几点关门','服务器时间 2017-04-20 22:17　访客模式 / READ ONLY','旧帖恢复任务运行中……最后同步 22:11'],cards:[['HOT','今日热帖','生活帖与校园闲聊持续更新'],['ARCHIVE','旧帖恢复','已恢复主题 1842'],['NOTICE','镜像提示','注册、回复与私信功能关闭']]},
    press:{test:'site-press',after:'.press-head',kind:'contact',lines:['校报资料室：2012—2017 数字化稿件开放查询','本期勘误：广播节目中断时间更正为 12:01','原稿缺页 7　扫描件正在按期号重新装订','广播旧稿 FM-2016-0411 已恢复索引'],cards:[['campus_event.jpg','第102期 / 校园版'],['branch_workorder.jpg','摄影附件 / 绿化复查'],['campus_event.jpg','底片索引 / 社团活动']]},
    houqin:{test:'site-houqin',after:'.hq-head',kind:'map',lines:['HQDATA_02 / PUBLIC　最近同步 2017-04-20 10:24','工单 HQ-2017-0418　东区绿地　状态：已结','树木资产 YL-E-017　非养护性折断记录待复核','公开查询仅显示已结工单摘要　个人字段不显示'],cards:[['E-01','东操场北侧','巡查区域'],['YL-E-017','树木资产','记录完整'],['HQ-0524','复查工单','附件可读']]},
    oa:{test:'site-oa',after:'.oa-head',kind:'records',lines:['MLU-ARC / READ ONLY　INDEX 1842 RECORDS','REC_QUERY READY　PUBLIC FIELDS ONLY','BACKUP NODE 02　LAST VERIFY 2017-04-20','SOURCE RECORDS PRESERVED SEPARATELY'],cards:[['DOC-143','行政楼','PAPER'],['LOG-812','网络中心','DEVICE'],['IDX-044','东区','ROUTE']]},
    entry:{test:'entry-cache',after:'.cap-head',host:'.cap-head',kind:'cache',lines:['FORWARD_CACHE / public snapshot / 2017-04-20','原回复 19　恢复 17　附件 1　校验 7e3a','链接预览来自 minglan.edu.cn 历史页面','缓存节点只读 · 原附件可能已经失效'],cards:[['campus_event.jpg','FORWARD / CAMPUS'],['branch_workorder.jpg','ATTACHMENT / LOST'],['campus_event.jpg','CACHE / PUBLIC']]}
  };
  const config=Object.values(configs).find(item=>body.classList.contains(item.test));
  if(!config)return;

  const anchor=document.querySelector(body.classList.contains('oa-server-path')?'.term-top':config.after);
  if(!anchor)return;
  const ticker=document.createElement('div');
  ticker.className='legacy-ticker tone-0';
  ticker.setAttribute('aria-label','旧站轮播信息');
  const tickerText=document.createElement('span');
  tickerText.className='legacy-ticker-text';
  ticker.appendChild(tickerText);
  anchor.insertAdjacentElement('afterend',ticker);

  const stage=document.createElement('section');
  stage.className='site-motion site-motion-'+config.kind;
  stage.setAttribute('aria-label','站点动态信息');
  const cards=document.createElement('div');
  cards.className='site-motion-track';
  config.cards.forEach((card,index)=>{
    const item=document.createElement('article');
    item.className='site-motion-card'+(index===0?' active':'');
    if(['photos','contact','cache'].includes(config.kind)){
      const image=document.createElement('img');
      image.src=root+card[0];
      image.alt='';
      const label=document.createElement('span');
      label.textContent=card[1];
      item.append(image,label);
    }else{
      item.innerHTML='<b>'+card[0]+'</b><span>'+card[1]+'</span><small>'+card[2]+'</small>';
    }
    cards.appendChild(item);
  });
  const meter=document.createElement('div');
  meter.className='site-motion-meter';
  meter.innerHTML=config.cards.map((_,index)=>'<i'+(index===0?' class="active"':'')+'></i>').join('');
  stage.append(cards,meter);
  ticker.insertAdjacentElement('afterend',stage);

  if(config.host&&['photos','cache'].includes(config.kind)){
    const host=document.querySelector(config.host);
    if(host){
      const slides=document.createElement('div');
      slides.className='legacy-slides';
      config.cards.forEach((card,index)=>{
        const slide=document.createElement('span');
        slide.className='legacy-slide'+(index===0?' active':'');
        slide.style.backgroundImage='url("'+root+card[0]+'")';
        slides.appendChild(slide);
      });
      host.appendChild(slides);
    }
  }

  let line=0;
  let active=0;
  const renderLine=()=>{
    tickerText.textContent=config.lines[line];
    ticker.className='legacy-ticker tone-'+(line%4);
    tickerText.classList.remove('is-entering');
    void tickerText.offsetWidth;
    tickerText.classList.add('is-entering');
    line=(line+1)%config.lines.length;
  };
  const renderCard=()=>{
    const all=[...cards.children];
    const dots=[...meter.children];
    all[active].classList.remove('active');
    dots[active].classList.remove('active');
    const slides=document.querySelectorAll('.legacy-slide');
    if(slides[active])slides[active].classList.remove('active');
    active=(active+1)%all.length;
    all[active].classList.add('active');
    dots[active].classList.add('active');
    if(slides[active])slides[active].classList.add('active');
  };
  renderLine();
  let narrativeShifted=false;
  document.addEventListener('xu:thread-edge',event=>{
    if(narrativeShifted||!event.detail?.message)return;
    narrativeShifted=true;
    tickerText.textContent=event.detail.message;
    ticker.className='legacy-ticker narrative-drift';
    tickerText.classList.remove('is-entering');
    void tickerText.offsetWidth;
    tickerText.classList.add('is-entering');
  });
  if(!reduced){
    let lineTimer=null;
    let cardTimer=null;
    const start=()=>{
      if(lineTimer||document.hidden)return;
      lineTimer=window.setInterval(renderLine,6200);
      cardTimer=window.setInterval(renderCard,5200);
    };
    const stop=()=>{
      if(lineTimer)window.clearInterval(lineTimer);
      if(cardTimer)window.clearInterval(cardTimer);
      lineTimer=null;
      cardTimer=null;
    };
    document.addEventListener('visibilitychange',()=>{document.hidden?stop():start();});
    start();
  }
})();
