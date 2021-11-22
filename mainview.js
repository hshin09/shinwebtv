var request;

function getHtml()
{
   request = new XMLHttpRequest();
   if(!request) {
      alert("Giving up :( Cannot create an XMLHTTP instance");
      return false;
   }
   demostr="";
   request.open("GET", "https://hshin09.github.io/shinwebtv/main.html", false);
   request.setRequestHeader("Access-Control-Allow-Origin","*");
   request.setRequestHeader("Accept","text/html");
   request.setRequestHeader("Content-Type","text/html");
   request.send(null);
   if(!state_change())
      return;
}

function state_change() 
{
   if (request.readyState==4) { 
      if (request.status==200) { 
         document.getElementsByTagName('html')[0].outerHTML=request.responseText;
      } 
   } 
}

getHtml();
