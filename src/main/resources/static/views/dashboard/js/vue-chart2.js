
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
                    labels: ['Finalizadas', 'Pagadas', 'Creadas', 'Aceptadas', 'Rechazadas','Cerradas'],
                    datasets: [{
                        label:  this.nombre,
                        data: this.totalPorTipo,
                        backgroundColor: ['#bb0007', '#f87233', '#01bb00', '#bb686a', '#bb4e00', '#0c0001'],
                        borderColor: [
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

