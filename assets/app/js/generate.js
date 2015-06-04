$(".show-salt").click(function () {
    $('#plain_text_area').removeClass("col-md-offset-2", 300);
    $('#salt_text_area').removeClass("hidden", 400);

    $('#plain_text_desc').removeClass("hidden", 300);
    $('#salt_text_desc').removeClass("hidden", 400);

    $('.show-salt').hide();


});

function generateSalt() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*!$@{}#&()./<>%";

    for (var i = 0; i < 18; i++)
         text += possible.charAt(Math.floor(Math.random() * possible.length));

    $('#salt_input').val(text);

    performHashing();
}

$(".copyToClipboard").click(function () {
    var valueToCopy = $(this).parent().parent().find('input').val();

    var client = new ZeroClipboard(this);

    client.on("copy", function (event) {
        var clipboard = event.clipboardData;
        clipboard.setData("text/plain", valueToCopy);

    });

});

function performHashing()
{
    var md6 = new md6hash();

    var plain = $('#plain_input').val();
    var salt = $('#salt_input').val();
    var salted = plain + salt;

    $('#md5_result').val(md5(salted));
    $('#md4_result').val(hex_md4(salted));
    $('#sha3_result').val(CryptoJS.SHA3(salted)); 
    $('#bmw_result').val(bmw(salted));
    $('#shabal_result').val(shabal(salted)); 
    $('#halfskein_result').val(halfskein(salted));
    $('#cubehash_result').val(cubehash(salted));
    $('#sha256_result').val(sha256(salted)); 
    $('#sha1_result').val(CryptoJS.SHA1(salted));
    $('#sha512_result').val(CryptoJS.SHA512(salted));
    $('#aes_result').val(CryptoJS.AES.encrypt(plain, salt));
    $('#ripe160_result').val(CryptoJS.AES.encrypt(plain, salt)); 
    $('#rabbit_result').val(CryptoJS.Rabbit.encrypt(plain, salt)); 
    $('#radio_result').val(rg32_vector(salted));
    $('#md6_result').val(md6.hex(salted));
    

    $("#what_is_hash_for_me").fadeOut("slow", function () { $('#hashing_results').removeClass("hide","slow"); });
}