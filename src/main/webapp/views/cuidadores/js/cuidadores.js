let vm = new Vue({
    el: '#appVue',
    data: {
        autocomplete:null,
        url: "/api/cuidadores/search",
        encontrados:'',
        // item: {
        //     index: '',
        //     id: '',
        //     nombre: ''
        // },
        items: [],
        formPost: true,
        place:null,
        map:null,

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
            autocomplete = new google.maps.places.Autocomplete(input, options);
            //PlaceHolder de la busqueda anterior, cambia al cambiar ciudad
            autocomplete.addListener('place_changed', () => {
                input.placeholder='Ciudad';
                this.place = autocomplete.getPlace();
                if (this.place.geometry) {
                    console.log("econtre");
                    let placeID = this.place.place_id;
                    console.log(this.place);


                } else {
                    document.getElementById('location').value = '';
                    // Debe mejorar con un toast
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

            });

        },
        initMap() {
            var argentina = {lat: -37.0230271, lng: -64.6175935};
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 5,
                center:argentina,
            });
        },
        getCuidadores() {

            placeID=sessionStorage.getItem('placeID');
            if(placeID!=null){
                //el placeholder de ciudad es la ciudad que le pasa el index
                let busqueda=sessionStorage.getItem('busqueda');
                var input = document.getElementById('location');
                input.placeholder=busqueda;
                this.place=JSON.parse( sessionStorage.getItem('place'));
                this.map.setCenter(this.place.geometry.location);
                this.map.setZoom(12);

                axios.get(this.url+'/?ciudadPlaceId='+placeID)
                .then((response) => {
                    this.items = response.data;
                    this.encontrados=this.items.length;
                    if(this.items.length===1){
                        this.encontrados+=' Resultado Encontrado';
                    }else{
                        this.encontrados+=' Resultados Encontrados';
                    }
                    console.log(this.encontrados);
                    this.toggleLoader();
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
            }else{
                this.toggleLoader();
            }
        },




    }




});
