window.onkeydown = keychk;
var head  = document.getElementsByTagName('head')[0];
var scr  = document.createElement('script');
scr.type = 'text/javascript';
scr.src = 'https://hshin09.github.io/shinwebtv/common.js';
head.appendChild(scr);

function loadUrl(url) {
   var xhr= new XMLHttpRequest();
   xhr.open('GET', url, true);
   xhr.onreadystatechange = function() {
      if(this.readyState!==4) return;
      if(this.status!==200) return;
      if(this.responseText==null) return;
      alert(this.responseText);
      var str = this.responseText;
      var si = str.IndexOf('var urlFirst');
      alert(si);
      si = str.IndexOf('http', si);
      alert(si);
      var ei = str.IndexOf('/ytn_720/');
      alert(ei);
      str = str.substring(si,ei);
      alert(str);
   }; 
   xhr.send();
}
loadUrl('https://myshtv.com/live/YTN HD-190.html');

function firstSetting()
{
   touchscreen = 0;
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
   else if( e.which == 53 ) { //5
      window.parentView.showMsg("launchApp:com.google.android.youtube.tv");
   } 
   else if( e.which == 54 ) { //6
      //window.parentView.showMsg("launchApp:com.android.chrome");
      window.parentView.showMsg("launchApp:com.opera.browser.beta");
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
         window.parentView.showMsg("trueView:x[si].click()");
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

   e.preventDefault();
}
