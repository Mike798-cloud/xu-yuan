(function(){
 const y=document.getElementById('pressYear'),t=document.getElementById('pressType'),rows=[...document.querySelectorAll('[data-pyear]')],stat=document.getElementById('pressStat');
 const article=document.querySelector('.press-article');
 const shortNews={
  'press-tree-care':[['校内短讯','北门自行车停放线本周重新补画。'],['失物栏','二教值班台收到一只灰色保温杯。'],['社团栏','春季招新摊位用电表周四截止补交。']],
  'press-radio-schedule':[['值班记录','午间节目结束后，播控室照常交接。'],['点歌箱','食堂门口点歌箱每周五下午清取。'],['设备栏','东区喇叭音量将在考试周前统一检查。']],
  'press-profile-club':[['社团栏','老体排练场雨天改由正门进出。'],['器材栏','舞台组清点黑胶带、延长线与话筒架。'],['通知栏','决赛节目单以周四群文件版本为准。']],
  'press-scholarship':[['教务栏','补录名单以行政楼公示原件为准。'],['读者来信','勘误请注明期号、版面与原文位置。'],['文印室','扫描件页脚沿用原稿日期，不另行改写。']],
  'press-graduation':[['毕业季','各院领取时间以辅导员通知为准。'],['摄影栏','集体照原片不在公开网页下载。'],['失物栏','学位服配件请交回学院登记点。']],
  'press-welcome':[['社团栏','摊位桌椅统一在食堂广场领取。'],['用电栏','音箱功率未填写的申请暂不盖章。'],['天气栏','周五有雨，露天活动自备防水布。']],
  'press-sports-special':[['田径场','检录提前二十分钟，号码布别在场内补。'],['志愿者','饮水点设在看台南北两侧。'],['摄影栏','终点区域禁止使用闪光灯。']],
  'press-library':[['闭馆提示','二层东窗灯提前熄灭一排用于提醒。'],['失物栏','当日校园卡与钥匙统一交值班台。'],['打印区','A3纸缺货，补货时间另行通知。']],
  'press-corrections':[['编辑部','更正以纸质原刊版次为准。'],['资料室','缺页扫描件暂不补写原文。'],['读者来信','请留下可联系的校园短号。']]
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
 if(!rows.length)return;
 const params=new URLSearchParams(location.search);const py=params.get('year'),pt=params.get('type');
 if(y&&py&&[...y.options].some(o=>(o.value||o.textContent)===py)){[...y.options].forEach(o=>o.selected=(o.value||o.textContent)===py);}
 if(t&&pt&&[...t.options].some(o=>o.value===pt))t.value=pt;
 function apply(){const yy=y?(y.value||y.options[y.selectedIndex]?.textContent):'all',tt=t?t.value:'all';let n=0;rows.forEach(r=>{const ok=(yy==='all'||r.dataset.pyear===yy)&&(tt==='all'||r.dataset.ptype===tt);r.style.display=ok?'table-row':'none';if(ok)n++;});if(stat)stat.textContent='显示 '+n+' / '+rows.length+' 条';}
 if(y)y.addEventListener('change',apply);if(t)t.addEventListener('change',apply);apply();
})();
