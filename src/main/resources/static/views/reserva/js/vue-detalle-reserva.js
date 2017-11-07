Vue.component('my-detalle-reserva', {
    template: `
<div>
    <h1 > Detalles de la Reserva</h1>
    <div id="footer">

        <!-- Header -->
        <div class="row">

            <div class="col-xs-12 col-md-2 col-sm-8 ">
                <div class="col-xs-12 avatar"> <div class="col-xs-12"><img id="foto_user"  :src="reserva.perro.user.profileImageUrl" alt="" style="max-width: 200px;margin-left: 20px;margin-top: -50px;"></div>
                </div>
            </div>

            <div class="col-xs-12 col-md-8 ">
                <div class= col-md-6></div>
                <p id="details" >
                    <strong><i class="sl sl-icon-user-following" style="color:red; margin-right: 10px; "></i>Usuario:</strong> {{reserva.perro.user.fullName}} <br>
                </p>
                <div class= col-md-6></div>
                <p id="details" >
                    <strong><i class="im im-icon-Security-Check" style="color:red; margin-right: 10px; "></i>Estado:</strong> {{reserva.status}} <br>
                <div class= col-md-6></div>
                <strong><i class="im im-icon-Timer-2" style="color:red; margin-right: 10px; "></i>Fecha:</strong>  {{reserva.fechaTransaccion}} <br>
                </p>

            </div>
        </div>
        <br>

        <!-- Client & Supplier -->
        <div class="row">

            <div class="col-md-4">
                <div class = "col-md-3"></div>
                <strong class="  margin-bottom-5"><i class="im im-icon-Money-2" style="color:red; margin-right: 10px; "></i>Precio total: </strong>
                <br>
                <div class="col-md-8">
                    <label class="col-md-5"></label>
                    <label style=" color: green;font-size: 30px;">{{reserva.precioTotal}}  $</label>
                </div>
            </div>
            <div class="col-md-4" >
                <strong class="margin-bottom-5"><i class="im im-icon-Timer-2" style="color:red; margin-right: 10px; "></i>Fecha inicio</strong>
                <p> {{reserva.fechaInicio}}
                </p>
            </div>

            <div class="col-md-2">
                <strong class="margin-bottom-5"><i class="im im-icon-Timer-2" style="color:red; margin-right: 10px; "></i>Fecha Fin</strong>
                <p> {{reserva.fechaFin}}
                </p>
            </div>


            <div class="col-md-12" >

                <div class = "col-md-1"></div>
                <strong class="margin-bottom-5"><i class="im im-icon-Mailbox-Full" style="color:red; margin-right: 10px; "></i>Mensaje: </strong>
                <br>
                <div class="col-md-10">
                    <label class="col-md-4"></label>
                    <div class=" col col-md-10 col-xs-12"> <div class=" col-md-1"></div>{{reserva.mensaje}}</div>

                </div>






            </div>


        </div>
    </div>
    <br>
    <br>

    <div v-if="reserva.status === 'pagada-dueño'">


        <div id="footer">


            <!-- Title -->
            <div class="row with-forms">
                <div class="col-md-1"> </div>
                <div class="col-md-7">
                    <strong class="margin-bottom-5"><i class="im im-icon-Timer-2" style="color:red; margin-right: 10px;"></i>Número De reserva</strong>
                    <p> {{reserva.id}}</p>
                </div>

                <div class="col-md-4">
                    <strong class="margin-bottom-5"><i class="im im-icon-Email" style="color:red; margin-right: 10px;"></i>Email    </strong>
                    <p>   {{reserva.perro.user.email}}</p>
                </div>
            </div>

            <!-- Row -->
            <div class="row with-forms">
                <div class="col-md-1"> </div>
                <!-- Status -->
                <div class="col-md-7">
                    <strong class="margin-bottom-5"><i class="im im-icon-Old-Telephone" style="color:red; margin-right: 10px;"></i>Teléfono  </strong>
                    <p>    {{reserva.perro.user.phone}}</p>
                </div>

                <!-- Type -->
                <div class="col-md-4">
                    <strong class="margin-bottom-5"> <i class="im im-icon-Birthday-Cake" style="color:red; margin-right: 10px;"></i>Edad   </strong>
                    <p>   {{edadUsuario}}</p>
                </div>

            </div>
            <!-- Row / End -->

            <div class="row with-forms">
                <div class="col-md-1"> </div>
                <!-- Status -->

                <div class="col-md-7">
                    <strong class="margin-bottom-5"><i class="im im-icon-City-Hall" style="color:red; margin-right: 10px;"></i>Ciudad</strong>
                    <p> {{reserva.perro.user.direccion.ciudad}}</p>
                </div>

                <div class="col-md-4">
                    <strong class="margin-bottom-5"><i class="im im-icon-Flag-2" style="color:red; margin-right: 10px;"></i>Provincia</strong>
                    <p> {{reserva.perro.user.direccion.provincia}}</p>
                </div>
            </div>


                        


        </div>



    </div>
    <br>
    <br>
    <h1 > Mascota a Cuidar </h1>

    <div id="footer">

        <!-- Header -->
        <div class="row">

            <div class="col-xs-12 col-md-2 col-sm-8 ">
                <div class="zoom">
                    <div class="col-xs-12 avatar"> <img id="foto_perro" class="zoom" :src="reserva.perro.fotoPerfil" alt="" style="max-width: 200px;margin-left: 20px;margin-top: -50px;"></div>
                </div>
            </div>

            <div class="col-xs-12 col-md-8 ">
                <div class= col-md-6></div>
                <p id="details" >
                    <strong><i class="sl sl-icon-user-following" style="color:red; margin-right: 10px; "></i> Nombre:</strong> {{reserva.perro.nombre}} <br>
                </p>
                <div class= col-md-6></div>
                <p id="details" >
                    <strong><i class="im im-icon-Birthday-Cake" style="color:red; margin-right: 10px;"></i> Edad:</strong> {{edadPerro}} <br>
                </p>
                <div class= col-md-6></div>
                <p>
                <strong><i class="im im-icon-Dog" style="color:red; margin-right: 10px;"></i>Raza:</strong> {{reserva.perro.raza.nombre}} <br>
                </p>

       

            </div>
        </div>
        <br>

        <!-- Client & Supplier -->
        <div class="row">

            <div class="col-md-4">
                <div class = "col-md-3"></div>
                <strong class="  margin-bottom-5"><i class="im im-icon-Ruler" style="color:red; margin-right: 10px;"></i>Tamaño: </strong>
                <br>
                <div class="col-md-8">
                    <label class="col-md-5"></label>
                    <label >{{tamaño}}</label>
                </div>
            </div>
            <div class="col-md-1" style=" margin-right: 80px;"></div>
             <div class="col-md-3">
                
                <div>
                <strong class="  margin-bottom-5"><i class="im im-icon-Starfish" style="color:red; margin-right: 10px;"></i>Calificacion: </strong>
                   <div class="star-rating"  id="rating" data-rating ="0">
                  <span v-bind:class="{'star': puntaje >= 1, 'star empty': puntaje < 1 }" ></span>
                   <span v-bind:class="{'star': puntaje >= 2, 'star empty': puntaje < 2 }"></span>
                  <span v-bind:class="{'star': puntaje >= 3, 'star empty': puntaje < 3 }" ></span>
                <span v-bind:class="{'star': puntaje >= 4, 'star empty': puntaje < 4 }"></span>
                 <span v-bind:class="{'star': puntaje >= 5, 'star empty': puntaje < 5 }"></span>
               </div>
                <br>
                 </div>
            </div>

           <!-- <div class=" col-md-5 col-xs-12 star-rating" id="rating" data-rating="3">
                <div class="rating-counter"><a href="#listing-reviews"></a></div>&ndash;&gt;
            </div>-->


            <div class="col-md-12" >
                <div >
                    <div class="col-md-1"></div>
                    <strong class="  margin-bottom-5"><i class="im im-icon-Heart" style="color:red; margin-right: 10px;"></i>Vacunas: </strong>
                    <br>
                    <div class="col-md-10">
                        <label class="col-md-1"></label>
                        <ul v-for=" vacuna in reserva.perro.listaVacunas" class=" col-md-2 listing-features checkboxes margin-top-0"
                            style="">
                            <li> {{vacuna.nombre}}</li>
                        </ul>
                    </div>
                </div>

            </div>


        </div>

        <div id="listing-reviews" class="listing-section">
            <div class = "text-center">
                <h3 class="listing-desc-headline margin-top-20 margin-bottom-20">Reviews <span>({{DataReview.length}})</span></h3>
            </div>
            <div class="clearfix"></div>
            <div class = "col-2"> </div>
            <!-- Reviews -->
         <section class="comments listing-reviews" >

                <ul style=" list-style: none;">
                    <li v-for="(calificacion, index) in calificaciones  ">
                        <div class="col-md-2"></div>
                        <div class="col-md-2 col-xs-12 avatar"><img :src="calificacion.reserva.cuidador.user.profileImageUrl" alt=""/>
                        </div>
                        
                        <div class="comment-content">

                            <div class="comment-by">{{calificacion.reserva.cuidador.user.username}}<span class="date"></span>
                                    <div class="col-md-3 star-rating" >
                                        <span v-bind:class="{'star': calificacion.puntaje >= 1, 'star empty': calificacion.puntaje < 1 }" ></span>
                                        <span v-bind:class="{'star': calificacion.puntaje >= 2, 'star empty': calificacion.puntaje < 2 }"></span>
                                        <span v-bind:class="{'star': calificacion.puntaje >= 3, 'star empty': calificacion.puntaje < 3 }" ></span>
                                        <span v-bind:class="{'star': calificacion.puntaje >= 4, 'star empty': calificacion.puntaje < 4 }"></span>
                                        <span v-bind:class="{'star': calificacion.puntaje >= 5, 'star empty': calificacion.puntaje < 5 }"></span>
                                    </div>
                                </div>
                            
                                <p> {{calificacion.comentario}}</p>

                            </div>
                        
                    </li>

                </ul>
            </section>

            <!-- Pagination -->
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-md-12">
                    <!-- Pagination -->
                    <div class="pagination-container margin-top-15">
                        <nav class="pagination">
                            <ul>

                                <li><a style=" background-color: crimson;" v-if="offset > 0"    v-on:click="previous()"><i class="sl sl-icon-arrow-left" style=" font-weight: bold;color: white;"></i></a></li>

                                <li><a style=" background-color: crimson;" v-if="offset + perPage < DataReview.length"  v-on:click="next()"><i class="sl sl-icon-arrow-right" style=" font-weight: bold;color: white;"></i></a></li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <!-- Pagination / End -->
        </div>
    </div>


    <br>




    <div class="center-block">

        <div class="col-md-1"></div>
        <div class="col-xs-8 col-md-4" v-if="reserva.status === 'creada-dueño'" >
            <a v-on:click="confirmarReservaButton()"  style="color: blue; border-color: blue; " href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Confirmar</a>
        </div>


        <div class="col-xs-8 col-md-6" v-if="reserva.status !== 'rechazada-cuidador'" >
            <a v-on:click="cancelarReservaActionButton()"  href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Cancelar</a>
        </div>
    </div>


</div>
    `,
    data:
        function () {
            return {
                url: '',
                reserva:
                    {
                        id: null,
                        perro: {
                            user: {
                                fullName: '',
                                profileImageUrl: '',
                                email:'',
                                phone:'',
                                birthday:'',
                                direccion:{
                                    calle:'',
                                    ciudad:'',
                                    numero:'',
                                    latitud:'',
                                    longitud:'',
                                    provincia:''

                                },

                            },
                            fotoPerfil: '',
                            nombre: '',
                            birthday: '',
                            raza: {},
                            sexo: '',
                            tamaño: {},
                            listaVacunas: [],
                            id:''
                        },
                        fechaInicio: "",
                        fechaFin: "",
                        precioTotal: 1,
                        status: '',
                        mensaje: '',
                        transaccion: '',

                    }
                ,
                message: '',
                perroProfileUrl: '',
                id: null,
                edadPerro: '',
                showModal: false,
                tamaño: '',
                edadUsuario:'',
                numeroReserva:'',
                puntaje: 0,
                calificaciones:[{
                    id:'',
                    comentario:'',
                    puntaje:'',
                    from_owner:'',
                    reserva: {
                        id:'',
                        status:'',
                        cuidador:{
                            user:{
                                profileImageUrl:'',
                                username:'',
                            }
                        },
                        fechaTransaccion:'',
                    },
                }],
                offset: 0,
                navButtons:[],
                perPage: 2,
                DataReview:[],
                puntajeUsuario:0,

            }
        },
    mounted() {
        this.id = this.getParameterByName('id');
        this.getReserva();
    },
    methods: {

        getReserva() {
            axios.get('/api/cuidador/me/reservas/' + this.id)
                .then((response) => {
                    this.reserva = response.data;
                    // document.getElementById("foto_perro").src = this.reserva.perro.fotoPerfil;
                    if(this.reserva.perro.birthday !== null){
                    this.edadPerro = this.calcularEdad(this.reserva.perro.birthday);}
                    else{this.edadPerro = "-";}
                    var date = new Date(this.reserva.fechaTransaccion);
                    this.reserva.fechaTransaccion = date.toLocaleDateString();
                    var dateEntrada = new Date (this.reserva.fechaInicio);
                    var dateSalida = new Date (this.reserva.fechaFin);
                    dateEntrada =dateEntrada.setDate(dateEntrada.getDate() + 1);
                    dateSalida = dateSalida.setDate(dateSalida.getDate() + 1);
                    this.reserva.fechaInicio = new Date(dateEntrada).toLocaleDateString();
                    this.reserva.fechaFin = new Date(dateSalida).toLocaleDateString();
                    if(this.reserva.cuidador.user.birthday !== null){
                    this.edadUsuario = this.calcularEdad(this.reserva.cuidador.user.birthday);}
                    else
                    { this.edadUsuario ="";

                    }
                    this.numeroReserva = 570011223344;
                    if (this.edadPerro === 0) {

                        this.edadPerro = " menor a un año";
                    } else {
                        if (this.edadPerro === 1) {
                            this.edadPerro = this.edadPerro + " " + "año";

                        } else if (this.edadPerro > 1) {

                            this.edadPerro = this.edadPerro + " " + "años";
                        } else {
                            this.edadPerro = " ";
                        }

                    }
                    this.tamaño = this.reserva.perro.tamaño.nombre + " " + " (" + this.reserva.perro.tamaño.valorMinimo + " - " + this.reserva.perro.tamaño.valorMaximo + ")" + " kgs";
                    //  this.reserva.mensaje = " hola que tal buenos dias cmo va
                    this.getCalificacionesPerro();
                })
                .catch(error => {
                    console.log(error);
                    this.message = "Actualmente no se encuentra la reserva.";
                    sweetAlert("Oops...", "Actualmente no se encuentra la reserva.", "error");
                });
        },
        cancelarReserva() {

            var id = this.reserva.id;
            axios.put('/api/cuidador/me/reservas/' + id + '/cancelarReserva')
                .then((response) => {

                    sweetAlert("Cancelada", "Tu reserva ha sido cancelada", "success");
                    document.location.href = "/views/dashboard/dashboard.html";
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        ConfirmarReserva() {

            var id = this.reserva.id;
            axios.put('/api/cuidador/me/reservas/' + id + '/confirmarReserva')
                .then((response) => {

                    sweetAlert("Aceptada", "Has confirmado la solicitud de reserva, cuando el huesped pague te confirmaremos la reserva.", "success");
                    document.location.href = "/views/dashboard/dashboard.html";
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");

                    }
                );
        },
        confirmarReservaButton() {

            sweetAlert({
                    title: "Confirmar accion",
                    text: "Quiere confirmar su reserva con " + this.reserva.perro.user.fullName + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, confirmar reserva",
                    closeOnConfirm: false,
                    cancelButtonText: "Atras",
                    showLoaderOnConfirm: true,
                },
                function () {
                    vm.$refs.myDetalleReserva.$refs.currentView.ConfirmarReserva();

                });
        },
        cancelarReservaActionButton() {

            sweetAlert({
                    title: "Confirmar accion",
                    text: "Quieres rechazar su reserva con " + this.reserva.perro.user.fullName + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, cancelar reserva",
                    closeOnConfirm: false,
                    cancelButtonText: "Atras",
                    showLoaderOnConfirm: true,
                },
                function () {

                    vm.$refs.myDetalleReserva.$refs.currentView.cancelarReserva();

                });
        },
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        calcularEdad(fecha) {
            // var fecha=document.getElementById("user_date").value;

            // Si la fecha es correcta, calculamos la edad
            var values = fecha.split("-");
            var dia = values[2];
            var mes = values[1];
            var ano = values[0];

            // cogemos los valores actuales
            var fecha_hoy = new Date();
            var ahora_ano = fecha_hoy.getYear();
            var ahora_mes = fecha_hoy.getMonth() + 1;
            var ahora_dia = fecha_hoy.getDate();

            // realizamos el calculo
            var edad = (ahora_ano + 1900) - parseInt(ano);
            if (ahora_mes < mes) {
                edad--;
            }
            if ((mes === ahora_mes) && (ahora_dia < dia)) {
                edad--;
            }
            if (edad > 1900) {
                edad -= 1900;
            }
            return edad;

        },
        getCalificacionesPerro()
        {
            var urlCalificaciones = "/api/calificaciones/calificacionesPerro/";

            axios.get(urlCalificaciones + '?id=' + this.reserva.perro.id)
                .then((response) => {
                    this.DataReview = response.data;
                    var cont = 0;
                    this.DataReview .forEach( function(item, value, array) {


                        cont += item.puntaje;

                    });
                    if(this.DataReview.length > 0)
                    {
                        this.puntaje =Math.trunc(cont /this.DataReview.length);

                        var h = document.getElementsByClassName("star empty");
                        for (i = 0; i < (this.puntaje-1); i++) {
                            h[0].className  = 'star' ;

                        }

                    }
                    this.paginate();
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error  ", "error");

                    }
                );


        },
        paginate() {
            this.calificaciones = this.DataReview.slice(this.offset, this.offset + this.perPage);

        },
        previous() {
            this.offset =  this.offset - this.perPage;
        },
        next () {
            this.offset = this.offset + this.perPage;
        },
    },
    watch: {
        offset: function () {
            this.paginate();
        },
    },

});
