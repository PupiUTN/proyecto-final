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
	
			
				<div class="row">

		<div class="col-md-12">
			<div class="pricing-container margin-top-30">

			
				<div class="plan">

					<div class="plan-price">
						<h3>Dinero Actual</h3>
						<span class="value">&#36 {{totalDineroActual}}</span>
						<span class="period"></span>
					</div>

			
				</div>

			</div>
		</div>
	</div>
			
		
		
		    <div class="row">
        <div class="col-md-12">
    <h4 class="headline margin-top-70 margin-bottom-30">GANCIAS POR MES</h4>
    <form id="search">

            <div class="col-lg-2 col-md-6 margin-top-10 row opening-day js-demo-hours" style="width: 115px;">
                <label style=" margin-top: 3px;"> Buscar por: </label>
            </div>
           
             <div class="col-lg-1 col-md-6 margin-top-10 row opening-day js-demo-hours">
                <label style=" margin-top: 3px;"> Mes: </label>
            </div>
            <div class="col-lg-3 col-md-6">
                <select v-model="selectedMes">
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3" selected>Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5" >Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio </option>
                    <option value="8">Agosto </option>
                    <option value="9">Septiembre</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                    
                </select>
            </div>
           
           
           
           
            <div class="col-lg-1 col-md-6 margin-top-10 row opening-day js-demo-hours">
                <label style=" margin-top: 3px;"> Año: </label>
            </div>
            <div class="col-lg-3 col-md-6">
                <select v-model="selected">
                    <option value="1">2018</option>
                    <option value="2">2019</option>
                    <option value="3" selected>2020</option>                
                </select>
            </div>
    </form>
        </div>
        </div>

        <div class="row">
     <div class="col-md-12">
    <my-table
            :data="gridData"
            :columns="gridColumns"
            :filter-key="searchQuery">
    </my-table>
     </div>
    </div>
		
		

   
</div>
    `,
    data: function () {
        return {

            reservas: [
                {
                    id: null,
                    cuidador: {
                        user: {
                            fullName: '',
                        },
                    },
                    perro: {
                        nombre: '',
                    },
                    fechaInicio: "",
                    fechaFin: "",
                    precioTotal: 1,
                }
            ],
            array:[],
            arrayCuidadores:[],
            banner:" Las ganancias de pupi !",
            mes:'',
            año:'',
            totalDineroActual:'',
            searchQuery: '',
            gridColumns: ['Numero','Cuidador','Perro','Ganancia'],
            gridData: [],
            selected:3,
            offset: 0,
            gridReservas: [],
            perPage: 2,
            totalDineroActualMes:''
        }

    },
    watch: {

        selectedMes:function(newVal, oldVal) { // watch it
            this.mes = newVal;
            if (this.año !== '' || this.año !== 0 )
            this.getGanancias()
        },

        selected: function(newVal, oldVal) { // watch it
            this.año = newVal;
            if (this.mes !== '' || this.mes !== 0 )
            this.getGanancias()
        },
        offset: function () {
            this.paginate();
        },


    },
    mounted() {
         this.gananciaTotal()
        //this.getGanancias()
    },
    methods: {

        gananciaTotal()
        {

            axios.get('/api/admin/estadisticas/getGananciaAcumulada/')
                .then((response) => {
                    this.totalDineroActual = response.data.totalDineroActual;

                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Atención...", "Error, nose pueden procesarlos datos", "error");
                });



        },

        getGanancias(){

            axios.get('/api/admin/estadisticas/getGanancias?mes=' + this.mes + '&año=' + this.año)
                .then((response) => {
                    this.reservas = response.data.reservas;

                    var aux = [];
                    var cont = 0;
                    this.reservas.forEach(function(element) {


                        cont = element.precioTotal;

                        var elem = {Cuidador: element.cuidador.user.fullName, Perro: element.perro.nombre, Numero: element.id ,Ganancia: element.precioTotal};



                        aux.push(elem);
                    });
                    this.gridData = aux;
                    this.totalDineroActualMes = cont;
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Atención...", "Error, nose pueden procesarlos datos", "error");
                });
         }



    }
});



