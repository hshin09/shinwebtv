

function play()
{
   document.getElementsByClassName('vjs-big-play-button')[0].click();
}

document.addEventListener( "DOMContentLoaded", function()
{
   document.getElementsByClassName('vjs-tech')[0].addEventListener( "click", function()
   {
      alert('click');
   } );
} );

