function getEventos() {
    console.log("getPerros() - Index");
    var url = "/api/perros";
    $.getJSON(url, function (datos) {
        generarPerros(datos);
    });
}

function postPerro() {
    var perro = getPerroDesdeForm();
    $.ajax({
        type: "POST",
        url: '/api/perros',
        data: JSON.stringify(perro),
        contentType: "application/json",
        success: function () {
            console.log("exito crear perro");
            $('#nuevoPerro').hide();
            $.toast({
                heading: 'Success',
                text: 'Exito al crear nuevo perro. Refrescar la pagina para verlo',
                showHideTransition: 'slide',
                icon: 'success'
            });
            //location.reload();

        },
        error: function () {
            console.log("error crear perro");
            $.toast({
                heading: 'Error',
                text: 'Error al crear nuevo perro.',
                showHideTransition: 'fade',
                icon: 'error'
            })
        }
    });

}

function obtenerTamaños() {
    var url = "/api/tamaños";
    $.getJSON(url, function (datos) {
        llenarSelect('#tamaño', datos);
    });
}

function obtenerVacunas() {
    var url = "/api/vacunas";
    $.getJSON(url, function (datos) {
        llenarSelect('#vacuna', datos);
    });
}

