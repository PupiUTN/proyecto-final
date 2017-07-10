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