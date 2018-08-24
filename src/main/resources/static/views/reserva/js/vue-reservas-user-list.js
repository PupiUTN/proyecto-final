Vue.component('my-reservas-user-list', {
    template: `
<div>       
        

		<!-- Titlebar -->
		<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2>{{ tipoDeReservas }}</h2>
					<p>{{ tipoDeReservasDescripcion }}</p>
				</div>
			</div>
		</div>
   <div class="row">
            <div class="col-md-12">            
             <h4> Reservas : {{this.reservas.length}} </h4>
            </div>
     </div>
    

    <div class="row" v-if="status === 'rechazada-cuidador' || status ==='rechazada-dueño'" >
    <a id="btn1" v-on:click="buscarCanceladasxCuid()" style="color: black; border-color: red; " href="#" class="button medium border pull-right" v-bind:style="{'background-color':myValue == 2 ?  'red': ''}"><i class="sl sl-icon-docs"></i> Me cancelaron</a>
    <a id="btn2" v-on:click="buscarMisCancelaciones()" style="color: black; border-color: red; background: red" href="#" class="button medium border pull-right" v-bind:style="{'background-color':myValue == 1 ?  'red': ''}"><i class="sl sl-icon-docs"></i> Mis cancelaciones</a>
    </div>
		<div class="row">
			
			<!-- Listings -->
			<div class="col-lg-12 col-md-12">
			    <div class="messages-container margin-top-0">

					
					<div class="messages-inbox">
				    <h3>{{ mensaje}}</h3>
					<ul>
                        <li v-for="(reserva, index) in gridReservas" v-bind:style="listColor">
                            <a>
                                <div class="message-avatar" style="top: 70px;"><img :src="reserva.cuidador.user.profileImageUrl"alt=""></div>

                                <div class="message-by">
                                    
                                    <div class="row">
                                        <div  v-bind:class="listClass">
                                            <div class="message-by-headline">
                                                <a :href="cuidadorProfileUrl + reserva.cuidador.id" style="all: unset"><h5>{{ reserva.cuidador.user.fullName }} </h5></a>  
                                            </div>
                                            <p><i> {{ reserva.mensaje}} </i></p>
                                            <p ><b>Perro: </b> {{ reserva.perro.nombre}}</p>
                                        </div>
                                        <div class="col-xs-12 col-md-2">
                                            <p><b>Precio</b> </br>&#36 {{ reserva.precioTotal }}</p>
                                        </div>
                                        <div class="col-xs-12 col-md-2">
                                            <p><b>Desde</b> </br>{{ reserva.fechaInicio }}</p>
                                        </div>
                                        <div class="col-xs-12 col-md-2"><p><b></b><br></p></div>
                                        <div class="col-xs-12 col-md-2">
                                            <p><b> Hasta </b> </br> {{ reserva.fechaFin }}</p>
                                        </div>
                                     
                                

                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                
                                   <div class="col-xs-12 col-md-3" v-if="reserva.status !== 'finalizada' && reserva.status !== 'cerrada'  && reserva.status !== 'comentario-cuidador' && reserva.status !== 'rechazada-dueño' && reserva.status !=='rechazada-cuidador'">
                                            <a v-on:click="cancelarReservaActionButton(index)" href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Cancelar</a>
                                        </div>                                        
                                         <div class="col-xs-12 col-md-4" v-if="reserva.status === 'pagada-dueño'">
                                            <a v-on:click="verDetalleCompletoButton(index)" href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Ver Detalle Completo</a>
                                        </div>
                                          <div class="col-xs-12 col-md-3" v-if="reserva.status === 'finalizada' || reserva.status === 'comentario-cuidador'">
                                            <a v-on:click="calificarReserva(index)"  style="color: blue; border-color: blue; " href="#"class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Calificar</a>                        
                                        </div>
                                           <div class="col-xs-12 col-md-3" v-if="reserva.status !== 'creada-dueño' &&  reserva.status !== 'aceptada-cuidador' &&  reserva.status !== 'rechazada-dueño' &&  reserva.status !== 'cerrada' ">
                                            <a v-on:click=""  style="color: black; border-color: black; " href="#"class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Denunciar</a>                        
                                        </div>
                                        <div class = "col-xs-12 col-md-6" v-if="reserva.status === 'aceptada-cuidador'">
                                            <mercadopago :reserva="reserva"></mercadopago>
                                        </div>
                                
</div>
                                
                            </a>
                                
                        </li>
					 </ul>
				</div>
				</div>
			</div>
		</div>
		
		
		       <!-- Pagination -->
<div class="clearfix"></div>
<div class="row">
    <div class="col-md-12" v-show=" this.reservas.length > 0" >
        <!-- Pagination -->
        <div class="pagination-container margin-top-20 margin-bottom-40">
            <nav class="pagination">
                <ul>
               
                    <li><a :style="offset > 0 ? 'background-color: crimson' : 'background-color: darkgrey'" @click="previous()"><i class="sl sl-icon-arrow-left" style=" font-weight: bold;color: white;"></i></a></li>

                    <li><a  :style="(offset + perPage) < gridData.length ? 'background-color: crimson' : 'background-color: darkgrey'" @click="next()"><i class="sl sl-icon-arrow-right" style=" font-weight: bold;color: white;"></i></a></li>
                
                   <!-- <li><a href="#" class="current-page">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#"><i class="sl sl-icon-arrow-right"></i></a></li>-->
                </ul>
            </nav>
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
                                profileImageUrl: '',
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
                myValue: 1,
                offset: 0,
                gridData: [],
                gridReservas: [],
                perPage: 3,
                countPages: 1,

            }
        },
    mounted() {
        this.status = this.getParameterByName('status');
        this.getUserReservas();
    },
    watch: {
        offset: function () {
            this.paginate();
        }

    },
    methods: {
        calificarReserva(index) {
            //  var id = this.reservas[index].id;

            var id = this.gridReservas[index].id;
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
                    else {
                        this.ordenarFecha(this.reservas);
                    }
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },
        ordenarFecha(reservas) {
            this.gridData = reservas;
            this.gridReservas = this.gridData.slice(this.offset, this.offset + this.perPage);
        },
        cancelarReserva(index) {

            // var id = this.reservas[index].id;
            var id = this.gridReservas[index].id;
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
            // var reserva = this.reservas[index];
            var reserva = this.gridReservas[index];
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
            //   var id = this.reservas[index].id;
            var id = this.gridReservas[index].id;
            document.location.href = "/views/reserva/detalle-reserva-completo.html?id=" + id;
        },
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        buscarMisCancelaciones() {   //document.getElementById("btn1").style.background='';
            //document.getElementById("btn2").style.background='red';
            this.myValue = 1;
            this.status = "rechazada-dueño";
            this.getUserReservas();
        },
        buscarCanceladasxCuid() {   //document.getElementById("btn1").style.background='red';
            //document.getElementById("btn2").style.background='';
            this.myValue = 2;
            this.status = "rechazada-cuidador";
            this.getUserReservas();

        },
        paginate() {
            this.countPages = this.gridData / this.perPage;
            if (this.countPages - Math.trunc(this.countPages) > 0.0) {
                this.countPages = Math.trunc(this.countPages) + 1;
            }

            this.gridReservas = this.gridData.slice(this.offset, this.offset + this.perPage);

        },
        previous() {
            if (this.offset > 0)
                this.offset = this.offset - this.perPage;
        },
        next() {
            if (this.offset + this.perPage < this.gridData.length)
                this.offset = this.offset + this.perPage;
        },
    },
    computed: {
        tipoDeReservas: function () {
            if (this.status == 'creada-dueño') {
                return 'Mis Solicitudes de Reservas Generadas'
            }
            if (this.status == 'rechazada-dueño') {
                return 'Mis Reservas Rechazadas por mi'
            }
            if (this.status == 'rechazada-cuidador') {
                return 'Mis Reservas Rechazadas por el cuidador'
            }
            if (this.status == 'aceptada-cuidador') {
                return 'Mis Reservas Confirmadas'
            }
            if (this.status == 'pagada-dueño') {
                return 'Mis Reservas Pagadas'
            }
            if (this.status == 'finalizada') {
                return 'Mis Reservas Pendiente de Calificacion'
            }
            if (this.status == 'cerrada') {
                return 'Mis Reservas Finalizadas'
            }
            return 'Error, revisar estado de la reserva'
        },
        tipoDeReservasDescripcion: function () {
            if (this.status == 'creada-dueño') {
                return 'En espera de que el cuidador revise tu perfil y acepte o rechace la solicitud'
            }
            if (this.status == 'rechazada-dueño') {
                return 'Yo las cancele'
            }
            if (this.status == 'rechazada-cuidador') {
                return 'Me las rechazo el cuidador'
            }
            if (this.status == 'aceptada-cuidador') {
                return 'El cuidador ha aceptado tu solicitud. Ahora sólo falta tu pago para finalizar el proceso.'
            }
            if (this.status == 'pagada-dueño') {
                return 'Muy bien, ya pagaste. Ahora solo queda esperar la fecha de la reserva'
            }
            if (this.status == 'finalizada') {
                return 'Como te fue con el cuidador? Calificalo para que otros usuario puedan elegir el mejor cuidador.'
            }
            if (this.status == 'cerrada') {
                return 'Tu historial de reservas terminadas'
            }
            return 'Error, revisar estado de la reserva'
        },
        listClass: function () {
            if (this.status == 'creada-dueño') {
                return 'col-xs-12 col-md-7'
            }
            if (this.status == 'rechazada-dueño') {
                return 'col-xs-12 col-md-7'
            }
            if (this.status == 'rechazada-cuidador') {
                return 'col-xs-12 col-md-7'
            }
            if (this.status == 'aceptada-cuidador') {
                return 'col-xs-12 col-md-7'
            }
            if (this.status == 'pagada-dueño') {
                return 'col-xs-12 col-md-7'
            }
            if (this.status == 'finalizada') {
                return 'col-xs-12 col-md-7'
            }
            if (this.status == 'cerrada') {
                return 'col-xs-12 col-md-7'
            }
        },
        listColor: function () {
            if (this.status == 'creada-dueño') {
                return 'background: rgba(0, 169, 72, 0.15); margin-bottom: 10px;'
            }
            if (this.status == 'rechazada-dueño') {
                return 'background: rgba(243, 12, 12, 0.15); margin-bottom: 10px;'
            }
            if (this.status == 'rechazada-cuidador') {
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

