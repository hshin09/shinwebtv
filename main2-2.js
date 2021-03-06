var head  = document.getElementsByTagName('head')[0];
var scr  = document.createElement('script');
scr.type = 'text/javascript';
scr.src = 'https://hshin09.github.io/shinwebtv/common.js';
head.appendChild(scr);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
   return evt.touches || evt.originalEvent.touches;
}                                                     

function handleTouchStart(evt) {
   var firstTouch = getTouches(evt)[0];                                      
   xDown = firstTouch.clientX;                                      
   yDown = firstTouch.clientY;                                      
} 

function handleTouchEnd(evt) {
   if ( !xDown || !yDown ) {
      return;
   }

   var touch = getTouches(evt)[0];
   var xUp = touch.clientX;
   var yUp = touch.clientY;
   var xDiff = xDown - xUp;
   var yDiff = yDown - yUp;

   if( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      if ( xDiff > 300 ) { //left swipe
         if( gi == 0 ) {
            stv.pause();
            if(timer) {
               clearInterval(timer);
               timer=null;
            } 
            window.parentView.showMsg("trueView:loadMode = 0");
            window.parentView.showMsg("showTrueView");
            window.parentView.showMsg("trueView:full=false; onFullscreenOnOff()");
            window.parentView.showMsg("trueView:ei=-1; x[si].click()");
         } else {
            if( svideo == 0 ) {
               svideo = 1;
               $('#menu1').load("https://hshin09.github.io/shinwebtv/svideo.html");
            } else {
               svideo = 0;
               $('#menu1').load("https://hshin09.github.io/shinwebtv/thai.html");
            }
            setTimeout(function(){ mlok(); }, 700);
         }
      } else { //right swipe
      
      }
   }
   else {
      if ( yDiff > 0 ) { //up swipe
      
      } else { //down swipe
      
      }
   }
   xDown = null;
   yDown = null;
}

function firstSetting()
{
   touchscreen = 1;
   addEventListener('touchstart', handleTouchStart, false);
   addEventListener('touchend', handleTouchEnd, false);
   $('#tv').on('dblclick',(function(){ onFullscreenOnOff(); }));
   $('#tv').on('click',(function(){ onFullscreenOnOff(); }));
}

function onFinish() {
   if(timer)
      clearInterval(timer);
   stv.pause();
   stv.setAttribute( "src",  "" );
   parentView.showMsg("finish");
}
