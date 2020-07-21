var init = true;

function changeUrl(url)
{
   location.href = url;
}

function play()
{
   if(init) {
      init = false;
      window.onkeydown = keychk;
      document.getElementsByClassName('vjs-custom-control-spacer vjs-spacer ')[0].addEventListener( "click", function()
      {
         window.trueView.showMsg("hideTrueView");
      }, true );
      document.getElementsByClassName('body')[0].addEventListener( "click", function()
      {
         window.trueView.showMsg("hideTrueView");
      }, true );
   }
   //setTimeout(function(){ document.getElementsByClassName('vjs-poster')[0].click(); }, 300 );
   //setTimeout(function(){ document.getElementsByClassName('vjs-big-play-button')[0].click(); },300 );
   setTimeout(function(){ document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].click(); },300 );
}

function keychk(e) {
   if(e.which == 38 || e.which == 48 ) {
      window.trueView.showMsg("hideTrueView");
   } else if( e.which == 13) {
      setTimeout(function(){ document.getElementsByClassName('vjs-poster')[0].click(); }, 300 );
      //setTimeout(function(){ document.getElementsByClassName('vjs-big-play-button')[0].click(); },300 );
      //setTimeout(function(){ document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].click(); },300 );
   }
   e.preventDefault();
}

window.onload = function()
{
   //setTimeout(function(){ play(); }, 2000);
   alert(document.getElementsByClassName('vjs-poster')[0]);
   play();
}

