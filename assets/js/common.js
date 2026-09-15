(function(){
  'use strict';
  document.documentElement.classList.add('js');

  const storageKey='xuYuanInvestigationV12';
  const path=location.pathname.replace(/\\/g,'/');
  const evidenceLabels={
    notice:'情况说明中的异常措辞',mirror:'旧论坛只读镜像',firstWish:'2012年的最早许愿帖',threeStudents:'2014年的三人目击',retraction:'2016年的删帖说明',treeId:'树木编号 YL-E-017',breaks:'2014-05-24 折枝工单',lateThread:'2016-11-18 东操场帖',paper:'21:46 纸质值班记录',device:'21:51 设备记录',dispatch:'21:58 调度记录',verified:'三源时间链已校验',orphan:'未归属静态路径'
  };
  const pageEvidence=[
    [/\/minglan\/notice-east\.html$/,['notice']],
    [/\/minglan\/network-civility\.html$/,['mirror']],
    [/\/bbs\/thread-hanger2012\.html$/,['firstWish']],
    [/\/bbs\/thread-east2014\.html$/,['threeStudents']],
    [/\/bbs\/thread-hanger2016\.html$/,['retraction']],
    [/\/bbs\/thread-eastfield2016\.html$/,['lateThread']],
    [/\/press\/tree-care\.html$/,['treeId']],
    [/\/houqin\/workorder-2014-0524\.html$/,['breaks']],
    [/\/oa\/server-path\.html$/,['orphan']]
  ];
  let state={seen:{},compact:false,finished:false};

  function readState(){
    try{
      const stored=JSON.parse(localStorage.getItem(storageKey)||'{}');
      if(stored&&typeof stored==='object')state={...state,...stored,seen:{...state.seen,...(stored.seen||{})}};
    }catch(_error){}
  }
  function writeState(){
    try{localStorage.setItem(storageKey,JSON.stringify(state));}catch(_error){}
  }
  function mark(keys){
    let changed=false;
    keys.forEach(key=>{if(!state.seen[key]){state.seen[key]=Date.now();changed=true;}});
    if(changed)writeState();
    renderNotebook();
  }
  readState();
  pageEvidence.forEach(([pattern,keys])=>{if(pattern.test(path))mark(keys);});

  const stages=[
    {name:'传言',when:()=>true,task:'核对情况说明里的异常措辞，再找到它指向的原始讨论。'},
    {name:'旧闻',when:()=>state.seen.mirror,task:'按年份与用户名交叉比对：最早许愿、三人目击、后来删帖。'},
    {name:'记录',when:()=>state.seen.firstWish&&state.seen.threeStudents&&state.seen.retraction,task:'把“那棵树”换成可检索锚点：先找树木编号，再用日期与位置核对工单。'},
    {name:'记录',when:()=>state.seen.treeId&&state.seen.breaks,task:'工单确认了“三人”。继续沿 qiming_7 查到2016年最后一次东操场警告。'},
    {name:'名单',when:()=>state.seen.lateThread,task:'帖子发布于11月18日凌晨却写“昨晚”：用2016-11-17＋东操场查询三份记录。'},
    {name:'许愿',when:()=>state.seen.verified||state.seen.orphan,task:'沿静态目录找到未归属页面。你不需要口令，只需要一条能解释的时间链。'}
  ];
  function currentStage(){
    let current=stages[0];
    stages.forEach(stage=>{if(stage.when())current=stage;});
    return current;
  }
  function mountNotebook(){
    if(document.querySelector('.investigation-note')||document.body.classList.contains('site-willow'))return;
    const note=document.createElement('aside');
    note.className='investigation-note';
    note.setAttribute('aria-label','调查便笺');
    note.innerHTML='<button class="investigation-toggle" type="button" aria-expanded="true"><span>调查便笺</span><b class="investigation-stage"></b></button><div class="investigation-body"><p class="investigation-task"></p><div class="investigation-seen" aria-live="polite"></div><p class="investigation-rule">只记录已见事实；不同站点之间请保留标签页交叉核对。</p></div>';
    document.body.appendChild(note);
    note.querySelector('.investigation-toggle').addEventListener('click',()=>{
      state.compact=!state.compact;
      writeState();
      renderNotebook();
    });
    renderNotebook();
  }
  function renderNotebook(){
    const note=document.querySelector('.investigation-note');
    if(!note)return;
    const stage=currentStage();
    note.classList.toggle('is-compact',!!state.compact);
    note.querySelector('.investigation-toggle').setAttribute('aria-expanded',String(!state.compact));
    note.querySelector('.investigation-stage').textContent=stage.name;
    note.querySelector('.investigation-task').textContent='当前调查：'+stage.task;
    const known=Object.keys(evidenceLabels).filter(key=>state.seen[key]);
    const relevant=known.slice(Math.max(0,known.length-4));
    note.querySelector('.investigation-seen').innerHTML=relevant.length?'<span>已记下</span>'+relevant.map(key=>'<i>'+evidenceLabels[key]+'</i>').join(''):'<span>已记下</span><i>尚无可确认事实</i>';
    document.body.classList.add('investigation-ready');
  }

  window.addEventListener('xu-evidence',event=>{
    const keys=Array.isArray(event.detail)?event.detail:[event.detail];
    mark(keys.filter(key=>evidenceLabels[key]));
  });
  window.addEventListener('storage',event=>{
    if(event.key!==storageKey)return;
    readState();
    renderNotebook();
  });

  function addRouteNotes(){
    const notes=[
      [/\/minglan\/notice-east\.html$/,['索引说明：','“失实信息”不是结论锚点；先追到校方所指的原始讨论。','network-civility.html','查看公开资源']],
      [/\/bbs\/thread-east2017\.html$/,['缓存说明：','楼层号与写入顺序不同。更早记录应按年份或用户名查，而不是只盯着当前热帖。','archive.html','打开旧帖存档']],
      [/\/bbs\/thread-eastfield2016\.html$/,['日期换算：','本帖发布于 2016-11-18 凌晨，正文中的“昨晚”对应 2016-11-17；历史节点按事件发生日归档。','../houqin/migrate.html','查看旧库入口']],
      [/\/houqin\/workorder-2014-0524\.html$/,['字段说明：','公开工单隐去姓名，但保留了日期、位置、人数和树木编号；这些字段都能在别处复核。','migrate.html','查看迁移规则']],
      [/\/oa\/incidents\.html$/,['查询说明：','日期按事件发生日归档；区域使用当年行政名称。查询结果只给原始摘要，不替你合并因果。','','']],
      [/\/oa\/eastfield-2016\.html$/,['互证说明：','纸张、设备、调度三份来源各自独立；依次查看后，再判断谁先发生、谁创造了空窗。','','']]
    ];
    const match=notes.find(([pattern])=>pattern.test(path));
    if(!match)return;
    const main=document.querySelector('main');
    if(!main||main.querySelector('.archive-route-note'))return;
    const note=document.createElement('p');
    note.className='archive-route-note';
    note.innerHTML='<span>'+match[1]+'</span>'+match[2]+(match[3]?' <a href="'+match[3]+'">'+match[4]+'</a>':'');
    main.appendChild(note);
  }

  function restoreAfterEnding(){
    if(!state.finished||!document.body.classList.contains('entry-cache'))return;
    const foot=document.querySelector('.cap-foot');
    if(!foot||document.querySelector('.return-receipt'))return;
    const receipt=document.createElement('div');
    receipt.className='return-receipt';
    receipt.innerHTML='<span>LOCAL RECEIPT / 01</span><b>你留下的愿望没有被上传；这次调查已经在本机结束。</b>';
    foot.insertAdjacentElement('beforebegin',receipt);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{mountNotebook();addRouteNotes();restoreAfterEnding();});
  else{mountNotebook();addRouteNotes();restoreAfterEnding();}
})();
