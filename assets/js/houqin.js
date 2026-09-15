
document.addEventListener('click',function(e){const b=e.target.closest('[data-area]');if(!b)return;document.querySelectorAll('[data-area]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const a=b.dataset.area;document.querySelectorAll('[data-workarea]').forEach(r=>r.style.display=(a==='all'||r.dataset.workarea===a)?'table-row':'none')});
