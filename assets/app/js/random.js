function generateRandom() {
    var range_val = 10000;
    var count_val = 10000;

    if (range_input.value != "")
    {
        range_val = range_input.value
    }

    if (count_input.value != "") {
        count_val = count_input.value
    }

    var options = {
        range: range_val,
        count: count_val
    };
    var x = "<h3>Here are your pseudo random numbers</h3><hr />" +  $(this).uheprnGen(options);
    $('#what_is_prng').hide();
    $("#random_results").html(x);
}
