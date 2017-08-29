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
            username: '',
            password: '',
            matchingPassword: '',
        },
        isMounted: false
    }
};


// register
Vue.component('my-login', {
    template:
        `
    <!-- Header Widget -->
    <div class="header-widget">
        <div v-show="isAuthenticated">
            <!-- User Menu -->
            <div class="user-menu">
                <div class="user-name"><span><img v-bind:src="user.profileImageUrl" alt=""></span>
                    {{ user.email }}
                </div>
                <ul>
                    <li><a href="dashboard.html"><i class="sl sl-icon-settings"></i> Dashboard</a></li>
                    <li><a href="dashboard-messages.html"><i class="sl sl-icon-envelope-open"></i>
                        Messages</a>
                    </li>
                    <li><a href="/views/dueño/perfil.html"><i class="sl sl-icon-user"></i> Mi
                        Perfil</a>
                    </li>
                    <li><a href="/views/perros/perros.html"><i class="im im-icon-Dog"></i> Mis 
                    Perros</a>
                    </li>
                    <li><a v-on:click="logout()"><i class="sl sl-icon-power"></i> Logout</a></li>
                </ul>
            </div>

            <!--<a href="dashboard-add-listing.html" class="button border with-icon">Add Listing <i
                    class="sl sl-icon-plus"></i></a>-->

        </div>
        <div v-show="!isAuthenticated">

            <!-- Right Side Content / End -->
            <div class="right-side">
                <div class="header-widget">
                    <a href="#sign-in-dialog" class="sign-in popup-with-zoom-anim"><i
                            class="sl sl-icon-login"></i>
                        Sign In</a>
                </div>
            </div>
            <!-- Right Side Content / End -->

            <!-- Sign In Popup -->
            <div id="sign-in-dialog" class="zoom-anim-dialog mfp-hide">

                <div class="small-dialog-header">
                    <h3>Sign In</h3>
                </div>

                <!--Tabs -->
                <div class="sign-in-form style-1">

                    <ul class="tabs-nav">
                        <li class=""><a href="#tab1">Log In</a></li>
                        <li><a href="#tab2">Register</a></li>
                    </ul>

                    <div class="tabs-container alt">

                        <!-- Login -->
                        <div class="tab-content" id="tab1" style="display: none;">
                            <form class="login" v-on:submit.prevent='login()'>

                                <p class="form-row form-row-wide">
                                    <label for="email">Email:
                                        <i class="im im-icon-Email"></i>
                                        <input type="text" class="input-text"
                                               v-model="credentials.username"
                                               id="email"
                                               value="" required/>
                                    </label>
                                </p>

                                <p class="form-row form-row-wide">
                                    <label for="password">Password:
                                        <i class="im im-icon-Lock-2"></i>
                                        <input class="input-text" type="password"
                                               v-model="credentials.password"
                                               id="password" required/>
                                    </label>
                                    <span class="lost_password">
										<a href="#">Lost Your Password?</a>
									</span>
                                </p>

                                <div class="form-row">
                                    <button class="button border margin-top-5">
                                        Login
                                    </button>

                                    <div class="checkboxes margin-top-10">
                                        <input id="remember-me" type="checkbox" name="check">
                                        <label for="remember-me">Remember Me</label>
                                    </div>
                                </div>

                            </form>

                        </div>

                        <!-- Register -->
                        <div class="tab-content" id="tab2" style="display: none;">

                            <form class="register" v-on:submit.prevent='register()'>

                               

                                <p class="form-row form-row-wide">
                                    <label for="email2">Username:
                                        <i class="im im-icon-Male"></i>
                                        <input type="username" class="input-text" v-model="user.username"
                                               id="username" value="" required/>
                                    </label>
                                </p>
                                
                                <p class="form-row form-row-wide">
                                    <label for="email2">Email Address:
                                        <i class="im im-icon-Mail"></i>
                                        <input type="email" class="input-text" v-model="user.email"
                                               id="email2" value="" required/>
                                    </label>
                                </p>

                                <p class="form-row form-row-wide">
                                    <label for="password1">Password:
                                        <i class="im im-icon-Lock-2"></i>
                                        <input class="input-text" type="password"
                                               v-model="user.password" id="password1" required/>
                                    </label>
                                </p>

                                <p class="form-row form-row-wide">
                                    <label for="password2">Repeat Password:
                                        <i class="im im-icon-Lock-2"></i>
                                        <input class="input-text" type="password"
                                               v-model="user.matchingPassword" 
                                               ref="password2" required/>
                                    </label>

                                </p>

                                <div class="notification warning" v-show="matchingPassword">
                                    <p><span>Warning!</span> Password does not match.</p>
                                </div>
                                <input type="submit" class="button border fw margin-top-10"
                                       name="register"
                                       value="Register"/>

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
                    this.isAuthenticated = true;
                    var magnificPopup = $.magnificPopup.instance;
                    // save instance in magnificPopup variable
                    magnificPopup.close();
                    // Close popup that is currently opened
                })
                .catch(error => {
                        if (error.response.status == 401) {
                            this.isAuthenticated = false;

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
        }
    },
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

