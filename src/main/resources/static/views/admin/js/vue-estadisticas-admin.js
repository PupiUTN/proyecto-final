Vue.component('estadisticas-admin', {
    template:
        `
<div>
   	<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2> Estadisticas</h2> <h2> </h2> 
				</div>
			</div>
		</div>
		<!-- Content -->
		
		<div class="row">
    <div class="col-md-12">
        <div class="notification success closeable margin-bottom-30 ">
            <p> <strong>Estadisticas de pupi</strong></p>    					                    <!-- <a class="close" href="#"></a>-->
        </div>

    </div>

</div>
		
			<br>
			<div class=" row">
			<div class="zoom">
		<div class="col-lg-6 col-md-6">
		
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color:gainsboro;"> <i class="im im-icon-Line-Chart"></i>Estados de mis Reservas </h4>
             <chart-admin1 :cantidad="estadisticas.totalPorTipo">
             
            </chart-admin1>
                </div>
         </div>
         </div>

         
         <div class="zoom">
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
			
			
	       <div class="row">
	        <h4 class="headline margin-top-70 margin-bottom-30">
               <i class="im im-icon-Map2"></i> MAPA DE RESERVAS</h4>
	        <br>
	        
            <div  class="col-md-12"">
               
           <div  style=" width: 500px; height: 500px;" id="chartdiv" ></div>
  
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
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-K",
                    "value": 4447100,
                    "description": " cuidadores: 3 - reservas: 8"
                }, {
                    "id": "AR-H",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-U",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-C",
                    "value": 4447100,
                    "description": " cuidadores: 5 - reservas: 5"
                }, {
                    "id": "AR-X",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-W",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-E",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-P",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-Y",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-L",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-F",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-M",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-N",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-Q",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-R",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-A",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-Z",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-G",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-S",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-J",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-D",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-V",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                }, {
                    "id": "AR-T",
                    "value": 4447100,
                    "description": " cuidadores: 0 - reservas: 0"
                } ],
                totalPorTipo: [],
                totalPorProvincia:[]
            },
            array:[],

        }

    },
    watch: {
        array: function(newVal, oldVal) { // watch it
            this.renderChart();
        },

    },
    mounted() {
        this.renderChart();
        this.getAdminEstadisticas();
        this.deleteStyle();
    },
    methods: {

        getAdminEstadisticas() {

            axios.get('/api/admin/estadisticas/getReservasAdmin/')
                .then((response) => {
                    this.estadisticas.cantidadPorMes = response.data.cantidadPorMes;
                    this.estadisticas.totalPorTipo = response.data.totalPorTipo;
                    this.estadisticas.totalPorProvincia = response.data.totalPorProvincia;
                    this.setDescriptionxProvincia(this.estadisticas.totalPorProvincia);

                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },
         setDescriptionxProvincia(list){
             var cont = 0;
             this.estadisticas.mapa.forEach(function(obj)
             { obj.description = list[cont];
                 cont++;
             });

             this.array =   this.estadisticas.mapa;
         },
        renderChart(){
                var  data = this.estadisticas.mapa;
/*

            var map = AmCharts.makeChart( "chartdiv", {
                type: "map",
                dataProvider: {
                    map: "argentinaLow",
                    areas: array,
                    showErrors: false
                },
                colorSteps: 10,
                areasSettings: {
                    autoZoom: true
                },
                smallMap: {},
                valueLegend: {
                    right: 10,
                    minValue: "little",
                    maxValue: "a lot!"
                }
            } );
*/



            var map;

            AmCharts.ready(function() {
                map = new AmCharts.AmMap();


                map.balloon.color = "#000000";

                var dataProvider = {
                    map: "argentinaLow",
                    areas: data,
                    showErrors: false
                };

                map.dataProvider = dataProvider;

                map.areasSettings = {
                    autoZoom: true,
                    selectedColor: "#CC0000"
                };

                map.smallMap = new AmCharts.SmallMap();

                map.write("chartdiv");

            });

            //this.deleteStyle();

        },
        deleteStyle(){

        }


    }
});


