Vue.component('my-cuidador-edit', {
    //language=HTML
    template:
            `
        <div>
            <!-- Titlebar -->
            <div id="titlebar">
                <div class="row">
                    <div class="col-md-12">
                        <h2><b>Cuidador:</b> Mi Descripción</h2>
                        <!-- Breadcrumbs -->
                        <nav id="breadcrumbs">
                          
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
                            Recuerda que Pupi cobra una comisión del 25.33% del total de la tarifa que estableces en cada servicio, de los cuales <strong> MercadoPago </strong> retiene el 5.33%
                            <!-- Change Password -->
                            <div class="my-profile">

                                <label>Mi precio  </label>
                                <input v-model="precioFinal"  style=" text-align: right" id="precioNeto" type="number" required>

                                <label>Porcentaje Pupi  </label>
                                <input v-model="porcentaje" id="porcentaje"  style=" text-align: right" type="number" readonly>

                                <label>Mi Ganancia final</label>
                                <input v-model="precioNeto" id="precioFinal"  style=" text-align: right" value="" type="number" readonly>

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
                            <select required id='selector_cantidad' v-model="cuidador.cantidadMaxDePerros" >
                                <!--<option  value="">Seleccionar Cantidad</option>-->
                            </select>


                            <!-- Change Password -->
                            <div class="my-profile">
                                <label class="margin-top-0">Mi descripcion</label>
                                <textarea v-model="cuidador.descripcion"  rows="4" cols="50" maxlength="500"  placeholder="Descripcion" required>
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
                                <div id="listaServicios" class="checkboxes in-row margin-bottom-30">
                                    <ul v-for =" servicio in listaServicios" >
                                        <li>
                                            <input :id="servicio.nombre" type="checkbox" :checked="inicilializarServicios(servicio.nombre)" name="check">
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
                                <img  id="imagen1" alt="" src="/img/no-avatar.png" height="170" width="240">
                                <div class="change-photo-btn">
                                    <div class="photoUpload">
                                        <span><i class="fa fa-upload"></i> Subir Foto</span>
                                        <input type="file" id="imageFile1" @change="filesChange($event.target.files,0)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                    </div>
                                </div>
                            </div>


                                <div class="edit-profile-photo">
                                    <img  id="imagen2" alt="" src="/img/no-avatar.png" height="170" width="240" >
                                    <div class="change-photo-btn">
                                        <div class="photoUpload">
                                            <span><i class="fa fa-upload"></i> Subir Foto</span>
                                            <input type="file" id="imageFile2" @change="filesChange($event.target.files,1)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="edit-profile-photo">
                                    <img id="imagen3" alt="" src="/img/no-avatar.png" height="170" width="240">
                                    <div class="change-photo-btn">
                                        <div class="photoUpload">
                                            <span><i class="fa fa-upload"></i> Subir Foto</span>
                                            <input type="file" id="imageFile3" @change="filesChange($event.target.files,2)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="edit-profile-photo">
                                    <img  id="imagen4" alt="" src="/img/no-avatar.png" height="170" width="240">
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
                <input type="submit" value="Guardar" name="editCuidador" style=" height: 60px; width: 150px; position: relative;" class="button margin-top-20 pull-right"/>
 
            </form>
</div>
    `,
    data: function () {
        return {
            user: {},
            url: "/api/user/",
            //  formPost: true,
            listaServicios: [],
           precioNeto: '',
            porcentaje: '',
            //   precioFinal:'',
            cuidador:
                {
                    descripcion: '',
                    cantidadMaxDePerros: '',
                    listaServicios: [],
                    precioPorNoche:0,
                },
            tamaño: '',
            cantidadMaxDePerros: '',
            descripcion: ''

        }

    },

    computed: {
        precioFinal: {
            //
            //     return( this.precioNeto * 1.20 ).toFixed(2);
            //
            // }
            get: function () {

                if(this.cuidador.precioPorNoche > 0){
                return (this.cuidador.precioPorNoche);}

            },
            set: function (newVal) {
                this.cuidador.precioPorNoche = newVal;
                this.precioNeto  = (this.cuidador.precioPorNoche - (this.cuidador.precioPorNoche * 0.2533));
            }
        },

    },
    watch:
        {
            precioFinal: function () {
                this.precioNeto  = (this.cuidador.precioPorNoche - (this.cuidador.precioPorNoche * 0.20));
            }

        },
    mounted() {

        this.BuscarServicios();
        this.porcentaje = 25.33;
        this.selector_cantidad();
        this.getUserInfo();


    },
    methods: {


        BuscarServicios() {

            //  axios.get("/api/cuidadores/searchServicios/")
            axios.get("/api/servicios/")
                .then((data) => {
                    this.listaServicios = data.data;

                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, no se pudo cargar servicios", "error");
                });


        },
        selector_cantidad() {
            var x = document.getElementById("selector_cantidad");
            var select = '';
            var option = null;
            for (i = 0; i <= 20; i++) {

                if (i === 0) {
                    option = document.createElement("option");
                    option.text = "Seleccionar cantidad";
                    option.value = "";
                    x.add(option, x[i]);
                }
                else {

                    option = document.createElement("option");
                    option.text = i;
                    option.value = i;
                    x.add(option, x[i]);
                }

                //   select += '<option val=' + i + '>' + i + '</option>';
            }

        },

        filesChange(fileList, position) {
            // handle file changes
            if (fileList[0].size <= 10285760) //10 mb 10485760
            {
                const formData = new FormData();

                if (!fileList.length) return;
                // append the files to FormData
                Array
                    .from(Array(fileList.length).keys())
                    .map(x => {
                        formData.append('file', fileList[x]);
                    });

                // save it
                this.upload(formData, position);
            }
            else {

                sweetAlert("Oops...", "Error, Se debe cargar una imagen hasta a 10 mb ", "error");
            }
        },
        upload(formData, position) {
            axios.post('/api/file/', formData)
                .then((response) => {

                    var url = response.data;
                    this.cuidador.listaImagenes[position].url = url;

                    this.inicializarImagenes();
                })
                .catch(error => {
                        sweetAlert("Oops...", "Error, Se debe cargar una imagen hasta a 1 mb ", "error");
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
                    //sweetAlert("Oops...", "Error, necesitas estar logueado", "error");
                    document.location.href = "/";
                });
        },

        isUserCuidador(sessionInfo) {
            //  var urlCiudador = "/api/cuidadores" ;
            //  + '?id='
            // axios.get(urlCiudador+ "/" + sessionInfo.data.principal.user.id)
            var url = "/api/cuidadores/user/";
            let consulta = url + '?id=' + sessionInfo.data.principal.user.id;

            axios.get(consulta)
                .then((data) => {

                    this.cuidador = data.data;
                   this.precioNeto = (this.cuidador.precioPorNoche - (this.cuidador.precioPorNoche * 0.2533)).toFixed(2);


                    // this.formPost = false;
                    if (this.cuidador.tamaño !== null) {

                        this.tamaño = this.cuidador.tamaño.id;
                    }

                    this.cantidadMaxDePerros = this.cuidador.cantidadMaxDePerros;
                    this.descripcion = this.cuidador.descripcion;
                    this.inicializarImagenes();


                    // this.formPost = false;

                })
                .catch(error => {
                    //  this.formPost = true;
                    // document.getElementById("spinner").toggle();
                    // me redirije a lo de jorge
                    document.location.href = "/views/cuidadores/alta-cuidador.html";
                });
        },
        editCuidador() {
            if (this.validarCantidadImagenes()) {
                sweetAlert("", "Debe cargar 4 imagenes para guardar su perfil ", "warning");
                return;
            }

            var serv = null;
            var listaAux = [];
            this.listaServicios.forEach(function (item) {
                serv = {id: item.id, nombre: item.nombre};
                if (document.getElementById(serv.nombre).checked === true)
                    listaAux.push(serv);

            });
            this.cuidador.listaServicios = listaAux;
            this.cuidador.precioPorNoche = this.precioFinal;
            var tam = {id: this.tamaño};
            this.cuidador.tamaño = tam;
            this.isCuidadorCompleted();

            var urlCiudador = "/api/cuidadores/";
            var payload = jQuery.extend(true, {}, this.cuidador);
            console.log(this.cuidador);
            axios.put(urlCiudador + this.cuidador.id, payload)
                .then((response) => {

                    sweetAlert("Editado!", "Descripción editada exitosamente.", "success");
                    console.log(response);
                    //  window.location = "http://localhost:8080/views/cuidadores/cuidadores-perfil.html?id="+ this.cuidador.id ;

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, No se pudo guardar mi descripcion", "error");

                    }
                );
        },
        isCuidadorCompleted() {
            this.cuidador.estado = "approved";
            if (!this.cuidador.user.status || this.cuidador.user.status == "INCOMPLETED") {
                return;
            }
            if (!this.cuidador.cantidadMaxDePerros || this.cuidador.cantidadMaxDePerros == 0) {
                return;
            }
            if (!this.cuidador.descripcion) {
                return;
            }
            if (!this.cuidador.precioPorNoche) {
                return;
            }
            if (!this.cuidador.tamaño) {
                return;
            }
            if (!this.cuidador.listaImagenes || this.cuidador.listaImagenes.length != 4) {
                return;
            }
            this.cuidador.estado = "completed";
        },
        inicializarImagenes() {
            if (this.cuidador.listaImagenes.length > 0) {
                var i = 1;
                var x = "imagen";
                this.cuidador.listaImagenes.forEach(function (item) {
                    x = ( x + i).trim();
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

                }
            }

        },
        validarCantidadImagenes() {
            var flag = false;
            this.cuidador.listaImagenes.forEach(function (item) {

                if (item.url === "")
                    flag = true;

            });

            return flag;

        },
        inicilializarServicios(nombre) {
            var flag = false;

            this.cuidador.listaServicios.forEach(function (item) {

                if (item.nombre === nombre)
                //document.getElementById(item.nombre).checked = true;
                    flag = true;

            });

            return flag;

        }
    }
});

