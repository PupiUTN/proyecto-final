let vm = new Vue({
    el: '#wrapper',
    data: {
        urlCuidador: "/api/cuidadores",
        cuidador:
            {
                id: null,
                cantidadMaxDePerros: null,
                precioPorNoche: 100.0,
                user: {
                    id: null,
                    email: "",
                    fullName: "",
                    direccion: {
                        ciudad: "",
                    }
                },
            }
        ,
        perros: [
            {
                id: '',
                nombre: '',
            }
        ],
        isAuthenticated: false,
        reserva: {
            cuidador: {
                id: null
            },
            perro: {
                id: null
            },
            fechaInicio: '',
            fechaFin: '',
            precioTotal: 1,
            status: 0
        },
        checkboxPerros: [],
        isMounted: false
    }
    , mounted() {

        this.bindDatePickerWithVue();

    },
    methods: {
        isAuthenticatedMethod(isAuthenticated) {
            // TRIGGER MOUNTED METHOD
            this.isAuthenticated = isAuthenticated;
            if (!this.isAuthenticated) {
                var childMylogin = this.$refs.mylogin;
                childMylogin.openLoginPopUp();
            } else {
                this.loadReservaContent();
            }
        },
        loadReservaContent() {
            this.getDateFromUrl();
            this.idCuidador = this.getParameterByName('id');
            this.getItems(this.urlCuidador, this.idCuidador);
            this.getPerros();
        },
        toggleLoader() {
            $('#spinner').toggle();
        },
        getItems() {
            axios.get(this.urlCuidador + "/" + this.idCuidador)
                .then((response) => {
                    this.cuidador = response.data;
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, de Cuidador ", "errorx");
                    }
                );
        },
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        getPerros() {
            var childMylogin = this.$refs.mylogin;

            var userId = childMylogin.user.id;
            axios.get("/api/user/" + userId + "/perros")
                .then((response) => {
                    this.perros = response.data;
                    if(this.perros.length == 0){
                        sweetAlert({
                                title: "Reserva",
                                text: "Para reservar necesita agregar al menos un perro",
                                type: "info",
                                timer: 2000,
                            },
                            function () {
                                console.log("redirect");
                                document.location.href="/views/perros/perros.html";
                            });
                    }
                    this.toggleLoader();
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        postReserva() {
            this.reserva.perro.id = this.checkboxPerros[0];
            this.reserva.cuidador.id = this.cuidador.id;


            if (this.reserva.fechaInicio == '') {
                console.log("fecha inicio vacia");
                sweetAlert("Campo Vacio", "Completar Fecha Inicio", "info");

                return;
            }
            if (this.reserva.fechaFin == '') {
                sweetAlert("Campo Vacio", "Completar Fecha Fin", "info");

                console.log("fecha fin vacia");
                return;
            }
            if (this.reserva.perro.id == null) {
                sweetAlert("Campo Vacio", "Selecionar perro", "info");
                console.log("seleccionar perro");
                return;
            }


            var childMylogin = this.$refs.mylogin;
            var userId = childMylogin.user.id;
            axios.post("/api/user/" + userId + "/reservas", this.reserva)
                .then((response) => {
                    sweetAlert({
                            title: "Guardado",
                            text: "Nueva reserva creada exitosamente.",
                            type: "success",
                            timer: 2000,
                        },
                        function () {
                            console.log("redirect");
                            document.location.href="/";
                        });

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        bindDatePickerWithVue() {

            // https://stackoverflow.com/questions/41200729/vue-js-and-jquery-datepicker-timepicker-two-way-binding
            $('#booking-date').dateDropper();
            $('#booking-date').change(function () {
                console.log("date picker selected");
                // var dateObjetc = $('#booking-date').datepicker("getDate");
                //Java format: 2017-08-27
                var dateString = $('#booking-date').val(); //the getDate method
                vm.reserva.fechaInicio = dateString;
            });

            $('#booking-date2').dateDropper();
            $('#booking-date2').change(function () {
                console.log("date picker selected");
                var dateString = $('#booking-date2').val(); //the getDate method
                vm.reserva.fechaFin = dateString;
            });
        },
        getDateFromUrl(){
            var dateStringFrom = this.getParameterByName('dateFrom');
            $('#booking-date').val(dateStringFrom); //the getDate method
            vm.reserva.fechaInicio = dateStringFrom;


            var dateStringTo = this.getParameterByName('dateTo');
            $('#booking-date2').val(dateStringTo); //the getDate method
            vm.reserva.fechaFin = dateStringTo;
        }


    }
});


