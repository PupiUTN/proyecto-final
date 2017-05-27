function getCuidadores() {
    console.log("getCuidadores()");
    var url = hostURL + "api/cuidadores";
    $.getJSON(url, function (datos) {
        generarCuidadores(datos);
        //eliminarCuidador();
        solicitarReserva();
    });
}

function generarCuidadores(jsonArray) {
//esto esta hard codeado, se debe cambiar
//    var imagenesURL = [];
//    imagenesURL.push('cesar_200.jpg');
//    imagenesURL.push('riquelme_200.jpg');
//    imagenesURL.push('marcelo_200.jpg');
//    imagenesURL.push('pope_200.jpg');
//    //imagenesURL.push('carrio_200.jpg');


    for (var i = 0; i < jsonArray.length; i++) {
        var url;
        //console.log
        if (jsonArray[i].listaImagenes.length === 0) {
            url = "https://pbs.twimg.com/profile_images/492236288406605824/HcFDZXSg.jpeg";
        } else {
            url = jsonArray[i].listaImagenes[0].url;
        }
        console.log(url);
        //existe un problema con los espacios, entonces al html lo copiamos en la barra url del explorador y luego lo cortamos para tenr bien el formato
        var cuidador = '\
<div class="col s12">\n\
    <div class="card horizontal blue-grey darken-1 white-text hoverable">\n\
        <div class="card-image col s3 ">\n\
            <img src="' + url + '"> \n\
        </div> \n\
        <div class="card-stacked"> \n\
            <div class="card-content"> \n\
            <span class="card-title">' + jsonArray[i].nombre + ' \n\
            <a href="#!"><span id="btnEliminar' + jsonArray[i].id + '" data-target="modalEliminar" onclick="eliminarCuidador(' + jsonArray[i].id + ')" class=" new badge btn waves-effect waves-light orange accent-2 black-text" data-badge-caption="Eliminar" ></span>\n\
            </a> \n\
            </span> \n\
            <div class="row"> \n\
                <div class="col s12 m6"> \n\
                <p> <i class="material-icons black-text">phone</i> ' + jsonArray[i].telefono + '</p> \n\
                <p> <i class="material-icons black-text">email</i> ' + jsonArray[i].email + '</p> \n\
                </div> \n\
                <div class="col s12 m6"> \n\
                <p> <i class="material-icons black-text">location_on</i>' + jsonArray[i].direccion.nombre + '</p> \n\
                <p> <i class="material-icons black-text">info</i>Max perros: ' + jsonArray[i].cantidadMaxDePerros + ' </p> \n\
                </div> \n\
                </div> \n\
            </div> \n\
            <div class="card-action"> \n\
            <a href="#!" data-target="modalReserva" class="reserva">Solicitar Reserva</a> \n\
            </div> \n\
        </div> \n\
    </div> \n\
</div>';
        $('#listaCuidadores').append(cuidador);
    }
}

function solicitarReserva() {
    $('.reserva').on('click', function () {
        var id = $('.idCuidador').eq(($('.reserva').index(this))).val();
        console.log(id);
//        $('#modalReserva').modal('open');
//        $('#modalReserva').modal;
    });
}
var btnEliminar;
var idElim;
function eliminarCuidador(idEliminar) {
    var boton = "#btnEliminar" + idEliminar;
    idElim = idEliminar;
    console.log(boton);
    btnEliminar = $(boton);
    console.log(idElim);
    //idEliminar = $(this).next().val();
    //console.log(idEliminar);
    //('#modal1').modal('open');


}

function eliminarAJAX() {
    var url = hostURL + "api/cuidadores/" + idElim;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function () {
            btnEliminar.parent().parent().parent().parent().parent().parent().remove();
            console.log('Se borro cuidador con ID: ' + idElim);
        },
        error: function () {
            idElim = 0;
            alert('El cuidador no pudo ser eliminado.');
        }
    });
}

function getCuidadorDesdeForm() {
    var dir = new Object();
    dir.nombre = $('#direccion').val();
    var fotosList = [];
    var i = 0;
    $(".imagenCuidador").each(function () {
        var imagen = new Object();
        imagen.url = $(this).attr('src');
        fotosList[i] = imagen;
        i++;
    });
    var cuidador = new Object();
    cuidador.nombre = $('#nombre').val();
    cuidador.email = $('#email').val();
    cuidador.telefono = $('#telefono').val();
    cuidador.cantidadMaxDePerros = $('#maxPerros').val();
    cuidador.direccion = dir;
    cuidador.listaImagenes = fotosList;
    return cuidador;
}


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
    $('#buscarCuidador').toggle();
}

$('#guardarCuidador').submit(function () {
    if (validarEmail($('#email'))) {
        postCuidador();
    }
});
$('#nuevaReserva').submit(function () {
    if (validarEmail($('#email'))) {
        postReserva();
    }
});
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
        console.log('aprobo mail, voy a guardar')
        return true;
    }
}

function postCuidador() {
    if (validarEmail($('#email'))) {
        var cuidador = getCuidadorDesdeForm();
        console.log(cuidador);
        console.log(JSON.stringify(cuidador));
        $.ajax({
            type: "POST",
            url: hostURL + 'api/cuidadores',
            data: JSON.stringify(cuidador),
            contentType: "application/json",
            success: function () {
                console.log("exito crear cuidador");
                $('#nuevoCuidador').hide();
                $.toast({
                    heading: 'Success',
                    text: 'Exito al crear nuevo cuidador. Refrescar la pagina para verlo',
                    showHideTransition: 'slide',
                    icon: 'success'
                });
                location.reload();
            },
            error: function () {
                console.log("error crear cuidador");
                $.toast({
                    heading: 'Error',
                    text: 'Erro al crear nuevo cuidador.',
                    showHideTransition: 'fade',
                    icon: 'error'
                });
            }
        });
    }
}



function postReserva() {

    var reserva = getReservaDesdeForm();
    $.ajax({
        type: "POST",
        url: hostURL + 'api/reservas',
        data: JSON.stringify(reserva),
        contentType: "application/json",
        success: function () {
            console.log("exito crear reserva");
            //$('#modalReserva').modal('close');
            $.toast({
                heading: 'Success',
                text: 'Exito al crear nueva reserva. Refrescar la pagina para verla',
                showHideTransition: 'slide',
                icon: 'success'
            });
            //location.reload();

        },
        error: function () {
            console.log("error crear reserva");
            $.toast({
                heading: 'Error',
                text: 'Error al crear nueva reserva.',
                showHideTransition: 'fade',
                icon: 'error'
            });
        }
    });
}
function getReservaDesdeForm() {
    var fechaInicio = $('#fechaInicio').val();
    var fechaFin = $('#fechaFin').val();
    var perro = new Object();
    perro.nombre = $('#perro').val();
    var nombreDuenio = $('#nombreDuenio').val();
    var emailDuenio = $('#emailDuenio').val();
    var telefonoDuenio = $('#telefonoDuenio').val();
    var dniDuenio = $('#dniDuenio').val();
    var reserva = new Object();
    reserva.fechaInicio = $('#fechaInicio').val();
    reserva.fechaFin = $('#fechaFin').val();
    reserva.perro = perro;
    reserva.nombreDuenio = $('#nombreDuenio').val();
    reserva.emailDuenio = $('#emailDuenio').val();
    reserva.telefonoDuenio = $('#telefonoDuenio').val();
    reserva.dniDuenio = $('#dniDuenio').val();
    return reserva;
}




function mostrarImagen() {
    var pathImagen = $('#URLImagen').val();
    var pos = pathImagen.lastIndexOf("/");
    var nombreImagen;
    if (pos > 0) {
        nombreImagen = pathImagen.substr(pos + 1);
    } else
    {
        nombreImagen = pathImagen;
    }
    if ((/\.(jpg|png|gif)$/i).test(nombreImagen))
    {
        if (imagenes.length <= 3)
        {
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



window.onload = function () {

    getCuidadores();
    obtenerPerros(hostURL);
    $('select').material_select();
    $('#busquedaLocal').autocomplete({
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function (val) {
            console.log('elegiste a ' + val);
            // Callback function when value is autcompleted.
        },
        minLength: 3 // The minimum length of the input for the autocomplete to start. Default: 1.
    });
};

function obtenerPerros(hostURL) {
    var url = hostURL + "api/perros";
    $.getJSON(url, function (datos) {
        llenarSelect('#perro', datos);
    });
}

function llenarSelect(idSelect, jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        $(idSelect).append('<option value="' + jsonArray[i].nombre + '">' + jsonArray[i].nombre + '</option>');
        $('select').material_select();
    }
}

function mostrarLocalidades() {
    $('#busquedaDiv').show();
    $('#busquedaLocal').easyAutocomplete({
        url: hostURL + "api/perros",
        placeholder: "Localidad",
        getValue: "nombre",
        list: {
            match: {
                enabled: true
            }
        }
    });
}