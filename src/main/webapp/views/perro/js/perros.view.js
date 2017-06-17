
 function mostarFormNuevoPerro() {
 $('#nuevoPerro').show();
 }








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