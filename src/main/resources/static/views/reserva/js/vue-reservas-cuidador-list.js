Vue.component('my-reservas-cuidador-list', {
    template: `
<div>       

<!-- Titlebar -->
<div id="titlebar">
    <div class="row">
        <div class="col-md-12">
             <div  v-if="status === 'CONFIRMATION_PENDING'">
                    <h2>Quieren reservar Conmigo</h2>                
             </div>
              <div  v-if="status === 'CANCEL'">
                    <h2>reservas rechazadas</h2>                
             </div>
              <div  v-if="status === 'ACCEPTED'">
                    <h2> Mis reservas Confirmadas</h2>                
             </div>
            
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
                <li v-for="(reserva, index) in reservas" style="margin-bottom: 5px;">
                    <a v-bind:style="listColor">
                        <div style=" top: 70px;" class="message-avatar"><img :src="reserva.perro.user.profileImageUrl" alt=""></div>

                        <div class="message-by">
                            
                            <div class="row">
                                <div  v-bind:class="listClass">
                                    <div class="message-by-headline">
                                        <a href="www.pupi.com.ar" style="all: unset"><h5>{{ reserva.perro.user.fullName }} </h5></a>  
                                    </div>
                                    <div class="col-xs-12 col-md-10">                                        
                                    <p><i> {{ reserva.mensaje}} </i></p>   
                                 <p ><b>Perro: </b> {{ reserva.perro.nombre}}</p>  
                                  </div>
                                
                                   </div>
                                <div class="col-xs-12 col-md-1">
                                    <p><b>Desde</b> </br>{{ reserva.fechaFin }}</p>
                                </div>
                                <div class="col-xs-12 col-md-1">
                                    <p><b> Hasta </b> </br> {{ reserva.fechaFin }}</p>
                                        
                                 </div>
                          
                                    <div class="col-xs-12 col-md-3" v-if="reserva.status === 'CONFIRMATION_PENDING'">
                                    <a v-on:click="confirmarReservaButton(index)"  style="color: blue; border-color: blue; " href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Confirmar</a>
                                </div>
                               
 
                                <div class="col-xs-12 col-md-3" v-if="reserva.status !== 'CANCEL' || reserva.status === 'review_usario' || reserva.status === 'finalizada'">
                                    <a v-on:click="cancelarReservaActionButton(index)"  style="  margin-top: 10px;" href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Cancelar</a>                        
                                </div>
                            
                             <div class="col-xs-12 col-md-3" v-if="reserva.status === 'CONFIRMATION_PENDING'">
                                    <a  style="  margin-top: 10px; color: blue;  border-color: blue; "   v-on:click="verReserva(reserva.id)" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Ver</a>
                                    
                                </div>
                                 <div class="col-xs-12 col-md-6" v-if="reserva.status === 'PAID'">
                                            <a  style="  margin-top: 10px; color: blue;  border-color: blue; "   v-on:click="verReserva(reserva.id)" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Ver Detalle Completo</a>
                                            </div>
                                            
                                 <div class="col-xs-12 col-md-3" v-if="reserva.status === 'finalizada' || reserva.status === 'review_usario'">
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
                        perro: {
                            user: {
                                fullName: '',
                                profileImageUrl: '',
                                direccion: {
                                    ciudad: '',
                                },

                            },
                            fotoPerfil: '',
                            nombre: '',
                            birthday: '',
                            raza: {}

                        },
                        fechaInicio: "",
                        fechaFin: "",
                        precioTotal: 1,
                        status: 0,
                        mensaje: '',


                    }
                ],
                mensaje: '',
                perroProfileUrl: '',
                status: null,
                showModal: false,

            }
        },
    mounted() {
        this.status = this.getParameterByName('status');
        this.getCuidadorReservas();
    },
    methods:
        {
            verReserva(index) {


                document.location.href = "/views/reserva/detalle-reserva.html?id= " + index;
            },
            calificarReserva(index) {
                var id = this.reservas[index].id;

                document.location.href = "/views/reserva/calificacion-reserva.html?id= " + id +
                    "&rol=" + "CUIDADOR";
            },

            getCuidadorReservas() {
                axios.get('/api/cuidador/me/reservas?status=' + this.status)
                    .then((response) => {
                        this.reservas = response.data;
                        if (this.reservas.length === 0) {
                            this.message = "Actualmente no tenés ninguna reserva.";
                        }

                    })
                    .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    });
            },
            cancelarReserva(index) {

                var id = this.reservas[index].id;
                axios.put('/api/cuidador/me/reservas/' + id + '/cancelarReserva')
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
            ConfirmarReserva(index) {

                var id = this.reservas[index].id;
                axios.put('/api/cuidador/me/reservas/' + id + '/confirmarReserva')
                    .then((response) => {

                        sweetAlert("Aceptada", "Has confirmado la solicitud de reserva, cuando el huesped pague te confirmaremos la reserva.", "success");
                        Vue.delete(this.reservas, index);
                    })
                    .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, ver consola", "error");

                        }
                    );
            },
            confirmarReservaButton(index) {
                var reserva = this.reservas[index];
                sweetAlert({
                        title: "Confirmar accion",
                        text: "Quiere confirmar su reserva con " + reserva.perro.user.fullName + " ?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Si, confirmar reserva",
                        closeOnConfirm: false,
                        cancelButtonText: "Atras",
                        showLoaderOnConfirm: true,
                    },
                    function () {
                        console.log(vm);
                        vm.$refs.myReservasCuidadorList.$refs.currentView.ConfirmarReserva(index)
                    });
            },
            cancelarReservaActionButton(index) {
                var reserva = this.reservas[index];
                sweetAlert({
                        title: "Confirmar accion",
                        text: "Quieres rechazar su reserva con " + reserva.perro.user.fullName + " ?",
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
                        vm.$refs.myReservasCuidadorList.$refs.currentView.cancelarReserva(index)
                    });
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
            if (this.status == 'CONFIRMATION_PENDING') {
                return 'pendientes'
            }
            if (this.status == 'CANCEL') {
                return 'canceladas'
            }
            if (this.status == 'PAID') {
                return 'Pagadas'
            }
            if (this.status == 'finalizada') {
                return 'Pendiente de Calificacion'
            }
            return 'Error'
        },
        listClass: function () {
            if (this.status == 'CONFIRMATION_PENDING') {
                return 'col-xs-12 col-md-7'
            }
            if (this.status == 'CANCEL') {
                return 'col-xs-12 col-md-10'
            }
            if (this.status == 'PAID') {
                return 'col-xs-12 col-md-10'
            }
            if (this.status == 'finalizada') {
                return 'col-xs-12 col-md-10'
            }
        },
        listColor: function () {
            if (this.status == 'CONFIRMATION_PENDING') {
                return 'background: rgba(0, 169, 72, 0.15);'
            }
            if (this.status == 'CANCEL') {
                return 'background: rgba(243, 12, 12, 0.15);'
            }
            if (this.status == 'ACCEPTED') {
                return 'background: rgba(255,255,0,0.3);'
            }
            if (this.status == 'PAID') {
                return 'background: rgba(0,0,255,0.3); margin-bottom: 10px;'

            }
            if (this.status == 'finalizada') {
                return 'background: rgba(0,255,0,0.3); margin-bottom: 10px;'

            }
        }

    }
});
