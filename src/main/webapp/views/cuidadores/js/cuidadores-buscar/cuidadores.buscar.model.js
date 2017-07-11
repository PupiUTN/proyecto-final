


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
        success:
             exitoEliminar(btnEliminar, idElim)
        ,
        error:
            idElim = fracasoEliminar(idElim)


    });
}



function obtenerProvinciasAmostrar() {
    var url = "/api/provincias";

    $.getJSON(url, function (datos) {
        llenarSelectCuidadores('#busquedaProv', datos);
    });

}





function  getcuidadorxLocalidad(idLocalidad)
{
    $('#listaCuidadores').empty();
    var url = "/api/cuidadores/localidades/" + idLocalidad;
    $.getJSON(url, function (datos) {
        generarCuidadoresaMostrar(datos);
        mensaje(datos);

    });



}