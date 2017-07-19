/**
 * Created by fbackhaus on 16/7/17.
 */

var pupi = new Vue({
    el: '#growler',
    data: {
        vacunaSeleccionada: '',
        listaVacunas: [],
        nombreVacuna: ''
    },
    created: function() {
        this.getVacunas();
    },
    methods: {
        getVacunas: function () {
            const vm = this;
            axios.get("/api/vacunas")
                .then(function (response) {
                    console.log(response);
                    vm.listaVacunas = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

});

function postVacuna(){
    axios.post("/api/vacunas", {
        nombre: pupi.nombreVacuna
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}



