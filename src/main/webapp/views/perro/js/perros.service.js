/**
 * Created by agile on 10/07/17.
 */
var isThereSomeImage = false;
window.onload = function () {
    $('#nuevoPerro').hide();
    loadRazas();
    loadSizes();
    loadVacunas();
    loadEventos();
};

function loadEventos() {
    //https://stackoverflow.com/questions/4866721/what-are-deferred-objects
    getEventos().done(function (data) {
        generarPerros(data);
    })

}

function loadSizes() {
    getSizes().done(function (data) {
        llenarSelect('#size', data);
    })
}

function loadVacunas() {
    getVacunas().done(function (data) {
        llenarSelect('#vacuna', data);
    })

}

function loadRazas() {
    getRazas().done(function (data) {
        showRazas(data);
    })

}

function validarPerro() {
    //como tenemos 2 formularios, uno para la imagen y otro para el perro
    //como diferenciio enviar uno y no el otro?
    //ademas si ponia el boton dentro del form de perros quedaba al medio y no gustaba
    //entonces puse un boton afuera que dispare el submit
    //en caso de que esten los campos requertido llema asubmit perro
    $('#submit_handle').click();
}

function submitPerro() {
    //de esta forma podemos usar la validacione de requerido de html y a la vez ajax
    var perro = generearPerroDesdeForm();
    postPerro(perro).done(function (result) {
        limpiarCampos();
        $('#nuevoPerro').hide();
        succesPostPerro();

    }).fail(function (ts) {
        // An error occurred
        errorPostPerro(ts)
    });

    return false;
}

$('#imageFile').on('change', function () {

    var file = this.files[0];
    console.log(file);
    if (file.size > 1048576) {
        $.toast({
            heading: 'Error',
            text: 'Superaste el tamano maximo de 1MB.',
            showHideTransition: 'fade',
            icon: 'error'
        });
        return;
    }

    var regexExtensionValidator = /(\.jpg|\.jpeg|\.png)$/i;
    if (!regexExtensionValidator.exec(file.name.toLocaleLowerCase())) {

    }

});

$(".onlyLettersValidation").keydown(function (e) {
// Allow: backspace, delete, tab, escape, enter, shift and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 16, 32]) !== -1 ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a letter and stop the keypress
    if ((e.keyCode < 65 || e.keyCode > 90)) {
        e.preventDefault();
    }
});

$('#imageButton').on('click', function () {
    if (!isThereSomeImage) {
        console.log($('#imageFile').val());
        var file = $('#imageFile').val();
        var regexExtensionValidator = /(\.jpg|\.jpeg|\.png)$/i;
        if (regexExtensionValidator.exec(file)) {
            //unimos la parte de datos con la vista
            postImageToServer().done(function (data) {
                mostrarImagen(data)
            })
        } else {
            errorUploadingImageExtensionNotSupported();
        }
    } else {
        errorUploadingImageToServerMoreThan1();

    }
});

function generearPerroDesdeForm() {
    var perro = {};
    perro.nombre = $('#nombre').val();
    var raza = {};
    raza.id = $('#idRaza').val();
    raza.nombre = $('#raza').val();
    perro.raza = raza;

    var tamaño = {};
    tamaño.id = $('#size').val();
    tamaño.nombre = $('#size :selected').text();
    perro.tamaño = tamaño;
    var vacunaList = [];
    $('#vacuna :selected').each(function () {
        var vacuna = {};
        vacuna.id = $(this).val();
        vacuna.nombre = $(this).text();
        vacunaList.push(vacuna);
    });
    perro.vacunacionList = vacunaList;

    var fotoRuta = null;
    $(".imagenPerro").each(function () {
        fotoRuta = $(this).attr('src');
    });
    perro.fotoRuta = fotoRuta;

    var dueño = null;
    perro.dueño = dueño;
    perro.comentario = $('#comentario').val();
    return perro;
}