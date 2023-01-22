var currentUser;
var uid;
var matchID;
var likes;
var minAge;
var maxAge;
var age;

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
async function filterCards() {
  firebase.auth().onAuthStateChanged((user) => {
  currentUser = db.collection("users").doc(user.uid)
  currentUser.get()
  .then(userDoc => {
    console.log("cards being filtered");
    var minAge = userDoc.data().minAge;
    var maxAge = userDoc.data().maxAge;
    var genderPref = userDoc.data().genderPref;
    console.log(minAge);
    console.log("im in the user doc promise? ", userDoc.data());
  });
  });
}



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
     //danger below     
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
            newcard.querySelector('.age').innerHTML = "Age: " + age;
            newcard.querySelector('.location').innerHTML = "City: " + location;
            newcard.querySelector('.hook').innerHTML = "About: " + hook;
            newcard.querySelector('.prompt1').innerHTML = "Fun fact: " + prompt1;
            newcard.querySelector('.prompt2').innerHTML = "Wants someone who: " + prompt2;
            const img = document.createElement('img');
            newcard.querySelector('#profilePic').appendChild(img).src = picUrl;
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

            newcard.querySelector('.heart').id = "save-" + userID;
            newcard.querySelector('.heart').onclick = () => addToLikes(userID);
            currentUser.get().then(userDoc => {
              var likes = userDoc.data().likes;
              if (likes.includes(userID)) {
              var likes = userDoc.data().likes;
              }
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
    currentUser.get().then((userDoc) => {
        like = userDoc.data().likes;
        console.log(like);
        const imageBlur = document.querySelector(".standard-image");
        if (like.includes(id)) {
            console.log(id)
            currentUser
              .update({
                likes: firebase.firestore.FieldValue.arrayRemove(id),
              })
              .then(function () {
                imageBlur.style.filter = "blur(25px)";
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
                imageBlur.style.filter = "blur(0px)";
                console.log("This person is added");
                var iconID = "save-" + id;
                console.log(iconID);
                document.getElementById(iconID).innerText = 'favorite';
              });
          }
    });

}

// function checkMatch() {
//   var match;
//     for (i = 0; i < likes.length; i++) {
//       matchID = likes[i];
//       match = db.collection("users").where("userID", "==", matchID);
      

function blurify(){
  const profileImage = document.querySelector(".standard-image");

  // let c = document.createElement("canvas");
  // let img1 = new Image();
  // let source;
  // img1.onload = function () {
  //   document.querySelector("#profilePic").remove();

  //   w = img1.width;
  //   h = img1.height;

  //   c.width = w;
  //   c.height = h;
  //   ctx = c.getContext('2d');
  //   ctx.drawImage(img1, 0, 0);

  //   //continue the image processing
  //   let pixelArr = ctx.getImageData(0, 0, w, h).data;

  //   let sample_size = 40;

  //   for (let y = 0; y < h; y += sample_size) {
  //     for (let x = 0; x < w; x += sample_size) {
  //       let p = (x + (y*w)) * 4;
  //       ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
  //       ctx.fillRect(x, y, sample_size, sample_size);
  //     }
  //   }

  //   let img2 = new Image();
  //   img2.src = c.toDataURL();
  //   img2.width = 800;
  //   document.body.appendChild(img2);

  // };

  for (let y = 0; y < h; y += sample_size) {
    for (let x = 0; x < w; x += sample_size) {
      let p = (x + (y*w)) * 4;
    }
  }

  ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
ctx.fillRect(x, y, sample_size, sample_size);
}
