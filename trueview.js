var cableMoviesMode = 0;
var showYouTvMode = 1;
var tv;
var web;
var ch_name;
var path;
var gi=0;
var si=4;
var oi=-1;
var ei=4;
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
var pressok = 0;
var ch_addr = [ [ 6,0 ], [ 5,0 ] ];
var addr = [
   [
	[ '33', 'TV 조선 뉴스' ],
	[ '02', '채널 A 뉴스' ],
	[ '01', 'JTBC 뉴스' ],
	[ '34', 'YTN 뉴스' ],
	[ '32', '연합 뉴스' ],
	[ '23', 'MBN 뉴스' ]
   ],
   [
	[ '08', 'EBS' ],
        [ '14', 'SBS TV' ],
        [ '07', 'MBC TV' ],
        [ '15', 'KBS1' ],
        [ '13', 'KBS2' ]
   ]
];

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
   if( !xDown || !yDown ) {
      return;
   }

   var touch = getTouches(evt)[0];
   var xUp = touch.clientX;
   var yUp = touch.clientY;
   var xDiff = xDown - xUp;
   var yDiff = yDown - yUp;

   if( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      if( xDiff > 0 ) { //left swipe
         change();
      }
      else { //right swipe
      }
   }
   else {
      if( yDiff > 0 ) { //up swipe
      }
      else { //down swipe
      }
   }
   xDown = null;
   yDown = null;
}

function setPath(p) {
	path = p;
}

function loadVideo(lm,url) {
   showVideoMessage();
   loadMode = lm;
   web.src = url;
   mustWait = 3;
   
   if(timer) {
      clearInterval(timer);
      timer=null;
   }
   //timer = setInterval( function() { OnOff(); }, 1100 );
   setTimeout( function(){document.getElementById('videoMessage').style.display = 'none';}, 5000 );
}

function movieclk( ch, p ) {
   tv.pause();
   tv.src = "";
   if(oi>-1) x[oi].style="background-color:#252525";
   if(ei>-1) x[ei].style="background-color:#252525";
   oi=si=ei=p.id;
   x[ei].style="background-color:#234567;color:yellow";

   if( tvaddr[ei].length > 10 ) {
      showVideoMessage();
      tv.src = tvaddr[ei];
      tv.play();
      if(showYouTvMode)
         tv.style.display = "block";
      if(timer) {
         clearInterval(timer);
         timer=null;
      }
      mustWait = 0;
      timer = setInterval( function() { OnOff(); }, 1100 );
      return;
   }
   var i = si-4;
   if(pressok == 1 && si>3 && si<6) {
      ch_addr[i][1]++;
      if( ch_addr[i][1] >= ch_addr[i][0] )
         ch_addr[i][1] = 0;

      x[si].innerHTML = addr[i][ch_addr[i][1]][1];
      pressok = 0;
   }
   if(si>3 && si<6)
       ch = addr[i][ch_addr[i][1]][0];
   
   var url = path + ch;
   if(showYouTvMode) {
      tv.style.display = "none";
      url = url + "&start=on";
   }
   loadVideo( 0, url );  
}

function getTvUrl()
{
   strResponse = web.contentDocument.getElementsByTagName('body')[0].getElementsByTagName('script')[2].outerHTML;
   var ssi = strResponse.indexOf("file: \"http");
   if( ssi<1 ) {
      strResponse = "79";
      window.trueView.showMsg( "webView:setHiddenViewTV('" + strResponse + "')" );
      return;
   }
   var eei=strResponse.indexOf(",",ssi);
   strResponse = strResponse.substring(ssi+7,eei-1);
   if( loadMode )
      window.trueView.showMsg( "webView:setHiddenViewTV('" + strResponse + "')" );
   else {
      tvaddr[ei] = tv.src = strResponse;
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
      tvaddr[ei] = ei;
      onok();
   }

   if( tv.currentTime > 0 )
   {
      document.getElementById('videoMessage').style.display = 'none';
      if(timer) {
         clearInterval(timer);
         timer=null;
      }
      if(showYouTvMode)
         tv.style.display = "block";
      web.src = '';
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
   ch_name.innerHTML = x[ei].innerHTML;
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

   ch_name.innerHTML = sctime + " - " + x[ei].innerHTML;
   document.getElementById('videoMessage').style.display = 'block';
   setTimeout( function(){document.getElementById('videoMessage').style.display = 'none';}, 3000 );
}

function onup() {
   if(cableMoviesMode && full && si == 0) {
      change();
      return;
   }
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
   if(cableMoviesMode && full && si == 3) {
      change();
      return;
   }
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
   cableMoviesMode = 0;
   window.trueView.showMsg("webView:if(touchscreen) oi=-1; isHotKey=1; x[ei].click()");
   window.trueView.showMsg("hideTrueView");
   tv.pause();
   web.src = '';
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
      if( loadMode == 0 ) {
         pressok = 1;
         onok();
      }
   }
   else if( e.which == 48 ) { //0

   }
   else if( e.which == 49 ) { //1
      x[0].click();
   }
   else if( e.which == 50 ) { //2
      x[13].click();
   }
   else if( e.which == 52 ) { //4
      x[15].click();
   }
   else if( e.which == 55 ) { //7
      if( loadMode == 1 )
         return;
      change();
   }
   else if( e.which == 56 ) { //8
      showTime();
   }
   else if( e.which == 57 ) { //9
/*
      showYouTvMode = !showYouTvMode;
      web.style.top = "4vh";
      if(!showYouTvMode)
         web.style.top = "100vh";
*/
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
}

function onFullscreenOnOff() {
   if( isTouchScreenMode ) {
      if( full == false )
      {
         document.getElementById('leftmenu').style.display = 'none';
         full=true;
      }
      else
      {
         document.getElementById('leftmenu').style.display = 'block';
         full=false;
      }
   }
   else {
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
   if(showYouTvMode) {
   	if(full)
   	   web.style.top = "0";
   	else
   	   web.style.top = "4vh";
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
   switch(e.target.error.code) {
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
   if(!document.getElementById(cssId)) {
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
      if(this.readyState!==4) return;
      if(this.status!==200) return;
      document.getElementById(id).innerHTML = this.responseText;
   };
   xhr.send();
}

function onFinish() {
   if(timer)
      clearInterval(timer);
   window.trueView.showMsg("hideTrueView");
   tv.pause();
   tv.setAttribute( "src",  "" );
   window.trueView.showMsg("webView:onFinish()");
}

function webtvmain() {
   window.trueView.showMsg("webView:getPath()");
   isChLoaded = 0;
   timer = setInterval( function() { OnOff(); }, 500 );
}

function init() {
   if( isTouchScreenMode ) {
      loadStyle('https://hshin09.github.io/shinwebtv/main2.css'); 
      addEventListener('touchstart', handleTouchStart, false);
      addEventListener('touchend', handleTouchEnd, false);
      window.onclick = onFullscreenOnOff;
   }
   else {
      loadStyle('https://hshin09.github.io/shinwebtv/youtvkor.css');
      window.onkeydown = keychk;
   }
   document.body.innerHTML = "";

   var meta=document.createElement('meta');
   meta.name='viewport';
   meta.setAttribute('content','width=device-width, height=device-height, initial-scale=1.0');
   document.getElementsByTagName('head')[0].appendChild(meta);
   
   var p, a;
   var pp = p = addTag('','div','leftmenu');
   if( isTouchScreenMode ) {
      p = addTag(pp,'div','end_change');
      a = addTag(p,'input','finish');
      a.setAttribute('type','button');
      a.setAttribute('value','종료');
      a.setAttribute('align','center');
      a.onclick = onFinish;

      a = addTag(p,'input','kor_thai');
      a.setAttribute('type','button');
      a.setAttribute('value','Return');
      a.setAttribute('align','center');
      a.onclick = change;
   }

   a = addTag(p,'div','menu0');
   loadMenu('menu0','https://hshin09.github.io/shinwebtv/youtvkor.html');

   p = addTag('','div','mydiv');
   a = addTag(p,'video','tv' );
   a.poster = "https://hshin09.github.io/shinwebtv/poster.png";

   a = addTag(p,'iframe','web');
   a.setAttribute('allowFullscreen','true');
   a.setAttribute('frameborder','0');
   a.setAttribute('border','0');
   
   a = addTag(p,'div','videoMessage');
   addTag(a,'p','ch_name');
   
   tv = document.getElementById('tv');
   web = document.getElementById('web');
   ch_name = document.getElementById('ch_name');
   web.style.top = "4vh";
   if(showYouTvMode)
      tv.style.display = "none";
   else
      web.style.top = "100vh";
}

init();
webtvmain();
