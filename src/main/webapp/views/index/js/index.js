let vm = new Vue({
    el: '#wrapper',
    data: {
        autocomplete: null,
        placeID: null,
        placeLat: null,
        placeLng: null,
        placeName: null,
        location: '',
        geoPlace: null,
        dateFrom: null,
        dateTo: null,

    },
    mounted() {
        this.initDate();
        this.initAutocomplete();
        // this.initGeolocate();



    },
    methods: {

        initDate() {
            $('#dateFrom').dateDropper();
            $('#dateTo').dateDropper();
        },
        initAutocomplete() {
            //https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
            input = document.getElementById('location');
            var options = {
                types: ['(cities)'],
                componentRestrictions: {country: "ar"}
            };
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            this.autocomplete = new google.maps.places.Autocomplete(input, options);
            this.autocomplete.addListener('place_changed', () => {
                input.placeholder = 'Ciudad';
                let place = this.autocomplete.getPlace();
                if (place.geometry) {

                    this.placeID = place.place_id;
                    this.placeLat = place.geometry.location.lat();
                    this.placeLng = place.geometry.location.lng();
                    this.placeName = input.value;


                } else {
                    this.placeID = null;
                    this.placeLat = null;
                    this.placeLng = null;
                    this.placeName = null;
                    this.location = '';
                    sweetAlert("Oops...", "No se encuentra la ciudad", "error");

                }

            })
        },
        geolocate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log("entra a get current position")
                    vm.toggleLoader();
                    let lat = position.coords.latitude;
                    //trunca el valor a 3 decimales
                    this.placeLat = lat.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
                    let long = position.coords.longitude;
                    this.placeLng = long.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
                    //https://developers.google.com/maps/documentation/geocoding/start
                    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.placeLat + ',' + this.placeLng + '&sensor=true')
                        .then((data) => {
                            console.log("Entra al axios");
                            var city = data.data.results[1];
                            if (city.geometry) {
                                vm.geoPlace = city;
                                let input = document.getElementById('location');
                                vm.placeID = vm.geoPlace.place_id;
                                vm.placeLat = vm.geoPlace.geometry.location.lat;
                                vm.placeLng = vm.geoPlace.geometry.location.lng;
                                vm.placeName = vm.geoPlace.formatted_address;
                                input.placeholder = vm.placeName;
                                input.value = '';
                                vm.toggleLoader();
                            }
                        });
                });
            }
            ;
        },
        geolocate2() {
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
        buscar() {
            if (this.placeID != null) {
                let href = "/views/cuidadores/lista-cuidadores.html?placeName=" + this.placeName +
                    "&placeID=" + this.placeID +
                    "&lat=" + this.placeLat +
                    "&lng=" + this.placeLng;
                //con el datapicker los datos no se "bindean" en el dom...
                this.dateFrom = document.getElementById("dateFrom").value;
                this.dateTo = document.getElementById("dateTo").value;
                console.log(this.dateFrom);
                console.log(this.dateTo);
                if (this.dateFrom != '') {
                    if (this.dateTo != '') {
                        if (this.dateTo >= this.dateFrom) {
                            href += "&from=" + this.dateFrom +
                                "&to=" + this.dateTo;
                        } else {
                            sweetAlert("Oops...", "La fecha hasta debe ser mayor a la desde", "error");
                            this.dateTo = '';
                            return;

                        }
                    } else {
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
        }
    }
});



