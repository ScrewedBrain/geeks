var htmlLang=document.documentElement.lang,isJq=!1,section={home1:null,mobile:null,sethome1:function(e){this.home1=e},setmobile:function(e){this.mobile=e}},getMobInner=function(e){var n=new XMLHttpRequest;return n.open("GET",e),n.send(null),n.responseText},loadJQ=function(e){if(isJq)e();else{var n=document.createElement("SCRIPT");n.id="jquery",n.src="/js/jquery-3.2.1.js",n.type="text/javascript",n.onload=function(){isJq=!0,e()},document.getElementsByTagName("includes")[0].appendChild(n)}},setSheetfile=function(e){if(document.getElementById("CSS"))document.getElementById("CSS").href=e;else{var n=document.getElementsByTagName("includes")[0],t=document.createElement("link");t.id="CSS",t.rel="stylesheet",t.type="text/css",t.href=e,t.media="all",n.appendChild(t)}},loadfullVersion=function(){console.log("loadingFull"),prev="full",loadJQ(function(){null==section.home1?$.ajax({url:"/home1?lang="+htmlLang,success:function(e){console.log("get1"),section.sethome1(e),$(".homesection").html(e)}}):$(".homesection").html(section.home1)})},loadmobileVersion=function(){console.log("loadingMobile"),prev="small",loadJQ(function(){null==section.mobile?($.ajax({url:"/home-mobile?lang="+htmlLang,success:function(e){console.log("getMobile"),section.setmobile(e),$(".homesection").html(e)}}),$(".menu-btn").click(function(){$("#menu-mobile").fadeIn(1e3)})):$(".homesection").html(section.mobile),$(".th-close").click(function(){$(this).parent().parent().fadeOut(1e3)})})},prev="small",w=window.innerWidth;const isMobile=function(){return w<800};var init=function(){isMobile()?loadmobileVersion():loadfullVersion()},sizeChanged=function(){return"small"==prev&&w>799||"full"==prev&&w<800},setNewWidth=function(){w=window.innerWidth,sizeChanged()&&init()},onSiteStart=function(){init()};window.onresize=function(e){setNewWidth()};var preloader=document.getElementById("preloader");preloader.onclick=function(){preloader.outerHTML=""},init();