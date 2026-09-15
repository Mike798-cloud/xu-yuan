
document.addEventListener('click',function(e){
 const b=e.target.closest('[data-year]'); if(!b)return;
 document.querySelectorAll('[data-year]').forEach(x=>x.classList.remove('active')); b.classList.add('active');
 const y=b.dataset.year; document.querySelectorAll('.archive-item').forEach(x=>{x.style.display=(y==='all'||x.dataset.year===y)?'grid':'none'});
});
