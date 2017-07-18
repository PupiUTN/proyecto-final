/**
 * Created by fbackhaus on 16/7/17.
 */

var pupi = new Vue({
    el: '#growler',
    data: {
        vacunaSeleccionada: ''
    }
});

var vacunas = function getVacunas() {
    axios.get("/api/vacunas")
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
        console.log(error);
    });
}

Vue.component('vacunas', {
    template: '<h3>{{ vacunas }}</h3>',
    // template: '<select v-model="vacunaSeleccionada"><option disabled value="">Seleccionar Vacuna</option><option v-for="vacuna in listaVacunas" :value="vacuna.nombre">{{ vacuna.nombre }} </option> </select>',
    data: function() {
        return vacunas
    }
});
