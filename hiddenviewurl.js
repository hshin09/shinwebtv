var timer = null;
var web = null;
var mustWait = 0;
var cmdurl = "";
var ADsid = "shin";
var url = "https://www.adintrend.tv/hd/live/i.php?ch=3&cxid=" + ADsid;

function prepare()
{
   //window.hiddenView.showMsg( "msg:" + location.href );
   
   if( location.href.indexOf('?') > 0 ) {
      initkakotv();
      return;
   }
   
   if( location.href == "https://kakotv.com/" ) {
      callLogin('hshin09', 'shin0903');
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

function loadVideo(url) 
{
   cmdurl = "https://kakotv.com/live" + url + ".html";
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
   if( web.contentWindow.location.href == "https://kakotv.com/" ) {
      web.contentWindow.callLogin('hshin09', 'shin0903');
      window.hiddenView.showMsg( "msg:다시 로그인 되었습니다" );   
   }
   else {
      setTimeout(function() {
            checklogout();
      }, 1000);
   }
}

function reloginkakotv()
{
   web.contentWindow.location.href = "https://kakotv.com/member/logout";
   checklogout();
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
   window.hiddenView.showMsg( "webView:setTimeout(function(){mlclk();},500)" );
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
