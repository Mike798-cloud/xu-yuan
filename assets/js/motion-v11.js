(function(){
  'use strict';
  const body=document.body;
  if(!body)return;
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root=body.classList.contains('entry-cache')?'assets/img/':'../assets/img/';

  const pageLine=()=>{
    const cls=[...body.classList];
    const table=[
      ['minglan-index','信息中心今日复核旧照片时，仍有一卷底片的人数说明和纸质登记对不上。'],
      ['minglan-notices','4月15日东区清理共登记55件杂物，封袋转运只有54件，交接表写的是“以袋数为准”。'],
      ['minglan-academic','2012年补考复核里那条“缺考→到考”没有改分数，纸质签到却专门被重新扫描了一次。'],
      ['minglan-security','2016年11月的公开巡查摘要反复强调“先数人”，比普通夜间巡查多了一道核对步骤。'],
      ['minglan-map','学生口中的“东边”“老体后面”“东操场那边”不是同一个正式地点，位置索引保留各自编号。'],
      ['minglan-campus','《东操场，22:07》在布展当天撤下，登记表只写“原片退摄影部”，没有写原因。'],
      ['minglan-news','东区绿带清理时登记数和封袋数相差1件，新闻稿没有把它当成事件。'],
      ['minglan-network-civility','旧论坛镜像没有“传闻”标签，找旧帖只能靠年份、用户名和原题目。'],
      ['minglan-notice-east','保卫处补充：夜间巡查如遇学生停留，请先核对同行人数与登记人数是否一致。'],
      ['bbs-index','热门主题里那棵“东边的树”已经不是第一次被提起，旧站索引还能查到更早的同名用户。'],
      ['bbs-archive','旧帖索引保留原楼层号和作者名，正文丢了也不会把后面的楼层往前挪。'],
      ['bbs-thread-bike','这辆车的后胎确实换过，帖子里唯一说不清的是谁先替学妹留了车。'],
      ['bbs-thread-broadcast-call','广播站还收纸稿，因为值班老师会在原稿上直接改；电子版反而经常少批注。'],
      ['bbs-thread-cet','考试频率一直是83.5，论坛里那条86.0只是把另一场模拟考记混了。'],
      ['bbs-thread-class-seat','二教值班室坚持每天清抽屉，可同一本蓝皮高数已经被“今天捡到”过两次。'],
      ['bbs-thread-dormwater','317的热水修好了，洗衣机2号下面那滩水却被不同楼层的人连续提了三天。'],
      ['bbs-thread-food','二食堂后场灯本来就整夜亮着，半夜看到亮灯不代表窗口还营业。'],
      ['bbs-thread-library','图书馆帖子没有树，也没有许愿；它只是提醒你，不是每个古怪细节都属于同一件事。'],
      ['bbs-thread-lost','透明伞已经有人凭小票领走，可一周前同一位置也有人说捡到过一把一样的。'],
      ['bbs-thread-night-run','北侧围带里面不是跑道，体育部反复说这句话，却从不解释为什么围带每年都要重新拉。'],
      ['bbs-thread-print','南门文印店的营业时间没什么问题，真正留下来的只是旧稿页脚和打印日期。'],
      ['bbs-thread-qiming-keys','蓝色塑料牌不是宿舍号，而是器材编号“3I7”；郑启明在这个帖子里第一次留下完整领取记录。'],
      ['bbs-thread-qiming-recruit','社联旧表一直由 qiming_7 收，采访档案能确认这个账号就是郑启明本人。'],
      ['bbs-thread-secondhand','显示器的暗点和电源板都能解释清楚，论坛里普通帖子越多，那些解释不清的旧帖反而越扎眼。'],
      ['bbs-thread-hanger2012','旧帖缓存：3#之后直接保留6#，4#—5#只有引用位置，没有恢复正文。'],
      ['bbs-thread-hanger2016','该主题的旧截图与当前快照并不完全一致，缺失楼层仍按原编号保留。'],
      ['bbs-thread-east2014','三个人从老体出来，树牌是E-017；第二天工单逐项登记了四处新鲜断口。'],
      ['bbs-thread-east2017','qiming_7说2014年发过一帖，旧站索引还能按用户名把它找出来。'],
      ['bbs-thread-radio2016','12:01的广播中断有设备记录，但学生转述的那半句话不在节目底稿里。'],
      ['bbs-thread-eastfield2016','帖子发在零点以后，楼里所有人说的“昨晚”其实都是11月17日。'],
      ['bbs-thread-scholarship2014','补录名单内容没有错，奇怪的是一份“最终版”打印稿比最终公示早了四天。'],
      ['bbs-thread-club2013','剧社进决赛是真的，老体吊杆故障也是真的；两件事被放在同一帖里以后才显得不对劲。'],
      ['bbs-thread-dorm2016','19:10临检取消、19:43辅导员困电梯，这两个时间后来都能在别的系统里找到。'],
      ['press-index','校报档案里最有用的不是传闻，而是那些日期、底片号和更正记录仍然能与校内系统互相核对。'],
      ['press-tree-care','YL-E-017在正式资料里只是普通垂柳，学生给它起过什么名字，校报从来没写。'],
      ['press-profile-club','采访签字能确认郑启明就是 qiming_7，所以2014年的几个旧帖不是同名账号。'],
      ['press-radio-schedule','节目单只记录12:01中断，没有记录学生后来提到的那句话。'],
      ['press-scholarship','编辑部留存的打印稿页脚早于最终公示日期四天，原件没有重新制版。'],
      ['press-sports-special','“0.00秒”是普通设备故障，编辑部专门更正过；不是所有怪记录都和那棵树有关。'],
      ['press-corrections','校报的规矩是不覆盖原稿，错日期、错场次和错编号都另写更正，因此前后版本还能对照。'],
      ['press-library','2014年5月那卷底片借阅记录写着“旧体育馆东侧 / 22:07 / 3人”，公开网页没有原图。'],
      ['press-graduation','摄影部后来改用签到表核人数，因为“靠照片数人”曾经惹出过一次争议。'],
      ['press-welcome','2013年社团节旧摊位图曾在老体东侧多画一个空位，正式版把它手工划掉了。'],
      ['hq-index','YL-E-017的2014复查仍保留原附件序号，缺项不会自动补号。'],
      ['hq-trees','资产表把YL-E-017归在旧体育馆东侧绿带，并不归东操场。'],
      ['hq-pruning','2014年的“4处”来自现场逐项登记，不是后期汇总数字。'],
      ['hq-map-page','公开工单按原位置字段筛选，同一片绿带在学生口中却常被叫成“东操场那边”。'],
      ['hq-repairs','很多看上去很怪的维修记录最后都有普通原因，只有缺少交叉记录的条目无法直接排除。'],
      ['hq-migrate','旧节点不能全文搜“柳树”或“许愿”，只能用日期和行政区域把原始记录重新找出来。'],
      ['hq-workorder-stage','老体吊杆故障的A/B/C/D附件齐全，空场下移最后按限位开关故障结案。'],
      ['hq-workorder-power','广播站12:01:14跳闸有设备自动记录，工单本身并不知道节目里播了什么。'],
      ['hq-workorder-2014-0524','这张工单只剩A、B、D三类附件，C项没有迁入，但字母位置被原样保留。'],
      ['oa-index','旧节点不接受关键词，只能用日期和行政区域重找那些已经看过的事情。'],
      ['oa-incidents','REC_QUERY只认实际发生日；零点后发的帖子，日期要按正文里的“昨晚”换回去。'],
      ['oa-duty','2016年11月的月度摘要被拆成单日扫描件，公开页只剩“人员调整”四个字。'],
      ['oa-logs','日志不会解释因果，它只能把“先发生什么、后发生什么”钉死在时间戳上。'],
      ['oa-scans','扫描目录里有一张未归类便笺单独编号，正式事故结论没有引用它。'],
      ['oa-asset','EAST-CAM-02季度校时完整，2016年11月的设备时间不能差到几分钟。'],
      ['oa-memo','手写便笺要求“页码乱了不要重排”，因为后面已经有人按原号引用。'],
      ['oa-migration','业务记录会迁入模块，找不到业务归属的静态HTML则按原路径保留，不主动清理。'],
      ['oa-eastfield-2016','纸质、设备和调度记录分别保留原始时间；旧节点不替它们解释因果关系。'],
      ['oa-server-path','路径盘点里有一个owner为空的静态文件，只有来源交叉核对通过后才值得继续打开。']
    ];
    const row=table.find(([name])=>cls.includes(name));
    return row?row[1]:'';
  };

  const configs={
    minglan:{test:'site-minglan',after:'.ml-head',kind:'portal',lines:[
      '春季校园运行正常。东操场北侧绿化围挡夜间不开放，请按现场路线绕行。',
      '夜间巡查登记如出现人数差异，请以当班纸质签字记录为准。',
      '东区绿化工单有一条附件数量与现场登记对不上，公开页仍保留原序号。',
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
