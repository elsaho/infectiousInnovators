var firebaseConfig = {
    apiKey: "AIzaSyDDxVvx5-1oGEwxZqu3JWNMqY_IhLQkvzw",
    authDomain: "pixelperfectmatch-a9ea1.firebaseapp.com",
    projectId: "pixelperfectmatch-a9ea1",
    storageBucket: "pixelperfectmatch-a9ea1.appspot.com",
    messagingSenderId: "646416016534",
    appId: "1:646416016534:web:6ab4d1b9bc6aec00a18eb7"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var storage = firebase.storage();