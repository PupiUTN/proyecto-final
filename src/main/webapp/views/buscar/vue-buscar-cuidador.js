Vue.component('my-buscar-cuidadores', {
    template: `
<form class="main-search-input" v-on:submit.prevent='buscar'>
    <div class="main-search-input-item location">
        <vue-google-autocomplete
            id="location"
            classname=""
            placeholder="Ciudad"
            country="ar"
            type="cities"
            v-on:placechanged="setPlaceId"
        >
        </vue-google-autocomplete>
        <a id="geo-location" v-on:click='geolocate()'>
            <i class="fa fa-dot-circle-o"></i>
        </a>
    </div>
    <div class="main-search-input-item">
        <input type="text" v-model="dateFrom" id="dateFrom" placeholder="Fecha Desde"
               data-lang="es"
               data-init-set="false"
               data-large-mode="true" data-large-default="true" data-min-year="2017"
               data-max-year="2020" data-lock="from">
    </div>
    <div class="main-search-input-item">
        <input type="text" v-model="dateTo" id="dateTo" placeholder="Fecha Hasta" data-lang="es"
               data-init-set="false"
               data-large-mode="true" data-large-default="true" data-min-year="2017"
               data-max-year="2020" data-lock="from">

    </div>
    <button class="button" type="submit">
        Buscar
    </button>
</form>
    `,
    data:
        function () {
            return {
                placeID: null,
                placeLat: null,
                placeLng: null,
                placeName: null,
                location: '',
                dateFrom: null,
                dateTo: null,
            }
        },
    mounted() {
        this.initDate();
    },
    methods: {
        geolocate() {
            if (navigator.geolocation) {
                $('.pace').show();
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log("entra a get current position");
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
                            this.placeID = city.place_id;
                            this.placeLat = city.geometry.location.lat;
                            this.placeLng = city.geometry.location.lng;
                            this.placeName = city.formatted_address;
                            let input = document.getElementById('location');
                            input.placeholder = this.placeName;
                            input.value = '';

                        });
                });
            }
            ;
        },
        setPlaceId(addressData, placeResultData) {
            this.placeID = placeResultData.place_id;
            this.placeLat = addressData.latitude;
            this.placeLng = addressData.longitude;
            this.placeName = placeResultData.formatted_address;

        },
        buscar() {
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

        },
        initDate() {
            $('#dateFrom').dateDropper();
            $('#dateTo').dateDropper();
        }
    }
});
