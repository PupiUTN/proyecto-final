let vm = new Vue({
    el: '#appVue',
    data: {
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

