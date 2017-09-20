let myPerrosRegistrar = Vue.component('my-perros-registrar', {
    template: `
<div>
    
    <!-- Titlebar -->
    <div id="titlebar">
        <div class="row">
            <div class="col-md-12">
                <h2>Nuevo Perro</h2>
            </div>
        </div>
    </div>

    <div class="row">
        <!-- Profile -->
        <div class="col-lg-12 col-md-12">
            <div class="dashboard-list-box margin-top-0">
                <h4 class="gray">Profile Details</h4>
                <div class="dashboard-list-box-static">
                    <form id="imageForm" enctype="multipart/form-data">
                        <!-- Avatar -->
                        <div class="edit-profile-photo">
                            <img :src="perro.fotoPerfil" alt="">
                            <div class="change-photo-btn">
                                <div class="photoUpload">
                                    <span><i class="fa fa-upload"></i> Subir Foto</span>
                                    <input type="file" id="imageFile" @change="filesChange($event.target.files)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                </div>
                            </div>
                        </div>
                    </form>
                    <!-- Details -->
                    <div class="my-profile">
                        <label>Nombre</label>
                        <input v-model="perro.nombre" value="" type="text">
                        <label>Fecha de Nacimiento</label>
                        <input v-model="perro.birthday" type="text" id="booking-date" data-lang="es" data-large-mode="true" data-format="d-m-Y" data-lock="to">
                        <label>Sexo</label>
                        <select v-model="perro.sexo">
                            <option disabled value="">Seleccionar Sexo</option>
                            <option>Macho</option>
                            <option>Hembra</option>
                        </select>
                        <label>Raza</label>
                        <select v-model="raza.id">
                            <option disabled value="">Seleccionar Raza</option>
                            <option v-for="raza in razas" :value="raza.id">
                                {{ raza.nombre }}
                            </option>
                        </select>
                        <label>Vacunas</label>
                        <div class="checkboxes in-row margin-bottom-20">
                            <div v-for="vacuna in vacunas">
                            <input :id="vacuna.id" type="checkbox" :value="vacuna.id" v-model="listaVacunas">
                            <label :for="vacuna.id">{{vacuna.nombre}}</label>
                            </div>
                        </div>

                        <label>Tamaño</label>
                        <select v-model="tamaño.id">
                            <option disabled value="">Seleccionar Tamaño</option>
                            <option v-for="tamaño in sizes" :value="tamaño.id">
                                {{tamaño.nombre}} - Entre {{tamaño.valorMinimo}} y {{tamaño.valorMaximo}} kg
                            </option>
                        </select>
                    </div>
                    <!--TODO on submit to validate the form-->
                    <button v-on:click='saveDog()' class="button margin-top-15">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    data: function () {
        return {
            user: {},
            perro: {
                birthday: '',
            },
            url: "/api/user/",
            formPost: true,
            uploadedFiles: [],
            uploadError: null,
            razas: [],
            vacunas: [],
            sizes: [],
            listaVacunas: [],
            raza: {},
            tamaño: {},
        }
    },
    mounted() {
        this.getUserInfo();
        this.bindDatePickerWithVue();
    },
    methods: {
        toggleLoader() {
            Pace.start;
        },
        upload(formData) {
            axios.post('/api/file/', formData)
                .then((response) => {
                    this.perro.fotoPerfil = response.data;
                })
                .catch(error => {
                        console.log("ERROR AXIOS");
                        console.log(error);
                    }
                );
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
        getUserInfo() {
            axios.get(this.url + "me")
                .then((sessionInfo) => {
                    this.isUserLoggedIn(sessionInfo);
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                    console.log("redirect");
                    document.location.href = "/";

                });
        },
        saveDog() {
            this.toggleLoader();
            this.perro.user = this.user;
            this.perro.listaVacunas = [];
            this.perro.tamaño = this.tamaño;
            this.perro.raza = this.raza;
            for (i = 0; i < this.listaVacunas.length; i++) {
                let vacuna = {};
                vacuna.id = this.listaVacunas[i];
                this.perro.listaVacunas.push(vacuna);
            }
            console.log(this.perro);
            if (this.perro.birthday === undefined) {
                this.perro.birthday = "10-10-2016";
            }
            axios.post(this.url + this.user.id + "/perros", this.perro)
                .then((response) => {
                    this.toggleLoader();
                    console.log(response);
                    swal({
                            title: "Guardado!",
                            text: "Nuevo perro creado exitosamente",
                            type: "success"
                        },
                        function () {
                            window.location.href = "/views/perros/perros.html";
                        });
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
                this.getRazas();
                this.getVacunas();
                this.getTamaños();
            }

            else {
                console.log(sessionInfo.status + "|" + sessionInfo.statusText);
                sweetAlert("Oops...", "Necesitas estar logueado para acceder a este contenido", "error");
            }
        },
        getRazas() {
            console.log("getRazas() ");

            this.toggleLoader();
            axios.get("/api/razas")
                .then((response) => {
                    this.razas = response.data;
                    this.toggleLoader();
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        getVacunas() {
            console.log("getVacunas()");
            this.toggleLoader();
            axios.get("/api/vacunas")
                .then((response) => {
                    this.vacunas = response.data;
                    this.toggleLoader();
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        getTamaños() {
            console.log("getTamaños()");
            // this.toggleLoader();
            axios.get("/api/tamaños")
                .then((response) => {
                    this.sizes = response.data;
                    this.toggleLoader();
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        bindDatePickerWithVue() {
            $('#booking-date').dateDropper();
            $('#booking-date').change(function () {
                var dateString = $('#booking-date').val(); //the getDate method
                myPerrosRegistrar.perro.birthday = dateString;
            });
        }

    }
});

