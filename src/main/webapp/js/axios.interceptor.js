// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    $('.pace').show();
    return config;
}, function (error) {
    $('.pace').show();
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    $('.pace').hide();
    return response;
}, function (error) {
    // Do something with response error
    $('.pace').hide();
    return Promise.reject(error);
});