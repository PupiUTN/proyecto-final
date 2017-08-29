let vm= new Vue({
    el:'#appVue',
    data:{
        autocomplete:null,
        placeID:null,
        placeLat:null,
        placeLng:null,
        placeName:null,
        location:'',
        geoPlace:null,

    },
    mounted(){
        this.initDate();
        this.initAutocomplete();
        this.initGeolocate();

    },
    methods:{
        toggleLoader() {
            $('#spinner').toggle();
        },
        initDate() {
            $('#booking-date-from').dateDropper();
            $('#booking-date-to').dateDropper();
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
                input.placeholder='Ciudad';
                let place = this.autocomplete.getPlace();
                if (place.geometry) {

                    this.placeID = place.place_id;
                    this.placeLocation= place.geometry.location;
                    this.placeName= input.value;



                } else {
                    this.placeID = null;
                    this.placeLat=null;
                    this.placeLng=null;
                    this.placeName= null;
                    this.location = '';
                    sweetAlert("Oops...", "No se encuentra la ciudad", "error");

                }

        })
        },
        initGeolocate() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    let lat = position.coords.latitude;
                    let long = position.coords.longitude;
                    //https://developers.google.com/maps/documentation/geocoding/start
                    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true')
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
        buscar() {
            if (this.placeID != null) {
                window.location.href = "http://localhost:8080/views/cuidadores/lista-cuidadores.html?placeName=" + this.placeName +
                    "&placeID=" + this.placeID +
                    "&lat=" + this.placeLat +
                    "&lng=" + this.placeLng;
            } else {
                sweetAlert("Oops...", "Ingrese una ciudad válida", "error");
                //no se ejecuta en orden... ver mas adelante
                this.location='';

            }
        }
    },
});



