var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //global
      console.log(currentUser);
  
      // the following functions are always called when someone is logged in
    } else {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = "login.html";
    }
  });


// Used to display tasks on main page.
function displayCardProfile(collection) {
  let cardTemplate = document.getElementById("displayPersonTemplate");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(uid);
      var ID = [];
      db.collection("users")
      .limit(1)
        .get()
        .then(snap => {
          var i = 1;  //if you want to use commented out section
          snap.forEach(doc => { //iterate thru each doc
            ID.push(doc.data().ID_Name);
            var name = doc.data().name;
            var age = doc.data().age;        // get value of the "name" key
            var location = doc.data().location;
            var hook = doc.data().hook;
            var prompt1 = doc.data().prompt1;
            var prompt2 = doc.data().prompt2;
            var userID = doc.data().userID;
            var picUrl = doc.data().profilePic;
            let newcard = cardTemplate.content.cloneNode(true);

            //update title and text and image
            newcard.querySelector('.name').innerHTML = name;
            newcard.querySelector('.age').innerHTML = "age: " + age;
            newcard.querySelector('.location').innerHTML = location;
            newcard.querySelector('.hook').innerHTML = hook;
            newcard.querySelector('.prompt1').innerHTML = prompt1;
            newcard.querySelector('.prompt2').innerHTML = prompt2;
            const img = document.createElement('img');
            newcard.querySelector('.profilePic').appendChild(img).src = picUrl;
            img.className = "standard-image";
            //give unique ids to all elements for future use
            // newcard.querySelector('.date').setAttribute("id", "tdate" + i);
            // newcard.querySelector('.card-title').setAttribute("id", "tTitle" + i);
            // newcard.querySelector('.card-title').setAttribute("class", "tTitle" + " btn onyx lavender-blush-text card-href card-title d-block");
            // newcard.querySelector('.timeStart').setAttribute("id", "tStart" + i);
            // newcard.querySelector('.timeEnd').setAttribute("id", "tEnd" + i);
            

            //likes field created in Fire Store foe addToLikes()
            currentUser.set({
                likes: firebase.firestore.FieldValue.arrayUnion(),
              }, {
                merge: true
            })

            newcard.querySelector('.heart').id = "save-" + userID;
            newcard.querySelector('.heart').onclick = () => addToLikes(userID);
            currentUser.get().then(userDoc => {
                var likes = userDoc.data().likes;
                if (likes.includes(userID)) {
                document.getElementById('save-' + userID).innerText = 'favorite';
                }
              })

            //attach to gallery
            document.getElementById(collection + "-go-here").appendChild(newcard);
            i++;   //if you want to use commented out section

          })

        })
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}
displayCardProfile("test");

function addToLikes(id) {
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
                console.log("This person is removed");
                var iconID = "save-" + id;
                console.log(iconID);
                document.getElementById(iconID).innerText = 'favorite_border';
              });
          } else {
            currentUser
              .set({
                likes: firebase.firestore.FieldValue.arrayUnion(id),
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

console.log("test");
