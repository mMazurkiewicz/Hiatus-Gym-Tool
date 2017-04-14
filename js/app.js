document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    // google sign in
    gapi.load('auth2', function() {
        gapi.auth2.init();
    })
    var button = document.querySelector('.login');

    button.addEventListener('click', function() {
        console.log('klik');
    })


    // firebase
    var config = {
        apiKey: "your-api-key ",
        databaseURL: "https://your-url.firebaseio.com",
    };
    var app = firebase.initializeApp(config);



});
