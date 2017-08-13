
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
             precio:''

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
         var fecha = new Date();
          this.fechaReservaDesde= fecha.toLocaleDateString();
      //  this.fechaReservaHasta= fecha.setDate(fecha.getDate() +1);
        this.fechaReservaHasta= fecha.toLocaleDateString();

        this.loadImages(this.item.listaImagenes);


    },
    methods: {

        getItemsAjax() {
              axios.get(this.url +"/"+ IdCuidador )
                .then((response) => {
                    this.item = response.data;
                        this.cuidador = this.item.nombre;
                    this.item.descripcion= "  Soy un amante de los perros por lo cual puedo cuidar a tu mascota de la mejor manera alir a correr con ellos, jugar y cuidarlos Mis servicios son cuidarlos en el dia y pasearlos, quédate tranquil@ porque tu mascota se divertirá me gustar jugar y estará a salvo. mi zona es Barrio Jardin" +
                        ", muy cerca de ciudad universitaria y el centro, puedo  en cualquier horario";
                    this.loadImages(this.item.listaImagenes);
                    this.geolocateCuidador(this.item.direccion);


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


        geolocateCuidador(direccion) {
            var lat =  direccion.latitud;
            var long = direccion.longitud;
            var myLatLng = {lat: lat, lng: long};
           var map = new google.maps.Map(document.getElementById('singleListingMap'), {
                center: myLatLng,
                zoom: 15
            });
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: myLatLng,
                radius: Math.sqrt(2) * 100
            });

        },

        loadImages(imagenes) {



            var img = 0;
            var id = "";
            var myBodyId = document.getElementById("ContenedorImagen");
            if(imagenes.length > 0){

            for (value in imagenes){

                  id = "myImg" + value;
                 document.getElementById(id).src=imagenes[value].url ;
                img ++;
            }

            }
            if( img < 4)
            { var  resta = 4-img;
                  var i = resta;
                while (i > 0) {
                    id = "myImg" + (4-i);
                    document.getElementById(id).src = "/assets/images/logo.png";
                        i--;
                }


            }
        }

    }
});

