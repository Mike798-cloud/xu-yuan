(function(){
 const data=[
  {date:'2013-05-14',area:'oldgym',id:'WO-2013-0514-08',time:'2013-05-14',source:'场地',summary:'旧体育馆舞台吊杆复检'},
  {date:'2014-10-18',area:'admin',id:'DOC-2014-1018-09',time:'2014-10-18',source:'文档',summary:'打印队列缺项 / 留存件'},
  {date:'2016-03-24',area:'dorm3',id:'DORM3-ELEV-1943',time:'2016-03-24 19:43',source:'设备',summary:'电梯门传感器故障'},
  {date:'2016-04-11',area:'radio',id:'PWR-RADIO-B-120114',time:'2016-04-11 12:01:14',source:'配电',summary:'BREAKER_TRIP'},
  {date:'2016-04-11',area:'radio',id:'RADIO-CTRL-120118',time:'2016-04-11 12:01:18',source:'播控',summary:'REQUEST_COMMIT / OUTPUT_LOST'},
  {date:'2016-11-17',area:'eastfield',id:'BA-2016-1117-P27',time:'2016-11-17 21:46',source:'保卫处纸质摘要',summary:'人员受伤 / 电话报告',href:'eastfield-2016.html#paper'},
  {date:'2016-11-17',area:'eastfield',id:'CAM-E04-2151',time:'2016-11-17 21:51:08',source:'设备维护摘要',summary:'ENTRY_FROM_BLDG2',href:'eastfield-2016.html#device'},
  {date:'2016-11-17',area:'eastfield',id:'DISP-EAST-2158',time:'2016-11-17 21:58:03',source:'巡查调度',summary:'ROUTE_EAST_CANCEL',href:'eastfield-2016.html#dispatch'},
  {date:'2016-11-17',area:'oldgym',id:'GYM-LAMP-1702',time:'2016-11-17 17:02',source:'照明',summary:'西门灯管更换'},
  {date:'2016-11-17',area:'dorm3',id:'DORM3-HOT-2204',time:'2016-11-17 22:04',source:'热水',summary:'供水压力恢复'}
 ];
 const labels={oldgym:'旧体育馆',dorm3:'3号宿舍楼',radio:'广播站 / 东区配电',eastfield:'东操场',admin:'行政楼'};
 const form=document.getElementById('archiveQuery');
 if(form){
  const date=document.getElementById('qDate'),area=document.getElementById('qArea'),box=document.getElementById('queryResults'),msg=document.getElementById('queryMessage'),count=document.getElementById('queryCount'),body=document.getElementById('queryBody'),echo=document.getElementById('queryEcho');
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function run(e){if(e)e.preventDefault();const d=(date.value||'').trim(),a=area.value||'';if(!d&&!a){box.hidden=true;msg.textContent='error: at least one field required.';return;}if(d&&!/^\d{4}-\d{2}-\d{2}$/.test(d)){box.hidden=true;msg.textContent='error: invalid date format. use YYYY-MM-DD.';return;}const rows=data.filter(x=>(!d||x.date===d)&&(!a||x.area===a));body.innerHTML=rows.map(x=>`<tr><td>${x.href?`<a href="${esc(x.href)}">${esc(x.id)}</a>`:esc(x.id)}</td><td>${esc(x.time)}</td><td>${esc(labels[x.area]||x.area)}</td><td>${esc(x.source)}</td><td>${esc(x.summary)}</td></tr>`).join('');box.hidden=false;count.textContent=String(rows.length);echo.textContent='> '+(d||'*')+' / '+(labels[a]||'*');msg.textContent=rows.length?'query complete.':'0 records.';try{sessionStorage.setItem('xyl_last_query',JSON.stringify({d,a}))}catch(_){}}
  form.addEventListener('submit',run);const reset=document.getElementById('queryReset');if(reset)reset.addEventListener('click',()=>{date.value='';area.value='';box.hidden=true;msg.textContent='ready.';});
 }
 const countEl=document.getElementById('archiveRecordCount');if(countEl){let shifted=false;try{shifted=localStorage.getItem('xyl_archive_shift')==='1'}catch(_){ }countEl.textContent=shifted?'1843':'1842';if(shifted)countEl.closest('.node-status')?.classList.add('shifted');}
 const tabs=[...document.querySelectorAll('[data-oa-tab]')];
 if(tabs.length){
  const sources=[...document.querySelectorAll('[data-oa-source]')],flags=document.getElementById('recordFlags'),selected=document.getElementById('selectedRecord'),reveal=document.getElementById('serverPathReveal');let seen=new Set();
  try{JSON.parse(sessionStorage.getItem('xyl_seen_sources')||'[]').forEach(x=>seen.add(x));}catch(_){ }
  function sync(){const map={paper:'P',device:'C',dispatch:'D'};if(flags)flags.textContent=['paper','device','dispatch'].map(k=>seen.has(k)?map[k]:'-').join('');if(seen.size>=3){if(reveal)reveal.hidden=false;try{localStorage.setItem('xyl_archive_shift','1')}catch(_){}}}
  function open(key){const btn=tabs.find(b=>b.dataset.oaTab===key)||tabs[0];key=btn.dataset.oaTab;tabs.forEach(b=>b.classList.toggle('active',b===btn));sources.forEach(s=>s.classList.toggle('active',s.dataset.oaSource===key));seen.add(key);if(selected)selected.textContent=btn.dataset.recordId||'';try{sessionStorage.setItem('xyl_seen_sources',JSON.stringify([...seen]))}catch(_){ }sync();}
  tabs.forEach(btn=>btn.addEventListener('click',()=>open(btn.dataset.oaTab)));const hash=location.hash.replace('#','');if(hash&&tabs.some(b=>b.dataset.oaTab===hash))open(hash);else open(tabs.find(b=>b.classList.contains('active'))?.dataset.oaTab||'paper');
 }
})();