/**
 * Created by fbackhaus on 16/7/17.
 */

var pupi = new Vue({
    el: '#vacunas',
    data: {
        listaVacunas: getVacunas(),
        titulo: "El pupi"
    }
});

function getVacunas() {
    console.log($('#listaVacunas'));
    var url = "/api/vacunas";
    $.getJSON(url, function (datos) {
        console.log(datos);
        return datos;
    });
}

