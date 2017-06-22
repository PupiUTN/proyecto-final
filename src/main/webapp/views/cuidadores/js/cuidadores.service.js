
function getCuidadores() {
    console.log("getCuidadores()");
    var url = "/api/cuidadores";
    $.getJSON(url, function (datos) {
        console.log(datos);
        generarCuidadoresView(datos);
    });
}





var btnEliminar;
var idElim;
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

function postCuidador() {
    if (validarEmail($('#email'))) {
        var cuidador = getCuidadorDesdeForm();
        console.log(cuidador);
        console.log(JSON.stringify(cuidador));
        $.ajax({
            type: "POST",
            url: '/api/cuidadores',
            data: JSON.stringify(cuidador),
            contentType: "application/json",
            success: function () {
                console.log("exito crear cuidador");
                $('#nuevoCuidador').hide();
                $.toast({
                    heading: 'Success',
                    text: 'Exito al crear nuevo cuidador. Refrescar la pagina para verlo',
                    showHideTransition: 'slide',
                    icon: 'success'
                });
                location.reload();
            },
            error: function () {
                console.log("error crear cuidador");
                $.toast({
                    heading: 'Error',
                    text: 'Erro al crear nuevo cuidador.',
                    showHideTransition: 'fade',
                    icon: 'error'
                });
            }
        });
    }
}


function postReserva() {

    var reserva = getReservaDesdeFormCuidadores();
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






function obtenerProvincias() {
    var url = "/api/provincias";
    $.getJSON(url, function (datos) {
        llenarSelectCuidadores('#busquedaProv', datos);
    });
}


