let vm = new Vue({
    el: '#appVue',
    data: {
        user: {},
        url: "/api/user/",
        direccion: {},
        formPost: true,
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        street_number: '',
        route: '',
        locality: '',
        administrative_area_level_1: '',
        country: '',
        postal_code: ''
    },
    mounted() {
        this.autocompleteAddress();
        this.getUserInfo();
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
                // vm.$set(vm.direccion, 'calle',this.route.toString());
                vm.direccion.calle = vm.route;
                vm.direccion.numero = vm.street_number;
                vm.direccion.ciudad = vm.locality;
                vm.direccion.provincia = vm.administrative_area_level_1;
                vm.direccion.pais = vm.country;
                vm.direccion.codigoPostal = vm.postal_code;
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
                    this.user.profileImageUrl = response.data;
                })
                .catch(error => {
                    console.log("ERROR AXIOS");
                        console.log(error);
                    }
                );
        },
        getUserInfo() {
            axios.get(this.url + "me")
                .then((sessionInfo) => {
                this.isUserLoggedIn(sessionInfo);
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },
        editUserInfo() {
            this.user.direccion = this.direccion;
            var payload = jQuery.extend(true, {}, this.user);
            axios.put(this.url + this.user.id, payload)
                .then((response) => {
                    this.toggleLoader();
                    sweetAlert("Editado!", "Usuario editado exitosamente.", "success");
                    console.log(response);
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");

                    }
                );
        },
        isUserLoggedIn(sessionInfo) {
            if(sessionInfo.status === 200) {
                this.direccion = sessionInfo.data.principal.user.direccion;
                console.log(sessionInfo.data.principal.user.profileImageUrl);
                this.user = sessionInfo.data.principal.user;
            }
            else {
                console.log(sessionInfo.status + "|" + sessionInfo.statusText);
                sweetAlert("Oops...", "Necesitas estar logueado para acceder a este contenido", "error");
            }
        }
    }
});

