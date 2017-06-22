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
