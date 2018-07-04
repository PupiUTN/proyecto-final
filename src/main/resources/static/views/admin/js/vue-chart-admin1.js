

Vue.component('chart-admin1', {
    template:
        `
<div>
      <div class="chart-container">
                  <canvas id="myChartBar" height="484" ></canvas>
                     
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

        this.getFechas();


    },
    methods: {
        getFechas() {

            this.render();
        },
        render(){


            var options = {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false,
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            };

            var ctx = document.getElementById("myChartBar");
            var myChart = new Chart(ctx, {
                type: 'bar',
                options: options,
                data: {
                    labels: ['Creadas', 'Aceptadas', 'Pagadas', 'Rechazadas','Ejecucion', 'Finalizadas','Cerradas'],
                    datasets: [{
                        label:  "reservas",
                        data: this.cantidad,
                        backgroundColor: '#bb0007',
                        borderWidth: 1
                    }]
                }

            });

        }

    }


});

