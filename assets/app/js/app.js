

$("#content-area").load("generate.html");

$(function () {
    $('.menu-item').click(function () {
        $('#content-area').load(this.href);

        // it's important to return false from the click
        // handler in order to cancel the default action
        // of the link which is to redirect to the url and
        // execute the AJAX request
        return false;
    });
});