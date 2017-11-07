let myCuidadorPerfil = Vue.component('my-cuidador-perfil', {
    template: `
<span>
<!-- Slider
================================================== -->
<div class="listing-slider mfp-gallery-container margin-bottom-0" id="ContenedorImagen">
</div>


<!-- Content
================================================== -->
<div class="container">
    <div class="row sticky-wrapper">
        <div class="col-lg-8 col-md-8 padding-right-30">

            <!-- Titlebar -->
            <div id="titlebar" class="listing-titlebar">
                <div class="avatar"><img id="imagenAvatar" src="/img/logo.png" alt=""/>
                </div>
                <div class="listing-titlebar-title">


                    <h2 style="margin-left: 100px;" id="nombre"> {{item.user.fullName}} <span
                            class="listing-tag">Cuidador</span></h2>

                    <div class="card-image col s3 ">

                    </div>

                    <input type="hidden" value="" name="test">
                    <span>

                    <a style=" margin-left: 100px;" href="#listing-location" class="listing-address">
                    <i class="fa fa-map-marker"></i>

                    {{item.ciudad}}
                </a>
                <br>
                <br>
                    <i class="fa fa-paw"></i>
                    Cantidad maxima de perros: {{item.cantidadMaxDePerros}}

            </span>
                     <div class="star-rating"  id="rating" data-rating ="0">
                      <span v-bind:class="{'star': puntaje >= 1, 'star empty': puntaje < 1 }" ></span>
                   <span v-bind:class="{'star': puntaje >= 2, 'star empty': puntaje < 2 }"></span>
                  <span v-bind:class="{'star': puntaje >= 3, 'star empty': puntaje < 3 }" ></span>
                <span v-bind:class="{'star': puntaje >= 4, 'star empty': puntaje < 4 }"></span>
                 <span v-bind:class="{'star': puntaje >= 5, 'star empty': puntaje < 5 }"></span>
                                <div class="rating-counter"><a href="#listing-reviews">{{DataReview.length}} Reviews</a></div>
                            </div>
                </div>
            </div>

            <!-- Listing Nav -->
            <div id="listing-nav" class="listing-nav-container">
                <ul class="listing-nav">
                    <li><a href="#listing-overview" class="active">Sobre mi </a></li>
                    <li><a href="#listing-pricing-list">Precios</a></li>
                    <li><a href="#listing-location">Donde estoy </a></li>
                    <li><a href="#listing-reviews">Reviews</a></li>
                    <!--<li><a href="#add-review">Agrega una  Review</a></li>-->
                </ul>
            </div>

            <!-- Overview -->
            <div id="listing-overview" class="listing-section">

                <!-- Description -->

                <p>
                    <label>{{item.descripcion}}</label>

                    <!--Soy el chico ideal para tu compañia, nada me agradara mas que poder jugar contigo y con tu dueña ( si esta buena )-->
                </p>

                <!-- Amenities -->
                <h3 class="listing-desc-headline">Servicios y Restricciones</h3>
                <ul v-for=" servicio in item.listaServicios" class="listing-features checkboxes margin-top-0"
                    style="">
                    <li style="width: 790px;"> {{servicio.nombre}}</li>

                </ul>
            </div>


            <!-- Food Menu -->
            <div id="listing-pricing-list" class="listing-section">
                <h3 class="listing-desc-headline margin-top-70 margin-bottom-30">Precios</h3>

                <div class="show-more">
                    <div class="pricing-list-container">

                        <!-- Food List -->
                        <h4>Estadía</h4>
                        <ul>
                            <li>
                                <h5>Por día</h5>
                                <p>servicio por día</p>
                                <span style="color: forestgreen; font-size: x-large;"> <b>$ {{item.precioPorNoche}}</b></span>
                            </li>


                        </ul>

                    </div>
                </div>
                <!--<a href="#" class="show-more-button" data-more-title="Show More" data-less-title="Show Less"><i class="fa fa-angle-down"></i></a>-->
            </div>
            <!-- Food Menu / End -->


            <!-- Location -->
            <div id="listing-location" class="listing-section">
                <h3 class="listing-desc-headline margin-top-60 margin-bottom-30">Donde estoy</h3>

                <div id="singleListingMap-container">
                    <div id="singleListingMap" data-map-icon="im im-icon-Hamburger"></div>

                </div>
            </div>

                    <!-- Reviews -->
     
                    <div id="listing-reviews" class="listing-section">
                        <h3 class="listing-desc-headline margin-top-75 margin-bottom-20">Reviews <span>({{DataReview.length}})</span></h3>

                        <div class="clearfix"></div>

                        <!-- Reviews -->
                        <section class="comments listing-reviews">

                            <ul>
                                <li v-for="(calificacion, index) in calificaciones  ">
                                    <div class="col-md-2 col-xs-12 avatar"><img :src="calificacion.reserva.perro.user.profileImageUrl" alt="" /></div>
                                    <!--<div class="col-xs-12"> <label class="col-xs-12"></label></div>-->
                                    <div class="comment-content"><div class="arrow-comment"></div>
                                        <div class="comment-by">{{calificacion.reserva.perro.user.username}}<span class="date">June 2017</span>
                                            <div class="star-rating" >
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
                                <div class="pagination-container margin-top-30">
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


        <!-- Sidebar
        ================================================== -->
        <div class="col-lg-4 col-md-4 margin-top-75 sticky" style="position:relative;">

            <!-- Book Now -->
            <div class="boxed-widget">
                <h3><i class="fa fa-calendar-check-o "></i> Fechas de Reserva </h3>
                <div class="row with-forms  margin-top-0">

                    <!-- Date Picker - docs: http://www.vasterad.com/docs/listeo/#!/date_picker -->
                    <div class="col-md-12">
                        <my-hotel-date-picker
                                ref="myHotelDatePicker"
                                format="DD/MM/YYYY"
                                v-on:updateDateRange="bindDates"
                                datePickerId="datepickerId"
                        >
                        </my-hotel-date-picker>
                    </div>

                </div>
                <!-- progress button animation handled via custom.js -->
                <button class="progress-button button fullwidth margin-top-5" v-on:click="hrerReserva"><span>Reservá ahora </span>
                </button>
            </div>
            <!-- Book Now / End -->


            <div class="boxed-widget opening-hours margin-top-35">

                <h3><i class="im im-icon-Dog"></i> Preferencias de tamaños </h3>
                <div class="col-lg-6 col-md-5" style="width: 80px;">
                    <label style=" margin-top: 12px; width: 60px;">Hasta</label>
                </div>


                <div class="col-lg-6 col-md-12">
                    <img id="imgTamañoPerro" alt="">
                    <label style=" margin-left: 30px;"> {{item.tamaño}} </label>
                </div>


            </div>


            <!-- Share / Like -->
            <div class="listing-share margin-top-40 margin-bottom-40 no-border">


                <!-- Share Buttons -->
                <ul class="share-buttons margin-top-40 margin-bottom-0">
                    <li><a class="fb-share" href="#"><i class="fa fa-facebook"></i> Share</a></li>
                    <li><a class="twitter-share" href="#"><i class="fa fa-twitter"></i> Tweet</a></li>
                    <li><a class="gplus-share" href="#"><i class="fa fa-google-plus"></i> Share</a></li>
                    <!-- <li><a class="pinterest-share" href="#"><i class="fa fa-pinterest-p"></i> Pin</a></li> -->
                </ul>
                <div class="clearfix"></div>
            </div>

        </div>
        <!-- Sidebar / End -->

    </div>
</div>    
</span>
    `,
    data: function () {
        return {
            url: "/api/cuidadores",
            item: {
                index: '',
                id: '',
                telefono: '',
                direccion: '',
                cantidadMaxDePerros: '',
                listaImagenes: '',
                descripcion: '',
                precio: '',
                ciudad: '',
                user: '',
                profile_image_url: '',
                tamaño: '',
                listaServicios: '',
                promedioReviews:'',
                cantidadReviews:'',
            },
            idCuidador: 0,
            dateFrom: null,
            dateTo: null,
            puntaje: 0,
            calificaciones:[{
                id:'',
                comentario:'',
                puntaje:'',
                from_owner:'',
                reserva: {
                    id:'',
                    status:'',
                    perro:{
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
            perPage: 3,
            DataReview:[],
            puntajeUsuario:0,
        }
    }
    ,
    mounted() {
        this.bindUrlWithVue();
        this.setDates();
        this.getCuidador(this.url, this.idCuidador);
    },
    methods: {

        getCuidador() {
            axios.get(this.url + "/" + this.idCuidador)
                .then((response) => {
                    this.item = response.data;
                    this.item.ciudad = this.item.user.direccion.ciudad;
                    this.puntaje =this.item.promedioReviews;
                    document.getElementById("imagenAvatar").src = this.item.user.profileImageUrl;

                    this.loadImages(this.item.listaImagenes);
                    this.loadTamaño(this.item.tamaño);
                    this.geolocateCuidador(this.item.user.direccion);
                    this.getCalificacionesCuidador();


                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error  ", "error");

                    }
                );
        },

        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: latlng,
                radius: Math.sqrt(2) * 100
            });

        },

        loadImages(imagenes) {


            var img = 0;
            var id = "";
            if (imagenes.length > 0) {

                for (value in imagenes) {

                    id = "myImg" + value;

                    // $('#ContenedorImagen').slick('slickAdd','<img  src=' + imagenes[value].url + ' class=" item mfp-gallery" />');
                    $('#ContenedorImagen').slick('slickAdd', '<a href=' + imagenes[value].url + ' style="background-image: url(' + imagenes[value].url + ')" class=" item mfp-gallery" />');
                    img++;
                }

            }
            if (img < 4) {
                var resta = 4 - img;
                var i = resta;
                while (i > 0) {
                    id = "myImg" + (4 - i);
                    //  document.getElementById(id).src = "/assets/images/logo.png";
                    $('#ContenedorImagen').slick('slickAdd', '<img src="/assets/images/logo.png" class=" item mfp-gallery" />');
                    i--;
                }


            }
        },

        loadTamaño(param) {
            if (param.id === 1) {
                document.getElementById("imgTamañoPerro").src = "/img/perro_miniatura.png";
            } else {
                if (param.id === 2) {
                    document.getElementById("imgTamañoPerro").src = "/img/perro_pequeño.jpg";

                }
                else {
                    if (param.id === 3) {
                        document.getElementById("imgTamañoPerro").src = "/img/perro_mediano.jpg";

                    }
                    else {
                        if (param.id === 4) {
                            document.getElementById("imgTamañoPerro").src = "/img/perro_grande.jpg";

                        }
                        else {
                            document.getElementById("imgTamañoPerro").src = '/img/perro_gigante.jpg';
                        }
                    }

                }

            }

            this.item.tamaño = param.valorMinimo + " a " + param.valorMaximo + " " + "KG.";
        },
        hrerReserva() {
            this.setDates();
            if (this.dateFrom != null & this.dateTo != null) {
                document.location.href = '/views/reserva/generar-reserva.html?id=' + this.idCuidador + '&from=' + this.dateFrom + '&to=' + this.dateTo;
            } else {
                document.location.href = '/views/reserva/generar-reserva.html?id=' + this.idCuidador;

            }

        },
        getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        bindUrlWithVue() {
            this.dateFrom = this.getParameterByName('from');
            this.dateTo = this.getParameterByName('to');
            this.idCuidador = this.getParameterByName('id');
        },
        setDates() {
            if (this.dateFrom != null & this.dateTo != null) {
                var value = this.dateFrom + '-' + this.dateTo;
                this.$refs.myHotelDatePicker.setValue(value);
            }
        },
        bindDates(e) {
            console.log("bin date");
            var split = e.split('-');
            this.dateFrom = split[0].replace(/\s/g, '');
            this.dateTo = split[1].replace(/\s/g, '');
        },
        getCalificacionesCuidador()
        {
            var urlCalificaciones = "/api/calificaciones/calificacionesCuidador/";

            axios.get(urlCalificaciones + '?id=' + this.idCuidador)
                .then((response) => {
                    this.DataReview = response.data;
                    var cont = 0;
                    this.DataReview .forEach( function(item, value, array) {


                        cont += item.puntaje;

                    });
                    if(this.DataReview.length > 0)
                    {
                       // this.puntaje =Math.trunc(cont /this.DataReview.length);

                        // var h = document.getElementsByClassName("star empty");
                        // for (i = 0; i < (this.puntaje-1); i++) {
                        //     h[0].className  = 'star' ;
                        //
                        // }

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

