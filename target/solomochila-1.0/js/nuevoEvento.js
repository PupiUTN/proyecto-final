//    {
//   "boulders" : [ {
//      "numero" : 2,
//      "puntaje" : 20
//   }, {
//
//      "numero" : 3,
//      "puntaje" : 30
//   }, {
//
//      "numero" : 5,
//      "puntaje" : 50
//   }, {
//
//      "numero" : 4,
//      "puntaje" : 40
//   }, {
//      "numero" : 1,
//      "puntaje" : 10
//   } ],
//   "categorias" : [ {
//      "categoria" : "Avanzados"
//   }, {
//      "categoria" : "Principiantes"
//
//   } ],
//   "direccion" : "Chubut",
//   "fecha" : "2019-03-10T00:00:00-03:00",
//   "modalidad" : {
//      "nombre" : "Bloque"
//   },
//   "nombre" : "Block Fest Primaveral",
//   "organizador" : {
//      "email" : "lucio.boretto@gmail.com"
//   },
//   "precioInscripcion" : 10.0
//}

$('#formNuevoEvento').submit(function () {
    enviarEvento();
    return false;
});


function enviarEvento() {
    postEvento(armarJsonDesdeFormulario());
}


function armarJsonDesdeFormulario() {
    var categorias = [];
    $('#selectCategorias :selected').each(function (i, selected) {
        categorias[i] = new Categoria($(selected).text());
    });
    var nombreModalidad = $('#selectModalidades').find(":selected").text();

    var modalidad1 = new Modalidad(nombreModalidad);
    var nombreEvento = $('#nombre').val();
    var direccionEvento = $('#direccion').val();
    var precioEvento = $('#precioInscripcion').val();
    var numeroBoulders = parseInt($('#numeroBoulders').val());
    var puntajeBoulder = parseInt($('#puntajeBoulder').val());
    console.log(numeroBoulders);
    console.log(puntajeBoulder);
    var year = $('.datepicker').pickadate('picker').get('highlight', 'yyyy');
    var day = $('.datepicker').pickadate('picker').get('highlight', 'dd');
    var month= $('.datepicker').pickadate('picker').get('highlight', 'mm');
    var fechaCadena = year+"-"+month+"-"+day+"T00:00:00-03:00";

    var $input = $('.datepicker').pickadate();
    console.log($input);

// Use the picker object directly.
    var picker = $input.pickadate('date');
    console.log(picker);
    var boulders = generarVectorDeBoulder(numeroBoulders, puntajeBoulder);
    var evento = new Evento(nombreEvento, fechaCadena, direccionEvento, precioEvento, modalidad1, boulders, categorias);
    console.log(categorias);
    console.log(modalidad1);
    console.log(boulders);
    console.log(evento);
    return evento;
}
function fecha() {

    
}
function armarJsonFijo() {
    var login = JSON.parse(sessionStorage.getItem("login"));
    var organizador = new Organizador("lucio.boretto@gmail.com");

    var categoria1 = new Categoria("mujeres");
    var categoria2 = new Categoria("hombres");
    var categorias = [];
    categorias[0] = categoria1;
    categorias[1] = categoria2;

    var modalidad1 = new Modalidad("festival");
    var boulders = generarVectorDeBoulder(20, 6);
    var evento = new Evento("test", "2019-03-10T00:00:00-03:00", "La Red", 99.5, modalidad1, boulders, categorias);
    console.log(organizador);
    console.log(categorias);
    console.log(modalidad1);
    console.log(boulders);
    console.log(evento);
    return evento;
}

function generarVectorDeBoulder(cantidadBoulder, puntajeBoulder) {
    var boulders = [];
    for (var i = 0; i < cantidadBoulder; i++) {
        boulders[i] = new Boulder(i, puntajeBoulder);
    }
    return boulders
}

function postEvento(evento) {
    $.ajax({
        type: "POST",
        url: hostURL + 'api/organizadores/lucio.boretto@gmail.com' + '/eventos/',
        data: JSON.stringify(evento),
        contentType: "application/json",
        success: function () {
            console.log("exito crear evento");
        },
        error: function () {
            console.log("error crear evento");
        }
    });
}

function Evento(nombre, fecha, direccion, precioInscripcion, modalidad, boulders, categorias) {
    this.nombre = nombre;
    this.fecha = fecha;
    // this.hora = hora;
    this.direccion = direccion;
    this.precioInscripcion = precioInscripcion;
    this.modalidad = modalidad;
    this.boulders = boulders;
//    this.organizador = organizador;
    this.categorias = categorias
}

function Organizador(email) {
    this.email = email;
}

function Categoria(categoria) {
    this.categoria = categoria;
}

function Modalidad(nombre) {
    this.nombre = nombre;
}

function Boulder(numero, puntaje) {
    this.numero = numero;
    this.puntaje = puntaje;
}
