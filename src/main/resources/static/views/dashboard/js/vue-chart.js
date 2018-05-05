
Vue.component('button-counter', {
    extends: VueChartJs.Line,
    props: ['cantidad'],
data: function () {
          return {
              meses: ["","","","","",""],

          }
    },
    mounted () {

        this.getFechas();
         var aux = this.cantidad;

    },
    methods: {
        getFechas() {

            var fecha = new Date().getMonth();

            var aux = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre', 'Noviembre', 'Diciembre'];


            var cont = 6;
            var i;
            var pos = 0;
            if( (fecha - 6) < 0 )
            { for ( i = 0 ; i < 6 ; i++) {
                    if ( (fecha -cont) < 0 )
                    {
                        this.meses[pos] = aux[(12+(fecha-cont))]
                    }
                    else{
                        this.meses[pos] = aux[fecha-cont]
                    }
                    cont--;
                    pos ++;
                    }
            }
            else {
                this.meses[5] = aux[fecha-1];
                this.meses[4] = aux[fecha-2];
                this.meses[3]= aux[fecha-3];
                this.meses[2]= aux[fecha-4];
                this.meses[1]= aux[fecha-5];
                this.meses[0]= aux[fecha-6];


            }
            this.render();
        },
        render(){
            this.renderChart({
                labels: this.meses,
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

