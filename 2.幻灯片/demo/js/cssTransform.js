// 设置和获取transform
// 注：如果要获取transform的值，必须是通过这个函数设置了才能获取到
function cssTransform(el, attr, val) {
    if (!el.transform) {
        el.transform = {};
    }
    if (arguments.length > 2) {  // 设置
        el.transform[attr] = val;
        var sVal = '';
        for (var s in el.transform) {
            switch (s) {
                case 'rotate':
                case 'skewX':
                case 'skewY':
                    sVal += s + "(" + el.transform[s] + "deg) ";
                    break;
                case 'translateX':
                case 'translateY':
                    sVal += s + "(" + el.transform[s] + "px) ";
                    break;
                case 'scaleX':
                case 'scaleY':
                case 'scale':
                    sVal += s + "(" + el.transform[s] + ") ";
                    break;
            }
        }
        el.style.WebkitTransform = el.style.transform = sVal;
    } else {       // 获取
        val = el.transform[attr];
        if (typeof val == 'undefined') {
            if (attr == 'scale' || attr == 'scaleX' || attr == 'scaleY') {
                val = 1;
            } else {
                val = 0;
            }
        }
        return val;
    }

}