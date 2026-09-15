(function(){
  const yearButtons=[...document.querySelectorAll('[data-year]')];
  const items=[...document.querySelectorAll('.archive-item')];
  const search=document.getElementById('archiveSearch');
  const stat=document.getElementById('archiveStat');
  let year=(yearButtons.find(button=>button.classList.contains('active'))||yearButtons[0])?.dataset.year||'all';
  function applyArchiveFilter(){
    const query=(search?.value||'').trim().toLowerCase();
    let count=0;
    items.forEach(item=>{
      const yearMatch=query?true:(year==='all'||item.dataset.year===year);
      const textMatch=!query||item.textContent.toLowerCase().includes(query);
      const visible=yearMatch&&textMatch;
      item.style.display=visible?'grid':'none';
      if(visible)count++;
    });
    if(stat)stat.textContent=(query?'搜索全部年份':(year==='all'?'全部年份':year))+' · '+count+' 条';
  }
  yearButtons.forEach(button=>button.addEventListener('click',()=>{
    yearButtons.forEach(item=>item.classList.remove('active'));
    button.classList.add('active');
    year=button.dataset.year;
    applyArchiveFilter();
  }));
  if(search)search.addEventListener('input',applyArchiveFilter);
  if(items.length)applyArchiveFilter();

  const thread=document.querySelector('.thread');
  if(!thread)return;
  thread.querySelectorAll('.ambient-post').forEach(post=>post.remove());

  const replies={
    '【学习】六级耳机求推荐，别太贵':[
      ['路过四六级','83.5没改。北区教室靠窗偶尔有杂音，开考前先试音。'],
      ['南门文具店','四十多那款就够，旋钮松了可以拿回来换。'],
      ['背单词睡着','别买我这种入耳式，监考老师不让用。'],
      ['西门口','收到，明天下午去二教试。谢谢各位。'],
      ['耳机坏四次','有人说频率换成86.0了，别白买。'],
      ['fm_89','没换，86.0是外语学院去年模拟考的临时频率。'],
      ['纸袋装耳机','电池也带新的，去年有人耳机没坏，是电池没电。'],
      ['二教最后一排','一百以内都差不多，别在考试当天第一次拆包装。']
    ],
    '【宿舍】317今晚有热水吗':[
      ['隔壁316','三楼已经热了，水压有点小。'],
      ['宿管阿姨别锁门','先放掉前面的凉水，四楼还在排空气。'],
      ['317今天停水吗','我们这边也来了，谢了。'],
      ['洗衣卡又丢了','一楼公告写的是21:30全部恢复。'],
      ['北门修水管','听说是有人在水房烧东西把管子烫坏了。'],
      ['维修值班小陈','不是。东侧阀门更换，别传了。'],
      ['晚归登记表','洗衣机2号下面又湿了，和热水不是一回事。'],
      ['泡面不要汤','现在水温正常，排队的人倒是比停水时还多。']
    ],
    '【体育】东操场晚上绕哪里跑':[
      ['夜跑第三圈','二教那边能绕，北侧黄带不要跨。'],
      ['runrun','收到，今天就跑南半圈。'],
      ['体育部小刘','北边一盏灯维修，围带里面不是跑道。'],
      ['没带校园卡','西门今晚开到十点吗？'],
      ['看台吹风','开。九点半以后器材房那侧门会锁。'],
      ['东区传说家','北侧不让跑是因为去年有人在那里摔断腿。'],
      ['校队替补','摔伤的是值班人员，不是学生夜跑，时间也不是今年。'],
      ['夜跑第三圈','刚跑完，南半圈照明正常，人不少。']
    ],
    '【广播】春季节目征稿，还是纸稿':[
      ['广播站门口','节目单贴在玻璃门左边，别塞值班室门缝。'],
      ['fm_89','周五17点截止，文件名写学院和姓名。'],
      ['纸稿永不丢','老节目单还能查吗？想找去年四月那一期。'],
      ['午睡被吵醒','能不能点歌？想给三号楼点一首。'],
      ['调音台灰太多','点歌和征稿分开，点歌箱在食堂门口。'],
      ['广播站门口','纸稿也收，电子稿优先，收到会回短信。'],
      ['磁带A面','听说上次停播是有人故意拔线，稿子别写这个。'],
      ['fm_89','设备跳闸，校报更正过。没什么“禁播名单”。']
    ],
    '【灌水】二食堂一楼是不是又换窗口了':[
      ['香菜不要放','东边最里面，今天中午排了很长。'],
      ['糖醋不加糖','找到了，窗口牌确实还是旧的。'],
      ['砂锅只加粉','原来的老板没换，只是搬到柱子后面。'],
      ['饭卡余额三块','价格涨了吗？昨天多收我一块。'],
      ['二食堂收银','加蛋是一块，基础价没涨。'],
      ['泡面不要汤','西边新开的拌饭别点，咸得能喝三瓶水。'],
      ['窗边四人桌','有人说旧窗口半夜还开，真的假的。'],
      ['保温桶','假的，后场十点断电，师傅九点就走了。']
    ],
    '【二手】出22寸显示器，自取':[
      ['二教搬砖','能现场接笔记本试吗？'],
      ['do_not_sleep','可以，自带转接头。我只有VGA线。'],
      ['像素点点点','坏点有几个？底座能升降吗？'],
      ['do_not_sleep','右下一个暗点，底座不能升降，照片晚点补。'],
      ['实验室守夜','一百二今天取，行吗？'],
      ['隔壁316','这型号网上说会自己黑屏，楼主修过没？'],
      ['do_not_sleep','没修过。黑屏那批是另一版电源板。'],
      ['实验室守夜','已私信，晚上七点南门见。']
    ],
    '【求助】南门文印店几点关门':[
      ['ddl今晚','九点半左右，装订多的话老板会晚一点。'],
      ['校报排版人','赶校报时开到十点，平时别卡点。'],
      ['图书馆打印机','图书馆今晚缺A3纸，报名表A4没问题。'],
      ['南门口保安','刚路过还亮着灯。'],
      ['ddl明早','有人说老板回老家了，今天不开。'],
      ['论文再改一版','假的，我八点四十刚取完。'],
      ['骑车别逆行','彩印机器预热慢，十页以上先打电话。'],
      ['ddl今晚','赶上了，九点四十还在装订，谢谢。']
    ],
    '【二手】毕业出自行车':[
      ['路过南门','车铃修一下也就十块，八十挺合适。'],
      ['qiming_7','学妹看过了，晚上来取。'],
      ['链条总掉','后轮是不是换过？照片两边颜色不一样。'],
      ['六月毕业','换过外胎，车圈没换。'],
      ['骑车别逆行','车锁一起给吗？'],
      ['六月毕业','锁和车筐都送，钥匙两把。'],
      ['南门修车摊','这车不是事故车，别听楼上吓人。'],
      ['qiming_7','已取，试骑没问题，楼主可以结帖。']
    ],
    '【学习】二教204谁落了一本高数':[
      ['高数不要挂','蓝皮是同济版吗？我们班也有人丢。'],
      ['坐最后一排','第六版，封底贴着旧书店标签。'],
      ['一颗青提','不是我同学那本，交值班室吧。'],
      ['公式看不懂','书里夹着补考通知吗？'],
      ['坐最后一排','只有两张草稿纸，没姓名。'],
      ['二教管理员','204今晚有课，我先放一楼值班台。'],
      ['hanger','有人说二教捡到的东西第二天会回原座位，别乱动。'],
      ['二教管理员','保洁每天清桌，真放回去只会进失物箱。']
    ],
    '【学习】图书馆二楼占座还有救吗':[
      ['早起失败','三楼东边八点半还有位置，桌子小一点。'],
      ['木头','明天直接去三楼了，谢谢。'],
      ['保温杯忘拿','二楼靠窗有灰色杯子，已放值班台。'],
      ['六级还没背','七点四十开门，别信六点排队的说法。'],
      ['窗边晒太阳','期末周有人把书放一夜，管理员会收。'],
      ['图书馆值班','闭馆后统一清桌，占座物品次日到服务台领取。'],
      ['地下室没信号','旧馆四楼没人，就是插座少。'],
      ['早起失败','今天八点十分到三楼，确实有座。']
    ],
    '【社团】春季招新摊位登记':[
      ['街舞社搬音箱','收到，今晚把用电功率补上。'],
      ['qiming_7','别只写“两个音箱”，型号也要填。'],
      ['北辰剧社','老体门口那块还能申请吗？'],
      ['社联值班','老体施工，只开放食堂广场和图书馆西侧。'],
      ['轮滑刹不住','听说东操场北边也能摆摊。'],
      ['体育部小刘','跑道区域不设摊位，别把群截图当通知。'],
      ['摄影协会小鱼','桌椅是统一领还是自己搬？'],
      ['qiming_7','统一领，一张桌两把椅，周四中午签字。']
    ],
    '【失物】老体门口捡到一串钥匙':[
      ['stage_prop','器材牌3I7是旧音箱箱子的，不是宿舍号。'],
      ['qiming_7','难怪不像门牌，已经让失主一起领走了。'],
      ['北辰剧社','黑色小钥匙可能是道具柜的。'],
      ['钥匙挂脖子上','照片里是不是还有一片柳叶形挂件？'],
      ['坐最后一排','那是锈掉的开瓶器，别又编树的事。'],
      ['stagehand','道具柜钥匙不在这串，我刚核过。'],
      ['旧体育馆门卫','钥匙先放门卫室，领取要说清数量。'],
      ['qiming_7','已领，失主能说出四把钥匙的用途。']
    ],
    '[旧帖] 别转我以前那帖了':[
      ['路过教务处','旧缓存每周五同步，删正文不一定能删引用。'],
      ['hanger','知道了。别再把后面的事算到我头上。'],
      ['泡面不要汤','你那帖不是说补考前去许愿了吗？大家才问。'],
      ['耳机坏三次','我记得是“说一句话”，没提折树枝。'],
      ['匿名用户17','原帖明明写了要折四根，一人一根。'],
      ['raindrop','我留的截图没有这句，像后来拼上去的。'],
      ['旧站管理员','楼层引用来自不同缓存批次，时间顺序可能错。'],
      ['lin11','2012年那次就是普通补考，别越说越玄。'],
      ['一颗青提','那为什么同一晚广播也停了？'],
      ['fm_89','广播停播在四月，补考帖是六月，不是同一天。']
    ],
    '【失物】东操场捡到一把透明伞':[
      ['体育部小刘','透明伞已被领走，蓝柄那把还在纸箱。'],
      ['伞又没了','我明早去看，谢谢。'],
      ['runrun','结帖前说一声，免得一直有人跑值班桌。'],
      ['雨一停就忘伞','伞骨上有没有红线？我的透明伞缠过。'],
      ['看台吹风','没有红线，手柄贴着白色圆点。'],
      ['东区传说家','那不是伞，是树下仪式留下的东西。'],
      ['体育部小刘','物主已经用购买小票和贴纸确认，别造谣。'],
      ['伞又没了','蓝柄是我的，明天带校园卡领取。']
    ],
    '[学习互助] 奖学金名单补录了':[
      ['公告栏旁边','今天下午又贴了一张更正说明。'],
      ['raindrop','正式公示没问题，旧打印稿日期会在校报更正。'],
      ['奖学金差一分','补录的是漏章还是漏人？'],
      ['学院办公室','漏盖公章，名单与网上公示一致。'],
      ['匿名用户09','听说有个人名字每年都会自己出现在末尾。'],
      ['校报排版人','你说的是扫描重影，同一页装订时叠印。'],
      ['hanger','2014那张更正页我见过，日期改了两次。'],
      ['raindrop','第一次把10月18日误排成17日，第二次只改版号。'],
      ['旧档案柜','纸质原件在行政楼，不要拿论坛压缩图辨名字。'],
      ['奖学金差一分','明白了，等学院正式通知。']
    ],
    '[宿舍生活] 今晚别查寝，求一次':[
      ['不想叠被子','电梯又坏了？那我不下楼看热闹了。'],
      ['317今天停水吗','人已经出来了，别堵在一楼。'],
      ['隔壁316','辅导员被困不是查寝，电梯门传感器坏了。'],
      ['晚归登记表','十九点四十多开始修，西楼梯可以走。'],
      ['匿名用户17','听说电梯里多了一个不存在的楼层按钮。'],
      ['维修值班小陈','控制板报错显示“E4”，不是四楼按钮。'],
      ['宿管阿姨别锁门','今晚不查寝，但晚归照常登记。'],
      ['泡面不要汤','所以标题愿望成真了？'],
      ['隔壁316','时间上是先取消，再发生故障，别硬凑。']
    ],
    '[树洞] 老体后面那棵树，三个人去过':[
      ['stagehand','保安今天问折枝的事，别再去了。'],
      ['qiming_7','知道。以后不去了。'],
      ['北辰剧社','昨晚排练结束有人从后门往东边走。'],
      ['stage_prop','我去器材库还胶带，没进围栏。'],
      ['匿名用户03','三个人各折一根，第四根会替你付代价。'],
      ['lin11','围栏里有四个断口不等于四个人，后勤写得很清楚。'],
      ['旧体育馆门卫','登记是三个人，姓名不公开，不要在论坛猜。'],
      ['qiming_7','我们只是说了几句话，没想到枝条已经断了。'],
      ['stagehand','别在这里说细节。老师让先等后勤结论。'],
      ['东区传说家','后来那个受伤的人就是第四个。'],
      ['旧体育馆门卫','受伤记录是两年后，别把年份混在一起。']
    ],
    '[社团天地] 进决赛了，老体今晚还练':[
      ['北辰剧社','吊杆检查期间改排二教空教室，群里发房间号。'],
      ['stage_prop','黑胶带在器材箱底下找到了。'],
      ['台词忘一半','今晚到底排不排？我从西区过去要半小时。'],
      ['北辰剧社','今晚排，14号停一次，不是今天停。'],
      ['旧体育馆门卫','后门屋檐漏雨，器材从正门搬。'],
      ['匿名用户03','吊杆自己下降是因为台上有人许愿。'],
      ['stagehand','限位开关老化，后勤已经贴维修单。'],
      ['qiming_7','决赛台词第三段改了，别背旧版。'],
      ['摄影协会小鱼','我可以来拍排练照吗？不发外网。'],
      ['北辰剧社','可以，别开闪光灯。'],
      ['stage_prop','搬灯的人六点四十正门集合。']
    ],
    '【体育】昨晚东操场怎么提前熄灯了':[
      ['runrun','大概九点五十灭的，北侧先黑，南边晚一点。'],
      ['体育部小刘','值班人员临时调离，巡查取消后关闭部分照明。'],
      ['看台吹风','我记得是十点整，没提前多少。'],
      ['东区传说家','因为有人在树下说了不该说的话。'],
      ['校队替补','别吓人，当晚保安摔伤送医，后勤有记录。'],
      ['一颗青提','帖子里说“昨晚”，发布日期是18日凌晨，所以要查17日。'],
      ['lin11','设备时钟当天校过，记录时间应该可信。'],
      ['泡面不要汤','那学生进绿带和保安摔伤哪个先？'],
      ['raindrop','纸面记录21:46，设备摘要21:51，不是同时。']
    ],
    '[校园广播] 别放那段广播':[
      ['fm_89','当日节目在12:01中断，恢复后改播纯音乐。'],
      ['磁带A面','我听到有人说“别来东操场”，不是音乐。'],
      ['广播站门口','那句来自热线试音，没进正式输出。'],
      ['调音台灰太多','播控日志是REQUEST_COMMIT后OUTPUT_LOST。'],
      ['匿名用户09','她许愿不让人来，所以整个广播站断电。'],
      ['电工班路过','东区配电支路短路，和电话内容没有因果关系。'],
      ['午睡被吵醒','我只听见半句，后面确实全是电流声。'],
      ['校报排版人','更正栏把停播时间改成12:01，不是12:11。'],
      ['fm_89','旧磁带没有保存热线声，别再找“完整版”了。']
    ],
    '[学习互助] 补考出了':[
      ['高数不要挂','教务处门口已经贴名单，周三上午考试。'],
      ['hanger','我过了。之前说的树下许愿就是玩笑，别再截图。'],
      ['耳机坏三次','你原帖说的是“说一句”，没写折枝。'],
      ['匿名用户17','我看过完整版，明明有四根枝条。'],
      ['旧站管理员','该说法首次出现于2014年的转帖，不在2012缓存。'],
      ['lin11','补考通过和许愿没关系，成绩复核本来就改过一次。'],
      ['一颗青提','那为什么你后来一直删帖？'],
      ['hanger','因为每年都有人拿真事故来问我，不是因为愿望。'],
      ['路过教务处','当年复核表有老师签字，流程正常。']
    ],
    '[树洞] 东边那棵树又围了？':[
      ['东区晨跑','早上六点围带还在，后勤的人正清落枝。'],
      ['匿名用户03','围四次就会有四个人替树还愿。'],
      ['lin11','今年是防止学生进绿带拍照，别拿次数编规则。'],
      ['raindrop','我找到2014年的标题了，但截图缺发帖日期。'],
      ['旧站管理员','可从旧帖存档按2014筛选，勿只凭转发图判断顺序。'],
      ['一颗青提','明白了，我去按年份找，不再转那张半截截图。'],
      ['泡面不要汤','所以今晚还跑不跑？'],
      ['体育部小刘','南半圈正常开放，北侧绿带不要进入。']
    ]
  };

  const targetThreePages=new Set([
    '[树洞] 东边那棵树又围了？','【体育】昨晚东操场怎么提前熄灯了','[旧帖] 别转我以前那帖了',
    '[树洞] 老体后面那棵树，三个人去过','[校园广播] 别放那段广播','[学习互助] 补考出了',
    '[学习互助] 奖学金名单补录了','[社团天地] 进决赛了，老体今晚还练'
  ]);
  const fallback=[
    ['路过留名','前排说得差不多，等楼主回来确认。'],
    ['旧站潜水员','这帖我以前看过，后几层好像没随缓存留下来。'],
    ['今天也迟到','先看通知，论坛转述经常少半句。'],
    ['匿名用户12','听说的版本不一样，暂时别当真。'],
    ['管理员','请勿发布未经核实的姓名、电话和宿舍号。']
  ];
  const title=document.title;
  const target=targetThreePages.has(title)?13:10;
  const rows=[...(replies[title]||[])];
  let existing=thread.querySelectorAll('.post').length;
  const lastFloor=Math.max(0,...[...thread.querySelectorAll('.post-meta')].map(meta=>{
    const match=meta.textContent.match(/(\d+)#/);
    return match?Number(match[1]):0;
  }));
  let cursor=0;
  while(existing+rows.length<target){
    rows.push(fallback[cursor%fallback.length]);
    cursor++;
  }
  rows.slice(0,Math.max(0,target-existing)).forEach((row,index)=>{
    const section=document.createElement('section');
    section.className='post ambient-post';
    const restoredFloor=lastFloor+index+1;
    section.innerHTML='<div class="post-user"><strong></strong><div class="avatar"></div><div>旧站注册用户</div></div><div class="post-body"><div class="post-meta">缓存恢复　'+restoredFloor+'#</div><p></p></div>';
    section.querySelector('strong').textContent=row[0];
    section.querySelector('p').textContent=row[1];
    thread.appendChild(section);
  });

  const fixedAvatars=new Map(Object.entries({
    'qiming_7':3,'hanger':2,'raindrop':13,'stage_prop':16,'stagehand':17,'lin11':10,
    '一颗青提':7,'泡面不要汤':1,'fm_89':12,'runrun':4,'体育部小刘':20,'北辰剧社':22,
    '旧站管理员':30,'匿名用户03':24,'匿名用户09':25,'匿名用户17':26,
    '坐最后一排':27,'维修值班小陈':28,'校报排版人':29
  }));
  const avatarMap=new Map();
  const usedAvatars=new Set();
  thread.querySelectorAll('.post-user strong').forEach(node=>{
    const name=node.textContent.trim();
    if(fixedAvatars.has(name)){
      avatarMap.set(name,fixedAvatars.get(name));
      usedAvatars.add(fixedAvatars.get(name));
    }
  });
  function avatarIndex(name){
    if(avatarMap.has(name))return avatarMap.get(name);
    let value=[...name].reduce((sum,char)=>sum+char.codePointAt(0),0)%32;
    while(usedAvatars.has(value))value=(value+1)%32;
    avatarMap.set(name,value);
    usedAvatars.add(value);
    return value;
  }
  thread.querySelectorAll('.post').forEach(post=>{
    const name=post.querySelector('.post-user strong')?.textContent.trim()||'anonymous';
    const avatar=post.querySelector('.avatar');
    if(!avatar)return;
    if(post.classList.contains('missing-floor')){
      avatar.classList.add('avatar-missing');
      return;
    }
    const value=avatarIndex(name);
    avatar.style.setProperty('--avatar-x',(value%8)*100/7+'%');
    avatar.style.setProperty('--avatar-y',Math.floor(value/8)*100/3+'%');
    avatar.setAttribute('aria-label',name+'的旧论坛头像');
  });

  const posts=[...thread.querySelectorAll('.post')];
  const pageSize=5;
  const pageCount=Math.ceil(posts.length/pageSize);
  let pager=document.querySelector('.pagination');
  if(!pager){
    pager=document.createElement('nav');
    pager.className='pagination';
    (document.querySelector('.thread-footnote')||thread).insertAdjacentElement('afterend',pager);
  }
  pager.setAttribute('aria-label','主题分页');
  const status=document.querySelector('.thread-status')||document.createElement('div');
  if(!status.parentNode){
    status.className='thread-status';
    thread.insertAdjacentElement('beforebegin',status);
  }
  function requestedPage(){
    const match=location.hash.match(/^#page-(\d+)$/);
    return Math.min(pageCount,Math.max(1,match?Number(match[1]):1));
  }
  function renderPage(scroll){
    const page=requestedPage();
    posts.forEach((post,index)=>{
      const hidden=index<(page-1)*pageSize||index>=page*pageSize;
      post.hidden=hidden;
      if(!hidden)post.style.setProperty('--post-delay',((index-(page-1)*pageSize)*45)+'ms');
    });
    pager.innerHTML='';
    const label=document.createElement('span');
    label.className='page-label';
    label.textContent='第 '+page+' / '+pageCount+' 页';
    pager.appendChild(label);
    for(let index=1;index<=pageCount;index++){
      const link=document.createElement('a');
      link.href='#page-'+index;
      link.textContent=String(index);
      if(index===page){link.className='active';link.setAttribute('aria-current','page');}
      pager.appendChild(link);
    }
    status.textContent='主题回复 '+posts.length+'　每页 '+pageSize+' 层　当前第 '+page+' 页 / 共 '+pageCount+' 页　（旧站缓存顺序）';
    if(scroll)document.querySelector('.bbs-crumb')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }
  window.addEventListener('hashchange',()=>renderPage(true));
  renderPage(false);
})();
