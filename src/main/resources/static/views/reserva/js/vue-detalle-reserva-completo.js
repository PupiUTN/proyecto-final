Vue.component('my-detalle-reserva-completo', {
    template: `
<div>


    <div id="titlebar">
        <div class="row">
            <div class="col-md-12">
                <h2>Datos de la Reserva </h2>
                <!-- Breadcrumbs -->
                <nav id="breadcrumbs">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Dashboard</a></li>
                        <li>Datos de la reserva </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>

    <div class="add-listing-section">

        <div class="add-listing-headline">
            <h3><i class="sl sl-icon-user-following"></i> Información Básica del Cuidador</h3>
        </div>

        <div class="row with-forms">
            <div class="col-md-8">
                <h5>  </h5>
                <img id="foto_user"  :src="reserva.cuidador.user.profileImageUrl" alt="" style="width:300px;" >
            </div>

            <div class="col-md-4">
                <h5> Nombre del cuidador </h5>
                <h3><b>{{reserva.cuidador.user.fullName}}</b></h3>
            </div>

            <div class="col-md-4">
                <h5>Teléfono Cuidador </h5>
                <h3><b>{{reserva.cuidador.user.phone}}</b></h3>
            </div>

            <div class="col-md-4">
                <h5>email Cuidador </h5>
                <h3><b>{{reserva.cuidador.user.email}}</b></h3>
            </div>

            <div class="col-md-4">
                <h5> edad del Cuidador </h5>
                <h3><b>{{edadCuidador}}</b></h3>
            </div>

        </div>


    </div>

    <div class="add-listing-section margin-top-45">

        <!-- Headline -->
        <div class="add-listing-headline">
            <h3><i class="sl sl-icon-doc"></i> Información Básica de la Reserva</h3>
        </div>

        <!-- Title -->
        <div class="row with-forms">
            <div class="col-md-8">
                <h5>Precio Final </h5>
                <h3 style="color: green;"><b>{{reserva.precioTotal}} $</b></h3>
            </div>

            <div class="col-md-4">
                <h5>Fecha De Reserva </h5>
                <h3><b>{{reserva.fechaTransaccion}}</b></h3>
            </div>
        </div>

        <!-- Row -->
        <div class="row with-forms">

            <!-- Status -->
            <div class="col-md-8">
                <h5>Fecha De entrada</h5>
                <h3><b>{{reserva.fechaInicio}}</b></h3>
            </div>

            <!-- Type -->
            <div class="col-md-4">
                <h5>Fecha De Salida </h5>
                <h3><b>{{reserva.fechaFin}}</b></h3>
            </div>

        </div>
        <!-- Row / End -->



    </div>


    <!-- Section -->
    <div class="add-listing-section margin-top-45">

        <!-- Headline -->
        <div class="add-listing-headline">
            <h3><i class="sl sl-icon-directions"></i> Direccion</h3>
        </div>

        <div class="submit-section">

            <!-- Row -->
            <div class="row with-forms">

                <!-- City -->
                <div class="col-md-8">
                    <h5>Ciudad</h5>
                    <h3><b>{{reserva.cuidador.user.direccion.ciudad}}</b></h3>
                </div>

                <!-- Address -->
                <div class="col-md-4">
                    <h5>Direccion</h5>
                    <h3><b>{{reserva.cuidador.user.direccion.calle}}</b></h3>
                </div>

                <!-- City -->
                <div class="col-md-8">
                    <h5>Provincia</h5>
                    <h3><b>{{reserva.cuidador.user.direccion.provincia}}</b></h3>
                </div>

                <!-- Zip-Code -->
                <div class="col-md-4">
                    <h5>Número</h5>
                    <h3><b>{{reserva.cuidador.user.direccion.numero}}</b></h3>
                </div>

            </div>
            <!-- Row / End -->

        </div>
    </div>


    <div class="add-listing-section margin-top-45">

        <!-- Headline -->
        <div class="add-listing-headline">
            <h3><i class="sl sl-icon-location-pin"></i> Mapa</h3>
        </div>

        <!-- Dropzone -->
        <div class="submit-section">
            <div id="singleListingMap-container">
                <div id="singleListingMap" data-map-icon="im im-icon-Hamburger"></div>

            </div>
        </div>

    </div>

    <div class="add-listing-section margin-top-45">

        <!-- Headline -->
        <div class="add-listing-headline">
            <h3><i class="sl sl-icon-diamond"></i> Sobre  Mi Mascota </h3>
        </div>

        <!-- Title -->
        <div class="row with-forms">
            <div class="col-md-8">
                <h5>Nombre  </h5>
                <h3><b>{{reserva.perro.nombre}}</b></h3>
            </div>

            <div class="col-md-4">
                <h5>Raza </h5>
                <h3><b>{{reserva.perro.raza.nombre}}</b></h3>
            </div>
        </div>

        <!-- Row -->
        <div class="row with-forms">

            <!-- Status -->
            <div class="col-md-8">
                <h5>Tamaño</h5>
                <h3><b>{{tamaño}}</b></h3>
            </div>

            <!-- Type -->
            <div class="col-md-4">
                <h5>Sexo </h5>
                <h3><b>{{reserva.perro.sexo}}</b></h3>
            </div>

        </div>
        <!-- Row / End -->



    </div>
    <br>

 <div class="center-block">

        <div class="col-md-3 col-xs-1"></div>
        <div class="col-xs-5 col-md-3" v-if="reserva.status !== 'CANCEL'" >
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
                                direccion: {
                                    ciudad: '',
                                },

                            },
                            fotoPerfil: '',
                            nombre: '',
                            birthday: '',
                            raza: {},
                            sexo: '',
                            tamaño: {},
                            listaVacunas: [],
                        },
                        fechaInicio: "",
                        fechaFin: "",
                        precioTotal: 1,
                        status: '',
                        mensaje: '',
                        fechaTransaccion: '',
                        cuidador: {

                            user:{
                                fullName:'',
                                email:'',
                                phone:'',
                                profileImageUrl:'',
                                birthday:'',
                                direccion:{
                                    calle:'',
                                    ciudad:'',
                                    numero:'',
                                    latitud:'',
                                    longitud:'',
                                    provincia:''

                                }
                            }

                        }

                    }
                ,
                message: '',
                perroProfileUrl: '',
                id: null,
                edadPerro: '',
                edadCuidador:'',
                showModal: false,
                tamaño: '',

            }
        },
    mounted() {
        this.id = this.getParameterByName('id');
        this.getReserva();

    },
    methods: {
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        getReserva() {
            axios.get('/api/cuidador/me/reservas/' + this.id)
                .then((response) => {
                    this.reserva = response.data;
                    // document.getElementById("foto_perro").src = this.reserva.perro.fotoPerfil;
                    this.edadPerro = this.calcularEdad(this.reserva.perro.birthday);
                    this.edadCuidador = this.calcularEdad(this.reserva.cuidador.user.birthday);
                    var date = new Date();
                    this.reserva.fechaTransaccion = date.toLocaleDateString();

                    this.MostrarEdad();

                    this.tamaño = this.reserva.perro.tamaño.nombre + " " + " (" + this.reserva.perro.tamaño.valorMinimo + " - " + this.reserva.perro.tamaño.valorMaximo + ")" + " kgs";

                    this.geolocateCuidador(this.reserva.cuidador.user.direccion)
                })
                .catch(error => {
                    console.log(error);
                    this.message = "Actualmente no se encuentra la reserva.";
                    sweetAlert("Oops...", "Actualmente no se encuentra la reserva.", "error");
                });
        },
        calcularEdad(fecha) {
            // var fecha=document.getElementById("user_date").value;

            // Si la fecha es correcta, calculamos la edad
            var values = fecha.split("-");
            var dia = values[0];
            var mes = values[1];
            var ano = values[2];

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
        MostrarEdad()
        {
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


        },

        geolocateCuidador(direccion) {
            var lat = direccion.latitud;
            var long = direccion.longitud;
            //var myLatLng = {lat: lat, lng: long};
            var latlng = new google.maps.LatLng(lat, long);
            var map = new google.maps.Map(document.getElementById('singleListingMap'), {
                center: latlng,
                zoom: 15
            });
            var marker = new google.maps.Marker({
                position: latlng,
                animation: google.maps.Animation.DROP,
                title: "Tu cuidador ideal",
                map: map,
            });

            marker.addListener('click', this.toggleBounce(marker));
        },

         toggleBounce(marker) {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            }
            else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
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

        cancelarReservaActionButton() {

            sweetAlert({
                    title: "Confirmar accion",
                    text: "Quieres rechazar su reserva con " + this.reserva.cuidador.user.fullName + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, cancelar reserva",
                    closeOnConfirm: false,
                    cancelButtonText: "Atras",
                    showLoaderOnConfirm: true,
                },
                function () {

                    vm.$refs.myDetalleReservaCompleto.$refs.currentView.cancelarReserva();

                });
        },

    }

});
