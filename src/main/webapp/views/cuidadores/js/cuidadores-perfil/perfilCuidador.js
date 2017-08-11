
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
            listaImagenes:'',
            descripcion:'',

        },
        items: [],
        cuidador: {},
        formPost: true,
          urlImagen:'',
        fechaReservaDesde: '',
        fechaReservaHasta:''

    }
        ,
    mounted() {
        IdCuidador =this.getParameterByName('id');
        this.getItemsAjax(this.url,IdCuidador);
        //  var fecha = new Date();
        // this.fechaReservaDesde= fecha.toLocaleDateString();
        // this.fechaReservaHasta= fecha.toLocaleDateString() ;

    },
    methods: {

        getItemsAjax() {
              axios.get(this.url +"/"+ IdCuidador )


                .then((response) => {
                    this.item = response.data;
                        this.cuidador = this.item.nombre;
                    this.item.descripcion= "  Soy un amante de los perros por lo cual puedo cuidar a tu mascota de la mejor manera alir a correr con ellos, jugar y cuidarlos Mis servicios son cuidarlos en el dia y pasearlos, quédate tranquil@ porque tu mascota se divertirá me gustar jugar y estará a salvo. mi zona es Barrio Jardin" +
                        ", muy cerca de ciudad universitaria y el centro, puedo  en cualquier horario";

                    this.urlImagen= this.item.listaImagenes[0].url;
                    document.getElementById("myImg").src =  this.urlImagen;
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

