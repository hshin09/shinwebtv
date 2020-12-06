function addFrame(objId)
{
   var iFrm = document.createElement('iframe');
   iFrm.setAttribute('id', objId);
   iFrm.setAttribute('width', '100%');
   iFrm.setAttribute('height', '100%');
   document.body.appendChild(iFrm);
}
addFrame('TV');
document.getElementById('TV').src='https://www.adintrend.tv/hd/live/i.php?ch=3&cxid=sh';
window.hiddenView.showMsg( "webView:var ADsid = 'sh';" );

