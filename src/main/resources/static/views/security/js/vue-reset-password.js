// register
let myResetPassword = Vue.component('my-reset-password', {
    template:
        `
<div class="container">
    <div class="row margin-top-50" v-if="!token">
         <div class="col-12 col-sm-6 col-sm-offset-3 ">
            <h3> Recuperar Contraseña</h3>
            <form  v-on:submit.prevent='resetPassword()'>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar email" required>
              </div>
              <div class="form-row" style="text-align: right">
                <button class="button border margin-top-5">
                  <i class="fa fa-spinner fa-spin" v-show="recuperarContrasenaLoading"></i>  Recuperar Contraseña
                </button>
              </div>
            </form>
        </div>
    </div>
    <div class="row margin-top-50" v-if="token">
         <div class="col-12 col-sm-6 col-sm-offset-3 ">
            <h3> Nueva Contraseña </h3>
            <form  v-on:submit.prevent='changePassword()'>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar email" required>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Contraseña</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPasswordReset1" placeholder="Ingresar Contraseña" required>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Repetir Contraseña</label>
                <input v-model="passwordMatch" type="password" class="form-control" id="exampleInputPasswordReset2" placeholder="Ingresar Contraseña Repetida" required>
              </div>
              <div class="form-row" style="text-align: right">
                <button class="button border margin-top-5">
                  <i class="fa fa-spinner fa-spin" v-show="recuperarContrasenaLoading"></i>  Cambiar Contraseña
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
        this.token = this.getParameterByName("token");
    },
    methods: {
        resetPassword() {
            const config = {
                params: {
                    email: this.email
                }
            }
            this.recuperarContrasenaLoading = true
            axios.post('/api/user/resetPassword', {}, config)
                .then((response) => {
                    this.recuperarContrasenaLoading = false
                    sweetAlert({
                            title: "Exito",
                            text: "Dirigete a tu email para continuar el proceso.",
                            type: "success"
                        },
                        function () {
                            document.location.href = "/"
                        });
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert({
                            title: "Error",
                            text: "Email inexistente",
                            type: "error"
                        });
                        this.recuperarContrasenaLoading = false

                    }
                );


        },
        changePassword() {
            const config = {
                params: {
                    email: this.email,
                    token: this.token,
                    passwordUpdated: this.password,
                    passwordMatch: this.passwordMatch
                }
            }
            this.recuperarContrasenaLoading = true
            axios.post('/api/user/changePassword', {}, config)
                .then((response) => {
                    this.recuperarContrasenaLoading = false
                    sweetAlert({
                            title: "Exito",
                            text: "Tu contraseña a sido actualizada.",
                            type: "success"
                        },
                        function () {
                            document.location.href = "/"
                        });
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert({
                            title: "Error",
                            text: "Token Invalido, a expirado o ya a sido utulizado o no corresponde para el email ingresado.",
                            type: "error"
                        });
                        this.recuperarContrasenaLoading = false

                    }
                );


        },
        getParameterByName(name, url) {
            if (!url) url = window.location.href;
            console.log('getParameterByName', name, url)
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
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
    watch: {}
});

