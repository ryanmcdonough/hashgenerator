(function ($) {
    $.fn.extend({
        uheprnGen: function (options) {
            var settings = $.extend({ range: 10000, count: 10000 }, options); var prng = uheprng(); var eventCount = 0; var i, s = ''; prng.addEntropy(); var prngState = prng.string(256); for (var s = '', i = 0; i < 8; i++) { if (i) s += String.fromCharCode(10); s += prngState.substr(i * 32, 32); }
            var display = ''; var range = settings.range; var count = settings.count; var digits = Math.floor(Math.LOG10E * Math.log(range - 1)) + 1; if (display == '') { prng.initState(); prng.hashString(s); for (i = 0; i < count; i++) { s = prng(range).toString(); while (s.length < digits) s = '0' + s; display += s + ' '; } }
            val: { return display; }
        }
    });
})(jQuery);