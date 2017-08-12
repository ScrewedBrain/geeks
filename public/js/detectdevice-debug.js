var htmlLang = document.documentElement.lang
var isJq = false;
var section = {
    home1: null,
    mobile: null,
    sethome1: function (html) {
        this.home1 = html;
    },
    setmobile: function (html) {
        this.mobile = html; 
    }
}


var getMobInner = function(link) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', link);
    xhr.send(null);
    return xhr.responseText;
}

var loadJQ = function(jq) {
    if (!isJq) {
        var script = document.createElement("SCRIPT");
        script.id = 'jquery';
        script.src = '/js/jquery-3.2.1.js';
        script.type = 'text/javascript';
        script.onload = function() {
            isJq = true;
            jq()
        };
        document.getElementsByTagName("includes")[0].appendChild(script);
    } else {
        jq()
    }  
} 

var setSheetfile = function(filepath) {
    var cssId = 'CSS';
    if (!document.getElementById(cssId))
    {
        var includes  = document.getElementsByTagName('includes')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = filepath;
        link.media = 'all';
        includes.appendChild(link);
    } else {
        document.getElementById(cssId).href = filepath;
    }
}

var loadfullVersion = function() {
    console.log('loadingFull')
    prev = 'full';
    //setSheetfile('/css/home1.css');
    loadJQ(function(){
        if (section.home1 == null) {
            $.ajax({ url: '/home1?lang=' + htmlLang , success: function(data) { 
            console.log('get1')
            section.sethome1(data);
            $('.homesection').html(data)
            }
        });
        } else {
            $('.homesection').html(section.home1)
        }

    })
}

var loadmobileVersion = function() {
    console.log('loadingMobile')
    prev = 'small';
    //setSheetfile('/css/home1-mobile.css');
    loadJQ(function(){
        if (section.mobile == null) {
            $.ajax({ url: '/home-mobile?lang=' + htmlLang , success: function(data) {
                console.log('getMobile') 
                section.setmobile(data)
                $('.homesection').html(data)
                }
            });
        $(".menu-btn").click(function() {
            $("#menu-mobile").fadeIn(1000);
        })
        } else {
            $('.homesection').html(section.mobile)
        }
        $('.th-close').click(function() {
            $(this).parent().parent().fadeOut(1000)
        })
    })
}
var prev  = 'small';
var w = window.innerWidth;
const isMobile = function() {
    if (w < 800) {
        return true;
    }
    return false
}

var init = function() {

    if (!isMobile()) {
        loadfullVersion()
    } else {
        loadmobileVersion()
    }
    
}
var sizeChanged = function() {
    if ((prev == 'small' && w > 799) || (prev == 'full' && w < 800)) {
        return true;
    }
    return false;
};

var setNewWidth = function() {
    w = window.innerWidth;
    if (sizeChanged()) {
        init()
    }
}

var onSiteStart = function() {
    init()
}

window.onresize = function(event) {
    setNewWidth();
};



var preloader = document.getElementById('preloader');
preloader.onclick = function(){
    preloader.outerHTML = '';
};

init()