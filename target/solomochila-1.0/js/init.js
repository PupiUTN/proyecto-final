//GLOBAL PARA TODOS LOS JS
var login;
var hostURL;

(function ($) {
    $(function () {
        $('.button-collapse').sideNav();

    }); // end of document ready
    
    //autenticacion
    login = JSON.parse(sessionStorage.getItem("login"));
    if (login) {
        setHeadersAutorization(login.email, login.token);
    } else {
        console.log("No estas logeado");
    }
    
    //determino el host
    if (window.location.hostname === "localhost") {
        hostURL = "http://" + window.location.host + "/solomochila/";
    } else {
        hostURL = "http://" + window.location.host + "/";
    }

})(jQuery); // end of jQuery name space




function setHeadersAutorization(email, token){
  console.log("set Headers Autorization " +' Bearer ' + email +':' + token)
  // con esto seteo todas las consultas ajax el mismo header
  $.ajaxSetup({
    headers : {
      'Authorization' : 'Bearer ' + email +':' + token,
    }
  });
}