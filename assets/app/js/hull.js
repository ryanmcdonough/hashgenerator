Hull.init({
    "appId": "553f39f41b244666dc001940",
    "orgUrl": "https://hash-for-me.hullapp.io"
});


var $button = $('a.github-login');
var refreshButton = function () {
    var user = Hull.currentUser();
    if (user) {
        $button.html("Connected as " + user.name + ". Logout");
    } else {
        $button.html("<i class='fa fa-github-square fa-2'></i> Login with Github</a>");
    }
}

// Let's initialize it when you app is loaded
Hull.on('hull.init', function () {
    $button.on('click', function () {
        if (Hull.currentUser()) {
            Hull.logout();
        } else {
            Hull.login({ provider: 'github' });
        }
    });
    refreshButton();
});

// Let's react to all events prefixed by 'hull.auth'
Hull.on('hull.auth.*', refreshButton);