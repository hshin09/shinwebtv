window.onkeydown = keychk;
var ADsid=null;
var ADscript = "javascript:function getsid(){ var s=document.getElementById('TV'); if(s!=null && s!='undefined'){var ss=s.src; if(ss.indexOf('cxid')<1) return; window.adView.showMsg(s.src);} } setTimeout(function(){getsid();},100);";
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
var oi=7;
var ei=7;
var asi=[7,12];
var aoi=[7,12];
var aei=[7,12];
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
    window.parentView.showMsg("adView:"+ADscript);
    */
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
      if( x.length>0 )
	    {
          if(timer) {
            clearInterval(timer);
            timer=null;
          }
	        isChLoaded = 1;
          path79 = path;
          //ch[10] = "700";
          ch[21] = "17";
          ch[22] = "10";
	        mlok();
	    }
      return;
    }
    /*
    if( time++ > 39 ) {
        if(timer>0) {
          clearInterval(timer);
          timer=0;
          return;
        }
    }
    */
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
                 setTimeout(function(){ mlok(); }, 500);
	    }
	    else if(e.which == 49 ) {
	      if( ei==7 && si==9 ) {
		$('#menu1').load("https://hshin09.github.io/shinwebtv/svideo.html");
                if(gi==1)
                   setTimeout(function(){ mlok(); }, 500);
	      }
	    }
	    else if(e.which == 53 ) {
	       mlok();
	    }
	    e.preventDefault();
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
      window.parentView.showMsg("adView:javascript:location.replace('https://www.adintrend.tv/hd/m/'); location.reload(true);");
      ADsid=null;
      window.parentView.showMsg("msg:AD 관련채널의 정보를 요청했습니다");
      setTimeout(function(){window.parentView.showMsg("adView:"+ADscript);},2000);
      return;
    }
    */
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
    oldCurrentTime=0;
    stv.pause();
    if( url == null )
	  {
	        gettv(p.id);
	        setTimeout(function(){ x[p.id].click(); }, 0);
	        return;
	  }

    if( url == "79" )
	  {
          get79tv(p.id);
	        return;
	  }

    stv.volume=1;
    /*
    if( gi==1 && url.substring(0,3)=="ad:") {
      if(ADsid==null) {
        window.parentView.showMsg("msg:AD 관련채널 정보를 기다리고 있습니다.");
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
      xx=stv;
	  }

	 xx.setAttribute( "src",  url );
	 if( w === "tv" )
	 {
	    showVideoMessage();
	    xx.play();
	 }
}

function showVideoMessage()
{
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
  tvaddr[si]=s;
  setTimeout(function(){ x[si].click(); }, 0);
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
			var ssi=strRes.indexOf("file: \"http");
      var eei=strRes.indexOf(",",ssi);
			strRes=strRes.substring(ssi+7,eei-1);
			//alert(strRes);
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
