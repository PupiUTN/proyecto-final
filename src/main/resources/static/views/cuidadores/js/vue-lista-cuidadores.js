let myListaCuidadores = Vue.component('my-lista-cuidadores', {
    // language=HTML
    template: `    
<div class="fs-container">
<div class="fs-inner-container content padding-top-0" >
    <div class="fs-content">
        <!-- Search -->
        <section class="search" style="padding-left: 45px; padding-right: 45px; padding-top: 15px; padding-bottom: 20px">

            <div class="row">

                <div class="col-md-12">

                    <!-- Main Search Input -->
                    <my-buscar-cuidadores :is-index="isIndex"></my-buscar-cuidadores>
                    
                </div>
                
            </div>
            <div class="row padding-top-10">
                <!-- Filters -->
                <div class="col-fs-12">

                    <!-- Panel Dropdown / End -->
                    <div class="panel-dropdown">
                        <a href="#">Categories</a>
                        <div class="panel-dropdown-content checkboxes categories">

                            <!-- Checkboxes -->
                            <div class="row">
                                <div class="col-md-6">
                                    <input id="check-1" type="checkbox" name="check" checked class="all">
                                    <label for="check-1">All Categories</label>

                                    <input id="check-2" type="checkbox" name="check">
                                    <label for="check-2">Shops</label>

                                    <input id="check-3" type="checkbox" name="check">
                                    <label for="check-3">Hotels</label>
                                </div>

                                <div class="col-md-6">
                                    <input id="check-4" type="checkbox" name="check" >
                                    <label for="check-4">Eat & Drink</label>

                                    <input id="check-5" type="checkbox" name="check">
                                    <label for="check-5">Fitness</label>

                                    <input id="check-6" type="checkbox" name="check">
                                    <label for="check-6">Events</label>
                                </div>
                            </div>

                            <!-- Buttons -->
                            <div class="panel-buttons">
                                <button class="panel-cancel">Cancel</button>
                                <button class="panel-apply">Apply</button>
                            </div>

                        </div>
                    </div>
                    <!-- Panel Dropdown / End -->

                    <!-- Panel Dropdown -->
                    <div class="panel-dropdown wide">
                        <a href="#">More Filters</a>
                        <div class="panel-dropdown-content checkboxes">

                            <!-- Checkboxes -->
                            <div class="row">
                                <div class="col-md-6">
                                    <input id="check-a" type="checkbox" name="check">
                                    <label for="check-a">Elevator in building</label>

                                    <input id="check-b" type="checkbox" name="check">
                                    <label for="check-b">Friendly workspace</label>

                                    <input id="check-c" type="checkbox" name="check">
                                    <label for="check-c">Instant Book</label>

                                    <input id="check-d" type="checkbox" name="check">
                                    <label for="check-d">Wireless Internet</label>
                                </div>

                                <div class="col-md-6">
                                    <input id="check-e" type="checkbox" name="check" >
                                    <label for="check-e">Free parking on premises</label>

                                    <input id="check-f" type="checkbox" name="check" >
                                    <label for="check-f">Free parking on street</label>

                                    <input id="check-g" type="checkbox" name="check">
                                    <label for="check-g">Smoking allowed</label>

                                    <input id="check-h" type="checkbox" name="check">
                                    <label for="check-h">Events</label>
                                </div>
                            </div>

                            <!-- Buttons -->
                            <div class="panel-buttons">
                                <button class="panel-cancel">Cancel</button>
                                <button class="panel-apply">Apply</button>
                            </div>

                        </div>
                    </div>
                    <!-- Panel Dropdown / End -->

                    <!-- Panel Dropdown -->
                    <div class="panel-dropdown">
                        <a href="#">Distance Radius</a>
                        <div class="panel-dropdown-content">
                            <input class="distance-radius" type="range" min="1" max="100" step="1" value="50" data-title="Radius around selected destination">
                            <div class="panel-buttons">
                                <button class="panel-cancel">Disable</button>
                                <button class="panel-apply">Apply</button>
                            </div>
                        </div>
                    </div>
                    <!-- Panel Dropdown / End -->

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
                
                    <a :href="'/views/cuidadores/cuidadores-perfil.html?id='+item.id"
                       class="listing-item-container" :data-marker-id=n+1>
                        <div class="listing-item">

                            <img :src="item.listaImagenes[0].url" alt="">

                            <div class="listing-badge now-open">Destacado</div>

                            <div class="listing-item-content">
                                <span class="tag">{{item.user.direccion.calle}}, {{item.user.direccion.provincia}} </span>
                                <h3>{{item.user.fullName}}</h3>
                                <span> $ {{item.precioPorNoche}} por Noche</span>
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
            encontrados: 'Resultados',
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
                            this.encontrados = this.items.length;
                            console.log(this.encontrados);
                            if (this.items.length === 1) {
                                this.encontrados += ' Resultado Encontrado';
                            } else {
                                this.encontrados += ' Resultados Encontrados';
                            }
                            this.mostrarEnMapa();


                        })
                        .catch(error => {
                                console.log(error);
                                //sweetAlert("Oops...", "Error, ver consola", "error");
                            }
                        );
                    //console.log(this.encontrados);
                }
            } else {
                window.location.href="/";
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
