function generarEventos(todosLosEventos) {
    console.log("generarEventos(todosLosEventos)");
    console.log(todosLosEventos);
    var cantidadEventos = todosLosEventos.length;

    var fila = document.getElementById('fila');
    for (var i = 0; i < cantidadEventos; i++) {
        var evento = todosLosEventos[i];
        var columna = document.createElement("div");
        columna.className = "col s12 m6";

        var tarjeta = document.createElement("a");
        tarjeta.className = "card horizontal grey lighten-4";
        tarjeta.href = "evento.html?idEvento=" + evento.id;

        var imagenTarjeta = document.createElement("div");
        imagenTarjeta.className = "card-image";

        var calendario = document.createElement("time");
        calendario.className = "icon";
        var fecha = new Date(evento.fecha);
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dia = fecha.getDate();
        var mes = monthNames[fecha.getMonth()];
        var anio = fecha.getFullYear();

        var calendarioAnio = document.createElement("em");
        calendarioAnio.innerText = anio;
        var calendarioMes = document.createElement("strong");
        calendarioMes.innerText = mes;
        var calendarioDia = document.createElement("span");
        calendarioDia.innerText = dia;

        var cuerpoTarjeta = document.createElement("div");
        cuerpoTarjeta.className = "card-stacked";

        var contenidoTarjeta = document.createElement("div");
        contenidoTarjeta.className = "card-content";
        contenidoTarjeta.style.color = "black"

        var titulo = document.createElement("b");
        titulo.innerText = evento.nombre;

        var ubicacion = document.createElement("p");
        ubicacion.innerText = evento.direccion;

        contenidoTarjeta.appendChild(titulo);
        contenidoTarjeta.appendChild(ubicacion);
        cuerpoTarjeta.appendChild(contenidoTarjeta);

        calendario.appendChild(calendarioAnio);
        calendario.appendChild(calendarioMes);
        calendario.appendChild(calendarioDia);
        imagenTarjeta.appendChild(calendario);

        tarjeta.appendChild(imagenTarjeta);
        tarjeta.appendChild(cuerpoTarjeta);

        columna.appendChild(tarjeta);
        fila.appendChild(columna);
    }
}


function getEventos(hostURL) {
    console.log("getEventos() - Index");
    var url = hostURL + "api/eventos";
    $.getJSON(url, function (datos) {
        generarEventos(datos);
    });
}


window.onload = function () {
    getEventos(hostURL);
}