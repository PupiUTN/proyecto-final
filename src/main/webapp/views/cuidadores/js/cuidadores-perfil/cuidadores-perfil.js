
let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/cuidadores",
        item: {
            index: '',
            id: '',
            telefono:'',
            direccion:'',
            cantidadMaxDePerros:'',
            listaImagenes:'',
            descripcion:'',
             precio:'',
            ciudad:'',
             user:'',
            profile_image_url:'',
            tamaño:'',
            listaServicios:''
        },
        fechaReservaDesde: '',
        fechaReservaHasta:'',
        idCuidador: 0,
    }
        ,
    mounted() {


        this.idCuidador =this.getParameterByName('id');
        this.getItems(this.url,this.idCuidador);
         var fecha = new Date();
          this.fechaReservaDesde= fecha.toLocaleDateString();
        this.fechaReservaHasta= fecha.toLocaleDateString();


    },
    methods: {
         toggleLoader() {
             $('#spinner').toggle();
         },
        getItems() {
              axios.get(this.url +"/"+ this.idCuidador )
                .then((response) => {
                    this.item = response.data;
                    this.item.ciudad =this.item.user.direccion.ciudad;
                    document.getElementById("imagenAvatar").src = this.item.user.profileImageUrl;
                    this.loadServicios(this.item.listaServicios)
                    this.loadImages(this.item.listaImagenes);
                    this.loadTamaño(this.item.tamaño);
                    this.geolocateCuidador(this.item.user.direccion);

                   $('#spinner').toggle();

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error  ", "error");

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
            //var myLatLng = {lat: lat, lng: long};
            var latlng = new google.maps.LatLng(lat, long);
           var map = new google.maps.Map(document.getElementById('singleListingMap'), {
                center: latlng,
                zoom: 15
            });
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: latlng,
                radius: Math.sqrt(2) * 100
            });

        },

        loadImages(imagenes) {


            var img = 0;
            var id = "";
            if(imagenes.length > 0){

            for (value in imagenes){

                  id = "myImg" + value;

               // $('#ContenedorImagen').slick('slickAdd','<img  src=' + imagenes[value].url + ' class=" item mfp-gallery" />');
                $('#ContenedorImagen').slick('slickAdd','<a href=' + imagenes[value].url + ' style="background-image: url(' + imagenes[value].url + ')" class=" item mfp-gallery" />');
                img ++;
            }

            }
             if( img < 4)
             { var  resta = 4-img;
                   var i = resta;
                 while (i > 0) {
                     id = "myImg" + (4-i);
                   //  document.getElementById(id).src = "/assets/images/logo.png";
                     $('#ContenedorImagen').slick('slickAdd','<img src="/assets/images/logo.png" class=" item mfp-gallery" />');
                         i--;
                 }


             }
        },

        loadTamaño(param)
        {
                 if(param.id === 1)
                 {document.getElementById("imgTamañoPerro").src = "/img/perro_miniatura.png";
                 }else
                 {
                     if(param.id === 2)
                     {document.getElementById("imgTamañoPerro").src = "/img/perro_pequeña.png";

                     }
                     else
                     {  if(param.id === 3)
                        {  document.getElementById("imgTamañoPerro").src = "/img/perro_mediano.png";

                        }
                        else
                        {
                            if(param.id ===4 )
                            {document.getElementById("imgTamañoPerro").src = "/img/perro_grande.png";

                            }
                            else
                            { document.getElementById("imgTamañoPerro").src = '/img/perro_gigante.jpg';
                            }
                        }

                     }

                 }

            this.item.tamaño = param.valorMinimo+ " a " + param.valorMaximo + " "+ "KG.";
        },

        loadServicios(servicios)
        {  var x = {Id: 1, Nombre: "Baño diaro "};

            servicios[0] = x;
             x = {Id: 2, Nombre: "Administración de medicamentos"};

            servicios[1] = x;

            x = {Id: 2, Nombre: "Recoger y Entegrar a domicilio"};

            servicios[2] = x;
            this.item.listaServicios = servicios;

        }

    }
});

