
Vue.component('chart-pie', {
    extends: VueChartJs.Pie,
    props: ['totalPorTipo'],
    data: function () {
        return {
            nombre: '',

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
                labels: ['Canceladas', 'Pagadas', 'Finalizadas', 'Aceptadas', 'Pendientes'],
                datasets: [
                    {
                        label: this.nombre,
                        backgroundColor: ['#77F874', '#bb0007', '#BBB61A', '#7023BB', '#f87979', '#bb0007'],
                        data: this.totalPorTipo,
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})

        }

    }


});

