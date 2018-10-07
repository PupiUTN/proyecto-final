function getDefaultData() {
    return {
        meUrl: "/api/user/me",
        entryUrl: "/login",
        exitUrl: "/logout",
        registrationUrl: "/api/user/registration",
        credentials: {
            username: '', //email (porque el endpoint de spring security es asi)
            password: ''
        },
        isAuthenticated: null,
        user: {
            id: null,
            profileImageUrl: '/img/no-avatar.png',
            email: '',
            fullName: '',
            password: '',
            matchingPassword: '',
            role: ''
        },
        isMounted: false,
        loginError: false,
        loginLoading: false,
        emailAlreadyExists: false
    }
};


// register
let myLogin = Vue.component('my-login', {
    template:
        `
<!-- Header Widget -->
<div class="header-widget">
<div v-show="isAuthenticated">

 <!-- Right Side Content / End -->
    <div class="right-side pull-right">
        <div class="header-widget pull-right">
           <!-- User Menu -->
            <div class="user-menu">
                <div class="user-name hidden-xs hidden-sm">
                    <span><img v-bind:src="user.profileImageUrl" alt=""></span>
                    {{ user.fullName }}
                </div>
                
                <div class="user-name hidden-md hidden-lg" >
                    <span><img v-bind:src="user.profileImageUrl" alt=""></span>
                </div>
                
                <ul>
                    <li><a v-on:click="micuenta()" ><i class="sl sl-icon-settings"></i> Mi cuenta</a></li>
                    <li><a v-on:click="logout()"><i class="sl sl-icon-power"></i> Cerrar Sesion</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Right Side Content / End -->
     
</div>
<div v-show="!isAuthenticated">

    <!-- Right Side Content / End -->
    <div class="right-side pull-right">
        <div class="header-widget">
            <a href="#sign-in-dialog" class="sign-in popup-with-zoom-anim"><i
                    class="sl sl-icon-login"></i>
                Iniciar Sesión</a>
        </div>
    </div>
    <!-- Right Side Content / End -->

    <!-- Sign In Popup -->
    <div id="sign-in-dialog" class="zoom-anim-dialog mfp-hide">

        <div class="small-dialog-header">
            <h3>Iniciar Sesión o Registrarse</h3>
        </div>

        <!--Tabs -->
        <div class="sign-in-form style-1">

            <ul class="tabs-nav">
                <li class=""><a href="#tab1" v-on:click="resetVueJsData()">Iniciar Sesión</a></li>
                <li><a href="#tab2" v-on:click="resetVueJsData()">Registrarse</a></li>
            </ul>

            <div class="tabs-container alt">

                <!-- Login -->
                <div class="tab-content" id="tab1" style="display: none;">
                    <form class="login" v-on:submit.prevent='login()'>

                        <p class="form-row form-row-wide">
                            <label for="email">Email:
                                <i class="im im-icon-Email"></i>
                                <input type="email" class="input-text"
                                       v-model="credentials.username"
                                       id="email"
                                       value=""
                                       oninvalid="this.setCustomValidity('Debe ingresar su Email')"
                                       required/>
                            </label>
                        </p>

                        <p class="form-row form-row-wide">
                            <label for="password">Contraseña:
                                <i class="im im-icon-Lock-2"></i>
                                <input class="input-text" type="password"
                                       v-model="credentials.password"
                                       oninvalid="this.setCustomValidity('Debe ingresar su Contraseña')"
                                       id="password" required/>
                            </label>
                        </p>
                         <div class="notification error" v-show="loginError">
                             <p><span>Error!</span> Email o contrasena invalido.</p>
                         </div>
                        <div class="form-row">
                            <button class="button border margin-top-5">
                              <i class="fa fa-spinner fa-spin" v-show="loginLoading"></i>  Iniciar Sesión
                            </button>
                        </div>

                    </form>

                </div>

                <!-- Register -->
                <div class="tab-content" id="tab2" style="display: none;">

                    <form class="register" v-on:submit.prevent='register()'>
                        <p class="form-row form-row-wide">
                            <label for="email2">Nombre y Apellido:
                                <i class="im im-icon-Male"></i>
                                <input type="fullName" class="input-text" v-model="user.fullName"
                                       id="fullName" value="" required
                                       oninvalid="this.setCustomValidity('Campo Requerido')"/>
                            </label>
                        </p>
                        
                        <p class="form-row form-row-wide">
                            <label for="email2">Email:
                                <i class="im im-icon-Mail"></i>
                                <input type="email" class="input-text" v-model="user.email"
                                       id="email2" value="" required
                                       oninvalid="this.setCustomValidity('Campo Requerido')"/>
                            </label>
                        </p>
                        <div class="notification warning" v-show="emailAlreadyExists">
                            <p>Este email ya se encuentra registrado.</p>
                        </div>

                        <p class="form-row form-row-wide">
                            <label for="password1">Contraseña:
                                <i class="im im-icon-Lock-2"></i>
                                <input minlength=4 class="input-text" type="password"
                                       v-model="user.password" id="password1" required
                                       oninvalid="this.setCustomValidity('Campo Requerido')"/>
                            </label>
                        </p>

                        <p class="form-row form-row-wide">
                            <label for="password2">Repetir Contraseña:
                                <i class="im im-icon-Lock-2"></i>
                                <input class="input-text" type="password"
                                       v-model="user.matchingPassword" 
                                       ref="password2" required
                                       oninvalid="this.setCustomValidity('Campo Requerido')"/>
                            </label>

                        </p>

                        <div class="notification warning" v-show="matchingPassword">
                            <p><span>Cuidado!</span> La contraseña no coincide.</p>
                        </div>
                        <input type="submit" class="button border fw margin-top-10"
                               name="register"
                               value="Registrarse"/>

                    </form>
                </div>

            </div>
        </div>
    </div>
    <!-- Sign In Popup / End -->
</div>

</div>
<!-- Header Widget / End -->
`,
    data: function () {
        return getDefaultData();
    },
    mounted() {
        this.isMounted = true;
        this.getUserProfile();
    },
    methods: {
        getUserProfile() {
            axios.get(this.meUrl)
                .then((response) => {
                    console.log(response.data);
                    this.user = response.data.principal.user;
                    localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem("idUser", this.user.id);
                    this.isAuthenticated = true;
                    var magnificPopup = $.magnificPopup.instance;
                    // save instance in magnificPopup variable
                    magnificPopup.close();
                    // Close popup that is currently opened
                })
                .catch(error => {
                        if (error.response.status == 401) {
                            localStorage.setItem("isAuthenticated", false);
                            localStorage.removeItem("idUser");
                            this.isAuthenticated = false;
                            console.log("usuario no logeado");
                        } else {
                            console.log(error);
                        }

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
            if (!this.isMounted)
                return;
            var confirm_password = this.$refs.password2;
            if (this.user.matchingPassword !== this.user.password && this.user.matchingPassword !== '') {
                confirm_password.setCustomValidity("Passwords Don't Match");
                return true;
            }
            confirm_password.setCustomValidity("");
            return false;
        }
    },
    watch: {
        'isAuthenticated': function () {
            this.$emit('is-authenticated', this.isAuthenticated);
        }
    }
});

