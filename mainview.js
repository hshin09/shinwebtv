function init()
{
   document.body.innerHTML = "";

   var ss = document.createElement('script');
   ss.type = "text/javascript";
   ss.src = "https://code.jquery.com/jquery-latest.min.js";
   document.querySelector('head').appendChild(ss);

   document.querySelector('head').id="head";
   document.querySelector('body').id="body"; 
   $('#head').load("https://hshin09.github.io/shinwebtv/main.html #mainhead");
   $('#body').load("https://hshin09.github.io/shinwebtv/main.html #mainbody");

   ss = document.createElement('script');
   ss.type = "text/javascript";
   ss.src = "https://hshin09.github.io/shinwebtv/main1-2.js";
   document.querySelector('head').appendChild(ss);
}

//init();
//alert(document.querySelector('html').outerHTML);
