function Detect (args,names) {
    var detected={},
    detected_cnt =0 ,
    detect = {
        __proto__ : args,
        any : (iterable) => {
            iterable && !Array.isArray(iterable) && (iterable = Object.keys(iterable));

            if (!iterable || (Object.keys(iterable).length === 0)) {
                return detected_cnt !== 0;
            } 
            if (detected_cnt === 0) {
                return false;
            }
            for (var i=0,ln=iterable.length;i<ln;i++) {
                if (detected[iterable[i]]) {
                    return true;
                }
            }
            return false;
        },
        all : (iterable) => {
            iterable && !Array.isArray(iterable) && (iterable = Object.keys(iterable));

            if (!iterable || (Object.keys(iterable).length === 0)) {
                return detected_cnt === names.length;
            } 
            for (var i=0,ln=iterable.length;i<ln;i++) {
                if (!detected[iterable[i]]) {
                    return false;
                }
            }
            return true;
        }
    };
    if (arguments.length === 1) {
        names = Object.keys(args);
    }

    return new Proxy(args,{
        get : (host,name) => {
            if (names.indexOf(name) !== -1) {
                if (!detected[name]) {
                    detected[name] = true;
                    detected_cnt++;
                }
            }
            return detect[name];
        },
        set : (host,name,value) => {
            detect[name] = value;
        }
    });
}

module.exports = Detect;
