// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    $('.pace').show();
    console.log("------------  $('.pace').show();");
    return config;
}, function (error) {
    // Do something with request error
    $('.pace').show();
    console.log("------------  error axios interceptors request");
    sweetAlert("Oops...", "Error, ver consola", "error");
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    $('.pace').hide();
    console.log("------------  $('.pace').hide();");
    return response;
}, function (error) {
    // Do something with response error
    $('.pace').hide();
    console.log("------------  $('.pace').hide();");
    console.log("------------  error axios interceptors response");
    console.log(error.response);
    if(error.response.config.url !== '/api/user/me'){
        sweetAlert("Oops...", "Error, ver consola", "error");
    }
    return Promise.reject(error);
});