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
                                    <span><i class="fa fa-upload"></i> Subir Foto</span>
                                    <input type="file" id="imageFile" @change="filesChange($event.target.files)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div class="my-profile col-md-8">
                            <label class="margin-top-0">Nombre y Apellido</label>
                            <input v-model="user.fullName" value="" type="text" required>
                            <label class="margin-top-0">Fecha de Nacimiento</label>
                            <input type="text" id="booking-date" data-lang="es" data-large-mode="true" data-format="d-m-Y" data-lock="to" required>
                            <label class="margin-top-0">Género</label>
                            <select v-model="user.gender" required>
                                <option disabled selected value="">Seleccionar Género</option>
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
        <div class="col-lg-6 col-xs-12">
        <div class="dashboard-list-box margin-top-0">
            <h4 class="gray">Información de Contacto</h4>
            <div class="dashboard-list-box-static">
                <div class="my-profile">
                    <label class="margin-top-0">Teléfono</label>
                    <input v-model="user.phone" value="" type="number" required>
                    <label class="margin-top-0">Email</label>
                    <input v-model="user.email" value="" type="email" required>
                </div>
            </div>
        </div>
    </div>
        <div class="col-lg-6 col-xs-12">
        <div class="dashboard-list-box margin-top-0">
            <h4 class="gray">Dirección</h4>
            <div class="dashboard-list-box-static">
                <div class="my-profile">
                    <input id="autocomplete" type="text" placeholder="Ingrese su dirección">
                    <label class="margin-top-0">Número</label>
                    <input type="number" id="street_number" :disabled="disabled" >
                    <label class="margin-top-0">Calle</label>
                    <input type="text" id="route" :disabled="disabled" >
                    <label class="margin-top-0">Ciudad</label>
                    <input type="text" id="locality" :disabled="disabled" >
                    <label class="margin-top-0">Provincia</label>
                    <input type="text" id="administrative_area_level_1" :disabled="disabled" >
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
            direccion: {},
            formPost: true,
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            disabled: true,
            place:null,
            componentForm:{
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                //country: 'long_name',
            },
            autocomplete:null,
        }

    }
    ,
    mounted() {
        this.autocompleteAddress();
        this.getUserInfo();
        this.preventEnter();
    },
    methods: {
        preventEnter(){
            $('#editCuidador').on('keyup keypress', function(e) {
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
        completar(){
            this.place = this.autocomplete.getPlace();
            this.disabled=false;
            for (var i = 0; i < this.place.address_components.length; i++) {
                var addressType = this.place.address_components[i].types[0];
                console.log(addressType);
                if (this.componentForm[addressType]) {
                    console.log(this.componentForm[addressType]);
                    var val = this.place.address_components[i][this.componentForm[addressType]];
                    console.log(document.getElementById(addressType));
                    document.getElementById(addressType).value = val;
                    console.log(val);
                }
            }
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
                    //sweetAlert("Oops...", "Error, ver consola", "error");
                    window.location="/";
                });
        },
        editUserInfo() {
            this.user.direccion = this.direccion;
            this.validarBirthday();
            this.generarDireccion();
            console.log(this.user);
            var payload = jQuery.extend(true, {}, this.user);
            // axios.put(this.url + this.user.id, payload)
            //     .then((response) => {
            //
            //         sweetAlert("Editado!", "Usuario editado exitosamente.", "success");
            //         console.log(response);
            //     })
            //     .catch(error => {
            //             console.log(error);
            //             sweetAlert("Oops...", "Error, ver consola", "error");
            //
            //         }
            //     );
        },
        generarDireccion(){
            console.log(this.place);
            if(document.getElementById("street_number").value!=null){
                this.direccion.numero=document.getElementById("street_number").value;
            }else{
                return;
            };
            if(document.getElementById("route").value!=null){
                this.direccion.calle=document.getElementById("route").value;
            }else{
                return;
            };
            if(document.getElementById("locality").value!=null){
                this.direccion.ciudad=document.getElementById("locality").value;
            }else{
                return;
            };
            if(document.getElementById("administrative_area_level_1").value!=null){
                this.direccion.provincia=document.getElementById("administrative_area_level_1").value;
            }else{
                return;
            };
            this.direccion.latitud=this.place.geometry.location.lat();
            this.direccion.longitud=this.place.geamotry.location.lng();
        },
        validarBirthday(){
            var birthday=document.getElementById('booking-date').value;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd = '0'+dd
            }
            if(mm<10) {
                mm = '0'+mm
            }

            today = dd + '-' + mm + '-' + yyyy;
            console.log(today);
            if(birthday==today){
                this.user.birthday=null;
            }else{
                this.user.birthday=birthday;
            }
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
                this.setDate();
                console.log(this.user);
                $('#booking-date').dateDropper();

            }
            else {
                console.log(sessionInfo.status + "|" + sessionInfo.statusText);
                sweetAlert("Oops...", "Necesitas estar logueado para acceder a este contenido", "error");
            }
        },
        setDate() {
                if(this.user.birthday){
                    console.log(this.user.birthday);
                    var initial =this.user.birthday.split("-");
                    var date=[ initial[1], initial[0], initial[2] ].join('-');
                    console.log(date);
                    document.getElementById('booking-date').setAttribute('data-default-date',date);
                    document.getElementById('booking-date').setAttribute('data-lock','');

                }

        }

    }
});

