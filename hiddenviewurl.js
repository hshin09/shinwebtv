var timer = null;
var web = null;
var mustWait = 0;
var loginOK = 0;
var cmdurl = "";
var cnt = 1;
var ADsid = "shin";
var url = "https://www.adintrend.tv/hd/live/i.php?ch=3&cxid=" + ADsid;
var directLoadVideo = 1;

function prepare()
{
   //window.hiddenView.showMsg( "msg:" + location.href );   
   if( location.href == "https://kakotv.com/live/list.html" ) {
      //window.hiddenView.showMsg( "msg:1-" + location.href );
      callLogin('lee2', 'sh0903');
      //window.hiddenView.showMsg( "msg:1-" + location.href );
      setTimeout(function(){initkakotv();},2000);
      return;
   }
   if( location.href.indexOf("kakotv.com") > 0 ) {
      //window.hiddenView.showMsg( "msg:2-" + location.href );
      initkakotv();
      return;
   }
   //window.hiddenView.showMsg( "msg:" + location.href );
   addFrame("web");
   document.getElementById("web").src = url;
}

function getADsid() {
   window.location.replace("https://kakotv.com/live/list.html");
   window.hiddenView.showMsg( "webView:setADsid('" + ADsid + "')" );
   //window.hiddenView.showMsg( "msg:getADsid" );
}

function addFrame(objId)
{
   var iFrm = document.createElement('iframe');
   iFrm.setAttribute('id', objId);
   iFrm.setAttribute('width', '100%');
   iFrm.setAttribute('height', '100%');
   document.body.appendChild(iFrm);
}

function loadMenu(url) {
   var s = "";
   var xhr= new XMLHttpRequest();
   xhr.open('GET', url, true);
   xhr.onreadystatechange= function() {
      if(this.readyState!==4) return(s);
      if(this.status!==200) return(s);
      s=this.responseText;
      return(s);
   };
   xhr.send();
}

function directLoadVideo(url)
{
   var s = loadMenu(url);
   var i = s.indexOf('initPlayer');
   if( i < 0 ) {
      s = "";
      window.hiddenView.showMsg( "msg:주소얻기실패" );
      window.hiddenView.showMsg( "webView:setkakotv('" + s + "')" );
      return;
   }
   s = s.substr(i);
   i = s.indexOf("`");
   s = s.substr(i+1);
   var j= s.indexOf("`");
   s = s.substr(0,j);
   s = s.replace(/&amp;/g,"&");
   if( j-i < 10 ) {
      s = "";
      window.hiddenView.showMsg( "msg:주소얻기실패" );
   }
   window.hiddenView.showMsg( "msg:addr => " + s );
   window.hiddenView.showMsg( "webView:setkakotv('" + s + "')" );
}

function loadVideo(ser,url) 
{
   cmdurl = "https://kakotv.com/live" + url + ".html?ser=" + ser;
   if(directLoadVideo == 1) {
      directLoadVideo(cmdurl);
      return;
   }
   web.src = cmdurl;
   mustWait = 7;
   
   if(timer) {
      clearInterval(timer);
      timer=null;
   }
   timer = setInterval( function() { OnOff(); }, 1100 );
}

function OnOff()
{
   if( mustWait ) {
      mustWait--;
      if( mustWait == 0 ) {
         if( timer ) {
            clearInterval(timer);
            timer=null;
         }
         getkakotvurl();
      }
      return;
   }
}

function checklogout()
{
   //window.hiddenView.showMsg( "msg:" + web.contentWindow.location.href + " - " + cnt++ );
   if( web.contentWindow.location.href == "about:blank" ) {
      if( cnt++ > 3 )
         reloginkakotv();
      else
         setTimeout(function(){checklogout();},1000);
      return; 
   }
   if( web.contentWindow.location.href.indexOf("https://kakotv.com/live/list.html") >= 0 ) {
      web.contentWindow.location.href = "https://kakotv.com/member/logout";
      loginOK = 0;
      window.hiddenView.showMsg( "msg:로그아웃 합니다" );
      setTimeout(function(){checklogout();},2000);
      return; 
   }
   if( web.contentWindow.location.href == "https://kakotv.com/live/list.html" ) {
      loginOK = 1;
      web.contentWindow.callLogin('lee2', 'sh0903');
      window.hiddenView.showMsg( "msg:채널을 다시 로딩합니다" );
      window.hiddenView.showMsg( "webView:setTimeout(function(){x[ei].click();},2000)" );
   }
   else {
      setTimeout(function(){checklogout();},2000);
   }
}

function reloginkakotv()
{
   cnt = 1;
   web.src = "https://kakotv.com/live/list.html";
   setTimeout(function(){checklogout();},2000);
}

function initkakotv()
{
   if(web != null || loginOK == 1)
      return;
   document.body.innerHTML = "";
   addFrame("web");
   web = document.getElementById("web");
   web.src = "";
   loginOK = 1;
   window.hiddenView.showMsg( "msg:로그인 되었습니다" );
   window.hiddenView.showMsg( "webView:setTimeout(function(){loginProcess();},100)" );
}

function getkakotvurl()
{
   var f = web.contentDocument.getElementsByTagName('body')[0];
   var s = f.innerHTML;
   var i = s.indexOf('initPlayer');
   if( i < 0 ) {
      mustWait = 3;
      if(timer) {
         clearInterval(timer);
         timer=null;
      }
      timer = setInterval( function() { OnOff(); }, 1100 );
      return;
   }
   s = s.substr(i);
   i = s.indexOf("`");
   s = s.substr(i+1);
   var j= s.indexOf("`");
   s = s.substr(0,j);
   s = s.replace(/&amp;/g,"&");
   if( j-i < 10 ) {
      s = "";
      window.hiddenView.showMsg( "msg:주소얻기실패" );
   }
   web.src = "";
   //window.hiddenView.showMsg( "msg:addr =› " + s );
   window.hiddenView.showMsg( "webView:setkakotv('" + s + "')" );
}

prepare();
