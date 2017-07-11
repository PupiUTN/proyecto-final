/**
 * Created by fbackhaus on 10/7/17.
 */


function generarCuidadores(jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        var url;
        //console.log
        if (jsonArray[i].listaImagenes.length === 0) {
            url = '/img/no-avatar.png';
        } else {
            url = jsonArray[i].listaImagenes[0].url;
        }
        //existe un problema con los espacios, entonces al html lo copiamos en la barra url del explorador y luego lo cortamos para tenr bien el formato
        var cuidador = '\
<div class="col s12">\n\
    <div class="card horizontal blue-grey darken-1 white-text hoverable">\n\
        <div class="card-image col s3 ">\n\
            <img src="' + url + '"> \n\
        </div> \n\
        <div class="card-stacked"> \n\
            <div class="card-content"> \n\
            <span class="card-title">' + jsonArray[i].nombre + ' \n\
            <a href="#!"><span id="btnEliminar' + jsonArray[i].id + '" data-target="modalEliminar" onclick="eliminarCuidador(' + jsonArray[i].id + ')" class=" new badge btn waves-effect waves-light orange accent-2 black-text" data-badge-caption="Eliminar" ></span>\n\
            </a> \n\
            </span> \n\
            <div class="row"> \n\
                <div class="col s12 m6"> \n\
                <p> <i class="material-icons black-text">phone</i> ' + jsonArray[i].telefono + '</p> \n\
                <p> <i class="material-icons black-text">email</i> ' + jsonArray[i].email + '</p> \n\
                </div> \n\
                <div class="col s12 m6"> \n\
                <p> <i class="material-icons black-text">location_on</i>' + jsonArray[i].direccion.nombre + ', ' + jsonArray[i].direccion.localidad.nombre + ', ' + jsonArray[i].direccion.localidad.provincia.nombre + '</p> \n\
                <p> <i class="material-icons black-text">info</i>Max perros: ' + jsonArray[i].cantidadMaxDePerros + ' </p> \n\
                </div> \n\
                </div> \n\
            </div> \n\
        </div> \n\
    </div> \n\
</div>';
        $('#listaCuidadores').append(cuidador);
    }
}
function getCuidadores() {
    console.log("getCuidadores()");
    var url = "/api/cuidadores";
    $.getJSON(url, function (datos) {
        console.log(datos);
        generarCuidadores(datos);
    });
}

function deleteCuidador() {
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


function postCuidador() {
    var cuidador = getCuidadorDesdeForm();
    console.log(cuidador);
    console.log(JSON.stringify(cuidador));
    $.ajax({
        type: "POST",
        url: '/api/cuidadores',
        data: JSON.stringify(cuidador),
        contentType: "application/json",
        success: function () {
            limpiarCampos();
            console.log("exito crear cuidador");
            $('#nuevoCuidador').hide();
            $.toast({
                heading: 'Success',
                text: 'Exito al crear nuevo cuidador. Refrescar la pagina para verlo',
                showHideTransition: 'slide',
                icon: 'success'
            });
            // location.reload();
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
    $(':input', '#myform')
        .removeAttr('checked')
        .removeAttr('selected')
        .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
        .val('');
}

function obtenerProvincias() {
    var url = "/api/provincias";
    $.getJSON(url, function (datos) {
        llenarSelect('#busquedaProv', datos);
    });
}