function generarInscripciones(misInscripciones) {
    console.log(misInscripciones);
    var cantidadEventos = misInscripciones.length;
    var target = document.getElementById('grilla');


    if (cantidadEventos == 0) {
        var itemLista = document.createElement("li");
        itemLista.className = "center-align"
        itemLista.innerText = "No estas inscripto a ningun evento. \n\n";
        var linkEventos = document.createElement("a");
        linkEventos.href = "index.html";
        linkEventos.innerText = "Proximos Eventos"
        itemLista.appendChild(linkEventos);

        target.appendChild(itemLista);




    } else {
        for (var i = 0; i < cantidadEventos; i++) {
            var inscripcion = misInscripciones[i];
            var itemLista = document.createElement("li");
            itemLista.className = "collection-item avatar";
            itemLista.id = inscripcion.id;
            cuerpoLista(inscripcion, itemLista);
            botonLista(inscripcion, itemLista);
            //al ultimo agrego el item
            target.appendChild(itemLista);
            //guardo los datos para el terminar boulders
            // Save data to sessionStorage
        }
        sessionStorage.setItem('misInscripciones', JSON.stringify(misInscripciones));


    }
}
;

function cuerpoLista(inscripcion, itemLista) {
    var evento = inscripcion.evento;
    var avatar = document.createElement("i");
    avatar.className = "material-icons circle";
    avatar.innerText = "query_builder";

    var titulo = document.createElement("b");
    titulo.className = "title";
    titulo.innerText = evento.nombre;

    var row = document.createElement("div");
    row.className = "row";


    var fecha = new Date(evento.fecha);
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    var cadenaFecha = dia + "-" + mes + "-" + anio;

    var columnaIzquierda = document.createElement("div");
    columnaIzquierda.className = "col s6";
    columnaIzquierda.innerText = "Cuando? " + cadenaFecha +
            "\n Donde? " + evento.direccion +
            "\n Cuanto? $" + evento.precioInscripcion;

    var columnaDerecha = document.createElement("div");
    columnaDerecha.className = "col s6";
    columnaDerecha.innerText = "Modalidad: " + evento.modalidad.nombre +
            "\n Categoria: " + inscripcion.categoria.categoria +
            "\n Acreditada: " + inscripcion.estaAcreditada;

    var contenidoSecundario = document.createElement("a");
    contenidoSecundario.className = "secondary-content";
    contenidoSecundario.setAttribute('onclick', "eliminarInscripcion("+ inscripcion.id +","+ evento.id  +")");
    var botonEliminar = document.createElement("i");
    botonEliminar.className = "material-icons";
    botonEliminar.innerText = "delete";

    contenidoSecundario.appendChild(botonEliminar);

    itemLista.appendChild(avatar);
    itemLista.appendChild(titulo);
    itemLista.appendChild(contenidoSecundario);

    row.appendChild(columnaIzquierda);
    row.appendChild(columnaDerecha);
    itemLista.appendChild(row);
}

function botonLista(inscripcion, itemLista) {
    var evento = inscripcion.evento;
    //boton ir a marcar boulders
    var rowBoton = document.createElement("div");
    rowBoton.className = "row";
    var columnaBoton = document.createElement("div");
    columnaBoton.className = "col s12 center-align";
    var formulario = document.createElement("form");
    formulario.setAttribute('method', "get");
    formulario.setAttribute('action', "./terminarBoulder.html");

    var inputIdEvento = document.createElement("input"); //input element, text
    inputIdEvento.setAttribute('type', "hidden");
    inputIdEvento.setAttribute('name', "idEvento");
    inputIdEvento.setAttribute('value', evento.id);


    var boton = document.createElement("input"); //input element, Submit button
    boton.setAttribute('type', "submit");
    boton.setAttribute('value', "Marcar boulders");
    boton.className = "waves-effect waves-light btn";

    formulario.appendChild(inputIdEvento);
    formulario.appendChild(boton);
    columnaBoton.appendChild(formulario);
    rowBoton.appendChild(columnaBoton);
    itemLista.appendChild(rowBoton);
}


function obtenerInscripciones(hostURL) {
    console.log("obtenerInscripciones(hostURL)");
    var url = hostURL + 'api/escaladores/' + login.email + '/eventos'
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            //acordate que es asincronico, crea un hilo para no congelar la pantalla
            generarInscripciones(data);
        },
        error: function (msg) {
            console.log("Error login");
            console.log(msg);
            console.log(msg.status);
            if (msg.status == 401) {
                sessionStorage.removeItem('login');
                location.reload();

            }


        }
    });



}
function eliminarInscripcion(idInscripcion, idEvento) {
    console.log("eliminarInscripcion");
    var url = hostURL + 'api/escaladores/' + login.email + '/eventos/'+idEvento +'/inscripcion/'+idInscripcion
    $.ajax({
        type: "DELETE",
        url: url,
        success: function (data) {
            //acordate que es asincronico, crea un hilo para no congelar la pantalla
           console.log("exito eliminar");
           $( "#"+idInscripcion ).remove();
        },
        error: function (msg) {
            console.log("Error eliminar");
            console.log(msg);
            console.log(msg.status);
            if (msg.status == 401) {
                sessionStorage.removeItem('login');
                location.reload();

            }

        }
    });

}
window.onload = function () {
    obtenerInscripciones(hostURL);
}
