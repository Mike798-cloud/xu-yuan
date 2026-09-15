(function(){
 const buttons=[...document.querySelectorAll('[data-area]')],year=document.getElementById('workYear'),rows=[...document.querySelectorAll('[data-workarea]')],count=document.getElementById('workCount');
 let area=(buttons.find(b=>b.classList.contains('active'))||buttons[0])?.dataset.area||'all';
 function apply(){const y=year?.value||'all';let n=0;rows.forEach(r=>{const areaOk=area==='all'||r.dataset.workarea===area||r.dataset.workarea==='all';const yearOk=y==='all'||r.dataset.workyear===y;const show=areaOk&&yearOk;r.style.display=show?'table-row':'none';if(show)n++;});if(count)count.textContent=n+' 条';}
 buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');area=b.dataset.area;apply();}));
 if(year)year.addEventListener('change',apply);apply();
})();
