const config = {
    apiKey: "7854fc8c-4394-4c24-8ea9-e6c3a9e59128"
};


// firebase setup
var firebaseConfig = {
    apiKey: "AIzaSyCdcWdbnxWMbh0s0o96tno5gHeZaYYRLHo",
    authDomain: "tiny-thesaurus.firebaseapp.com",
    databaseURL: "https://tiny-thesaurus.firebaseio.com",
    projectId: "tiny-thesaurus",
    storageBucket: "tiny-thesaurus.appspot.com",
    messagingSenderId: "183490812353",
    appId: "1:183490812353:web:7e277b47d2df7a14397740",
    measurementId: "G-NEMBXCD6M8"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();


function displayResult(result) {
  var paragraph = document.createElement("p");
  paragraph.innerHTML = result;
  document.querySelector("#results").appendChild(paragraph);
}

function httpGetRequest(queryParameter) {
  try {
    const Http = new XMLHttpRequest();
    const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${queryParameter}?key=${config.apiKey}`;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange=function(){
      if (this.readyState==4 && this.status==200) {
        var response = JSON.parse(this.responseText);
        try {
          var synonyms = response[0]["meta"]["syns"]["0"];
          synonyms.forEach(displayResult);
        } catch (e) {
          displayResult("oh no, we couldn't find that word");
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

document.getElementById("search").addEventListener("click", function(event) {
    // clear existing results
    document.querySelector("#results").innerHTML = "";
    var searchValue = document.querySelector("#searchInput").value;
    if (searchValue) {
      httpGetRequest(searchValue);
    }
});
