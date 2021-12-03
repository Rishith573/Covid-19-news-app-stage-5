import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyALavWPnpVaSohg7fkxdtYvxTvYINvdclE",
    authDomain: "covid-19-news-ap.firebaseapp.com",
    databaseURL: "https://covid-19-news-ap-default-rtdb.firebaseio.com",
    projectId: "covid-19-news-ap",
    storageBucket: "covid-19-news-ap.appspot.com",
    messagingSenderId: "163729062989",
    appId: "1:163729062989:web:87b5b7e1a8bdafd3fcf004"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.database();