var currentUser
var ImageFile; //global variable to store the File Object reference

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("mypic-goes-here"); // pointer #2

  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener("change", function (e) {
    //the change event returns a file "e.target.files[0]"
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);

    //change the DOM img element source to point to this file
    image.src = blob; //assign the "src" property of the "img" tag
  });
}
chooseFileListener();

function showUploadedPicture() {
  const fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("mypic-goes-here"); // pointer #2

  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener("change", function (e) {
    //the change event returns a file "e.target.files[0]"
    var blob = URL.createObjectURL(e.target.files[0]);

    //change the DOM img element source to point to this file
    image.src = blob; //assign the "src" property of the "img" tag
  });
}
showUploadedPicture();

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
  
        currentUser = db.collection("users").doc(user.uid)
        console.log(user.uid);
  
        currentUser.get()
          .then(userDoc => {

            var userName = userDoc.data().name;
            var userAge = userDoc.data().age;
            var userLocation = userDoc.data().location;
            var userGender = userDoc.data().gender;
            // var profilePic = userDoc.data().profilePic;
            if (userName != null) {
              document.getElementById("nameInput").value = userName;
            }
            if (userAge != null) {
              document.getElementById("ageInput").value = userAge;
            }
            if (userLocation != null) {
              document.getElementById("locationInput").value = userLocation;
            }
            if (userGender != null) {
              if (userGender == "Female") {
                $('.Female').prop('checked', true);
              }
              if (userGender == "Male") {
                $('.Male').prop('checked', true);
              }
              if (userGender == "Non-binary") {
                $('.nonBinary').prop('checked', true);
              }
            }
            
          })
      } else {
        console.log("No user is signed in");
      }
    });
  }
  
  populateInfo();
  
  function savePicture(cid) {
    firebase.auth().onAuthStateChanged(function (user) {
      var uid = user.uid;
      console.log(uid);
      var storageRef = storage.ref("images/" + cid + ".jpg");
  
      //Asynch call to put File Object (global variable ImageFile) onto Cloud
      storageRef.put(ImageFile).then(function () {
        console.log("Uploaded to Cloud Storage.");
  
        //Asynch call to get URL from Cloud
        storageRef.getDownloadURL().then(function (url) {
          // Get "url" of the uploaded file
          console.log("Got the download URL. " + url);
          //Asynch call to save the form fields into Firestore.
          db.collection("users")
            .doc(uid)
            .update({
              profilePic: url, // Save the URL into users collection
            })
            .then(function () {
              console.log("Updated profile picture to Firestore.");
              // document.getElementById("personalInfoFields").disabled = true;
            });
        });
      });
    });
  }


  function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
  }
  
  function saveUserInfo() {  
    userName = document.getElementById('nameInput').value; 
    userAge = document.getElementById('ageInput').value; 
    userLocation = document.getElementById('locationInput').value;
    userGender = document.querySelector('input[name="Gender"]:checked').value;
  
    currentUser.update({
        name: userName,
        age: userAge,
        location: userLocation,
        // gender: userGender
      })
      .then(() => {
        console.log("test");
        savePicture(currentUser.id)
        console.log("Document successfully updated!");
        // window.location.assign("main.html");
      })

      currentUser.update({
        gender: userGender
      })
  }

  function changePage(){
    
  }
  document.getElementById('personalInfoFields').disabled = true;