function getCuidadores() {
    console.log("getCuidadores()");
    var url = hostURL + "api/cuidadores";
    $.getJSON(url, function (datos) {
        generarCuidadores(datos);
        eliminarCuidador();
        solicitarReserva();

    });
}

function generarCuidadores(jsonArray) {
    //esto esta hard codeado, se debe cambiar
    var imagenesURL = [];
    imagenesURL.push('cesar_200.jpg');
    imagenesURL.push('riquelme_200.jpg');
    imagenesURL.push('marcelo_200.jpg');
    imagenesURL.push('pope_200.jpg');
    imagenesURL.push('carrio_200.jpg');


    for (var i = 0; i < jsonArray.length; i++) {
        //existe un problema con los espacios, entonces al html lo copiamos en la barra url del explorador y luego lo cortamos para tenr bien el formato
        var cuidador = '\
<div class="col s12">\n\
    <div class="card horizontal blue-grey darken-1 white-text">\n\
        <div class="card-image">\n\
            <img src="img/' + imagenesURL[i] + '"> \n\
        </div> \n\
        <div class="card-stacked"> \n\
            <div class="card-content"> \n\
            <span class="card-title">' + jsonArray[i].nombre + ' \n\
            <a href="#!"><span data-target="modal1" class="eliminar new badge btn waves-effect waves-light orange accent-2 black-text" data-badge-caption="Eliminar" ></span>\n\
            <input class="idCuidador" type="hidden" value="' + jsonArray[i].id + '">\n\</a> \n\
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
            <a href="#!" class="reserva" data-open="false">Solicitar Reserva</a> \n\
            </div> \n\
        </div> \n\
    </div> \n\
</div>';

        $('#listaCuidadores').append(cuidador);


    }
}

function solicitarReserva() {
    $('.reserva').on('click', function () {
        var btnSolicitarReserva = $(this);
        if (btnSolicitarReserva.attr('data-open') === "false") {
            $('#nuevaReserva').remove();
            $('.reserva').attr('data-open', "false");
            btnSolicitarReserva.attr('data-open', "true");
            var id = $('.idCuidador').eq(($('.reserva').index(this))).val();
            console.log(id);
            btnSolicitarReserva.parent().parent().parent().parent().append('\
<div class="row nuevaReserva" id="nuevaReserva">\n\
    <form class="col s12">\n\
        <div class="row">\n\
            <div class="input-field col s12">\n\
                Seleccione fecha de inicio:\n\
                <input id="fechaInicio" type="date" class="datepicker validate" required>\n\
            </div>\n\
            <div class="input-field col s12">\n\
                Seleccione fecha de fin:\n\
                <input id="fechaFin" type="date" class="datepicker validate" required>\n\
            </div>\n\
            <div class="input-field col s12">\n\
                <select id="perro" class="validate" required>\n\
                <option value="" disabled selected>Seleccione perro</option>\n\
                </select>\n\
                <label for="perro">Perro</label>Datos del dueño:</div>\n\
            <div class="input-field col s12">\n\
                <input id="nombreDuenio" type="text" class="validate" required>\n\
                <label for="nombreDuenio">Nombre</label>\n\
            </div>\n\
            <div class="input-field col s12">\n\
                <input id="emailDuenio" type="text" class="validate" required>\n\
                <label for="emailDuenio">Email</label>\n\
            </div>\n\
            <div class="input-field col s12">\n\
                <input id="telefonoDuenio" type="text" class="validate" required>\n\
                <label for="telefonoDuenio">Teléfono</label>\n\
            </div>\n\
            <div class="input-field col s12">\n\
                <input id="dniDuenio" type="text" class="validate" required>\n\
                <label for="dniDuenio">DNI</label>\n\
            </div>\n\
            <div class="input-field col s12 center">\n\
            <button class="btn waves-effect waves-light" type="submit">Enviar<i class="material-icons right">send</i></button>\n\
            </div>\n\
        </div>\n\
    </form>\n\
</div>');
            obtenerPerros(hostURL);
        }
    });
}

var btnEliminar;
function eliminarCuidador() {
    $('.eliminar').on('click', function () {

        btnEliminar = $(this);
        var id = $(this).next().val();
        console.log($(this).next().val());
        $('#modal1').modal('open');
        $('#aceptarEliminar').on('click', function () {

            eliminarAJAX(id);
        });
    });
}

function eliminarAJAX(id) {
    var url = hostURL + "api/cuidadores/" + id;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function () {
            btnEliminar.parent().parent().parent().parent().parent().parent().remove();
            console.log('Se borro cuidador con ID: ' + id);
        },
        error: function () {
            alert('El cuidador no pudo ser eliminado.');
        }
    });
}

$(document).ready(function () {
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
//$('.modal').modal();

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
    $('#nuevoCuidador').show();
}


$('#nuevoCuidador').submit(function () {
    //postPerro();
    validarEmail($('#email'));
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
    }
}

/*function postPerro() {
 var perro = getPerroDesdeForm();
 $.ajax({
 type: "POST",
 url: hostURL + 'api/perro',
 data: JSON.stringify(perro),
 contentType: "application/json",
 success: function () {
 console.log("exito crear perro");
 $('#nuevoPerro').hide();
 $.toast({
 heading: 'Success',
 text: 'Exito al crear nuevo perro. Refrescar la pagina para verlo',
 showHideTransition: 'slide',
 icon: 'success'
 });
 //location.reload();
 
 },
 error: function () {
 console.log("error crear perro");
 $.toast({
 heading: 'Error',
 text: 'Erro al crear nuevo perro.',
 showHideTransition: 'fade',
 icon: 'error'
 })
 }
 });
 
 }
 function getPerroDesdeForm() {
 var raza = new Object();
 raza.nombre = $('#raza').val();
 
 var tamanio = new Object();
 tamanio.nombre = $('#tamanio').val();
 
 var vacunaList = [];
 for (var i = 0; i < $('#vacuna').val().length; i++) {
 var vacuna = new Object();
 vacuna.nombre = $('#vacuna').val()[i];
 vacunaList.push(vacuna);
 }
 
 var perro = new Object();
 perro.nombre = $('#nombre').val();
 perro.comentario = $('#comentario').val();
 perro.raza = raza;
 perro.tamanio = tamanio;
 perro.vacunacionList = vacunaList;
 return perro;
 
 }*/




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
            $('#contenedorImagen').append('<img src="' + pathImagen + '" height="100" width="100" alt="Imagen previsualizada">');
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
    $('#nuevoCuidador').hide();
    getCuidadores();
    $('select').material_select();
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

