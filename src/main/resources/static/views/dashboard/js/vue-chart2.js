
Vue.component('chart-pie', {
    extends: VueChartJs.Pie,
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
    this.setNombre();


    },
    methods: {
        setNombre(){

             this.nombre = 'Porcentaje de reservas';
             this.render();

         },
        render(){
            this.renderChart({
                labels: ['Finalizadas', 'Pagadas', 'Creadas', 'Aceptadas', 'Rechazadas','Cerradas'],
                datasets: [
                    {
                        label: this.nombre,
                        backgroundColor: ['#bb0007', '#f87233', '#01bb00', '#bb686a', '#bb4e00', '#0c0001'],
                        data: this.totalPorTipo,
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})

        }

    }


});

