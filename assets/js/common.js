
(function(){
  const key='xyl_visited_v4';
  try{
    const p=location.pathname.split('/').filter(Boolean).slice(-2).join('/');
    const seen=JSON.parse(localStorage.getItem(key)||'[]');
    if(!seen.includes(p)){seen.push(p);localStorage.setItem(key,JSON.stringify(seen.slice(-120)));}
  }catch(e){}
})();
