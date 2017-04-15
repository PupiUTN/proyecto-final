var idEventoGlobal = -1;

function generarBotones(boulders) {
    console.log("generarBotones(boulders)");

    console.log(boulders);
    var cantidadBoulders = boulders.length - 1;
    var columns = 2
    var rows = cantidadBoulders + 1 / columns;
    var target = document.getElementById('grilla');
    var index = 0;
    for (var i = 0; i < rows; i++) {
        var row = document.createElement("div");
        row.className = "row";
        for (var j = 0; j < columns; j++) {
            //PUEDE SER QUE NO SEA MULTIPLO DE 2 LA CANTIDAD DE BOULDERS, POR ESO CORTO ANTES
            if (cantidadBoulders == -1) {
                break;
            }
            var cell = document.createElement("div");
            cell.className = "col s6 center-align";
            var button = document.createElement("a");
            button.className = "waves-effect waves-orange btn-large red lighten-1";
            //reduzo la separacion entre lineas de textto para que se vea todo
            button.style.lineHeight = "25px";
            //button.innerText = (i * rows) + j + 1;

            button.innerText = "Nº" + boulders[cantidadBoulders].numero + "\n Puntos: " + boulders[cantidadBoulders].puntaje;
            button.id = boulders[cantidadBoulders].id;
            // reocorro el vector de manera descendente por el numero de los boulders
            cantidadBoulders--;
            button.onclick = function () {
                finishBoulder(this);
            };
            cell.appendChild(button);
            row.appendChild(cell);
        }
        target.appendChild(row);
    }
    obtenerBouldersTerminados();
}

function getIdEvento() {
    console.log("getIdEvento()");

    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    var idEvento = unescape(temp[1]);
    return idEvento;
}


function obtenerTodosLosBoulders(idEvento,hostURL) {

    console.log("obtenerTodosLosBoulders(idEvento)");
    var url = hostURL + 'api/escaladores/' + login.email + '/eventos';
    $.getJSON(url, function (datos) {
        misInscripciones = datos;
        idEventoGlobal = idEvento
        console.log(misInscripciones);
        for (var i = 0; i < misInscripciones.length; i++) {
            if (misInscripciones[i].evento.id == idEvento) {
                generarBotones(misInscripciones[i].evento.boulders);
            }
        }

    });

}

function obtenerBouldersTerminados() {
    console.log("obtenerBouldersTerminados()");
    var url = hostURL + 'api/escaladores/' + login.email + '/eventos/' + idEventoGlobal + '/terminarBoulder';
    $.getJSON(url, function (bouldersMarcados) {
        if (bouldersMarcados.length != 0) {
            for (var i = 0; i < bouldersMarcados.length; i++) {
                var idBoulder = bouldersMarcados[i].id;
                console.log("Debo pintar de verde:" + idBoulder);
                $("#" + idBoulder).removeClass("red");
                $("#" + idBoulder).addClass("green");
            }

        }
    });

}

function finishBoulder(button) {
    console.log("finishBoulder(button)");
    var cadenaClase = button.className;
    if (cadenaClase.includes("red")) {
        console.log("finishBoulder(button) - POST");
        $.ajax({
            type: "POST",
            url: hostURL + 'api/escaladores/' + login.email + '/eventos/' + idEventoGlobal + '/terminarBoulder/' + button.id,
            data: {},
            success: function () {
                $(button).removeClass("red");
                $(button).addClass("green");
            },
            error: function () {
                alert("errorAlTerminarBouler");
            }
        });

    } else {
        console.log("finishBoulder(button) - DELETE");
        $.ajax({
            type: "DELETE",
            url: hostURL + 'api/escaladores/' + login.email + '/eventos/' + idEventoGlobal + '/terminarBoulder/' + button.id,
            data: {},
            success: function () {
                $(button).removeClass("green");
                $(button).addClass("red");
            },
            error: function () {
                alert("errorAlTerminarBouler");
            }
        });

    }
}



window.onload = function () {
    obtenerTodosLosBoulders(getIdEvento(), hostURL);
}
//INICIALIZO

