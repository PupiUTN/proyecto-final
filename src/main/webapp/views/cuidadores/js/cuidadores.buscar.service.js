window.onload = function () {
    $('select').material_select();
    obtenerPerros();
    obtenerProvincias();
    $('select').material_select();
};
var listaCuidadoresGlobal;

function generarCuidadores(jsonArray) {
    listaCuidadoresGlobal = jsonArray;
    for (var i = 0; i < jsonArray.length; i++) {
        var url;
        //console.log
        if (jsonArray[i].listaImagenes.length === 0) {
            url = '/img/no-avatar.png';
        } else {
            url = jsonArray[i].listaImagenes[0].url;
        }
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
                <p> <i class="material-icons black-text">location_on</i>' + jsonArray[i].direccion.nombre + ', '+jsonArray[i].direccion.localidad.nombre+', '+jsonArray[i].direccion.localidad.provincia.nombre+'</p> \n\
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






var btnEliminar;
var idElim;
function eliminarCuidador(idEliminar) {
    var boton = "#btnEliminar" + idEliminar;
    idElim = idEliminar;
    console.log(boton);
    btnEliminar = $(boton);
    console.log(idElim);

}

function eliminarAJAX() {
    var url = "/api/cuidadores/" + idElim;
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
        console.log('aprobo mail, voy a guardar');
        return true;
    }
}

function postReserva() {

    var reserva = getReservaDesdeForm();
    $.ajax({
        type: "POST",
        url: '/api/reservas',
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
    var perro = new Object();
    perro.nombre = $('#perro').val();
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


function obtenerPerros() {
    var url = "/api/perros";
    $.getJSON(url, function (datos) {
        llenarSelect('#perro', datos);
    });
}

function obtenerProvincias() {
    var url = "/api/provincias";
    $.getJSON(url, function (datos) {
        llenarSelect('#busquedaProv', datos);
    });
}

function llenarSelect(idSelect, jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        $(idSelect).append('<option value="' + jsonArray[i].id + '">' + jsonArray[i].nombre + '</option>');
        $('select').material_select();
    }
}




function buscarCuidadores() {
    var idLocalidad=$('#idLocalidad').val();
    $('#listaCuidadores').empty();
    var url = "/api/cuidadores/localidades/"+idLocalidad;
    $.getJSON(url, function (datos) {
        generarCuidadores(datos);
    });
    $('#buscadores').show();
}

$('#ordenarPorCantidad').on('click', function () {
    var listaCuidadoresOrdenada;
    $('#listaCuidadores').empty();
    var ordenarPorCantidadObject = $('#ordenarPorCantidad');

    if (ordenarPorCantidadObject.data("sense") == 'asc'){
        console.log("Ordeno asc");
        listaCuidadoresOrdenada = listaCuidadoresGlobal.sort(function(a, b) {
            return parseFloat(a.cantidadMaxDePerros) - parseFloat(b.cantidadMaxDePerros);
        });
        ordenarPorCantidadObject.data("sense", "desc");
        ordenarPorCantidadObject.children('i').text('thumb_up');


    }else {
        console.log("Ordeno desc");
        listaCuidadoresOrdenada = listaCuidadoresGlobal.sort(function(a, b) {
            return parseFloat(b.cantidadMaxDePerros) - parseFloat(a.cantidadMaxDePerros);
        });
        ordenarPorCantidadObject.data("sense", "asc");
        ordenarPorCantidadObject.children('i').text('thumb_down');



    }

    generarCuidadores(listaCuidadoresOrdenada);

});