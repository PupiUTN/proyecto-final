window.onload = function () {
    $('select').material_select();
};
var listaCuidadoresGlobal;
function generarCuidadores(jsonArray) {
    listaCuidadoresGlobal = jsonArray;
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
                <p> <i class="material-icons black-text">location_on</i>' + jsonArray[i].direccion.nombre + ', '+jsonArray[i].direccion.localidad.nombre+', '+jsonArray[i].direccion.localidad.provincia.nombre+'</p> \n\
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

window.onload = function () {
    obtenerProvincias();
    $('select').material_select();
};


function obtenerProvincias() {
    var url = "/api/provincias";
    $.getJSON(url, function (datos) {
        llenarSelect('#busquedaProv', datos);
    });
}

function llenarSelect(idSelect, jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        $(idSelect).append('<option value="' + jsonArray[i].id + '">' + jsonArray[i].nombre + '</option>');
        $('select').material_select();
    }
}



function mostrarLocalidades() {
    var idProv = $('#busquedaProv').val();
    $('#busquedaLocal').val("");
    $('#busquedaDiv').show();
    $('#busquedaLocal').easyAutocomplete({
        url: "/api/provincias/" + idProv + "/localidades",
        placeholder: "Localidad",
        getValue: "nombre",
        minCharNumber: 3,
        adjustWidth: false,
        list: {
            onSelectItemEvent: function() {
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

function buscarCuidadores() {
    var idLocalidad=$('#idLocalidad').val();
    if (idLocalidad == "") {
        $.toast({
            heading: 'Error',
            text: 'Seleccione una provincia y luego una localidad para buscar',
            showHideTransition: 'fade',
            icon: 'error'
        });
        return
    }
    $('#listaCuidadores').empty();
    var url = "/api/cuidadores/localidades/"+idLocalidad;
    $.getJSON(url, function (datos) {
        generarCuidadores(datos);
        if (datos.length == 0) {
            $.toast({
                heading: 'Error',
                text: 'No existen cuiadores en esta localidad',
                showHideTransition: 'fade',
                icon: 'error'
            });
            $('#buscadores').hide();
        } else {
            $('#buscadores').show();
        }

    });

}

$('#ordenarPorCantidad').on('click', function () {
    var listaCuidadoresOrdenada;
    $('#listaCuidadores').empty();
    var ordenarPorCantidadObject = $('#ordenarPorCantidad');

    if (ordenarPorCantidadObject.data("sense") == 'asc'){
        console.log("Ordeno asc");
        listaCuidadoresOrdenada = listaCuidadoresGlobal.sort(function(a, b) {
            return parseFloat(a.cantidadMaxDePerros) - parseFloat(b.cantidadMaxDePerros);
        });
        ordenarPorCantidadObject.data("sense", "desc");
        ordenarPorCantidadObject.children('i').text('thumb_up');


    }else {
        console.log("Ordeno desc");
        listaCuidadoresOrdenada = listaCuidadoresGlobal.sort(function(a, b) {
            return parseFloat(b.cantidadMaxDePerros) - parseFloat(a.cantidadMaxDePerros);
        });
        ordenarPorCantidadObject.data("sense", "asc");
        ordenarPorCantidadObject.children('i').text('thumb_down');



    }

    generarCuidadores(listaCuidadoresOrdenada);

});


$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute

});