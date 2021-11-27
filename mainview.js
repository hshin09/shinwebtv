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
   if(document.domain == "hshin09.github.io")
      return;

   var s;
   while(1) {
      s = document.querySelector('title');
      if( s && s.innerHTML == "404 Not Found" )
         break;
   }
   
   while(1) {
      s = document.getElementsByTagName('script')[0];
      if( s == null )
         break;
      s.parentNode.removeChild(s);
   }
   //window.removeEventListeners('DOMContentLoaded');
   document.body.innerHTML = "";

   var ss = document.createElement('script');
   ss.type = "text/javascript";
   ss.src = "https://code.jquery.com/jquery-latest.min.js";
   document.querySelector('head').appendChild(ss);

   document.querySelector('head').id="head";
   document.querySelector('body').id="body"; 
   loadMenu("head","https://hshin09.github.io/shinwebtv/mainhead.txt");

   ss = document.createElement('script');
   ss.type = "text/javascript";
   ss.src = "https://hshin09.github.io/shinwebtv/main1-2.js";
   document.querySelector('head').appendChild(ss);

   loadMenu("body","https://hshin09.github.io/shinwebtv/mainbody.txt");
}
init();
