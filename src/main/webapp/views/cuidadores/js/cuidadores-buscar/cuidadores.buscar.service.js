/**
 * Created by gabriellorenzatti on 21/6/17.
 */


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

function exitoEliminar (btnEliminar, idElim)
{
    btnEliminar.parent().parent().parent().parent().parent().parent().remove();
        console.log('Se borro cuidador con ID: ' + idElim);
        $.toast({
            heading: 'Success',
            text: 'Exito al borrar el cuidador',
            showHideTransition: 'slide',
            icon: 'success'
        });

}

function fracasoEliminar (idElim)
{
    idElim = 0;
    alert('El cuidador no pudo ser eliminado.');

    return idElim;

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


function mensaje(datos) {
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


}

function obtenerProv()
{
     obtenerProvinciasAmostrar();

    $('select').material_select();

}
