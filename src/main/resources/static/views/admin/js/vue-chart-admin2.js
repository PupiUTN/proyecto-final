
Vue.component('chart-admin2', {
    template:
        `
<div>
      <div class="chart-container">
                  <canvas id="myChartLine" height="484" ></canvas>
                     
      </div> 
</div>
    `,
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

       // this.getFechas();


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
            var data = {
                labels: this.meses,
                datasets: [{
                    label: "reservas",
                    backgroundColor: '#bb0007',
                    borderColor: '#bb0007',
                    borderWidth: 2,
                    hoverBackgroundColor: '#bb0007',
                    hoverBorderColor: '#bb0007',
                    data: this.cantidad,
                }]
            };


            var options = {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        stacked: true,
                        ticks: {
                           /* stepSize: 1,*/
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false,
                            color: '#bb0007'
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            };

            /*   Chart.Line('chart', {
             options: options,
             data: data
             });*/

            var ctx = document.getElementById("myChartLine");
            var myChart = new Chart(ctx, {
                type: 'line',
                options: options,
                data: data
            });


        }

    }


});

