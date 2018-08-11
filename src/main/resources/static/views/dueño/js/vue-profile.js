Vue.component('my-profile', {
    template:
        `
<div>
    <div id="titlebar">
        <div class="row">
            <div class="col-md-12">
                <h2>Mi Perfil</h2>
            </div>
        </div>
    </div>
    <form id="editCuidador" v-on:submit.prevent="editUserInfo" enctype="multipart/form-data">
        <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="dashboard-list-box margin-top-0">
                <h4 class="gray">Informacion personal</h4>
                <div class="dashboard-list-box-static">
                    <div class="row">
                        <div class="col-sm-offset-3 col-md-offset-0 col-md-4 margin-top-5">
                            <form id="imageForm" enctype="multipart/form-data">
                            <!-- Avatar -->
                            <img :src="user.profileImageUrl" alt="Foto de Perfil" height="286">
                            
                            <div class="change-photo-btn">
                                <div class="photoUpload">
                                    <span> <i class="fa fa-upload"></i> Subir Foto  </span>
                                    <input type="file" id="imageFile" @change="filesChange($event.target.files)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div class="my-profile col-md-8">
                            <label class="margin-top-0">Nombre y Apellido</label>
                            <input v-model="user.fullName" value="" type="text" required>
                            <label class="margin-top-0">Fecha de Nacimiento</label>
                            <input type="date" v-model="user.birthday" required>    
                            <label class="margin-top-0">Género</label>
                            <select v-model="user.gender" required>
                                <option disabled selected value="Seleccionar Género">Seleccionar Género</option>
                                <option>Masculino</option>
                                <option>Femenino</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row margin-top-20">
        <div class="col-xs-12">
            <div class="dashboard-list-box margin-top-0">
                <h4 class="gray">Información de Contacto</h4>
                <div class="dashboard-list-box-static">
                    <div class="my-profile">
                        <label class="margin-top-0">Teléfono</label>
                        <input v-model="user.phone" value="" type="number" required>
                        <label class="margin-top-0">Email</label>
                        <input v-model="user.email" value="" type="email" required disabled>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row margin-top-20">
    <div class="col-xs-12">
        <div class="dashboard-list-box margin-top-0">
            <h4 class="gray">Dirección</h4>
            <div class="dashboard-list-box-static">
                <div class="my-profile">
                    <input id="autocomplete" type="text" placeholder="Ingrese su dirección">
                    <label class="margin-top-0">Número</label>
                    <input v-model="direccion.numero" type="number" class="street_number" :disabled="disabled" >
                    <label class="margin-top-0">Calle</label>
                    <input v-model="direccion.calle" type="text" class="route" :disabled="disabled" >
                    <label class="margin-top-0">Ciudad (salvo CABA)</label>
                    <input v-model="direccion.ciudad" type="text" class="locality sublocality_level_1" :disabled="disabled" >
                    <label class="margin-top-0">Provincia</label>
                    <input v-model="direccion.provincia" type="text" class="administrative_area_level_1" :disabled="disabled" >
                </div>
            </div>
        </div>
    </div>
</div>
    <div class="row">
        <div class="col-s-3" style="margin-left: 2%;">
            <input type="submit" value="Guardar" name="editUserInfo" style=" height: 60px; width: 150px; position: relative; " class="button margin-top-10"/>
        </div>
    </div>
</form>
</div>
    `,
    data: function () {
        return {
            user: {},
            url: "/api/user/",
            direccion: {
                calle: ''
            },
            formPost: true,
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            disabled: true,
            place: null,
            componentForm: {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            },
            autocomplete: null
        }

    }
    ,
    mounted() {
        this.autocompleteAddress();
        this.getUserInfo();
        this.preventEnter();
    },
    methods: {
        preventEnter() {
            $('#editCuidador').on('keyup keypress', function (e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 13) {
                    e.preventDefault();
                    return false;
                }
            });
        },
        autocompleteAddress() {
            // TODO permitir solo calles
            this.autocomplete = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */
                (document.getElementById('autocomplete')),

                {
                    types: ['geocode'],
                    componentRestrictions: {country: "ar"}
                });

            this.autocomplete.addListener('place_changed', this.completar);
        },
        completar() {
            this.place = this.autocomplete.getPlace();
            //console.log(this.place);
            if (this.place.types && this.place.types[0] != "street_address") {//si es direccion, tiene qie tener numero
                sweetAlert("Información", "Ingrese una dirección válida (Calle Número, Ciudad, Provincia)", "info");
                return;
            }
            //this.disabled=false;
            for (var i = 0; i < this.place.address_components.length; i++) {
                var addressType = this.place.address_components[i].types[0];
                if (this.componentForm[addressType]) {
                    var val = this.place.address_components[i][this.componentForm[addressType]];
                    if (addressType == "street_number") {//numero
                        this.direccion.numero = val;
                        continue;
                    }
                    if (addressType == "route") {//calle
                        this.direccion.calle = val;
                        continue;
                    }
                    if (addressType == "locality") {//ciudad
                        this.direccion.ciudad = val;
                        continue;
                    }
                    if (addressType == "administrative_area_level_1") {//provincia
                        this.direccion.provincia = val;
                        continue;
                    }
                    if (addressType == "country") {
                        this.direccion.pais = val;
                    }
                    if (addressType == "postal_code") {
                        this.direccion.codigoPostal = val;
                    } else {
                        this.direccion.codigoPostal = 0;
                    }
                    //document.getElementsByClassName(addressType)[0].value = val;
                    //console.log(this.place);
                }

            }
            this.direccion.latitud = this.place.geometry.location.lat();
            this.direccion.longitud = this.place.geometry.location.lng();
            this.direccion.direccionLinea1 = this.place.formatted_address;
            this.direccion.placeId = this.place.id;
            var lat = this.direccion.latitud.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            var lng = this.direccion.longitud.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true')
                .then((data) => {
                    //console.log(data.data);
                    var city = data.data.results[1];
                    this.direccion.ciudadPlaceId = city.place_id;
                    //console.log(this.direccion);
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
                });
        },
        isUserLoggedIn(sessionInfo) {
            if (sessionInfo.status === 200) {
                this.user = sessionInfo.data.principal.user;
                if (this.user.direccion != null) {
                    this.direccion = this.user.direccion;
                }
                this.frontEndDateFormat();
                console.log(this.user.birthday);

            }
            else {
                console.log(sessionInfo.status + "|" + sessionInfo.statusText);
                sweetAlert("Oops...", "Necesitas estar logueado para acceder a este contenido", "error");
            }
        },
        editUserInfo() {
            //MUY IMPORTANTE, EL FORMATO EN FRONT Y EN BACK DEBE SER EL MISMO
            this.backEndDateFormat();
            console.log(this.user.birthday);
            this.user.direccion = this.direccion;
            this.isUserCompleted();
            //console.log(this.user);
            var payload = jQuery.extend(true, {}, this.user);
            axios.put(this.url + this.user.id, payload)
                .then((response) => {

                    sweetAlert({
                            title: "Editado!",
                            text: "Usuario editado exitosamente.",
                            type: "success",
                        },
                        function () {
                            window.location.href = "/views/dueño/perfil.html";
                        }
                    );
                    this.frontEndDateFormat();
                    console.log(response);
                })
                .catch(error => {
                        console.log(error);

                    }
                );


        },
        isUserCompleted() {
            this.user.status = "INCOMPLETED";
            if (!this.user.email) {
                return;
            }
            if (!this.user.username) {
                return;
            }
            if (this.user.profileImageUrl == "/img/no-avatar.png") {
                return;
            }
            if (!this.user.fullName) {
                return;
            }
            if (!this.user.birthday) {
                return;
            }
            if (!this.user.gender) {
                return;
            }
            if (!this.user.birthday) {
                return;
            }
            if (!this.direccion) {
                return;
            }

            this.user.status = "COMPLETED";


        },
        frontEndDateFormat() {
            console.log(this.user.birthday);
            //MUY IMPORTANTE, EL FORMATO EN FRONT Y EN BACK DEBE SER EL MISMO
            this.user.birthday = fecha.format(fecha.parse(this.user.birthday, 'YYYY/MM/DD'), 'YYYY-MM-DD');
        },
        backEndDateFormat() {
            console.log(this.user.birthday);
            //MUY IMPORTANTE, EL FORMATO EN FRONT Y EN BACK DEBE SER EL MISMO
            this.user.birthday = fecha.format(fecha.parse(this.user.birthday, 'YYYY/MM/DD'), 'YYYY-MM-DD');
        }
    }
});

