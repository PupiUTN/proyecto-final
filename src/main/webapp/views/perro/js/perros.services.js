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


$('#guardarPerro').submit(function () {
    postPerro();
    return false;
});

function obtenerRazas() {
    $('#raza').easyAutocomplete({
        url: "/api/razas/",
        placeholder: "Escriba raza",
        getValue: "nombre",
        minCharNumber: 3,
        list: {
            onSelectItemEvent: function () {
                var value = $("#raza").getSelectedItemData().id;
                $("#idRaza").val(value);
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
                callback: function () {}
            },

            hideAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function () {}
            }
        }
    });
}


