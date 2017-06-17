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

function mostrarImagen(pathImagen) {
    var pos = pathImagen.lastIndexOf("/");
    var nombreImagen;
    if (pos > 0) {
        nombreImagen = pathImagen.substr(pos + 1);
    } else {
        nombreImagen = pathImagen;
    }
    if ((/\.(jpg|png|gif)$/i).test(nombreImagen)) {
        if (imagenes.length <= 3) {
            $('#contenedorImagen').append('<img src="' + pathImagen + '" height="100" width="100"  class="imagenCuidador" alt="Imagen previsualizada">');
            imagenes.push(pathImagen);
        } else {
            console.log("error agregar imagen");
            $.toast({
                heading: 'Error',
                text: 'Ya hay 4 imágenes agregadas.',
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
//$('#muestraImagen').attr('src', window.URL.createObjectURL($('#imagen').get(0).files.item(0)));
}





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



$(document).ready(function () {

    $(".numero").keydown(function (e) {
// Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});

$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute

});
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});
var imagenes = [];
/* global e */

function mostarFormNuevoCuidador() {
    $('#nuevoCuidador').toggle();
}

function mostarFormBuscarCuidador() {
    $('#nuevaBusqueda').toggle();
}


 $('.reserva').on('click', function () {
 var id = $('.idCuidador').eq(($('.reserva').index(this))).val();
 console.log(id);
 });


function mostrarLocalidades() {
    var idProv = $('#busquedaProv').val();
    $('#localidad').val("");
    $('#localidadDiv').show();
    $('#localidad').easyAutocomplete({
        url: "/api/provincias/" + idProv + "/localidades",
        placeholder: "Localidad",
        getValue: "nombre",
        minCharNumber: 3,
        list: {
            onSelectItemEvent: function () {
                var value = $("#localidad").getSelectedItemData().id;
                $("#idLocalidad").val(value);
            },
            sort: {
                enabled: true
            },
            maxNumberOfElements: 10,
            match: {
                enabled: true
            },
            showAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function () {
                }
            },

            hideAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function () {
                }
            }
        }
    });
}