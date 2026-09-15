(function(){
  'use strict';
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
    const date=document.getElementById('qDate');
    const area=document.getElementById('qArea');
    const box=document.getElementById('queryResults');
    const msg=document.getElementById('queryMessage');
    const count=document.getElementById('queryCount');
    const tableBody=document.getElementById('queryBody');
    const echo=document.getElementById('queryEcho');
    const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    form.addEventListener('submit',event=>{
      event.preventDefault();
      const d=(date.value||'').trim();
      const a=area.value||'';
      if(!d&&!a){box.hidden=true;msg.textContent='error: at least one field required.';return;}
      if(d&&!/^\d{4}-\d{2}-\d{2}$/.test(d)){box.hidden=true;msg.textContent='error: invalid date format. use YYYY-MM-DD.';return;}
      const rows=data.filter(item=>(!d||item.date===d)&&(!a||item.area===a));
      tableBody.innerHTML=rows.map(item=>'<tr><td>'+(item.href?'<a href="'+esc(item.href)+'">'+esc(item.id)+'</a>':esc(item.id))+'</td><td>'+esc(item.time)+'</td><td>'+esc(labels[item.area]||item.area)+'</td><td>'+esc(item.source)+'</td><td>'+esc(item.summary)+'</td></tr>').join('');
      box.hidden=false;
      count.textContent=String(rows.length);
      echo.textContent='> '+(d||'*')+' / '+(labels[a]||'*');
      msg.textContent=rows.length?'query complete.':'0 records.';
    });
    document.getElementById('queryReset')?.addEventListener('click',()=>{date.value='';area.value='';box.hidden=true;msg.textContent='ready.';});
  }

  const tabs=[...document.querySelectorAll('[data-oa-tab]')];
  if(!tabs.length)return;
  const sources=[...document.querySelectorAll('[data-oa-source]')];
  const selected=document.getElementById('selectedRecord');
  const strip=document.querySelector('.oa-tabs');
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const viewed=new Set();
  let current=0;
  let timer=null;

  const gate=document.getElementById('evidenceForm');
  const submit=document.getElementById('evidenceSubmit');
  const feedback=document.getElementById('evidenceFeedback');
  const reveal=document.getElementById('serverPathReveal');
  function updateViewed(){
    document.querySelectorAll('[data-source-seen]').forEach(badge=>{
      const seen=viewed.has(badge.dataset.sourceSeen);
      badge.classList.toggle('seen',seen);
      badge.textContent=(badge.dataset.sourceSeen==='paper'?'BA-P27':badge.dataset.sourceSeen==='device'?'CAM-E04':'DISP-3')+(seen?' 已核':' 未核');
    });
    if(submit)submit.disabled=viewed.size<3;
    if(feedback&&viewed.size<3)feedback.textContent='还需查看 '+(3-viewed.size)+' 份来源；记录正文不会自动合并。';
  }
  const emitEvidence=key=>window.dispatchEvent(new CustomEvent('xu-evidence',{detail:key}));
  const open=key=>{
    const button=tabs.find(tab=>tab.dataset.oaTab===key)||tabs[0];
    current=tabs.indexOf(button);
    tabs.forEach(tab=>{
      const active=tab===button;
      tab.classList.toggle('active',active);
      tab.setAttribute('aria-selected',String(active));
      tab.setAttribute('role','tab');
    });
    sources.forEach(source=>{
      const active=source.dataset.oaSource===button.dataset.oaTab;
      source.classList.toggle('active',active);
      source.hidden=!active;
    });
    if(strip)strip.style.setProperty('--oa-slide',String(current));
    if(selected)selected.textContent=button.dataset.recordId||'';
    viewed.add(button.dataset.oaTab);
    emitEvidence(button.dataset.oaTab);
    updateViewed();
    history.replaceState(null,'','#'+button.dataset.oaTab);
  };
  const start=()=>{
    if(reduced||tabs.length<2)return;
    if(timer)window.clearInterval(timer);
    timer=window.setInterval(()=>open(tabs[(current+1)%tabs.length].dataset.oaTab),5600);
  };
  tabs.forEach(tab=>tab.addEventListener('click',()=>{open(tab.dataset.oaTab);start();}));
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&timer){window.clearInterval(timer);timer=null;}
    else if(!document.hidden)start();
  });
  const hash=location.hash.replace('#','');
  open(hash&&tabs.some(tab=>tab.dataset.oaTab===hash)?hash:tabs[0].dataset.oaTab);
  start();

  let verified=false;
  try{verified=localStorage.getItem('xuYuanEvidenceGateV12')==='verified';}catch(_error){}
  function showVerified(){
    if(reveal)reveal.hidden=false;
    if(feedback){feedback.classList.add('success');feedback.textContent='校验通过：21:46受伤 → 值班人员送医 → 21:51学生进入 → 21:58巡查取消。';}
    if(submit){submit.disabled=false;submit.textContent='时间链已校验';}
    emitEvidence('verified');
  }
  if(verified)showVerified();
  if(gate)gate.addEventListener('submit',event=>{
    event.preventDefault();
    if(viewed.size<3){updateViewed();return;}
    const first=document.getElementById('evidenceFirst').value;
    const cause=document.getElementById('evidenceCause').value;
    const after=document.getElementById('evidenceAfter').value;
    if(first!=='injury')feedback.textContent='未通过：请回看 BA-P27 的 21:46，再与设备记录 21:51 比较。';
    else if(cause!=='injury')feedback.textContent='未通过：请回看 DISP-3 的“原因字段”，不要用论坛传言代替调度记录。';
    else if(after!=='student')feedback.textContent='未通过：请回看 CAM-E04 的 21:51 与 21:52 缓存引用。';
    else{
      try{localStorage.setItem('xuYuanEvidenceGateV12','verified');}catch(_error){}
      showVerified();
    }
  });
})();
