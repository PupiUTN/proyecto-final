/**
 * Created by gabriellorenzatti on 16/6/17.
 */




window.onload = function () {
    $('select').material_select();

    obtenerProv();

};



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



$('#ordenarPorCantidad').on('click', function () {
    var listaCuidadoresOrdenada;
    $('#listaCuidadores').empty();
    var ordenarPorCantidadObject = $('#ordenarPorCantidad');

    if (ordenarPorCantidadObject.data("sense") === 'asc') {
        listaCuidadoresOrdenada = ordenarpPorCantidadAsc(listaCuidadoresGlobal);
        ordenarPorCantidadObject.data("sense", "desc");
        ordenarPorCantidadObject.children('i').text('thumb_up');
    } else {
        listaCuidadoresOrdenada = ordenarpPorCantidadDesc(listaCuidadoresGlobal);
        ordenarPorCantidadObject.data("sense", "asc");
        ordenarPorCantidadObject.children('i').text('thumb_down');
    }
    generarCuidadoresaMostrar(listaCuidadoresOrdenada);

});



var listaCuidadoresGlobal;
function generarCuidadoresaMostrar(jsonArray) {
    listaCuidadoresGlobal = jsonArray;
    for (var i = 0; i < jsonArray.length; i++) {
        var url;
        //console.log
         url = urlImagen(jsonArray,i);
        mostrarCuidadores(jsonArray,i,url);
    }
}

var urlImagen = function (jsonArray,i) {

    if (jsonArray[i].listaImagenes.length === 0) {
        return   '/img/no-avatar.png';
    } else {
        return jsonArray[i].listaImagenes[0].url;
    }
};

function mostrarCuidadores(jsonArray, i,url) {

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

function llenarSelectCuidadores(idSelect, jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        $(idSelect).append('<option value="' + jsonArray[i].id + '">' + jsonArray[i].nombre + '</option>');
        $(idSelect).prop('selectedIndex', -1);
        $('select').material_select();
    }
}
function mostrarLocalidades() {
    var idProv = $('#busquedaProv').val();
    $('#busquedaLocal').val("");
    $('#busquedaDiv').show();

    busquedaLocal(idProv);

}


function busquedaLocal (idProv)
{
    $('#busquedaLocal').easyAutocomplete({
        url: "/api/provincias/" + idProv + "/localidades",
        placeholder: "Localidad",
        getValue: "nombre",
        minCharNumber: 3,
        adjustWidth: false,
        list: {
            onSelectItemEvent: function () {
                var value = $("#busquedaLocal").getSelectedItemData().id;
                $("#idLocalidad").val(value);
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
                callback: function () {}
            },

            hideAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function () {}
            }
        }
    });


}


$('#busquedaLocal').on('focus', function () {
    $(this).val('');
    $('#idLocalidad').val('');
});