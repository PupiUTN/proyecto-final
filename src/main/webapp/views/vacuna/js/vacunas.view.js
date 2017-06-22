
$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute

});





  String.prototype.isEmpty = function () {
  return (this.length === 0 || !this.trim());
  };

function generarVacunas(jsonArray) {
    $('#listaVacunas').empty();
    for (var i = 0; i < jsonArray.length; i++) {
        var vacuna = '\
  <div class="col s12">\n\
      <div class="card horizontal blue-grey darken-1 white-text hoverable">\n\
          <div class="card-stacked"> \n\
              <div class="card-content"> \n\
              <span class="card-title">' + jsonArray[i].nombre + ' \n\
             <a href="#!"><span id="btnEditar' + jsonArray[i].id + '" data-target="modalEditar" onclick="editarVacuna(' + jsonArray[i].id + ')" class=" new badge btn waves-effect waves-light blue accent-2 black-text" data-badge-caption="Editar" ></span>\n\
              <a href="#!"><span id="btnEliminar' + jsonArray[i].id + '" data-target="modalEliminar" onclick="eliminarVacuna(' + jsonArray[i].id + ')" class=" new badge btn waves-effect waves-light orange accent-2 black-text" data-badge-caption="Eliminar" ></span>\n\
              </a> \n\
              </span> \n\
         </div> \n\
     </div> \n\
 </div>';
        $('#listaVacunas').append(vacuna);
        $('#nombre').val("");
    }
}


window.onload = function () {
    $('#editarVacuna').hide();
    getVacunas();
};
