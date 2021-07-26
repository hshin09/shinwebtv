var head  = document.getElementsByTagName('head')[0];
var scr  = document.createElement('script');
scr.type = 'text/javascript';
scr.src = 'https://hshin09.github.io/shinwebtv/common.js';
head.appendChild(scr);

function firstSetting()
{
   touchscreen = 0;
   window.onkeydown = keychk;
}

function onup() {
	if(oi>-1) x[oi].style="background-color:#252525";
	if(ei>-1) x[ei].style="color:yellow";
	si--;
	if(si<0) si+=cnt;
	x[si].style="background-color:#234567";
	if(si==ei) x[si].style="background-color:#234567;color:yellow";
	oi=si;
	if(full) x[si].click();
}

function ondown() {
	if(oi>-1) x[oi].style="background-color:#252525";
	if(ei>-1) x[ei].style="color:yellow";
	si++;
	if(si>=cnt) si-=cnt;
	x[si].style="background-color:#234567";
	if(si==ei) x[si].style="background-color:#234567;color:yellow";
	oi=si;
	if(full) x[si].click();
}

function onleft() {
	if(si>-1 && si==ei) {
		if(full) {
			change();
			return;
		}
		onFullscreenOnOff();
	}
	else if(si>-1) x[si].click();
}

function onright() {
	if(full) {
	    onFullscreenOnOff();
	}
	else {
		change();
	}
}

function keychk(e) {
   if( e.which == 38) {
      onup();
   }
   else if( e.which == 40) {
      ondown();
   }
   else if( e.which == 37) {
      onleft();
   }
   else if( e.which == 39) {
      onright();
   }
   else if( e.which == 13 ) {
      onok();
   }
   else if( e.which == 49 ) { //1
      //isHotKey = 1;
      x[gi?0:1].click();
   }
   else if( e.which == 50 ) { //2
      x[di].click();
      //window.parentView.showMsg("launchApp:com.google.android.youtube.tv");
   } 
   else if( e.which == 51 ) { //3
      di = si;
      //window.parentView.showMsg("launchApp:com.android.chrome");
      //window.parentView.showMsg("launchApp:com.opera.browser.beta");
   }
   else if( e.which == 52 ) { //4
      //isHotKey = 1;
      x[gi?18:10].click();
   }
   else if( e.which == 53 ) { //5
      x[lastCh].click();
   }
   else if( e.which == 54 ) { //6
      if( gi == 0 ) {
         ist = ist?0:1;
         window.parentView.showMsg("msg:" + pathmyshtv[ist]);
      }
   }
   else if( e.which == 55 ) { //7
      if( gi == 0 ) {
         stv.pause();
         if(timer) {
            clearInterval(timer);
            timer=null;
         } 
         window.parentView.showMsg("trueView:loadMode = 0");
         //window.parentView.showMsg("trueView:full = 1; onFullscreenOnOff()");
         window.parentView.showMsg("showTrueView");
         window.parentView.showMsg("trueView:x[ei].click()");
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
   }
   else if( e.which == 56 ) { //8
      showTime();
   }
   else if( e.which == 57 ) { //9
      if( gi == 0 ) {
         clearAddress("79");
         x[ei].click();
      }
   }

   e.preventDefault();
}
