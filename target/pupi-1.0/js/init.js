//GLOBAL PARA TODOS LOS JS
var hostURL;

(function ($) {
    $(function () {
        $('.button-collapse').sideNav();

    }); // end of document ready
    
    
    //determino el host
    if (window.location.hostname === "localhost") {
        hostURL = "http://" + window.location.host + "/pupi/";
    } else {
        hostURL = "http://" + window.location.host + "/";
    }

})(jQuery); // end of jQuery name space



