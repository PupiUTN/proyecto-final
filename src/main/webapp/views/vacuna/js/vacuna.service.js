/**
 * Created by fbackhaus on 10/7/17.
 */
function putVacuna() {
    var vacuna = getVacunaDesdeForm();
    if (vacuna['nombre'].isEmpty()) {
        $.toast({
            heading: 'Error',
            text: 'El nombre de la vacuna no puede estar vacío',
            showHideTransition: 'slide',
            icon: 'error'
        });
    }
    else {
        vacuna['id'] = idEdit;
        console.log(JSON.stringify(vacuna));
        $.ajax({
            type: "PUT",
            url: '/api/vacunas',
            data: JSON.stringify(vacuna),
            contentType: "application/json",
            success: function () {
                console.log("Exito al editar vacuna");
                $.toast({
                    heading: 'Success',
                    text: 'Exito al editar la vacuna',
                    showHideTransition: 'slide',
                    icon: 'success'
                });
                getVacunas();
                $('#editarVacuna').hide();
                $('#guardarVacuna').show();
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
}
function getVacunas() {
    console.log($('#listaVacunas'));
    var url = "/api/vacunas";
    $.getJSON(url, function (datos) {
        generarVacunas(datos);
    });
}


function postVacuna() {
    var vacuna = getVacunaDesdeForm();
    if (vacuna['nombre'].isEmpty()) {
        $.toast({
            heading: 'Error',
            text: 'El nombre de la vacuna no puede estar vacío',
            showHideTransition: 'slide',
            icon: 'error'
        });
    }
    else {
        console.log(JSON.stringify(vacuna));
        $.ajax({
            type: "POST",
            url: '/api/vacunas',
            data: JSON.stringify(vacuna),
            contentType: "application/json",
            success: function () {
                console.log("Exito al guardar vacuna");
                $.toast({
                    heading: 'Success',
                    text: 'Exito al crear nueva vacuna',
                    showHideTransition: 'slide',
                    icon: 'success'
                });
                getVacunas();

            },
            error: function () {
                console.log("Error al guardar vacuna");
                $.toast({
                    heading: 'Error',
                    text: 'Error al crear nueva vacuna.',
                    showHideTransition: 'fade',
                    icon: 'error'
                });
            }
        });
    }
}

function deleteVacuna() {
    var url = "/api/vacunas"
    $.ajax({
        url: url + '/' + idElim,
        type: 'DELETE',
        success: function () {
            console.log("Exito al eliminar vacuna");
            $.toast({
                heading: 'Success',
                text: 'Exito al eliminar la vacuna',
                showHideTransition: 'slide',
                icon: 'success'
            });
            btnEliminar.closest('div').remove();
        },
        error: function () {
            console.log("Error al eliminar vacuna");
            $.toast({
                heading: 'Error',
                text: 'Error al eliminar nueva vacuna.',
                showHideTransition: 'fade',
                icon: 'error'
            });
        }
    });
}