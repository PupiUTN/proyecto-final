
Vue.component('chart-pie', {
    extends: VueChartJs.Pie,
    data: function () {
        return {
            cantidad: [1,2,3,4,5,6]

        }
    },
    mounted () {



    },
    methods: {
        getCuidadorReservas() {
            axios.get('/api/cuidador/me/reservas/CantidadDeReservas/')
                .then((response) => {
                    this.cantidad = response.data;

                    this.render();
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },
        render(){
            this.renderChart({
                labels: ['Canceladas', 'Pagadas', 'Finalizadas', 'Aceptadas', 'Pendientes'],
                datasets: [
                    {
                        label: 'Porcentaje de reservas',
                        backgroundColor: ['#77F874', '#bb0007', '#BBB61A', '#7023BB', '#f87979', '#bb0007'],
                        data: [4,6,2,9,4]
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})

        }

    }


});

