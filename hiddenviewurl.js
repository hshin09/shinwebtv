var ADsid = "shin";
var url = "https://www.adintrend.tv/hd/live/i.php?ch=3&cxid=" + ADsid;
alert(document.domain);
if(document.domain == "kakao.com")
   return;
addFrame("TV");
document.getElementById("TV").src = url;

function getADsid() {
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

