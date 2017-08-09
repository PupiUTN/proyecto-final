
let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/cuidadores",
        item: {
            index: '',
            id: '',
            nombre: '',
            email:'',
            telefono:'',
            direccion:'',
            cantidadMaxDePerros:'',
            listaImagenes:''
        },
        items: [],
        cuidador: {},
        formPost: true,

    }
        ,
    mounted() {
        IdCuidador =this.getParameterByName('id');
        this.getItemsAjax(this.url,IdCuidador);




    },
    methods: {

        getItemsAjax() {
              axios.get(this.url )


                .then((response) => {
                    this.item = response.data[0];
                        this.cuidador = this.item.nombre;
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },

         getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

    }
});

