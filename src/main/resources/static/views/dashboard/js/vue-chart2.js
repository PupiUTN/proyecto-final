
Vue.component('chart-pie', {
    template:
        `
<div>
      <div class="chart-container">
                  <canvas id="myChart"></canvas>
                     
      </div> 
</div>
    `,
    props: ['totalPorTipo'],
    data: function () {
        return {
            nombre: '',

        }
    },
    watch: {
        totalPorTipo: function(newVal, oldVal) { // watch it
            this.setNombre()
        }
        },
    mounted () {
    //this.setNombre();


    },
    methods: {
        setNombre(){

             this.nombre = 'Porcentaje de reservas';
             this.render();

         },
        render(){

            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Creadas','Aceptadas', 'Pagadas','Ejecucion','Pendientes de calificar','Cerradas','Rechazadas'],
                    datasets: [{
                        label:  this.nombre,
                        data: this.totalPorTipo,
                        backgroundColor: ['#00ff00', '#0000ff','#9fc3f9','#ffdba4','#ffff00','#0c0001','#c0c0c0'],
                        borderColor: [
                            'rgba(0, 0, 0, 0.5)',
                            'rgba(0, 0, 0, 0.5)',
                            'rgba(0, 0, 0, 0.5)',
                            'rgba(0, 0, 0, 0.5)',
                            'rgba(0, 0, 0, 0.5)',
                            'rgba(0, 0, 0, 0.5)',
                            'rgba(0, 0, 0, 0.5)'
                        ],
                        borderWidth: 1
                    }]
                }
            });

        }

    }


});
//     0             1         2           3            4           5           6
//'Finalizadas', 'Pagadas', 'Creadas', 'Aceptadas', 'Rechazadas','Cerradas','Ejecucion'
//'#ffff00', '#9fc3f9', '#00ff00', '#0000ff', '#c0c0c0', '#0c0001','#ffdba4'
//'Creadas','Aceptadas', 'Pagadas','Ejecucion','Finalizadas','Cerradas','Rechazadas'
//   2         3            1         6            0            5           4
//'#00ff00', '#0000ff','#9fc3f9','#ffdba4','#ffff00','#0c0001''#c0c0c0'