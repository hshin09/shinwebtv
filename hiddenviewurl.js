function addFrame(objId)
{
   var iFrm = document.createElement('iframe');
   iFrm.setAttribute('id', objId);
   iFrm.setAttribute('width', '100%');
   iFrm.setAttribute('height', '100%');
   document.body.appendChild(iFrm);
}
addFrame('TV');
var ADsid = 'xyz';
document.getElementById('TV').src='https://www.adintrend.tv/hd/live/i.php?ch=3&cxid='+ADsid;
window.hiddenView.showMsg( "webView:var ADsid = '" + ADsid + "';" );

