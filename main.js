//<![CDATA[

/**
 * Created by victor logunov on 18.12.14.
 */

/*
 * Код для вставки на страницу (вставлять перед закрывающим тегом </body>):
 * <script id="advmkr_cntr_bnr"  type="text/javascript" charset="UTF-8" src="main.js?"></script>
 * Параметры, которые можно менять при подключении скрипта:
 *      * bo -затемнение фона [целое число от 1 до 100]
 *      * cbd -задержка появления закрывающей кнопки [целое число миллисекунд]
 *      пример:  src="main.js?bo=60&amp;cbd=4000"
 */
//alert(navigator.userAgent);

// Добавляем viewport в заголовке документа, если не прописан
var viewport = document.querySelector("meta[name=viewport]");
if (!viewport) {
    viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    document.head.appendChild(viewport);
}
viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=yes');

(function () {
    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    };
// конфиг куки
    var cookieName = "adv_cntr_bnr",
        cookieNameRegex = new RegExp (cookieName),
        cookieValidPath = "/";

if (!document.cookie.match(cookieNameRegex)) {

// функция для получения get параметра, переданного при подключении данного скрипта
    var getURLParameter = function (parameterName) {
        return decodeURI((new RegExp(parameterName + "=" + "(.+?)(&|$)").exec(document.getElementById(thisScriptId).src) || [, ''])[1]);
    };




// конфиг скрипта
    var closeBtnImgSrc = "http://b.am15.net/23/23412aed00.png", // картинка закрывающего крестика
        closeBtnDivId = "bnr_close_btn", // id блока с закрывающим крестиком
        closeBtnWidth = 50,
        closeBtnHeight = 50,
        iframeWrapperDivId = "ambn9435",// id блока-обертки iframe с баннером
        bannerWrapperId = "banner_frame", // id обертки всех элементов баннера
        backgroundDivId = "banner_background", // id блока темного фона
        thisScriptId = "advmkr_cntr_bnr", //id этого скрипта
        s = (parseInt(getURLParameter('s'), 10) || 1),
        bannerIframeScriptSrc = "//am15.net/bn.php?s=" + s + "&f=20&d=9435",
        originalHeight = 250, // собственная высота баннера [px]
        originalWidth = 300,  // собственная ширина баннера [px]
        closeBtnDelay = parseInt(getURLParameter('cbd'), 10) || 5000,  // задержка появления закрывающей кнопки [ms]
        backgroundOpacity = ((parseInt(getURLParameter('bo'), 10)) > 100 ? 100 : (parseInt(getURLParameter('bo'), 10))) / 100 || 0.75, // затемнение фона (передавать при подключении скрипта целым числом от 1 до 100)
        cookieTimeOnClose = 12, // время жизни куки при нажатии на закрывающую кнопку [часы]
        cookieTimeOnPass = 1, // время жизни куки при нажатии на баннер [часы]
        bannerCssFile = '#' + backgroundDivId + ' {' +
            'display: block;' +
            'left: 0px;' +
            'top: 0px;' +
            'position: fixed;' +
            'width: 100%;' +
            'height: 100%;' +
            'background-color: black;' +
            'visibility: visible;' +
            'opacity:' + backgroundOpacity + ';' +
            'z-index: 999999;' +
            '}' +
            '#' + bannerWrapperId + ' {' +
            'display: block;' +
            'position: fixed;' +
            'left: 0px;' +
            'top: 0px;' +
            'z-index: 1000000;' +
            '}' +
            '#banner {' +
            'position: relative;' +
            'display: block;' +
            'opacity: 1;' +
            'left: 0px;' +
            'top: 0px;' +
            'z-index: 2;' +
            '}' +
            '#' + closeBtnDivId + ' {' +
            'display: none;' +
            'position: fixed;' +
            'width: 40px;' +
            'height: 40px;' +
            'top: 0px;' +
            'z-index: 1000001;' +
            'cursor: pointer;' +
            '}' +
            '#' + closeBtnDivId + ' img {' +
            'height: 100%;' +
            'width: 100%;' +
            '}' +
            '#' + iframeWrapperDivId + ' {' +
            'display: block;' +
            'position: absolute;' +
            'margin-top: 0px;' +
            'margin-left: 0px;' +
            'z-index: 2;' +
            '}',
// html код баннера:
        bannerHTML = '<div id="' + backgroundDivId + '"></div>' +
            '<div id="' + closeBtnDivId + '"><img src="' + closeBtnImgSrc + '"></div>' +
            '<div id="' + bannerWrapperId + '">' +
            '<div id="' + iframeWrapperDivId + '"></div>' +
            '</div>';

// функция создания элемента баннера
    var insertHtmlFragment = function (fragment) {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = fragment;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        };
        return frag;
    };
// функция добавления стилей
    var appendStyle = function (css) {
        var s = document.createElement('style');
        s.type = "text/css";
        if (s.styleSheet) {
            s.styleSheet.cssText = css;
        } else {
            s.appendChild(document.createTextNode(css));
        };
        document.getElementsByTagName('head')[0].appendChild(s);
    };

// функция подключения скрипта в конец документа
    var appendScript = function (src) {
        var s = document.createElement('script');
        s.setAttribute('type', "text/javascript");
        s.setAttribute('src', src);
        document.body.appendChild(s);
    };

// добавляем баннер, стили и скрипты
    document.body.appendChild(insertHtmlFragment(bannerHTML));
    appendStyle(bannerCssFile);
    appendScript(bannerIframeScriptSrc);

    var frame = document.getElementById(bannerWrapperId),// обертка для баннера
        banner = document.querySelector('#' + iframeWrapperDivId).childNodes[0], // iframe нода баннера
        userAgent = navigator.userAgent,
        toCenter,    // функция для центрирования баннера

        backgroundDiv = document.getElementById(backgroundDivId),
        closeBtn = document.getElementById(closeBtnDivId),
        myTimer = null;

//проверяем поддержку независимого размера css пикселя. Можно проверить только если браузер поддерживает viewport мета тэг и отрисовал сайт при загрузке в масштабе 1
    var isDIPSupported;
    window.onload = function () {
        // alert ("is dip check");
        if (userAgent.match(/iphone/gi) || userAgent.match(/yabrowser/)) {
            if (window.innerWidth < window.innerHeight) {
                isDIPSupported = (screen.width / window.innerWidth) > 1.05 ? false : true;
            } else {
                isDIPSupported = (screen.height / window.innerWidth) > 1.05 ? false : true;
            };
        } else {
            isDIPSupported = (screen.width / window.innerWidth) > 1.05 ? false : true;
        };

        /*   alert ("is DIP: " + isDIPSupported +
         "\nscreen width: " + screen.width +
         "\ninner widht: " + window.innerWidth);*/
    };


// обновление размеров элемента при увеличении для сохранения абсолютного размера
   /* var resizeElement = function (el, elWidth, elHeight, scale) {
        if (el) {
            el.style.width = elWidth / scale;
            el.style.height = elHeight / scale;
        };
    };*/
// центрирование для ios
    var iphoneToCenter = function () {
        if (window.innerHeight > window.innerWidth) {
            scaleRate = screen.width / window.innerWidth; // при зуме яблочные браузеры не пересчитывают размер пикселя и выдают innerWidth/Height в изначальных пикселях, т.е. если сделал зум и оставил прежние размеры окна, innerWidth/Height станет меньше. Таким образом можно посчитать коэффициент увеличения картинки.
        } else {
            scaleRate = screen.height / window.innerWidth;
        };
        banner.setAttribute("width", originalWidth / scaleRate);
        banner.setAttribute("height", originalHeight / scaleRate);
        frame.style.marginTop = (((window.innerHeight - banner.offsetHeight) / 2) + window.pageYOffset) + "px";
        frame.style.marginLeft = (((window.innerWidth - banner.offsetWidth) / 2) + window.pageXOffset) + "px";
        if (closeBtn) {
            closeBtn.style.position = "absolute";
            closeBtn.style.width = (closeBtnWidth / scaleRate) + "px";
            closeBtn.style.height = (closeBtnHeight / scaleRate) + "px";
            closeBtn.style.marginTop = window.pageYOffset + "px";
            closeBtn.style.marginLeft = (window.innerWidth - closeBtn.offsetWidth + window.pageXOffset) + "px";
        };
    };

// центрирование для десктопов (кроме сафари и кроме ie<9)
 /*   var desktopToCenter = function () {

        banner.setAttribute("width", (originalWidth / window.devicePixelRatio ));
        banner.setAttribute("height", (originalHeight / window.devicePixelRatio ));
        if (closeBtn) {
            closeBtn.style.right = "0px";
            closeBtn.style.top = "0px";
            resizeElement(closeBtn, 50, 50, window.devicePixelRatio);
        };
        frame.style.marginTop = ((window.innerHeight - parseInt(banner.offsetHeight)) / 2 ) + "px";
        frame.style.marginLeft = ((window.innerWidth - parseInt(banner.offsetWidth)) / 2 ) + "px";
    };*/

    var android4ToCenter = function () {

        scaleRate = isDIPSupported ? screen.width / window.innerWidth : screen.width / window.innerWidth / window.devicePixelRatio;
        banner.setAttribute("width", originalWidth / scaleRate);
        banner.setAttribute("height", originalHeight / scaleRate);
        frame.style.marginTop = (((window.innerHeight - banner.offsetHeight) / 2) + window.pageYOffset) + "px";
        frame.style.marginLeft = (((window.innerWidth - banner.offsetWidth) / 2) + window.pageXOffset) + "px";

        backgroundDiv.style.width = scaleRate < 1 ? window.innerWidth / scaleRate + "px" : window.innerWidth + "px";
        backgroundDiv.style.height = scaleRate < 1 ? window.innerHeight / scaleRate + "px" : window.innerHeight + "px";
        backgroundDiv.style.marginTop = window.pageYOffset + "px";
        backgroundDiv.style.marginLeft = window.pageXOffset + "px";

        if (closeBtn) {
            closeBtn.style.position = "absolute";
            closeBtn.style.width = (closeBtnWidth / scaleRate) + "px";
            closeBtn.style.height = (closeBtnHeight / scaleRate) + "px";
            closeBtn.style.marginTop = window.pageYOffset + "px";
            closeBtn.style.marginLeft = (window.innerWidth - closeBtn.offsetWidth + window.pageXOffset) + "px";
        };

    };

    var puffinToCenter = function() {
        banner.setAttribute("width", originalWidth );
        banner.setAttribute("height", originalHeight );
        frame.style.marginTop = (((window.innerHeight - banner.offsetHeight) / 2) + window.pageYOffset) + "px";
        frame.style.marginLeft = (((window.innerWidth - banner.offsetWidth) / 2) + window.pageXOffset) + "px";

        backgroundDiv.style.width = window.innerWidth + "px";
        backgroundDiv.style.height = window.innerHeight + "px";
        backgroundDiv.style.marginTop = window.pageYOffset + "px";
        backgroundDiv.style.marginLeft = window.pageXOffset + "px";

        if (closeBtn) {
            closeBtn.style.position = "absolute";
            closeBtn.style.width = closeBtnWidth + "px";
            closeBtn.style.height = closeBtnHeight + "px";
            closeBtn.style.marginTop = window.pageYOffset + "px";
            closeBtn.style.marginLeft = (window.innerWidth - closeBtn.offsetWidth + window.pageXOffset) + "px";
        };

    };



    if (userAgent.match(/puffin/gi)) {
        frame.style.position = "absolute"
        closeBtn.style.position = "absolute";
        backgroundDiv.style.position = "absolute";
        backgroundDiv.style.top = "0px";
        backgroundDiv.style.left = "0px";
        toCenter = puffinToCenter;
    } else if (userAgent.match(/iPhone|iPad|iPod/gi)) {
        frame.style.position = "absolute";
        //closeBtn.style.position = "absolute";
        var scaleRate;
        toCenter = iphoneToCenter;

    } else if (userAgent.match(/webOS|blackberry|iemobile/gi)) {

        toCenter = android4ToCenter;
    } else if (userAgent.match(/Android/gi)) {
        frame.style.position = "absolute";
        //closeBtn.style.position = "absolute";
        backgroundDiv.style.position = "absolute";
        backgroundDiv.style.top = "0px";
        backgroundDiv.style.left = "0px";
        toCenter = android4ToCenter;
    } else {
        toCenter = android4ToCenter;
    };

    var addListners = function () {
        // центрируем изображение при загрузке и вешаем слушателей на окно
        toCenter();
        window.addEventListener('resize', toCenter);
        window.addEventListener('scroll', toCenter);
        window.addEventListener('blur', onBannerClick);
    };

    var onBannerClick = function () {
        setTimeout(function () {
            document.cookie = cookieName + "=AdvMaker's awesome; path=" + cookieValidPath + "; expires=" + new Date(Date.now() + (1000 * 60 * 60 * cookieTimeOnPass)).toUTCString() + ";";
            clearBanner();
        }, 1000);
    };

    var onCloseBtnClick = function () {
        document.cookie = cookieName + "=isSet; path=" + cookieValidPath + "; expires=" + new Date(Date.now() + (1000 * 60 * 60 * cookieTimeOnClose)).toUTCString() + ";";
        clearBanner();
    };

    var clearBanner = function () {
        if (myTimer) {
            clearInterval(myTimer)
        };

        window.removeEventListener('resize', toCenter);
        window.removeEventListener('scroll', toCenter);
        window.removeEventListener('blur', onBannerClick);
        document.body.removeChild(backgroundDiv);
        document.body.removeChild(frame);
        document.body.removeChild(closeBtn);
    };

    var displayCloseBtn = function () {
        if (!closeBtn) {
            closeBtn = document.getElementById(closeBtnDivId);
        };
        closeBtn.style.display = "block";
        closeBtn.addEventListener('click', onCloseBtnClick);
        toCenter();
    };

    var onBannerLoad = function selfInvoke() {
        if (banner) {

            addListners();
            setTimeout(displayCloseBtn, closeBtnDelay);
            window.myTimer = setInterval(toCenter, 1000);
        } else {
            banner = document.querySelector('#' + iframeWrapperDivId).childNodes[0];
            setTimeout(selfInvoke, 500);
        };
    };

    onBannerLoad();


};


})();
//]]>