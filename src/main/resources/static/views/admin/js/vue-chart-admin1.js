

Vue.component('chart-admin1', {
    extends: VueChartJs.Bar,
    props: ['cantidad'],
    data: function () {
        return {
            meses: ["","","","","",""],
            //VueChartJs
        }
    },
    watch: {
        cantidad: function(newVal, oldVal) { // watch it
            this.getFechas()
        }
    },
    mounted () {

        this.getFechas();


    },
    methods: {
        getFechas() {

            this.render();
        },
        render(){
            this.renderChart({
                labels: ['Creadas', 'Aceptadas', 'Pagadas', 'Rechazadas','Ejecucion', 'Finalizadas','Cerradas'],
                datasets: [
                    {
                        label: 'Estados de las reservas',
                        backgroundColor: '#bb0007',
                        data: this.cantidad,

                    }
                ]

            }, {responsive: true, maintainAspectRatio: false,
                options: {
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: true
                            },
                            ticks: {
                                max: 5,
                                min: 0,
                                stepSize: 0.5
                            }
                        }]
                    }
                }

            })

        }

    }


});

