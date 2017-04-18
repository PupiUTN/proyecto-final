function getPerros(hostURL) {
    console.log("getPerros() - Index");
    var url = hostURL + "api/perro";
    $.getJSON(url, function (datos) {
        generarPerros(datos);
    });
}

function generarPerros(jsonArray) {
    var arrayLength = jsonArray.length;
    for (var i = 0; i < arrayLength; i++) {
        
        var myhtml = '<li class="collection-item avatar"> \n\
<img src="img/dog-1.jpg" alt="" class="circle"> \n\
<span class="title"> \n\
<b>' + jsonArray[i].tamanio.nombre +'</b></span> \n\
<div class="row"> \n\
<div class="col s12 m6"> \n\
<p> Raza: '+ jsonArray[i].raza.n+' <br> Tamanio: S <br> \n\
Vacunacion: Rabia <br> </p> \n\
</div> <div class="col s12 m6"> \n\
<p> Comentario: Callerjero<br> </p> </div> </div> \n\
<div class="secondary-content"> <a href="#!" >\n\
<i class="material-icons">delete</i></a> <br> \n\
<a href="#!" ><i class="material-icons">edit</i></a> </div> </li>';
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
            Vacunacion: ' + jsonArray[i].vacunacionList[0].nombre + ' <br>\n\
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


$('#nuevoPerroForm').submit(function () {
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


    var vacuna = new Object();
    vacuna.nombre = $('#vacuna').val();

    var vacunaList = [];
    vacunaList.push(vacuna);

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
    getPerros(hostURL);
}