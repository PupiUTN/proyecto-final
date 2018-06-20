
Vue.component('chart-admin3', {
    extends: VueChartJs.Doughnut,
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
                labels: ['January', 'February'],
                datasets: [
                    {
                        label: 'Cantidad de reservas',
                        backgroundColor: '#bb0007',
                        data: [40, 20],

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

/**
 * Created by gabriellorenzatti on 20/6/18.
 */
