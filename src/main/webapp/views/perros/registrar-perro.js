let vm = new Vue({
    el: '#appVue',
    data: {
        user: {},
        perro: {},
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
    },
    mounted() {
        this.getUserInfo();
        this.bindDatePickerWithVue();
    },
    methods: {
        toggleLoader() {
            $('#spinner').toggle();
        },
        upload(formData) {
            axios.post('/api/file/', formData)
                .then((response) => {
                    vm.perro.fotoPerfil = response.data;
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
                });
        },
        saveDog() {
            this.toggleLoader();
            this.perro.user = this.user;
            this.perro.listaVacunas = [];
            this.perro.tamaño = this.tamaño;
            this.perro.raza = this.raza;
            this.listaVacunas.forEach(function (vacunaId) {
                let vacuna = {};
                vacuna.id = vacunaId;
                vm.perro.listaVacunas.push(vacuna);
            });
            console.log(vm.perro);
            if(this.perro.birthday === undefined) {
                this.perro.birthday = "10-10-2016";
            }
            axios.post(this.url + this.user.id + "/perros", vm.perro)
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
            this.toggleLoader();
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
                vm.perro.birthday = dateString;
            });
        }

    }
});

