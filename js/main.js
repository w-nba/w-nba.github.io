(function(){
	// Highlight current nav item
 	var hasCurrent = false;
 
 	//把相对路径解析成绝对路径
 	function absolute(href) {
 	    var link = document.createElement("a");
 	    link.href = href;
 	    return (link.protocol+"//"+link.host+link.pathname+link.search+link.hash);
 	}
 	//移出所有的菜单的选中样式
 	$('#main-nav > li').each(function(){
  		$(this).removeClass('current-menu-item current_page_item');
 	});
 	var links = $('#main-nav > li > a');
 	var urls = window.location.href;
 	//为什么要从后面往前面遍历？因为首页极有可能是https://xxxxx/,
 	//这样的话肯定能够匹配所有的项
 	for (var i = links.length; i >= 0; i--) {
 		if(urls.indexOf(absolute(links[i])) != -1){
 			$(links[i]).parent().addClass('current-menu-item current_page_item');
 			//为什么还要设置hasCurrent？因为不排除首页是
 			//https://xxxx/index.html格式的
 			hasCurrent = true;
 			break;
 		}	
	}
	if (!hasCurrent) {
 		$('#main-nav > li:first').addClass('current-menu-item current_page_item');
 	}
 })();




// article toc
var toc = document.getElementById('toc')

if (toc != null) {
	window.addEventListener("scroll", scrollcatelogHandler);
	var tocPosition = 194+25;

	function scrollcatelogHandler(e) {
		 var event = e || window.event,
		     target = event.target || event.srcElement;
		 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		 if (scrollTop > tocPosition) {
		     toc.classList.add("toc-fixed");
		 } else {
		     toc.classList.remove("toc-fixed");
		 }
	}
}


$('#main-navigation').on('click', function(){
    if ($('#main-navigation').hasClass('main-navigation-open')){
      $('#main-navigation').removeClass('main-navigation-open');
    } else {
      $('#main-navigation').addClass('main-navigation-open');
    }
  });

$('#content').on('click', function(){
    if ($('#main-navigation').hasClass('main-navigation-open')){
      $('#main-navigation').removeClass('main-navigation-open');
    }
  });

$("#top-bar").animate({width: "100%"},6000);  

setTimeout(function(){
	$.get("https://sslapi.hitokoto.cn/?encode=json",function(data,status){
	   var dataJSON = JSON.parse(data);
	   $('.site-description').attr("title",dataJSON.from+"|"+dataJSON.creator);
	   $('.site-description').html(dataJSON.hitokoto);
	});
},200)
//给标签云添加颜色
if(document.getElementById("randColor1")){
	var a = document.getElementById("randColor1").getElementsByTagName("a");
	for(var i = 0;i<a.length;i++){
		a[i].style.color = rgb();
	}
}
if(document.getElementById("randColor2")){
	var b = document.getElementById("randColor2").getElementsByTagName("a");
	for(var i = 0;i<b.length;i++){
		b[i].style.color = rgb();
		console.log("b")
	}
}
function rgb(){
	var r=Math.floor(Math.random()*255);
	var g=Math.floor(Math.random()*255);
	var b=Math.floor(Math.random()*255);
	var rgb='rgb('+r+','+g+','+b+')';
	return rgb;
}

function showLocale(objD) {
  var str, colorhead, colorfoot;
  var yy = objD.getYear();
  if (yy < 1900) yy = yy + 1900;
  var MM = objD.getMonth() + 1;
  if (MM < 10) MM = '0' + MM;
  var dd = objD.getDate();
  if (dd < 10) dd = '0' + dd;
  var hh = objD.getHours();
  if (hh < 10) hh = '0' + hh;
  var mm = objD.getMinutes();
  if (mm < 10) mm = '0' + mm;
  var ss = objD.getSeconds();
  if (ss < 10) ss = '0' + ss;
  var ww = objD.getDay();
  if (ww == 0) colorhead = "";
  if (ww > 0 && ww < 6) colorhead = "";
  if (ww == 6) colorhead = "";
  if (ww == 0) ww = "星期日";
  if (ww == 1) ww = "星期一";
  if (ww == 2) ww = "星期二";
  if (ww == 3) ww = "星期三";
  if (ww == 4) ww = "星期四";
  if (ww == 5) ww = "星期五";
  if (ww == 6) ww = "星期六";
  colorfoot = ""
  str = colorhead + yy + "-" + MM + "-" + dd + " &nbsp;&nbsp;" + hh + ":" + mm + ":" + ss + " &nbsp;&nbsp;" + ww + colorfoot;
  return (str);
}
function tick() {
  var today;
  today = new Date();
  document.getElementById("sj").innerHTML = showLocale(today);
  window.setTimeout("tick()", 1000);
}
tick();


function findWeather(wz) {
  var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
  $.getScript(cityUrl, function (script, textStatus, jqXHR) {
	var citytq = remote_ip_info.city; // 获取城市
	var url = "http://wthrcdn.etouch.cn/weather_mini?city=" + citytq;
	$.ajax({
	  url: url,
	  dataType: "json",
	  scriptCharset: "gbk",
	  success: function (data) {
		var res = data.data.forecast[0];
		
		var tq = citytq + " &nbsp;" +res.type+" &nbsp;"+ " " + res.fengxiang+" "+res.fengli + " &nbsp;" + res.high.substr(-4) + "~" + res.low.substr(-4);
		$('#weather').html(tq);
	  }
	});
  });
}
findWeather();