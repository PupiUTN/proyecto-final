let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/me",
        entryPoint: "/login",
        exitPoint: "/logout",
        myUserPrincipal: {
            authorities: [
                {authority: ''}
            ],
            user: {
                profileImageUrl: '',
                username: '',
                password: '',
            }
        },
        credentials: {
            username: '',
            password: ''
        },
        isAuthenticated: false
    },
    mounted() {
        this.getUserProfile();
    },
    methods: {
        getUserProfile() {
            axios.get(this.url)
                .then((response) => {
                    console.log(response.data);
                    this.myUserPrincipal = response.data;
                    this.isAuthenticated = true;
                    var magnificPopup = $.magnificPopup.instance;
                    // save instance in magnificPopup variable
                    magnificPopup.close();
                    // Close popup that is currently opened
                })
                .catch(error => {
                        console.log(error);
                    }
                );
        },
        login() {
            axios.post(this.entryPoint, jQuery.param(this.credentials))
                .then((response) => {
                    console.log("login exitoso");
                    console.log(response.data);
                    this.getUserProfile();
                })
                .catch(error => {
                        console.log(error);
                    }
                );
        },
        logout() {
            axios.post(this.exitPoint)
                .then((response) => {
                    console.log("logout exitoso");
                    this.isAuthenticated= false;
                })
                .catch(error => {
                        console.log(error);
                    }
                );
        },

    }
});

