// register
let myResetPassword = Vue.component('my-reset-password', {
    template:
        `
<div class="container">
    <div class="row margin-top-50">
         <div class="col-12 col-sm-6 col-sm-offset-3 ">
            <h3> Recuperar Contraseña</h3>
            <form  v-on:submit.prevent='resetPasswword()'>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
              </div>
              <div class="form-row" style="text-align: right">
                <button class="button border margin-top-5">
                  <i class="fa fa-spinner fa-spin" v-show="recuperarContrasenaLoading"></i>  Recuperar Contraseña
                </button>
              </div>
            </form>
        </div>
    </div>
    <div class="row margin-top-50">
         <div class="col-12 col-sm-6 col-sm-offset-3 ">
            <h3> Recuperar Contraseña</h3>
            <form  v-on:submit.prevent='resetPasswword()'>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
              </div>
              <div class="form-row" style="text-align: right">
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
        this.token = this.getParameterByName('token');
    },
    methods: {
        resetPasswword() {
            const config = {
                params: {
                    email: this.email
                }
            }
            this.recuperarContrasenaLoading = true
            axios.post('/api/user/resetPassword', {}, config)
                .then((response) => {
                    this.recuperarContrasenaLoading = false
                    sweetAlert("Exito al recuperar contraseña", "Direjase a su email para continuar el proces", "success")
                        .then((result) => {
                            document.location.href = "/"
                        });
                })
                .catch(error => {
                        console.log(error);
                        this.recuperarContrasenaLoading = false

                    }
                );


        },
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


        },
        getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    },
    watch: {}
});

