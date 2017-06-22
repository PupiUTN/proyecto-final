/**
 * Created by gabriellorenzatti on 21/6/17.
 */

function getVacunaDesdeForm() {
    var vacuna = new Object();
    vacuna.nombre = $('#nombre').val();
    return vacuna;
}
var idEdit;
function editarVacuna(idEditar) {
    btnEditar = $("#btnEditar" + idEditar);
    idEdit = idEditar;
    $("#nombre").focus();
    $('#editarVacuna').show();
    $('#guardarVacuna').hide();
}

var btnEliminar;
var idElim;
function eliminarVacuna(idEliminar) {
    btnEliminar = $("#btnEliminar" + idEliminar);
    idElim = idEliminar;
    console.log(idElim);
}