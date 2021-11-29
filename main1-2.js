var scr  = document.createElement('script');
scr.type = 'text/javascript';
scr.src = 'https://hshin09.github.io/shinwebtv/common.js';
document.querySelector('head').appendChild(scr);

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

function changeKorTv() {
   document.getElementById('menu0').id="menuy";
   document.getElementById('menux').id="menu0";
   document.getElementById('menuy').id="menux";

   document.getElementById('ml0').id="mly";
   document.getElementById('mlx').id="ml0";
   document.getElementById('mly').id="mlx";

   $("#menux").css('display', 'none');
   $("#menu0").css('display', 'block');

   asi[0] = si;
   aei[0] = ei;
   aoi[0] = oi;
   adi[0] = di;
   alc[0] = lastCh;

   asi[3] = asi[0];
   aei[3] = aei[0];
   aoi[3] = aoi[0];
   adi[3] = adi[0];
   alc[3] = alc[0];

   asi[0] = asi[2];
   aei[0] = aei[2];
   aoi[0] = aoi[2];
   adi[0] = adi[2];
   alc[0] = alc[2];

   asi[2] = asi[3];
   aei[2] = aei[3];
   aoi[2] = aoi[3];
   adi[2] = adi[3];
   alc[2] = alc[3];

   if(tvchak == 0) {
      tvchak = 1;
      if(timer) {
         clearInterval(timer);
         timer = null;
      }
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
      else {
         window.parentView.showMsg( "hiddenView:loadVideo('/TV%20%EC%A1%B0%EC%84%A0%20HD-187')" );
         window.parentView.showMsg( "hiddenView:getkakotvurl()" ); 
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
         web.src = "";
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
