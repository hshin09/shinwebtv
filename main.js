window.onkeydown = keychk;
var tvaddr=new Array(18);
var gi=0;
var si=7;
var oi=0;
var ei=7;
var asi=[7,12];
var aoi=[-1,-1];
var aei=[7,12];
var full=false;
var timer;
var time = 0;

var web;
var stv;
var tstr;
var isChLoaded=0;
var msgGetCh="채널리스트 구성중";

$('document').ready(function() {
    $('#menu0').load("https://hshin09.github.io/shinwebtv/kor.html");
    $('#menu1').load("https://hshin09.github.io/shinwebtv/thai.html");
    stv = $('#tv').get(0);
    web = document.getElementById("web");
    timer = setInterval( function() { OnOff(); }, 1000 );
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

function OnOff()
{
    if( !isChLoaded )
    {
        $('#secMessage').css('display', 'block');
        msgGetCh = msgGetCh + ".";
        $('#sec').text( msgGetCh );
        x=document.getElementById("ml"+gi).getElementsByTagName("li");
	    if( x.length>0 )
	    {
	        isChLoaded = 1;
	        mlok();
	    }
        return;
    }

    if( time++ > 29 ) {
        clearInterval(timer);
        return;
    }

    tstr="";
    if(time<10)
        tstr="0";
    tstr=tstr+time;
    $('#sec').text( tstr );

    if( stv.error != null || stv.networkState == 3 || ( time > 19 && stv.currentTime < 2 ) )
    {
        if( $('#errorMessage').css('display')=="block" )
            return;
        $("#er_msg").text( "에러 안내 : 채널을 가져올수 없음(네트워크 또는 서버 에러)" );
        showErrorMessage();
    }
    else if( $('#secMessage').css('display')=="block" && stv.currentTime > 1 )
    {
        $('#secMessage').css('display', 'none');
    }
    else if( $('#videoMessage').css('display')=="block" && stv.currentTime > 4 )
    {
        $('#videoMessage').css('display', 'none');
    }
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
		else if(e.which == 13 && gi == 0) {
		    tvaddr[si] = null;
		    gettv(si);
	        x[si].click();
		}
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
		leftMenuObj.style['transform'] = "translate(0px, -520px)";
		leftMenuObj.style['msTransform'] = "translate(0px, -520px)";
		leftMenuObj.style['mozTransform'] = "translate(0px, -520px)";
		leftMenuObj.style['webkitTransform'] = "translate(0px, -520px)";
		leftMenuObj.style['oTransform'] = "translate(0px, -520px)";
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
        /*
		if(p.id==ei) {
			onleft();
			return;
		}
		*/
    stv.pause();
    if( url == null )
	  {
	        gettv(p.id);
	        setTimeout(function(){ x[p.id].click(); }, 0);
	        return;
	  }
	  if(oi>-1) x[oi].style="background-color:#252525;";
	  if(ei>-1) x[ei].style="background-color:#252525";
	  si=ei=p.id;
	  x[ei].style="background-color:#234567;color:yellow";
	  oi=si;

	  var xx;
	  if( w === "web" ) {
	    stv.style.display = "none";
	    xx=web;
	  }
	  else {
	    stv.style.display = "block";
	    web.setAttribute( "src",  "about:blank" );
	  }

	 xx.setAttribute( "src",  url );
	 if( w === "tv" )
	 {
	    showVideoMessage();
	    stv.play();
	 }
}

function showVideoMessage()
{
    time = 0;
    $('#sec').text( "00" );
    timer = setInterval( function() { OnOff(); }, 1000 );
    closeErrorMessage();
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

function playedVideo()
{
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

function gettv_all()
{
    request = new XMLHttpRequest();
	if(!request) {
		alert("Giving up :( Cannot create an XMLHTTP instance");
		return false;
	}

	demostr="";
	//request.onreadystatechange=state_change;
	var i;
	for(i=0;i<ch.length;i++) {
		if(ch[i] == "0") {
			demostr=demostr+",";
			continue;
		}
		if(i>0) {
			demostr=demostr+",";
		}
		request.open("GET", path+ch[i], false);
		request.setRequestHeader("Access-Control-Allow-Origin","*");
		request.setRequestHeader("Accept","text/html");
		request.setRequestHeader("Content-Type","text/html");
		request.send(null);
		if(!state_change(i)) break;
	}
	tvaddr=demostr.split(",");
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
			var si=strRes.indexOf("https://www");
			var ei=strRes.indexOf(",",si);
			strRes=strRes.substring(si,ei-1);
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
