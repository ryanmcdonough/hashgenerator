/**
 * jquery.hashIdentity.js v1.0.0
 * http://www.ryanmcdonough.co.uk
 *
 * LICENSE AND COPYRIGHT:  THIS CODE IS HEREBY RELEASED INTO THE PUBLIC DOMAIN
 * Ryan McDonough releases and disclaims ALL RIGHTS AND TITLE IN
 * THIS CODE OR ANY DERIVATIVES. Anyone may be freely use it for any purpose.
 *
 */

(function ($) {

    $.fn.extend({

        hashIdentity: function (hashInput) {


            var possibleHashes = new Array();

            for (var key in hashes) {

                var obj = hashes[key];

                var matchesRegex = RegExp(obj['regex']).test(hashInput);

                if (matchesRegex) {
                    possibleHashes.push(obj['name'])
                }
            }

            val: {
                return possibleHashes;
            }
        }

    });


})(jQuery);