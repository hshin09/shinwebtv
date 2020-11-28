//window.onkeydown = keychk;
var ppp = 'ppp';
var head  = document.getElementsByTagName('head')[0];
var scr  = document.createElement('script');
scr.type = 'text/javascript';
scr.src = 'https://hshin09.github.io/shinwebtv/common.js';
head.appendChild(scr);

scr.onload = function() {
   alert('ss');
   path = 'mypath';
   Init();
}

/*
$('document').ready(function() {
   alert('s');
   Init();
   alert('e');
   
   //touchscreen = 0;
});
*/
/*
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
	if(e.which == 38) {
		onup();
	}
	else if(e.which == 40) {
		ondown();
	}
	else if(e.which == 37) {
		onleft();
	}
	else if(e.which == 39) {
		onright();
	}
	else if(e.which == 13 ) {
      		onok();
	}
	else if(e.which == 49 ) {
	      if( gi == 0 ) {
                 stv.pause();
                 if(timer) {
                    clearInterval(timer);
                    timer=null;
                 } 
                 window.parentView.showMsg("trueView:loadMode = 0");
                 window.parentView.showMsg("trueView:callOk()");
                 window.parentView.showMsg("trueView:full = 1; onFullscreenOnOff()");
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
        else if(e.which == 50 || e.which == 55 ) {
               showTime();
        }
        else if(e.which == 53 ) {
               window.parentView.showMsg("launchApp:com.google.android.youtube.tv");
	} 
        else if(e.which == 54 ) {
               //window.parentView.showMsg("launchApp:com.android.chrome");
               window.parentView.showMsg("launchApp:com.opera.browser.beta");
	} 
        else if(e.which == 56 ) {
              if(myshtv == 1) {
                 $('#menu0').load("https://hshin09.github.io/shinwebtv/kor2.html");
                 myshtv = 0;
              }
              else {
	         $('#menu0').load("https://hshin09.github.io/shinwebtv/myshtv.html");
                 myshtv = 1;
              }
              if(gi == 0)
                 setTimeout(function(){ mlok(); }, 500);
	}
        else if(e.which == 57 ) {
	      $('#menu1').load("https://hshin09.github.io/shinwebtv/thai_old.html");
              if(gi==1)
                 setTimeout(function(){ mlok(); }, 500);
	}
	e.preventDefault();
}
*/
