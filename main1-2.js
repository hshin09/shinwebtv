window.onkeydown = keychk;
var ADsid='a';
//var ADsid = "no";
var ADscript = "javascript:function getsid(){ var s=document.getElementById('TV'); if(s!=null && s!='undefined'){var ss=s.src; if(ss.indexOf('cxid')<1) return; window.adView.showMsg(s.src);} } setTimeout(function(){getsid();},100);";
var tvaddr = new Array(24);
var addr=[
  ["SBS Golf","SBS Golf","SBS Golf","/sbs_golf_720/","79","79",3],
  ["JTBC Golf","JTBC Golf","JTBC Golf","/jtbc_golf_720/","79","79",3],
  ["OCN Movies","OCN Movies","OCN Movies","/cgv_540/","79","79",3],
  ["OCN Original","OCN Original","OCN Original","/ocn_540/","79","79",3],
  ["중화 TV","영화 Screen","영화 Screen","/chinesetv_540/","79","79",3],
  ["OCN Thrills","OCN Thrills","OCN Thrills","/super_action_540/","79","79",3],
  ["Billiards TV","Catch ON 1","Catch ON 1","/billiardstv_540/","79","79",3],
  ["EBS1","Catch ON 2","Catch ON 2","/ebs1_540/","79","79",3],
  ["CNN","The Movie","The Movie","/cnn_kr_540/","79","79",3],
  ["BBC","FOX","FOX","/bbc_kr_540/","79","79",3],
  ["TV 조선 뉴스","TV 조선 뉴스","TV 조선 뉴스","/tvchosun_720/","79","79",3],
  ["채널 A 뉴스","채널 A 뉴스","채널 A 뉴스","/channela_720/","79","79",3],
  ["JTBC 뉴스","JTBC 뉴스","JTBC 뉴스","/jtbc_540/","79","79",3],
  ["YTN 뉴스","YTN 뉴스","YTN 뉴스","/ytn_720/","79","79",3],
  ["연합 뉴스","연합 뉴스","연합 뉴스","/newsy_720/","79","79",3],
  ["MBN 뉴스","MBN 뉴스","MBN 뉴스","/mbn_720/","79","79",3],
  ["SBS TV","SBS TV","SBS TV","/sbs_720/","79","79",3],
  ["MBC TV","MBC TV","MBC TV","/mbc_720/","79","79",3],
  ["KBS1 TV","KBS1 TV","KBS1 TV","/kbs1_720/","79","79",3],
  ["KBS2 TV","KBS2 TV","KBS2 TV","/kbs2_720/","79","79",3],
  ["GeoGraphic","GeoGraphic","GeoGraphic","/national_540/","79","79",3],
  ["Discovery","Discovery","Discovery","/discovery_540/","79","79",3],
  ["SpoTV2","History","History","/spotv_2_720/","79","79",3],
  ["MNet","MNet","MNet","/mnet_540/","79","79",3]
];

//var path= "http://youtv24.net/sites/btmtv/pages/mobile/mobile_view.php?ch=live";
//var path79 = "http://123tv24.com/livetv/player-pc.php?co=01&ch=";
var adpath = "https://www.adintrend.tv/hd/m/ch3";
var path79 = "http://youtv24.net/sites/speedtv/pages/pc/pc_view.php?ch=live";
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
var lastTrueCh = "";
var myshtv = 0;
var pathmyshtv = "https://cdn.jpth10.jpnettv.live/krtv";

var web;
var stv;
var tstr;
var isChLoaded=0;
var msgGetCh="채널리스트 구성중";
var oldCurrentTime=0;
var youtv24 = 1;

$('document').ready(function() {
    alret('a');
    if( youtv24 == 1 ) {
       window.parentView.showMsg("trueViewLoadUrl:http://youtv24.net/sites");
       window.parentView.showMsg("showTrueView");
       return;
    }

    if( myshtv == 0 )
       $('#menu0').load("https://hshin09.github.io/shinwebtv/kor2.html");
    else
       $('#menu0').load("https://hshin09.github.io/shinwebtv/myshtv.html");
    $('#menu1').load("https://hshin09.github.io/shinwebtv/thai.html");
    stv = $('#tv').get(0);
    //path = path79;
    web = document.getElementById("web");
    for(var i=0; i<tvaddr.length; i++)
      tvaddr[i]=addr[i][3];

    timer = setInterval( function() { OnOff(); }, 500 );
});

/*
===== networkState =======
0: 미디어 리소스 선택 전의 초기 상태 (NETWORK_EMPTY)
1: 유휴 상태                      (NETWORK_IDLE)
2: 미디어 리소스를 다운로드 중       (NETWORK_LOADING)
3: 미디어 리소스를 찾을 수 없는 경우  (NETWORK_NO_SOURCE)
===== readyState =========
0: 이용 가능한 미디어 리소스의 정보를 얻지 못하거나 얻을 수 없는 상태
1: 미디어 리소스의 길이(시간)와 크기(비디오의 크기)는 얻었으나 아직 현재의 재생 위치를 재생하기 위한 미디어 데이터를 얻지 못한 상태
2: 현재의 재생 위치만을 표시할 수 있는 미디어 데이터는 얻었지만 아직 현재의 재생 위치에서 재생을 진행하기 위한 데이터는 얻지 못한 상태
3: 현재의 재생 위치에서 재생을 진행하기 위한 미디어 데이터는 얻었지만 재생 속도에 맞춰 매끄럽게 재생할 수 있을 만큼의 데이터는 얻지 못한 상태
4: 재생 속도에 맞춰 매끄럽게 재생할 수 있을 만큼의 미디어 데이터를 얻은 상태
===== error.code (꼭 error 의 null 체크필요함) =======
1: 사용자의 조작에 의해 미디어 리소스 얻기가 중단됐을 때
2: 네트워크 오류로 미디어 리소스 얻기가 중단됐을 때
3: 미디어 리소스의 디코딩 중에 오류가 발생하였을 때
4: src 속성에 지정된 미디어 리소스가 부적절할 때
보통 에러시 ns=3,rs=0,er=4 이고 정상일때는 ns=2->1, rs=0->4, er=없음(null)
*/
var isNotUser=0;
function OnOff()
{
    if( !isChLoaded )
    {
      $('#secMessage').css('display', 'block');
      msgGetCh = msgGetCh + ".";
      $('#sec').text( msgGetCh );
      x=document.getElementById("ml"+gi).getElementsByTagName("li");
      if( x.length==tvaddr.length )
      {
          trans=x.length*screen.height*0.041;
          if(timer) {
            clearInterval(timer);
            timer=null;
          }
          isChLoaded = 1;
          setTimeout( function(){mlok();},500 );
      }
      return;
    }

    time++;
    tstr="";
    if(time<10)
      tstr="0";
    tstr=tstr+time;
    $('#sec').text( tstr );

    if( mustWait )
    {
       mustWait--;
       if( mustWait == 0 )
          setTimeout(function(){onok();},timeSetTV);
       return;
    }

    if( stv.error != null || stv.networkState == 3 || ( time > 30 && stv.currentTime < 2 ) )
    {
       oldCurrentTime = 0;
       if( $('#errorMessage').css('display') != "block" ) {
          $("#er_msg").text( "채널을 가져올수 없음(네트워크 또는 서버 에러)-Timer" );
          showErrorMessage();
       }
       if(isNotUser<2) {
          if( gi == 0 && myshtv == 0 )
          {
             window.parentView.showMsg( "hiddenView:loadTV('" + path + ch[ei] + "&start=on')" );
             //window.parentView.showMsg( "msg:채널을 리로딩중입니다:"+isNotUser);
             mustWait = 5;
             mustabout = 1;
             timeSetTV = 800;
             clearAddress(addr[ei][addr[ei][6]]);
          }
          isNotUser++;
       }
       else {
          if(timer) {
             clearInterval(timer);
             timer=null;
          }
          $("#er_msg").text( "기본/보조서버 모두 에러(다른체널로 바꿔보세요)" );
          showErrorMessage();
          isNotUser=0;
          if( gi == 0 )
             setTimeout(function(){onok();},timeSetTV);
       }
    }
    
    if( $('#secMessage').css('display')=="block" && stv.currentTime > 1 )
    {
        $('#secMessage').css('display', 'none');
        if( mustabout ) {
           //window.parentView.showMsg( "hiddenView:loadTV('http://youtv24.net/sites/')" );
           mustWait = 0;
           mustabout = 0;
        }
    }
    
    if( $('#videoMessage').css('display')=="block" && stv.currentTime > 1 )
    {
        isNotUser=0;
        $('#videoMessage').css('display', 'none');
        if(timer) {
          clearInterval(timer);
          timer=null;
          timeSetTV=0;
        }
        //timer = setInterval( function() { OnOff(); }, 15000 );
        setTimeout(function(){ oldCurrentTime = stv.currentTime; },500);
        return;
    }
    /*
    if(oldCurrentTime>0) {
      if(oldCurrentTime==stv.currentTime) {
        if(isNotUser<2) {
          if( gi == 0 )
          { 
             window.parentView.showMsg( "hiddenView:loadTV('" + path + ch[ei] + "')" );
             mustabout = 1;
             timeSetTV=2000;
             clearAddress(addr[ei][addr[ei][6]]);
             setTimeout(function(){ onok(); }, timeSetTV);
          }
          isNotUser++;
        }
        else {
          if(timer) {
             clearInterval(timer);
             timer=null;
             timeSetTV=0;
             if( mustabout ) {
                window.parentView.showMsg( "hiddenView:loadTV('http://youtv24.net/sites/')" );
                mustabout = 0;
             }
          }
          $("#er_msg").text( "기본/보조서버 모두 에러(다른체널로 바꿔보세요)" );
          showErrorMessage();
          isNotUser=0;
        }
      }
      else {
         oldCurrentTime = stv.currentTime;
         time+=10;
      }
    }
    */
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

function get79tv(i) 
{
   //window.parentView.showMsg( "hiddenView:loadTV('" + path + ch[i] + "&start=on')" );
   //mustWait = 5;
   //window.parentView.showMsg("79:"+path79+ch[i]);
   window.parentView.showMsg("hiddenView:gettv('"+path79+ch[i]+"')");
}

function setHiddenViewTV(s) 
{
   if(s=="timeout") {
      $("#er_msg").text( "서버가 응답이 없어 일정시간(2분내외) 대기 및 재시도를 진행합니다." );
      showErrorMessage();      
      mustWait = 20;
      return;
   }
   tvaddr[si]=s;
   mustWait = 0;
   setTimeout(function(){ x[si].click(); }, timeSetTV);
}

function clearAddress(tar) 
{
  tvaddr[ei]=tar;
  /*
  if(tar!=null && tar!="79")
    return;

  for(var i=0; i<tvaddr.length; i++) {
    if(addr[i][addr[i][6]]==tar) {
        tvaddr[i]=tar;
    }
  }
  */
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
	}.
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
        else if(e.which == 51) {
           if( youtv24 == 0 ) {
              //window.parentView.showMsg("showTrueView");
              youtv24 = 1;
           }
           else {
              //window.parentView.showMsg("hideTrueView");
              youtv24 = 0;
           }
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
  if( gi == 0 && myshtv == 0 )
  {
    var i_ch=addr[si][6];

    i_ch++;
    if(i_ch>5)
      i_ch=3;
    tvaddr[si]=addr[si][i_ch];

    x[si].innerHTML=addr[si][i_ch-3];

    addr[si][6]=i_ch;
    if(i_ch==3)
      window.parentView.showMsg("msg:기본서버("+x[si].innerHTML+") 로 이동합니다");
    else
      window.parentView.showMsg("msg:"+(i_ch-2)+"번 보조서버("+x[si].innerHTML+") 로 이동합니다");

    if(tvaddr[si] == null)
      gettv(si);
    else if(tvaddr[si] == "79") {
      get79tv(si);
      return;
    }
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

    if( url == null ) {
    //if( gi == 1 && ADsid == "no" ) {
       gettv(p.id);
       setTimeout(function(){ x[p.id].click(); }, 0);
       return;
    }

    if( url == "79" )
    {
       get79tv(p.id);
       return;
    }

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

    var xx;
    if( w === "web" ) {
       stv.style.display = "none";
       xx=web;
    }
    else {
       stv.style.display = "block";
       //web.setAttribute( "src", "about:blank" );
       xx=stv;
    }
    if(gi==1 && url.indexOf("tv.trueid.net/embed/") > 0) {
       if(lastTrueCh != url) {
          //lastTrueCh = url;
          window.parentView.showMsg("trueViewLoadUrl:"+url);
       }
       else {
          window.parentView.showMsg("showTrueView");
          window.parentView.showMsg("trueView:play()");
       }
       return;
    }
    else
       xx.setAttribute( "src",  url );
    if( w === "tv" )
    {
       xx.play();
       //showVideoMessage();
    }
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

var request;
var strRes="";
var demostr="";

function gettv(i)
{
   request = new XMLHttpRequest();
   if(!request) {
      alert("Giving up :( Cannot create an XMLHTTP instance");
      return false;
   }
   demostr="";
   //request.onreadystatechange=state_change;
   if(ch[i] == "0")
      return;
   //request.open("GET", path+ch[i], false);
   request.open("GET", adpath, false);
   window.parentView.showMsg( "msg:" + adpath );
   request.setRequestHeader("Access-Control-Allow-Origin","*");
   request.setRequestHeader("Accept","text/html");
   request.setRequestHeader("Content-Type","text/html");
   request.send(null);
   if(!state_change(i))
      return;
   tvaddr[i]=demostr;
}

function setadtv(s) {
   var ssi=s.indexOf('cxid=');
   var eei=s.indexOf('tmpx=',ssi);
   ADsid=s.substring(ssi+5,eei-1);
   window.parentView.showMsg("msg:AD 채널관련 정보가 설정되었습니다=> "+ADsid);
   if(gi==1)
      setTimeout(function(){ x[si].click(); }, 0);
}

function state_change(i) {
   if (request.readyState==4)  { // 4 = "loaded"
      if (request.status==200)  { // 200 = OK
         // ...our code here...
         strRes=request.responseText;
         if(strRes.length<1) {
            document.getElementById("er_msg").innerHTML="에러 안내 : 채널주소 가져오기 실패(비어있는 내용수신)";
            showErrorMessage();
            return false;
         }
         //var ssi=strRes.indexOf("file: \"http");
         var ssi=strRes.indexOf("cxid=");
         //var eei=strRes.indexOf(",",ssi);
         var eei=strRes.indexOf("\"",ssi);
         //strRes=strRes.substring(ssi+7,eei-1);
         strRes=strRes.substring(ssi+5,eei);
         //alert(strRes);
         //demostr=demostr+strRes;
         ADsid = strRes;
         window.parentView.showMsg( "msg:" + ADsid );
         return true;
      }
      else {
         document.getElementById("er_msg").innerHTML="에러 안내 : 채널주소 가져오기 실패 : "+request.status;
         showErrorMessage();
         //demostr="Problem retrieving XML data : "+request.status;
      }
   }
   document.getElementById("er_msg").innerHTML="에러 안내 : 채널주소 가져오기 실패 : "+request.readyState;
   showErrorMessage();
   //demostr="Problem retrieving res data : "+request.readyState;
   return false;
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
