var timer = null;
var web = null;
var mustWait = 0;
var cmdurl = "";
var cnt = 1;
var ADsid = "shin";
var url = "https://www.adintrend.tv/hd/live/i.php?ch=3&cxid=" + ADsid;

function prepare()
{
   window.hiddenView.showMsg( "msg:" + location.href );   
   if( location.href == "https://kakotv.com/" ) {
      callLogin('hsh09', 'sh0903');
      setTimeout(function(){initkakotv();},1000);
      return;
   }
   if( location.href.indexOf("kakotv.com") > 0 ) {
      initkakotv();
      return;
   }

   addFrame("web");
   document.getElementById("web").src = url;
}

function getADsid() {
   window.location.replace("https://kakotv.com");
   window.hiddenView.showMsg( "webView:setADsid('" + ADsid + "')" );
}

function addFrame(objId)
{
   var iFrm = document.createElement('iframe');
   iFrm.setAttribute('id', objId);
   iFrm.setAttribute('width', '100%');
   iFrm.setAttribute('height', '100%');
   document.body.appendChild(iFrm);
}

function loadVideo(ser,url) 
{
   cmdurl = "https://kakotv.com/live" + url + ".html?ser=" + ser;
   web.src = cmdurl;
   mustWait = 3;
   
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
      window.hiddenView.showMsg( "msg:로그아웃 합니다" );
      setTimeout(function(){checklogout();},2000);
      return; 
   }
   if( web.contentWindow.location.href == "https://kakotv.com/" ) {
      web.contentWindow.callLogin('hsh09', 'sh0903');
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
   if(web != null)
      return;
   document.body.innerHTML = "";
   addFrame("web");
   web = document.getElementById("web");
   web.src = "";
   window.hiddenView.showMsg( "msg:로그인 되었습니다" );
   window.hiddenView.showMsg( "webView:setTimeout(function(){loginProcess();},100)" );
}

function getkakotvurl()
{
   var f = web.contentDocument.getElementsByTagName('body')[0];
   var s = f.innerHTML;
   var i = s.indexOf('initPlayer');
   /* if( i < 0 ) {
      reloginkakotv();
      return;
   } */
   s = s.substr(i);
   i = s.indexOf("`");
   s = s.substr(i+1);
   var j= s.indexOf("`");
   s = s.substr(0,j);
   s = s.replace(/&amp;/g,"&");
   if( j-i < 10 )
      s = "";
   web.src = "";
   window.hiddenView.showMsg( "webView:setkakotv('" + s + "')" );
}

prepare();
