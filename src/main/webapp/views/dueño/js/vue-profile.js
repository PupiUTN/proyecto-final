Vue.component('my-profile', {
    template:
        `
<div>
                <!-- Titlebar -->
            <div id="titlebar">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Mi Perfil</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- Profile -->
                <div class="col-lg-6 col-md-12">
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray">Informacion personal</h4>
                        <div class="dashboard-list-box-static">
                            <div class="col-sm-offset-3">
                            <form id="imageForm" enctype="multipart/form-data">
                            <!-- Avatar -->
                            <div class="edit-profile-photo">
                                <img :src="user.profileImageUrl" alt="Foto de Perfil" height="240">
                                <div class="change-photo-btn">
                                    <div class="photoUpload">
                                        <span><i class="fa fa-upload"></i> Subir Foto</span>
                                        <input type="file" id="imageFile" @change="filesChange($event.target.files)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                    </div>
                                </div>
                            </div>
                            </form>
                            </div>
                            <!-- Details -->
                            <div class="my-profile">

                                <label>Nombre y Apellido</label>
                                <input v-model="user.fullName" value="" type="text">

                                <label>Fecha de Nacimiento</label>
                                <input v-model="user.birthday" type="text" id="booking-date" data-lang="es" data-large-mode="true" data-format="d-m-Y" data-lock="to">


                                <label>Genero</label>
                                <select v-model="user.gender">
                                    <option disabled value="">Seleccionar Genero</option>
                                    <option>Masculino</option>
                                    <option>Femenino</option>
                                </select>


                                <label>Telefono</label>
                                <input v-model="user.phone" value="" type="text">

                                <label>Email</label>
                                <input v-model="user.email" value="" type="text">
                                
                                <label class="margin-top-0">Dirección</label>
                                <input v-model="direccion.provincia" ref="autocompleteProvincia" type="text" placeholder="Ingrese su provincia">

                                <label class="margin-top-0">Dirección</label>
                                <input v-model="direccion.direccionLinea1" ref="autocompleteCalle" v-bind:disabled="disabled" type="text" placeholder="Ingrese su dirección">
                            </div>
                            <!--    TODO onsubmit para validar el formulario-->
                            <button v-on:click='editUserInfo' class="button margin-top-15">Guardar</button>

                        </div>
                    </div>
                </div>
            </div>
</div>
    `,
    data: function () {
        return {
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
            disabled:true,
        }

    }
    ,
    mounted() {
        $('#booking-date').dateDropper();
        this.autocompleteAddress();
        this.getUserInfo();
    },
    methods: {

        autocompleteAddress() {
            // TODO permitir solo calles
            var autocomplete = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(this.$refs.autocompleteCalle),

                {
                    types: ['geocode'],
                    componentRestrictions: {country: "ar"}
                });
            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                console.log("-------------------------");
                console.log(place);
                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    //no es lo mas lindo, pero sirve para saber si falta numero o donde esta
                    //el error de la direccion
                    if(addressType=='street_number'){
                        vm.street_number=place.address_components[i].long_name;
                        console.log('street_number '+ vm.street_number);
                        continue;
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
            axios.post('/api/file/', formData)
                .then((response) => {

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
            if (sessionInfo.status === 200) {
                let address = sessionInfo.data.principal.user.direccion;
                if (!address) {
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

