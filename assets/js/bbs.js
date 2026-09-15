(function(){
 const yearButtons=[...document.querySelectorAll('[data-year]')],items=[...document.querySelectorAll('.archive-item')];
 const search=document.getElementById('archiveSearch'),stat=document.getElementById('archiveStat');
 let year=(yearButtons.find(b=>b.classList.contains('active'))||yearButtons[0])?.dataset.year||'all';
 function apply(){const q=(search?.value||'').trim().toLowerCase();let n=0;items.forEach(x=>{const okYear=q?true:(year==='all'||x.dataset.year===year);const okText=!q||x.textContent.toLowerCase().includes(q);const ok=okYear&&okText;x.style.display=ok?'grid':'none';if(ok)n++;});if(stat)stat.textContent=(q?'搜索全部年份':(year==='all'?'全部年份':year))+' · '+n+' 条';}
 yearButtons.forEach(b=>b.addEventListener('click',()=>{yearButtons.forEach(x=>x.classList.remove('active'));b.classList.add('active');year=b.dataset.year;apply();}));
 if(search)search.addEventListener('input',apply);apply();
})();
