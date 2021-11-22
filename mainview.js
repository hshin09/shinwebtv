function loadScript(url) {
   var head  = document.getElementsByTagName('head')[0];
   var scr  = document.createElement('script');
   scr.src = url;
   head.appendChild(scr);
}

function loadStyle(url) {
   var cssId = 'myCss';
   if(!document.getElementById(cssId)) {
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
      if(this.readyState!==4) return;
      if(this.status!==200) return;
      document.getElementById(id).innerHTML = this.responseText;
   };
   xhr.send();
}

function init() {
   document.body.innerHTML = "";

   loadStyle('https://hshin09.github.io/shinwebtv/youtvkor.css');
   loadScript('https://hshin09.github.io/shinwebtv/main1-2.js');
   
   var meta=document.createElement('meta');
   meta.name='viewport';
   meta.setAttribute('content','width=device-width, height=device-height, initial-scale=1.0');
   document.getElementsByTagName('head')[0].appendChild(meta);
   
   var p, a;
   var pp = p = addTag('','div','leftmenu');
  
   a = addTag(p,'div','menu0');
   loadMenu('menu0','https://hshin09.github.io/shinwebtv/kor2.html');

   p = addTag('','div','mydiv');
   a = addTag(p,'video','tv' );

   a = addTag(p,'iframe','web');
   a.setAttribute('allowFullscreen','true');
   a.setAttribute('frameborder','0');
   a.setAttribute('border','0');
   
   a = addTag(p,'div','videoMessage');
   addTag(a,'p','ch_name');
/*   
   tv = document.getElementById('tv');
   web = document.getElementById('web');
   ch_name = document.getElementById('ch_name');
   web.style.top = "4vh";
   tv.style.display = "none";
*/
   alert(document.domain);
}

init();