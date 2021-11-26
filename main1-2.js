var scr  = document.createElement('script');
scr.type = 'text/javascript';
scr.src = 'https://hshin09.github.io/shinwebtv/common.js';
document.querySelector('head').appendChild(scr);

function firstSetting()
{
   touchscreen = 0;
   window.onkeydown = keychk;
   $('#menux').load("https://hshin09.github.io/shinwebtv/tvchak.html");
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

function changeKorTv() {
   document.querySelector('ml0').id="mly";
   document.querySelector('mlx').id="ml0";
   document.querySelector('mly').id="mlx";
   $("#mlx").css('display', 'none');
   $("#ml0").css('display', 'block');

   asi[4] = asi[0];
   aei[4] = aei[0];
   aoi[4] = aoi[0];
   adi[4] = adi[0];
   alc[4] = alc[0];

   asi[0] = asi[3];
   aei[0] = aei[3];
   aoi[0] = aoi[3];
   adi[0] = adi[3];
   alc[0] = alc[3];

   asi[3] = asi[4];
   aei[3] = aei[4];
   aoi[3] = aoi[4];
   adi[3] = adi[4];
   alc[3] = alc[4];

   if(tvchak == 0) {
      tvchak = 1;
      $("#videoMessage").css('display', 'none');
      $("#secMessage").css('display', 'none');
      $("#errorMessage").css('display', 'none');
   }
   else {
      tvchak = 0;
      web.src = "";
   }

   si = asi[0]; 
   ei = aei[0];
   oi = aoi[0];
   di = adi[0];
   lastCh = alc[0];
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
   else if( e.which == 48 ) { //0
      if( gi == 0 ) {
         changeKorTv();
         setTimeout(function(){ mlok(); }, 500);
      }
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
         if(tvchak == 1)
            ei = 2;
         else
            clearAddress("79");
         x[ei].click();
      }
   }

   e.preventDefault();
}
