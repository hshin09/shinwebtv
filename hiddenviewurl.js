var tvplayer;
var xmlreq;
var strRespose="";
var strResult="";

function gettv(s)
{
   xmlreq = new XMLHttpRequest();
   if(!xmlreq) {
      alert("Giving up :( Cannot create an XMLHTTP instance");
      return false;
   }
   strRespose="";
   xmlreq.onreadystatechange=mystate_change;
   
   xmlreq.open("PUT", s, true);
   xmlreq.setRequestHeader("Access-Control-Allow-Origin","*");
   xmlreq.setRequestHeader("Accept","text/html");
   xmlreq.setRequestHeader("Content-Type","text/html");
   xmlreq.send(null);
}

function mystate_change(i) {
   if (xmlreq.readyState==4)  { // 4 = "loaded"
      if (xmlreq.status==200)  { // 200 = OK
         // ...our code here...
         strRespose=xmlreq.responseText;
         if(strRespose.length<1) {
            return false;
         }
         var ssi=strRespose.indexOf("file: \"http");
         var eei=strRespose.indexOf(",",ssi);
         strRespose=strRespose.substring(ssi+7,eei-1);
         strResult=strResult+strRespose;
         return true;
      }
      else {
         document.getElementById("er_msg").innerHTML="에러 안내 : 채널주소 가져오기 실패 : "+request.status;
         showErrorMessage();
         //demostr="Problem retrieving XML data : "+request.status;
      }
   }
   document.getElementById("er_msg").innerHTML="에러 안내 : 채널주소 가져오기 실패 : "+request.readyState;
   showErrorMessage();
   //demostr="Problem retrieving res data : "+request.readyState;
   return false;
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
}

make();
