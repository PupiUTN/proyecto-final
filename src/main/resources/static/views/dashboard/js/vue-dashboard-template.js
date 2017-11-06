Vue.component('my-dashboard', {
    template: `
<span>
    <my-header v-on:is-authenticated="isAuthenticatedMethod" ref="myHeader"></my-header>
    <!-- Header Container / End -->

    <!-- Dashboard -->
    <div id="dashboard">

        <!-- Navigation
        ================================================== -->
        <!-- Responsive Navigation Trigger -->
        <a href="#" class="dashboard-responsive-nav-trigger"><i class="fa fa-reorder"></i> Panel</a>
        <my-sidebar v-bind:role="role" v-bind:pendientesCuidador="pendientesCuidador" v-bind:pendientesUser="pendientesUser"></my-sidebar>


        <!-- Content
        ================================================== -->
        <div class="dashboard-content">
            <!-- render the currently active component/page here -->
            <component :is="currentView" ref="currentView"></component>
        </div>
        <!-- Content / End -->


    </div>
    <!-- Dashboard / End -->
</span>
`,
    props: ['currentView'],
    data: function () {
        return {
            role: "NO_ROLE",
            pendientesCuidador: parseInt(localStorage.getItem("pendingCountCuidador")),
            pendientesUser: parseInt(localStorage.getItem("pendingCountUser"))
        }
    },
    methods: {
        isAuthenticatedMethod(isAuthenticated) {
            // TRIGGER MOUNTED METHOD
            this.isAuthenticated = isAuthenticated;
            var childMylogin = this.$refs.myHeader.$refs.myLogin;

            if (!this.isAuthenticated) {
                childMylogin.openLoginPopUp();
              //  var pending = true;

            } else {
                this.role = childMylogin.user.role;


            }

            if(localStorage.getItem("pending") === "true" )
            {
               this.getReservasPendientesReview(this.role)
            }
        },

        getReservasPendientesReview(role)
        {
            if (role === "ROLE_CUIDADOR")
            {
                axios.get('/api/cuidador/me/reservas/PendientesReview/')
                    .then((response) => {
                        this.data = response.data;
                        this.pendientesCuidador = this.data[0];
                        this.pendientesUser = this.data[1];
                        localStorage.setItem("pendingCountCuidador",   this.pendientesCuidador);
                        localStorage.setItem("pendingCountUser",   this.pendientesUser);

                    })
                    .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    });

            }
            else {
                if (role === "ROLE_USER") {

                    axios.get('/api/user/me/reservas/PendientesReview/')
                        .then((response) => {
                            this.pendientesUser = response.data;
                            localStorage.setItem("pendingCountUser",   this.pendientesUser);
                        })
                        .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, ver consola", "error");
                        });
                }
            }
           // localStorage.setItem("pending",(localStorage.getItem("pending") +1));
            localStorage.setItem("pending",false );
        }


    }


});