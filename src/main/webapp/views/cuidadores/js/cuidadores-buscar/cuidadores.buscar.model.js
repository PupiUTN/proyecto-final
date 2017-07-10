


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
            $.toast({
                heading: 'Success',
                text: 'Exito al borrar el cuidador',
                showHideTransition: 'slide',
                icon: 'success'
            });
        },
        error: function () {
            idElim = 0;
            alert('El cuidador no pudo ser eliminado.');
        }
    });
}



function obtenerProvinciasAmostrar() {
    var url = "/api/provincias";
    $.getJSON(url, function (datos) {
        llenarSelectCuidadores('#busquedaProv', datos);
    });
}




function buscarCuidadores() {
    var idLocalidad = $('#idLocalidad').val();
    if (idLocalidad === "") {
        $.toast({
            heading: 'Error',
            text: 'Seleccione una provincia y luego una localidad para buscar',
            showHideTransition: 'fade',
            icon: 'error'
        });
        return;
    }

    getcuidadorxLocalidad(idLocalidad);


}

function  getcuidadorxLocalidad(idLocalidad)
{
    $('#listaCuidadores').empty();
    var url = "/api/cuidadores/localidades/" + idLocalidad;
    $.getJSON(url, function (datos) {
        generarCuidadoresaMostrar(datos);
        if (datos.length === 0) {
            $.toast({
                heading: 'Error',
                text: 'No existen cuidadores en esta localidad',
                showHideTransition: 'fade',
                icon: 'error'
            });
            $('#buscadores').hide();
        } else {
            $('#buscadores').show();
        }

    });



}