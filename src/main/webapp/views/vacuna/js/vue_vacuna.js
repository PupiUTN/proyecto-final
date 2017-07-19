/**
 * Created by fbackhaus on 16/7/17.
 */

var pupi = new Vue({
    el: '#growler',
    data: {
        vacunaSeleccionada: '',
        listaVacunas: []
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
        },

    }
});


