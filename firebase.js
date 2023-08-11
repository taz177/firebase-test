const firebaseConfig = {
  apiKey: "AIzaSyAGXGLw2L4Kz7dIL_xpTeI7l56iFxlaR_o",
  authDomain: "fir-test-40324.firebaseapp.com",
  projectId: "fir-test-40324",
  storageBucket: "fir-test-40324.appspot.com",
  messagingSenderId: "820698971222",
  appId: "1:820698971222:web:72b746f7756f87f75c8ff7",
  measurementId: "G-W4GJ6H32X9",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

//Write
function submitUserID() {
  userid = document.getElementById("userid").value;
  //1. create JSON object
  var userData = {
    id: userid,
    name: "Tasneem", //You can also retrieve these from the website, like the id
    age: 23,
  };
  //2. store the value in firebase
  var usersRef = db.ref("users");
  usersRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.hasChild(userid)) {
        console.log("'" + userid + "' exists.");
        db.ref("users/currentUser").set(userid);
        window.location.href = "home.html";
      } else {
        //only if ID does not already exist --> create one
        db.ref("users/currentUser").set(userid);
        db.ref("users/" + userid).set(userData);
        console.log(
          "'" + userid + "' did not exist, and has now been created."
        );
        window.location.href = "home.html";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
////////////////////////////////////////////////////////////////////////////////
//Read
function readCurrentID() {
  var userIDholder = document.getElementById("userIDretrieved");
  var currentUserRef = db.ref("users/currentUser");
  currentUserRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        userIDholder.innerHTML = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
////////////////////////////////////////////////////////////////////////////////
//Update
function submitNewName() {
  var newName = document.getElementById("newName").value;
  //your current user, then update their data
  var currentUser;
  var currentUserRef = db.ref("users/currentUser");
  currentUserRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        currentUser = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  // Update their data
  var usersRef = db.ref("users");
  usersRef
    .once("value")
    .then((snapshot) => {
      db.ref("users/" + currentUser + "/name").set(newName);
    })
    .catch((error) => {
      console.error(error);
    });
}
