Vue.component('admin-dashboard', {
    template:
        `
<div>
   	<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2> Bienvenido !!!</h2> <h2> </h2> 
				</div>
			</div>
		</div>
		<!-- Content -->
		<div class="row">
			<div class="col-md-12 col-xs-12">			    
				<div class="notification success closeable margin-bottom-30 ">
					<p> <strong>Estos son los datos de pupi</strong>!</p>    					                    <!-- <a class="close" href="#"></a>-->
			</div>
			
			</div>
		
		</div>
		
			<div class="row">
			<!-- Item -->
			<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-1">
					<div class="dashboard-stat-content" style="font-size: 40px;">{{estadisticas.totalReservas}} <br><span>Reservas</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Check"></i></div>
				</div>
			</div>
           
			<!-- Item -->
		
			<div  class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-2">
					<div class="dashboard-stat-content" style="font-size: 40px;">{{estadisticas.totalDenuncias}}  <br><span>Denuncias</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Close-Window"></i></div>
				</div>
			</div>
	<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-4">
					<div class="dashboard-stat-content"><h4>{{estadisticas.totalSolicitudes}} </h4> <span>Solicitudes</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Warning-Window"></i></div>
				</div>
			</div>



			
			<!-- Item -->
			<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-3">
					<div class="dashboard-stat-content" style="font-size: 40px;">{{estadisticas.totalCalificaciones}} <br> <span> calificaciones</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Add-UserStar"></i></div>
				</div>
			</div>

			<!-- Item -->
			
		</div>
		
		
	
<!-- Container / Start -->

	<!-- Row / Start -->
	<div class="row">

		<div class="col-md-12">
			<div class="pricing-container margin-top-30">

			<!-- Plan #1 -->

				<div class="plan">

					<div class="plan-price">
						<h3>Perros</h3>
						<span class="value">{{estadisticas.totalPerros}}</span>
						<span class="period"></span>
					</div>


				</div>
				
					<div class="plan">

					<div class="plan-price">
						<h3>Cuidadores</h3>
						<span class="value">{{estadisticas.totalCuidadores}}</span>
						<span class="period"></span>
					</div>


				</div>


				<!-- Plan #3 -->

				<!-- Plan #3 -->
				<div class="plan">

					<div class="plan-price">
						<h3>Dinero Actual</h3>
						<span class="value">&#36 {{estadisticas.totalDineroActual}}</span>
						<span class="period"></span>
					</div>

			
				</div>

			</div>
		</div>
	</div>
	<!-- Row / End -->

    <div class="row">
        <div class="col-md-12">
    <h4 class="headline margin-top-70 margin-bottom-30">RESERVAS</h4>
    <form id="search">

            <div class="col-lg-2 col-md-6 margin-top-10 row opening-day js-demo-hours" style="width: 115px;">
                <label style=" margin-top: 3px;"> Buscar por: </label>
            </div>
            <div class="col-lg-3 col-md-6">
                <input type="text" class="form-control"  placeholder="Palabra Clave" name="query" v-model="searchQuery">
            </div>
            <div class="col-lg-1 col-md-6 margin-top-10 row opening-day js-demo-hours">
                <label style=" margin-top: 3px;"> Estado: </label>
            </div>
            <div class="col-lg-3 col-md-6">
                <select v-model="selected">
                    <option value="1">Creadas</option>
                    <option value="2">Aceptadas</option>
                    <option value="3" selected>Pagadas</option>
                    <option value="4">Rechazadas</option>
                    <option value="5" >Finalizadas</option>
                    <option value="6">Cerradas</option>
                    <option value="7">Comentarios cuidador</option>
                    <option value="8">Comentarios dueño</option>
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
    props: ['rol'],
    data: function () {
        return {
            estadisticas:{
                 totalReservas: 0,
         totalDenuncias: 0,
         totalSolicitudes: 0,
         totalCalificaciones: 0,
         totalPerros: 0,
         totalCuidadores: 0,
         totalDineroActual: 0,
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

            },
            searchQuery: '',
            gridColumns: ['Cuidador','Perro','Inicio','Fin'],
            gridData: [],
            selected:3,
            offset: 0,
            gridReservas: [],
            perPage: 2,

        }
    },
    watch: {
        selected: function(newVal, oldVal) { // watch it

             this.getReservasByStatus(newVal)
        },
        offset: function () {
            this.paginate();
        },
        rol: function(newVal, oldVal) { // watch it
            if (this.rol == "ROLE_ADMIN")
            {  this.getAdminEstadisticas();

            }

        }

    },
    mounted() {

       // this.getAdminEstadisticas();
    },
    methods: {
        getAdminEstadisticas() {

            axios.get('/api/admin/estadisticas/me/' )
                .then((response) => {
                    this.estadisticas = response.data;
                    this.estadisticas.totalReservas = response.data.totalReservas.toString();
                    this.estadisticas.totalDenuncias = response.data.totalDenuncias.toString();
                    this.estadisticas.totalSolicitudes = response.data.totalSolicitudes.toString();
                    this.estadisticas.totalCalificaciones = response.data.totalCalificaciones.toString();
                    this.estadisticas.totalPerros = response.data.totalPerros;
                    this.estadisticas.totalCuidadores = response.data.totalCuidadores;
                    this.estadisticas.totalDineroActual = response.data.totalDineroActual;
                    this.estadisticas.reservas = response.data.reservas;
                         var aux = [];
                    this.estadisticas.reservas.forEach(function(element) {
                        var fechaInicio = element.fechaInicio;
                        var fechaFin =  element.fechaFin;
                        var elem = {Cuidador: element.cuidador.user.fullName, Perro: element.perro.nombre, Inicio: fechaInicio,Fin:fechaFin ,Total: "$ " +  element.precioTotal};
                        aux.push(elem)
                    });
                    this.gridData = aux;


                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },
        getReservasByStatus (value){

            axios.get('/api/admin/estadisticas/getReservas?status=' + value)
                .then((response) => {
                    this.estadisticas.reservas = response.data;
                    var aux = [];
                    this.estadisticas.reservas.forEach(function(element) {
                         var fechaInicio = element.fechaInicio;
                         var fechaFin = element.fechaFin;
                   //     var elem = {Cuidador: element.cuidador.user.fullName, Perro: element.perro.nombre, Inicio: fechaInicio,Fin:fechaFin ,Total: "$ " + element.precioTotal};

                        var elem = {Cuidador: element.cuidador.user.fullName, Perro: element.perro.nombre, Inicio: fechaInicio,Fin:fechaFin};
                        aux.push(elem);
                    });
                    this.gridData = aux;

                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });

        },
        convertDate(dateString){
            var p = dateString.split(/\D/g);
            return [p[2],p[1],p[0] ].join("/");
        }



    }
});


