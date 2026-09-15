(function(){
  const form=document.getElementById('archiveQuery');
  if(form){
    const date=document.getElementById('qDate');
    const area=document.getElementById('qArea');
    const box=document.getElementById('queryResults');
    const msg=document.getElementById('queryMessage');
    const count=document.getElementById('queryCount');
    const rows=[...document.querySelectorAll('.query-row')];
    function runQuery(e){
      if(e)e.preventDefault();
      const d=(date.value||'').trim();
      const a=area.value||'';
      if(!d && !a){box.hidden=true;msg.textContent='至少填写日期或选择一个区域。旧节点不支持全文检索。';return;}
      let n=0;
      rows.forEach(r=>{
        const show=(!d||r.dataset.qdate===d)&&(!a||r.dataset.qarea===a);
        r.hidden=!show;if(show)n++;
      });
      box.hidden=false;count.textContent=String(n);
      msg.textContent=n?'查询完成。结果按原始归档日期排列。':'未检索到匹配记录。可减少一个筛选条件后重试。';
    }
    form.addEventListener('submit',runQuery);
    const reset=document.getElementById('queryReset');
    if(reset) reset.addEventListener('click',()=>{date.value='';area.value='';box.hidden=true;msg.textContent='可只填一项；精确日期与正式区域名能缩小结果。';});
  }
  const tabs=[...document.querySelectorAll('[data-oa-tab]')];
  if(tabs.length){
    const sources=[...document.querySelectorAll('[data-oa-source]')];
    tabs.forEach(btn=>btn.addEventListener('click',()=>{
      const key=btn.dataset.oaTab;
      tabs.forEach(b=>b.classList.toggle('active',b===btn));
      sources.forEach(s=>s.classList.toggle('active',s.dataset.oaSource===key));
    }));
  }
})();
