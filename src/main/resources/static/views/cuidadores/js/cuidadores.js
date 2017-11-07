let vm = new Vue({
    el: '#wrapper',
    data: {
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
