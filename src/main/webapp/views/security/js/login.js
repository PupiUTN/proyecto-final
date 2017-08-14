function getDefaultData() {
    return {
        meUrl: "/api/user/me",
        entryUrl: "/login",
        exitUrl: "/logout",
        registrationUrl: "/api/user/registration",
        credentials: {
            username: '',
            password: ''
        },
        isAuthenticated: false,
        user: {
            profileImageUrl: '/img/no-avatar.png',
            username: '',
            password: '',
            matchingPassword: '',
            email: '',
        }
    }
}

let vm = new Vue({
    el: '#appVue',
    data: getDefaultData(),
    mounted() {
        this.getUserProfile();
    },
    methods: {
        getUserProfile() {
            axios.get(this.meUrl)
                .then((response) => {
                    console.log(response.data);
                    this.user = response.data.principal.user;
                    this.isAuthenticated = true;
                    var magnificPopup = $.magnificPopup.instance;
                    // save instance in magnificPopup variable
                    magnificPopup.close();
                    // Close popup that is currently opened
                })
                .catch(error => {
                        if (error.response.status == 401) {
                            console.log("usuario no logeado");

                        } else {
                            console.log(error);
                        }

                    }
                );
        },
        login() {
            axios.post(this.entryUrl, jQuery.param(this.credentials))
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
            axios.post(this.exitUrl)
                .then((response) => {
                    console.log("logout exitoso");
                    this.resetVueJsData();
                })
                .catch(error => {
                        console.log(error);
                    }
                );
        },
        register() {
            axios.post(this.registrationUrl, this.user)
                .then((response) => {
                    console.log("registro exitoso");
                    var magnificPopup = $.magnificPopup.instance;
                    // save instance in magnificPopup variable
                    magnificPopup.close();
                    // Close popup that is currently opened
                    this.resetVueJsData();
                })
                .catch(error => {
                        console.log(error);
                    }
                );
        },
        resetVueJsData(keep) {
            var def = getDefaultData();
            def[keep] = this[keep];
            Object.assign(this.$data, def);
        },
        passwordMatchingValidation(){

        }
    }
});

