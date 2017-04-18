document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDlj4Atpsmlp020aVLzz0cP0uDKARcXEnQ",
        authDomain: "hiatus-gym-tool.firebaseapp.com",
        databaseURL: "https://hiatus-gym-tool.firebaseio.com",
        projectId: "hiatus-gym-tool",
        storageBucket: "hiatus-gym-tool.appspot.com",
        messagingSenderId: "350865637772"
    };
    var dataBase = firebase.initializeApp(config);

    var users = dataBase.database().ref('users');
    users.on("value", function(data) {
        console.log(data.val());
    }, function(error) {
        console.log("Error: " + error.code);
    });

});
