/**
 * Created by vic on 23.01.15.
 */

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
};

var viewp = document.querySelector('meta[name=viewport]');
console.log('first; ' + viewp.content);
console.log(viewp);
var copy = document.createElement('meta');
console.log (copy);
copy.setAttribute('name', 'viewport');
for (var attr in viewp){
    copy.setAttribute(attr, viewp[attr]);
};
console.log('second: ' + copy.content);

var copyViewport = function (viewport) {
    if (viewport) {
        var copy = document.createElement('meta');
        copy.setAttribute('name', 'viewport');
        copy.setAttribute('content', viewport.content);
        return copy;
    } else {
        return false;
    }
};