var numberOfAjaxCAllPending = 0;
var pageLoader = document.getElementById('page-loader');

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    numberOfAjaxCAllPending++;
    $('#page-loader').show();

    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    numberOfAjaxCAllPending--;
    console.log("------------  Ajax pending", numberOfAjaxCAllPending);
    // Do something with response data
    if (numberOfAjaxCAllPending == 0) {
        $('#page-loader').hide();
    }
    return response;
}, function (error) {
    numberOfAjaxCAllPending--;
    console.log("------------  Ajax pending", numberOfAjaxCAllPending);
    if (numberOfAjaxCAllPending == 0) {
        $('#page-loader').hide();
    }
    return Promise.reject(error);
});

//axios.defaults.baseURL = 'http://pupi.com.ar';
