$(document).ready(function () {


	var array = ['#copy-md5','#copy-sha3','#copy-bmw','#copy-shabal','#copy-hs','#copy-cube','#copy-sha256','#copy-sha512','#copy-rabbit','#copy-blake','#copy-aes'];
	var arrayclip = [];
	
	for (var i = 0; i < array.length; i++) {
	 
	 var myTerm = array[i];
   	 arrayclip[i] = new ZeroClipboard($(myTerm), {
         moviePath: "assets/js/bootstrap/ZeroClipboard.swf"
         });
	}

    $("#salt_random").click(function () {
        random_salt();
        hash_it();
    });

    $("#salt_show").click(function () {
        $('#plain_holder').removeClass("offset2", 300, function () { $('#salt_box:hidden').fadeIn(400) });
        $('#tell_salt').html("Salt");
        $('#tell_base').html("Base");
        $('#salt_show').hide(400);
    });

});

function random_salt() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*!$@{}";

    for (var i = 0; i < 18; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    $('#salt_input').val(text);
}

function hash_it() {

    $("#further_front").fadeOut("slow", function () {
        $('#results:hidden').fadeIn("slow");
    });

    var plain = $('#plain_input').val();
    var salt = $('#salt_input').val();

    var salted = plain + salt;
	
    $('#md5_result').val(md5(salted));
    $("#share-md5").attr("href", "mailto:?subject=MD5 Hash&body=Original: " + salted + " // MD5: " + $('#md5_result').val())

    $('#sha3_result').val(CryptoJS.SHA3(salted));
    $("#share-sha3").attr("href", "mailto:?subject=SHA3 Hash&body=Original: " + salted + " // SHA3: " + $('#sha3_result').val())

    $('#bmw_result').val(bmw(salted));
    $("#share-bmw").attr("href", "mailto:?subject=BMW Hash&body=Original: " + salted + " // BMW: " + $('#bmw_result').val())

    $('#shabal_result').val(shabal(salted));
    $("#share-shabal").attr("href", "mailto:?subject=SHABAL Hash&body=Original: " + salted + " // SHABAL: " + $('shabal_result').val())

	$('#blake_result').val(blake32(salted));
    $("#share-blake").attr("href", "mailto:?subject=Blake Hash&body=Original: " + salted + " // Blake: " + $('#blake_result').val())

    $('#halfskein_result').val(halfskein(salted));
    $("#share-hs").attr("href", "mailto:?subject=Halfskein Hash&body=Original: " + salted + " // Halfskein: " + $('#halfskein_result').val())

    $('#cubehash_result').val(cubehash(salted));
     $("#share-cube").attr("href", "mailto:?subject=Cube Hash&body=Original: " + salted + " // Cube: " + $('#cubehash_result').val())

    $('#sha256_result').val(sha256(salted));
     $("#share-sha256").attr("href", "mailto:?subject=SHA 256 Hash&body=Original: " + salted + " // SHA 256: " + $('#sha256_result').val())

	$('#sha1_result').val(CryptoJS.SHA1(salted));
     $("#share-sha1").attr("href", "mailto:?subject=SHA 1 Hash&body=Original: " + salted + " // SHA 1: " + $('#sha1_result').val())

	$('#sha512_result').val(CryptoJS.SHA512(salted));
     $("#share-sha512").attr("href", "mailto:?subject=SHA 512 Hash&body=Original: " + salted + " // SHA 512: " + $('#sha512_result').val())

	$('#aes_result').val(CryptoJS.AES.encrypt(plain,salt));
    $("#share-aes").attr("href", "mailto:?subject=AES Hash&body=Original: " + salted + " // AES: " + $('#aes_result').val())
	
	$('#ripe160_result').val(CryptoJS.AES.encrypt(plain,salt));
    $("#share-ripe160").attr("href", "mailto:?subject=AES Hash&body=Original: " + salted + " // AES: " + $('#ripe160_result').val())

	$('#rabbit_result').val(CryptoJS.Rabbit.encrypt(plain,salt));
     $("#share-rabbit").attr("href", "mailto:?subject=Rabbit Hash&body=Original: " + salted + " // Rabbit: " + $('#rabbit_result').val())
}