var tvplayer;
var xmlreq;
var strResponse="";
var strResult="";

function gettv(s)
{
   strResponse="";   
   xmlreq.open("GET", s, true);
   xmlreq.send(null);
}

function mystate_change() {
   strResult="79";
   if (xmlreq.readyState==4)  { // 4 = "loaded"
      if (xmlreq.status==200)  { // 200 = OK
         // ...our code here...
         strResponse=xmlreq.responseText;
         if(strResponse.length<1) {
           window.hiddenView.showMsg( "webView:setHiddenViewTV('" + strResult + "')" );
            return;
         }
         var ssi=strResponse.indexOf("file: \"http");
         if(ssi<1) {
            window.hiddenView.showMsg( "webView:setHiddenViewTV('" + strResult + "')" );
            return;
         }
         var eei=strResponse.indexOf(",",ssi);
         strResponse=strResponse.substring(ssi+7,eei-1);
         strResult=strResponse;
         window.hiddenView.showMsg( "webView:setHiddenViewTV('" + strResult + "')" );
         return;
      }
   }
}

function loadTV(ch)
{ 
   tvplayer.setAttribute('src',ch); 
}

function make()
{ 
   tvplayer=document.createElement('iframe');
   tvplayer.setAttribute('id','player');
   document.body.appendChild(tvplayer);
   
   xmlreq = new XMLHttpRequest();
   xmlreq.onreadystatechange=mystate_change;
   xmlreq.timeout = 2000;   
   xmlreq.ontimeout = function (e) {
      xmlreq.abort();
      window.hiddenView.showMsg( "webView:setHiddenViewTV('79')" );
      window.hiddenView.showMsg( "msg:Timeout" );
   }; 
   xmlreq.setRequestHeader("Access-Control-Allow-Origin","*");
   xmlreq.setRequestHeader("Accept","text/html");
   xmlreq.setRequestHeader("Content-Type","text/html");
}

make();
