var currentUser;
var uid;
var matchID;
var likes;
var minAge;
var maxAge;
var age;
var dislikes;

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

//new function by elsa
// async function filterCards() {
//   firebase.auth().onAuthStateChanged((user) => {
//   currentUser = db.collection("users").doc(user.uid)
//   currentUser.get()
//   .then(userDoc => {
//     console.log("cards being filtered");
//     var minAge = userDoc.data().minAge;
//     var maxAge = userDoc.data().maxAge;
//     var genderPref = userDoc.data().genderPref;
//     console.log(minAge);
//     console.log("im in the user doc promise? ", userDoc.data());
//   });
//   });
// }



// Used to display users on main page.
function displayCardProfile(collection) {
  let cardTemplate = document.getElementById("displayPersonTemplate");
  firebase.auth().onAuthStateChanged((user) => {
    currentUser = db.collection("users").doc(user.uid)
    currentUser.get()
      .then(userDoc => {
    var minAge = userDoc.data().minAge;
    var maxAge = userDoc.data().maxAge;
    var genderPref = userDoc.data().genderPref;
    // console.log("im in the user doc promise? ", userDoc.data());
  });
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      uid = user.uid;
      console.log(uid);
      var ID = [];
      db.collection("users")
        // .where("minAge", "==", age)
        .limit(1)
        .get()
        .then(snap => {
          var i = 1; //if you want to use commented out section
          snap.forEach(doc => { //iterate thru each doc
            ID.push(doc.data().ID_Name);
            var name = doc.data().name;
            var age = doc.data().age;      
            // if (age < minAge | age > maxAge) {
            //   // main.reload();
            //   console.log(minAge);
            // }
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
              matches: firebase.firestore.FieldValue.arrayUnion(),
            }, {
              merge: true
            })

            //dislike field
            currentUser.set({
              dislikes: firebase.firestore.FieldValue.arrayUnion(),
            }, {
              merge: true
            })

            newcard.querySelector('.heart').id = "save-" + userID;
            newcard.querySelector('.heart').onclick = () => addToLikes(userID);
            currentUser.get().then(userDoc => {
              likes = userDoc.data().likes;
              if (likes.includes(userID)) {
                document.getElementById('save-' + userID).innerText = 'favorite';
              }
            })

            //attach to gallery
            document.getElementById(collection + "-go-here").appendChild(newcard);
            i++; //if you want to use commented out section

          })
        })
      
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}
displayCardProfile("profile");

function addToLikes(id) {
  var matches;
  var likes;
  currentUser.get().then((userDoc) => {
    likes = userDoc.data().likes;
    

    if (likes.includes(id)) {
      console.log(id)
      currentUser
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(id),
          matches: firebase.firestore.FieldValue.arrayRemove(id),
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
          matches: firebase.firestore.FieldValue.arrayUnion(id),
        }, {
          merge: true
        })
        .then(function () {
          checkMatch(id);
          console.log("This person is added");
          var iconID = "save-" + id;
          console.log(iconID);
          document.getElementById(iconID).innerText = 'favorite';
        });
    }
  });
}

function checkMatch(id) {
  var matches;

  currentUser.get().then((userDoc) => {
    matches = userDoc.data().matches;
    console.log(matches);
    for (i = 0; i <matches.length; i++) {
      var matchID = matches[i];
      var match = db.collection("users").doc(matchID);
        match.get().then((userDoc) => {
          match.set({
                matches: firebase.firestore.FieldValue.arrayUnion(uid),
              }, {
                merge: true
              })
              .then(function () {
                imageBlur.style.filter = "blur(0px)";
                console.log("Romance ahead!");
                console.log(matchID);
          });
        });   
    } 
  });
         
    
}

function dislike(id) {
  currentUser.get().then((userDoc) => {
    dislikes = userDoc.data().dislikes;

    currentUser.set({
      bookmarks: firebase.firestore.FieldValue.arrayUnion(id),
    }, {
      merge:true
    })
    .then(function ()  {
      console.log("Disliked");
    })
  });
}

// function checkMatch() {
//   var match;
//     for (i = 0; i < likes.length; i++) {
//       matchID = likes[i];
//       match = db.collection("users").where("userID", "==", matchID);
      

function blurify(){
  const profileImage = document.querySelector(".standard-image");
  let pixelArr = ctx.getImageData(0, 0, profileImage.width, profileImage.height).data;
  let sample_size = 40;

  for (let y = 0; y < h; y += sample_size) {
    for (let x = 0; x < w; x += sample_size) {
      let p = (x + (y * w)) * 4;
    }
  }

  ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
  ctx.fillRect(x, y, sample_size, sample_size);
}