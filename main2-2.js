var head  = document.getElementsByTagName('head')[0];
var scr  = document.createElement('script');
scr.type = 'text/javascript';
scr.src = 'https://hshin09.github.io/shinwebtv/common.js';
head.appendChild(scr);

function firstSetting()
{
   touchscreen = 1;
   $('#tv').on('dblclick',(function(){ onFullscreenOnOff(); }));
   $('#tv').on('click',(function(){ onFullscreenOnOff(); }));
   addInput();
}

function onFinish() {
   if( gi == 1 && svideo == 0 && si == 10 ) {
      $('#pwd').css('display','block');
      return;
   }
   if(timer)
      clearInterval(timer);
   stv.pause();
   stv.setAttribute( "src",  "" );
   parentView.showMsg("finish");
}

function addInput()
{
   var input = document.createElement('input');
   input.type = "password";
   input.id = "pwd";
   input.value = "";
   input.style.position ="absolute";
   input.style.display = "none";
   input.style.top = "50px";
   input.style.left = "50px";
   document.body.appendChild( input );
   $("input").keydown( function(e) { 
      $('#pwd').css('display','none');
      if(e.which == 49 || e.keyCode == 49) {
         svideo = 1;
         $('#menu1').load('https://hshin09.github.io/shinwebtv/svideo.html');
         setTimeout(function(){ mlok(); }, 500);
      } 
      else {
         si=0; 
         onFinish();
      } 
   });
}
