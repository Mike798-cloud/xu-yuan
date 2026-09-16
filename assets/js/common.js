(function(){
  'use strict';
  document.documentElement.classList.add('js');
  const body=document.body;
  if(!body)return;
  body.classList.add('xu-static-page');

  /* Every page is self-contained. No global progress stage is stored and no
     previously opened page changes because the player advanced elsewhere. */

  const locationCheck=document.getElementById('locationCheck');
  if(locationCheck){
    const feedback=document.getElementById('locationFeedback');
    const result=document.getElementById('locationResult');
    const buttons=[...locationCheck.querySelectorAll('[data-location]')];
    buttons.forEach(button=>button.addEventListener('click',()=>{
      buttons.forEach(item=>item.classList.remove('is-picked','is-wrong'));
      button.classList.add('is-picked');
      if(button.dataset.location==='gym-east'){
        if(feedback)feedback.textContent='地点描述、方位和树牌编号能够同时对上这一项。';
        if(result)result.hidden=false;
      }else{
        button.classList.add('is-wrong');
        if(feedback)feedback.textContent='这一项至少有一个字段和旧帖里的描述对不上。';
        if(result)result.hidden=true;
      }
    }));
  }
})();
