Vue.component('my-reservas-user-list', {
    template: `
<div>       
        

		<!-- Titlebar -->
		<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2>Mis Reservas {{ tipoDeReservas }}</h2>
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
                        <li v-for="(reserva, index) in reservas" v-bind:style="listColor">
                            <a>
                                <div class="message-avatar"><img :src="reserva.cuidador.listaImagenes[0].url"alt=""></div>

                                <div class="message-by">
                                    
                                    <div class="row">
                                        <div  v-bind:class="listClass">
                                            <div class="message-by-headline">
                                                <a :href="cuidadorProfileUrl + reserva.cuidador.id" style="all: unset"><h5>{{ reserva.cuidador.user.fullName }} </h5></a>  
                                            </div>
                                            <p><i> {{ reserva.mensaje}} </i></p>
                                            <p ><b>Perro: </b> {{ reserva.perro.nombre}}</p>
                                        </div>
                                        <div class="col-xs-12 col-md-1">
                                            <p><b>Precio</b> </br>{{ reserva.precioTotal }} $</p>
                                        </div>
                                        <div class="col-xs-12 col-md-1">
                                            <p><b>Desde</b> </br>{{ reserva.fechaFin }}</p>
                                        </div>
                                        <div class="col-xs-12 col-md-1">
                                            <p><b> Hasta </b> </br> {{ reserva.fechaFin }}</p>
                                        </div>
                                        <div class="col-xs-12 col-md-3" v-if="reserva.status === 'creada-dueño' || reserva.status !== 'cerrada'">
                                            <a v-on:click="cancelarReservaActionButton(index)" href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Cancelar</a>
                                        </div>                                        
                                         <div class="col-xs-12 col-md-6" v-if="reserva.status === 'pagada-dueño'">
                                            <a v-on:click="verDetalleCompletoButton(index)" href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Ver Detalle Completo</a>
                                        </div>
                                          <div class="col-xs-12 col-md-3" v-if="reserva.status === 'finalizada' || reserva.status === 'comentario-cuidador'">
                                            <a v-on:click="calificarReserva(index)"  style="color: blue; border-color: blue; " href="#"class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Calificar</a>                        
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
                                direccion: {
                                    calle: '',
                                    ciudad: '',
                                }
                            },
                            listaImagenes: [
                                {
                                    url: ""
                                }
                            ]
                        },
                        perro: {},
                        fechaInicio: "",
                        fechaFin: "",
                        precioTotal: 1,
                        status: 0
                    }
                ],
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
        calificarReserva(index) {
            var id = this.reservas[index].id;

            document.location.href = "/views/reserva/calificacion-reserva.html?id= " + id +
                "&rol=" + "USER";
        },

        getUserReservas() {
            axios.get('/api/user/me/reservas?status=' + this.status)
                .then((response) => {
                    this.reservas = response.data;
                    if (this.reservas.length === 0) {
                        this.message = "Actualmente no tenés ninguna reserva. Busca tu cuidador ideal!";
                    }

                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },
        cancelarReserva(index) {

            var id = this.reservas[index].id;
            axios.put('/api/user/me/reservas/' + id + '/cancelarUsuario')
                .then((response) => {
                    sweetAlert("Cancelada", "Tu reserva ha sido cancelada", "success");
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
                    vm.$refs.myReservasUserList.$refs.currentView.cancelarReserva(index)
                });
        },
        verDetalleCompletoButton(index) {
            var id = this.reservas[index].id;
            document.location.href = "/views/reserva/detalle-reserva-completo.html?id=" + id;
        },
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
    },
    computed: {
        tipoDeReservas: function () {
            if (this.status == 'creada-dueño') {
                return 'pendientes'
            }
            if (this.status == 'rechazada-dueño') {
                return 'canceladas'
            }
            if (this.status == 'aceptada-cuidador') {
                return 'Confirmadas'
            }
            if (this.status == 'pagada-dueño') {
                return 'Pagadas'
            }
            if (this.status == 'finalizada') {
                return 'Pendiente de Calificacion'
            }
            if (this.status == 'cerrada') {
                return 'Finalizadas'
            }
            return 'Error'
        },
        listClass: function () {
            if (this.status == 'creada-dueño') {
                return 'col-xs-12 col-md-6'
            }
            if (this.status == 'rechazada-dueño') {
                return 'col-xs-12 col-md-9'
            }
            if (this.status == 'aceptada-cuidador') {
                return 'col-xs-12 col-md-9'
            }
            if (this.status == 'pagada-dueño') {
                return 'col-xs-12 col-md-9'
            }
            if (this.status == 'finalizada') {
                return 'col-xs-12 col-md-9'
            }
            if (this.status == 'cerrada') {
                return 'col-xs-12 col-md-9'
            }
        },
        listColor: function () {
            if (this.status == 'creada-dueño') {
                return 'background: rgba(0, 169, 72, 0.15); margin-bottom: 10px;'
            }
            if (this.status == 'rechazada-dueño') {
                return 'background: rgba(243, 12, 12, 0.15); margin-bottom: 10px;'
            }
            if (this.status == 'aceptada-cuidador') {
                return 'background: rgba(255, 255, 0, 0.15); margin-bottom: 10px;'

            }
            if (this.status == 'pagada-dueño') {
                return 'background: rgba(0,0,255,0.3); margin-bottom: 10px;'

            }
            if (this.status == 'finalizada') {
                return 'background: rgba(0,255,0,0.3); margin-bottom: 10px;'

            }
            if (this.status == 'cerrada') {
                return 'background: rgba(192,192,192,0.3); margin-bottom: 10px;'

            }
        }

    }
});

