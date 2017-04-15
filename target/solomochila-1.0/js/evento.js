var eventoActual;

function cargarInformacionEvento(eventos) {
    console.log("cargarInformacionEvento(eventos)" + eventos);
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    var idEvento = unescape(temp[1]);
    for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].id == idEvento) {
            eventoActual = eventos[i];
            break;
        }
    }
    $("#nombre").text(eventoActual.nombre);
    var fecha = new Date(eventoActual.fecha);
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    var cadenaFecha = dia + "-" + mes + "-" + anio;
    $("#fecha").text("Fecha: " + cadenaFecha);
    $("#direccion").text("Direccion: " + eventoActual.direccion);
    $("#precioInscripcion").text("Precio: $" + eventoActual.precioInscripcion);
    $("#modalidades").text("Modalidad: " + eventoActual.modalidad.nombre);
    var textoCategorias = "";
    for (var i = 0; i < eventoActual.categorias.length; i++) {
        textoCategorias += eventoActual.categorias[i].categoria;
    }
    
    $("#categorias").text("Categorias: " + textoCategorias);
    $("#boulders").text("Cantidad de boulders:" + eventoActual.boulders.length);
}

function buscarEventos(hostURL) {
    console.log("buscarEventos(hostURL)");
    var url = hostURL + "api/eventos";
    $.getJSON(url, function (datos) {
        console.log(datos);
        cargarInformacionEvento(datos)
    });
}



function validarLogeo() {
    console.log("validarLogeo()");
    if (!login) {

        $("#textoLogin").text("Para incribirse primero debe iniciar sesion.  \n Click Aqui ");
        $("#textoLogin").attr('href', 'login.html');

    } else {
        comprobarInscripcion(eventoActual.id)
    }

    $("#tajertaLogin").show();

}

function cargarInformacionTarjeta(estaInscripto) {
    console.log("cargarInformacionTarjeta(estaInscripto)" + estaInscripto);
    if (estaInscripto === "true") {
        $("#textoLogin").text("Hola " + login.email + " \n  USTED YA ESTA INSCRIPTO");

    } else {
        $("#textoLogin").text("Hola " + login.email + " \n Seleccione su categoria");
        var listaCategorias = $('#listaCategorias');
        $('#listaCategorias').empty();
        
        for (var i = 0; i < eventoActual.categorias.length; i++) {
            var categoria = eventoActual.categorias[i];
            var itemLista = document.createElement("li");
            itemLista.className = "collection-item ";
            itemLista.innerText = categoria.categoria;
            itemLista.setAttribute('onclick', "inscrbirAEvento(" + categoria.id + ", " + eventoActual.id + ")");
            listaCategorias.append(itemLista);

        }
        listaCategorias.show();

    }
}


function inscrbirAEvento(idCategoria, idEvento) {
    console.log("inscrbirAEvento Cat:" + idCategoria + " Evento: " + idEvento);
    $.ajax({
        type: "POST",
        url: hostURL + 'api/escaladores/' + login.email + '/eventos/' + idEvento + '/categorias/' + idCategoria,
        data: {},
        success: function () {
            window.location.href = "inscripciones.html";
        },
        error: function () {
            alert("error de inscripcion");
        }
    });
}


function comprobarInscripcion(idEvento) {
    console.log("comprobarInscripcion(idEvento)" + idEvento);
    $.ajax({
        type: "GET",
        url: hostURL + 'api/escaladores/' + login.email + '/eventos/' + idEvento,
        success: function (data) {
            console.log(data);
            cargarInformacionTarjeta(data.resultado)

        },
        error: function (msg) {
            console.log("Error comprobar inscripcion");
            console.log(msg);
            if (msg.status == 401) {
                sessionStorage.removeItem('login');
                location.reload();
            }

        }
    });
}

window.onload = function () {
    buscarEventos(hostURL);
}