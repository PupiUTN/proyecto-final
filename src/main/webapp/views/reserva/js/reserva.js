let vm = new Vue({
    el: '#appVue',
    data: {
        urlCuidador: "/api/cuidadores",
        cuidador: {
            id: '',
            nombre: 'X',
            email: '',
            direccion: 'X',
            cantidadMaxDePerros: 'X'
        },
        perros: [
            {
                id: '',
                nombre: '',
            }
        ],
        fechaReservaDesde: '',
        fechaReservaHasta: '',
        idCuidador: 0,
        isAuthenticated: false,
    }
    ,
    mounted() {

    },
    methods: {
        toggleLoader() {
            $('#spinner').toggle();
        },
        getItems() {
            axios.get(this.urlCuidador + "/" + this.idCuidador)
                .then((response) => {
                    this.cuidador = response.data;
                    $('#spinner').toggle();

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, de Cuidador ", "guau guau");
                    }
                );
        },
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        isAuthenticatedMethod(isAuthenticated) {
            this.isAuthenticated = isAuthenticated;
            if (!this.isAuthenticated) {
                var childMylogin = this.$refs.mylogin;
                childMylogin.openLoginPopUp();
            } else {
                this.loadReservaContent();
            }
        },
        loadReservaContent() {
            this.idCuidador = this.getParameterByName('id');
            this.getItems(this.urlCuidador, this.idCuidador);
            var fecha = new Date();
            this.fechaReservaDesde = fecha.toLocaleDateString();
            this.fechaReservaHasta = fecha.toLocaleDateString();


        },
        getPerros(ownerId) {
            axios.get("/api/owner"+ownerId+"/perros")
                .then((response) => {
                    this.cuidador = response.data;
                    $('#spinner').toggle();

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, de Cuidador ", "guau guau");
                    }
                );
        }

    }
});

