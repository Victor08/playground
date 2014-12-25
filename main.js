//<![CDATA[

/**
 * Created by victor logunov on 18.12.14.
 */

// Добавляем viewport в заголовке документа, если не прописан
var viewport = document.querySelector("meta[name=viewport]");
if (!viewport) {
    viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    document.head.appendChild(viewport);
}
viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');


var bannerCssFile = '#banner_background {' +
        'display: block;' +
        'left: 0px;' +
        'top: 0px;'+
        'position:fixed;'+
        'width: 100%;'+
        'height: 100%;'+
        'background-color: black;'+
        'visibility: visible;'+
        'opacity: 0.75;'+
        'z-index: -1;'+
        '}'+
        '#banner_frame {'+
        'display: block;'+
        'position: fixed;'+
        'left: 0px;'+
        'top: 0px;'+
        'z-index: 1000000;'+
        '}'+
        '#banner {'+
        'position: relative;'+
        'display: block;'+
        'opacity: 1;'+
        'left: 0px;'+
        'top: 0px;'+
        'z-index: 2;'+
        '}'+
        '#ambn9435 {' +
        'z-index: 2' +
        '}',
// html код баннера
    bannerHTML = '<div id="banner_frame">' +
        '<div id="banner_background"></div>' +
        '<div id="ambn9435"></div>' +
        '</div>';

// функция создания ноды баннера
var insertHtmlFragment = function(fragment) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = fragment;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
};
// функция добавления стилей
var appendStyle = function(css){
    var s = document.createElement('style');
    s.type = "text/css";
    if (s.styleSheet){
        s.styleSheet.cssText = css;
    } else {
        s.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(s);
};

// функция подключения скрипта в конце документа
var appendScript = function(src){
    var s = document.createElement('script');
    s.setAttribute('type', "text/javascript");
    s.setAttribute('src', src);
    document.body.appendChild(s);
};
/*

var getURLParameter = function(e) {
    return decodeURI((new RegExp(e + "=" + "(.+?)(&|$)").exec(document.currentScript.src) || [ ,''])[1]);
};*/

/*var s = parseInt(getURLParameter('s'), 10) || 1;*/

s = 1;


// добавляем баннер в конец документа
document.body.appendChild(insertHtmlFragment(bannerHTML));
appendStyle(bannerCssFile);
appendScript("//am15.net/bn.php?s=" + s + "&f=20&d=9435");



var frame = document.getElementById('banner_frame'),// обертка для баннера
    banner = document.querySelector('#ambn9435').childNodes[0], // iframe нода баннера
    userAgent = navigator.userAgent,
    toCenter,    // функция для центрирования баннера
    originalHeight = 250, // собственная высота баннера [px]
    originalWidth = 300;  // собственная ширина баннера [px]

alert ("user agent: " + userAgent +
    "dpr: " + window.devicePixelRatio);

var iphoneToCenter = function () {
    scaleRate = document.documentElement.clientHeight / window.innerHeight; // при зуме яблочные браузеры не пересчитывают размер пикселя и выдают innerWidth/Height в изначальных пикселях, т.е. если сделал зум и оставил прежние размеры окна, innerWidth/Height станет меньше. Таким образом можно посчитать коэффициент увеличения картинки.
    banner.setAttribute("width",  originalWidth / scaleRate);
    banner.setAttribute("height", originalHeight / scaleRate);
    frame.style.marginTop = (((window.innerHeight - banner.height) / 2) + window.pageYOffset) + "px";
    frame.style.marginLeft = (((window.innerWidth - banner.width) / 2) + window.pageXOffset) + "px";
};

var android4ToCenter = function () {
    scaleRate = document.documentElement.clientHeight / window.innerHeight;
    /*banner.setAttribute("style", "width: "+ (originalWidth / scaleRate) + "px; height: " + (originalHeight / scaleRate) + "px");*/
    banner.setAttribute("width", (originalWidth / scaleRate) + "px");
    banner.setAttribute("height", (originalHeight / scaleRate) + "px");
    console.log(banner.offsetHeight);
    frame.style.marginTop = ((window.innerHeight - parseInt(banner.offsetHeight)) / 2 ) + "px";
    frame.style.marginLeft = ((window.innerWidth - parseInt(banner.offsetWidth)) / 2 ) + "px";

    /*    alert(userAgent + "\n" +
     androidVersion +
     "\nscaleRate: " + scaleRate +
     "\nbanner style: " + banner.getAttribute('style') +
     "\ndpr: " + window.devicePixelRatio
     "user agent: " + userAgent +
     "\nclient height: " + document.documentElement.clientHeight +
     "\ninnerHeight: " + window.innerHeight +
     "\npixel ratio: " + window.devicePixelRatio +
     "\nmatch media: " + window.matchMedia +
     "\nhigh res check match: " + window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches);*/
};

var desktopToCenter = function () {
    scaleRate = document.documentElement.clientHeight / window.innerHeight;
    banner.setAttribute("width",  (originalWidth / window.devicePixelRatio / scaleRate));
    banner.setAttribute("height",  (originalHeight / window.devicePixelRatio / scaleRate));
    frame.style.marginTop = ((window.innerHeight - parseInt(banner.offsetHeight)) / 2 ) + "px";
    frame.style.marginLeft = ((window.innerWidth - parseInt(banner.offsetWidth)) / 2 ) + "px";
    /*alert(userAgent + "\n" +
    androidVersion +
    "\nscaleRate: " + scaleRate +
    "\nbanner style: " + banner.getAttribute('style') +
    "\ndpr: " + window.devicePixelRatio);*/
};

// определяем функцию toCenter:
// детектим браузеры iOS  (не обновляют devicePixelRatio при масштабировании)
if (userAgent.match(/iPhone|iPad|iPod/gi)) {

    console.log("ipad detected");
    frame.style.position = "absolute";
    var scaleRate;
    // корректно работает в iOS
    toCenter = iphoneToCenter;

} else if (userAgent.match(/Android/gi)) {

    console.log("android detected");
    var getAndroidVersion = function (agent) {
        var match = agent.match(/android\s([0-9\.?]*)/gi);
        return match ? match[0].substr(8) : false;
    };
    var androidVersion = parseInt(getAndroidVersion(userAgent));
    console.log("android version: " + androidVersion);
   /* if (androidVersion >= 4) {*/
    toCenter = android4ToCenter;

} else {
    toCenter = desktopToCenter;
}

var addListners = function selfInvoke(){
    console.log("addListeners() invoked");
    if (banner) {

        // центрируем изображение при загрузке и вешаем слушателя на окно
        toCenter();
        window.addEventListener('resize', function () {
            toCenter();
        });
        window.addEventListener('scroll', function () {
            toCenter();
        });

        // вешаем обработчик на браузеры, которые знают событие orientationchange
        if ("onorientationchange" in window) {
            window.addEventListener("orientationchange", function () {
                setTimeout(function () {
                    toCenter();
                }, 500); // таймаут необходим, потому что браузеры тормозят с обновлением innerWidth и document.clientWidth (по крайней мере в iOS тормозят)
            });
        }
    } else {
        banner = document.querySelector('#ambn9435').childNodes[0];
        setTimeout(selfInvoke , 100);
    }
};

addListners();



//]]>