let myMainDashboard = Vue.component('my-main-dashboard', {
    template: `
<div>


        <!-- Titlebar -->
		<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2> Bienvenido </h2> <h2> </h2> 
				</div>
			</div>
		</div>
		<!-- Content -->
		<div class="row">
			<div class="col-md-12">
				<div class="notification success closeable margin-bottom-30">
					<p> <strong>Estos son tus datos</strong>!</p>
					<a class="close" href="#"></a>
				</div>
			</div>
		</div>


		 <div class="col-lg-1 col-md-1"></div>
		<div class="row">
			<!-- Item -->
			<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-1">
					<div class="dashboard-stat-content"><h4>{{estadisticas.cantidadTotal}}</h4> <span>Reservas</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Map2"></i></div>
				</div>
			</div>
           
			<!-- Item -->
		
			<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-2">
					<div class="dashboard-stat-content"><h4>{{estadisticas.totalVisitas}}</h4> <span>Visitas en el mes</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Line-Chart"></i></div>
				</div>
			</div>

			
			<!-- Item -->
			<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-3">
					<div class="dashboard-stat-content"><h4>{{estadisticas.promedio}}</h4> <span>Puntaje</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Add-UserStar"></i></div>
				</div>
			</div>

			<!-- Item -->
		<!--	<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-4">
					<div class="dashboard-stat-content"><h4>0</h4> <span>Favoritos</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Heart"></i></div>
				</div>
			</div>-->
		</div>
		
		<br>
			<div class="zoom">
		<div class="col-lg-12 col-md-12">
		
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color:gainsboro;"> Mis ultimos 6 meses</h4>
             <button-counter v-bind:cantidad="estadisticas.cantidadPorMes" >
             
            </button-counter>
                </div>
         </div>
         </div>

        <br>
         <br>
         <div class="row">
        <label class="col-lg-12"> </label>
        <br>
         <label class="col-lg-12"> </label>   
        <br>
        <label class="col-lg-12"> </label>
        </div>
         
         <div class="zoom">
         <div class="col-lg-12 col-md-12">
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color: gainsboro;"> Estados de mis Reservas</h4>
               <chart-pie v-bind:totalPorTipo="estadisticas.totalPorTipo">
               
                </chart-pie>
                </div>
         </div>
           </div>


     

</div>
`,
    data: function () {
        return {
            estadisticas:{
                cantidadPorMes:[5,6,7,8,9,2],
                promedio:'4',
                totalVisitas:'15',
                totalPorTipo:[6,5,4,3,2,10],
                cantidadTotal:'30',

            }

        }
    },
    mounted () {
    this.getCuidadorReservas();


    },
    methods: {
    getCuidadorReservas() {
        axios.get('/api/cuidador/me/reservas/estadisticas/')
            .then((response) => {
                this.estadisticas = response.data;
                this.estadisticas.cantidadTotal = response.data.cantidadTotal;
                this.estadisticas.promedio = response.data.promedio;
                this.estadisticas.cantidadPorMes = response.data.cantidadPorMes;
                this.estadisticas.totalVisitas = response.data.totalVisitas
            })
            .catch(error => {
                console.log(error);
                sweetAlert("Oops...", "Error, ver consola", "error");
            });
    },

    }


});

