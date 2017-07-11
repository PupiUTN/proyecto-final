/**
 * Created by agile on 10/07/17.
 */
function postImageToServer() {
    return $.ajax({
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
    });

}

function getSizes() {
    var url = "/api/tamaños";
    return $.getJSON(url);
}

function getVacunas() {
    var url = "/api/vacunas";
    return $.getJSON(url);
}

function getEventos() {
    var url = "/api/perros";
    return $.getJSON(url);
}

function getRazas() {
    var url = "/api/razas";
    return $.getJSON(url);
}

function postPerro(perro) {
    if (perro === false)
        return;
    return $.ajax({
        type: "POST",
        url: '/api/perros',
        data: JSON.stringify(perro),
        contentType: "application/json"
    });
}
