
Vue.component('button-counter', {
    extends: VueChartJs.Line,
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
                labels: ['Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
                datasets: [
                    {
                        label: 'Cantidad de reservas',
                        backgroundColor: '#bb0007',
                        data: this.cantidad
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})

        }

    }


});

