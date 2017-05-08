function getCuidadores() {
    console.log("getCuidadores()");
    var url = hostURL + "api/cuidadores";
    $.getJSON(url, function (datos) {
        generarCuidadores(datos);
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
    <div class="card horizontal blue-grey darken-1 white-text">\n\
        <div class="card-image">\n\
            <img src="img/'+ imagenesURL[i]+'"> \n\
        </div> \n\
        <div class="card-stacked"> \n\
            <div class="card-content"> \n\
            <span class="card-title">' + jsonArray[i].nombre + ' \n\
            <a href="#"><span class="new badge btn waves-effect waves-light orange accent-2 black-text" data-badge-caption="Eliminar"></span></a> \n\
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


getCuidadores();