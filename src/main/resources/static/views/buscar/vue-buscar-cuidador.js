// https://github.com/olefirenko/vue-google-autocomplete
var myBuscarCuidadores = Vue.component('my-buscar-cuidadores', {
    template: `
<form class="main-search-input" v-on:submit.prevent='buscar'>
    <div class="main-search-input-item location">
        <vue-google-autocomplete
            id="location"
            placeholder="Ciudad"
            country="ar"
            types="(cities)"
            v-on:placechanged="setPlaceId"
        >
        </vue-google-autocomplete>
        <a id="geo-location" v-on:click='geolocate()' v-show="isIndex">
            <i class="fa fa-dot-circle-o"></i>
        </a>
        

    </div>
    <div class="main-search-input-item location">
        <my-hotel-date-picker 
            ref="myHotelDatePicker" 
            format="DD/MM/YYYY"
            v-on:updateDateRange="bindDates"
            datepickerId="datepickerId"
        > 
</my-hotel-date-picker>
              <a><i class="fa fa-calendar-check-o"></i></a>
    </div>
    <button class="button" type="submit">
        Buscar
    </button>
    

</form>

    `,
    props: {
        isIndex: {
            type: Boolean,
            default: true
        }
    },
    data:
        function () {
            return {
                placeID: null,
                placeLat: null,
                placeLng: null,
                placeName: null,
                dateFrom: null,
                dateTo: null,
            }
        },
    mounted() {
        this.bindUrlWithVue();
        this.setDates();

    },
    methods: {
        geolocate() {
            if (navigator.geolocation) {
                $('#page-loader').show();
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
                            console.log(data.data);
                            var city = data.data.results[1];
                            vm.$refs.myIndex.$refs.currentView.$refs.myBuscarCuidadores.placeID = city.place_id;
                            vm.$refs.myIndex.$refs.currentView.$refs.myBuscarCuidadores.placeLat = city.geometry.location.lat;
                            vm.$refs.myIndex.$refs.currentView.$refs.myBuscarCuidadores.placeLng = city.geometry.location.lng;
                            vm.$refs.myIndex.$refs.currentView.$refs.myBuscarCuidadores.placeName = city.formatted_address;
                            let input = document.getElementById('location');
                            input.value = vm.$refs.myIndex.$refs.currentView.$refs.myBuscarCuidadores.placeName;

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
            //si el formulario no tiene los campos basicos no hago nada
            if (!this.formValitaion()) {
                console.log("place id not set in vue-search component");
                return;
            }
            let href = "/views/cuidadores/lista-cuidadores.html?placeName=" + this.placeName +
                "&placeID=" + this.placeID +
                "&lat=" + this.placeLat +
                "&lng=" + this.placeLng;


            if (this.dateFrom != null) {
                if (this.dateTo != null) {
                    var dateFromObj = fecha.parse(this.dateFrom, 'DD/MM/YYYY'); // new Date(2010, 11, 10, 14, 11, 12)
                    var dateToObj = fecha.parse(this.dateTo, 'DD/MM/YYYY'); // new Date(2010, 11, 10, 14, 11, 12)

                    if (dateToObj >= dateFromObj) {
                        href += "&from=" + this.dateFrom +
                            "&to=" + this.dateTo;
                    } else {
                        sweetAlert("Oops...", "La fecha hasta debe ser mayor a la desde", "error");
                        this.dateTo = '';
                        return;

                    }
                }
            }
            // router.push({ name: 'buscar'});

            window.location.href = href;

        }, bindDates(e) {
            var split = e.split('-');
            this.dateFrom = split[0].replace(/\s/g, '');
            this.dateTo = split[1].replace(/\s/g, '');
        },
        setDates() {
            if (this.dateFrom != null & this.dateTo != null) {
                var value = this.dateFrom + '-' + this.dateTo;
                this.$refs.myHotelDatePicker.setValue(value);
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
        bindUrlWithVue() {
            this.dateFrom = this.getParameterByName('from');
            this.dateTo = this.getParameterByName('to');
            this.placeID = this.getParameterByName('placeID');
            this.placeName = this.getParameterByName('placeName');
            this.placeLat = this.getParameterByName('lat');
            this.placeLng = this.getParameterByName('lng');
            //
            if (this.placeName != undefined) {
                let input = document.getElementById('location');
                input.placeholder = this.placeName;
                input.value = this.placeName;
            }
        },
        formValitaion() {
            if (this.placeID == null) {
                return false;
            }
            return true;
        }
    }
});
