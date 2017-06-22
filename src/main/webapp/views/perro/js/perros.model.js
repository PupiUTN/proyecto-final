/**
 * Created by gabriellorenzatti on 21/6/17.
 */
function getPerroDesdeForm() {
    var raza = new Object();
    raza.id = $('#idRaza').val();
    raza.nombre = $('#raza').val();

    var tamaño = new Object();
    tamaño.id = $('#tamaño').val();
    tamaño.nombre = $('#tamaño :selected').text();

    var vacunaList = [];

    $('#vacuna :selected').each(function () {
        var vacuna = new Object();
        vacuna.id = $(this).val();
        vacuna.nombre = $(this).text();
        vacunaList.push(vacuna);
    });

//    for (var i = 0; i < $('#vacuna').val().length; i++) {
//        var vacuna = new Object();
//        vacuna.id = $('#vacuna').val()[i];
//        vacunaList.push(vacuna);

    var fotoRuta = null;
    $(".imagenPerro").each(function () {
        fotoRuta = $(this).attr('src');
    });
    console.log(fotoRuta);

    var dueño = null;

    var perro = new Object();
    perro.nombre = $('#nombre').val();
    perro.raza = raza;
    perro.tamaño = tamaño;
    perro.vacunacionList = vacunaList;
    perro.fotoRuta = fotoRuta;
    perro.dueño = dueño;
    perro.comentario = $('#comentario').val();
    return perro;
}

