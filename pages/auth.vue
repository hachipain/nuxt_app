<template>
  <section class="container">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <hr />
    <router-link to="/">Go to Top</router-link>
  </section>
</template>

<script>
import firebase from "firebase";
export default {
  data: function() {
    return {
      title: "Auth",
      message: "This is a message."
    };
  },
  created: function() {
    var firebaseConfig = {
      apiKey: "AIzaSyBPLapP5QF_ywF9I6TokzFIcIrPLK5NdJs",
      authDomain: "nuxt-firebase-sample-e3b55.firebaseapp.com",
      databaseURL: "https://nuxt-firebase-sample-e3b55.firebaseio.com",
      projectId: "nuxt-firebase-sample-e3b55",
      storageBucket: "nuxt-firebase-sample-e3b55.appspot.com",
      messagingSenderId: "455763370080",
      appId: "1:455763370080:web:b1d71aea91b2d531546305",
      measurementId: "G-HY8XGHK3K4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const provider = new firebase.auth.GoogleAuthProvider();
    let self = this;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        self.message = result.user.displayName + "," + result.user.email;
      });
  }
};
</script>

<style>
.container {
  padding: 5px 10px;
}
h1 {
  font-size: 60pt;
  color: #345980;
}
p {
  padding-top: 5px;
  font-size: 20pt;
}
hr {
  margin: 10px 0px;
}
</style>
