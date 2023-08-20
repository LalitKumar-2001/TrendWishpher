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

// Listen for query button click
document.getElementById("query-button").addEventListener("click", function() {
  var queryInput = document.getElementById("query-input");
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