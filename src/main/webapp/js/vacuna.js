function getVacunas() {
    console.log("getVacunas()");
    var url = hostURL + "api/vacunas";
    $.getJSON(url, function (datos) {
        generarVacunas(datos);
    });
}

function generarVacunas(jsonArray) {

    for (var i = 0; i < jsonArray.length; i++) {
        var vacuna = '\
<div class="col s12">\n\
    <div class="card horizontal blue-grey darken-1 white-text hoverable">\n\
        <div class="card-stacked"> \n\
            <div class="card-content"> \n\
            <span class="card-title">' + jsonArray[i].nombre + ' \n\
            <a href="#!"><span id="btnEliminar' + jsonArray[i].id + '" data-target="modalEliminar" onclick="eliminarVacuna(' + jsonArray[i].id + ')" class=" new badge btn waves-effect waves-light orange accent-2 black-text" data-badge-caption="Eliminar" ></span>\n\
            </a> \n\
            </span> \n\
        </div> \n\
    </div> \n\
</div>';
        $('#listaVacunas').append(vacuna);
    }
}

$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute

});

function postVacuna() {
    var vacuna = getVacunaDesdeForm();
    console.log(vacuna);
    console.log(JSON.stringify(vacuna));
    $.ajax({
        type: "POST",
        url: hostURL + 'api/vacunas',
        data: JSON.stringify(vacuna),
        contentType: "application/json",
        success: function () {
            console.log("exito al guardar vacuna");
            $.toast({
                heading: 'Success',
                text: 'Exito al crear nueva vacuna',
                showHideTransition: 'slide',
                icon: 'success'
            });
            getVacunas()
        },
        error: function () {
            console.log("error al crear vacuna");
            $.toast({
                heading: 'Error',
                text: 'Error al crear nueva vacuna.',
                showHideTransition: 'fade',
                icon: 'error'
            });
        }
    });
}

function getVacunaDesdeForm() {
    var vacuna = new Object();
    vacuna.nombre = $('#nombre').val();
    return vacuna;
}

window.onload = function () {
    getVacunas();
};

var btnEliminar;
var idElim;
function eliminarVacuna(idEliminar) {
    var boton = "#btnEliminar" + idEliminar;
    idElim = idEliminar;
    console.log(boton);
    btnEliminar = $(boton);
    console.log(idElim);
}

function eliminarAJAX() {
    var url = hostURL + "api/vacunas"
    $.ajax({
        url: url + '?' + $.param({"Id": idElim}),
        type: 'DELETE',
        success: function () {
            btnEliminar.parent().parent().parent().parent().parent().parent().remove();
            console.log('Se borro la vacuna con ID: ' + idElim);
        },
        error: function () {
            idElim = 0;
            alert('La vacuna no pudo ser eliminada.');
        }
    });
}
