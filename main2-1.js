var ADsid=null;
var ADscript = "javascript:function getsid(){ var s=document.getElementById('TV'); if(s!=null && s!='undefined'){var ss=s.src;if(ss.indexOf('cxid')<0) return; clearInterval(timer); window.adView.showMsg(s.src);} } var timer=setInterval(function(){getsid();},1000);";
var tvaddr=new Array(23);
var addr=[
  ["SBS Golf","SBS Golf","SBS Golf","79","79","http://23.237.112.138:9083/live/lmgr218-live1/dp/Ua/dpUaDQ0LwGNqpgVGdLwsrg==/live.m3u8",3],
  ["JTBC Golf","JTBC Golf","JTBC Golf","79","79","http://23.237.112.138:9083/live/lmgr218-live1/uX/0j/uX0j1KJo8eVhWnTx6uvShw==/live.m3u8",3],
  ["OCN Movies","OCN Movies","OCN Movies","79","79","79",3],
  ["OCN Original","OCN Original","OCN Original","79","79","http://23.237.112.138:9083/live/lmgr218-live1/GR/13/GR13XDGjlUsD8nZQasCIhw==/live.m3u8",3],
  ["영화 Screen","영화 Screen","영화 Screen","79","79","79",3],
  ["OCN Thrills","OCN Thrills","채널 차이나","79","79","http://23.237.112.138:9083/live/lmgr218-live1/ut/hX/uthXNC6cyUNTT6dtUu9D6A==/live.m3u8",3],
  ["Catch ON 1","Catch ON 1","Catch ON 1","79","79","http://23.237.112.138:9083/live/lmgr218-live1/Wj/Nz/WjNzluqgVARhAtul5gUKtg==/live.m3u8",3],
  ["TV 조선 뉴스","TV 조선 뉴스","TV 조선 뉴스","79","http://23.237.112.138:9083/live/lmgr218-live1/uN/RW/uNRWY94bN9uq-H4U6-AdGA==/live.m3u8","http://live.chosun.gscdn.com/live/_definst_/tvchosun3.stream/playlist.m3u8",3],
  ["채널 A 뉴스","채널 A 뉴스","채널 A 뉴스","79","79","http://23.237.112.138:9083/live/lmgr218-live1/5e/F8/5eF872HRwPbsKyyeCGBSQg==/live.m3u8",3],
  ["JTBC 뉴스","JTBC 뉴스","JTBC 뉴스","79","79","http://23.237.112.138:9083/live/lmgr218-live1/1k/C9/1kC9miPHbLuH_Xohzycp8g==/live.m3u8",3],
  ["YTN 뉴스","YTN 뉴스","EBS1","79","79","http://ebsonair.ebs.co.kr:1935/groundwavefamilypc/familypc1m/chunklist_w135830683.m3u8",3],
  ["SBS TV","SBS TV","SBS TV","79","79","http://msl.tvbayoplus.com:9083/live/lmgr218-live1/an/Ec/anEch5GmlJzMh-jcs1OTow==/live.m3u8",3],
  ["MBC TV","MBC TV","MBC TV","79","79","http://msl.tvbayoplus.com:9083/live/lmgr218-live1/yo/Kz/yoKzy5jIzhPSc34OXb26Hg==/live.m3u8",3],
  ["KBS1 TV","KBS1 TV","KBS1 TV","79","79","http://msl.tvbayoplus.com:9083/live/lmgr218-live1/Z1/ck/Z1ckFeyBo9VzK1DFmR1-Hw==/live.m3u8",3],
  ["KBS2 TV","KBS2 TV","KBS2 TV","79","79","http://msl.tvbayoplus.com:9083/live/lmgr218-live1/GJ/qP/GJqPMui6DQrYctmZxQDeig==/live.m3u8",3],
  ["TVN TV","TVN TV","TVN TV","79","79","http://23.237.112.138:9083/live/lmgr218-live1/F8/6x/F86xTagKpWyjsAWhpFhRYQ==/live.m3u8",3],
  ["코미디 TV","코미디 TV","코미디 TV","79","79","79",3],
  ["XtvN TV","XtvN TV","XtvN TV","79","79","79",3],
  ["Xstream","Xstream","투니버스","79","79","http://23.237.112.138:9083/live/lmgr218-live1/iz/El/izElYP02-6dsroN6VHX4hw==/live.m3u8",3],
  ["MBN 뉴스","MBN 뉴스","MBN 뉴스","79","79","http://23.237.112.138:9083/live/lmgr218-live1/j7/qy/j7qybKo1-oIO_R2EKcmcIA==/live.m3u8",3],
  ["MNet","MNet","MNet","79","79","http://23.237.112.138:9083/live/lmgr218-live1/DD/kh/DDkhewBlWWfGWPVkTkDWNA==/live.m3u8",3],
  ["FOX","FOX","FOX","79","79","79",3],
  ["The Movie","The Movie","The Movie","79","79","79",3]
];


var gi=0;
var si=7;
var oi=0;
var ei=-1;
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
   input.style.display = "block";
   input.style.top = "50px";
   input.style.left = "50px";
   document.body.appendChild( input );
   $("input").keydown( function(){if(event.which == 13){ if( $('#pwd').value == '1438'){alert('1438');} }} );
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
          path79 = path;
          ch[21] = "17";
          ch[22] = "10";
          addInput();
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

    if( stv.error != null || stv.networkState == 3 || ( time > 20 && stv.currentTime < 2 ) )
    {
        if( $('#errorMessage').css('display') != "block" ) {
          $("#er_msg").text( "에러 안내 : 채널을 가져올수 없음(네트워크 또는 서버 에러)" );
          showErrorMessage();
        }
        if(isNotUser<2) {
          ei=si;
          clearAddress(addr[ei][addr[ei][6]]);
          onok();
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
        }
    }
    else if( $('#secMessage').css('display')=="block" && stv.currentTime > 2 )
    {
        $('#secMessage').css('display', 'none');
    }
    else if( $('#videoMessage').css('display')=="block" && stv.currentTime > 4 )
    {
        isNotUser=0;
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
        if(isNotUser<2) {
          ei=si;
          clearAddress(addr[ei][addr[ei][6]]);
          onok();
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
        }
      }
      else {
        oldCurrentTime = stv.currentTime;
        time+=10;
      }
    }
}

function clearAddress(tar) {
  if(tar!=null && tar!="79")
    return;

  for(var i=0; i<tvaddr.length; i++) {
    if(addr[i][addr[i][6]]==tar) {
        tvaddr[i]=tar;
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

function set79tv(s) {
  //window.parentView.showMsg("msg:"+s);
  oi=-1;
  tvaddr[si]=s;
  setTimeout(function(){ x[si].click(); }, 0);
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
