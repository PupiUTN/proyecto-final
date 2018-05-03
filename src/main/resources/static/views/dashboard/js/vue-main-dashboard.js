let myMainDashboard = Vue.component('my-main-dashboard', {
    template: `
<div>


        <!-- Titlebar -->
		<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2>Resumen</h2> 
				</div>
			</div>
		</div>
		<!-- Content -->
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
					<div class="dashboard-stat-content"><h4>{{estadisticas.totalVisitas}}</h4> <span>Visitas</span></div>
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
  <button-counter></button-counter>

        <br>
         <br>
  <chart-pie></chart-pie>

     

</div>
`,
    data: function () {
        return {
            estadisticas:{
                cantidadPorMes:[],
                promedio:'',
                totalVisitas:'',
                totalPorTipo:[],
                cantidadTotal:'',

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

            })
            .catch(error => {
                console.log(error);
                sweetAlert("Oops...", "Error, ver consola", "error");
            });
    },

    }


});

