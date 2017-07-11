/**
 * Created by fbackhaus on 10/7/17.
 */
window.onload = function () {
    getCuidadores();
    $('select').material_select();
};


function mostarFormNuevoCuidador() {
    $('#nuevoCuidador').toggle();
}

function validarEmail(campo) {
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (!emailRegex.test(campo.val())) {
        console.log("error agregar cuidador");
        $.toast({
            heading: 'Error',
            text: 'El email ingresado no es válido.',
            showHideTransition: 'fade',
            icon: 'error'
        });
        return false;
    } else {
        console.log('aprobo mail, voy a guardar');
        return true;
    }
}


function validarFormualrio() {
    //validar
    if ($('#busquedaProv').prop('selectedIndex') === -1) {
        $.toast({
            heading: 'Error',
            text: 'Seleccione provincia',
            showHideTransition: 'fade',
            icon: 'error'
        });
        return;
        $('#submit_handle').click();
    }else{
        console.log('cuidador');
        postCuidador();
    }
}

function limpiarCampos() {
    $(':input', '#formCuidador')
        .removeAttr('checked')
        .removeAttr('selected')
        .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
        .val('');
    $(':input', '#imageForm')
        .removeAttr('checked')
        .removeAttr('selected')
        .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
        .val('');
    $('#contenedorImagen').empty();
    imagenes = [];
}

function mostrarImagen(pathImagen) {
    var pos = pathImagen.lastIndexOf("/");
    var nombreImagen;
    if (pos > 0) {
        nombreImagen = pathImagen.substr(pos + 1);
    } else {
        nombreImagen = pathImagen;
    }
    $('#contenedorImagen').append('<img src="' + pathImagen + '" height="100" width="100"  class="imagenCuidador" alt="Imagen previsualizada">');
    imagenes.push(pathImagen);
}

window.onload = function () {
    getCuidadores();
    obtenerProvincias();
    $('select').material_select();
};

$(".letras").keydown(function (e) {
// Allow: backspace, delete, tab, escape, enter, shift and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 16, 32]) !== -1 ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a letter and stop the keypress
    if ((e.keyCode < 65 || e.keyCode > 90)) {
        e.preventDefault();
    }
});

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
    }

    console.log(imagenes);
});

$('#imageButton').on('click', function () {
    if (imagenes.length <= 3) {
        console.log($('#imageFile').val());
        console.log('guardo imagen');
        var file = $('#imageFile').val();
        var regexExtensionValidator = /(\.jpg|\.jpeg|\.png)$/i;
        if (regexExtensionValidator.exec(file)) {
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
        } else {
            $.toast({
                heading: 'Error',
                text: 'Extension no soportada.',
                showHideTransition: 'fade',
                icon: 'error'
            });
        }
    } else {
        console.log("error agregar imagen");
        $.toast({
            heading: 'Error',
            text: 'Ya hay 4 imágenes agregadas.',
            showHideTransition: 'fade',
            icon: 'error'
        });
    }
});

$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute

});