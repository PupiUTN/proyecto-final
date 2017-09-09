let myRegister =Vue.component('my-register', {
    template:
        `
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
            <p><span>Advertencia!</span> Las contrasenas no coinciden.</p>
        </div>
        <button class="button margin-top-5" >
            <i class="fa fa-spinner fa-spin" v-show="registerLoading"></i>  Registrarse
        </button>
                            
    </form>
</div>

`,
    data: function () {
        return {
            registrationUrl: "/api/user/registration",
            user: {
                id: null,
                profileImageUrl: '/img/no-avatar.png',
                email: '',
                username: '',
                password: '',
                matchingPassword: '',
            },
            isMounted: false,
            registerLoading: false
        }
    },
    mounted() {
        this.isMounted = true;
    },
    methods: {
        register() {
            this.registerLoading = true;
            axios.post(this.registrationUrl, this.user)
                .then((response) => {
                    console.log("registro exitoso");
                    sweetAlert("Exito", "Registro exitoso.", "success");
                    var magnificPopup = $.magnificPopup.instance;
                    // save instance in magnificPopup variable
                    magnificPopup.close();
                    // Close popup that is currently opened
                    this.registerLoading = false;

                })
                .catch(error => {
                        sweetAlert("Error", "Registro error.", "error");
                        console.log(error);
                        this.registerLoading = false;

                    }
                );
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
    }
});

