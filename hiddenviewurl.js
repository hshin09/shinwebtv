var ADsid = "2";
var url = "https://www.adintrend.tv/hd/live/i.php?ch=3&cxid=" + ADsid;

addFrame("TV");
document.getElementById("TV").src = url;

function getADsid() {
	setTimeout(function() {
      window.hiddenView.showMsg( "webView:setADsid('" + ADsid + "')" );
   }, 100);
}

function addFrame(objId)
{
   var iFrm = document.createElement('iframe');
   iFrm.setAttribute('id', objId);
   iFrm.setAttribute('width', '100%');
   iFrm.setAttribute('height', '100%');
   document.body.appendChild(iFrm);
}

