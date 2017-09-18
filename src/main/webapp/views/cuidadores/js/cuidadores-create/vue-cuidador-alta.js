Vue.component('become-cuidador', {
    template:
           `
<div>
                <!-- Titlebar -->
             <div id="titlebar">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Solicitud de Cuidador</h2>
                        
                   
                    </div>
                </div>
            </div>

             <!-- Titlebar -->


            <!--<div class="row">-->

                <div class="row">
                <div class="col-md-12" >
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i> Legal </h4>
                        <div class="dashboard-list-box-static"      style="height: auto ">
                        
                        <ul>
                            <li><i class="fa fa-paw"></i>
                            Recuerda que PUPI solo aprueba a aquellas personas que tienen su perfil completo. Por favor, verifica
                            que tus datos estén cargados y sean correctos 
                            <a href="/views/dueño/perfil.html"><span style="color:blue"> aquí</span></a>.
                            </li>
                            <li><i class="fa fa-paw"></i>
                            Agrega una descripción
                            sobre tí para que te conozcamos más. Luego será usada para que los demás puedan conocerte mejor.
                            Recomendamos que incluyas tu experiencia con perros, tu disponibilidad para ellos y que nos cuentes
                            todo ese amor que le tienes!
                            </li>
                            <li><i class="fa fa-paw"></i>
                            Además, PUPI requiere el DNI o cédula y foto (de ambos lados) para validar de que eres una persona de confianza.
                            Queremos asegurarnos de que nuestros perros sean cuidados por personas que los aman. 
                            </li>
                            <li><i class="fa fa-paw"></i>
                            PUPI puede aceptar o rechazar tu solicitud. En ambos casos, te llegará un mail explicando más acerca 
                            de la decisión.
                            </li>
                            </ul>
                            
                            
                            <br/>
                            

                        </div>
                    </div>
                </div>
                </div>
                <div class="row">
                  <form id="imageForm" enctype="multipart/form-data">
                <div class="col-lg-6 col-md-12 margin-top-20">
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i> Descripcion </h4>
                        <div class="dashboard-list-box-static" style="height:400px">
                            <div class="descripcion">
                                <label class="margin-top-0">Por favor, realiza una descripción sobre tí. Recuerda
                         que debe ser lo más clara posible, así PUPI y otros usuarios puedan saber más acerca de tí.</label>
                                <textarea v-model="descripcion"  rows="8" cols="50" maxlength="1000"  placeholder="Descripcion" required>
                               </textarea>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Profile -->
                 
                <div class="col-lg-6 col-md-12 margin-top-20" >
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i> DNI o Cédula  </h4>
                        <div class="dashboard-list-box-static" style="height: 400px">
                       
                        <div class="col-lg-6 col-md-12">
                            <label class="margin-top-0">Anverso</label>
                 
                            <div class="edit-profile-photo">
                                <img :src="dniAnverso" alt="">
                                <div class="change-photo-btn">
                                    <div class="photoUpload">
                                        <span><i class="fa fa-upload"></i> Subir Foto</span>
                                        <input type="file" id="imageFile" @change="filesChange($event.target.files,0)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                               
                               
                               
                        <div class="col-lg-6 col-md-12">
                            <label class="margin-top-0">Reverso</label>
                            
                            <div class="edit-profile-photo">
                                <img :src="dniReverso" alt="">
                                <div class="change-photo-btn">
                                    <div class="photoUpload">
                                        <span><i class="fa fa-upload"></i> Subir Foto</span>
                                        <input type="file" id="imageFile" @change="filesChange($event.target.files, 1)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                         
                         <label>Número</label>
                           <input v-model="user.phone" value="" type="number">
                          



                        </div>
                    </div>
                </div>
                <input type="submit" value="Enviar" name="editCuidador" style=" height: 60px; width: 150px; position: relative;" class="button margin-top-20"/>

            </form>
            </div>
              
</div>
    `,
    data: function () {
        return {
            user: {},
            url: "/api/user/",
            dniAnverso:"/assets/images/nodni.png",
            dniReverso:"/assets/images/nodni.png",
            descripcion:"",
            cuidador:{},

        }

    },
    mounted() {

       // this.BuscarServicios();
       // this.porcentaje = 20;
       // this.selector_cantidad();
       // this.getUserInfo();



    },
    methods: {
        toggleLoader() {
            // $('#spinner').toggle();
            document.getElementById("spinner").toggle();
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
                    console.log(url);
                    if(position==0){
                        this.dniAnverso = url;

                    }else{
                        this.dniReverso = url;
                    }

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
                    //sweetAlert("Oops...", "Error, necesitas estar logueado", "error");
                    // document.location.href="/";
                });
        },

        isUserCuidador(sessionInfo) {
            //  var urlCiudador = "/api/cuidadores" ;
            //  + '?id='
            // axios.get(urlCiudador+ "/" + sessionInfo.data.principal.user.id)
            var  url= "/api/cuidadores/user/";
            let consulta= url + '?id=' + sessionInfo.data.principal.user.id;

            axios.get(consulta)
                .then((data) => {

                    this.cuidador = data.data;
                    this.precioNeto = (this.cuidador.precioPorNoche /1.20).toFixed(2);


                    // this.formPost = false;
                    if(this.cuidador.tamaño !== null){

                        this.tamaño = this.cuidador.tamaño.id;
                    }

                    this.cantidadMaxDePerros = this.cuidador.cantidadMaxDePerros;
                    this.descripcion = this.cuidador.descripcion;
                    this.inicializarImagenes();

                    $('#spinner').toggle();
                    // this.formPost = false;

                })
                .catch(error => {
                    //  this.formPost = true;
                    // document.getElementById("spinner").toggle();
                    // me redirije a lo de jorge
                    document.location.href="/views/cuidadores/alta-cuidador.html";
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
            var tam = { id: this.tamaño};
            this.cuidador.tamaño= tam;


            var urlCiudador = "/api/cuidadores/";
            var payload = jQuery.extend(true, {}, this.cuidador);
            $('#spinner').toggle();
            axios.put(urlCiudador + this.cuidador.id, payload)
                .then((response) => {
                    $('#spinner').toggle();
                    sweetAlert("Editado!", "despcripción editada exitosamente.", "success");
                    console.log(response);
                    //  window.location = "http://localhost:8080/views/cuidadores/cuidadores-perfil.html?id="+ this.cuidador.id ;

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

            }
        }

        },
        validarCantidadImagenes()
        {
            var flag = false;
            this.cuidador.listaImagenes.forEach(function (item) {

                if (item.url === "")
                    flag = true;

            });

            return flag;

        },

    }
});

