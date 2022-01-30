var userNames = [ "Shin" ];
var ADsid = '?';
var tvaddr = new Array(24);
var backtvaddr = new Array(24);
var backkakotvaddr = new Array(24);
var kakoSer = ['44', '51', '61'];
var iKakoSer = 0;
var isChangeSer = 0;
var addr = [
  ["SBS Golf", "SBS Golf", "SBS Golf", "/SBS%EA%B3%A8%ED%94%84%20HD-197", "79", "79", 3],
  ["JTBC Golf", "JTBC Golf", "JTBC Golf", "/J%20%EA%B3%A8%ED%94%84%20HD-198", "79", "79", 3],
  ["OCN Movies", "OCN Movies", "OCN Movies", "/OCN%20Movies-100", "79", "79", 3],
  ["OCN Original", "OCN Original", "OCN Original", "/OCN-97", "79", "79", 3],
  ["OCN Thrills", "OCN Thrills", "OCN Thrills", "/OCN%20Thrills-99", "79", "79", 3],
  ["영화 Screen", "중화 TV", "영화 Screen", "79", "/%EC%A4%91%ED%99%94%20TV-101", "79", 3],
  ["Catch ON 1", "바둑 TV", "Catch ON 1", "79", "/%EB%B0%94%EB%91%91TV-104", "79", 3],
  ["Catch ON 2", "EBS1", "Catch ON 2", "79", "/EBS1-113", "79", 3],
  ["The Movie", "CNN", "The Movie", "web/YD5QFxaS3v", "/CNN-173", "79", 3],
  ["NOW", "BBC", "NOW", "79", "/BBC-174", "79", 3],
  ["TV 조선 뉴스", "TV 조선 뉴스", "TV 조선 뉴스", "/TV%20%EC%A1%B0%EC%84%A0-77", "79", "79", 3],
  ["채널 A 뉴스", "채널 A 뉴스", "채널 A 뉴스", "/%EC%B1%84%EB%84%90a-78", "79", "79", 3],
  ["JTBC 뉴스", "JTBC 뉴스", "JTBC 뉴스", "/jtbc-76", "79", "79", 3],
  ["YTN 뉴스", "YTN 뉴스", "YTN 뉴스", "/YTN-80", "79", "79", 3],
  ["연합 뉴스", "연합 뉴스", "연합 뉴스", "/%EB%89%B4%EC%8A%A4y-81", "79", "79", 3],
  ["MBN 뉴스", "MBN 뉴스", "MBN 뉴스", "/MBN%20HD-189", "79", "79", 3],
  ["SBS TV", "SBS TV", "SBS TV", "/SBS%20HD-185", "79", "79", 3],
  ["MBC TV", "MBC TV", "MBC TV", "/MBC%20HD-184", "79", "79", 3],
  ["KBS1 TV", "KBS1 TV", "KBS1 TV", "/KBS1%20HD-182", "79", "79", 3],
  ["KBS2 TV", "KBS2 TV", "KBS2 TV", "/KBS2%20HD-183", "79", "79", 3],
  ["GeoGraphic", "GeoGraphic", "GeoGraphic", "/%EB%82%B4%EC%85%94%EB%84%90%EC%A7%80%EC%98%A4%EA%B7%B8%EB%9E%98%ED%94%BD-107", "79", "79", 3],
  ["Discovery", "Discovery", "Discovery", "/%EB%94%94%EC%8A%A4%EC%BB%A4%EB%B2%84%EB%A6%AC-108", "79", "79", 3],
  ["History", "History", "History", "/HISTORY-265", "79", "79", 3],
  ["MNet", "MNet", "MNet", "/M-NET-96", "79", "79", 3]
];

var touchscreen = 0;
var trueHostUrl = "http://www.youtv24.net";
var trueLoadUrl = trueHostUrl + "/sites";
//trueLoadUrl = "https://v1.tvchak.com/a";
var path = trueLoadUrl + "/mstv/pages/pc/pc_view.php?ch=live";
var pathTvChak = "https://asia.allyearcdn.com/player/live/?g=";
var optTvChak = "&q=0&sports=false";
var ch = ['26', '37', '04', '05', '03', '25', '09', '35', '30', '17', '33', '02', '01', '34', '32', '23', '14', '07', '15', '13', '50', '46', '49', '38'];
var gi = 0;
var si = 10;
var oi = 10;
var ei = 10;
var di = 14;
var asi = [10, 4, 2, 2];
var aoi = [10, 4, 2, 2];
var aei = [10, 4, 2, 2];
var adi = [14, 2, 14, 14];
var alc = [10, 4, 2, 2];
var full = false;
var timer = null;
var time = 0;
var trans = 100;
var mustabout = 0;
var timeSetTV = 500;
var mustWait = 0;
var isHotKey = 0;
var isNotUser = 0;
var lastCh = -1;
var youtv24 = 0;
var tvchak = 0;
var svideo = 0;
var x;
var cnt;
var nErr = 0;
var web;
var stv;
var stv1;
var tstr;
var isChLoaded = 0;
var msgGetCh = "채널리스트 구성중";
var lasturl = "";
var displayMenu = 0;

//window.onload = function() {
   window.parentView.showMsg("hiddenView:getADsid()");
   Init();
//}

function setADsid(sid) 
{
   ADsid = sid;
}

function getPath() 
{
   window.parentView.showMsg( "trueView:setPath('" + path + "')" );
}

function Init() 
{
   var ls,ich;
   if(timer) {
      clearInterval(timer);
      timer = null;
   }
   youtv24 = 1;
   firstSetting();
   window.parentView.showMsg("trueViewLoadUrl:" + trueLoadUrl);
   window.parentView.showMsg("hideTrueView");

   $('#menu0').load("https://hshin09.github.io/shinwebtv/kor2.html");
   $('#menu1').load("https://hshin09.github.io/shinwebtv/thai.html");

   if(document.getElementById('menux')) {
      $('#menux').load("https://hshin09.github.io/shinwebtv/tvchak.html");
      $("#menux").css('display', 'none');
   }

   stv = $('#tv').get(0);
   stv1 = $('#tv1').get(0);
   web = document.getElementById("web");

   ls = localStorage.getItem("userName" );
   if( ls == null || ls == "" ) {
      ls = prompt("사용자 이름을 입력하세요", "");
      localStorage.setItem("userName", ls);
   }
   checkUser(ls);
   
   for(var i = 0; i < tvaddr.length; i++) {      
      ls = localStorage.getItem("youtv"+i );
      if( ls == null || ls == "" ) ls = "79";
      backtvaddr[i] = ls;

      ls = localStorage.getItem("kakotv"+i );
      if( ls == null || ls == "" ) ls = "/"
      backkakotvaddr[i] = ls;
      //window.parentView.showMsg("msg:"+i+" = "+ls);

      ich = addr[i][6];
      //addr[i][ich] = '79'; mustWait = 2;
      tvaddr[i] = addr[i][ich];
      
      if(addr[i][ich] == "79" && backtvaddr[i] != "79")
         tvaddr[i] = backtvaddr[i];
      else if(addr[i][ich].substr(0,1) == "/" && backkakotvaddr[i] != "/")
         tvaddr[i] = backkakotvaddr[i];
   }
   ls = localStorage.getItem("ei" );
   if( ls && ls != "" )
      ei = si = ls;
   //window.parentView.showMsg("msg:loadStorage end");
   timer = setInterval(function() {
      OnOff();
   }, 500);
}

function checkUser(user)
{
   for(var i=0; i<userNames.length; i++ )
      if( userNames[i] == user)
         return;
   window.parentView.showMsg("msg:"+user+"님은 허가된 사용자가 아닙니다");
   window.parentView.showMsg("finish");
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

var isNotUser = 0;

function OnOff() 
{
   if( !isChLoaded ) {
      $('#secMessage').css('display', 'block');
      msgGetCh = msgGetCh + ".";
      $('#sec').text(msgGetCh);
      x = document.getElementById("ml" + gi).getElementsByTagName("li");
      if(x.length == tvaddr.length) {
         trans = x.length * screen.height * 0.041;
         if(timer) {
            clearInterval(timer);
            timer = null;
         }
         isChLoaded = 1;
         //window.parentView.showMsg("msg:isChLoaded end");
         setTimeout(function() {
            premlok();
         }, 500);
         
         window.parentView.showMsg("trueView:path = " + path);
      }
      return;
   }

   time++;
   tstr = "";
   if(time < 10)
      tstr = "0";
   tstr = tstr + time;
   $('#sec').text(tstr);

   if(mustWait) {
      mustWait--;
      if(mustWait == 0 && isChangeSer == 0)
         setTimeout(function(){onok();}, 10);
      return;
   }

   if(stv.error != null || stv.networkState == 3 || (time > 15 && stv.currentTime < 1)) {
      if(stv.src.substring(0, 4) == "file")
         return;
      if($('#errorMessage').css('display') != "block") {
         $("#er_msg").text("채널을 가져올수 없음(네트워크 또는 서버 에러)-Timer");
         showErrorMessage();
      }
      if(isNotUser < 0) {
         if(gi == 0) {
            mustabout = 1;
            timeSetTV = 500;
         }
         isNotUser++;
      } else {
         if(timer) {
            clearInterval(timer);
            timer = null;
         }
         $("#er_msg").text("기본/보조서버 모두 에러(다른체널로 바꿔보세요)");
         showErrorMessage();
         isNotUser = 0;
         if(gi == 0) {
            var ich = addr[ei][6];
            if(addr[ei][ich] == '79') {
               //addr[ei][6] = ich-1;
               clearAddress(addr[ei][ich]);
               addr[ei][6] = ich-1;
            }
            else {
            	if(nErr++ < 2) {
            	   addr[ei][6] = ich-1;
            	}
            }
            setTimeout(function(){onok();}, timeSetTV);
         }
      }
   }

   if($('#secMessage').css('display') == "block" && stv.currentTime > 1) {
      $('#secMessage').css('display', 'none');
      nErr = 0;
      if(mustabout) {
         //window.parentView.showMsg( "hiddenView:loadTV('http://youtv24.net/sites/')" );
         mustWait = 0;
         mustabout = 0;
      }
   }

   if($('#videoMessage').css('display') == "block" && stv.currentTime > 1) {
      isNotUser = 0;
      $('#videoMessage').css('display', 'none');
      if(timer) {
         clearInterval(timer);
         timer = null;
         timeSetTV = 0;
      }
      return;
   }
}

function showTime() 
{
   var dt = new Date();
   var sctime = "";

   if(dt.getHours() < 10)
      sctime += "0";
   sctime += dt.getHours();
   sctime += ":";
   if(dt.getMinutes() < 10)
      sctime += "0";
   sctime += dt.getMinutes();

   $('#ch_name').text(sctime + " - " + x[ei].innerHTML);
   $("#videoMessage").css('display', 'block');
   setTimeout(function() {
      $("#videoMessage").css('display', 'none');
   }, 3000);
}

function get79tv(i) 
{
   ei = i;
   stv.pause();
   stv.src = "empty";
   $("#ch_name").text(x[ei].innerHTML + "(검색중)");
   $("#videoMessage").css('display', 'block');
   var url = path + ch[ei];
   window.parentView.showMsg("trueView:loadVideo(1,'" + url + "')");
}

function getkakotv(i, url) 
{
   ei = i;
   stv.pause();
   stv.src = "empty";
   $("#ch_name").text(x[ei].innerHTML + "(검색중)");
   $("#videoMessage").css('display', 'block');   
   window.parentView.showMsg( "hiddenView:loadVideo('" + kakoSer[iKakoSer]+ "','" + url + "')" );
   if(isChangeSer == 1)
      mustWait = 2;
}

function setkakotv(s) 
{
   isChangeSer = 0;
   oi = -1;
   if(s == "timeout") {
      $("#er_msg").text("서버가 응답이 없어 일정시간(2분내외) 대기 및 재시도를 진행합니다.");
      showErrorMessage();
      mustWait = 10;
      return;
   }

   if(s.length < 1) {
      setTimeout(function() {
               onok();
            }, 500);
      return;
   }
   backkakotvaddr[ei] = tvaddr[ei] = s;
   localStorage.setItem("kakotv"+ei,s); 
   mustWait = 0;
   setTimeout(function() {
      x[ei].click();
   }, 10);
}

function setHiddenViewTV(s) 
{
   oi = -1;
   if(s == "timeout") {
      $("#er_msg").text("서버가 응답이 없어 일정시간(2분내외) 대기 및 재시도를 진행합니다.");
      showErrorMessage();
      mustWait = 10;
      return;
   }
   backtvaddr[ei] = tvaddr[ei] = s;
   localStorage.setItem("youtv"+ei,s);
   mustWait = 0;
   setTimeout(function() {
      x[ei].click();
   }, 10);
}

function clearAddress(tar) 
{
   var ich = addr[ei][6];
   if( addr[ei][ich] == "79" ) {
      backtvaddr[ei] = tvaddr[ei] = tar;
      //x[ei].click();
   }
   else {
      //window.parentView.showMsg("msg:ich = " + ich + " => " + addr[ei][ich] );
      backkakotvaddr[ei] = "/";
      tvaddr[ei] = addr[ei][ich];
      mustWait = 5;
      window.parentView.showMsg( "hiddenView:reloginkakotv()" );
   }
}

function change() 
{
   asi[gi] = si;
   aei[gi] = ei;
   aoi[gi] = oi;
   adi[gi] = di;
   alc[gi] = lastCh;

   if(gi == 0)
      gi = 1;
   else
      gi = 0;

   si = asi[gi]; 
   ei = aei[gi];
   oi = aoi[gi];
   di = adi[gi];
   lastCh = alc[gi];

   mlok();
   si = asi[gi];
   ei = aei[gi];
   oi = aoi[gi];
   di = adi[gi];
   lastCh = alc[gi];

   if(si > -1) x[si].style = "background-color:#234567";
   if(ei > -1) {
      if(si == ei)
         x[ei].style = "background-color:#234567;color:yellow";
      else
         x[ei].style = "background-color:#252525;color:yellow";
   }
}

function onok() 
{
   isHotKey = 1;
   if(ei > -1) x[ei].style = "background-color:#252525";
   if(gi == 0 && tvchak == 0) {
      var i_ch = addr[si][6];

      i_ch++;
      if(i_ch > 4)
         i_ch = 3;

      tvaddr[si] = addr[si][i_ch];
      if(addr[si][i_ch] == "79" && backtvaddr[si] != "79")
         tvaddr[si] = backtvaddr[si];

      if(addr[si][i_ch].substr(0,1) == "/" && backkakotvaddr[si] != "/")
         tvaddr[si] = backkakotvaddr[si];

      x[si].innerHTML = addr[si][i_ch - 3];

      addr[si][6] = i_ch;
      if(i_ch == 3)
         window.parentView.showMsg("msg:기본서버(" + x[si].innerHTML + ") 로 이동합니다");
      else
         window.parentView.showMsg("msg:" + (i_ch - 2) + "번 보조서버(" + x[si].innerHTML + ") 로 이동합니다");

      if(tvaddr[si] == "79") {
         get79tv(si);
         return;
      }

      if(tvaddr[si].substr(0,1) == "/") {
         getkakotv(si, tvaddr[si]);
         return;
      }
   }
   oi = -1;
   x[si].click();
}

function loginProcess()
{
   if( isChLoaded == 0 ) {
      init();
      return;
   }
   if( displayMenu == 0 )
      mlok();
   else
      mlclk();
}

function mlok()
{
   premlok();
   mlclk()
}

function premlok() 
{
   oi = -1;
   x = document.getElementById("ml" + gi).getElementsByTagName("li");
   cnt = x.length;
   var i;
   for(i = 0; i < cnt; i++) {
      x[i].id = i;
   }

   showLeftMenu();
   displayMenu = 1;
}

function mlclk()
{
   if(!touchscreen) {
      if(ei > -1) {
         si = ei;
         ei = -1;
         onleft();
         ei = si;
      } else if(si < 0)
         ondown();
   }
   else
      x[ei].click();
}

function showLeftMenu() 
{
   if(touchscreen) {
      if(gi == 1) {
         document.getElementById("menu0").style.display = "none";
         document.getElementById("menu1").style.display = "block";
      } else
      {
         document.getElementById("menu0").style.display = "block";
         document.getElementById("menu1").style.display = "none";
      }
   } else {
      var hi = 0;
      if(gi == 0) hi = 1;
      var hideMenuObj = document.getElementById('menu' + hi);
      var leftMenuObj = document.getElementById('menu' + gi);

      hideMenuObj.removeAttribute("style");

      if(gi == 0) {
         leftMenuObj.style['transform'] = "translate(0px, 0px)";
         leftMenuObj.style['msTransform'] = "translate(0px, 0px)";
         leftMenuObj.style['mozTransform'] = "translate(0px, 0px)";
         leftMenuObj.style['webkitTransform'] = "translate(0px, 0px)";
         leftMenuObj.style['oTransform'] = "translate(0px, 0px)";
      } else {
         leftMenuObj.style['transform'] = "translate(0px, -" + trans + "px)";
         leftMenuObj.style['msTransform'] = "translate(0px, -" + trans + "px)";
         leftMenuObj.style['mozTransform'] = "translate(0px, -" + trans + "px)";
         leftMenuObj.style['webkitTransform'] = "translate(0px, -" + trans + "px)";
         leftMenuObj.style['oTransform'] = "translate(0px, -" + trans + "px)";
      }
   }
}

function onFullscreenOnOff() 
{
   if(touchscreen) {
      if(full == false) {
         $('#leftmenu').css('display', 'none');
         full = true;
      } else
      {
         $('#leftmenu').css('display', 'block');
         full = false;
      }
   } else {
      if(full == false) {
         document.getElementById("mydiv").style.left = "0";
         document.getElementById("mydiv").style.width = "100%";
         full = true;
      } else
      {
         document.getElementById("mydiv").style.left = "10%";
         document.getElementById("mydiv").style.width = "90%";
         full = false;
      }
   }
}

function movieclk(w, url, p) 
{ 
   if( isHotKey == 0 )
      lastCh = ei;
   //isHotKey = 0;
   stv.pause();

   if(touchscreen && oi == p.id) {
      isHotKey = 0;
      onok();
      return;
   }

   if(oi > -1) x[oi].style = "background-color:#252525;";
   if(ei > -1) x[ei].style = "background-color:#252525";
   oi = si = ei = p.id;
   x[ei].style = "background-color:#234567;color:yellow";
   oi = si;
   if(w == "tv" && url.indexOf("tv.trueid.net/embed/") < 1)
      showVideoMessage();

   if(url.substr(0,4) == "web/") {
      isHotKey = 0;
      url = substr(4);
      w = "web";
   }

   if(url == "79") {
      isHotKey = 0;
      get79tv(p.id);
      return;
   }

   if(url.substr(0,1) == "/") {
      isHotKey = 0;
      getkakotv(p.id, url);
      return;
   }

   stv.volume = 1;
   if(svideo == 1 && gi == 1)
      stv.volume = 0.1;
   else if(svideo == 0 && gi == 1 && p.id > 18) {
      stv.volume = 0.3;
      if(p.id == 19 || p.id == 21)
         stv.volume = 0.4;
      else if(p.id == 22)
         stv.volume = 0.3;
      else if(p.id == 23)
         stv.volume = 0.3;
   } else if(svideo == 0 && gi == 1) {
      if(url.indexOf("cdn.vet") > 0) {
         stv.volume = 0.3;
         if(ADsid == '?') {
            window.parentView.showMsg("hiddenView:getADsid()");
            setTimeout(function() {
               onok();
            }, 500);
            isHotKey = 0;
            return;
         }
         url = url + ADsid;
      }
   }

   var xx;
   if(w == "web") {
      if(tvchak) {
         url = pathTvChak + url + optTvChak;
         showTime();
      }
      stv.style.display = "none";
      web.style.display = "block";
      xx = web;
      if( isHotKey == 1 || tvchak == 0 || url != lasturl ) {
         if(tvchak)
            lasturl = url;
         xx.setAttribute("src", url);
      }
   } else {
      stv.style.display = "block";
      xx = stv;
      xx.setAttribute("src", url);
      xx.play();
   }     
   isHotKey = 0;
   if( gi==0 && tvchak==0 )
      localStorage.setItem("ei",p.id);
}

function showVideoMessage() 
{
   time = 0;
   if(timer) {
      clearInterval(timer);
      timer = null;
   }

   timer = setInterval(function() {
      OnOff();
   }, 1100);
   closeErrorMessage();
   $('#sec').text("00");
   $("#ch_name").text(x[ei].innerHTML);
   $("#videoMessage").css('display', 'block');
   $("#secMessage").css('display', 'block');
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
   document.getElementById("er_msg").innerHTML = "";
}

function videoErr(e) 
{
   switch(e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
         document.getElementById("er_msg").innerHTML = "비디오 취소됨";
         showErrorMessage();
         //alert('You aborted the video playback.');
         break;
      case e.target.error.MEDIA_ERR_NETWORK:
         document.getElementById("er_msg").innerHTML = "비디오 다운로드 실패(네트워크문제)";
         showErrorMessage();
         //alert('A network error caused the video download to fail part-way.');
         break;
      case e.target.error.MEDIA_ERR_DECODE:
         document.getElementById("er_msg").innerHTML = "이형식의 비디오를 지원하지 않음";
         showErrorMessage();
         //alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
         break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
         document.getElementById("er_msg").innerHTML = "채널주소가 바뀌어 다른서버에서 새주소를 찾는 작업을 진행합니다.";
         //alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
         showErrorMessage();
         break;
      default:
         document.getElementById("er_msg").innerHTML = "알려지지않은 문제로 비디오 로드 에러";
         showErrorMessage();
         //alert('An unknown error occurred.');
         break;
   }
}
