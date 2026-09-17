(function(){
 const y=document.getElementById('pressYear'),t=document.getElementById('pressType'),rows=[...document.querySelectorAll('[data-pyear]')],stat=document.getElementById('pressStat');
 const article=document.querySelector('.press-article');

 const photoMap={
  'press-tree-care':['scene_press_tree.jpg','资料室同卷底片 / 东区绿化 / 编号未写'],
  'press-radio-schedule':['scene_press_radio.jpg','广播资料夹附图 / 东操场夜间 / 非节目截图'],
  'press-profile-club':['scene_press_club.jpg','社团资料夹附图 / 旧体育馆东侧'],
  'press-sports-special':['scene_press_sports.jpg','摄影部未编号底片 / 跑道东侧'],
  'press-corrections':['scene_press_corrections.jpg','资料室整理照 / 原稿与附件分开归档']
 };
 const photoKey=Object.keys(photoMap).find(key=>document.body.classList.contains(key));
 if(article&&photoKey&&!article.querySelector('.press-archive-photo')){
  const figure=document.createElement('figure');
  figure.className='press-archive-photo';
  figure.innerHTML='<img alt=""><figcaption></figcaption>';
  figure.querySelector('img').src='../assets/img/'+photoMap[photoKey][0];
  figure.querySelector('figcaption').textContent=photoMap[photoKey][1];
  const meta=article.querySelector('.press-meta');
  (meta||article.firstElementChild)?.insertAdjacentElement('afterend',figure);
 }
 const shortNews={
  'press-tree-care':[['资料室','2014年5月一卷东区底片登记3人，冲印样张却能辨出4个轮廓，原片暂不外借。'],['绿化栏','YL-E-017 的公开稿只写树木编号，不写学生之间流传的别名。'],['摄影栏','同卷底片位置统一写“旧体育馆东侧”，没有“东操场那棵树”的正式名称。']],
  'press-radio-schedule':[['值班记录','12:01中断后播控室照常交接，底稿没有任何临时口播。'],['听众来信','两封来信都说中断前听到一句话，但两人写下来的内容并不相同。'],['设备栏','配电告警时间为12:01:14，比节目单人工更正后的“12:01”更精确。']],
  'press-profile-club':[['人物栏','郑启明的旧论坛账号 qiming_7 已由本人签字确认。'],['旧体育馆','2013年排练场事故后，舞台组把“空场时吊杆下移”单独报了后勤。'],['资料栏','采访附件里夹着一张2014年社联值班表，夜间登记人数写的是3。']],
  'press-scholarship':[['教务栏','补录名单内容最终无误，但校报留存打印稿的生成时间早了4天。'],['文印室','同一份名单的两张照片页脚日期一致，最后一行墨色却明显更浅。'],['编辑部','编辑没有把“时间早了4天”写进正式更正，因为名单内容本身没有错。']],
  'press-graduation':[['摄影栏','毕业照按签到表核人数，不再让编辑凭照片数人。'],['资料室','这一规定是在2014年那卷“3人/4个轮廓”底片争议后加上的。'],['领取处','毕业照漏领可补，底片登记出现人数差异的不提供公开翻拍。']],
  'press-welcome':[['摊位图','2013年旧版摊位图曾在老体东侧画过一个空位，正式版里被手工划掉。'],['社联','没人记得那个空位原来准备给哪个社团，登记表上也没有对应编号。'],['场地栏','老体东侧当年不允许摆摊，所以那一格从一开始就不该出现在底图里。']],
  'press-sports-special':[['摄影栏','运动会备用计时器的“0.00”照片后来被当成怪谈转发，原稿已更正。'],['器材组','真正影响成绩的证据来自终点摄像和人工表，不是故障显示器。'],['更正栏','编辑部特意保留这条普通故障，用来提醒读者不要把所有异常都往同一件事上套。']],
  'press-library':[['借阅登记','2014年5月一卷校园摄影底片借出后按期归还，登记写“旧体育馆东侧 / 22:07”。'],['扫描室','这卷底片没有公开冲印版，只有登记表和一张低清样张。'],['值班台','借阅人签名是校报摄影部账号 raindrop 对应的学生本人。']],
  'press-corrections':[['编辑部','更正只改能核实的事实，不会因为旧帖争议重写原稿。'],['资料室','2012补考、2014奖助、2016广播三条记录都保留了原编号，方便和校内系统互核。'],['勘误栏','页脚日期、节目时间和楼层号如果有争议，一律保留原件并另写更正，不覆盖。']]
 };
 const bodyKey=Object.keys(shortNews).find(key=>document.body.classList.contains(key));
 const snippets=shortNews[bodyKey]||[['校内短讯','图书馆本周六照常开放。'],['失物栏','校园卡请交至就近值班台。'],['编辑部','来稿请在标题下方注明学院与姓名。']];
 if(article&&!document.body.classList.contains('press-index')&&!document.querySelector('.press-afterfold')){
  const section=document.createElement('section');
  section.className='press-afterfold';
  section.innerHTML='<h3>同版短讯</h3><div class="press-briefs"></div>';
  const briefs=section.querySelector('.press-briefs');
  snippets.forEach(([label,copy])=>{
   const item=document.createElement('p');
   item.innerHTML='<b></b><span></span>';
   item.querySelector('b').textContent=label;
   item.querySelector('span').textContent=copy;
   briefs.appendChild(item);
  });
  article.appendChild(section);
 }

 const match=document.getElementById('photoIndexCheck');
 if(match){
  const feedback=document.getElementById('pressMatchFeedback');
  const result=document.getElementById('pressMatchResult');
  const options=[...match.querySelectorAll('[data-press-match]')];
  options.forEach(option=>option.addEventListener('click',()=>{
   options.forEach(item=>item.classList.remove('is-picked','is-wrong'));
   option.classList.add('is-picked');
   if(option.dataset.pressMatch==='a'){
    if(feedback)feedback.textContent='登记卡字段一致：位置 / 时间 / 画面人数。';
    if(result)result.hidden=false;
   }else{
    option.classList.add('is-wrong');
    if(feedback)feedback.textContent='该卷至少有一项登记字段不一致。';
    if(result)result.hidden=true;
   }
  }));
 }
 if(!rows.length)return;
 const params=new URLSearchParams(location.search);const py=params.get('year'),pt=params.get('type');
 if(y&&py&&[...y.options].some(o=>(o.value||o.textContent)===py)){[...y.options].forEach(o=>o.selected=(o.value||o.textContent)===py);}
 if(t&&pt&&[...t.options].some(o=>o.value===pt))t.value=pt;
 function apply(){const yy=y?(y.value||y.options[y.selectedIndex]?.textContent):'all',tt=t?t.value:'all';let n=0;rows.forEach(r=>{const ok=(yy==='all'||r.dataset.pyear===yy)&&(tt==='all'||r.dataset.ptype===tt);r.style.display=ok?'table-row':'none';if(ok)n++;});if(stat)stat.textContent='显示 '+n+' / '+rows.length+' 条';}
 if(y)y.addEventListener('change',apply);if(t)t.addEventListener('change',apply);apply();
})();
