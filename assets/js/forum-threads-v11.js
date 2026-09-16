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
      const author=(item.lastElementChild?.textContent||'').trim().toLowerCase();
      const textMatch=!query||author.includes(query);
      const visible=yearMatch&&textMatch;
      item.style.display=visible?'grid':'none';
      if(visible)count++;
    });
    if(stat)stat.textContent=(query?'用户名搜索':(year==='all'?'全部年份':year))+' · '+count+' 条';
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
      ['维修值班小陈','哪有烧东西，就是换阀门。我裤腿都湿了还要来辟谣。'],
      ['晚归登记表','洗衣机2号下面又湿了，和热水不是一回事。'],
      ['泡面不要汤','现在水温正常，排队的人倒是比停水时还多。']
    ],
    '【体育】东操场晚上绕哪里跑':[
      ['夜跑第三圈','二教那边能绕，北侧黄带不要跨。'],
      ['runrun','收到，今天就跑南半圈。'],
      ['体育部小刘','北边一盏灯维修，围带里面不是跑道。'],
      ['没带校园卡','西门今晚开到十点吗？'],
      ['看台吹风','开。九点半以后器材房那侧门会锁。'],
      ['东区传说家','北边是不是以前有人摔过？我室友死活不让去。'],
      ['校队替补','你室友把哪年的事混一起了……反正别钻围带。'],
      ['夜跑第三圈','刚跑完，南半圈照明正常，人不少。']
    ],
    '【广播】春季节目征稿，还是纸稿':[
      ['广播站门口','节目单贴在玻璃门左边，别塞值班室门缝。'],
      ['fm_89','周五17点截止，文件名写学院和姓名。'],
      ['纸稿永不丢','老节目单还能查吗？想找去年四月那一期。'],
      ['午睡被吵醒','能不能点歌？想给三号楼点一首。'],
      ['调音台灰太多','点歌和征稿分开，点歌箱在食堂门口。'],
      ['广播站门口','纸稿也收，电子稿优先，收到会回短信。'],
      ['磁带A面','上回突然没声那段能写吗？我真听见有人讲话。'],
      ['fm_89','别写，跳闸就是跳闸。再问自己来擦调音台。']
    ],
    '【灌水】二食堂一楼是不是又换窗口了':[
      ['香菜不要放','东边最里面，今天中午排了很长。'],
      ['糖醋不加糖','找到了，窗口牌确实还是旧的。'],
      ['砂锅只加粉','原来的老板没换，只是搬到柱子后面。'],
      ['饭卡余额三块','价格涨了吗？昨天多收我一块。'],
      ['二食堂收银','加蛋是一块，基础价没涨。'],
      ['泡面不要汤','西边新开的拌饭别点，咸得能喝三瓶水。'],
      ['窗边四人桌','谁说旧窗口半夜还开啊，我昨晚路过灯是亮的'],
      ['保温桶','后场灯一直亮，师傅九点就走。别半夜趴玻璃。']
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
      ['南门修车摊','我换的胎，车没撞过。楼上少来砸生意。'],
      ['qiming_7','已取，试骑没问题，楼主可以结帖。']
    ],
    '【学习】二教204谁落了一本高数':[
      ['高数不要挂','蓝皮是同济版吗？我们班也有人丢。'],
      ['坐最后一排','第六版，封底贴着旧书店标签。'],
      ['一颗青提','不是我同学那本，交值班室吧。'],
      ['公式看不懂','书里夹着补考通知吗？'],
      ['坐最后一排','只有两张草稿纸，没姓名。'],
      ['二教管理员','204今晚有课，我先放一楼值班台。'],
      ['hanger','等等，讲台抽屉那本不是放一周了吗？怎么又成今天捡的'],
      ['二教管理员','每天都清。可能两本一样的，先送值班台吧。']
    ],
    '【学习】图书馆二楼占座还有救吗':[
      ['早起失败','三楼东边八点半还有位置，桌子小一点。'],
      ['木头','明天直接去三楼了，谢谢。'],
      ['保温杯忘拿','二楼靠窗有灰色杯子，已放值班台。'],
      ['六级还没背','七点四十开门，别信六点排队的说法。'],
      ['窗边晒太阳','期末周有人把书放一夜，管理员会收。'],
      ['图书馆值班','今晚还清桌。杯子充电宝自己带走，丢了别来哭。'],
      ['地下室没信号','旧馆四楼没人，就是插座少。'],
      ['早起失败','今天八点十分到三楼，确实有座。']
    ],
    '【社团】春季招新摊位登记':[
      ['街舞社搬音箱','收到，今晚把用电功率补上。'],
      ['qiming_7','别只写“两个音箱”，型号也要填。'],
      ['北辰剧社','老体门口那块还能申请吗？'],
      ['社联值班','老体施工，只开放食堂广场和图书馆西侧。'],
      ['轮滑刹不住','群里那张图把东操场也圈了，到底能不能摆'],
      ['体育部小刘','那张是去年的。跑道不摆，别搬过去又搬回来。'],
      ['摄影协会小鱼','桌椅是统一领还是自己搬？'],
      ['qiming_7','统一领，一张桌两把椅，周四中午签字。']
    ],
    '【失物】老体门口捡到一串钥匙':[
      ['stage_prop','器材牌3I7是旧音箱箱子的，不是宿舍号。'],
      ['qiming_7','难怪不像门牌，已经让失主一起领走了。'],
      ['北辰剧社','黑色小钥匙可能是道具柜的。'],
      ['钥匙挂脖子上','最边上那片是开瓶器吧？看着像叶子。'],
      ['坐最后一排','锈成那样谁还敢开瓶……失主快领。'],
      ['stagehand','道具柜钥匙不在这串，我刚核过。'],
      ['旧体育馆门卫','钥匙先放门卫室，领取要说清数量。'],
      ['qiming_7','已领，失主能说出四把钥匙的用途。']
    ],
    '[旧帖] 别转我以前那帖了':[
      ['泡面不要汤','不是，你自己当年发的啊……现在首页还飘着截图。'],
      ['hanger','截图上后半段不是我写的。别私信了。'],
      ['耳机坏三次','我只记得你说“去树底下讲一句”，没什么四根。'],
      ['匿名用户17','可我存的那张就是“折一根”。要不我发？'],
      ['hanger','别发。'],
      ['raindrop','我这份没那行，3楼后面直接跳到“请二食堂”。'],
      ['旧站潜水员','怪了，我记得你当时回过一句“三个人够了”。'],
      ['hanger','认错人了。'],
      ['nightboat','那年我还在站里。帖子跟广播也不是一天，别拼了。'],
      ['匿名用户17','4楼刚才还是2012，刷新怎么变2014了？']
    ],
    '【失物】东操场捡到一把透明伞':[
      ['体育部小刘','透明伞已被领走，蓝柄那把还在纸箱。'],
      ['伞又没了','我明早去看，谢谢。'],
      ['runrun','结帖前说一声，免得一直有人跑值班桌。'],
      ['雨一停就忘伞','伞骨上有没有红线？我的透明伞缠过。'],
      ['看台吹风','没有红线，手柄贴着白色圆点。'],
      ['看台吹风','白点贴纸那把我总觉得见过，上周也在同一个地方。'],
      ['体育部小刘','伞都长一样。有人拿小票来认过了。'],
      ['伞又没了','蓝柄是我的，明天带校园卡领取。']
    ],
    '[学习互助] 奖学金名单补录了':[
      ['奖学金差一分','补的是谁啊，我下午不在学校。'],
      ['公告栏旁边','名字打码了也别问，自己明天看。'],
      ['raindrop','我拍的是旧那张，新纸右下角有红章。'],
      ['校报排版人','页脚日期又没改，文印室祖传模板。'],
      ['hanger','不是没改。我中午看见是17，下午成18了。'],
      ['raindrop','你是不是看串了？我相机里下午那张还是17。'],
      ['奖学金差一分','等等，到底哪张是真的……'],
      ['一颗青提','别纠结页脚，名单一样就行。'],
      ['匿名用户09','最后一行的人名怎么比别的字浅一层。'],
      ['校报排版人','扫描重影吧。原件别在论坛放大看，越看越像字。']
    ],
    '[宿舍生活] 今晚别查寝，求一次':[
      ['不想叠被子','卧槽真不查了？'],
      ['317今天停水吗','群里说老师被卡电梯，已经出来了。别下楼围。'],
      ['隔壁316','门这周夹过两次，早该修。'],
      ['泡面不要汤','楼主你这嘴……明天替我许个不要早八。'],
      ['不想叠被子','我没折东西啊，就说了一句。'],
      ['晚归登记表','西楼梯能走，电梯口一股烧焦味。'],
      ['匿名用户17','刚才轿厢屏上是不是跳了个“4”？三号楼哪来四楼'],
      ['维修值班小陈','E4，报错。拍糊了看着像4。'],
      ['不想叠被子','删帖怎么没反应'],
      ['宿管阿姨别锁门','今晚晚归照登记。还有，别再去东边。']
    ],
    '[树洞] 老体后面那棵树，三个人去过':[
      ['stagehand','你们仨昨晚真去了？保安早上来问剧社。'],
      ['qiming_7','就站了一会。别把名字往这贴。'],
      ['北辰剧社','我收门的时候看见后门出去两个，另一个是谁？'],
      ['stage_prop','两个？我六点多就走了。'],
      ['raindrop','我照片里是三个影子。人看不清，时间22:07。'],
      ['lin11','这楼怎么都在数人，折了就认，别拿影子算。'],
      ['stagehand','今早地上四段新的，箱子里还沾着叶子。'],
      ['qiming_7','我们只拿了三段。'],
      ['匿名用户03','三个人，四个断口。那剩下那个谁拿的？'],
      ['qiming_7','别问了。'],
      ['北辰剧社','7楼不是说“本来就断着”吗，怎么没了？']
    ],
    '[社团天地] 进决赛了，老体今晚还练':[
      ['台词忘一半','所以今晚排不排，我从西区过去很远啊'],
      ['北辰剧社','排。14号停一次，今天照常。'],
      ['stage_prop','黑胶带找到了，在空箱最下面。谁放的……'],
      ['旧体育馆门卫','下雨走正门，后门屋檐漏。'],
      ['stagehand','刚才吊杆又往下滑了一截，电源明明断了。'],
      ['北辰剧社','先别站台中间，等老师来。'],
      ['qiming_7','第三段我改了，群文件那个才是新的。'],
      ['摄影协会小鱼','那我还来拍吗？'],
      ['stage_prop','来吧，别闪光。箱子里少了一卷红绳，有人拿了吗'],
      ['stagehand','没有红绳。你是不是又看见那截树皮了。'],
      ['stage_prop','我什么时候说过树皮？']
    ],
    '【体育】昨晚东操场怎么提前熄灯了':[
      ['看台吹风','北边先黑的，我还以为整片停电。'],
      ['runrun','我手机那会儿21:50多，没仔细看。'],
      ['体育部小刘','昨晚值班临时少了人，北侧就没再开。'],
      ['泡面不要汤','“昨晚”是17号吧？你这帖都过零点了。'],
      ['runrun','对，17号。刚发现日期跳了。'],
      ['校队替补','保安大叔是不是摔了？我看见救护车从北门走。'],
      ['lin11','我九点五十以后才到，围带里已经有人了。'],
      ['看台吹风','不对，我离开时跑道还亮着，树那边有人敲栏杆。'],
      ['匿名用户03','敲了三下，灯才灭。'],
      ['runrun','我只听见两下。算了，这帖别顶了。']
    ],
    '[校园广播] 别放那段广播':[
      ['磁带A面','我在二食堂听见半句，像“别来……” 后面全是刺啦声。'],
      ['fm_89','热线试音串进去了两秒。别传什么完整版，没有。'],
      ['午睡被吵醒','我怎么听着像“别让她来东边”。'],
      ['广播站门口','你们食堂那只喇叭本来就糊。'],
      ['调音台灰太多','12:01跳闸，回来后只放了歌。今天先这样。'],
      ['nightboat','旧采访里没有这句。我剪过母带。'],
      ['磁带A面','可开头那个呼吸声跟采访里一模一样。'],
      ['fm_89','别在楼里放那段了。'],
      ['午睡被吵醒','刚才谁把我那层删了？'],
      ['匿名用户09','你没有发过。']
    ],
    '[学习互助] 补考出了':[
      ['高数不要挂','周三上午？我准考证写周四，谁拍下公告。'],
      ['hanger','我过了！！二食堂二楼，晚上见，先到先吃哈哈哈'],
      ['耳机坏三次','树还真这么灵？那我也去说一句。'],
      ['hanger','别折啊，就站下面说。我随口讲的。'],
      ['nightboat','你昨晚不是跟三个人去的吗，怎么又成自己了'],
      ['hanger','？？我一个人。你认错了吧'],
      ['路过教务处','成绩刚又刷回“待复核”了，hanger你再看下。'],
      ['hanger','还是及格。'],
      ['匿名用户17','4楼原来写的不是“别折”，我截过。'],
      ['hanger','哪来的4楼，我这里直接到6楼。']
    ],
    '[树洞] 东边那棵树又围了？':[
      ['东区晨跑','六点多还围着，后勤在扫枝条。'],
      ['泡面不要汤','今年柳絮提前了吧，我一路吃毛。'],
      ['raindrop','这张图我见过，好像是14年社团节那阵。'],
      ['一颗青提','14年？转我的人说是昨晚。'],
      ['lin11','看树后面的老体横幅，早拆了。你被旧图骗了。'],
      ['匿名用户03','图是旧的，围带不是。每次都少一截。'],
      ['一颗青提','我翻到那个帖子了，楼里写三个人。怎么照片上有四个影子'],
      ['raindrop','那张不是我拍的。我的原图只有三个。'],
      ['体育部小刘','南半圈照常。北边别钻围带，昨晚又有人进去。'],
      ['一颗青提','谁？'],
      ['体育部小刘','这楼先锁了。']
    ]
  };

  const targetThreePages=new Set([
    '[树洞] 东边那棵树又围了？','【体育】昨晚东操场怎么提前熄灯了','[旧帖] 别转我以前那帖了',
    '[树洞] 老体后面那棵树，三个人去过','[校园广播] 别放那段广播','[学习互助] 补考出了',
    '[学习互助] 奖学金名单补录了','[社团天地] 进决赛了，老体今晚还练'
  ]);
  const fallback=[
    ['路过留名','蹲个后续。'],
    ['旧站潜水员','我怎么记得这楼以前更长？'],
    ['今天也迟到','楼主还在吗'],
    ['匿名用户12','我听的不是这个版本……算了。'],
    ['隔壁路过','先别沉，等当事人回。']
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
