(function(){
  'use strict';
  const body=document.body;
  if(!body)return;
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root=body.classList.contains('entry-cache')?'assets/img/':'../assets/img/';

  const pageLine=()=>{
    const cls=[...body.classList];
    const table=[
      ['minglan-notice-east','保卫处补充：夜间巡查如遇学生停留，请先核对同行人数与登记人数是否一致。'],
      ['minglan-security','值班登记出现人数差异时，以纸质签字表为准，监控截图只作位置参考。'],
      ['minglan-campus','摄影资料室备注：东操场一组旧照片的人数说明与底片登记不一致，原片暂不外借。'],
      ['bbs-thread-hanger2012','旧帖缓存：3#之后直接保留6#，4#—5#只有引用位置，没有恢复正文。'],
      ['bbs-thread-hanger2016','该主题的旧截图与当前快照并不完全一致，缺失楼层仍按原编号保留。'],
      ['bbs-thread-east2014','值班登记写着三人离开，第二天后勤工单却记了四处新鲜断口。'],
      ['bbs-thread-east2017','这张转发图的拍摄年份有争议，围挡记录本身来自2017年4月。'],
      ['bbs-thread-radio2016','12:01的广播中断有设备记录，但学生转述的那半句话不在节目底稿里。'],
      ['bbs-thread-eastfield2016','帖子时间已过零点，楼内讨论的“昨晚”均指11月17日。'],
      ['press-tree-care','资料室备注：同一树木编号在公开稿、工单和底片索引中都能找到，但照片计数并不一致。'],
      ['press-scholarship','编辑部留存的打印稿页脚早于最终公示日期四天，原件未重新制版。'],
      ['press-radio-schedule','节目单只记录12:01中断，没有记录学生后来提到的那句话。'],
      ['hq-workorder-2014-0524','前夜值班登记三人，次日现场逐项登记四处新鲜断口，两份记录都没有被改写。'],
      ['hq-pruning','2014年的“4处”来自现场逐项登记，不是后期汇总数字。'],
      ['oa-eastfield-2016','纸质、设备和调度记录分别保留原始时间；旧节点不替它们解释因果关系。'],
      ['oa-server-path','静态扫描会保留无法归属的文件，owner字段为空也不会自动删除。']
    ];
    const row=table.find(([name])=>cls.includes(name));
    return row?row[1]:'';
  };

  const configs={
    minglan:{test:'site-minglan',after:'.ml-head',kind:'portal',lines:[
      '春季校园运行正常。东操场北侧绿化围挡夜间不开放，请按现场路线绕行。',
      '夜间巡查登记如出现人数差异，请以当班纸质签字记录为准。',
      '东区绿化编号 YL-E-017 的折枝清理记录与照片附件数量存在一处差异。',
      '校内摄影资料整理中，同一底片的人数说明以资料室纸质登记为准。'
    ]},
    bbs:{test:'site-bbs',after:'.bbs-head',kind:'bbs',lines:[
      '旧版论坛只读镜像：部分楼层正文已丢失，引用位置和原楼层号仍然保留。',
      '缓存校验：主题回复总数与当前可见楼层并不总是一致。',
      '旧附件只保留文件名和缩略图，原图来源失效后不再补写说明。',
      '注销账号仍可能出现在历史引用里，镜像不会替换原用户名。'
    ]},
    press:{test:'site-press',after:'.press-head',kind:'press',lines:[
      '校报资料室只按原刊录入，扫描件与纸质原稿不一致时不代为更正。',
      '一组东操场底片登记三人，扫描件中可辨认的人影数量为四。',
      '2014年奖学金打印稿页脚早于最终公示日期，编辑部保留原件日期。',
      '2016年4月11日午间节目12:01中断，旧节目底稿没有学生后来转述的那句话。'
    ]},
    houqin:{test:'site-houqin',after:'.hq-head',kind:'houqin',lines:[
      '公开工单只显示已结摘要，原始附件编号和现场逐项登记保持不变。',
      'YL-E-017：2014年5月24日现场登记四处新鲜断口，前夜值班登记学生三人。',
      '附件序号存在缺项时不重新编号，旧库迁移后仍按原编号展示。',
      '设备时间戳和纸质值班记录分别保存，系统不自动合并成同一事件。'
    ]},
    oa:{test:'site-oa',after:'.oa-head',kind:'oa',lines:[
      '历史记录只读节点按原始时间戳展示，不按事件因果关系重新排序。',
      '纸质记录、设备记录和调度记录使用各自来源时间，迁移时未统一改写。',
      '索引中存在一条来源字段为空的关联记录，原始记录本身未被覆盖。',
      '静态清单会保留 owner 为空的文件；旧节点不执行自动清理。'
    ]},
    entry:{test:'entry-cache',after:'.cap-head',kind:'entry',lines:[
      '转发缓存共19条回复，当前只恢复17条；缺失楼层的引用位置仍在。',
      '附件 IMG_0420.JPG 的源地址已经失效，镜像仅保存文件名与引用位置。',
      '该缓存来自公开转发页，原作者账号和附件服务器均不可用。',
      '链接预览指向明岚大学2017年4月17日公开说明。'
    ]}
  };
  const config=Object.values(configs).find(item=>body.classList.contains(item.test));
  if(!config)return;
  const anchor=document.querySelector(body.classList.contains('oa-server-path')?'.term-top':config.after);
  if(!anchor)return;

  const lines=[pageLine(),...config.lines].filter(Boolean);
  const ticker=document.createElement('div');
  ticker.className='legacy-ticker motion-'+config.kind+'-ticker';
  ticker.setAttribute('aria-label','页面固定轮播信息');
  const tickerText=document.createElement('span');
  tickerText.className='legacy-ticker-text';
  ticker.appendChild(tickerText);
  anchor.insertAdjacentElement('afterend',ticker);

  function buildPortal(){
    const rail=document.createElement('div');
    rail.className='motion-portal-rail';
    rail.innerHTML='<span>校园要闻</span><i></i><span>通知公告</span><i></i><span>东区绿化 / YL-E-017</span><b>2017 / 04</b>';
    ticker.insertAdjacentElement('afterend',rail);
    return rail;
  }

  const bbsImages={
    'bbs-thread-hanger2012':'scene_bbs_hanger2012.jpg',
    'bbs-thread-hanger2016':'scene_bbs_hanger2016.jpg',
    'bbs-thread-east2014':'scene_bbs_east2014.jpg',
    'bbs-thread-radio2016':'scene_bbs_radio2016.jpg',
    'bbs-thread-eastfield2016':'scene_bbs_eastfield2016.jpg',
    'bbs-thread-east2017':'scene_bbs_east2017.jpg',
    'bbs-thread-scholarship2014':'scene_bbs_scholarship2014.jpg',
    'bbs-thread-club2013':'scene_bbs_club2013.jpg',
    'bbs-thread-dorm2016':'scene_bbs_dorm2016.jpg'
  };
  function buildBbs(){
    const bar=document.createElement('section');
    bar.className='motion-bbs-console';
    bar.setAttribute('aria-label','论坛镜像状态');
    bar.innerHTML='<span><b>HOT</b> 今日主题 126</span><span><b>ONLINE</b> 访客模式</span><span><b>ARCHIVE</b> 已恢复 1842 主题</span><span><b>SYNC</b> 原楼层号保留</span>';
    ticker.insertAdjacentElement('afterend',bar);
    const cls=[...body.classList].find(name=>bbsImages[name]);
    if(cls){
      body.classList.add('bbs-key-thread');
      const stage=document.createElement('section');
      stage.className='motion-bbs-stage single-photo-stage';
      stage.setAttribute('aria-label','旧帖缓存影像');
      const frame=document.createElement('i');
      frame.className='bbs-stage-frame active';
      frame.style.backgroundImage='url("'+root+bbsImages[cls]+'")';
      stage.appendChild(frame);
      const copy=document.createElement('div');
      copy.className='bbs-stage-copy';
      copy.textContent=document.title.replace(/^\[[^\]]+\]\s*/,'').replace(/^【[^】]+】\s*/,'');
      const small=document.createElement('small');
      small.textContent='旧帖缓存 / 原楼层号保留 / 缺失正文不补写';
      copy.appendChild(small); stage.appendChild(copy);
      const idx=document.createElement('div'); idx.className='bbs-stage-index'; idx.textContent='SNAPSHOT / 2017-04-20'; stage.appendChild(idx);
      bar.insertAdjacentElement('afterend',stage);
    }
    return bar;
  }

  function buildPress(){ return null; }
  function buildHouqin(){
    if(!body.classList.contains('hq-index'))return null;
    const evidence=document.createElement('section');
    evidence.className='motion-hq-evidence';
    evidence.setAttribute('aria-label','公开工单影像摘要');
    evidence.innerHTML='<figure><img alt="东区维护资料照片" src="'+root+'scene_hq_index.jpg"><figcaption>HQDATA_02 / PUBLIC INDEX</figcaption></figure><div><b>YL-E-017</b><span>前夜登记：3人</span><span>现场断口：4处</span><span>附件编号：原序保留</span></div>';
    ticker.insertAdjacentElement('afterend',evidence); return evidence;
  }
  function buildOa(){
    if(!body.classList.contains('oa-eastfield-2016'))return null;
    const evidence=document.createElement('section');
    evidence.className='motion-oa-evidence';
    evidence.setAttribute('aria-label','历史节点来源摘要');
    evidence.innerHTML='<figure><img alt="东操场夜间资料照片" src="'+root+'scene_oa_eastfield.jpg"></figure><div><b>LEGACY SOURCE SET</b><span>paper / device / dispatch</span><span>timestamps preserved separately</span><span>unowned index retained</span></div>';
    ticker.insertAdjacentElement('afterend',evidence); return evidence;
  }
  function buildEntry(){
    const recovery=document.createElement('section');
    recovery.className='motion-entry-recovery';
    recovery.setAttribute('aria-label','转发缓存恢复摘要');
    recovery.innerHTML='<div class="recovery-photo"></div><div class="recovery-copy"><b>PUBLIC_FORWARD / TH-238771</b><span>正文 17 / 19</span><span>附件 0 / 1</span><span>原楼层号保留</span></div>';
    recovery.querySelector('.recovery-photo').style.backgroundImage='url("'+root+'scene_entry_cache.jpg")';
    ticker.insertAdjacentElement('afterend',recovery); return recovery;
  }

  const builders={portal:buildPortal,bbs:buildBbs,press:buildPress,houqin:buildHouqin,oa:buildOa,entry:buildEntry};
  builders[config.kind]?.();

  let line=0;
  function renderLine(){
    tickerText.textContent=lines[line%lines.length];
    ticker.className='legacy-ticker tone-'+(line%4)+' motion-'+config.kind+'-ticker';
    tickerText.classList.remove('is-entering'); void tickerText.offsetWidth; tickerText.classList.add('is-entering');
    line=(line+1)%lines.length;
  }
  renderLine();
  if(!reduced){
    let timer=null;
    const start=()=>{ if(timer||document.hidden)return; timer=window.setInterval(renderLine,6800); };
    const stop=()=>{ if(timer)window.clearInterval(timer); timer=null; };
    document.addEventListener('visibilitychange',()=>{document.hidden?stop():start();}); start();
  }
  requestAnimationFrame(()=>body.classList.add('motion-ready'));
})();
