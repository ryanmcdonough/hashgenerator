function detectHash() {
    var listOfHashes = $(this).hashIdentity($('#hash_input').val());
    if (listOfHashes.length == 0) {
        $("#detect-hash").html("<h4>No Hashes Match....</h4>");
    }
    else {
        //just clear the html first...
        $("#detect-hash").html("<h3>What the hash might be...</h3><hr />");
        for (var name in listOfHashes) {
            $("#detect-hash").append("<p>" + listOfHashes[name] + "</p>");
        }

    }
}