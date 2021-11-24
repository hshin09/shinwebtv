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
alert(document.querySelector('html').outerHTML);
