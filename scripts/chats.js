var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);
        
        populateMatches();
        // the following functions are always called when someone is logged in
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});
// var currentChat = document.querySelector('.clickableClass');

// currentChat.addEventListener('click', function(event) {
//     document.getElementById("clickableID").innerHTML = "YOU CLICKED ME!"
//     console.log("the console log message", this.id);

// });



function populateMatches() {
    
}