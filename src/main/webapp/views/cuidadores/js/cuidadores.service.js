window.onload = function () {
    getCuidadores();
    $('select').material_select();

    obtenerProvincias();
    $('select').material_select();
};

function getCuidadores() {
    console.log("getCuidadores()");
    var url = "/api/cuidadores";
    $.getJSON(url, function (datos) {
        console.log(datos);
        generarCuidadores(datos);
    });
}

function generarCuidadores(jsonArray) {
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
                <p> <i class="material-icons black-text">location_on</i>' + jsonArray[i].direccion.nombre + ', ' + jsonArray[i].direccion.localidad.nombre + ', ' + jsonArray[i].direccion.localidad.provincia.nombre + '</p> \n\
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
    //idEliminar = $(this).next().val();
    //console.log(idEliminar);
    //('#modal1').modal('open');


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

function getCuidadorDesdeForm() {
    var provincia = new Object();
    provincia.id = $('#busquedaProv').val();
    provincia.nombre = $('#busquedaProv :selected').text();

    var dir = new Object();
    dir.nombre = $('#direccion').val();
    var localidad = new Object();
    localidad.nombre = $('#localidad').val();
    localidad.id = $('#idLocalidad').val();
    localidad.provincia  = provincia;
    dir.localidad = localidad;
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
    cuidador.direccion = dir;
    cuidador.telefono = $('#telefono').val();
    cuidador.cantidadMaxDePerros = $('#maxPerros').val();
    cuidador.listaImagenes = fotosList;
    return cuidador;
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

function postCuidador() {
    if (validarEmail($('#email'))) {
        var cuidador = getCuidadorDesdeForm();
        console.log(cuidador);
        console.log(JSON.stringify(cuidador));
        $.ajax({
            type: "POST",
            url: '/api/cuidadores',
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




