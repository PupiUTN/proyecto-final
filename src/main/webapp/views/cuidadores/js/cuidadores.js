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
    },
    mounted() {
        this.initDate();
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
            let place;
            //D
            autocomplete.addListener('place_changed', () => {
                input.placeholder='Ciudad';
                place = autocomplete.getPlace();
                if (place.geometry) {
                    console.log("econtre");
                    let placeID = place.place_id;
                    console.log(placeID);

                } else {
                    document.getElementById('location').value = '';
                    // Debe mejorar con un toast
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

            });
            //el placeholder de ciudad es la ciudad que le pasa el index
             place=sessionStorage.getItem('place');
            if(place!=null){

                input.placeholder=place;
            }
        },
        getCuidadores() {
            placeID=sessionStorage.getItem('placeID');
            if(placeID!=null){
            axios.get(this.url+'/?ciudadPlaceId='+placeID)
                .then((response) => {
                    this.items = response.data;
                    console.log(JSON.stringify(this.items));
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
