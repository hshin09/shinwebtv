var web;

function addFrame(objId) {
	var iFrm = document.createElement('iframe');
	iFrm.setAttribute('id', objId);
	iFrm.setAttribute('frameborder', '0');
	iFrm.setAttribute('border', '0');
	iFrm.setAttribute('width', '100%');
	iFrm.setAttribute('height', '100%');
	document.body.appendChild(iFrm);
}

function loadStyle(url) {
   var cssId = 'myCss';  // you could encode the css path itself to generate id..
   if (!document.getElementById(cssId)) {
      var head  = document.getElementsByTagName('head')[0];
      var link  = document.createElement('link');
      link.id   = cssId;
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = url;
      link.media = 'all';
      head.appendChild(link);
   }
}

function addTag(parent,tag,objId) {
   var iTag = document.createElement(tag);
   iTag.setAttribute('id', objId);
   if(parent == '')
      document.body.appendChild(iTag);
   else
      parent.appendChild(iTag);
   
   return iTag;
}

function loadMenu(id,url) {
   var xhr= new XMLHttpRequest();
   xhr.open('GET', url, true);
   xhr.onreadystatechange= function() {
      if (this.readyState!==4) return;
      if (this.status!==200) return; // or whatever error handling you want
      document.getElementById(id).innerHTML= this.responseText;
   };
   xhr.send();
}

function init() {
   loadStyle('');
   addTag('','script','a').src = 'https://code.jquery.com/jquery-latest.min.js';
   document.getElementsByTagName('body')[0].style.margin = 0;
   //document.writeln('<script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>');
   document.body.removeChild(document.getElementsByTagName('center')[0]);
   document.body.removeChild(document.getElementsByTagName('center')[0]);
   document.body.removeChild(document.getElementsByTagName('hr')[0]);

//   addFrame('player');
//   document.getElementById('player').src='http://youtv24.net/sites/speedtv/pages/pc/pc_view.php?ch=live38&start=on';

   var p = addTag('','div','left');
   var a = addTag(p,'div','menu0');
   a = addTag(p,'div','menu1');

   p = addTag('','div','myid');
   a = addTag(p,'iframe','web');
   a.setAttribute('frameborder','0');
   a.setAttribute('border','0');
   a.setAttribute('width','100%');
   a.setAttribute('height','100%');
   a = addTag(p,'div','videoMessage');
   addTag(a,'p','ch_name');

   loadMenu('menu0','https://hshin09.github.io/shinwebtv/kor2.html');
   //$('#menu0').load('https://hshin09.github.io/shinwebtv/kor2.html');
   //$('#menu1').load('https://hshin09.github.io/shinwebtv/thai.html');
   web = document.getElementById('web');
   web.src = 'http://youtv24.net/sites/speedtv/pages/pc/pc_view.php?ch=live38&start=on';

}

init();
