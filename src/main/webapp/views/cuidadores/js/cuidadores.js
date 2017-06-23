window.onload = function () {
    getCuidadores();
    $('select').material_select();
};

function getCuidadores() {
    console.log("getCuidadores()");
    var url = "/api/cuidadores";
    $.getJSON(url, function (datos) {
        console.log(datos);
        generarCuidadores(datos);
    });
}

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


$('.reserva').on('click', function () {
    var id = $('.idCuidador').eq(($('.reserva').index(this))).val();
    console.log(id);
});


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

function getCuidadorDesdeForm() {
    var provincia = {};
    provincia.id = $('#busquedaProv').val();
    provincia.nombre = $('#busquedaProv :selected').text();

    var dir = {};
    dir.nombre = $('#direccion').val();
    var localidad = {};
    localidad.nombre = $('#localidad').val();
    localidad.id = $('#idLocalidad').val();
    localidad.provincia = provincia;
    dir.localidad = localidad;
    var fotosList = [];
    var i = 0;
    $(".imagenCuidador").each(function () {
        var imagen = {};
        imagen.url = $(this).attr('src');
        fotosList[i] = imagen;
        i++;
    });
    var cuidador = {};
    cuidador.nombre = $('#nombre').val();
    cuidador.email = $('#email').val();
    cuidador.direccion = dir;
    cuidador.telefono = $('#telefono').val();
    cuidador.cantidadMaxDePerros = $('#maxPerros').val();
    cuidador.listaImagenes = fotosList;
    return cuidador;
}

var imagenes = [];
/* global e */

function mostarFormNuevoCuidador() {
    $('#nuevoCuidador').toggle();
}



/*$('#guardarCuidador').submit(function () {
 
 });*/

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


function validarFormualrio() {
    //validar
    if (validarEmail($('#email'))){
        return false;
    }
    $('#submit_handle').click();
}

//option A
$("form").submit(function (e) {
    e.preventDefault();
});

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
    imagenes = [];
}

function mostrarImagen(pathImagen) {
    var pos = pathImagen.lastIndexOf("/");
    var nombreImagen;
    if (pos > 0) {
        nombreImagen = pathImagen.substr(pos + 1);
    } else {
        nombreImagen = pathImagen;
    }
    $('#contenedorImagen').append('<img src="' + pathImagen + '" height="100" width="100"  class="imagenPerro" alt="Imagen previsualizada">');
    imagenes.push(pathImagen);
}
//$('#muestraImagen').attr('src', window.URL.createObjectURL($('#imagen').get(0).files.item(0)));


window.onload = function () {
    getCuidadores();
    obtenerProvincias();
    $('select').material_select();
};

$(".letras").keydown(function (e) {
// Allow: backspace, delete, tab, escape, enter, shift and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 16, 32]) !== -1 ||
            // Allow: Ctrl+A, Command+A
                    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                    // Allow: home, end, left, right, down, up
                            (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a letter and stop the keypress
            if ((e.keyCode < 65 || e.keyCode > 90)) {
                e.preventDefault();
            }
        });

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
    $('#localidad').val("");
    $('#localidadDiv').show();
    $('#localidad').easyAutocomplete({
        url: "/api/provincias/" + idProv + "/localidades",
        placeholder: "Localidad",
        getValue: "nombre",
        minCharNumber: 3,
        list: {
            onSelectItemEvent: function () {
                var value = $("#localidad").getSelectedItemData().id;
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

$('#imageFile').on('change', function () {

    var file = this.files[0];
    console.log(file);
    if (file.size > 1048576) {
        $.toast({
            heading: 'Error',
            text: 'Superaste el tamano maximo de 1MB.',
            showHideTransition: 'fade',
            icon: 'error'
        });
        return;
    }

    var regexExtensionValidator = /(\.jpg|\.jpeg|\.png)$/i;
    if (!regexExtensionValidator.exec(file.name.toLocaleLowerCase())) {
        $.toast({
            heading: 'Error',
            text: 'Extension no soportada.',
            showHideTransition: 'fade',
            icon: 'error'
        });
    }

    console.log(imagenes);
});

$('#imageButton').on('click', function () {
    if (imagenes.length <= 3) {
        console.log($('#imageFile').val());
        var file = $('#imageFile').val();
        var regexExtensionValidator = /(\.jpg|\.jpeg|\.png)$/i;
        if (regexExtensionValidator.exec(file)) {
            $.ajax({
                // Your server script to process the upload
                url: '/api/file/',
                type: 'POST',

                // Form data
                data: new FormData($('form')[1]),
                // Tell jQuery not to process data or worry about content-type
                // You *must* include these options!
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    console.log(data);
                    mostrarImagen(data);


                }
            });
        } else {
            $.toast({
                heading: 'Error',
                text: 'Extension no soportada.',
                showHideTransition: 'fade',
                icon: 'error'
            });
        }
    } else {
        console.log("error agregar imagen");
        $.toast({
            heading: 'Error',
            text: 'Ya hay 4 imágenes agregadas.',
            showHideTransition: 'fade',
            icon: 'error'
        });
    }
});

$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute

});
