
Vue.component('chart-admin2', {
    extends: VueChartJs.Line,
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
            var fecha = new Date().getMonth() + 1;

            var aux = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

            var contaux =6;
            var contaux2 = 1;
            var resta = 7 - fecha;

            while (contaux >= 0) {

                if (fecha - contaux2 >= 0) {
                    this.meses[contaux] = aux[fecha - contaux2];
                }
                else {
                    this.meses[contaux] = aux[12 - (resta - contaux)];
                }


                contaux -= 1;
                contaux2++;
            }

            this.render();
        },
        render(){
            this.renderChart({
                labels:this.meses,
                datasets: [
                    {
                        label: 'Cantidad de reservas',
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

