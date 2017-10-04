let myListaCuidadores = Vue.component('my-lista-cuidadores', {
template: `    
<div class="fs-container">
<div class="fs-inner-container content">
    <div class="fs-content">
        <!-- Search -->
        <section style="padding-left: 45px; padding-right: 45px;">

            <div class="row">

                <div class="col-md-12">

                    <!-- Main Search Input -->
                    <my-buscar-cuidadores :is-index="isIndex"></my-buscar-cuidadores>
                </div>
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
                
                    <a :href="'/views/cuidadores/cuidadores-perfil.html?id='+item.id"
                       class="listing-item-container" :data-marker-id=n+1>
                        <div class="listing-item">

                            <img :src="item.listaImagenes[0].url" alt="">

                            <div class="listing-badge now-open">Destacado</div>

                            <div class="listing-item-content">
                                <span class="tag"> {{ item.precioPorNoche }} por Noche</span>
                                <h3>{{item.user.fullName}}</h3>
                                <span>{{item.user.direccion.calle}}</span>
                            </div>
                            <span class="like-icon"></span>
                        </div>
                        <div class="star-rating" data-rating="1">
                            <div class="rating-counter">(120 reviews)</div>
                        </div>
                    </a>

                </div>
                <!-- Listing Item / End -->


            </div>
            <!-- Listings Container / End -->


            <!-- Pagination Container -->
            <div class="row fs-listings">
                <div class="col-md-12">

                    <!-- Pagination -->
                    <div class="clearfix"></div>
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Pagination -->
                            <div class="pagination-container margin-top-15 margin-bottom-40">
                                <nav class="pagination">
                                    <ul>
                                        <li><a href="#" class="current-page">1</a></li>
                                        <li><a href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                        <li><a href="#"><i class="sl sl-icon-arrow-right"></i></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <!-- Pagination / End -->

                    <!-- Copyrights -->
                    <div class="copyrights margin-top-0">© 2017 Listeo. All Rights Reserved.</div>

                </div>
            </div>
            <!-- Pagination Container / End -->
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
            encontrados: '',
            items: [],
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
        }
    },
    mounted() {
        this.initMap();
        this.getCuidadores();

    },
    methods: {
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
                    if (this.dateTo >= this.dateFrom) {
                        consulta += '&from=' + this.dateFrom +
                            '&to=' + this.dateTo;
                        axios.get(consulta)
                            .then((response) => {
                                console.log(this.placeID);
                                console.log(response.data);
                                this.items = response.data;
                                this.encontrados = this.items.length;
                                if (this.items.length === 1) {
                                    this.encontrados += ' Resultado Encontrado';
                                } else {
                                    this.encontrados += ' Resultados Encontrados';
                                }
                                this.mostrarEnMapa();


                            })
                            .catch(error => {
                                    console.log(error);
                                    sweetAlert("Oops...", "Error, ver consola", "error");
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
                            if (this.items.length === 1) {
                                this.encontrados == ' Resultado Encontrado';
                            } else {
                                this.encontrados == ' Resultados Encontrados';
                            }
                            this.mostrarEnMapa();
                        })
                        .catch(error => {
                                console.log(error);
                                sweetAlert("Oops...", "Error, ver consola", "error");
                            }
                        );
                }
            } else {

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
            if (this.items != null && this.items.length > 0) {
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
                    }
                }
            }

        },
    }
});
