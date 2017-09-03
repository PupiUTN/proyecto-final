let vm = new Vue({
    el: '#appVue',
    data: {
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
        postal_code: '',
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
        this.inicializarServicios()


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
                    this.toggleLoader();
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
                    this.isUserCuidador(sessionInfo);
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, necesitas estar logueado", "error");
                    window.location.replace("http://localhost:8080/views/index/index.html");
                });
        },

        isUserCuidador(sessionInfo) {
             var urlCiudador = "/api/cuidadores" ;
          //  + '?id='
            axios.get(urlCiudador+ "/" + sessionInfo.data.principal.user.id)
                .then((data) => {

                    this.cuidador = data.data;
                    this.precioNeto = this.cuidador.precioPorNoche - (( this.cuidador.precioPorNoche * 20)/100);
                    this.formPost = false;
                    this.tamaño = this.cuidador.tamaño.id;
                    this.cantidadMaxDePerros = this.cuidador.cantidadMaxDePerros
                    this.descripcion = this.cuidador.descripcion

                })
                .catch(error => {
                    this.formPost = true;
                    // me redirije a lo de jorge
                });
        },
        editCuidador() {
            var urlCiudador = "/api/cuidadores/";
            var payload = jQuery.extend(true, {}, this.cuidador);
            axios.put(urlCiudador + this.cuidador.id, payload)
                .then((response) => {
                    this.toggleLoader();
                    sweetAlert("Editado!", "Usuario editado exitosamente.", "success");
                    console.log(response);
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");

                    }
                );
        },
        inicializarServicios()
        {


        }
    }
});

