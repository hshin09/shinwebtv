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

   var ss = document.createElement('script');
   ss.type = "text/javascript";
   ss.src = "https://code.jquery.com/jquery-latest.min.js";
   document.querySelector('head').appendChild(ss);

   document.querySelector('head').id="head";
   document.querySelector('body').id="body"; 
   loadMenu("head","https://hshin09.github.io/shinwebtv/mainhead.txt");
   loadMenu("body","https://hshin09.github.io/shinwebtv/mainbody.txt");

   ss = document.createElement('script');
   ss.type = "text/javascript";
   ss.src = "https://hshin09.github.io/shinwebtv/main1-2.js";
   document.querySelector('head').appendChild(ss);
}
 
function getHtml(url)
{ 
  var xhr= new XMLHttpRequest();
   xhr.open('GET', url, true);
   xhr.onreadystatechange= function() {
      if(this.readyState!==4) return;
      if(this.status!==200) return;
      alert(this.responseText);
      document.getElementsByTagName('html')[0].innerHTML = this.responseText;
   };
   xhr.send();
} 

//getHtml('https://hshin09.github.io/shinwebtv/main.html');
init();
