Vue.component('my-reservas-list', {
    template: `
<div>       
        <div id="spinner"></div>

		<!-- Titlebar -->
		<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2>Mis Reservas</h2>
				</div>
			</div>
		</div>

		<div class="row">
			
			<!-- Listings -->
			<div class="col-lg-12 col-md-12">
			    <div class="messages-container margin-top-0">

					
					<div class="messages-inbox">
				    <h3>{{ mensaje}}</h3>
					<ul>
                        <li v-for="(reserva, index) in reservas">
                            <a>
                                <div class="message-avatar"><img :src="reserva.cuidador.user.profileImageUrl"alt=""></div>

                                <div class="message-by">
                                    
                                    <div class="row">
                                        <div class="col-xs-8">
                                            <div class="message-by-headline">
                                                <a :href="cuidadorProfileUrl + reserva.cuidador.id" style="all: unset"><h5>{{ reserva.cuidador.user.fullName }} </h5></a>
                                                
                                            </div>
                                            <p>Hello, I want to talk about your great listing! Morbi velit eros, sagittis in facilisis non, rhoncus posuere ultricies...</p>
                                            <p><b>Perro: </b> {{ reserva.perro.nombre}}</p>
                                        </div>
                                        <div class="col-xs-4">
                                            <span class=" pull-right"><b>Desde</b> {{ reserva.fechaFin }} <b>Hasta</b> {{ reserva.fechaFin }}</span>
                                            <button class="button border pull-right" >
                                               Pagar
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </a>
                                
                        </li>
					 </ul>
				</div>
				</div>
			</div>
		</div>
</div>    
    `,
    data:
        function () {
            return {
                reservas: [
                    {
                        id: null,
                        cuidador: {
                            user: {
                                fullName: '',
                                profileImageUrl: null,
                                direccion: {
                                    calle: '',
                                    ciudad: '',
                                }
                            }
                        },
                        perro: {},
                        fechaInicio: "",
                        fechaFin: "",
                        precioTotal: 1,
                        status: 0
                    }
                ],
                url: '/api/user/me/reservas?status=',
                mensaje: null,
                cuidadorProfileUrl: '/views/cuidadores/cuidadores-perfil.html?id=',
                status: null,

            }
        },
    mounted() {
        this.status = this.getParameterByName('status');
        this.getUserReservas();
    },
    methods: {
        toggleLoader() {
            $('#spinner').hide();
        },
        getUserReservas() {
            axios.get(this.url + this.status)
                .then((response) => {
                    this.reservas = response.data;
                    if (this.reservas.length === 0) {
                        this.message = "Actualmente no tenés ninguna reserva. Busca tu cuidador ideal!";
                    }
                    this.toggleLoader();
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },
        cancelarReserva(index) {
            this.toggleLoader();
            var id = this.reservas[index].id;
            axios.put(this.url + '/' + id + '/cancelarUsuario')
                .then((response) => {
                    this.toggleLoader();
                    sweetAlert("Cancelada", "Tu reserva a sido cancelada", "success");
                    Vue.delete(this.reservas, index);
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");

                    }
                );
        },
        cancelarReservaActionButton(index) {
            var reserva = this.reservas[index];
            sweetAlert({
                    title: "Confirmar accion",
                    text: "Quiere eliminar su reserva con " + reserva.cuidador.user.fullName + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, cancelar reserva",
                    closeOnConfirm: false,
                    cancelButtonText: "Atras",
                    showLoaderOnConfirm: true,
                },
                function () {
                    console.log(vm);
                    vm.$refs.myReservasList.$refs.currentView.cancelarReserva(index)
                });
        },
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
    }
});

