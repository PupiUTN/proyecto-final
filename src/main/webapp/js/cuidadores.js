function getCuidadores() {
    console.log("getCuidadores()");
    var url = hostURL + "api/cuidadores";
    $.getJSON(url, function (datos) {
        generarCuidadores(datos);
        eliminarCuidador();

    });
}

function generarCuidadores(jsonArray) {
    //esto esta hard codeado, se debe cambiar
    var imagenesURL = [];
    imagenesURL.push('cesar_200.jpg');
    imagenesURL.push('riquelme_200.jpg');
    imagenesURL.push('marcelo_200.jpg');
    imagenesURL.push('pope_200.jpg');
    imagenesURL.push('carrio_200.jpg');


    for (var i = 0; i < jsonArray.length; i++) {
        //existe un problema con los espacios, entonces al html lo copiamos en la barra url del explorador y luego lo cortamos para tenr bien el formato
        var cuidador = '\
<div class="col s12">\n\
    <div class="card horizontal blue-grey darken-1 white-text hoverable">\n\
        <div class="card-image">\n\
            <img src="img/' + imagenesURL[i] + '"> \n\
        </div> \n\
        <div class="card-stacked"> \n\
            <div class="card-content"> \n\
            <span class="card-title">' + jsonArray[i].nombre + ' \n\
            <a href="#!"><span data-target="modal1" class="eliminar new badge btn waves-effect waves-light orange accent-2 black-text" data-badge-caption="Eliminar" ></span></a> \n\
            </span> \n\
            <div class="row"> \n\
                <div class="col s12 m6"> \n\
                <p> <i class="material-icons black-text">phone</i> ' + jsonArray[i].telefono + '</p> \n\
                <p> <i class="material-icons black-text">email</i> ' + jsonArray[i].email + '</p> \n\
                </div> \n\
                <div class="col s12 m6"> \n\
                <p> <i class="material-icons black-text">location_on</i>' + jsonArray[i].direccion.nombre + '</p> \n\
                <p> <i class="material-icons black-text">info</i>Max perros: ' + jsonArray[i].cantidadMaxDePerros + ' </p> \n\
                </div> \n\
                </div> \n\
            </div> \n\
            <div class="card-action"> \n\
            <a href="#">Solicitar Reserva</a> \n\
            </div> \n\
        </div> \n\
    </div> \n\
</div>';

        $('#listaCuidadores').append(cuidador);


    }
}



function eliminarCuidador() {
    $('.eliminar').on('click', function () {
            
        var btnEliminar = $(this);
        $('#modal1').modal('open');
        $('#aceptarEliminar').on('click', function(){
            btnEliminar.parent().parent().parent().parent().parent().parent().remove(); 
        });

    });
}

$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    //$('.modal').modal();

});

$('.modal').modal({

    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute

}
);
var imagenes = [];
/* global e */

function mostarFormNuevoCuidador() {
    $('#nuevoCuidador').toggle();
}


$('#nuevoCuidador').submit(function () {
    //postPerro();
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (!emailRegex.test($('#email').val())) {
        console.log("error agregar cuidador");
        $.toast({
            heading: 'Error',
            text: 'El email ingresado no es válido.',
            showHideTransition: 'fade',
            icon: 'error'
        });
        return false;
    }
});


/*function postPerro() {
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
 
 }*/




function mostrarImagen() {
    var pathImagen = $('#URLImagen').val();
    var pos = pathImagen.lastIndexOf("/");
    var nombreImagen;
    if (pos > 0) {
        nombreImagen = pathImagen.substr(pos + 1);
    } else
    {
        nombreImagen = pathImagen;
    }
    if ((/\.(jpg|png|gif)$/i).test(nombreImagen))
    {
        if (imagenes.length <= 3)
        {
            $('#contenedorImagen').append('<img src="' + pathImagen + '" height="100" width="100" alt="Imagen previsualizada">');
            imagenes.push(pathImagen);
        } else {
            console.log("error agregar imagen");
            $.toast({
                heading: 'Error',
                text: 'Ya hay 4 imágenes agregadas.',
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
    //$('#muestraImagen').attr('src', window.URL.createObjectURL($('#imagen').get(0).files.item(0)));
}




window.onload = function () {
    $('#nuevoCuidador').hide();
    getCuidadores();


};

