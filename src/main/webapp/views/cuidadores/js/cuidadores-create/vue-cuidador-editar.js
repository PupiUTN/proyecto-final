Vue.component('my-cuidador-edit', {
    template:
        `
<div>
                <!-- Titlebar -->
             <div id="titlebar">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Mi Descripción</h2>
                        <!-- Breadcrumbs -->
                        <nav id="breadcrumbs">
                            <ul>
                                <li><a href="#">General</a></li>
                                <li><a href="#">Menu</a></li>
                                <li>Mi Descripción</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <form   method="post" class="editCuidador" v-on:submit.prevent='editCuidador()'>
            <!-- Titlebar -->


            <!--<div class="row">-->


                <div class="col-lg-6 col-md-12" >
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i>	 Precios </h4>
                        <div class="dashboard-list-box-static"      style="height: 515px; ">
                            Recuerda que Pupi cobra una comisión del 20% del total de la tarifa que estableces en cada servicio.
                            <!-- Change Password -->
                            <div class="my-profile">

                                <label>Mi precio  </label>
                                <input v-model="precioNeto"  style=" text-align: right" id="precioNeto" type="number" required>

                                <label>Porcentaje Pupi  </label>
                                <input v-model="porcentaje" id="porcentaje"  style=" text-align: right" type="number" readonly>

                                <label>Mi precio Final </label>
                                <input v-model="precioFinal" id="precioFinal"  style=" text-align: right" value="" type="number" readonly>

                            </div>

                        </div>
                    </div>
                </div>



                <div class="col-lg-6 col-md-12">
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i> Descripcion </h4>
                        <div class="dashboard-list-box-static">

                            <label for="selector_tamaño">Tamaño maximo permitido de perro</label>
                            <select required id='selector_tamaño' v-model="tamaño" >
                                <option  value="">Seleccionar Cantidad</option>
                                <option  value="1"> Miniatura-0 a 5 kg</option>
                                <option  value="2">Pequeño-5 a 10 kg</option>
                                <option  value="3">Mediano-10 a 25 kg</option>
                                <option value="4">Grande-25 a 45 kg</option>
                                <option value="5">Gigante-45 a 100 kg</option>
                            </select>

                            <label for="selector_cantidad">Cantidad máxima de perros</label>
                            <select required id='selector_cantidad' v-model="cantidadMaxDePerros" >
                                <!--<option  value="">Seleccionar Cantidad</option>-->
                            </select>


                            <!-- Change Password -->
                            <div class="my-profile">
                                <label class="margin-top-0">Mi descripcion</label>
                                <textarea v-model="descripcion" rows="4" cols="50" maxlength="1000" required>
                               </textarea>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-12" style=" top: 50px;">
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i> Servicios que ofreces </h4>
                        <div class="dashboard-list-box-static">

                            <!-- Change Password -->
                            <div class="my-profile">
                                <div class="checkboxes in-row margin-bottom-30">
                                    <ul v-for =" servicio in listaServicios" >
                                        <li>
                                            <input :id="servicio.nombre" type="checkbox" name="check">
                                            <label :for="servicio.nombre">{{servicio.nombre}}</label>
                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <!-- Profile -->
                <div class="col-lg-6 col-md-12" style= "top: 50px; height: 1000px;" >
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i> Mis Fotos  </h4>
                        <div class="dashboard-list-box-static">
                         <!--   <form id="imageForm" enctype="multipart/form-data">-->
                            <!-- Avatar -->
                            <div class="edit-profile-photo">
                                <img  id="imagen1" alt="">
                                <div class="change-photo-btn">
                                    <div class="photoUpload">
                                        <span><i class="fa fa-upload"></i> Subir Foto</span>
                                        <input type="file" id="imageFile1" @change="filesChange($event.target.files,0)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                    </div>
                                </div>
                            </div>


                                <div class="edit-profile-photo">
                                    <img  id="imagen2" alt="">
                                    <div class="change-photo-btn">
                                        <div class="photoUpload">
                                            <span><i class="fa fa-upload"></i> Subir Foto</span>
                                            <input type="file" id="imageFile2" @change="filesChange($event.target.files,1)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="edit-profile-photo">
                                    <img id="imagen3" alt="">
                                    <div class="change-photo-btn">
                                        <div class="photoUpload">
                                            <span><i class="fa fa-upload"></i> Subir Foto</span>
                                            <input type="file" id="imageFile3" @change="filesChange($event.target.files,2)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="edit-profile-photo">
                                    <img  id="imagen4" alt="">
                                    <div class="change-photo-btn">
                                        <div class="photoUpload">
                                            <span><i class="fa fa-upload"></i> Subir Foto</span>
                                            <input type="file" id="imageFile4" @change="filesChange($event.target.files,3)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                        </div>
                                    </div>
                                </div>

                            <!--</form>-->



                        </div>
                    </div>

                </div>
                <input type="submit" value="Guardar" name="editCuidador" style=" height: 60px; width: 150px; position: relative;" class="button margin-top-15"/>

            </form>
</div>
    `,
    data: function () {
        return {
            user: {},
            url: "/api/user/",
            formPost: true,
            listaServicios: [],
            precioNeto: '',
            porcentaje:'',
            precioFinal:'',
            cuidador:'',
            tamaño:'',
            cantidadMaxDePerros:'',
            descripcion:''
        }

    },

    watch: {
        precioNeto: function(val, oldVal){

            this.precioFinal = (val * 1.20 ).toFixed(2);

        },
        formPost :function(val, oldVal){


            if (this.formPost === false )
            {
                var x ;
                this.cuidador.listaServicios.forEach(function(item) {
                    document.getElementById(item.nombre).checked = true;

                });


            }

        },

    },
    mounted() {

        this.BuscarServicios();
        this.porcentaje = 20;
        this.selector_cantidad();


    },
    methods: {
        toggleLoader() {
            $('#spinner').toggle();
        },
        isAuthenticatedMethod(isAuthenticated) {
            // TRIGGER MOUNTED METHOD
            this.isAuthenticated = isAuthenticated;
            if (!this.isAuthenticated) {
                var childMylogin = this.$refs.mylogin;
                childMylogin.openLoginPopUp();
            } else {

                this.getUserInfo();

            }
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
            select += '<option val='  + ' > Seleccione Cantidad </option>';
            for (i=1;i<=20;i++){

                select += '<option val=' + i + '>' + i + '</option>';
            }


            $('#selector_cantidad').html(select);

        },

        filesChange(fileList,position) {
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
            this.upload(formData,position);
        },
        upload(formData,position) {
            axios.post('/api/file/', formData)
                .then((response) => {

                    var url = response.data;
                    this.cuidador.listaImagenes[position].url = url;

                    this.inicializarImagenes();
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
                    this.isUserCuidador(sessionInfo);
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, necesitas estar logueado", "error");
                    window.location.replace("http://localhost:8080/views/index/index.html");
                });
        },

        isUserCuidador(sessionInfo) {
            //  var urlCiudador = "/api/cuidadores" ;
            //  + '?id='
            // axios.get(urlCiudador+ "/" + sessionInfo.data.principal.user.id)
            var  url= "/api/cuidadores/SearchCuidadorxUser/";
            let consulta= url + '?id=' + sessionInfo.data.principal.user.id;

            axios.get(consulta)
                .then((data) => {

                    this.cuidador = data.data;
                    this.precioNeto = (this.cuidador.precioPorNoche /1.20).toFixed(2);
                    this.formPost = false;
                    if(this.cuidador.tamaño !== null){

                        this.tamaño = this.cuidador.tamaño.id;
                    }

                    this.cantidadMaxDePerros = this.cuidador.cantidadMaxDePerros;
                    this.descripcion = this.cuidador.descripcion
                    this.inicializarImagenes();
                    $('#spinner').toggle();

                })
                .catch(error => {
                    this.formPost = true;
                    $('#spinner').toggle();
                    // me redirije a lo de jorge
                });
        },
        editCuidador() {
            if (this.validarCantidadImagenes())
            {
                sweetAlert("Oops...", "Error, Se deben cargar 4 imagenes ", "error");
                return ;
            }

            var serv = null;
            var listaAux = [];
            this.listaServicios.forEach(function(item) {
                serv = {id: item.id, nombre: item.nombre};
                if( document.getElementById(serv.nombre).checked === true )
                    listaAux.push(serv);

            });
            this.cuidador.listaServicios = listaAux;
            this.cuidador.precioPorNoche = this.precioFinal;
            this.cuidador.cantidadMaxDePerros =   this.cantidadMaxDePerros;
            this.cuidador.descripcion =  this.descripcion;
            var tam = { id: this.tamaño};
            this.cuidador.tamaño= tam;


            var urlCiudador = "/api/cuidadores/";
            var payload = jQuery.extend(true, {}, this.cuidador);
            $('#spinner').toggle();
            axios.put(urlCiudador + this.cuidador.id, payload)
                .then((response) => {

                    sweetAlert("Editado!", "Usuario editado exitosamente.", "success");
                    console.log(response);
                    //  window.location = "http://localhost:8080/views/cuidadores/cuidadores-perfil.html?id="+ this.cuidador.id ;
                    $('#spinner').toggle();
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, No se pudo guardar mi descripcion", "error");

                    }
                );
        },
        inicializarImagenes()
        {    if(this.cuidador.listaImagenes.length > 0)
        {
            var i = 1;
            var x = "imagen";
            this.cuidador.listaImagenes.forEach(function(item) {
                x = ( x +i).trim();
                document.getElementById(x).src = item.url;
                i++;
                x = "imagen";
            });

        }
        else {

            var img = "";
            for (i = 0; i < 4; i++) {
                img = {id: 0, url: ""};
                this.cuidador.listaImagenes.push(img);
                document.getElementById("imagen1").src = "";
                document.getElementById("imagen2").src = "";
                document.getElementById("imagen3").src = "";
                document.getElementById("imagen4").src = "";
            }
        }

        },
        validarCantidadImagenes()
        {
            this.cuidador.listaImagenes.forEach(function(item) {

                if( item.url === "")
                    return false;

            });

            return true;


        }
    }
});

