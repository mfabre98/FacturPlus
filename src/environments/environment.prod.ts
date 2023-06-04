export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyDO4Aoea7usMDCY8S-SsKX1X4x6J4rJyxY",
    authDomain: "facturplus1.firebaseapp.com",
    projectId: "facturplus1",
    storageBucket: "facturplus1.appspot.com",
    messagingSenderId: "880474156453",
    appId: "1:880474156453:web:3e79b797aebf740ee48c4c",
    measurementId: "G-E9ME8Z49VC"
  },
  urlConf: 'https://facturplus1-default-rtdb.europe-west1.firebasedatabase.app'
};

const PARENT = {
  fpnet: environment.urlConf + '/fpnet',
};


const fpnet = {
  post_config: PARENT.fpnet + '/config',
  post_comments: PARENT.fpnet + '/comments'
};

export const SERVER_URLS = {
  fpnet
};