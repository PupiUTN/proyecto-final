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


$(document).ready(function () {

    $(".numero").keydown(function (e) {
// Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});
$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute

});
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});


function mostrarFormNuevaVacuna() {
    $('#nuevaVacuna').toggle();
}

$('#guardarVacuna').submit(function () {
    postVacuna();
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
            $('#nuevaVacuna').hide();
            $.toast({
                heading: 'Success',
                text: 'Exito al crear nueva vacuna. Refrescar la pagina para verla',
                showHideTransition: 'slide',
                icon: 'success'
            });
            location.reload();
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
