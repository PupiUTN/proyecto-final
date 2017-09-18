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

                <div class="row">
                <div class="col-md-12" >
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i> Legal </h4>
                        <div class="dashboard-list-box-static"  >
                        
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
                <div class="row ">
                  <form id="altaCuidadorForm" v-on:submit.prevent='enviarAltaCuidador()' enctype="multipart/form-data">
                <div class="col-lg-6 col-md-12 margin-top-20 ">
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i> Descripción </h4>
                    </div>
                        <div class="dashboard-list-box-static" >
                            
                                <label class="margin-top-0">Por favor, realiza una descripción sobre tí. Recuerda
                         que debe ser lo más clara posible, así PUPI y otros usuarios puedan saber más acerca de tí.</label>
                                <textarea v-model="cuidador.descripcion"  rows="6" cols="50" maxlength="1000"  placeholder="Descripcion"
                                style="height: " required>
                               </textarea>
                            

                        </div>
                    
                </div>

                <!-- Profile -->
                 
                <div class="col-lg-6 col-md-12 margin-top-20 " >
                    <div class="dashboard-list-box margin-top-0">
                        <h4 class="gray"> 	<i class="fa fa-paw"></i> DNI o Cédula  </h4>
                        <div class="dashboard-list-box-static" >
                       
                        <div class="col-lg-6 col-md-12">
                            <label class="margin-top-0">Anverso</label>
                 
                            <div class="edit-profile-photo">
                                <img :src="dniAnverso.url" alt="">
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
                                <img :src="dniReverso.url" alt="">
                                <div class="change-photo-btn">
                                    <div class="photoUpload">
                                        <span><i class="fa fa-upload"></i> Subir Foto</span>
                                        <input type="file" id="imageFile" @change="filesChange($event.target.files, 1)" class="upload" accept="image/x-png,image/jpg,image/jpeg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                         
                         <label>Número</label>
                           <input v-model="cuidador.dni" value="" type="number" max="99999999" required>
                          



                        </div>
                    </div>
                </div>
                <div class="col-s-3" style="margin-left: 2%;">
                <input type="submit" value="Enviar" name="enviarAltaCuidador" style=" height: 60px; width: 150px; position: relative;" class="button"/>
                </div>    
            </form>
            </div>
              
</div>
    `,
    data: function () {
        return {
            url: "/api/user/",
            dniAnverso:{
                url:"/assets/images/nodni.png"
            },
            dniReverso:{
                url:"/assets/images/nodni.png"
            },
            cuidador:{
                estado:"pending",
            },

        }

    },
    mounted() {

       // this.BuscarServicios();
       // this.porcentaje = 20;
       // this.selector_cantidad();
        this.getUserInfo();



    },
    methods: {
        toggleLoader() {
            //$('#spinner').toggle();
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
                        this.dniAnverso.url = url;

                    }else{
                        this.dniReverso.url = url;
                    }
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
                     document.location.href="/";
                });
        },

        isUserCuidador(sessionInfo) {
            //  var urlCiudador = "/api/cuidadores" ;
            //  + '?id='
            // axios.get(urlCiudador+ "/" + sessionInfo.data.principal.user.id)
            this.user=sessionInfo.data.principal.user;
            var  url= "/api/cuidadores/user/";
            let consulta= url + '?id=' + this.user.id;
            //console.log(sessionInfo)
            axios.get(consulta)
                .then((data) => {
                console.log(data);
                    //si ya sos cuidador;
                    if(data.data!=""){
                       document.location.href="/views/cuidadores/cuidadores-editar.html";
                    }else{
                        if(data.data.estado=="approved"){
                            document.location.href="/views/cuidadores/cuidadores-editar.html";
                        }
                    }
                    $('#spinner').toggle();
                    // this.formPost = false;

                })
                /*.catch(error => {
                    //  this.formPost = true;
                    // document.getElementById("spinner").toggle();
                    // me redirije a lo de jorge
                    document.location.href="/views/cuidadores/alta-cuidador.html";
                });*/
        },
        enviarAltaCuidador() {
            if (this.validarCantidadImagenes())
            {
                sweetAlert("Oops...", "Error, Se deben cargar ambas imagenes del dni", "error");
                return ;
            }
            this.cuidador.dniImagenes=[this.dniAnverso,this.dniReverso];
            this.cuidador.user=this.user;
            console.log(this.cuidador);
            var urlCuidador = "/api/cuidadores/";
            axios.post(urlCuidador, this.cuidador)
                .then((response) => {
                    console.log(response);
                    swal({
                            title: "Enviada!",
                            text: "Solicitud generada exitosamente",
                            type: "success"
                        },
                        function () {
                            window.location.href = "/views/cuidadores/cuidadores-editar.html";
                        });
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        validarCantidadImagenes()
        {
            if(this.dniAnverso.url=="/assets/images/nodni.png" || this.dniReverso.url=="/assets/images/nodni.png"){
                return true;
            }

            return false;

        },

    }
});

