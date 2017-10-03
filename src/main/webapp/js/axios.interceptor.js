var numberOfAjaxCAllPending = 0;
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    numberOfAjaxCAllPending++;
    // Do something before request is sent
    // $('.pace').show();
    // console.log("------------  $('.pace').show();");
    return config;
}, function (error) {
    // Do something with request error
    console.log("------------  error axios interceptors request");
    sweetAlert("Oops...", "Error, ver consola", "error");
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    numberOfAjaxCAllPending--;
    console.log("------------  Ajax pending", numberOfAjaxCAllPending);
    // Do something with response data


    var pace = document.getElementsByClassName('pace'), i;
    console.log("------------ request get elemeb by class", pace);

    for (var i = 0; i < pace.length; i++) {
        pace[i].style.display = 'none';
    }


    var appBanners = document.getElementsByClassName('pace-progress'), i;

    for (var i = 0; i < appBanners.length; i++) {
        appBanners[i].style.display = 'none';
    }

    $('.pace').hide();
    $('.pace-progress').hide();
    console.log("------------  $('.pace').hide();");

    return response;
}, function (error) {
    numberOfAjaxCAllPending--;
    console.log("------------  error axios interceptors response");
    // Do something with response error
    $('.pace').hide();
    $('.pace-progress').hide();

    var pace = document.getElementsByClassName('pace'), i;
    console.log("------------  response get elemeb by class", pace);

    for (var i = 0; i < pace.length; i++) {
        pace[i].style.display = 'none';
    }
    // var appBanners = document.getElementsByClassName('pace-progress'), i;
    //
    // for (var i = 0; i < appBanners.length; i ++) {
    //     appBanners[i].style.display = 'none';
    // }


    console.log("------------  $('.pace').hide();");
    console.log(error.response);
    if (error.response.config.url !== '/api/user/me') {
        sweetAlert("Oops...", "Error, ver consola", "error");
    }
    return Promise.reject(error);
});


