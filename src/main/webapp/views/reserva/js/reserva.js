let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/cuidadores",
        item: {
            index: '',
            id: '',
            nombre: '',
            email: '',
            telefono: '',
            direccion: '',
            cantidadMaxDePerros: '',
            listaImagenes: '',
            descripcio: '',
            precio: ''

        },
        fechaReservaDesde: '',
        fechaReservaHasta: '',
        idCuidador: 0,
    }
    ,
    mounted() {


        this.idCuidador = this.getParameterByName('id');
        this.getItems(this.url, this.idCuidador);
        var fecha = new Date();
        this.fechaReservaDesde = fecha.toLocaleDateString();
        this.fechaReservaHasta = fecha.toLocaleDateString();


    },
    methods: {
        toggleLoader() {
            $('#spinner').toggle();
        },
        getItems() {
            axios.get(this.url + "/" + this.idCuidador)
                .then((response) => {
                    this.item = response.data;
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
    }
});

