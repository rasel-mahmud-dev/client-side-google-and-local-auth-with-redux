
export default (callback) => {
  window.gapi.load("client:auth2", () => {
    window.gapi.client
      .init({
        clientId:
          "419870118551-kocv53qfo7rqcm4l3jrjp8is57feqqet.apps.googleusercontent.com",
        scope: "email"
      })
      .then(() => {        
        let auth = window.gapi.auth2.getAuthInstance();
        callback(auth);
      })
      .catch(error=>console.log(error))
  });
};
