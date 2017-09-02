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
        postal_code: '',
        listaServicios: []
    },
    mounted() {
        this.selector_cantidad();
        this.BuscarServicios();
        this.autocompleteAddress();
        this.getUserInfo();
    },
    methods: {
        toggleLoader() {
            $('#spinner').toggle();
        },
        BuscarServicios()
        {

            axios.get("/api/cuidadores/searchServicios/")
                .then((data) => {
                    this.listaServicios = data.data;
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, no se pudo cargar servicios", "error");
                });


        },
         selector_cantidad()
         {

             var select = '';
             for (i=1;i<=20;i++){
                 select += '<option val=' + i + '>' + i + '</option>';
             }
             $('#selector_cantidad').html(select);

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
                {types: ['geocode'], componentRestrictions: {country: "ar"}});
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
                vm.direccion.ciudadPlaceId = place.place_id;
                vm.direccion.placeId = place.id;
                vm.direccion.latitud = place.geometry.location.lat();
                vm.direccion.longitud = place.geometry.location.lng();
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
            axios.post('/api/file/', formData)
                .then((response) => {
                    this.toggleLoader();
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
                let address = sessionInfo.data.principal.user.direccion;
                if(!address) {
                    address = {};
                    address.direccionLinea1 = "";
                }
                this.direccion = address;
                this.user = sessionInfo.data.principal.user;
            }
            else {
                console.log(sessionInfo.status + "|" + sessionInfo.statusText);
                sweetAlert("Oops...", "Necesitas estar logueado para acceder a este contenido", "error");
            }
        }
    }
});

