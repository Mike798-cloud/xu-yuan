(function(){
  'use strict';
  document.documentElement.classList.add('js');
  const body=document.body;
  if(!body)return;

  /*
   * Final presentation rule:
   * every page is self-contained. No global progress stage is stored and no
   * previously opened page changes because the player has advanced elsewhere.
   */
  body.classList.add('xu-static-page');
})();
