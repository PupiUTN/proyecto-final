// register
let myResetPassword = Vue.component('my-reset-password', {
    template:
        `
<div class="container">
    <div class="row">
         <div class="col-md-12">
            <form class="login" v-on:submit.prevent='login()'>
                <p class="form-row form-row-wide">
                    <label for="email">Email:
                        <i class="im im-icon-Email"></i>
                        <input type="email" class="input-text"
                               v-model="email"
                               id="email"
                               value=""
                               required/>
                    </label>
                </p>
                <div class="form-row">
                    <button class="button border margin-top-5">
                      <i class="fa fa-spinner fa-spin" v-show="recuperarContrasenaLoading"></i>  Recuperar Contraseña
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
`,
    data: function () {
        return {
            token: null,
            password: null,
            passwordMatch: null,
            email: null,
            recuperarContrasenaLoading: false
        }
    },
    mounted() {
    },
    methods: {
        passwordReset() {
            const config = {
                params: {
                    email: this.email
                }
            }
            axios.post('/api/user/resetPassword', config)
                .then((response) => {
                    sweetAlert("Exito al recuperar contraseña", "Direjase a su email para continuar el proces", "success")
                        .then((result) => {
                            document.location.href = "/"
                        });
                })
                .catch(error => {
                        console.log(error);


                    }
                );


        },
        login() {
            localStorage.setItem("pending", 1);
            this.loginLoading = true;
            axios.post(this.entryUrl, jQuery.param(this.credentials))
                .then((response) => {
                    console.log("login exitoso");
                    console.log(response.data);
                    this.getUserProfile();
                })
                .catch(error => {
                        console.log("login error");
                        this.loginLoading = false;
                        this.loginError = true;
                        console.log(error);
                    }
                );
        },
        logout() {
            axios.post(this.exitUrl)
                .then((response) => {
                    console.log("logout exitoso");
                    document.location.href = "/";
                    localStorage.setItem("isAuthenticated", false);
                    localStorage.removeItem("idUser");
                    this.resetVueJsData();
                })
                .catch(error => {
                        console.log(error);
                    }
                );
        },
        register() {
            this.emailAlreadyExists = false;
            axios.post(this.registrationUrl, this.user)
                .then((response) => {
                    this.credentials.username = this.user.email;
                    this.credentials.password = this.user.password;
                    this.login();
                    console.log("registro exitoso");
                    sweetAlert("Exito", "Registro exitoso. ", "success");
                    this.resetVueJsData();
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 409) {
                            this.emailAlreadyExists = true;
                        }
                    }
                    else {
                        console.log(error);
                        sweetAlert("Error", "Error al Registrarse. ", "error");
                    }
                });
        },
        resetVueJsData() {
            Object.assign(this.$data, getDefaultData())
            this.isMounted = true;
        },
        openLoginPopUp() {
            var magnificPopup = $.magnificPopup.instance;
            // save instance in magnificPopup variable
            magnificPopup.open({
                items: {
                    src: '#sign-in-dialog',
                },
                type: 'inline',
                modal: true
            });
        },
        micuenta() { //href="/views/dashboard/dashboard.html"
            localStorage.setItem("pending", true);
            localStorage.setItem("pendingCountCuidador", 0);
            localStorage.setItem("pendingCountUser", 0);
            document.location.href = "/views/dashboard/dashboard.html";
        }
    }
    ,
    computed: {
        matchingPassword() {
            if (!this.isMounted) return;
            var confirm_password = this.$refs.password2;
            if (confirm_password) {
                if (this.user.matchingPassword !== this.user.password && this.user.matchingPassword) {
                    confirm_password.setCustomValidity("Passwords Don't Match");
                    return true;
                }
                confirm_password.setCustomValidity("");
                return false;
            }
            return false;


        }
    },
    watch: {
        'isAuthenticated': function () {
            this.$emit('is-authenticated', this.isAuthenticated);
        }
    }
});

