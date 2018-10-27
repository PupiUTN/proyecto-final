Vue.component('ganacias-admin', {
    template:
        `
<div>
   	<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2>  <i class="im im-icon-Line-Chart"></i> GANANCIAS</h2> <h2> </h2> 
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
	
		    
        
        <div class="col-md-12 row"> 
			   <div class="col-md-3"></div>
			   <div class="col-md-3 margin-top-10 row opening-day js-demo-hours"> <label><h4><i class="im im-icon-Dollar-Sign" style="margin-right: 10px;"></i>Elige el año</h4></label></div>
			    <div class="col-md-3">
			     <select id='selector-ganancia' v-model="selected">
                    <option value="2017">2017</option>
                    <option value="2018" selected>2018</option>
                             
                </select>
			  
			    </div>
	  </div>	
            <br>
        

        <div class="row">
     <div class="col-md-12">
       <div class="col-md-12">

             <div class="row">
             <div class="col md-3"><h4 class="headline margin-top-70 margin-bottom-30">Acumulado anual: &#36 {{totalDineroAcumulado}}</h4> </div> <label></label>
             </div>
			
			<table class="basic-table">

				<tr>
					<th>Mes</th>
					<th>Cantidad de reservas</th>
					<th>Ganancia</th>
				</tr>
        <tbody style="font-size: larger;">
        <tr v-for="element in gridData">
        <td>{{element.mes}}</td>
	    <td>{{element.cantidad}}</td>
	    <td>&#36 {{element.ganancia}}</td> 
        </tr>
          </tbody>
			
			</table>
		</div>
     </div>
    </div>
		
		

   
</div>
    `,
    data: function () {
        return {

            ganancias: [
                {
                    mes: '',
                    cantidad: '',
                    ganancia: ''
                }

            ],
            array:[],
            arrayCuidadores:[],
            banner:" Las ganancias de pupi !",
            mes:'',
            año: 2018,
            totalDineroActual:'',
            searchQuery: '',
            gridColumns: ['Mes','Cantidad','Ganancia'],
            gridData: [],
            selected:2018,
            offset: 0,
            gridReservas: [],
            perPage: 12,
            totalDineroAcumulado:''
        }

    },
    watch: {

        selected: function(newVal, oldVal) { // watch it
            this.año = newVal;
            this.getGanancias()
        },

    },
    mounted() {
        this.getGanancias()
    },
    methods: {

        getGanancias(){
                    var self = this;
            axios.get('/api/admin/estadisticas/getGanancias?año=' + this.año)
                .then((response) => {
                    this.ganancias = response.data;

                    var aux = [];
                    var cont = 0;
                    this.ganancias.forEach(function(element) {


                        cont += element.ganancia;

                        element.mes = self.setNombreMes( element.mes);

                        element.ganancia =   element.ganancia.toFixed(2)
                       // var elem = {Mes: element.mes, Cantidad: element.cantidad, Ganancia: element.ganancia };
                        //aux.push(elem);
                    });
                    this.gridData = this.ganancias;
                    this.totalDineroAcumulado =cont.toFixed(2);
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Atención...", "Error, nose pueden procesarlos datos", "error");
                });
         },
        setNombreMes( mes)
        {
            switch(mes) {
                case 1:
                   return "Enero";
                    break;
                case 2:
                    return "Febrero";
                    break;
                case 3:
                    return "Marzo";
                    break;
                case 4:
                    return "Abril";
                    break;
                case 5:
                    return "Mayo";
                    break;
                case 6:
                    return "Junio";
                    break;
                case 7:
                    return "Julio";
                    break;
                case 8:
                    return "Agosto";
                    break;
                case 9:
                    return "Septiembre";
                    break;
                case 10:
                    return "Octubre";
                    break;
                case 11:
                    return "Noviembre";
                    break;
                default:
                    return "Diciembre";
            }


        }


    }
});



