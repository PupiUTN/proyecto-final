Vue.component('estadisticas-admin', {
    template:
        `
<div>
   	<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2>  <i class="im im-icon-Line-Chart"></i> Estadisticas</h2> <h2> </h2> 
				</div>
			</div>
		</div>
		<!-- Content -->
		
		<div class="row">
    <div class="col-md-12">
        <div class="notification success closeable margin-bottom-30 ">
            <p> <strong>{{banner}}</strong></p>    					                    <!-- <a class="close" href="#"></a>-->
        </div>

    </div>

</div>
		
			<br>
			<div>
			

			<div class=" row">
		
		<div class="col-lg-6 col-md-6">
		
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color:gainsboro;"> <i class="im im-icon-Line-Chart" style=" margin-right: 10px; "></i>Estados de mis Reservas </h4>
             <chart-admin1 :cantidad="estadisticas.totalPorTipo">
             
            </chart-admin1>
                </div>
         </div>
       

         
        
         <div class="col-lg-6 col-md-6">
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color: gainsboro;"><i class="im im-icon-Line-Chart"></i> Historial de Reservas</h4>
               <chart-admin2 :cantidad="estadisticas.cantidadPorMes">
               
                </chart-admin2>
                </div>
         </div>
           
			</div>
			</div>
			<br>
			<br>
			
			
	        <div v-show="show">
	        <div class="row" >
	        <h4 class="headline margin-top-70 margin-bottom-30">
               <i class="im im-icon-Map2"></i> MAPA DE RESERVAS</h4>
	        <br>
	        
            <div class="col-lg-6 col-md-6">
                <div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color:gainsboro;"> <i class="im im-icon-Line-Chart" style=" margin-right: 10px; "></i>Reservas por Provincia </h4>
           <div  class="chart-container"  id="chartdiv" style="height: 484px; width: 100%;"></div>
  </div>
            </div>
            
        
            
                <div class="col-lg-6 col-md-6">
               
               <div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color:gainsboro;"> <i class="im im-icon-Line-Chart" style=" margin-right: 10px; "></i>Cuidadores por Provincia </h4>
           <div  class="chart-container"  id="chartdiv1" style="height: 484px; width: 100%;"></div>
               </div>
            </div>
   
           </div>
           </div>
   
   
   
</div>
    `,
    data: function () {
        return {


            estadisticas:{
                cantidadPorMes:[0,0,0,0,0,0,0],
                mapa: [{
                    "id": "AR-B",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-K",
                    "value": 493782,
                    "description": " cuidadores: 3 - reservas: 8"
                }, {
                    "id": "AR-H",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-U",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-C",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-X",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-W",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-E",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-P",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-Y",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-L",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-F",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-M",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-N",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-Q",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-R",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-A",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-Z",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-G",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-S",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-J",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-D",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-V",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-T",
                    "value": 493782,
                    "description": " cuidadores: 0 - reservas: 0"
                } ],
                totalPorTipo: [],
                totalPorProvincia:[],
                totalCuidadoresPorProvincia:[],
            },
            array:[],
            arrayCuidadores:[],
            banner:"Actualmente no hay reservas!",
            show: false,
            flag:'',
        }

    },
    watch: {
        array: function(newVal, oldVal) { // watch it
            this.renderChart();
        },
        arrayCuidadores:function(newVal, oldVal) { // watch it
            this.renderChartCuidadores();
        },
        flag :function(newVal, oldVal) { // watch it
            this.show = true;
            this.banner ='Estadisticas de pupi!';
        },

    },
    mounted() {
        this.renderChart();
        this.renderChartCuidadores();
        this.getAdminEstadisticas();

    },
    methods: {

        getAdminEstadisticas() {

            axios.get('/api/admin/estadisticas/getReservasAdmin/')
                .then((response) => {
                    this.estadisticas.cantidadPorMes = response.data.cantidadPorMes;
                    this.estadisticas.totalPorTipo = response.data.totalPorTipo;
                    this.estadisticas.totalPorProvincia = response.data.totalPorProvincia;
                    this.estadisticas.totalCuidadoresPorProvincia = response.data.totalCuidadoresPorProvincia;
                    this.setDescriptionxProvincia(this.estadisticas.totalPorProvincia);
                    this.setDescriptionCuidadoresxProvincia(this.estadisticas.totalCuidadoresPorProvincia);




                    var found =  response.data.totalPorTipo.find(function(element) {
                        return element > 0;
                    });
                         if (found >0)
                         {
                             this.show = true;
                             this.banner ="Estadisticas de pupi!";
                         }


                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },
         setDescriptionxProvincia(list){
             var cont = 0;

             this.estadisticas.mapa.forEach(function(obj)
             { obj.description = "reservas: " + list[cont];
                 obj.value = getElementHeat(list[cont]);
                 cont++;
             });
             this.array =   this.estadisticas.mapa;


             function getElementHeat(value)
             {
                 if (value === 0 )
                 {
                     return 493782;
                 }
                 if (value > 0 && value < 20)
                 {
                     return 5363675;
                 }
                 if (value >= 20 && value < 40)
                 {
                     return 8049313;
                 }
                 if (value >= 40 && value < 60)
                 {
                     return 12419293;
                 }
                 if (value >= 60 && value < 80)
                 {
                     return 15982378;
                 }
                 if (value >= 80 && value < 100)
                 {
                     return 20851820;
                 }

                 return 33871648;
             }
         },
        setDescriptionCuidadoresxProvincia(list){
            var cont = 0;
            mapaCuidadores.forEach(function(obj)
            { obj.description = "Cuidadores: " + list[cont];
                obj.value = getElementHeatCuidadores(list[cont]);
                cont++;
            });
            this.arrayCuidadores =   mapaCuidadores;


            function getElementHeatCuidadores(value)
            { // 0 493782

                if (value === 0 )
                {
                    return 0;
                }
                 return 493782;

            }
        },
        renderChart(){
                var  data = this.estadisticas.mapa;


            var map = AmCharts.makeChart( "chartdiv", {
                type: "map",
                dataProvider: {
                    map: "argentinaLow",
                    areas: data,
                    showErrors: false
                },
                colorSteps: 5,
                areasSettings: {
                    autoZoom: true
                },
                smallMap: {},
                valueLegend: {
                    right: 5,
                    minValue: "0",
                    maxValue: ">100"
                }
            } );

        },
        renderChartCuidadores(){
            var  data = mapaCuidadores;


            var map = AmCharts.makeChart( "chartdiv1", {
                type: "map",
                dataProvider: {
                    map: "argentinaLow",
                    areas: data,
                    showErrors: false
                },
                colorSteps: 2,
                areasSettings: {
                    autoZoom: true
                },
                smallMap: {},
                valueLegend: {
                    right: 2,
                    minValue: "0",
                    maxValue: ">0"
                }
            } );

        },
    }
});


