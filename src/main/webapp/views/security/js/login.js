let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/me",
        entryPoint: "/login",
        user: {
            username: '',
            password: '',
            authorities: [
                {authority: ''}
            ]
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
                    this.isAuthenticated = true;
                    this.user = response.data;
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

    }
});

