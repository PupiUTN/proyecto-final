let mySidebar = Vue.component('my-sidebar', {
    template: `
        <div class="dashboard-nav">
            <div class="dashboard-nav-inner">

                <ul data-submenu-title="Principal">
                    <li class="active"><a href="/views/dashboard/dashboard.html"><i class="sl sl-icon-settings"></i> Panel</a></li>
                </ul>

                <ul v-show="role === 'ROLE_USER' || role === 'ROLE_CUIDADOR'"  data-submenu-title="Cuenta">
                    <li><a href="/views/perros/perros.html"><i class="im im-icon-Dog"></i> Mis Perros</a></li>
                    <li><a><i class="sl sl-icon-layers"></i> Mis Reservas</a>
					<ul>
						<li><a href="/views/reserva/mis-reservas-user.html?status=CONFIRMATION_PENDING">Pendientes <span class="nav-tag green">6</span></a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=ACCEPTED">Aceptadas <span class="nav-tag yellow">1</span></a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=CANCEL_BY_USER">Canceladas <span class="nav-tag red">2</span></a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=PAID">Pagadas <span class="nav-tag blue">2</span></a></li>
					</ul>
					</li>
				</ul>
                	 <ul v-show="role === 'ROLE_USER' || role === 'ROLE_CUIDADOR'"  data-submenu-title="Calificaciones" >
                    <li><a href="/views/reserva/mis-reservas-user.html?status=finalizada"><i class="sl sl-icon-layers"></i> Reviews</a></li>
                    </ul>
                    
                    <li><a href="/views/due%C3%B1o/perfil.html"><i class="sl sl-icon-user"></i> Mi Perfil</a></li>	
				</li>
                </ul>
                <ul  data-submenu-title="Cuidador">
                    <li v-show="role === 'ROLE_USER' || role === 'ROLE_CUIDADOR'"><a href="/views/cuidadores/alta-cuidador.html"><i class="sl sl-icon-user"></i> Solicitud</a></li>
                     <li v-show="role === 'ROLE_CUIDADOR'"><a href="/views/cuidadores/cuidadores-editar.html"><i class="sl sl-icon-book-open"></i> Mi Descripcion</a></li>
                     <li v-show="role === 'ROLE_CUIDADOR'"><a><i class="sl sl-icon-layers"></i> Mis Reservas</a>
					 <ul>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=CONFIRMATION_PENDING">Pendientes <span class="nav-tag green">6</span></a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=ACCEPTED">Aceptadas <span class="nav-tag yellow">1</span></a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=CANCEL">Canceladas <span class="nav-tag red">2</span></a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=PAID">Pagadas <span class="nav-tag blue">2</span></a></li>
					 </ul>	
					 </li>
                </ul>
                
                 <ul v-show="role === 'ROLE_CUIDADOR'" data-submenu-title="Calificaciones" >
                    <li><a href="/views/reserva/mis-reservas-cuidador.html?status=finalizada"><i class="sl sl-icon-layers"></i> Reviews</a></li>
                </ul>
                
                <ul v-show="role === 'ROLE_ADMIN'" data-submenu-title="Admin" >
                    <li><a href="/views/admin/moderar-cuidador.html"><i class="sl sl-icon-user"></i> Moderar Solicitud</a></li>
                </ul>

            </div>
        </div>
        <!-- Navigation / End -->
`
    , props: {
        role: {
            required: true,
            type: String,

        },
    },
    watch: {
        // whenever question changes, this function will run
        role: function () {
            this.answer = 'Waiting for you to stop typing...'
            this.getReservasPendientesReview(this.role)
        }
    },

    data:
        function () {
            return {

               pendientes: false,



    }
    },
    mounted() {

       // this.getReservasPendientesReview();
    },

    methods: {
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
            return true;
        }




}

});