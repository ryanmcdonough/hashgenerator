"use strict"; function uheprng() {
    return (function () {
        var o = 48; var c = 1; var p = o; var s = new Array(o); var i, j, k = 0; var mash = Mash(); for (i = 0; i < o; i++) s[i] = mash(Math.random()); function rawprng() { if (++p >= o) p = 0; var t = 1768863 * s[p] + c * 2.3283064365386963e-10; return s[p] = t - (c = t | 0); }; var random = function (range) { return Math.floor(range * (rawprng() + (rawprng() * 0x200000 | 0) * 1.1102230246251565e-16)); }; random.string = function (count) { var i, s = ''; for (i = 0; i < count; i++) s += String.fromCharCode(33 + random(94)); return s; }; function hash() {
            var args = Array.prototype.slice.call(arguments)
            for (i = 0; i < args.length; i++) { for (j = 0; j < o; j++) { s[j] -= mash(args[i]); if (s[j] < 0) s[j] += 1; } }
        }; random.cleanString = function (inStr) { inStr = inStr.replace(/(^\s*)|(\s*$)/gi, ""); inStr = inStr.replace(/[\x00-\x1F]/gi, ""); inStr = inStr.replace(/\n /, "\n"); return inStr; }
        random.hashString = function (inStr) { inStr = random.cleanString(inStr); mash(inStr); for (i = 0; i < inStr.length; i++) { k = inStr.charCodeAt(i); for (j = 0; j < o; j++) { s[j] -= mash(k); if (s[j] < 0) s[j] += 1; } } }; random.addEntropy = function () { var args = []; for (i = 0; i < arguments.length; i++) args.push(arguments[i]); hash((k++) + (new Date().getTime()) + args.join('') + Math.random()); }; random.initState = function () { mash(); for (i = 0; i < o; i++) s[i] = mash(' '); c = 1; p = o; }; random.done = function () { mash = null; }; return random;
    }());
}; function Mash() {
    var n = 0xefc8249d; var mash = function (data) {
        if (data) {
            data = data.toString(); for (var i = 0; i < data.length; i++) { n += data.charCodeAt(i); var h = 0.02519603282416938 * n; n = h >>> 0; h -= n; h *= n; n = h >>> 0; h -= n; n += h * 0x100000000; }
            return (n >>> 0) * 2.3283064365386963e-10;
        } else n = 0xefc8249d;
    }; return mash;
}