var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
  
        currentUser = db.collection("users").doc(user.uid)
        console.log(user.uid);
  
        //get the document for current user.
        currentUser.get()
          .then(userDoc => {
            //get the data fields of the user
            var userName = userDoc.data().name;
            var userAge = userDoc.data().age;
            var userLocation = userDoc.data().location;
            var userGender = userDoc.data().gender;
  
            //if the data fields are not empty, then write them in to the form.
            if (userName != null) {
              document.getElementById("nameInput").value = userName;
            }
            if (userSchool != null) {
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
        // No user is signed in.
        console.log("No user is signed in");
      }
    });
  }
  
  //call the function to run it 
  populateInfo();
  
  function editUserInfo() {
    //Enable the form fields
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
        gender: userGender
      })
      .then(() => {
        console.log("Document successfully updated!");
        window.location.assign("main.html");
      })
  }
  document.getElementById('personalInfoFields').disabled = true;