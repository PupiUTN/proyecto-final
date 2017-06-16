function getEventos() {
    console.log("getPerros() - Index");
    var url = "/api/perros";
    $.getJSON(url, function (datos) {
        generarPerros(datos);
    });
}

function generarPerros(jsonArray) {
    var arrayLength = jsonArray.length;
    for (var i = 0; i < arrayLength; i++) {
        //existe un problema con los espacios, entonces al html lo copiamos en la barra url del explorador y luego lo cortamos para tenr bien el formato
        var url;
        console.log(jsonArray[i].fotoRuta);
        if (jsonArray[i].fotoRuta === null) {
            url = '/img/dog-1.jpg';
        } else {
            url = jsonArray[i].fotoRuta;
        }
        var itmeList = '\
    \<li class="collection-item avatar"> \n\
    <img src="'+url+'" alt="" class="circle"> \n\
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
        <div class="secondary-content"> \n\
        <a href="#!" >\n\
        <i class="material-icons">delete</i>\n\
        </a> <br> \n\
        <a href="#!" >\n\
        <i class="material-icons">edit</i>\n\
        </a> </div> \n\
</li>\
';

        $('#perroList').append(itmeList);
    }


}

function mostarFormNuevoPerro() {
    $('#nuevoPerro').show();
}


$('#guardarPerro').submit(function () {
    postPerro();
    return false;
});


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
function getPerroDesdeForm() {
    var raza = new Object();
    raza.id = $('#idRaza').val();
    raza.nombre = $('#raza').val();

    var tamaño = new Object();
    tamaño.id = $('#tamaño').val();
    tamaño.nombre = $('#tamaño :selected').text();

    var vacunaList = [];

    $('#vacuna :selected').each(function () {
        var vacuna = new Object();
        vacuna.id = $(this).val();
        vacuna.nombre = $(this).text();
        vacunaList.push(vacuna);
    });

//    for (var i = 0; i < $('#vacuna').val().length; i++) {
//        var vacuna = new Object();
//        vacuna.id = $('#vacuna').val()[i];
//        vacunaList.push(vacuna);

    var fotoRuta = null;
    $(".imagenPerro").each(function () {
        fotoRuta = $(this).attr('src');
    });
    console.log(fotoRuta);
    
    var dueño = null;

    var perro = new Object();
    perro.nombre = $('#nombre').val();
    perro.raza = raza;
    perro.tamaño = tamaño;
    perro.vacunacionList = vacunaList;
    perro.fotoRuta = fotoRuta;
    perro.dueño = dueño;
    perro.comentario = $('#comentario').val();
    return perro;
}



window.onload = function () {
    $('#nuevoPerro').hide();
    obtenerRazas();
    obtenerTamaños();
    obtenerVacunas();
    getEventos();
    $('select').material_select();
};

function obtenerRazas() {
    $('#raza').easyAutocomplete({
        url: "/api/razas/",
        placeholder: "Escriba raza",
        getValue: "nombre",
        minCharNumber: 3,
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

function llenarSelect(idSelect, jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        $(idSelect).append('<option value="' + jsonArray[i].id + '">' + jsonArray[i].nombre + '</option>');
        $(idSelect).prop('selectedIndex', -1);
        $('select').material_select();
    }
}

var imagenes = [];
/* global e */
function mostrarImagen(pathImagen) {
    var pos = pathImagen.lastIndexOf("/");
    var nombreImagen;
    if (pos > 0) {
        nombreImagen = pathImagen.substr(pos + 1);
    } else {
        nombreImagen = pathImagen;
    }
    if ((/\.(jpg|png|gif)$/i).test(nombreImagen)) {
        if (imagenes.length === 0) {
            $('#contenedorImagen').append('<img src="' + pathImagen + '" height="100" width="100"  class="imagenPerro" alt="Imagen previsualizada">');
            imagenes.push(pathImagen);
        } else {
            console.log("error agregar imagen");
            $.toast({
                heading: 'Error',
                text: 'Ya hay 1 imagen agregada.',
                showHideTransition: 'fade',
                icon: 'error'
            });
        }
    } else {
        console.log("error agregar imagen");
        $.toast({
            heading: 'Error',
            text: 'El archivo a agregar no es una imagen.',
            showHideTransition: 'fade',
            icon: 'error'
        });
    }
}
//$('#muestraImagen').attr('src', window.URL.createObjectURL($('#imagen').get(0).files.item(0)));

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

        $('#imageFile').empty();
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

        $('#imageFile').empty();
    }


});

$('#imageButton').on('click', function () {
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
});