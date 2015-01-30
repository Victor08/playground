/**
 * Created by vic on 14.01.15.
 */



// функция для получения всех параметров из get запроса
//var scriptSrc = document.getElementById(thisScriptId).src;
var getAllUrlParameters = function (url) {
    var escapeHtml = function (str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    var querySubstr = url.match(/\?.*$/)[0];
    console.log(querySubstr);
    var paramArray = querySubstr.match(/[\?&].*?[!&|!$]/g);
    for (var ololo in paramArray) {
        console.log(ololo);
    };
    console.log(paramArray);
};
var url = "../mini.js?s=2&amp;cbd=8000&amp;bo=33";
getAllUrlParameters(url);

function getUrlParams(url) {
    var regEx = /(?:\?|&(?:amp;)?)([^=&#]+)(?:=?([^&#]*))/g,
        match, params = {},
        decode = function (s) {
            return decodeURIComponent(s.replace(/\+/g, " "));
        };
    if (typeof url == "undefined") {
        url = document.location.href;
    };
    while (match = regEx.exec(url)) {
        params[decode(match[1])] = decode(match[2]);
    };
    return params;
};

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

var myParams = getUrlParams(url);

for (var p in myParams) {
    if (myParams.hasOwnProperty(p)) console.log(myParams[p]);
};