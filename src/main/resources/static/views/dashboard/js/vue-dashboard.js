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
        <my-sidebar v-bind:role="role" ></my-sidebar>


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
            role: "NO_ROLE"
        }
    },
    methods: {
        isAuthenticatedMethod(isAuthenticated) {
            // TRIGGER MOUNTED METHOD
            this.isAuthenticated = isAuthenticated;
            var childMylogin = this.$refs.myHeader.$refs.myLogin;

            if (!this.isAuthenticated) {
                childMylogin.openLoginPopUp();
            } else {
                this.role = childMylogin.user.role;

            }
        },

        getReservasPendientesReview(role)
        {
            if (role === "ROLE_CUIDADOR")
            {
                axios.get('/api/cuidador/me/reservas/PendientesReview/')
                    .then((response) => {
                        this.pendientes = response.data;
                        if (!this.pendientes ) {
                            sweetAlert({
                                    title: "Reviews ",
                                    text: "Tiene Reservas pendientes de calificar",
                                    type: "info",
                                    showCancelButton: true,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "ir a calificaciones",
                                    closeOnConfirm: false,
                                    cancelButtonText: "ok",
                                    showLoaderOnConfirm: true,
                                },
                                function () {
                                    document.location.href = "/views/reserva/mis-reservas-cuidador.html?status=finalizada";
                                });
                        }

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
                            this.pendientes = response.data;
                            if (this.pendientes) {
                                sweetAlert({
                                        title: "Reviews ",
                                        text: "Tiene Reservas pendientes de calificar",
                                        type: "info",
                                        showCancelButton: true,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "ir a calificaciones",
                                        closeOnConfirm: false,
                                        cancelButtonText: "ok",
                                        showLoaderOnConfirm: true,
                                    },
                                    function () {
                                        document.location.href = "/views/reserva/mis-reservas-user.html?status=finalizada";
                                    });
                            }

                        })
                        .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, ver consola", "error");
                        });
                }
            }

        }


    }


});