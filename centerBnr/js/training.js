var myarr = [ 0, ["ololo", "peysl", ["bla bls", "trololo",[12, 32,[21312,12321,1231,[21312555], [2131231233423423, 34324524,23452345234]]]]]];

var flattener = function self (array) {
    var flatArr = [];
    (function toFlat(arr){
        arr.forEach( function(element, index, array){
            if (typeof element === "array") {
                flatArr.push(element);
            } else {
                toFlat
            }
        })
    })();

}




