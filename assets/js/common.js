(function(){
  document.documentElement.classList.add('js');

  const reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body=document.body;
  const siteConfig=body.classList.contains('site-minglan')?{
    host:'.ml-head .inner',after:'.ml-head',slides:true,
    lines:['★ 春季绿化养护进行中 ★ 图书馆周末开放 ★ 南门施工请绕行','校内信息公开：东区夜跑请按保卫处现场指引通行','网络中心：旧版学生论坛仅保留只读镜像','明德笃行 · 岚风致远　请勿攀折校园树木']
  }:body.classList.contains('site-bbs')?{
    host:'.bbs-head',after:'.bbs-head',slides:true,
    lines:['★ 旧版论坛只读镜像 · 附件与头像可能失效 ★','今日热帖：317今晚有热水吗　|　南门文印店几点关门','服务器时间 2017-04-20 22:17　访客模式 / READ ONLY','旧帖恢复任务运行中……部分楼层顺序可能错位']
  }:body.classList.contains('site-press')?{
    after:'.press-head',lines:['校报资料室：2012—2017 数字化稿件开放查询','本期勘误：广播节目中断时间更正为 12:01','原稿缺页 7　扫描件正在按期号重新装订','广播旧稿 FM-2016-0411 已恢复索引']
  }:body.classList.contains('site-houqin')?{
    after:'.hq-head',lines:['HQDATA_02 / PUBLIC　最近同步 2017-04-20 10:24','工单 HQ-2017-0418　东区绿地　状态：已结','树木资产 YL-E-017　非养护性折断记录待复核','旧库迁移完成　未归属静态文件：1']
  }:body.classList.contains('site-oa')?{
    after:'.oa-head',lines:['MLU-ARC / READ ONLY　INDEX 1842 RECORDS','REC_QUERY READY　日期按事件发生日归档','2016-11-17 / EASTFIELD　3 SOURCES PRESERVED','STATIC INVENTORY DIFF +1 / OWNER NULL']
  }:body.classList.contains('entry-cache')?{
    after:'.cap-head',lines:['FORWARD_CACHE / public snapshot / 2017-04-20','原回复 19　恢复 17　附件 1　校验 7e3a','链接预览来自 minglan.edu.cn 历史页面','缓存节点只读 · 原附件可能已经失效']
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
    const sources=['../assets/img/campus_event.jpg','../assets/img/branch_workorder.jpg','../assets/img/willow_main.jpg'];
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

  function addForumRecovery(){
    if(!body.classList.contains('site-bbs'))return;
    const thread=document.querySelector('.thread');
    if(!thread)return;
    const additions={
      '【学习】六级耳机求推荐，别太贵':[['路过四六级','83.5没改，北区教室靠窗位置偶尔杂音，开考前记得试。'],['西门口','收到，明天下午去二教试。谢谢。'],['旧耳机还在响','南门那家现在四十多，押学生证可以先试。']],
      '【宿舍】317今晚有热水吗':[['隔壁316','三楼已经热了，水压有点小。'],['317今天停水吗','我们这边也来了，先放掉前面的凉水。'],['宿管阿姨别锁门','洗衣机2号下面又湿了，我去楼下说一声。']],
      '【体育】东操场晚上绕哪里跑':[['夜跑第三圈','二教那边能绕，北侧黄带不要跨。'],['runrun','收到，今天就跑南半圈。'],['体育部小刘','路灯维修单已经报了，恢复后再在群里通知。']],
      '【广播】春季节目征稿，还是纸稿':[['广播站门口','节目单贴在玻璃门左边，别塞到值班室门缝。'],['fm_89','补充：周五17点截止，文件名写学院和姓名。'],['纸稿永不丢','老节目单还能查吗？想找去年四月那一期。']],
      '【灌水】二食堂一楼是不是又换窗口了':[['香菜不要放','东边最里面，今天中午排了很长。'],['糖醋不加糖','找到了，窗口牌确实还是旧的。']],
      '【二手】出22寸显示器，自取':[['二教搬砖','能现场接笔记本试吗？'],['do_not_sleep','可以，自带转接头。我只有VGA线。']],
      '【求助】南门文印店几点关门':[['ddl今晚','赶上了，九点四十还在装订。'],['校报排版人','老板赶校报时会晚一点，平时别卡点。'],['图书馆打印机','图书馆机器今晚缺A3纸，报名表A4没问题。']],
      '【二手】毕业出自行车':[['路过南门','车铃修一下也就十块，八十挺合适。'],['qiming_7','学妹看过了，晚上来取。']],
      '【学习】二教204谁落了一本高数':[['高数不要挂','蓝皮是同济版吗？我们班也有人丢。'],['坐最后一排','第六版，封底贴着旧书店标签。'],['一颗青提','不是我同学那本，麻烦楼主交值班室吧。']],
      '【学习】图书馆二楼占座还有救吗':[['早起失败','三楼东边八点半还有位置，桌子小一点。'],['木头','明天直接去三楼了，谢谢。'],['保温杯忘拿','二楼靠窗昨晚有人落了灰色杯子，已经放值班台。']],
      '【社团】春季招新摊位登记':[['街舞社搬音箱','收到，今晚把用电功率补上。'],['qiming_7','别只写“两个音箱”，型号也要填。']],
      '【失物】老体门口捡到一串钥匙':[['stage_prop','器材牌3I7是旧音箱箱子的，不是宿舍号。'],['qiming_7','难怪看着不像门牌，已经让失主一起领走了。']],
      '[旧帖] 别转我以前那帖了':[['路过教务处','旧缓存每周五同步，你删正文也不一定能删引用。'],['hanger','知道了。总之别再把后面的事算到我头上。']],
      '【失物】东操场捡到一把透明伞':[['体育部小刘','透明伞已被领走，蓝柄那把还在纸箱。'],['伞又没了','我明早去看，谢谢。'],['runrun','结帖前说一声，免得一直有人跑值班桌。']],
      '[学习互助] 奖学金名单补录了':[['公告栏旁边','今天下午看见学院又贴了一张更正说明。'],['raindrop','正式公示没问题，旧打印稿日期我会在校报更正栏说明。']],
      '[宿舍生活] 今晚别查寝，求一次':[['不想叠被子','电梯又坏了？那我不下楼看热闹了。'],['317今天停水吗','人已经出来了，别堵在一楼。']],
      '[树洞] 老体后面那棵树，三个人去过':[['stagehand','保安今天来问折枝的事，别再去了。'],['qiming_7','知道。以后不去了。']],
      '[社团天地] 进决赛了，老体今晚还练':[['北辰剧社','吊杆检查期间改排二教空教室，群里发房间号。'],['stage_prop','黑胶带在器材箱底下找到了。']]
    };
    const rows=additions[document.title]||[];
    const current=thread.querySelectorAll('.post').length;
    const target=document.title.includes('东边那棵树')||document.title.includes('昨晚东操场')?7:5;
    rows.slice(0,Math.max(0,target-current)).forEach((row,i)=>{
      const section=document.createElement('section');
      section.className='post ambient-post';
      section.innerHTML='<div class="post-user"><strong>'+row[0]+'</strong><div class="avatar"></div><div>旧站用户</div></div><div class="post-body"><div class="post-meta">缓存恢复层　原楼层号缺失</div><p>'+row[1]+'</p></div>';
      thread.appendChild(section);
    });
    if(!document.querySelector('.thread-status')){
      const status=document.createElement('div');
      status.className='thread-status';
      status.textContent='旧站页面标记 '+Math.max(8,thread.querySelectorAll('.post').length*3+2)+' 回复　当前缓存恢复 '+thread.querySelectorAll('.post').length+' 层';
      thread.insertAdjacentElement('beforebegin',status);
    }
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
  addForumRecovery();
  addRouteNotes();
})();
