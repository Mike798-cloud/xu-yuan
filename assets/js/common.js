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

  /* V22 — voluntary 1 yuan support layer, adapted from the payment flow used
     in 《松涛粮站》.  Payment state is separate from game state and never gates
     content.  The automatic layer appears only once, after the first real
     public-record match page, and can always be dismissed. */
  const XuSupport={
    STORAGE_KEY:'_xuyuan_support',
    SESSION_KEY:'_xuyuan_support_session',
    COOKIE_KEY:'_xuyuan_support_flag',
    AUTO_SEEN_KEY:'_xuyuan_support_auto_seen',
    qrCode:'https://mike798-cloud.github.io/songtao-grainstation/paycode.png',
    _getCookie(name){
      try{
        const key=name+'=';
        for(const part of document.cookie.split(';')){
          const value=part.trim();
          if(value.indexOf(key)===0)return value.slice(key.length);
        }
      }catch(e){}
      return '';
    },
    _setCookie(name,value,days){
      try{
        const d=new Date();
        d.setTime(d.getTime()+days*86400000);
        document.cookie=name+'='+value+';expires='+d.toUTCString()+';path=/;SameSite=Lax';
      }catch(e){}
    },
    hasPaid(){
      try{return !!(localStorage.getItem(this.STORAGE_KEY)||sessionStorage.getItem(this.SESSION_KEY)||this._getCookie(this.COOKIE_KEY));}
      catch(e){return !!this._getCookie(this.COOKIE_KEY);}
    },
    hasAutoSeen(){
      try{return localStorage.getItem(this.AUTO_SEEN_KEY)==='1';}catch(e){return false;}
    },
    markAutoSeen(){try{localStorage.setItem(this.AUTO_SEEN_KEY,'1');}catch(e){}},
    markPaid(){
      const raw=Date.now()+'_'+Math.random().toString(36).slice(2,10)+'_abc_studio';
      let token=raw;
      try{token=btoa(unescape(encodeURIComponent(raw)));}catch(e){}
      try{localStorage.setItem(this.STORAGE_KEY,token);sessionStorage.setItem(this.SESSION_KEY,token);}catch(e){}
      this._setCookie(this.COOKIE_KEY,token,365);
      document.body.classList.add('support-complete');
    },
    ensureButton(){
      if(document.getElementById('xuyuanSupportButton'))return;
      const btn=document.createElement('button');
      btn.type='button';btn.id='xuyuanSupportButton';btn.className='xuyuan-support-chip';
      btn.setAttribute('aria-label','支持作者 1元');
      btn.innerHTML='<span>￥</span><b>支持作者</b>';
      btn.addEventListener('click',()=>this.show({manual:true}));
      document.body.appendChild(btn);
      if(this.hasPaid())document.body.classList.add('support-complete');
    },
    show(options={}){
      if(this.hasPaid()){
        if(options.manual)this.toast('已经收到你的支持了，谢谢你。继续安心玩就好。');
        return;
      }
      let overlay=document.getElementById('xuyuanSupportOverlay');
      if(!overlay){
        overlay=document.createElement('div');
        overlay.className='xuyuan-paywall-overlay';overlay.id='xuyuanSupportOverlay';
        overlay.innerHTML=`<section class="xuyuan-paywall-card" role="dialog" aria-modal="true" aria-labelledby="xuyuanPayTitle">
          <button type="button" class="xuyuan-paywall-close" aria-label="关闭">×</button>
          <div class="xuyuan-paywall-inner">
            <header class="xuyuan-paywall-head">
              <div class="xuyuan-paywall-eyebrow">abc studio / voluntary support</div>
              <h2 id="xuyuanPayTitle">如果你愿意，支持《许愿柳》1元</h2>
              <p>自愿支持，不影响完整游玩。</p>
            </header>
            <div class="xuyuan-paywall-body">
              <figure class="xuyuan-paywall-qr"><img src="${this.qrCode}" alt="1元支持收款码"><figcaption>扫码支持 1 元</figcaption></figure>
              <div class="xuyuan-paywall-copy">
                <p>你好，我是 abc。谢谢你愿意在这些旧帖子、工单和时间戳里慢慢查到这里。</p>
                <p>《许愿柳》前前后后改了很多次。比起把网站做得多像真的，我更在意你看到一条记录时，会不会愿意顺着它再查一页。</p>
                <p>如果这段调查让你觉得值得，愿意留下一块钱，我会很开心；不方便也没关系，关掉这里继续玩，后面的内容不会少。</p>
                <p class="xuyuan-paywall-line">这一块钱不会让柳树替你实现什么，不过我会记得有人认真走完了这段调查。</p>
              </div>
            </div>
            <footer class="xuyuan-paywall-foot">
              <button type="button" class="xuyuan-paywall-done">我支持了一下</button>
              <button type="button" class="xuyuan-paywall-later">先继续调查</button>
            </footer>
          </div>
        </section>`;
        document.body.appendChild(overlay);
        overlay.querySelector('.xuyuan-paywall-close').addEventListener('click',()=>this.hide());
        overlay.querySelector('.xuyuan-paywall-later').addEventListener('click',()=>this.hide());
        overlay.querySelector('.xuyuan-paywall-done').addEventListener('click',()=>{this.markPaid();this.hide();this.toast('收到啦，谢谢你。继续往下查吧，后面还有东西没对上。');});
        overlay.addEventListener('click',event=>{if(event.target===overlay)this.hide();});
      }
      overlay.hidden=false;
      requestAnimationFrame(()=>requestAnimationFrame(()=>overlay.classList.add('is-open')));
      overlay.querySelector('.xuyuan-paywall-close')?.focus({preventScroll:true});
    },
    hide(){
      const overlay=document.getElementById('xuyuanSupportOverlay');if(!overlay)return;
      overlay.classList.remove('is-open');
      setTimeout(()=>{overlay.hidden=true;},360);
    },
    toast(text){
      const old=document.querySelector('.xuyuan-support-toast');if(old)old.remove();
      const el=document.createElement('div');el.className='xuyuan-support-toast';el.textContent=text;document.body.appendChild(el);
      requestAnimationFrame(()=>el.classList.add('show'));
      setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),350);},3200);
    },
    init(){
      this.ensureButton();
      if(this.hasPaid()||this.hasAutoSeen())return;
      if(document.body.classList.contains('press-tree-care')){
        const fire=()=>{
          if(this.hasPaid()||this.hasAutoSeen())return;
          if(document.hidden){
            const onVisible=()=>{
              if(document.hidden)return;
              document.removeEventListener('visibilitychange',onVisible);
              fire();
            };
            document.addEventListener('visibilitychange',onVisible);
            return;
          }
          this.markAutoSeen();
          this.show({auto:true});
        };
        setTimeout(fire,4800);
      }
    }
  };
  window.XuSupport=XuSupport;
  document.addEventListener('keydown',event=>{if(event.key==='Escape')XuSupport.hide();});
  XuSupport.init();

})();
