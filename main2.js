var tvaddr=new Array(18);
var addr=[
["SBS Golf","http://50.7.118.178:9083/live/lmgr218-live1/dp/Ua/dpUaDQ0LwGNqpgVGdLwsrg==/live.m3u8",null,1],
["JTBC Golf","http://23.237.112.138:9083/live/lmgr218-live1/uX/0j/uX0j1KJo8eVhWnTx6uvShw==/live.m3u8",null,1],
["영화 CGV",null,null,0],
["영화 OCN","http://50.7.118.178:9083/live/lmgr218-live1/GR/13/GR13XDGjlUsD8nZQasCIhw==/live.m3u8",null,1],
["영화 Screen",null,null,0],
["채널 차이나",null,"http://23.237.112.138:9083/live/lmgr218-live1/ut/hX/uthXNC6cyUNTT6dtUu9D6A==/live.m3u8",1],
["Catch ON 1","http://50.7.118.178:9083/live/lmgr218-live1/Wj/Nz/WjNzluqgVARhAtul5gUKtg==/live.m3u8",null,1],
["TV 조선 뉴스","http://23.237.112.138:9083/live/lmgr218-live1/uN/RW/uNRWY94bN9uq-H4U6-AdGA==/live.m3u8",null,1],
["MBN 뉴스",null,"http://23.237.112.138:9083/live/lmgr218-live1/j7/qy/j7qybKo1-oIO_R2EKcmcIA==/live.m3u8",1],
["JTBC 뉴스","http://50.7.118.178:9083/live/lmgr218-live1/1k/C9/1kC9miPHbLuH_Xohzycp8g==/live.m3u8",null,1],
["EBS1",null,"http://50.7.118.178:9083/live/lmgr218-live1/Y7/kd/Y7kdN2a2F8joMgdxPBzaAQ==/live.m3u8",1],
["SBS TV","http://50.7.118.178:9083/live/lmgr218-live1/an/Ec/anEch5GmlJzMh-jcs1OTow==/live.m3u8",null,1],
["MBC TV","http://50.7.118.178:9083/live/lmgr218-live1/yo/Kz/yoKzy5jIzhPSc34OXb26Hg==/live.m3u8",null,1],
["KBS1 TV","http://23.237.112.138:9083/live/lmgr218-live1/Z1/ck/Z1ckFeyBo9VzK1DFmR1-Hw==/live.m3u8",null,1],
["KBS2 TV","http://50.7.118.178:9083/live/lmgr218-live1/GJ/qP/GJqPMui6DQrYctmZxQDeig==/live.m3u8",null,1],
["MNet TV","http://www.pickcom.co.kr:1935/sjp/live26/playlist.m3u8","http://50.7.118.178:9083/live/lmgr218-live1/DD/kh/DDkhewBlWWfGWPVkTkDWNA==/live.m3u8",1],
["코미디 TV","http://www.pickcom.co.kr:1935/sjp/live26/playlist.m3u8",null,0],
["XtvN TV",null,null,0]
];

var gi=0;
var si=7;
var oi=0;
var asi=[7,12];
var aoi=[0,0];
var full=false;
var timer=null;
var time=0;

var web;
var stv;
var tstr;
var isChLoaded=0;
var msgGetCh="채널리스트 구성중";
var oldCurrentTime=0;

$('document').ready(function() {
    $('#menu0').load("https://hshin09.github.io/shinwebtv/kor.html");
    $('#menu1').load("https://hshin09.github.io/shinwebtv/thai.html");
    stv = $('#tv').get(0);
    web = document.getElementById("web");
    for(var i=0; i<tvaddr.length; i++)
      tvaddr[i]=addr[i][1];
    $('#tv').on('dblclick',(function(){ onFullscreenOnOff(); }));
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

var cntChange=0;
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
	        mlok();
	    }
      return;
    }

    time++;
    tstr="";
    if(time<10)
      tstr="0";
    tstr=tstr+time;
    $('#sec').text( tstr );

    if( stv.error != null || stv.networkState == 3 || ( time > 25 && stv.currentTime < 2 ) )
    {
        if( $('#errorMessage').css('display') != "block" ) {
          $("#er_msg").text( "에러 안내 : 채널을 가져올수 없음(네트워크 또는 서버 에러)" );
          showErrorMessage();
        }
        if(cntChange<3)
          onok();
    }
    else if( $('#secMessage').css('display')=="block" && stv.currentTime > 2 )
    {
        $('#secMessage').css('display', 'none');
    }
    else if( $('#videoMessage').css('display')=="block" && stv.currentTime > 4 )
    {
        $('#videoMessage').css('display', 'none');
        if(timer) {
          clearInterval(timer);
          timer=null;
        }
        timer = setInterval( function() { OnOff(); }, 15000 );
        setTimeout(function(){ oldCurrentTime = stv.currentTime; },500);
        return;
    }
    if(oldCurrentTime>0) {
      if(oldCurrentTime==stv.currentTime) {
        if(cntChange<3)
          onok();
      }
      else {
        oldCurrentTime = stv.currentTime;
        time+=10;
      }
    }
}

function onFinish() {
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
}

var x;
var cnt;
function mlok() {
    cntChange++;
  	x=document.getElementById("ml"+gi).getElementsByTagName("li");
  	cnt=x.length;
  	var i;
  	for(i=0; i<cnt; i++) {
  		x[i].id=i;
    }
  	showLeftMenu();
    oi=-1;
    x[si].click();
}

function onok() {
  if( gi == 0 )
  {
    var i_ch=addr[si][3];
    var change_name;
    if(i_ch != 0) { //보조 또는 대체 채널이 있음
      if(i_ch == 1)  //본채널이었다면 보조채널로
        i_ch=2;
      else  //보조채널이었다면 본채널로
        i_ch=1;

      change_name=x[si].innerHTML;
      x[si].innerHTML=addr[si][0];
      addr[si][0]=change_name;
      tvaddr[si]=addr[si][i_ch];
      addr[si][3]=i_ch;
      if(i_ch==1)
        window.parentView.showMsg("msg:기본서버("+x[si].innerHTML+") 로 이동합니다");
      else
        window.parentView.showMsg("msg:보조서버("+x[si].innerHTML+") 로 이동합니다");
    }

    if(tvaddr[si] == null)
      gettv(si);
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
	        gettv(p.id);
	        setTimeout(function(){ x[p.id].click(); }, 0);
	        return;
	  }
    cntChange=0;
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

	  xx.setAttribute( "src",  url );
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
			var ssi=strRes.indexOf("https://www");
			var eei=strRes.indexOf(",",ssi);
			strRes=strRes.substring(ssi,eei-1);
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
