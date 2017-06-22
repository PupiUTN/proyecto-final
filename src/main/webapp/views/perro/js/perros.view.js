
 function mostarFormNuevoPerro() {
 $('#nuevoPerro').show();
 }


 window.onload = function () {
     $('#nuevoPerro').hide();
     obtenerRazas();
     obtenerTamaños();
     obtenerVacunas();
     getEventos();
     $('select').material_select();
 };





 var imagenes = [];
 /* global e */
 function mostrarImagen(pathImagen) {
     var pos = pathImagen.lastIndexOf("/");
     var nombreImagen;
     if (pos > 0) {
         nombreImagen = pathImagen.substr(pos + 1);
     } else {
         nombreImagen = pathImagen;
     }
     if ((/\.(jpg|png|gif)$/i).test(nombreImagen)) {
         if (imagenes.length === 0) {
             $('#contenedorImagen').append('<img src="' + pathImagen + '" height="100" width="100"  class="imagenPerro" alt="Imagen previsualizada">');
             imagenes.push(pathImagen);
         } else {
             console.log("error agregar imagen");
             $.toast({
                 heading: 'Error',
                 text: 'Ya hay 1 imagen agregada.',
                 showHideTransition: 'fade',
                 icon: 'error'
             });
         }
     } else {
         console.log("error agregar imagen");
         $.toast({
             heading: 'Error',
             text: 'El archivo a agregar no es una imagen.',
             showHideTransition: 'fade',
             icon: 'error'
         });
     }
 }
 //$('#muestraImagen').attr('src', window.URL.createObjectURL($('#imagen').get(0).files.item(0)));

 $('#imageFile').on('change', function () {

     var file = this.files[0];
     console.log(file);
     if (file.size > 1048576) {
         $.toast({
             heading: 'Error',
             text: 'Superaste el tamano maximo de 1MB.',
             showHideTransition: 'fade',
             icon: 'error'
         });

         $('#imageFile').empty();
         return;
     }

     var regexExtensionValidator = /(\.jpg|\.jpeg|\.png)$/i;
     if (!regexExtensionValidator.exec(file.name.toLocaleLowerCase())) {
         $.toast({
             heading: 'Error',
             text: 'Extension no soportada.',
             showHideTransition: 'fade',
             icon: 'error'
         });

         $('#imageFile').empty();
     }


 });

 $('#imageButton').on('click', function () {
     $.ajax({
         // Your server script to process the upload
         url: '/api/file/',
         type: 'POST',

         // Form data
         data: new FormData($('form')[1]),
         // Tell jQuery not to process data or worry about content-type
         // You *must* include these options!
         cache: false,
         contentType: false,
         processData: false,
         success: function (data) {
             console.log(data);
             mostrarImagen(data);


         }
     });
 });


 function generarPerros(jsonArray) {
     var arrayLength = jsonArray.length;
     for (var i = 0; i < arrayLength; i++) {
         //existe un problema con los espacios, entonces al html lo copiamos en la barra url del explorador y luego lo cortamos para tenr bien el formato
         var url;
         console.log(jsonArray[i].fotoRuta);
         if (jsonArray[i].fotoRuta === null) {
             url = '/img/dog-1.jpg';
         } else {
             url = jsonArray[i].fotoRuta;
         }
         var itmeList = '\
    \<li class="collection-item avatar"> \n\
    <img src="'+url+'" alt="" class="circle"> \n\
    <span class="title"> \n\
    <b>' + jsonArray[i].nombre + '</b></span> \n\
    <div class="row"> \n\
        <div class="col s12 m6"> \n\
            <p> Raza: ' + jsonArray[i].raza.nombre + ' <br>\n\
            Tamaño: ' + jsonArray[i].tamaño.nombre + '<br>\n\
        Vacunación: ' + jsonArray[i].vacunacionList[0].nombre;
         if (jsonArray[i].vacunacionList.length > 1) {
             for (var j = 1; j < jsonArray[i].vacunacionList.length; j++) {
                 itmeList += ', ' + jsonArray[i].vacunacionList[j].nombre;
             }
         }
         itmeList += '<br>\n\
            </p> \n\
        </div> \n\
        <div class="col s12 m6"> \n\
            <p> Comentario: ' + jsonArray[i].comentario + '<br>\n\
            </p> \n\
        </div> \n\
    </div> \n\
        <div class="secondary-content"> \n\
        <a href="#!" >\n\
        <i class="material-icons">delete</i>\n\
        </a> <br> \n\
        <a href="#!" >\n\
        <i class="material-icons">edit</i>\n\
        </a> </div> \n\
</li>\
';

         $('#perroList').append(itmeList);
     }


 }


 $('#guardarPerro').submit(function () {
     postPerro();
     return false;
 });

 function llenarSelect(idSelect, jsonArray) {
     for (var i = 0; i < jsonArray.length; i++) {
         $(idSelect).append('<option value="' + jsonArray[i].id + '">' + jsonArray[i].nombre + '</option>');
         $(idSelect).prop('selectedIndex', -1);
         $('select').material_select();
     }
 }
