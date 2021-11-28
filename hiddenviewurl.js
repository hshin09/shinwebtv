var timer = null;
var web;
var cnt=0;
var ADsid = "shin";
var url = "https://www.adintrend.tv/hd/live/i.php?ch=3&cxid=" + ADsid;

function prepare()
{
   window.hiddenView.showMsg( "msg:" + document.domain + cnt++ );
   if( document.domain == "kakotv.com" ) {
      initkakotv();
      return;
   }

   addFrame("TV");
   document.getElementById("TV").src = url;
}

function getADsid() {
   window.hiddenView.showMsg( "webView:setADsid('" + ADsid + "')" );
   window.location.replace("https://kakotv.com");
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
   web.src = url;
   mustWait = 3;
   
   if(timer) {
      clearInterval(timer);
      timer=null;
   }
   timer = setInterval( function() { OnOff(); }, 1100 );
}

function OnOff()
{
   if( timer ) {
      clearInterval(timer);
      timer=null;
   }
   //getTvUrl();
}

function initkakotv()
{
   callLogin('hshin09', 'shin0903');
   document.body.innerHTML = "";
   addFrame("web");
   web = document.getElementById("web");
}

prepare();
