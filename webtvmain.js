window.onkeydown = keychk;
var ADsid='a';
var tvaddr = new Array(24);
var addr=[
  ["SBS Golf","SBS Golf","SBS Golf","/sbs_golf_720/","79",3],
  ["JTBC Golf","JTBC Golf","JTBC Golf","/jtbc_golf_720/","79",3],
  ["OCN Movies","OCN Movies","OCN Movies","/cgv_540/","79",3],
  ["OCN Original","OCN Original","OCN Original","/ocn_540/","79",3],
  ["중화 TV","영화 Screen","영화 Screen","/chinesetv_540/","79",3],
  ["OCN Thrills","OCN Thrills","OCN Thrills","/super_action_540/","79",3],
  ["Billiards TV","Catch ON 1","Catch ON 1","/billiardstv_540/","79",3],
  ["EBS1","Catch ON 2","Catch ON 2","/ebs1_540/","79",3],
  ["CNN","The Movie","The Movie","/cnn_kr_540/","79",3],
  ["BBC","FOX","FOX","/bbc_kr_540/","79",3],
  ["TV 조선 뉴스","TV 조선 뉴스","TV 조선 뉴스","/tvchosun_720/","79",3],
  ["채널 A 뉴스","채널 A 뉴스","채널 A 뉴스","/channela_720/","79",3],
  ["JTBC 뉴스","JTBC 뉴스","JTBC 뉴스","/jtbc_540/","79",3],
  ["YTN 뉴스","YTN 뉴스","YTN 뉴스","/ytn_720/","79",3],
  ["연합 뉴스","연합 뉴스","연합 뉴스","/newsy_720/","79",3],
  ["MBN 뉴스","MBN 뉴스","MBN 뉴스","/mbn_720/","79",3],
  ["SBS TV","SBS TV","SBS TV","/sbs_720/","79",3],
  ["MBC TV","MBC TV","MBC TV","/mbc_720/","79",3],
  ["KBS1 TV","KBS1 TV","KBS1 TV","/kbs1_720/","79",3],
  ["KBS2 TV","KBS2 TV","KBS2 TV","/kbs2_720/","79",3],
  ["GeoGraphic","GeoGraphic","GeoGraphic","/national_540/","79",3],
  ["Discovery","Discovery","Discovery","/discovery_540/","79",3],
  ["SpoTV2","History","History","/spotv_2_720/","79",3],
  ["MNet","MNet","MNet","/mnet_540/","79",3]
];

var path = "http://youtv24.net/sites/speedtv/pages/pc/pc_view.php?ch=live";
var ch = ['26','37','04','05','25','03','09','35','30','17','33','02','01','34','32','23','14','07','15','13','50','46','49','38' ];
var gi=0;
var si=10;
var oi=10;
var ei=10;
var asi=[10,18];
var aoi=[10,18];
var aei=[10,18];
var full=false;
var timer=null;
var time=0;
var trans=100;
var mustabout = 0;
var timeSetTV = 800;
var mustWait = 0;
var myshtv = 0;
var pathmyshtv = "https://cdn.jpth10.jpnettv.live/krtv";

window.onload = function() {
});


function OnOff()
{
}

function showTime()
{
   var dt = new Date();
   var sctime = "";

   if( dt.getHours() < 10 )
      sctime += "0";
   sctime += dt.getHours();
   sctime += ":";
   if( dt.getMinutes() < 10 )
      sctime += "0";
   sctime += dt.getMinutes();

   $('#ch_name').text( sctime );
   $("#videoMessage").css('display', 'block');
   setTimeout( function(){$("#videoMessage").css('display', 'none');}, 3000 );
}

function onup() {
	if(oi>-1) x[oi].style="background-color:#252525";
	if(ei>-1) x[ei].style="color:yellow";
	si--;
	//if(full && gi==0 && si==10) si--;
	if(si<0) si+=cnt;
	x[si].style="background-color:#234567";
	if(si==ei) x[si].style="background-color:#234567;color:yellow";
	oi=si;
	if(full) x[si].click();
}

function ondown() {
	if(oi>-1) x[oi].style="background-color:#252525";
	if(ei>-1) x[ei].style="color:yellow";
	si++;
	//if(full && gi==0 && si==10) si++;
	if(si>=cnt) si-=cnt;
	x[si].style="background-color:#234567";
	if(si==ei) x[si].style="background-color:#234567;color:yellow";
	oi=si;
	if(full) x[si].click();
}

function onleft() {
	if(si>-1 && si==ei) {
		if(full) {
			change();
			return;
		}
		onFullscreenOnOff();
	}
	else if(si>-1) x[si].click();
}

function onright() {
	if(full) {
	    onFullscreenOnOff();
	}
	else {
		change();
	}
}

function change() {
	asi[gi]=si;
	aei[gi]=ei;
	aoi[gi]=oi;

	if(gi==0)
		gi=1;
	else
		gi=0;

	si=asi[gi];
	ei=aei[gi];
	oi=aoi[gi];

	mlok();
	si=asi[gi];
	ei=aei[gi];
	oi=aoi[gi];

	if(si>-1) x[si].style="background-color:#234567";
	if(ei>-1) {
		if(si==ei)
			 x[si].style="background-color:#234567;color:yellow";
		else
			 x[ei].style="background-color:#252525;color:yellow";
	}
  //window.parentView.showMsg("00");
}

function keychk(e) {
	if(e.which == 38) {
		onup();
	}
	else if(e.which == 40) {
		ondown();
	}
	else if(e.which == 37) {
		onleft();
	}
	else if(e.which == 39) {
		onright();
	}
	else if(e.which == 13 ) {
      		onok();
	}
	else if(e.which == 48 ) {
	      $('#menu1').load("https://hshin09.github.io/shinwebtv/thai.html");
              if(gi==1)
                 setTimeout(function(){ mlok(); }, 700);
	}
	else if(e.which == 49 ) {
	      //if( ei==10 && si==12 ) {
		$('#menu1').load("https://hshin09.github.io/shinwebtv/svideo.html");
                if(gi==1)
                   setTimeout(function(){ mlok(); }, 700);
	      //}
	}
        else if(e.which == 50 || e.which == 55 ) {
               showTime();
        } 
        else if(e.which == 53 ) {
               window.parentView.showMsg("launchApp:com.google.android.youtube.tv");
	} 
        else if(e.which == 54 ) {
               //window.parentView.showMsg("launchApp:com.android.chrome");
               window.parentView.showMsg("launchApp:com.opera.browser.beta");
	} 
        else if(e.which == 56 ) {
              if(myshtv == 1) {
                 $('#menu0').load("https://hshin09.github.io/shinwebtv/kor2.html");
                 myshtv = 0;
              }
              else {
	         $('#menu0').load("https://hshin09.github.io/shinwebtv/myshtv.html");
                 myshtv = 1;
              }
              if(gi == 0)
                 setTimeout(function(){ mlok(); }, 500);
	}
        else if(e.which == 57 ) {
	      $('#menu1').load("https://hshin09.github.io/shinwebtv/thai_old.html");
              if(gi==1)
                 setTimeout(function(){ mlok(); }, 500);
	}
	e.preventDefault();
}

function onok() {
  mustWait = 0;
  if( gi == 0 )
  {
    var i_ch=addr[si][5];

    i_ch++;
    if(i_ch>4)
      i_ch=2;
    tvaddr[si]=addr[si][i_ch];

    x[si].innerHTML=addr[si][i_ch-2];

    addr[si][5]=i_ch;
    if(i_ch==2)
      window.parentView.showMsg("msg:기본서버("+x[si].innerHTML+") 로 이동합니다");
    else
      window.parentView.showMsg("msg:"+(i_ch-2)+"번 보조서버("+x[si].innerHTML+") 로 이동합니다");
  }
  x[si].click();
}

var x;
var cnt;
function mlok() {
   x=document.getElementById("ml"+gi).getElementsByTagName("li");
   cnt=x.length;
   var i;
   for(i=0; i<cnt; i++) {
      x[i].id=i;
   }
   if(ei>-1) {
      si=ei;
      ei=-1;
      onleft();
      ei=si;
   }
   else if(si<0)
      ondown();

   showLeftMenu();
}

function showLeftMenu() {
	var hi=0;
	if(gi==0) hi=1;
	var hideMenuObj = document.getElementById('menu'+hi);
	var leftMenuObj = document.getElementById('menu'+gi);

        hideMenuObj.removeAttribute("style");

	if(gi==0) {
		leftMenuObj.style['transform'] = "translate(0px, 0px)";
		leftMenuObj.style['msTransform'] = "translate(0px, 0px)";
		leftMenuObj.style['mozTransform'] = "translate(0px, 0px)";
		leftMenuObj.style['webkitTransform'] = "translate(0px, 0px)";
		leftMenuObj.style['oTransform'] = "translate(0px, 0px)";
	}
	else {
		leftMenuObj.style['transform'] = "translate(0px, -"+ trans +"px)";
		leftMenuObj.style['msTransform'] = "translate(0px, -"+ trans +"px)";
		leftMenuObj.style['mozTransform'] = "translate(0px, -"+ trans +"px)";
		leftMenuObj.style['webkitTransform'] = "translate(0px, -"+ trans +"px)";
		leftMenuObj.style['oTransform'] = "translate(0px, -"+ trans +"px)";
	}
}

function onFullscreenOnOff() {
    if( full == false )
    {
        document.getElementById("mydiv").style.left="0";
        document.getElementById("mydiv").style.width="100%";
        full=true;
    }
    else
    {
	document.getElementById("mydiv").style.left="10%";
        document.getElementById("mydiv").style.width="90%";
        full=false;
    }
}

function movieclk( w, url, p ) {
    oldCurrentTime=0;
    stv.pause();

    if(oi>-1) x[oi].style="background-color:#252525;";
    if(ei>-1) x[ei].style="background-color:#252525";
    si=ei=p.id;
    x[ei].style="background-color:#234567;color:yellow";
    oi=si;
    if( w === "tv" && url.indexOf("tv.trueid.net/embed/") < 1 )
       showVideoMessage();

    if( url.substr(0,1) == "/" )
       url = pathmyshtv + url + "playlist.m3u8";

    stv.volume=1;
    if( gi==1 && p.id > 18 )
    {
      stv.volume=0.2;
      if( p.id == 19 || p.id == 21 )
         stv.volume=0.4;
      else if( p.id == 22 )
         stv.volume=0.3;
      else if( p.id == 23 )
         stv.volume=0.3;
    }
    //else if( gi==1 && p.id == 3 )
    //   stv.volume=1;
    else if( gi == 1 ) {
       if( url.indexOf("p1.cdn.vet") > 0 ) {
          stv.volume=0.3;
          url = url + ADsid;
       }
    }

    web.setAttribute( "src",  url );
}

function showVideoMessage()
{
    time = 0;
    
    if(timer) {
      clearInterval(timer);
      timer=null;
    }
    
    timer = setInterval( function() { OnOff(); }, 1100 );
    closeErrorMessage();
    $('#sec').text( "00" );
    $("#ch_name").text( x[si].innerHTML );
    $("#videoMessage").css('display', 'block');
    $("#secMessage").css('display', 'block');
    //window.parentView.showMsg(x[si].innerHTML);
}

function showErrorMessage()
{
    document.getElementById("errorMessage").style.display = "block";
}

function closeErrorMessage()
{
    if(document.getElementById("errorMessage").style.display == "none")
        return;
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("er_msg").innerHTML="";
}

function videoErr(e)
{
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       document.getElementById("er_msg").innerHTML="비디오 취소됨";
       showErrorMessage();
       //alert('You aborted the video playback.');
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       document.getElementById("er_msg").innerHTML="비디오 다운로드 실패(네트워크문제)";
       showErrorMessage();
       //alert('A network error caused the video download to fail part-way.');
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       document.getElementById("er_msg").innerHTML="이형식의 비디오를 지원하지 않음";
       showErrorMessage();
       //alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       document.getElementById("er_msg").innerHTML="채널주소가 바뀌어 다른서버에서 새주소를 찾는 작업을 진행합니다.";
       //alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
       showErrorMessage();
       break;
     default:
       document.getElementById("er_msg").innerHTML="알려지지않은 문제로 비디오 로드 에러";
       showErrorMessage();
       //alert('An unknown error occurred.');
       break;
   }
}