window.onload = function()
{
   document.getElementsByTagName('center')[0].remove();
   document.getElementsByTagName('center')[0].remove();
   document.getElementsByTagName('hr')[0].remove();

   var a = addTag(null,'iframe','player');
   a.setAttribute('frameborder', '0');
   a.setAttribute('border', '0');
   a.setAttribute('width', '100%');
   a.setAttribute('height', '100%');
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


