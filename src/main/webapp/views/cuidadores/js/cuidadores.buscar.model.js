

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
        },
        error: function () {
            idElim = 0;
            alert('El cuidador no pudo ser eliminado.');
        }
    });
}





function postReserva() {

    var reserva = getReservaDesdeForm();
    $.ajax({
        type: "POST",
        url: '/api/reservas',
        data: JSON.stringify(reserva),
        contentType: "application/json",
        success: function () {
            console.log("exito crear reserva");
            //$('#modalReserva').modal('close');
            $.toast({
                heading: 'Success',
                text: 'Exito al crear nueva reserva. Refrescar la pagina para verla',
                showHideTransition: 'slide',
                icon: 'success'
            });
            //location.reload();

        },
        error: function () {
            console.log("error crear reserva");
            $.toast({
                heading: 'Error',
                text: 'Error al crear nueva reserva.',
                showHideTransition: 'fade',
                icon: 'error'
            });
        }
    });
}



function obtenerPerros() {
    var url = "/api/perros";
    $.getJSON(url, function (datos) {
        llenarSelect('#perro', datos);
    });
}

function obtenerProvincias() {
    var url = "/api/provincias";
    $.getJSON(url, function (datos) {
        llenarSelect('#busquedaProv', datos);
    });
}




function buscarCuidadores() {
    var idLocalidad=$('#idLocalidad').val();
    $('#listaCuidadores').empty();
    var url = "/api/cuidadores/localidades/"+idLocalidad;
    $.getJSON(url, function (datos) {
        generarCuidadores(datos);
    });
    $('#buscadores').show();
}

