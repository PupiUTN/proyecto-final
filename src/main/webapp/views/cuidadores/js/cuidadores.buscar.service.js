/**
 * Created by gabriellorenzatti on 21/6/17.
 */
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

function ordenarpPorCantidadAsc(listaCuidadoresGlobal)
{  var listaOrdenada;

        console.log("Ordeno asc");
        listaOrdenada = listaCuidadoresGlobal.sort(function (a, b) {
            return parseFloat(a.cantidadMaxDePerros) - parseFloat(b.cantidadMaxDePerros);
        });



    return listaOrdenada;

}

function ordenarpPorCantidadDesc(listaCuidadoresGlobal)
{  var listaOrdenada;

        console.log("Ordeno desc");
        listaOrdenada = listaCuidadoresGlobal.sort(function (a, b) {
            return parseFloat(b.cantidadMaxDePerros) - parseFloat(a.cantidadMaxDePerros);
        });
    return listaOrdenada;

}