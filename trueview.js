

function play()
{
   document.getElementsByClassName('vjs-big-play-button')[0].click();
}

document.addEventListener( "DOMContentLoaded", function()
{
   alert('DOMContentLoaded');
   document.getElementsByClassName('vjs-tech')[0].addEventListener( "dbclick", function()
   {
      alert('dbclick');
   } );
} );

