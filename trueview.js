var web;

window.onload = function()
{
   alert("a");
   document.getElementsByTagName('center')[0].remove();
   document.getElementsByTagName('center')[0].remove();
   document.getElementsByTagName('hr')[0].remove();

   var p = addTag(null,'div','left');
   var a = addTag(p,'div','menu0');
   a = addTag(p,'div','menu1');

   p = addTag(null,'div','myid');
   a = addTag(p,'iframe','web');
   a.setAttribute('frameborder','0');
   a.setAttribute('border','0');
   a.setAttribute('width','100%');
   a.setAttribute('height','100%');
   a = addTag(p,'div','videoMessage');
   addTag(a.'p','ch_name');

    $('#menu0').load("https://hshin09.github.io/shinwebtv/kor2.html");
    $('#menu1').load("https://hshin09.github.io/shinwebtv/thai.html");
    web = document.getElementById("web");
    web.src = "http://youtv24.net/sites/btmtv/pages/pc/pc_view.php?ch=live38&start=on";
}

function addTag(parent,tag,objId) {
   var iTag = document.createElement('tag');
   iTag.setAttribute('id', objId);
   if(parent)
      parent.appendChild(iTag);
   else
      document.body.appendChild(iTag);
   
   return iTag;
}


