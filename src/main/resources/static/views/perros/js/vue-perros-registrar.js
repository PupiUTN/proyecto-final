let myPerrosRegistrar = Vue.component('my-perros-registrar', {
    template: `
<div>
    
    <!-- Titlebar -->
    <div id="titlebar">
        <div class="row">
            <div class="col-md-12">
                <h2>{{mensaje}}</h2>
            </div>
        </div>
    </div>
    <div class="row">
        <!-- Profile -->
        <div class="col-lg-12 col-md-12">
            <!--<form class="dashboard-list-box margin-top-0">-->
                <!--<h4 class="gray">Detalles del perro</h4>-->
               
                <div class="dashboard-list-box-static">
                    <form  id="editPerro" method="post" class="editPerro" v-on:submit.prevent='editProfilePerro()' enctype="multipart/form-data" >
                        <!-- Avatar -->
                        <div class="row">
                            <div class="edit-profile-photo col-xs-3 padding-left-30">
                                <img id="imagen" :src="perro.fotoPerfil" alt="">
                                <div class="change-photo-btn">
                                    <div class="photoUpload">
                                        <span><i class="fa fa-upload"></i> Subir Foto</span>
                                        <input type="file" id="imageFile" @change="filesChange($event.target.files)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                    <!-- Details -->                 
                    <div class="my-profile">
                            <label>Nombre</label>
                            <input v-model="perro.nombre" value="" type="text" required>
                            <label class="">Fecha de Nacimiento</label>
                            <input id="NacimientoPerro" type="date" v-model="perro.birthday" required>
                            <label>Sexo</label>
                            <select v-model="perro.sexo" required>
                                <option disabled value="">Seleccionar Sexo</option>
                                <option>Macho</option>
                                <option>Hembra</option>
                            </select>
                            <label>Raza</label>
                            <select id="mySelectRaza" v-model="raza.id" required>
                                <option disabled value="">Seleccionar Raza</option>
                                <option  v-for="raza in razas" :value="raza.id">
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
                            <select v-model="tamaño.id" required>
                                <option disabled value="">Seleccionar Tamaño</option>
                                <option v-for="tamaño in sizes" :value="tamaño.id">
                                    {{tamaño.nombre}} - Entre {{tamaño.valorMinimo}} y {{tamaño.valorMaximo}} kg
                                </option>
                            </select>
                    </div>
                    <!--TODO on submit to validate the form-->
                    <button type="submit" value="Guardar" name="editProfilePerro" class="button margin-top-15">Guardar</button>
                 </form>
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
                fotoPerfil: "/img/no-perro.png",
                raza: {
                    id:'',
                },
                tamaño:{
                    id:'',
                },
                listaVacunas:[],
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
            idPerro:'',
            mensaje: '',
        }
    },
    mounted() {
        this.idPerro= this.getParameterByName('id');
        this.getUserInfo();
        this.SetFechaMaximaNacimiento();

    },
    methods: {

        SetFechaMaximaNacimiento()
        {
            var dtToday = new Date();

            var month = dtToday.getMonth() + 1;
            var day = dtToday.getDate();
            var year = dtToday.getFullYear();

            if(month < 10)
                month = '0' + month.toString();
            if(day < 10)
                day = '0' + day.toString();

            var maxDate = year + '-' + month + '-' + day;

            var input = document.getElementById("NacimientoPerro");
            input.setAttribute("max", maxDate);

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
                    if(this.idPerro !== null && this.idPerro >0){

                        this.getPerro();
                        this.mensaje = 'Editar Perro';
                    }
                    else {
                        this.mensaje = 'Nuevo Perro';

                    }
                    this.getRazas();
                    this.getTamaños();
                    this.getVacunas();
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                    console.log("redirect");
                    document.location.href = "/";

                });
        },
        getPerro()
        {    let consulta =this.url + this.user.id + "/perros/" +this.idPerro ;

            axios.get(consulta)
                .then((response) => {
                    this.perro = response.data;
                    this.tamaño.id = this.perro.tamaño.id;
                    this.raza.id= this.perro.raza.id ;
                   // document.getElementById("mySelectRaza").selectedIndex = this.perro.raza.id;
                    for (i = 0; i < this.perro.listaVacunas.length; i++) {
                         let vac = {};
                        vac = this.perro.listaVacunas[i];
                        this.listaVacunas.push(vac.id);
                    }
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error  ", "error");

                    }
                );

        },
        editProfilePerro() {

            this.perro.user = this.user;
            this.perro.listaVacunas = [];
            this.perro.tamaño = this.tamaño;
            this.perro.raza = this.razas[this.raza.id-1];
            this.perro.tamaño = this.sizes[this.tamaño.id-1];
            for (i = 0; i < this.listaVacunas.length; i++) {
                let vacuna = {};
                vacuna.id = this.listaVacunas[i];
                this.perro.listaVacunas.push(vacuna);
            }
            //console.log(this.perro.birthday);
            if (!this.perro.birthday || this.perro.birthday == "") {
                this.perro.birthday = "2016-01-01";
            }
            this.perro.status = 'active';
            //this.perro.user.birthday=null;
            var payload = jQuery.extend(true, {}, this.perro);
            let consulta =this.url +"createPerro/" ;

            axios.post(consulta, payload)
                .then((response) => {

                    console.log(response);
                    swal({
                            title: "Guardado!",
                            text: "Perro guardado exitosamente",
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

            }

            else {
                console.log(sessionInfo.status + "|" + sessionInfo.statusText);
                sweetAlert("Oops...", "Necesitas estar logueado para acceder a este contenido", "error");
            }
        },
        getRazas() {
            console.log("getRazas() ");


            axios.get("/api/razas")
                .then((response) => {
                    this.razas = response.data;

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        getVacunas() {
            console.log("getVacunas()");

            axios.get("/api/vacunas")
                .then((response) => {
                    this.vacunas = response.data;

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        getTamaños() {
            console.log("getTamaños()");
            //
            axios.get("/api/tamaños")
                .then((response) => {
                    this.sizes = response.data;

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        inicializarVacuna(index)
        {

             var x = this.listaVacunas.includes(index);

                return x;
        }

    }
});

