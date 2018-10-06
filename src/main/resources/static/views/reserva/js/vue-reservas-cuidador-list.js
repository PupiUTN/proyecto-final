Vue.component('my-reservas-cuidador-list', {
    template: `
<div>

    <!-- Titlebar -->
    <div id="titlebar">
        <div class="row">
            <div class="col-md-12">
                <div v-if="status === 'creada-dueño'">
                    <h2><b>Cuidador:</b> Quieren reservar Conmigo</h2>
                </div>
                <div v-if="status === 'rechazada-cuidador' || status ==='rechazada-dueño'">
                    <h2><b>Cuidador:</b> Reservas rechazadas</h2>
                </div>
                <div v-if="status === 'aceptada-cuidador'">
                    <h2><b>Cuidador:</b> Mis reservas Aceptadas y Pendiente de Pago por parte del dueño</h2>
                </div>
                <div v-if="status === 'pagada-dueño'">
                    <h2><b>Cuidador:</b> Mis reservas Pagadas</h2>
                </div>
                <div v-if="status === 'finalizada'">
                    <h2><b>Cuidador:</b>  Finalizadas y Pendientes de Calificacion</h2>
                </div>
                <div v-if="status === 'cerrada'">
                    <h2><b>Cuidador:</b>  Finalizadas </h2>
                </div>
                 <div v-if="status === 'ejecucion'">
                    <h2><b>Cuidador:</b>  Reservas en curso</h2>
                </div>
            </div>
        </div>
    </div>
     <div class="row">
            <div class="col-md-12">            
             <h4> Reservas : {{contadorReservas}} </h4>
            </div>
     </div>
    
<div class="row" v-if="status === 'rechazada-cuidador' || status ==='rechazada-dueño'" >
    <a id="btn1" v-on:click="buscarCanceladasxDueño()" style="background-color: inherit; color: black; border-color: black; " href="#" class="button medium border pull-right" v-bind:style="{'background-color':myValue == 2 ?  '#e3f2fd': 'inherit'}"><i class="sl sl-icon-docs"></i> Me cancelaron</a>
    <a id="btn2" v-on:click="buscarMisCancelaciones()" style="background-color: inherit; color: black; border-color: black; background: #e3f2fd" href="#" class="button medium border pull-right" v-bind:style="{'background-color':myValue == 1 ?  '#e3f2fd': 'inherit'}"><i class="sl sl-icon-docs"></i> Mis cancelaciones</a>
</div>
    <div class="row">
        <!-- Listings -->
        <div class="col-lg-12 col-md-12">
            <div class="messages-container margin-top-0">
                <div class="messages-inbox">
                    <h3>{{ mensaje}}</h3>
                    <ul>
                        <li v-for="(reserva, index) in gridReservas" v-bind:style="listColor + 'margin-bottom: 10px;'">
                            <a>
                                <div style=" top: 70px;" class="message-avatar"><img
                                        :src="reserva.perro.user.profileImageUrl" alt=""></div>

                                <div class="message-by">

                                    <div class="row">
                                        <div v-bind:class="listClass">
                                            <div class="message-by-headline">
                                                <a style="all: unset"><h5>{{
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

                                    <div class="col-xs-12 col-md-3" v-if="reserva.status === 'creada-dueño'">
                                        <a v-on:click="confirmarReservaButton(index)"
                                           style="color: blue; border-color: blue; background-color: inherit;" href="#"
                                           class="button medium border pull-right"><i class="sl sl-icon-docs"></i>
                                            Confirmar solicitud</a>
                                    </div>


                                    <div class="col-xs-12 col-md-3"
                                         v-if="reserva.status !== 'rechazada-cuidador' && reserva.status !== 'comentario-dueño' && reserva.status !== 'finalizada' && reserva.status !== 'cerrada' && reserva.status !=='rechazada-dueño' && reserva.status !== 'ejecucion' && reserva.status !== 'pagada-dueño'" >
                                        <a v-on:click="cancelarReservaActionButton(index)" style="background-color: inherit; color: red;"
                                           href="#" class="button medium border pull-right"><i
                                                class="sl sl-icon-docs"></i> Cancelar</a>
                                    </div>

                                    <div class="col-xs-12 col-md-3" v-if="reserva.status === 'creada-dueño' || reserva.status === 'aceptada-cuidador' ">
                                        <a style="color: blue;  border-color: blue; background-color: inherit;"
                                           v-on:click="verReserva(reserva.id)"
                                           class="button medium border pull-right"><i class="sl sl-icon-docs"></i>
                                            Examinar</a>

                                    </div>
                                    <div class="col-xs-12 col-md-4" v-if="reserva.status === 'pagada-dueño' || reserva.status === 'ejecucion'">
                                        <a style=" color: blue;  border-color: blue; background-color: inherit;"
                                           v-on:click="verReserva(reserva.id)"
                                           class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Ver
                                            Detalle Completo</a>
                                    </div>

                                    <div class="col-xs-12 col-md-3"
                                         v-if="reserva.status === 'finalizada' || reserva.status === 'comentario-dueño'">
                                        <a v-on:click="calificarReserva(index)"
                                           style="color: blue; border-color: blue; background-color: inherit;" href="#"
                                           class="button medium border pull-right"><i class="sl sl-icon-docs"></i>
                                            Calificar</a>
                                    </div>
                                  <!--   <div class="col-xs-12 col-md-3" v-if="reserva.status !== 'creada-dueño' &&  reserva.status !== 'aceptada-cuidador' &&  reserva.status !== 'rechazada-cuidador' &&  reserva.status !== 'cerrada' ">
                                            <a v-on:click=""  style="color: black; border-color: black; background-color: inherit;" href="#"class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Denunciar</a>                        
                                        </div> -->
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
                offset: 0,
                gridData: [],
                gridReservas: [],
                perPage: 3,
                countPages: 1,
                contadorReservas:0

            }
        },
    watch: {
        offset: function () {
            this.paginate();
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
                //    var id = this.reservas[index].id;
                var id = this.gridReservas[index].id;
                document.location.href = "/views/reserva/calificacion-reserva.html?id= " + id +
                    "&rol=" + "CUIDADOR";
            },
            getCuidadorReservas() {
                this.gridReservas = [];
                this. offset = 0;
                this.contadorReservas = 0;
                axios.get('/api/cuidador/me/reservas?status=' + this.status)
                    .then((response) => {
                        this.reservas = response.data;
                        if (this.reservas.length === 0) {
                            this.message = "Actualmente no tenés ninguna reserva como cuidador.";
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
                this.contadorReservas =this.gridData.length;
                this.gridReservas = this.gridData.slice(this.offset, this.offset + this.perPage);

            },
            confirmarReservaButton(index) {
                // var reserva = this.reservas[index];
                let self = this;
                var reserva = this.gridReservas[index];
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
                        var id = self.gridReservas[index].id;
                        axios.put('/api/cuidador/me/reservas/' + id + '/confirmarReserva')
                            .then((response) => {

                                sweetAlert("Aceptada", "Reserva confirmada", "success");
                                self.gridReservas.splice(index, 1);
                                self.contadorReservas =self.contadorReservas - 1;
                            })
                            .catch(error => {
                                    console.log(error);
                                    sweetAlert("Oops...", "Error, ver consola", "error");

                                }
                            );
                    });
            },
            cancelarReservaActionButton(index) {
                var self = this;
                // var reserva = this.reservas[index];
                var reserva = this.gridReservas[index];
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
                        var id = self.gridReservas[index].id;
                        axios.put('/api/cuidador/me/reservas/' + id + '/cancelarReserva')
                            .then((response) => {

                                sweetAlert("Cancelada", "Tu reserva ha sido cancelada", "success");
                                self.gridReservas.splice(index, 1);
                                self.contadorReservas =self.contadorReservas - 1;
                            })
                            .catch(error => {
                                    console.log(error);
                                    sweetAlert("Oops...", "Error, ver consola", "error");
                                }
                            );
                    });
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
                this.status = "rechazada-cuidador";
                this.getCuidadorReservas();
            },
            buscarCanceladasxDueño() {   //document.getElementById("btn1").style.background='red';
                //document.getElementById("btn2").style.background='';
                this.myValue = 2;
                this.status = "rechazada-dueño";
                this.getCuidadorReservas();

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
            if (this.status == 'ejecucion') {
                return 'Mis Reservas en curso'
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
            if (this.status == 'ejecucion') {
                return 'col-xs-12 col-md-7'
            }
        },
        listColor: function () {
            if (this.status == 'creada-dueño') {
                return 'background: #c8e6c9; margin-bottom: 10px;'
            }
            if (this.status == 'rechazada-cuidador') {
                return 'background: #f5f5f5); margin-bottom: 10px;'
            }
            if (this.status == 'rechazada-dueño') {
                return 'background: #f5f5f5); margin-bottom: 10px;'
            }
            if (this.status == 'aceptada-cuidador') {
                return 'background: #fffde7; margin-bottom: 10px;'
            }
            if (this.status == 'pagada-dueño') {
                return 'background: #e3f2fd; margin-bottom: 10px;'

            }
            if (this.status == 'finalizada') {
                return 'background: rgba(255,255,0,0.3); margin-bottom: 10px;'

            }
            if (this.status == 'cerrada') {
                return 'background: #f5f5f5; margin-bottom: 10px;'

            }
            if (this.status == 'ejecucion') {
                return 'background: #ffebee; margin-bottom: 10px;'
            }
        }

    }
});
