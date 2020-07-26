var ADsid=null;
var ADscript = "javascript:function getsid(){ var s=document.getElementById('TV'); if(s!=null && s!='undefined'){var ss=s.src;if(ss.indexOf('cxid')<0) return; clearInterval(timer); window.adView.showMsg(s.src);} } var timer=setInterval(function(){getsid();},1000);";
var tvaddr=new Array(24);
var addr=[
  ["SBS Golf","SBS Golf","SBS Golf","79","79","79",3],
  ["JTBC Golf","JTBC Golf","JTBC Golf","79","79","79",3],
  ["OCN Movies","OCN Movies","OCN Movies","79","79","79",3],
  ["OCN Original","OCN Original","OCN Original","79","79","79",3],
  ["영화 Screen","영화 Screen","영화 Screen","79","79","79",3],
  ["OCN Thrills","OCN Thrills","OCN Thrills","79","79","79",3],
  ["Catch ON 1","Catch ON 1","Catch ON 1","79","79","79",3],
  ["Catch ON 2","Catch ON 2","Catch ON 2","79","79","79",3],
  ["The Movie","The Movie","The Movie","79","79","79",3],
  ["FOX","FOX","FOX","79","79","79",3],
  ["TV 조선 뉴스","TV 조선 뉴스","TV 조선 뉴스","79","79","http://live.chosun.gscdn.com/live/_definst_/tvchosun3.stream/playlist.m3u8",3],
  ["채널 A 뉴스","채널 A 뉴스","채널 A 뉴스","79","79","79",3],
  ["JTBC 뉴스","JTBC 뉴스","JTBC 뉴스","79","79","79",3],
  ["YTN 뉴스","YTN 뉴스","YTN 뉴스","79","79","79",3],
  ["연합 뉴스","연합 뉴스","연합 뉴스","79","79","79",3],
  ["MBN 뉴스","MBN 뉴스","MBN 뉴스","79","79","79",3],
  ["SBS TV","SBS TV","SBS TV","79","79","79",3],
  ["MBC TV","MBC TV","MBC TV","79","79","79",3],
  ["KBS1 TV","KBS1 TV","KBS1 TV","79","79","79",3],
  ["KBS2 TV","KBS2 TV","KBS2 TV","79","79","79",3],
  ["TVN TV","TVN TV","TVN TV","79","79","79",3],
  ["코미디 TV","코미디 TV","코미디 TV","79","79","79",3],
  ["XtvN TV","XtvN TV","XtvN TV","79","79","79",3],
  ["MNet","MNet","MNet","79","79","79",3]
];

var path= "http://youtv24.net/sites/btmtv/pages/mobile/mobile_view.php?ch=live";
//var path79 = "http://123tv24.com/livetv/player-pc.php?co=01&ch=";
var path79 = "http://youtv24.net/sites/speedtv/pages/pc/pc_view.php?ch=live";
var ch = ['26','37','04','05','28','03','09','35','10','17','33','02','01','34','32','23','14','07','15','13','06','12','11','38' ];
var gi=0;
var si=10;
var oi=0;
var ei=-1;
var asi=[10,0];
var aoi=[0,0];
var full=false;
var timer=null;
var time=0;
var mustabout = 0;
var timeSetTV = 0;
var mustWait = 0;

var web;
var stv;
var tstr;
var isChLoaded=0;
var msgGetCh="채널리스트 구성중";
var oldCurrentTime=0;

$('document').ready(function() {
    $('#menu0').load("https://hshin09.github.io/shinwebtv/kor2.html");
    $('#menu1').load("https://hshin09.github.io/shinwebtv/thai.html");
    stv = $('#tv').get(0);
    web = document.getElementById("web");

    for(var i=0; i<tvaddr.length; i++)
      tvaddr[i]=addr[i][3];
    /*
    window.parentView.showMsg("msg:AD 관련채널의 정보를 요청합니다");
    window.parentView.showMsg("adView:"+ADscript);]
    */
    $('#tv').on('dblclick',(function(){ onFullscreenOnOff(); }));
    $('#tv').on('click',(function(){ onFullscreenOnOff(); }));
    timer = setInterval( function() { OnOff(); }, 500 );
});

function addInput()
{
   var input = document.createElement('input');
   input.type = "password";
   input.id = "pwd";
   input.value = "";
   input.style.position ="absolute";
   input.style.display = "none";
   input.style.top = "50px";
   input.style.left = "50px";
   document.body.appendChild( input );
   $("input").keydown( function(){ $('#pwd').css('display','none'); if(event.which == 49 || event.keyCode == 49){$('#menu1').load('https://hshin09.github.io/shinwebtv/svideo.html'); setTimeout(function(){ mlok(); }, 500);} else {si=0; onFinish();} } );
}

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
          if(timer) {
            clearInterval(timer);
            timer=null;
      	  }
          isChLoaded = 1;
          //window.parentView.showMsg( "hiddenView:make()" );
          mlok();
          addInput();
       }
       return;
    }

    time++;
    tstr="";
    if(time<10)
      tstr="0";
    tstr=tstr+time;
    $('#sec').text( tstr );
    /*
    if( mustWait )
    {
       mustWait--;
       if( !mustWait )
          setTimeout(function(){onok();},0);
       return;
    }
    */
    if( stv.error != null || stv.networkState == 3 || ( time > 30 && stv.currentTime < 2 ) )
    {
        if( $('#errorMessage').css('display') != "block" ) {
          $("#er_msg").text( "에러 안내 : 채널을 가져올수 없음(네트워크 또는 서버 에러)" );
          showErrorMessage();
        }
        if(isNotUser<2) {
          ei=si;
          if( gi == 0 )
          {
             window.parentView.showMsg( "hiddenView:loadTV('" + path + ch[ei] + "')" );
             mustWait = 3;
             mustabout = 1;
             timeSetTV=2000;
             clearAddress(addr[ei][addr[ei][6]]);
             //return;
             //if( !mustWait )
                setTimeout(function(){ onok(); }, timeSetTV);
          }
          isNotUser++;
        }
        else {
          if(timer) {
            clearInterval(timer);
            timer=null;
          }
          $("#er_msg").text( "기본/보조서버 모두 에러(다른체널로 바꿔보세요)-1" );
          showErrorMessage();
          isNotUser=0;
        }
    }
    else if( $('#secMessage').css('display')=="block" && stv.currentTime > 1 )
    {
        $('#secMessage').css('display', 'none');
        if( mustabout ) {
           window.parentView.showMsg( "hiddenView:loadTV('http://youtv24.net/sites/')" );
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
        timer = setInterval( function() { OnOff(); }, 15000 );
        setTimeout(function(){ oldCurrentTime = stv.currentTime; },500);
        return;
    }

    if(oldCurrentTime>0) 
    {
      if(oldCurrentTime==stv.currentTime) 
      {
        if(isNotUser<2) 
        {
          ei=si;
          if( gi == 0 )
          {
             window.parentView.showMsg( "hiddenView:loadTV('" + path + ch[ei] + "')" );
             mustWait = 3;
             mustabout = 1;
             timeSetTV=2000;
             clearAddress(addr[ei][addr[ei][6]]);
             //return;
             //if( !mustWait )
                setTimeout(function(){ onok(); }, timeSetTV);
          }
          isNotUser++;
        }
        else 
        {
          if(timer) 
          {
            clearInterval(timer);
            timer=null;
            if( mustabout ) {
                window.parentView.showMsg( "hiddenView:loadTV('http://youtv24.net/sites/')" );
                mustWait = 0;
                mustabout = 0;
            }
          }
          $("#er_msg").text( "기본/보조서버 모두 에러(다른체널로 바꿔보세요)-2" );
          showErrorMessage();
          isNotUser=0;
        }
      }
      else 
      {
        oldCurrentTime = stv.currentTime;
        time+=10;
      }
    }
}

function clearAddress(tar) {
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

function onFinish() {
  if(gi==1&&si==10) {
    $('#pwd').css('display','block');
    return;
  }
  if(timer)
    clearInterval(timer);
  stv.pause();
  stv.setAttribute( "src",  "" );
  parentView.showMsg("finish");
}

function change() {
	asi[gi]=si;
	aoi[gi]=oi;

	if(gi==0)
		gi=1;
	else
		gi=0;

	si=asi[gi];
	oi=aoi[gi];

	mlok();
  //window.parentView.showMsg("00");
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
    showLeftMenu();
    imsi_oi=oi=-1;
    x[si].click();
}

function onok() {
  if( gi == 0 )
  {
    var i_ch=addr[si][6];

    i_ch++;
    if(i_ch>5)
      i_ch=3;
    tvaddr[si]=addr[si][i_ch];

    x[si].innerHTML=addr[si][i_ch-3];;

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
  else {
    /*
    if( isNotUser>0 && (si==11 || si==13) ) {
      window.parentView.showMsg("adView:javascript:location.reload(true);");
      ADsid=null;
      window.parentView.showMsg("msg:AD 관련채널의 정보를 요청했습니다");
      setTimeout(function(){window.parentView.showMsg("adView:"+ADscript);},2000);
      return;
    }
    */
  }
  oi=-1;
  x[si].click();
}

var imsi_oi=0;
function movieclk( w, url, p ) {
    if(p.id==oi) {
      onok();
      return;
    }
    oldCurrentTime=0;
    stv.pause();
    if( url == null )
    {
          oi=-1;
	  gettv(p.id);
	  setTimeout(function(){ x[p.id].click(); }, 0);
	  return;
    }

    if( url == "79" )
    {
          si = p.id;
          get79tv(si);
	  return;
    }

    stv.volume=1;
    /*
    if( gi==1 && url.substring(0,3)=="ad:") {
      if(ADsid==null) {
        window.parentView.showMsg("msg:AD 관련채널 정보를 아직 얻지 못했으니 잠시후 다시 시도해보세요");
        setTimeout(function(){window.parentView.showMsg("adView:"+ADscript);},2000);
        return;
      }
      else {
        var ss=url.substring(3);
        url = "https://p1.adintrend.tv/live/ch"+ss+"/i/ch"+ss+"i.m3u8?sid="+ADsid;
        stv.volume=0.3;
      }
    }
    */
    if( gi==1 && p.id==x.length-1)
      stv.volume=0.2;

    if( imsi_oi>-1 )
      x[imsi_oi].style="background-color:#252525;color=white";
	  si=p.id;
	  x[si].style="background-color:#234567;color:yellow";
	  imsi_oi=oi=si;

	  var xx;
	  if( w === "web" ) {
	    stv.style.display = "none";
	    xx=web;
	  }
	  else {
	    stv.style.display = "block";
	    web.setAttribute( "src",  "about:blank" );
            xx=stv;
	  }
          
          if(gi==1 && url.indexOf("tv.trueid.net/embed/") > 0) {
             window.parentView.showMsg("trueViewLoadUrl:"+url);
             //window.parentView.showMsg("showTrueView");
             //window.parentView.showMsg("trueView:play()");
             return;
          }
          else
	     xx.setAttribute( "src",  url );
          //window.parentView.showMsg("msg:"+url);
	  if( w === "tv" )
	  {
	     showVideoMessage();
	     xx.play();
	  }
}

function showLeftMenu() {
    if( gi == 1 )
    {
        document.getElementById("menu0").style.display = "none";
        document.getElementById("menu1").style.display = "block";
    }
    else
    {
        document.getElementById("menu0").style.display = "block";
        document.getElementById("menu1").style.display = "none";
    }
}

function onFullscreenOnOff() {
  if( full == false )
  {
      $('#leftmenu').css('display','none');
      full=true;
	}
	else
	{
      $('#leftmenu').css('display','block');
      full=false;
	}
}

function showVideoMessage()
{
    full=false;
    onFullscreenOnOff();
    time = 0;
    if(timer) {
      clearInterval(timer);
      timer=null;
    }
    timer = setInterval( function() { OnOff(); }, 1200 );
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
	request.open("GET", path+ch[i], false);
	request.setRequestHeader("Access-Control-Allow-Origin","*");
	request.setRequestHeader("Accept","text/html");
	request.setRequestHeader("Content-Type","text/html");
	request.send(null);
	if(!state_change(i))
	    return;

	tvaddr[i]=demostr;
}

function get79tv(i) {
  window.parentView.showMsg("79:"+path79+ch[i]);
}

function setHiddenViewTV(s) {
   oi=-1;
   tvaddr[si]=s;
   //if( !mustWait )
      setTimeout(function(){ x[si].click(); }, timeSetTV);
}

function setadtv(s) {
  var ssi=s.indexOf('cxid=');
  var eei=s.indexOf('tmpx=',ssi);
  ADsid=s.substring(ssi+5,eei-1);
  window.parentView.showMsg("msg:AD 채널관련 정보가 설정되었습니다");
  if(gi==1) {
    oi=-1;
    setTimeout(function(){ x[si].click(); }, 0);
  }
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
      var ssi=strRes.indexOf("file: \"http");
      var eei=strRes.indexOf(",",ssi);
			strRes=strRes.substring(ssi+7,eei-1);
			//alert(request.response);
		    demostr=demostr+strRes;
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
       document.getElementById("er_msg").innerHTML="에러 안내 : 비디오 취소됨";
       showErrorMessage();
       //alert('You aborted the video playback.');
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       document.getElementById("er_msg").innerHTML="에러 안내 : 비디오 다운로드 실패(네트워크문제)";
       showErrorMessage();
       //alert('A network error caused the video download to fail part-way.');
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       document.getElementById("er_msg").innerHTML="에러 안내 : 이형식의 비디오를 지원하지 않음";
       showErrorMessage();
       //alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       document.getElementById("er_msg").innerHTML="에러 안내 : 채널을 가져올수 없음(네트워크 또는 서버 에러 또는 형식 미지원)";
       //alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
       showErrorMessage();
       break;
     default:
       document.getElementById("er_msg").innerHTML="에러 안내 : 알려지지않은 문제로 비디오 로드 에러";
       showErrorMessage();
       //alert('An unknown error occurred.');
       break;
   }
}
