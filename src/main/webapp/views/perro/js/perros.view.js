/**
 * Created by agile on 10/07/17.
 */
function errorUploadingImageToServerMoreThan1() {
    console.log("error agregar imagen");
    $.toast({
        heading: 'Error',
        text: 'Ya hay 1 imagen agregada.',
        showHideTransition: 'fade',
        icon: 'error'
    });
}

function errorUploadingImageExtensionNotSupported() {
    $.toast({
        heading: 'Error',
        text: 'Extension no soportada.',
        showHideTransition: 'fade',
        icon: 'error'
    });
}

function errorPostPerro(ts) {
    console.log("error crear perro");
    console.log(ts.responseText);
    $.toast({
        heading: 'Error',
        text: 'Error al crear nuevo perro.',
        showHideTransition: 'fade',
        icon: 'error'
    });
}

function succesPostPerro() {
    console.log("exito crear perro");
    $.toast({
        heading: 'Success',
        text: 'Exito al crear nuevo perro. Refrescar la pagina para verlo',
        showHideTransition: 'slide',
        icon: 'success'
    });

}

function llenarSelect(idSelect, jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        $(idSelect).append('<option value="' + jsonArray[i].id + '">' + jsonArray[i].nombre + '</option>');
    }
    $(idSelect).prop('selectedIndex', -1);
    $('select').material_select();
}

function mostarFormNuevoPerro() {
    $('#nuevoPerro').show();
}

function mostrarImagen(pathImagen) {
    $('#contenedorImagen').append('<img src="' + pathImagen + '" height="100" width="100"  class="imagenPerro" alt="Imagen previsualizada">');
    isThereSomeImage = true;
}

function limpiarCampos() {
    $(':input', '#formCuidador')
        .removeAttr('checked')
        .removeAttr('selected')
        .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
        .val('');
    $(':input', '#imageForm')
        .removeAttr('checked')
        .removeAttr('selected')
        .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
        .val('');
    $('#contenedorImagen').empty();
    isThereSomeImage = false;
}

function showRazas(data) {
    $('#raza').easyAutocomplete({
        data: data,
        placeholder: "Escriba raza",
        getValue: "nombre",
        minCharNumber: 1,
        adjustWidth: false,
        list: {
            onSelectItemEvent: function () {
                var value = $("#raza").getSelectedItemData().id;
                $("#idRaza").val(value);
            },
            sort: {
                enabled: true
            },
            maxNumberOfElements: 10,
            match: {
                enabled: true
            },
            showAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function () {
                }
            },

            hideAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function () {
                }
            }
        }
    });
}

function generarPerros(jsonArray) {
    var arrayLength = jsonArray.length;
    for (var i = 0; i < arrayLength; i++) {
        //existe un problema con los espacios, entonces al html lo copiamos en la barra url del explorador y luego lo cortamos para tenr bien el formato
        var url;
        if (jsonArray[i].fotoRuta === null) {
            url = '/img/dog-1.jpg';
        } else {
            url = jsonArray[i].fotoRuta;
        }
        var itmeList = '\
    \<li class="collection-item avatar"> \n\
    <img src="' + url + '" alt="" class="circle"> \n\
    <span class="title"> \n\
    <b>' + jsonArray[i].nombre + '</b></span> \n\
    <div class="row"> \n\
        <div class="col s12 m6"> \n\
            <p> Raza: ' + jsonArray[i].raza.nombre + ' <br>\n\
            Tamaño: ' + jsonArray[i].tamaño.nombre + '<br>\n\
        Vacunación: ' + jsonArray[i].vacunacionList[0].nombre;
        if (jsonArray[i].vacunacionList.length > 1) {
            for (var j = 1; j < jsonArray[i].vacunacionList.length; j++) {
                itmeList += ', ' + jsonArray[i].vacunacionList[j].nombre;
            }
        }
        itmeList += '<br>\n\
            </p> \n\
        </div> \n\
        <div class="col s12 m6"> \n\
            <p> Comentario: ' + jsonArray[i].comentario + '<br>\n\
            </p> \n\
        </div> \n\
    </div> \n\
</li>\
';

        $('#perroList').append(itmeList);
    }


}