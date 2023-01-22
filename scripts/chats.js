
// Used to make divs clickable, current changes inner html to test and print
var clickedChat = document.querySelector('.clickableClass');

clickedChat.addEventListener('click', function(event) {
    document.getElementById("clickableID").innerHTML = "YOU CLICKED ME!"
    console.log("the console log message", this.id);
    /// function that populates the chat dynamically which is passed the this,id which is will be the matchID / chatID
    var selectedChat = this.id;

   
});

function populateChat(selectedChat) {

}

//Checks if user is logged in and then populates their matches into the sidebar.
var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //global
      console.log(currentUser);
      currentMatches = db.collection("users").doc(user.uid).get();
      console.log(currentMatches);
  
      // the following functions are always called when someone is logged in
      populateMatches();
    } else {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = "login.html";
    }
  });

  function populateMatches(){
    
  }
  


