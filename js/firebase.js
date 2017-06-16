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
                  firebase.database().ref('users/' + loginUser.uid).set({
                    email: loginUser.email,
                    name: name.value,
                    birth: birth.value,
                    number: phoneNum.value
                  }).catch(function(error){
                    console.error("寫入使用者資訊錯誤",error);
                  });
                  setTimeout(function(){
                      location.href = "index.html";
                  },1000);
                }).catch(function(error) {
                // Handle Errors here.
                alert("帳號或密碼輸入格式錯誤！");
                account.value = null;
                pwd.value = null;
                var errorCode = error.code;
                var errorMsg = error.message;
                console.log(errorMsg);
              });
          } else{
              alert("欄位不得為空白！ 請確認後再送出, 謝謝。");
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
      alert("帳號或密碼輸入錯誤, 請重新輸入");
      accountL.value = null;
      pwdL.value = null;
    	var errorCode = error.code;
    	var errorMessage = error.message;
    	console.log(errorMessage);
    })
  },false);

}

  //查看目前登入狀況
  var user;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    	user = user;
      console.log("User is logined", user);
      signUpIn.innerHTML= "登出";

      var nameDisplay = document.getElementById("nameDisplay");
      var birthDisplay = document.getElementById("birthDisplay");
      var emailDisplay = document.getElementById("emailDisplay");
      var phoneDisplay = document.getElementById("phoneDisplay");
      // profile

      firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
        //var userInfoText = "使用者姓名："+snapshot.val().name+", 使用者年齡:"+snapshot.val().age;
        nameDisplay.innerHTML = snapshot.val().name;
        birthDisplay.innerHTML = snapshot.val().birth;
        emailDisplay.innerHTML = snapshot.val().email;
        phoneDisplay.innerHTML = snapshot.val().number;
        //userInfo.innerHTML = userInfoText;
      });
      // end profile

    } else {
    	user = null;
      console.log("User is not logined yet.");
      signUpIn.innerHTML = "註冊/登入";
    }
  });


    /* upload file
    var uploadFileInput = document.getElementById("uploadFileInput");
    uploadFileInput.addEventListener("change", function(){
          var file = this.files[0];
          var uploadTask = storageRef.child('images/'+file.name).put(file);
          uploadTask.on('state_changed', function(snapshot){
            // 觀察狀態變化，例如：progress, pause, and resume

            // 取得檔案上傳狀態，並用數字顯示

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'

                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'

                console.log('Upload is running');
                break;
            }
          }, function(error) {
            // Handle unsuccessful uploads

          }, function() {
            // Handle successful uploads on complete

            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            var downloadURL = uploadTask.snapshot.downloadURL;
          });
    },false);
*/
});
function checkUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.auth().signOut();
      location.href="SignUpIn.html";
    }
  })
};
function checkLogin() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user){
      location.href="profile.html";

    }
    else {
      location.href="SignUpIn.html";
    }
  })
};

function modify(){
  $( "#dialog" ).dialog();
  $( "#nt1").val($( "#nameDisplay").html());
  $( "#nt2").val($( "#birthDisplay").html());
  $( "#nt3").val($( "#emailDisplay").html());
  $( "#nt4").val($( "#phoneDisplay").html());
};

function Update() {
  var dbUser = firebase.database().ref().child('users');
  var user = firebase.auth().currentUser;

  var name = document.getElementById("nt1");
  var birth = document.getElementById("nt2");
  var mail = document.getElementById("nt3");
  var phone = document.getElementById('nt4');

  loginUser = firebase.auth().currentUser;
  console.log("登入使用者為",loginUser);
  firebase.database().ref('users/' + loginUser.uid).set({
    email: nt3.value,
    name: nt1.value,
    birth: nt2.value,
    number: nt4.value  }).catch(function(error){
    console.error("寫入使用者資訊錯誤",error);
  });
  location.href = "profile.html";

}
