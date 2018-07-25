Vue.component('my-reservas-cuidador-list', {
    template: `
<div>

    <!-- Titlebar -->
    <div id="titlebar">
        <div class="row">
            <div class="col-md-12">
                <div v-if="status === 'creada-dueño'">
                    <h2>Quieren reservar Conmigo</h2>
                </div>
                <div v-if="status === 'rechazada-cuidador' || status ==='rechazada-dueño'">
                    <h2>reservas rechazadas</h2>
                </div>
                <div v-if="status === 'aceptada-cuidador'">
                    <h2> Mis reservas Confirmadas</h2>
                </div>
                <div v-if="status === 'pagada-dueño'">
                    <h2> Mis reservas pagadas</h2>
                </div>
                <div v-if="status === 'finalizada'">
                    <h2> Pendientes de Calificacion</h2>
                </div>
                <div v-if="status === 'cerrada'">
                    <h2> Finalizadas </h2>
                </div>
            </div>
        </div>
    </div>
    <div class="row" v-if="status === 'rechazada-cuidador' || status ==='rechazada-dueño'" >
    <a id="btn1" v-on:click="buscarCanceladasxDueño()" style="color: black; border-color: red; " href="#" class="button medium border pull-right" v-bind:style="{'background-color':myValue == 2 ?  'red': ''}"><i class="sl sl-icon-docs"></i> Me cancelaron</a>
    <a id="btn2" v-on:click="buscarMisCancelaciones()" style="color: black; border-color: red; background: red" href="#" class="button medium border pull-right" v-bind:style="{'background-color':myValue == 1 ?  'red': ''}"><i class="sl sl-icon-docs"></i> Mis cancelaciones</a>
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
                                <div style=" top: 70px;" class="message-avatar"><img
                                        :src="reserva.perro.user.profileImageUrl" alt=""></div>

                                <div class="message-by">

                                    <div class="row">
                                        <div v-bind:class="listClass">
                                            <div class="message-by-headline">
                                                <a href="www.pupi.com.ar" style="all: unset"><h5>{{
                                                    reserva.perro.user.fullName }} </h5></a>
                                            </div>
                                            <div class="col-xs-12 col-md-10">
                                                <p><i> {{ reserva.mensaje}} </i></p>
                                                <p><b>Perro: </b> {{ reserva.perro.nombre}}</p>
                                            </div>

                                        </div>
                                        <div class="col-xs-12 col-md-2">
                                            <p><b>Desde</b> </br>{{ reserva.fechaInicio }}</p>
                                        </div>
                                        <div class="col-xs-12 col-md-2">
                                            <p><b> Hasta </b> </br> {{ reserva.fechaFin }}</p>

                                        </div>

                                    </div>

                                </div>
                                  <br>  
                                <div class="row">

                                    <div class="col-xs-12 col-md-2" v-if="reserva.status === 'creada-dueño'">
                                        <a v-on:click="confirmarReservaButton(index)"
                                           href="#"
                                           class="button medium border pull-right"><i class="sl sl-icon-docs"></i>
                                            Confirmar</a>
                                    </div>


                                    <div class="col-xs-12 col-md-2"
                                         v-if="reserva.status !== 'rechazada-cuidador' && reserva.status !== 'comentario-dueño' && reserva.status !== 'finalizada' && reserva.status !== 'cerrada' && reserva.status !=='rechazada-dueño'" >
                                        <a v-on:click="cancelarReservaActionButton(index)" style=""
                                           href="#" class="button medium border pull-right"><i
                                                class="sl sl-icon-docs"></i> Cancelar</a>
                                    </div>

                                    <div class="col-xs-12 col-md-2" v-if="reserva.status === 'creada-dueño'">
                                        <a 
                                           v-on:click="verReserva(reserva.id)"
                                           class="button medium border pull-right"><i class="sl sl-icon-docs"></i>
                                            Examinar</a>

                                    </div>
                                    <div class="col-xs-12 col-md-4" v-if="reserva.status === 'pagada-dueño'">
                                        <a 
                                           v-on:click="verReserva(reserva.id)"
                                           class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Ver
                                            Detalle Completo</a>
                                    </div>

                                    <div class="col-xs-12 col-md-2"
                                         v-if="reserva.status === 'finalizada' || reserva.status === 'comentario-dueño'">
                                        <a v-on:click="calificarReserva(index)"
                                           href="#"
                                           class="button medium border pull-right"><i class="sl sl-icon-docs"></i>
                                            Calificar</a>
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
                myValue: 1,

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
                            else
                        {
                            this.ordenarFecha(this.reservas);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    });
            },
            ordenarFecha(reservas){
                for (i = 0, len = reservas.length; i < len; i++) {
                     reservas[i].fechaInicio =  new Date ( reservas[i].fechaInicio).toLocaleDateString();
                    reservas[i].fechaFin =  new Date ( reservas[i].fechaFin).toLocaleDateString();
                }
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
            buscarMisCancelaciones()
            {   //document.getElementById("btn1").style.background='';
                //document.getElementById("btn2").style.background='red';
                this.myValue = 1;
                this.status = "rechazada-cuidador";
                this.getCuidadorReservas();
            },
            buscarCanceladasxDueño()
            {   //document.getElementById("btn1").style.background='red';
                //document.getElementById("btn2").style.background='';
                this.myValue = 2;
                this.status = "rechazada-dueño";
                this.getCuidadorReservas();

            }
        },
    computed: {
        tipoDeReservas: function () {
            if (this.status == 'creada-dueño') {
                return 'pendientes'
            }
            if (this.status == 'rechazada-cuidador') {
                return 'canceladas por mi'
            }
            if (this.status == 'rechazada-dueño') {
                return 'me cancelaron'
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
                return 'col-xs-12 col-md-7'
            }
            if (this.status == 'rechazada-cuidador') {
                return 'col-xs-12 col-md-7'
            }
            if (this.status == 'rechazada-dueño') {
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
                return 'background: rgba(0, 169, 72, 0.15);'
            }
            if (this.status == 'rechazada-cuidador') {
                return 'background: rgba(243, 12, 12, 0.15);'
            }
            if (this.status == 'rechazada-dueño') {
                return 'background: rgba(243, 12, 12, 0.15);'
            }
            if (this.status == 'aceptada-cuidador') {
                return 'background: rgba(255,255,0,0.3);'
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
