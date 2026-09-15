
(function(){
 const ta=document.getElementById('wishText'), n=document.getElementById('wishLen'), btn=document.getElementById('wishBtn'), num=document.getElementById('wishCount'), black=document.getElementById('blackout'), ending=document.getElementById('ending');
 let base=18341;
 if(ta){ta.addEventListener('input',()=>{if(ta.value.length>80)ta.value=ta.value.slice(0,80);n.textContent=ta.value.length+'/80'});}
 btn.addEventListener('click',()=>{
   if(!ta.value.trim()){ta.focus();return;}
   num.textContent=String(base+1);
   btn.disabled=true; ta.disabled=true;
   setTimeout(()=>{black.classList.add('show');setTimeout(()=>ending.classList.add('show'),650);},800);
 });
})();
