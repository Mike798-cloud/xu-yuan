(function(){
 const y=document.getElementById('pressYear'),t=document.getElementById('pressType'),rows=[...document.querySelectorAll('[data-pyear]')],stat=document.getElementById('pressStat');
 if(!rows.length)return;
 const params=new URLSearchParams(location.search);const py=params.get('year'),pt=params.get('type');
 if(y&&py&&[...y.options].some(o=>(o.value||o.textContent)===py)){[...y.options].forEach(o=>o.selected=(o.value||o.textContent)===py);}
 if(t&&pt&&[...t.options].some(o=>o.value===pt))t.value=pt;
 function apply(){const yy=y?(y.value||y.options[y.selectedIndex]?.textContent):'all',tt=t?t.value:'all';let n=0;rows.forEach(r=>{const ok=(yy==='all'||r.dataset.pyear===yy)&&(tt==='all'||r.dataset.ptype===tt);r.style.display=ok?'table-row':'none';if(ok)n++;});if(stat)stat.textContent='显示 '+n+' / '+rows.length+' 条';}
 if(y)y.addEventListener('change',apply);if(t)t.addEventListener('change',apply);apply();
})();
