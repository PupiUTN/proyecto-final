let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/cuidadores",
        item: {
            index: '',
            id: '',
            telefono: '',
            direccion: '',
            cantidadMaxDePerros: '',
            listaImagenes: '',
            descripcion: '',
            precio: '',
            ciudad: '',
            user: '',
            profile_image_url: '',
            tamaño: '',
            listaServicios: ''
        },
        fechaReservaDesde: '',
        fechaReservaHasta: '',
        idCuidador: 0,
    }
    ,
    mounted() {


        this.idCuidador = this.getParameterByName('id');
        this.getCuidador(this.url, this.idCuidador);
        var today = new Date();
        today.toISOString().substring(0, 10);
        this.fechaReservaDesde = today.toISOString().substring(0, 10);
        this.fechaReservaHasta = today.toISOString().substring(0, 10);
        this.bindDatePickerWithVue();

    },
    methods: {

        getCuidador() {
            axios.get(this.url + "/" + this.idCuidador)
                .then((response) => {
                    this.item = response.data;
                    this.item.ciudad = this.item.user.direccion.ciudad;
                    document.getElementById("imagenAvatar").src = this.item.user.profileImageUrl;

                    this.loadImages(this.item.listaImagenes);
                    this.loadTamaño(this.item.tamaño);
                    this.geolocateCuidador(this.item.user.direccion);


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
            var lat = direccion.latitud;
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
            if (imagenes.length > 0) {

                for (value in imagenes) {

                    id = "myImg" + value;

                    // $('#ContenedorImagen').slick('slickAdd','<img  src=' + imagenes[value].url + ' class=" item mfp-gallery" />');
                    $('#ContenedorImagen').slick('slickAdd', '<a href=' + imagenes[value].url + ' style="background-image: url(' + imagenes[value].url + ')" class=" item mfp-gallery" />');
                    img++;
                }

            }
            if (img < 4) {
                var resta = 4 - img;
                var i = resta;
                while (i > 0) {
                    id = "myImg" + (4 - i);
                    //  document.getElementById(id).src = "/assets/images/logo.png";
                    $('#ContenedorImagen').slick('slickAdd', '<img src="/assets/images/logo.png" class=" item mfp-gallery" />');
                    i--;
                }


            }
        },

        loadTamaño(param) {
            if (param.id === 1) {
                document.getElementById("imgTamañoPerro").src = "/img/perro_miniatura.png";
            } else {
                if (param.id === 2) {
                    document.getElementById("imgTamañoPerro").src = "/img/perro_pequeño.jpg";

                }
                else {
                    if (param.id === 3) {
                        document.getElementById("imgTamañoPerro").src = "/img/perro_mediano.jpg";

                    }
                    else {
                        if (param.id === 4) {
                            document.getElementById("imgTamañoPerro").src = "/img/perro_grande.jpg";

                        }
                        else {
                            document.getElementById("imgTamañoPerro").src = '/img/perro_gigante.jpg';
                        }
                    }

                }

            }

            this.item.tamaño = param.valorMinimo + " a " + param.valorMaximo + " " + "KG.";
        },
        hrerReserva() {
            var url = '/views/reserva/generar-reserva.html?id=' + this.idCuidador + '&dateFrom=' + this.fechaReservaDesde + '&dateTo=' + this.fechaReservaHasta;
            document.location.href = url;

        },
        bindDatePickerWithVue() {

            // https://stackoverflow.com/questions/41200729/vue-js-and-jquery-datepicker-timepicker-two-way-binding
            $('#booking-date').dateDropper();
            $('#booking-date').change(function () {
                console.log("date picker selected");
                // var dateObjetc = $('#booking-date').datepicker("getDate");
                //Java format: 2017-08-27
                var dateString = $('#booking-date').val(); //the getDate method
                vm.fechaReservaDesde = dateString;
            });

            $('#booking-date2').dateDropper();
            $('#booking-date2').change(function () {
                console.log("date picker selected");
                var dateString = $('#booking-date2').val(); //the getDate method
                vm.fechaReservaHasta = dateString;
            });
        }


    }
});

