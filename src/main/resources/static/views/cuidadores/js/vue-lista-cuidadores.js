let myListaCuidadores = Vue.component('my-lista-cuidadores', {
    // language=HTML
    template: `
        <div class="fs-container">
            <div class="fs-inner-container content padding-top-0">
                <div class="fs-content">
                    <!-- Search -->
                    <section class="search"
                             style="padding-left: 45px; padding-right: 45px; padding-top: 15px; padding-bottom: 20px">

                        <div class="row">

                            <div class="col-md-12">
                                <!-- Main Search Input -->
                                <my-buscar-cuidadores :is-index="isIndex"></my-buscar-cuidadores>

                            </div>

                        </div>
                        <div class="row padding-top-10">
                            <!-- Filters -->
                            <div class="col-fs-12">
                                <!-- Panel Dropdown -->
                                <div class="panel-dropdown wide">
                                    <a href="#">Servicios</a>
                                    <div class="panel-dropdown-content checkboxes">

                                        <!-- Checkboxes -->
                                        <div class="row">
                                            <!--<input id="check-1" type="checkbox" name="check" class="all">
                                            <label for="check-1">Todos</label>-->
                                            <div v-for =" servicio in listaServicios">
                                                <input :id="servicio.id" type="checkbox" :value="servicio.id" name="check" v-model="checkedServicios">
                                                <label :for="servicio.id">{{servicio.nombre}}</label>
                                            </div>
                                        </div>

                                        <!-- Buttons -->
                                        <div class="panel-buttons">
                                            <button class="panel-cancel">Cancelar</button>
                                            <button v-on:click="filtrar()" class="panel-apply">Aplicar</button>
                                        </div>

                                    </div>
                                </div>
                                <!-- Panel Dropdown / End -->

                                <!-- Panel Dropdown -->
                                <div class="panel-dropdown">
                                    <a href="#">Precio</a>
                                    <div class="panel-dropdown-content">
                                        <div class="row">
                                            <label class="col-md-2 col-xs-6 margin-top-10">Desde:</label>
                                            <input class="inp" type="number" style=" float: left;" placeholder="Desde"
                                                   v-model="precioDesde">
                                            <label class="col-md-2 col-xs-6 col-md-offset-1 margin-top-10">Hasta:</label>
                                            <input class="inp" type="number" style=" float: left;" placeholder="Hasta"
                                                   v-model="precioHasta">
                                        </div>
                                        <div class="panel-buttons">
                                            <button class="panel-cancel">Cancelar</button>
                                            <button v-on:click="filtrar()" class="panel-apply">Aplicar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Filters / End -->
                        </div>

                    </section>
                    <!-- Search / End -->
                    <section class="listings-container margin-top-30">
                        <!-- Sorting / Layout Switcher -->
                        <div class="row fs-switcher">

                            <div class="col-md-6">
                                <!-- Showing Results -->
                                <p class="showing-results">{{ encontrados }}</p>
                            </div>

                        </div>
                        <!-- Listings -->
                        <div class="row fs-listings">
                            <!-- Listing Item -->
                            <div v-for="(item,n) in items" :id="item.id" class="col-lg-6 col-md-12">

                                <a :href="'/views/cuidadores/cuidadores-perfil.html?id=' + item.id 
                    + getDatesUrl()" class="listing-item-container" :data-marker-id=n+1>
                                    <div class="listing-item">

                                        <img :src="item.user.profileImageUrl" alt="">

                                        <!--<div class="listing-badge now-open">Destacado</div>-->

                                        <div class="listing-item-content">
                                            <!--<span class="tag">{{item.user.direccion.calle}}, {{item.user.direccion.provincia}} </span>-->
                                            <h3>{{item.user.fullName}}</h3>
                                            <span> $ {{item.precioPorNoche}} por Noche</span>
                                        </div>
                                        <!--<span class="like-icon"></span>-->
                                    </div>
                                    <div class="star-rating" data-rating="5.0">
                                        <div class="rating-counter">({{item.cantidadReviews}} reviews)</div>

                                        <span v-for="n in item.promedioReviews" class="star"></span>
                                        <span v-for="n in complemento(item.promedioReviews)" class="star empty"></span>
                                    </div>

                                </a>

                            </div>

                            <!-- Listing Item / End -->
                        </div>
                        <!-- Listings Container / End -->
                    </section>

                </div>
            </div>
            <div class="fs-inner-container map-fixed">
                <!-- Map -->
                <div id="map-container">
                    <div id="map" data-map-zoom="9" data-map-scroll="true">
                        <!-- map goes here -->
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            autocomplete: null,
            url: "/api/cuidadores/search/",
            encontrados: 'Resultados',
            items: [],
            itemsSinFiltro:[],
            formPost: true,
            map: null,
            placeID: null,
            placeLat: null,
            placeLng: null,
            placeName: null,
            geoPlace: null,
            dateFrom: null,
            dateTo: null,
            isIndex: false,
            precioMax: 0,
            listaServicios: null,
            precioDesde: null,
            precioHasta: null,
            markers:[],
            checkedServicios:[],
        }
    },
    mounted() {
        this.getServicios();
        this.initMap();
        this.getCuidadores();

    },
    methods: {
        getServicios() {
            axios.get("/api/servicios/")
                .then((data) => {
                    this.listaServicios = data.data;

                })
                .catch(error => {
                    console.log(error);
                    //sweetAlert("Oops...", "Error, no se pudo cargar servicios", "error");
                });
        },
        initMap() {
            var argentina = {lat: -37.0230271, lng: -64.6175935};
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 5,
                center: argentina,
            });
        },
        getCuidadores() {
            this.placeID = this.getParameterByName('placeID');

            if (this.placeID != null) {
                //crea un objeto como los pueda leer google maps
                this.placeLat = this.getParameterByName('lat');
                this.placeLng = this.getParameterByName('lng');
                var centro = new google.maps.LatLng(this.placeLat, this.placeLng);
                this.map.setCenter(centro);
                this.map.setZoom(12);
                this.dateFrom = this.getParameterByName('from');
                let consulta = this.url + '?ciudadPlaceId=' + this.placeID;
                console.log(this.dateFrom);
                if (this.dateFrom != null) {
                    this.dateTo = this.getParameterByName('to');
                    var dateFromObj = fecha.parse(this.dateFrom, 'DD/MM/YYYY'); // new Date(2010, 11, 10, 14, 11, 12)
                    var dateToObj = fecha.parse(this.dateTo, 'DD/MM/YYYY'); // new Date(2010, 11, 10, 14, 11, 12)

                    if (dateToObj >= dateFromObj) {

                        consulta += '&from=' + dateFromObj +
                            '&to=' + dateToObj;
                        axios.get(consulta)
                            .then((response) => {
                                console.log(this.placeID);
                                console.log(response.data);
                                this.items = response.data;
                                this.itemsSinFiltro = this.items;
                                this.calcularEncontrados();


                            })
                            .catch(error => {
                                    console.log(error);
                                    //sweetAlert("Oops...", "Error, ver consola", "error");
                                }
                            );
                    } else {
                        sweetAlert("Oops...", "No seas hacker", "error");
                    }
                } else {

                    axios.get(consulta)
                        .then((response) => {
                            console.log(this.placeID);
                            console.log(response.data);
                            this.items = response.data;
                            this.itemsSinFiltro = this.items;
                            this.calcularEncontrados();
                        })
                        .catch(error => {
                                console.log(error);
                                //sweetAlert("Oops...", "Error, ver consola", "error");
                            }
                        );
                    //console.log(this.encontrados);
                }
            } else {
                window.location.href = "/";
            }

        },

        //obitene los parametros de la url... copiado de internet
        getParameterByName(name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        //añade los marcadores al mapa
        mostrarEnMapa() {
            this.clearMarkers();
            if (this.items != null) {
                if (this.items.length > 0) {
                    if (this.items.length > 1) {
                        var bounds = new google.maps.LatLngBounds();
                        for (item of this.items) {
                            var marker = new google.maps.Circle({
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35,
                                map: this.map,
                                center: new google.maps.LatLng(item.user.direccion.latitud, item.user.direccion.longitud),
                                radius: 300,
                            });
                            //extend the bounds to include each marker's position
                            var id = item.id;

                            var content =
                                '<div id="bodyContent">' +
                                '<a href="/views/cuidadores/cuidadores-perfil.html?id=' + id + '">' +
                                '<h4>' + item.user.fullName + '</h4></a> ' +
                                '</div>';
                            var infowindow = new google.maps.InfoWindow();
                            google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                                return function () {
                                    infowindow.setContent(content);
                                    infowindow.setPosition(marker.getCenter());
                                    infowindow.open(this.map, marker);

                                };
                            })(marker, content, infowindow));
                            bounds.extend(marker.center);

                            this.markers.push(marker);
                        }
                        //now fit the map to the newly inclusive bounds
                        this.map.fitBounds(bounds);

                    } else {

                        for (item of this.items) {
                            var marker = new google.maps.Circle({
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35,
                                map: this.map,
                                center: new google.maps.LatLng(item.user.direccion.latitud, item.user.direccion.longitud),
                                radius: 300,
                            });
                            //extend the bounds to include each marker's position
                            var id = item.id;

                            var content =
                                '<div id="bodyContent">' +
                                '<a href="/views/cuidadores/cuidadores-perfil.html?id=' + id + '">' +
                                '<h4>' + item.user.fullName + '</h4></a> ' +
                                '</div>';
                            var infowindow = new google.maps.InfoWindow();
                            google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                                return function () {
                                    infowindow.setContent(content);
                                    infowindow.setPosition(marker.getCenter());
                                    infowindow.open(this.map, marker);

                                };
                            })(marker, content, infowindow));
                            this.markers.push(marker);
                            var centro = new google.maps.LatLng(this.placeLat, this.placeLng);
                            this.map.setCenter(centro);
                            this.map.setZoom(12);
                        }
                    }
                }else{
                    this.placeLat = this.getParameterByName('lat');
                    this.placeLng = this.getParameterByName('lng');
                    var centro = new google.maps.LatLng(this.placeLat, this.placeLng);
                    this.map.setCenter(centro);
                    this.map.setZoom(12);
                }
            }

        },
        clearMarkers() {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers = [];
        },
        filtrar(){
            this.items = [];
            var banderaServicios=0;
            var itemsFiltrar=this.itemsSinFiltro;
            var itemsFiltroPrecio=[];
            //filtro precio
            if (this.precioHasta) {
                if (this.precioDesde) {
                    for (var i = 0; i < itemsFiltrar.length; i++) {
                        if (itemsFiltrar[i].precioPorNoche >= this.precioDesde && itemsFiltrar[i].precioPorNoche <= this.precioHasta) {
                            itemsFiltroPrecio.push(itemsFiltrar[i]);
                        }
                    }
                } else {
                    for (var i = 0; i < itemsFiltrar.length; i++) {
                        if (itemsFiltrar[i].precioPorNoche <= this.precioHasta) {
                            itemsFiltroPrecio.push(itemsFiltrar[i]);
                        }
                    }
                }
            }else{
                if(this.precioDesde){
                    for (var i = 0; i < itemsFiltrar.length; i++) {
                        if (itemsFiltrar[i].precioPorNoche >= this.precioDesde) {
                            itemsFiltroPrecio.push(itemsFiltrar[i]);
                        }
                    }
                }else{
                    if(!this.checkedServicios || this.checkedServicios.length==0) {
                        this.items=this.itemsSinFiltro;
                    }
                }
            }

            if(itemsFiltroPrecio.length==0){
                itemsFiltroPrecio=itemsFiltrar;
            }

            //filtro servicio
            if(this.checkedServicios && this.checkedServicios.length>0) {
                this.itemsConFiltroServicio = [];
                for (var i = 0; i < itemsFiltroPrecio.length; i++) {
                    banderaServicios = 0;
                    for (var j = 0; j < itemsFiltroPrecio[i].listaServicios.length; j++) {
                        console.log(itemsFiltroPrecio[i].listaServicios[j].nombre);
                        for (var k = 0; k < this.checkedServicios.length; k++) {
                            if(itemsFiltroPrecio[i].listaServicios[j].id == this.checkedServicios[k]){
                                banderaServicios ++;
                                break;
                            }
                        }
                    }
                    if (banderaServicios == this.checkedServicios.length) {
                            this.items.push(itemsFiltroPrecio[i]);
                    }
                }
            }
                this.calcularEncontrados();



        },
        calcularEncontrados() {
            this.encontrados = this.items.length;
            if (this.items.length === 1) {
                this.encontrados += ' Resultado Encontrado';
            } else {
                this.encontrados += ' Resultados Encontrados';
            }
            this.mostrarEnMapa();
        },
        getDatesUrl() {
            if (this.dateFrom != null) {
                if (this.dateTo != null) {
                    return "&from=" + this.dateFrom + "&to=" + this.dateTo;
                }
            }
            return "";
        },
        complemento: function (promedioReviews) {
            return 5 - promedioReviews
        }
    }
});
