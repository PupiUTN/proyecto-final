let vm = new Vue({
    el: '#appVue',
    data: {
        route: '',
        url: "",
        direccion: '',
        street_number: '',
        locality: '',
        administrative_area_level_1: '',
        postal_code: '',
        country: '',
        genero: '',
        formPost: true
    },
    mounted() {
        this.autocompleteAddress();
    },
    methods: {
        toggleLoader() {
            $('#spinner').toggle();
        },
        autocompleteAddress() {
            var componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };
            var autocomplete = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(this.$refs.autocomplete),
                {types: ['geocode']});
            autocomplete.addListener('place_changed', function() {
                var place = autocomplete.getPlace();
                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        vm.$set(vm, addressType.toString(),val.toString());
                    }
                }
            });
        }
    }
});

