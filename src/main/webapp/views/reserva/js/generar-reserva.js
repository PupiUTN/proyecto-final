let vm = new Vue({
    el: '#wrapper',
    data: {
        urlCuidador: "/api/cuidadores",
        perros: [
            {
                id: '',
                nombre: '',
            }
        ],
        isAuthenticated: false,
        reserva: {
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
                },
            perro: {
                id: null
            },
            fechaInicio: '',
            fechaFin: '',
            precioTotal: null,
            mensaje: ''
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
                var childMylogin = this.$refs.myNavbar.$refs.mylogin;
                childMylogin.openLoginPopUp();
            } else {
                this.loadReservaContent();
            }
        },
        loadReservaContent() {
            this.getDateFromUrl();
            this.idCuidador = this.getParameterByName('id');
            this.getCuidador();
            this.getPerros();
        },

        getCuidador() {
            axios.get(this.urlCuidador + "/" + this.idCuidador)
                .then((response) => {
                    this.reserva.cuidador = response.data;
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
            var childMylogin = this.$refs.myNavbar.$refs.mylogin;

            var userId = childMylogin.user.id;
            axios.get("/api/user/" + userId + "/perros")
                .then((response) => {
                    this.perros = response.data;
                    if (this.perros.length == 0) {
                        sweetAlert({
                                title: "Reserva",
                                text: "Para reservar necesita agregar al menos un perro",
                                type: "info",
                            },
                            function () {
                                console.log("redirect");
                                document.location.href = "/views/perros/perros.html";
                            });
                    }

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        postReserva() {
            this.reserva.perro.id = this.checkboxPerros[0];

            if (this.reserva.fechaInicio === this.reserva.fechaFin) {
                console.log("Fecha inicio igual a fecha fin");
                sweetAlert("Campo Vacio", "Fecha inicio igual a fecha fin", "info");

                return;
            }

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

            this.reserva.precioTotal = this.precioTotal;
            axios.post("/api/user/me/reservas", this.reserva)
                .then((response) => {
                    sweetAlert({
                            title: "Guardado",
                            text: "Nueva reserva creada exitosamente.",
                            type: "success",
                        },
                        function () {
                            console.log("redirect");
                            document.location.href = "/views/reserva/mis-reservas-user.html?status=CONFIRMATION_PENDING";
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
        getDateFromUrl() {
            var dateStringFrom = this.getParameterByName('dateFrom');
            $('#booking-date').val(dateStringFrom); //the getDate method
            vm.reserva.fechaInicio = dateStringFrom;


            var dateStringTo = this.getParameterByName('dateTo');
            $('#booking-date2').val(dateStringTo); //the getDate method
            vm.reserva.fechaFin = dateStringTo;
        }


    },
    computed: {
        precioTotal() {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(this.reserva.fechaInicio);
            var secondDate = new Date(this.reserva.fechaFin);

            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

            return diffDays * this.reserva.cuidador.precioPorNoche;
        }
    }
});


