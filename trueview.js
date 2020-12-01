var tv;
var web;
var ch_name;
window.onkeydown = keychk;
var path = "http://youtv24.net/sites/mstvs/pages/pc/pc_view.php?ch=live";
var gi=0;
var si=10;
var oi=10;
var ei=10;
var full = false;
var timer = null;
var mustWait = 0;
var isFirst = 1;
var isChLoaded = 1;
var loadMode = 0;
var x;
var cnt;
var strResponse = "79";
var tvaddr = new Array(24);

function loadVideo(lm,url) {
   showVideoMessage();
   loadMode = lm;
   web.src = url;
   mustWait = 3;
   
   if(timer) {
      clearInterval(timer);
      timer=null;
   }
   timer = setInterval( function() { OnOff(); }, 1100 );
}

function movieclk( ch, p ) {
   tv.pause();
   if(oi>-1) x[oi].style="background-color:#252525";
   if(ei>-1) x[ei].style="background-color:#252525";
   oi=si=ei=p.id;
   x[ei].style="background-color:#234567;color:yellow";

   if( tvaddr[si].length > 10 ) {
      showVideoMessage();
      tv.src = tvaddr[si];
      tv.play();
      tv.style.display = "block";
      if(timer) {
         clearInterval(timer);
         timer=null;
      }
      mustWait = 0;
      timer = setInterval( function() { OnOff(); }, 1100 );
      return;
   }
   tv.style.display = "none";
   var url = path + ch + "&start=on";
   loadVideo( 0, url );  
}

function getTvUrl()
{
   strResponse = web.contentDocument.getElementsByTagName('body')[0].getElementsByTagName('script')[2].innerHTML;
   var ssi = strResponse.indexOf("file: \"http");
   if(ssi<1) {
      strResponse = "79";
      window.trueView.showMsg( "webView:setHiddenViewTV('" + strResponse + "')" );
      return;
   }
   var eei=strResponse.indexOf(",",ssi);
   strResponse = strResponse.substring(ssi+7,eei-1);
   if( loadMode )
      window.trueView.showMsg( "webView:setHiddenViewTV('" + strResponse + "')" );
   else {
      tvaddr[si] = tv.src = strResponse;
      tv.play();
   }
}

function OnOff()
{
   if( !isChLoaded )
   {
      x=document.getElementById("ml"+gi).getElementsByTagName("li");
      if( x.length == 24 )
      {
         cnt=x.length;
         trans=x.length*screen.height*0.041;
         if(loadMode && timer) {
            clearInterval(timer);
            timer=null;
         }
         isChLoaded = 1;
         setTimeout( function(){mlok();},500 );
      }
      return;
   }

   ch_name.innerHTML = ch_name.innerHTML + ".";

   if( mustWait ) {
      mustWait--;
      if( mustWait == 0 ) {
         if( loadMode && timer ) {
            clearInterval(timer);
            timer=null;
         }
         getTvUrl();
      }
      return;
   }
   
   if( tv.error != null || tv.networkState == 3 )
   {
      if( timer ) {
         clearInterval(timer);
         timer=null;
      }
      tvaddr[si] = si;
      onok();
   }

   if( tv.currentTime > 0 )
   {
      if( tv.currentTime > 1 )
      {
         document.getElementById('videoMessage').style.display = 'none';
         if(timer) {
            clearInterval(timer);
            timer=null;
         }
         return;
      }
      web.src = '';
      tv.style.display = "block";
   }
}

function showVideoMessage()
{
   if(timer) {
     clearInterval(timer);
     timer=null;
   }  
   timer = setInterval( function() { OnOff(); }, 1100 );
   //closeErrorMessage();
   ch_name.innerHTML = x[si].innerHTML;
   document.getElementById('videoMessage').style.display = 'block';
}

function showTime()
{
   var dt = new Date();
   var sctime = "";

   if( dt.getHours() < 10 )
      sctime += "0";
   sctime += dt.getHours();
   sctime += ":";
   if( dt.getMinutes() < 10 )
      sctime += "0";
   sctime += dt.getMinutes();
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

function change() {
   tv.pause();
   web.src = '';
   window.trueView.showMsg("hideTrueView");
   window.trueView.showMsg("webView:gi=0; change()");
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
              if( loadMode == 0 )
      	         onok();
        }
	else if(e.which == 49 ) {
	      if( loadMode == 1 )
                 return;
              tv.pause();
              web.src = '';
              window.trueView.showMsg("hideTrueView");
              window.trueView.showMsg("webView:x[si].click()");
	}
        
	e.preventDefault();
}

function onok() {
   mustWait = 0;
   tvaddr[si] = si;
   x[si].click();
}

function mlok() {
   var i;
   for(i=0; i<cnt; i++) {
      tvaddr[i]=x[i].id=i;
   }

   if(ei>-1) {
      si=ei;
      ei=-1;
      if(isFirst == 0)
         onleft();
      isFirst = 0;
      ei=si;
   }
   else if(si<0)
      ondown();

   showLeftMenu();
}

function showLeftMenu() {
   /*
   var leftMenuObj = document.getElementById('menu'+gi);
   leftMenuObj.style['transform'] = "translate(0px, 0px)";
   leftMenuObj.style['msTransform'] = "translate(0px, 0px)";
   leftMenuObj.style['mozTransform'] = "translate(0px, 0px)";
   leftMenuObj.style['webkitTransform'] = "translate(0px, 0px)";
   leftMenuObj.style['oTransform'] = "translate(0px, 0px)";
   */
}

function onFullscreenOnOff() {
    if( full == false )
    {
        document.getElementById("mydiv").style.left="0";
        document.getElementById("mydiv").style.width="100%";
        full=true;
    }
    else
    {
	document.getElementById("mydiv").style.left="10%";
        document.getElementById("mydiv").style.width="90%";
        full=false;
    }
}

function showErrorMessage()
{
    document.getElementById("errorMessage").style.display = "block";
}

function closeErrorMessage()
{
    if(document.getElementById("errorMessage").style.display == "none")
        return;
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("er_msg").innerHTML="";
}

function videoErr(e)
{
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       document.getElementById("er_msg").innerHTML="비디오 취소됨";
       showErrorMessage();
       //alert('You aborted the video playback.');
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       document.getElementById("er_msg").innerHTML="비디오 다운로드 실패(네트워크문제)";
       showErrorMessage();
       //alert('A network error caused the video download to fail part-way.');
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       document.getElementById("er_msg").innerHTML="이형식의 비디오를 지원하지 않음";
       showErrorMessage();
       //alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       document.getElementById("er_msg").innerHTML="채널주소가 바뀌어 다른서버에서 새주소를 찾는 작업을 진행합니다.";
       //alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
       showErrorMessage();
       break;
     default:
       document.getElementById("er_msg").innerHTML="알려지지않은 문제로 비디오 로드 에러";
       showErrorMessage();
       //alert('An unknown error occurred.');
       break;
   }
}

function loadScript(url) {
   var head  = document.getElementsByTagName('head')[0];
   var scr  = document.createElement('script');
   scr.src = url;
   head.appendChild(scr);
}

function loadStyle(url) {
   var cssId = 'myCss';
   if (!document.getElementById(cssId)) {
      var head  = document.getElementsByTagName('head')[0];
      var link  = document.createElement('link');
      link.id   = cssId;
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = url;
      link.media = 'all';
      head.appendChild(link);
   }
}

function addTag(parent,tag,objId) {
   var iTag = document.createElement(tag);
   iTag.setAttribute('id', objId);
   if(parent == '')
      document.body.appendChild(iTag);
   else
      parent.appendChild(iTag);
   
   return iTag;
}

function loadMenu(id,url) {
   var xhr= new XMLHttpRequest();
   xhr.open('GET', url, true);
   xhr.onreadystatechange= function() {
      if (this.readyState!==4) return;
      if (this.status!==200) return;
      document.getElementById(id).innerHTML = this.responseText;
   };
   xhr.send();
}

function webtvmain() {
   isChLoaded = 0;
   timer = setInterval( function() { OnOff(); }, 500 );
}

function init() {
   var meta=document.createElement('meta');
   meta.name='viewport';
   meta.setAttribute('content','width=device-width, height=device-height, initial-scale=1.0');
   document.getElementsByTagName('head')[0].appendChild(meta);

   loadStyle('https://hshin09.github.io/shinwebtv/youtvkor.css');
   
   document.body.removeChild(document.getElementsByTagName('center')[0]);
   document.body.removeChild(document.getElementsByTagName('center')[0]);
   document.body.removeChild(document.getElementsByTagName('hr')[0]);

   var p = addTag('','div','leftmenu');
   var a = addTag(p,'div','menu0');
   loadMenu('menu0','https://hshin09.github.io/shinwebtv/youtvkor.html');

   p = addTag('','div','mydiv');
   a = addTag(p,'video','tv');
   //a.setAttribute('onerror','videoErr(event)');

   a = addTag(p,'iframe','web');
   a.setAttribute('allowFullscreen','true');
   a.setAttribute('frameborder','0');
   a.setAttribute('border','0');
   
   a = addTag(p,'div','videoMessage');
   addTag(a,'p','ch_name');
   
   tv = document.getElementById('tv');
   web = document.getElementById('web');
   ch_name = document.getElementById('ch_name');
   tv.style.display = "none";
}

init();
webtvmain();
