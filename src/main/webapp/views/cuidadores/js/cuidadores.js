let vm = new Vue({
    el: '#appVue',
    data: {
        autocomplete:null,
        url: "/api/cuidadores/search/",
        encontrados:'',
        items: [],
        formPost: true,
        map:null,
        placeID:null,
        placeLat:null,
        placeLng:null,
        placeName:null,
        geoPlace:null,
        dateFrom:null,
        dateTo:null,


    },
    mounted() {
        this.initGeolocate();
        this.initDate();
        this.initMap();
        this.initAutocomplete();
        this.getCuidadores();

    },
    methods: {

        toggleLoader() {
            $('#spinner').toggle();
        },
        initDate() {
            $('#dateFrom').dateDropper();
            $('#dateTo').dateDropper();
        },
        initAutocomplete() {
            //https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
            var input = document.getElementById('location');
            var options = {
                types: ['(cities)'],
                componentRestrictions: {country: "ar"}
            };

            // Create the autocomplete object, restricting the search to geographical
            // location types
            var autocomplete = new google.maps.places.Autocomplete(input, options);
            //PlaceHolder de la busqueda anterior, cambia al cambiar ciudad
            autocomplete.addListener('place_changed', () => {
                input.placeholder = 'Ciudad';
                let place = autocomplete.getPlace();
                if (place.geometry) {
                    vm.placeID = place.place_id;
                    vm.placeLat=place.geometry.location.lat();
                    vm.placeLng=place.geometry.location.lng();
                    vm.placeName= input.value;


                } else {
                    document.getElementById('location').value = '';

                    sweetAlert("Oops...", "No se encuentra la ciudad", "error");
                    return;
                }

            });

        },
        initGeolocate() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    vm.toggleLoader();
                    let lat = position.coords.latitude;
                    //trunca el valor a 5 decimales
                    this.placeLat = lat.toString().match(/^-?\d+(?:\.\d{0,5})?/)[0];
                    let long = position.coords.longitude;
                    this.placeLng = long.toString().match(/^-?\d+(?:\.\d{0,5})?/)[0];
                    //https://developers.google.com/maps/documentation/geocoding/start
                    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.placeLat + ',' + this.placeLng + '&sensor=true')
                        .then((data) => {
                            console.log(data.data)
                            var city = data.data.results[1];
                            if (city.geometry) {
                                vm.geoPlace = city;
                                vm.toggleLoader();
                            }
                        });
                });
            }
            ;
        },
        geolocate: function () {
            if (this.geoPlace != null) {
                let input = document.getElementById('location');
                this.placeID = this.geoPlace.place_id;
                this.placeLat = this.geoPlace.geometry.location.lat;
                this.placeLng = this.geoPlace.geometry.location.lng;
                this.placeName = this.geoPlace.formatted_address;
                input.placeholder = this.placeName;
            } else {
                sweetAlert("Oops...", "Debe activar la geolocalizacion", "error");
            }

        },
        initMap() {
            var argentina = {lat: -37.0230271, lng: -64.6175935};
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 5,
                center: argentina,
            });
        },
        getCuidadores() {
            var input = document.getElementById('location');
            this.placeID = this.getParameterByName('placeID');

            if (this.placeID != null) {
                //el placeholder de ciudad es la ciudad que le pasa el index
                input.placeholder = this.getParameterByName('placeName');
                this.placeName=input.placeholder;
                //crea un objeto como los pueda leer google maps
                this.placeLat=this.getParameterByName('lat');
                this.placeLng=this.getParameterByName('lng');
                var centro = new google.maps.LatLng(this.placeLat,this.placeLng);
                this.map.setCenter(centro);
                this.map.setZoom(12);
                this.dateFrom=this.getParameterByName('from');
                let consulta=this.url + '?ciudadPlaceId=' + this.placeID;
                console.log(this.dateFrom);
                if(this.dateFrom!=null){
                    this.dateTo=this.getParameterByName('to');
                    if(this.dateTo>=this.dateFrom){
                        consulta+='&from='+this.dateFrom+
                            '&to='+this.dateTo;
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
                                this.toggleLoader();

                            })
                            .catch(error => {
                                    console.log(error);
                                    sweetAlert("Oops...", "Error, ver consola", "error");
                                }
                            );
                    }else{
                        sweetAlert("Oops...", "No seas hacker", "error");
                    }
                }else{

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
                            this.toggleLoader();

                        })
                        .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, ver consola", "error");
                        }
                        );
                }
            } else {
                this.toggleLoader();
            }
        },
        //obitene los parametros de la url... copiado de internet
        getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        //al presionar el boton buscar, recarga la pagina con los datos nuevos
        buscar() {
            if (this.placeID != null) {
                let href= "http://localhost:8080/views/cuidadores/lista-cuidadores.html?placeName=" + this.placeName +
                    "&placeID=" + this.placeID +
                    "&lat=" + this.placeLat +
                    "&lng=" + this.placeLng;
                //con el datapicker los datos no se "bindean" en el dom...
                this.dateFrom= document.getElementById("dateFrom").value;
                this.dateTo = document.getElementById("dateTo").value;
                console.log(this.dateFrom);
                console.log(this.dateTo);
                if(this.dateFrom!=''){
                    if(this.dateTo!=''){
                    if(this.dateTo>=this.dateFrom){
                        href+="&from=" + this.dateFrom +
                            "&to="+this.dateTo;
                    }else{
                        sweetAlert("Oops...", "La fecha hasta debe ser mayor a la desde", "error");
                        this.dateTo='';
                        return;

                    }
                }else{
                        sweetAlert("Oops...", "Debe ingresar una fecha hasta", "error");
                        return;
                    }
                }
                window.location.href = href;
            } else {
                sweetAlert("Oops...", "Ingrese una ciudad válida", "error");
                //no se ejecuta en orden... ver mas adelante
                document.getElementById('location').value = '';
                document.getElementById('location').placeholder = 'Ciudad';


            }
        },
        //añade los marcadores al mapa
        mostrarEnMapa(){
            if(this.items!=null&&this.items.length>0){
                var bounds = new google.maps.LatLngBounds();
                for(item of this.items) {
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
                        '<div id="bodyContent">'+
                        '<a href="/views/cuidadores/cuidadores-perfil.html?id='+ id +'">'+
                        '<h4>'+item.user.fullName+'</h4></a> '+
                        '</div>';
                    var infowindow = new google.maps.InfoWindow();
                    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
                        return function() {
                            infowindow.setContent(content);
                            infowindow.setPosition(marker.getCenter());
                            infowindow.open(this.map,marker);

                        };
                    })(marker,content,infowindow));
                    bounds.extend(marker.center);

                }

                //now fit the map to the newly inclusive bounds
                this.map.fitBounds(bounds);

            }
        },
    }




});
