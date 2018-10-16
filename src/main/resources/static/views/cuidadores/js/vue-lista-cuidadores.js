let myListaCuidadores = Vue.component('my-lista-cuidadores', {
    //language=HTML
    template: `
        <div class="fs-container">
            <div id="content" class="fs-inner-container content padding-top-0">
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
                            <div class="col-xs-12">
                                <!-- Panel Dropdown -->
                                <div class="panel-dropdown">
                                    <a href="#">Servicios</a>
                                    <div class="panel-dropdown-content checkboxes ">
                                        <!-- Checkboxes -->
                                        <div class="row">
                                            <div v-for=" servicio in listaServicios">
                                                <input :id="servicio.id" type="checkbox" :value="servicio.id"
                                                       name="check" v-model="checkedServicios">
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
                                    <a href="#">Tamaño Perro</a>
                                    <div class="panel-dropdown-content checkboxes" style="width: 200%">
                                        <!-- Checkboxes -->
                                        <div class="row">
                                            <tr v-for=" tamaño in listaTamaños">

                                                <td align="center">
                                                    <input :id="tamaño.nombre" type="checkbox" :value="tamaño.id"
                                                           name="check" v-model="checkedTamaños"
                                                           v-on:click="checkedPrimero('tamaño')">
                                                    <label :for="tamaño.nombre">{{tamaño.nombre}}</label>
                                                </td>
                                                <td>- De {{tamaño.valorMinimo}}kg&nbsp;</td>
                                                <td>a {{tamaño.valorMaximo}}kg</td>
                                            </tr>
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
                                    <a href="#">Cantidad</a>
                                    <div class="panel-dropdown-content checkboxes" style="width: 230%">
                                        <!-- Checkboxes -->
                                        <div class="row">
                                            <div v-for=" cantidad in listaCantidad">
                                                <input class="radio" :id="cantidad.id" type="checkbox"
                                                       :value="cantidad.value"
                                                       name="cantidad" v-model="checkedCantidad"
                                                       v-on:click="checkedPrimero('cantidad')">
                                                <label :for="cantidad.id">{{cantidad.nombre}}</label>
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
                                <!-- Panel Dropdown / End -->

                                <!-- Panel Dropdown -->
                                <div id="ordenar" class="panel-dropdown margin-right-10" style="float: right">
                                    <a href="#">{{sortType}}</a>
                                    <div class="panel-dropdown-content checkboxes" style=" width: 225px">
                                        <!-- Checkboxes -->
                                        <div class="row">
                                            <div v-for="orden in listaOrdenes">
                                                <input class="radio" :id="orden.id" type="checkbox" :value="orden.value"
                                                       :selected="orden.selected"
                                                       name="orden" v-model="checkedOrdenes" v-on:click="ordenarPor()">
                                                <label :for="orden.id">{{orden.value}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Panel Dropdown / End -->
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
                            <div v-for="(item,n) in gridCuidadores" :id="item.id" class="col-lg-6 col-md-12">

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


            <div class="clearfix"></div>

            <div class="col-md-6">
                <!-- Pagination -->
                <div class="pagination-container margin-top-20 margin-bottom-40">
                    <nav class="pagination">
                        <ul>

                            <li><a :style="offset > 0 ? 'background-color: crimson' : 'background-color: darkgrey'"
                                   @click="previous()"><i class="sl sl-icon-arrow-left"
                                                          style=" font-weight: bold;color: white;"></i></a></li>

                            <li v-for="item in listaPaginas"><a v-on:click="viewPage(item)">{{item}}</a></li>

                            <li>
                                <a :style="(offset + perPage) < gridData.length ? 'background-color: crimson' : 'background-color: darkgrey'"
                                   @click="next()"><i class="sl sl-icon-arrow-right"
                                                      style=" font-weight: bold;color: white;"></i></a></li>


                        </ul>
                    </nav>
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
            precioMax: 0,
            listaServicios: [],
            listaTamaños: [],
            listaCantidad: this.crearListaCantidad(),
            precioDesde: null,
            precioHasta: null,
            markers: [],
            checkedServicios: [],
            checkedTamaños: [],
            checkedCantidad: [],
            checkedOrdenes: [],
            relevanciaMayor: true,
            precioMayor: true,
            listaOrdenes: this.crearListaOrden(),
            sortType: 'Ordenar Por',
            offset: 0,
            gridData: [],
            gridCuidadores: [],
            perPage: 4,
            countPages: 1,
            listaPaginas: [],
        }
    },
    watch: {
        offset: function () {
            this.paginate();
        }

    },
    mounted() {
        this.getServicios();
        this.getTamaños();
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
        getTamaños() {
            axios.get("/api/tamaños/")
                .then((data) => {
                    this.listaTamaños = data.data;

                })
                .catch(error => {
                    console.log(error);
                    //sweetAlert("Oops...", "Error, no se pudo cargar tamaños", "error");
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
                //console.log(this.dateFrom);
                if (this.dateFrom != null) {
                    this.dateTo = this.getParameterByName('to');
                    var dateFromObj = fecha.parse(this.dateFrom, 'DD/MM/YYYY'); // new Date(2010, 11, 10, 14, 11, 12)
                    var dateToObj = fecha.parse(this.dateTo, 'DD/MM/YYYY'); // new Date(2010, 11, 10, 14, 11, 12)

                    if (dateToObj >= dateFromObj) {

                        consulta += '&from=' + this.dateFrom +
                            '&to=' + this.dateTo;
                        axios.get(consulta)
                            .then((response) => {
                                console.log(this.placeID);
                                console.log(response.data);
                                this.items = response.data;
                                this.itemsSinFiltro = this.items;
                                this.calcularEncontrados();
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
                            this.itemsSinFiltro = this.items;
                            this.calcularEncontrados();
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
            console.log("mostrar");
            this.clearMarkers();
            this.items = this.gridCuidadores;
            if (this.items != null) {
                console.log("estoy")
                if (this.items.length > 0) {
                    console.log("estoy arafue")
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

                            var dates = this.getDatesUrl();
                            console.log(dates);
                            var content = '<div class="marker-item" id="bodyContent"> ';
                            if (dates != ""){
                                content += '<a href="/views/cuidadores/cuidadores-perfil.html?id=' + id + dates + '">';
                            } else {
                                content += '<a href="/views/cuidadores/cuidadores-perfil.html?id=' + id + '">';
                            }
                            content += '<h4>' + item.user.fullName + '</h4> ' +
                                '<img style="height: 100%; width: 100%;" src=' + item.user.profileImageUrl + ' alt=""></a>' +
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
                        console.log("estoy aca")
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

                            var dates = this.getDatesUrl();
                            console.log(dates);
                            var content = '<div class="marker-item" id="bodyContent"> ';
                            if (dates != ""){
                                content += '<a href="/views/cuidadores/cuidadores-perfil.html?id=' + id + dates + '">';
                            } else {
                                content += '<a href="/views/cuidadores/cuidadores-perfil.html?id=' + id + '">';
                            }
                            content += '<h4>' + item.user.fullName + '</h4> ' +
                                '<img style="height: 100%; width: 100%;" src=' + item.user.profileImageUrl + ' alt=""></a>' +
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
                } else {
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
        filtrar() {
            this.items = this.itemsSinFiltro;
            var filtrados = [];
            for (var i = 0; i < this.items.length; i++) {
                var cuidador = this.items[i];
                if (this.cumplePrecio(cuidador) && this.cumpleServicios(cuidador)
                    && this.cumpleTamaño(cuidador) && this.cumpleCantidad(cuidador)) {
                    filtrados.push(cuidador);
                }
            }
            this.items = filtrados;
            this.ordenarPor();
            this.calcularEncontrados();
            this.mostrarEnMapa();
        },
        cumplePrecio(cuidador) {
            if (!this.precioHasta && !this.precioDesde) {
                return true;
            }
            if (this.precioHasta) {
                if (this.precioDesde) {
                    if (cuidador.precioPorNoche >= this.precioDesde && cuidador.precioPorNoche <= this.precioHasta) {
                        return true;
                    }
                } else {
                    if (cuidador.precioPorNoche <= this.precioHasta) {
                        return true;
                    }
                }
            } else {
                if (this.precioDesde) {
                    if (cuidador.precioPorNoche >= this.precioDesde) {
                        return true;
                    }
                }
            }
            return false;

        },
        cumpleTamaño(cuidador) {
            if (this.checkedTamaños.length > 0) {
                for (var i = 0; i < this.checkedTamaños.length; i++) {
                    console.log(cuidador.user.fullName + " " + cuidador.tamaño.id);
                    console.log(this.checkedTamaños[i]);
                    if (cuidador.tamaño.id == this.checkedTamaños[i]) {
                        return true;
                    }
                }
                return false;
            } else {
                return true;
            }
        },
        cumpleServicios(cuidador) {
            if (this.checkedServicios && this.checkedServicios.length > 0) {
                banderaServicios = 0;
                for (var j = 0; j < cuidador.listaServicios.length; j++) {
                    for (var k = 0; k < this.checkedServicios.length; k++) {
                        if (cuidador.listaServicios[j].id == this.checkedServicios[k]) {
                            banderaServicios++;
                            break;
                        }

                    }
                    if (banderaServicios == this.checkedServicios.length) {
                        return true;
                    }
                }
            } else {
                return true;
            }
        },
        cumpleCantidad(cuidador) {
            if (this.checkedCantidad && this.checkedCantidad[0]) {
                if (this.checkedCantidad[0] == 4) {
                    return cuidador.cantidadMaxDePerros >= 4;
                } else {
                    return this.checkedCantidad[0] == cuidador.cantidadMaxDePerros;
                }
            } else {
                return true;
            }
        },
        calcularEncontrados() {

            this.gridData = this.items;

            this.gridCuidadores = this.gridData.slice(this.offset, this.offset + this.perPage);

            this.countPagesCuidadores();

            this.encontrados = this.items.length;
            if (this.items.length === 1) {
                this.encontrados += ' Resultado Encontrado';
            } else {
                this.encontrados += ' Resultados Encontrados';
            }
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
        },
        crearListaCantidad() {
            var unPerro = {id: "1P", value: 1, nombre: "1 Perro"};
            var dosPerros = {id: "2P", value: 2, nombre: "2 Perros"};
            var tresPerros = {id: "3P", value: 3, nombre: "3 Perros"};
            var cuatroOMas = {id: "4P", value: 4, nombre: "4 o más Perros"};

            return [unPerro, dosPerros, tresPerros, cuatroOMas];
        },
        checkedPrimero(filtro) {
            var lista;
            switch (filtro) {
                case 'tamaño':
                    this.checkedTamaños = this.limpiarLista(this.checkedTamaños);
                    break;
                case 'orden':
                    this.checkedOrdenes = this.limpiarLista(this.checkedOrdenes);
                    break;
                case 'cantidad':
                    this.checkedCantidad = this.limpiarLista(this.checkedCantidad);
                    break;
                default:
                    return;
            }


        },
        limpiarLista(lista) {
            if (lista.length > 1) {
                var i = lista.length - 1;
                var item = lista[i];
                lista = [item];
            }
            return lista;
        },
        ordenarPor() {
            this.ocultarOrdenar();
            this.checkedOrdenes = this.limpiarLista(this.checkedOrdenes);
            if (this.checkedOrdenes.length == 0) {
                this.sortType = "Ordenar Por";
                return;
            }
            this.sortType = this.checkedOrdenes[0];
            console.log(this.sortType)
            if (this.sortType.includes("Precio")) {
                if (this.sortType.includes("Menor")) {
                    this.ordenarPrecio("menor");
                } else {
                    this.ordenarPrecio("mayor");
                }
            } else {
                if (this.sortType.includes("Menor")) {
                    this.ordenarRelevancia("menor");
                } else {
                    console.log("entre");
                    this.ordenarRelevancia("mayor");
                }
            }
            this.calcularEncontrados();
        },
        ordenarRelevancia(orden) {
            this.ordenarPorRelevancia();
            if (orden == 'menor') {
                this.items = this.items.slice().reverse();
                this.relevanciaMayor = false;
            } else {
                if (!this.relevanciaMayor) {
                    this.relevanciaMayor = true;
                }
            }
        },
        ordenarPrecio(orden) {
            this.ordenarPorPrecio();
            if (orden == 'menor') {
                this.items = this.items.slice().reverse();
                this.precioMayor = false;
            } else {
                if (!this.precioMayor) {
                    this.precioMayor = true;
                }
            }
        },
        ordenarPorPrecio() {
            this.items = this.items.sort((a, b) => a.precioPorNoche < b.precioPorNoche);
        },
        ordenarPorRelevancia() {
            this.items = this.items.sort((a, b) => a.ponderacion < b.ponderacion);
        },
        ocultarOrdenar() {
            var classes = $('#ordenar')[0].getAttribute('class').split(" ");
            classes = classes.splice(0, 2);
            var clase = classes[0] + " " + classes[1];
            $('#ordenar')[0].setAttribute('class', clase);

            var classesMain = $('#content')[0].getAttribute('class').split(" ");
            classesMain = classesMain.splice(0, 3);
            var claseMain = classesMain[0] + " " + classesMain[1] + " " + classesMain[2];
            $('#content')[0].setAttribute('class', claseMain);
        },
        crearListaOrden() {
            return [
                {id: 'MYR', value: 'Mayor Relevancia', selected: true},
                {id: 'MNR', value: 'Menor Relevancia', selected: false},
                {id: 'MYP', value: 'Mayor Precio', selected: false},
                {id: 'MNP', value: 'Menor Precio', selected: false}
            ]
        },
        paginate() {
            this.gridCuidadores = this.gridData.slice(this.offset, this.offset + this.perPage);
            this.mostrarEnMapa();

        },
        countPagesCuidadores() {
            this.countPages = this.gridData.length / this.perPage;

            if (this.countPages - Math.trunc(this.countPages) > 0.0) {
                this.countPages = Math.trunc(this.countPages) + 1;
            }
            this.listaPaginas = [];
            n = 1;

            while (n <= this.countPages) {
                this.listaPaginas.push(n);

                n++;
            }

        },


        previous() {
            if (this.offset > 0)
                this.offset = this.offset - this.perPage;
        },
        next() {
            if (this.offset + this.perPage < this.gridData.length)
                this.offset = this.offset + this.perPage;
        },
        viewPage(index) {
            var max = index * this.perPage;
            this.offset = max - this.perPage;
            //   this.gridCuidadores = this.gridData.slice(this.offset, max);

        }
    }
});
