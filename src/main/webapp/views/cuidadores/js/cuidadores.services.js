/**
 * Created by gabriellorenzatti on 21/6/17.
 */
function getReservaDesdeFormCuidadores() {
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
