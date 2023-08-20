import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js'
    // Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js'
// JavaScript code to handle chat interactions will go here
// Function to extract URL parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
  // Function to update user profile on the new page
  function updateUserProfile(user) {
    var profileImage = document.getElementById("profile-image");
    var userNameElement = document.getElementById("user-name");
  
    if (user) {
      profileImage.src = user.photoURL || "path/to/default-profile-image.png";
      userNameElement.textContent = user.displayName || "Guest";
    }
  }
  
  // Check for user information parameter on page load
  document.addEventListener("DOMContentLoaded", function() {
    var userInfo = getParameterByName("user");
    if (userInfo) {
      updateUserProfile(JSON.parse(userInfo));
    }
  });
  


//   // Function to update text display from the server
// function updateTextDisplay(text) {
//   var textDisplay = document.querySelector(".text-display");
//   textDisplay.textContent = text;
// }

// // Check for user information parameter on page load
// document.addEventListener("DOMContentLoaded", function() {
//   var userInfo = getParameterByName("user");
//   if (userInfo) {
//     updateUserProfile(JSON.parse(userInfo));
//   }

//   // Example: Simulate text received from the server
//   var textFromServer = "Hello! This is some text from the server.";
//   updateTextDisplay(textFromServer);
// });

const firebaseConfig = {
  apiKey: "AIzaSyAtRTgINyW92b3cyHn8BoU4tRqdi9Wgy_c",
  authDomain: "trendwishpher.firebaseapp.com",
  projectId: "trendwishpher",
  storageBucket: "trendwishpher.appspot.com",
  messagingSenderId: "468308201980",
  appId: "1:468308201980:web:ebd35670a3ac0aec38a279",
  measurementId: "G-S83DYLBXX4"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var queriesCollection = db.collection("queries");

// Function to send queries and update UI with response
function sendQueryAndDisplayResponse(query) {
  // Send the query to Firestore and listen for changes
  var queryRef = db.collection("queries").doc();

  queryRef.set({ query: query });

  // Listen for changes in the response document
  queryRef.collection("response").doc("responseDoc").onSnapshot(function(snapshot) {
    var response = snapshot.data().response;
    updateTextDisplay(response);
  });
}
var queryInput = document.getElementById("query-input");

// Listen for query button click
document.getElementById("query-button").addEventListener("click", function() {
  var query = queryInput.value.trim();
  if (query !== "") {
    sendQueryAndDisplayResponse(query);
  }
});

// Initialize page and user profile
document.addEventListener("DOMContentLoaded", function() {
  var userInfo = getParameterByName("user");
  if (userInfo) {
    updateUserProfile(JSON.parse(userInfo));
  }
});

// Reference to the text display element
var textDisplay = document.getElementById("text-from-server");

// Reference to the Firestore collection where queries and replies are stored


// Function to display text messages on the webpage
function displayTextMessage(text) {
  var messageElement = document.createElement("p");
  messageElement.textContent = text;
  textDisplay.appendChild(messageElement);
}

// Set up Firestore listener to watch for changes in the queries collection
queriesCollection.onSnapshot(function(snapshot) {
  snapshot.docChanges().forEach(function(change) {
    if (change.type === "added") {
      var queryData = change.doc.data();
      // Check if the query has a reply
      if (queryData.reply) {
        var replyText = queryData.reply;
        displayTextMessage(replyText);
      }
    }
  });
});

// Create a new document in the queries collection
queriesCollection.add({
  query: queryInput,
  reply: "This is the reply to your query." // Replace with the actual reply
});
