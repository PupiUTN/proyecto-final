/**
 * Created by fbackhaus on 10/7/17.
 */
$('.reserva').on('click', function () {
    var id = $('.idCuidador').eq(($('.reserva').index(this))).val();
    console.log(id);
});
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
var btnEliminar;
var idElim;
var imagenes = [];

function getCuidadorDesdeForm() {
    var provincia = {};
    provincia.id = $('#busquedaProv').val();
    provincia.nombre = $('#busquedaProv :selected').text();

    var dir = {};
    dir.nombre = $('#direccion').val();
    var localidad = {};
    localidad.nombre = $('#localidad').val();
    localidad.id = $('#idLocalidad').val();
    localidad.provincia = provincia;
    dir.localidad = localidad;
    var fotosList = [];
    var i = 0;
    $(".imagenCuidador").each(function () {
        var imagen = {};
        imagen.url = $(this).attr('src');
        fotosList[i] = imagen;
        i++;
    });
    var cuidador = {};
    cuidador.nombre = $('#nombre').val();
    cuidador.email = $('#email').val();
    cuidador.direccion = dir;
    cuidador.telefono = $('#telefono').val();
    cuidador.cantidadMaxDePerros = $('#maxPerros').val();
    cuidador.listaImagenes = fotosList;
    return cuidador;
}
$("form").submit(function (e) {
    //e.preventDefault();
    console.log('cuidador');
    postCuidador();
});


function llenarSelect(idSelect, jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        $(idSelect).append('<option value="' + jsonArray[i].id + '">' + jsonArray[i].nombre + '</option>');
        $(idSelect).prop('selectedIndex', -1);
        $('select').material_select();
    }
}

function mostrarLocalidades() {
    var idProv = $('#busquedaProv').val();
    $('#localidad').val("");
    $('#localidadDiv').show();
    $('#localidad').easyAutocomplete({
        url: "/api/provincias/" + idProv + "/localidades",
        placeholder: "Localidad",
        getValue: "nombre",
        minCharNumber: 3,
        list: {
            onSelectItemEvent: function () {
                var value = $("#localidad").getSelectedItemData().id;
                $("#idLocalidad").val(value);
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
                callback: function () {
                }
            },

            hideAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function () {
                }
            }
        }
    });
}