var init = true;

function changeUrl(url)
{
   location.href = url;
}

function sendDownKey() 
{
   var keyboardEvent = document.createEvent('KeyboardEvent'); 
   var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent'; 
   keyboardEvent[initMethod]('keypress', // event type : keydown, keyup, keypress
      true, // bubbles
      true, // cancelable
      window, // viewArg: should be window
      false, // ctrlKeyArg
      false, // altKeyArg
      false, // shiftKeyArg
      false, // metaKeyArg
      40, // keyCodeArg : unsigned long the virtual key code, else 0
      40 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
   );
   for(var i=0; i<10; i++)
      setTimeout( function(){document.dispatchEvent(keyboardEvent);},100);
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
   document.getElementsByClassName('vjs-big-play-button')[0].dispatchEvent(new MouseEvent('click'));
   document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].dispatchEvent(new MouseEvent('click'));
}

function keychk(e) {
   if(e.which == 38 ) {
      window.trueView.showMsg("hideTrueView");
   } else if( e.which == 13) {
      document.getElementsByClassName('vjs-big-play-button')[0].dispatchEvent(new MouseEvent('click'));
      document.getElementsByClassName('vjs-live-status vjs-live-status-live')[0].dispatchEvent(new MouseEvent('click'));
   }
   e.preventDefault();
}

window.onload = function()
{
   //window.trueView.showMsg("msg:onload function");
   document.getElementsByTagName('iframe')[1].parentNode.remove();
   setTimeout(function(){ play(); }, 500);
   document.getElementsByClassName('vjs-big-play-button')[0].dispatchEvent(new MouseEvent('click'));
   document.getElementsByClassName('vjs-poster')[0].dispatchEvent(new MouseEvent('click'));
}
