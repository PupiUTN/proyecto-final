let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/cuidadores",
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
                name: '',
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
            axios.get(this.url + "/" + this.idCuidador)
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
            this.getItems(this.url, this.idCuidador);
            var fecha = new Date();
            this.fechaReservaDesde = fecha.toLocaleDateString();
            this.fechaReservaHasta = fecha.toLocaleDateString();


        },
        getPerros() {
            axios.get(this.url + "/" + this.idCuidador)
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

