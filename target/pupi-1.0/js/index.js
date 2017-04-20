function getEventos(hostURL) {
    console.log("getPerros() - Index");
    var url = hostURL + "api/perro";
    $.getJSON(url, function (datos) {
        generarPerros(datos);
    });
}

function generarPerros(jsonArray) {
    var arrayLength = jsonArray.length;
    for (var i = 0; i < arrayLength; i++) {
        //existe un problema con los espacios, entonces al html lo copiamos en la barra url del explorador y luego lo cortamos para tenr bien el formato
        var itmeList = '\
    \<li class="collection-item avatar"> \n\
    <img src="img/dog-1.jpg" alt="" class="circle"> \n\
    <span class="title"> \n\
    <b>' + jsonArray[i].nombre + '</b></span> \n\
    <div class="row"> \n\
        <div class="col s12 m6"> \n\
            <p> Raza: ' + jsonArray[i].raza.nombre + ' <br>\n\
            Tamanio: ' + jsonArray[i].tamanio.nombre + '<br>\n\
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


$('#nuevoPerro').submit(function () {
    postPerro();
    return false;
});


function postPerro() {
    var perro = getPerroDesdeForm();
    $.ajax({
        type: "POST",
        url: hostURL + 'api/perro',
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
                text: 'Erro al crear nuevo perro.',
                showHideTransition: 'fade',
                icon: 'error'
            })
        }
    });

}
function getPerroDesdeForm() {
    var raza = new Object();
    raza.nombre = $('#raza').val();

    var tamanio = new Object();
    tamanio.nombre = $('#tamanio').val();

    var vacunaList = [];
    for (var i = 0; i < $('#vacuna').val().length; i++) {
        var vacuna = new Object();
        vacuna.nombre = $('#vacuna').val()[i];
        vacunaList.push(vacuna);
    }

    var perro = new Object();
    perro.nombre = $('#nombre').val();
    perro.comentario = $('#comentario').val();
    perro.raza = raza;
    perro.tamanio = tamanio;
    perro.vacunacionList = vacunaList;
    return perro;

}



window.onload = function () {
    $('#nuevoPerro').hide();
    getEventos(hostURL);
    obtenerRazas(hostURL);
    obtenerTamanios(hostURL);
    obtenerVacunas(hostURL);
    $('select').material_select();
}

function obtenerRazas(hostURL) {
    var url = hostURL + "api/modelo.raza";
    $.getJSON(url, function (datos) {
        llenarSelect('#raza', datos);
    });
}

function obtenerTamanios(hostURL) {
    var url = hostURL + "api/modelo.tamanio";
    $.getJSON(url, function (datos) {
        llenarSelect('#tamanio', datos);
    });
}

function obtenerVacunas(hostURL) {
    var url = hostURL + "api/modelo.vacuna";
    $.getJSON(url, function (datos) {
        llenarSelect('#vacuna', datos);
    });
}

function llenarSelect(idSelect, jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        $(idSelect).append('<option value="' + jsonArray[i].nombre + '">' + jsonArray[i].nombre + '</option>')
        $('select').material_select();
    }
}

function mostrarImagen(){
    $('#muestraImagen').append('<img src="'+$('#imagen').val()+' height="200" width="200" alt="Imagen previsualizada">');
    }