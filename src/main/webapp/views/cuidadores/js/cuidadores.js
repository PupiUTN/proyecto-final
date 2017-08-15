let vm = new Vue({
    el: '#appVue',
    data: {
        autocomplete:null,
        url: "/api/cuidadores/search",
        encontrados:'',
        items: [],
        formPost: true,
        map:null,
        placeID:null,
        placeLocation:null,
        placeName:null,

    },
    mounted() {
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
            $('#booking-date-from').dateDropper();
            $('#booking-date-to').dateDropper();
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
                    this.placeID = place.place_id;
                    this.placeLocation= place.geometry.location;
                    this.placeName= input.value;



                } else {
                    document.getElementById('location').value = '';

                    sweetAlert("Oops...", "No se encuentra la ciudad", "error");
                    return;
                }

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
            var input = document.getElementById('location');
            var placeID = this.getParameterByName('placeID');
            if (placeID != null) {
                //el placeholder de ciudad es la ciudad que le pasa el index
                input.placeholder = this.getParameterByName('placeName');
                //crea un objeto como los pueda leer google maps
                var centro = new google.maps.LatLng(this.getParameterByName('lat'), this.getParameterByName('lng'))
                this.map.setCenter(centro);
                this.map.setZoom(12);

                axios.get(this.url + '/?ciudadPlaceId=' + placeID)
                    .then((response) => {
                        this.items = response.data;
                        this.encontrados = this.items.length;
                        if (this.items.length === 1) {
                            this.encontrados += ' Resultado Encontrado';
                        } else {
                            this.encontrados += ' Resultados Encontrados';
                        }

                        this.toggleLoader();

                    })
                    .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, ver consola", "error");
                        }
                    );
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
        buscar() {
            if (this.placeID != null) {
                console.log(this.placeID);
                window.location.href = "http://localhost:8080/views/cuidadores/lista-cuidadores.html?placeName=" + this.placeName +
                    "&placeID=" + this.placeID +
                    "&lat=" + this.placeLocation.lat() +
                    "&lng=" + this.placeLocation.lng();
            } else {
                sweetAlert("Oops...", "Ingrese una ciudad válida", "error");
                //no se ejecuta en orden... ver mas adelante
                document.getElementById('location').value = '';
                document.getElementById('location').placeholder = 'Ciudad';


            }
        }
    }




});
