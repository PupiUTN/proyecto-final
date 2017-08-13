let vm = new Vue({
    el: '#appVue',
    data: {
        route: '',
        url: "",
        address: '',
        street_number: '',
        locality: '',
        administrative_area_level_1: '',
        postal_code: '',
        country: '',
        genero: '',
        image: '/assets/images/dashboard-avatar.jpg',
        formPost: true,
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null
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
        },
        filesChange(fileList) {
            // handle file changes
            const formData = new FormData();

            if (!fileList.length) return;
            // append the files to FormData
            Array
                .from(Array(fileList.length).keys())
                .map(x => {
                    formData.append('file', fileList[x]);
                });

            // save it
            this.upload(formData);
        },
        upload(formData) {
            console.log("UPLOAD");
            axios.post('/api/file/', formData)
                .then((response) => {
                    this.toggleLoader();
                    console.log(response);
                    this.image = response.data;
                })
                .catch(error => {
                    console.log("ERROR AXIOS");
                        console.log(error);
                    }
                );
        }
    }
});

