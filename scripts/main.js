var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //global
      console.log(currentUser);
  
      // the following functions are always called when someone is logged in
      populateRidesInfo();
    } else {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = "login.html";
    }
  });

function addToLike(id) {
    currentUser.get().then((userDoc) => {
        like = userDoc.data().likes;
        console.log(like);

        if (like.includes(id)) {
            console.log(id)
            currentUser
              .update({
                likes: firebase.firestore.FieldValue.arrayRemove(id),
              })
              .then(function () {
                console.log("This bookmark is removed");
                var iconID = "save-" + id;
                console.log(iconID);
                document.getElementById(iconID).innerText = 'favorite_border';
              });
          } else {
            currentUser
              .set({
                bookmarks: firebase.firestore.FieldValue.arrayUnion(id),
              }, {
                merge: true
              })
              .then(function () {
                console.log("This person is added");
                var iconID = "save-" + id;
                console.log(iconID);
                document.getElementById(iconID).innerText = 'favorite';
              });
          }
    });

}