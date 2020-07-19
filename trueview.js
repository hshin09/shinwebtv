
var init = true;
function play()
{
   if(init) {
      init = false;
      document.getElementsByClassName('vjs-tech')[0].addEventListener( "dbclick", function()
      {
         alert('dbclick');
      } );
   }
   document.getElementsByClassName('vjs-big-play-button')[0].click();
}

window.onload = function()
{
   alert('1');
} );

