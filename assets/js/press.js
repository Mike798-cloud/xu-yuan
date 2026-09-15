
document.addEventListener('change',function(e){if(e.target.id!=='pressYear')return;const y=e.target.value;document.querySelectorAll('[data-pyear]').forEach(r=>r.style.display=(y==='all'||r.dataset.pyear===y)?'table-row':'none')});
