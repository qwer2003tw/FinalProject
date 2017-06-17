$(document).ready(function(){

  //initial dialog
  $( "#dialog" ).dialog({
    autoOpen: false
  });

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
  var dbRef;

  dbRef=firebase.database().ref('/list/');
  //
  dbRef.on('child_added', function(snapshot) {
      var v=snapshot.val();
      var k="<tr><td width=100>"+v.name+"</td>"+"<td width=140>"+v.date+"</td>"+"<td width=150>"+v.money+"</td>"+"<td width=200>"+v.thing+"</td></tr>"
      $("#ta").append(k);
  });
  // list

  //

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
                  alert("註冊成功, 謝謝您的註冊。")
                  setTimeout(function(){
                      location.href = "index.html";
                  },800);
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


      //if(!donateLogin)donateLogin.style.display = "none";
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
      var nowUser = firebase.auth().currentUser;
      dbRef=firebase.database().ref('/users/' + nowUser.uid +'/list/');

      dbRef.on('child_added', function(snapshot) {
          var v=snapshot.val();
          var k="<tr><td width=100>"+v.name+"</td>"+"<td width=140>"+v.date+"</td>"+"<td width=150>"+v.money+"</td>"+"<td width=200>"+v.thing+"</td></tr>"
          $("#ta1").append(k);
      });
      // profile list


      //

      document.getElementById("donatelogIn").style.display = "none";
      document.getElementById("donateForm").style.display = "block";
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
      location.href="signUpIn.html";
    }
  })
};
function checkLogin() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user){
      location.href="profile.html";

    }
    else {
      location.href="signUpIn.html";
    }
  })
};

function modify(){
  $( "#dialog" ).dialog('open');
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

function linkToSignIn(){
  location.href ="signUpIn.html";
}
function submitBtn(){
  var money=$("#money").val();
  var donateName=$("#donateName").val();
  var thing=$("#thing").val();
  uploaddb(donateName, money, thing);

}
function uploaddb(dn, m, t) {
  　var Today=new Date();
    var date=Today.getMonth()+1+"/"+Today.getDate()+" "+Today.getHours()+":"+Today.getMinutes()+":"+Today.getSeconds();
    var dbRef;
    var user = firebase.auth().currentUser;
    dbRef=firebase.database().ref('list/');

    dbRef.push({'date':date,
                'name':dn,
                'money':m,
                'thing':t
    })

    dbRef=firebase.database().ref('users/' + user.uid + '/list');
    dbRef.push({'date':date,
                'name':dn,
                'money':m,
                'thing':t
    })

    alert("謝謝您的愛心！");
    setTimeout(function(){
        location.href = "list.html";
    },500);
}
function linkToDonate() {
          location.href = "donate.html";
}
