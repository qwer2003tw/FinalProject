$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDSZeAKZrLGU2tLIYctRaVaETtyMUkzZlE",
    authDomain: "finalproject-22dec.firebaseapp.com",
    databaseURL: "https://finalproject-22dec.firebaseio.com",
    projectId: "finalproject-22dec",
    storageBucket: "finalproject-22dec.appspot.com",
    messagingSenderId: "364659582212"
   };
  firebase.initializeApp(config);

  //Email/Pwd註冊
  var loginUser;
  var account = document.getElementById("account");
  var pwd = document.getElementById("pwd");
  var name = document.getElementById("name");
  var birth = document.getElementById("birth");
  var number = document.getElementById("phoneNum");
  var registerSmtBtn = document.getElementById("registerSmtBtn");

  var accountL = document.getElementById("accountL");
  var pwdL = document.getElementById("pwdL");
  var loginSmtBtn = document.getElementById("loginSmtBtn");
  var message = document.getElementById("message");
  var signInUp = document.getElementById("signUpIn");

  //Email/Pwd註冊
  if(registerSmtBtn != null)
{
  registerSmtBtn.addEventListener("click", function(){
          if(name.vale != "" && birth.value != "" && number.value != "")
          {
            console.log(account.value);
            firebase.auth().createUserWithEmailAndPassword(account.value, pwd.value).then(function(){
                  //登入成功後，取得登入使用者資訊
                  loginUser = firebase.auth().currentUser;
                  console.log("登入使用者為",loginUser);
                  location.href = "index.html";
                  firebase.database().ref('users/' + loginUser.uid).set({
                    email: loginUser.email,
                    name: name.value,
                    birth: birth.value,
                    number: phoneNum.value
                  }).catch(function(error){
                    console.error("寫入使用者資訊錯誤",error);
                  });
                }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMsg = error.message;
                console.log(errorMsg);
              });
          }
          else {
            message.innerHTML = "Can't Empty!!!"
            message.style.color = "red";
          }
   },false);
}



  //登入
if(loginSmtBtn != null)
{
  loginSmtBtn.addEventListener("click",function(){
      console.log(accountL.value);
    firebase.auth().signInWithEmailAndPassword(accountL.value, pwdL.value).then(function(){
            location.href = "index.html";
    }).catch(function(error) {
    	// Handle Errors here.
      message.innerHTML="please eneter again.";
    	var errorCode = error.code;
    	var errorMessage = error.message;
    	console.log(errorMessage);
    })
  },false);

}


  //user logout
  /*
  var signoutSmtBtn = document.getElementById("signoutSmtBtn");
  signoutSmtBtn.addEventListener("click",function(){
      firebase.auth().signOut().then(function() {
          console.log("User sign out!");
      }, function(error) {
      console.log("User sign out error!");
      })
  },false);
*/
  //查看目前登入狀況
  var user;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    	user = user;
      console.log("User is logined", user);
      signUpIn.innerHTML= "登出";
    } else {
    	user = null;
      console.log("User is not logined yet.");
      signUpIn.innerHTML = "註冊/登入";
    }
  });

});
function checkUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.auth().signOut();
      location.href="SignUpIn.html";
    }
  })
};
