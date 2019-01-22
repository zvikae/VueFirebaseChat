import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCHxbWshvZNvl2gCntDTEMOZXZGw8_XhV0",
    authDomain: "vuefirebasechat-ca27f.firebaseapp.com",
    databaseURL: "vuefirebasechat-ca27f.firebaseio.com",
    projectId: "vuefirebasechat-ca27f",
    storageBucket: "vuefirebasechat-ca27f.appspot.com",
    messagingSenderId: "285776356921"
};
var fire = firebase.initializeApp(config);
export default fire;