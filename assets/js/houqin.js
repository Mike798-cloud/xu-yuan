(function(){
  'use strict';
  const buttons=[...document.querySelectorAll('[data-area]')],year=document.getElementById('workYear'),rows=[...document.querySelectorAll('[data-workarea]')],count=document.getElementById('workCount');
  let area=(buttons.find(b=>b.classList.contains('active'))||buttons[0])?.dataset.area||'all';
  function apply(){
    const y=year?.value||'all';let n=0;
    rows.forEach(r=>{
      const areaOk=area==='all'||r.dataset.workarea===area||r.dataset.workarea==='all';
      const yearOk=y==='all'||r.dataset.workyear===y;
      const show=areaOk&&yearOk;r.style.display=show?'table-row':'none';if(show)n++;
    });
    if(count)count.textContent=n+' 条';
  }
  buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');area=b.dataset.area;apply();}));
  if(year)year.addEventListener('change',apply);
  if(rows.length)apply();

  const attachmentCheck=document.getElementById('attachmentCheck');
  if(attachmentCheck){
    const feedback=document.getElementById('attachmentFeedback');
    const result=document.getElementById('attachmentResult');
    const choices=[...attachmentCheck.querySelectorAll('[data-attachment]')];
    choices.forEach(choice=>choice.addEventListener('click',()=>{
      choices.forEach(item=>item.classList.remove('is-picked','is-wrong'));
      choice.classList.add('is-picked');
      if(choice.dataset.attachment==='people'){
        if(feedback)feedback.textContent='归档类型一致：C / 当班人员记录。';
        if(result)result.hidden=false;
      }else{
        choice.classList.add('is-wrong');
        if(feedback)feedback.textContent='该类型与2014年度绿化工单的附件顺序不一致。';
        if(result)result.hidden=true;
      }
    }));
  }
})();
