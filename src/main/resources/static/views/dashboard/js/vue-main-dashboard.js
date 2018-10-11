let myMainDashboard = Vue.component('my-main-dashboard', {
    template: `
<div>

  <div  v-show="role !== 'ROLE_ADMIN'">

        <!-- Titlebar -->
		<div id="titlebar">
			<div class="row">
				<div class="col-md-12 col-xs-12">
					<h2> Resumen</h2>
				</div>
			</div>
		</div>
		<!-- Content -->
		<div v-show="role === 'ROLE_USER'" class="col-md-12 row"> 
			   <div class="col-md-3"></div>
			   <div class="col-md-3 margin-top-10 row opening-day js-demo-hours"> <label><h4><i class="im im-icon-Dog" style="margin-right: 10px;"></i>Elige a tu mascota</h4></label></div>
			    <div class="col-md-3">
			     <select id='selector_perro' v-model="selected" >
			        <option v-for="dog in dogs" :value="dog.value">
                                    {{ dog.text }}
                    </option>
			    </select>
			  
			    </div>
	  </div>	
            <br>

		 <div class="col-lg-1 col-md-1"></div>
		<div class="row">
			<!-- Item -->
			<div class="col-lg-3 col-md-6 col-xs-12">
				<div class="dashboard-stat color-1">
					<div class="dashboard-stat-content" style="font-size: 35px;">{{estadisticas.cantidadTotal}} <br><span style="font-size: small;">Reservas exitosas</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Cursor-Click2"></i></div>
				</div>
			</div>
           
			<!-- Item -->
		
			<div v-show="role === 'ROLE_CUIDADOR'" class="col-lg-3 col-md-6 col-xs-12">
				<div class="dashboard-stat color-2">
					<div class="dashboard-stat-content" style="font-size: 40px;">{{estadisticas.totalVisitas}} <br><span style="font-size: small;">Visitas a mi perfil</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Line-Chart"></i></div>
				</div>
			</div>
	<div v-show="role === 'ROLE_USER'" class="col-lg-3 col-md-6 col-xs-12">
				<div class="dashboard-stat color-2">
					<div class="dashboard-stat-content" style="font-size: 40px;">{{estadisticas.totalCuidadores}} <br><span style="font-size: small;">Cuidadores me recibieron</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-MaleFemale"></i></div>
				</div>
			</div>



			
			<!-- Item -->
			<div class="col-lg-3 col-md-6 col-xs-12">
				<div class="dashboard-stat color-3">
					<div class="dashboard-stat-content" style="font-size: 40px;">{{estadisticas.promedio}}<br> <span style="font-size: small;">Puntaje promedio</span></div>
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
		 <div class="col-lg-1 col-md-1"></div>
		      <div class="row">  
			
			
		<div class="col-lg-9 col-md-10 col-xs-12">
		
				<div class="dashboard-list-box invoices with-icons">
				<h4  style="background-color:gainsboro;"> <i class="im im-icon-Line-Chart"></i>{{mensajeXmes}}</h4>
             <button-counter :cantidad="estadisticas.cantidadPorMes" > 
            </button-counter>
                </div>
         </div>
       
        </div>

        <br>
         <br>
       <div class="col-lg-1 col-md-1"></div>
        <div class ="row">
    		
         <div class="col-lg-9 col-md-9 col-xs-12">
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color: gainsboro;"><i class="im im-icon-Line-Chart"></i> Estados de mis Reservas</h4>
				<div id="chartConteiner">
               <chart-pie  id ="chartPie" :totalPorTipo="estadisticas.totalPorTipo" >
               
                </chart-pie>
                </div>
                </div>
         </div>
          
         </div>
       </div>
       
       <div v-show =" role === 'ROLE_ADMIN'">
       
       <div class="row">
       <div>
         <admin-dashboard :rol="rol">            
                </admin-dashboard>
      </div>
      </div>
</div>

</div>
`,   props: ['role'],
    data: function () {
        return {
            estadisticas:{
                cantidadPorMes:[],
                promedio:'',
                totalVisitas:'',
                totalPorTipo: [],
                cantidadTotal: '',
                nombre:'',
                nombrePerro:'',
                idPerro:'',
                totalCuidadores:'',
            },
            selected:0,
            dogs:  {},
            aux: {},
            cont: 0,
            flag: '',
            list:{},
            rol:'',
            banner:'',
            mensajeXmes:'',
        }
    },
    watch: {
        role: function(newVal, oldVal) { // watch it

            if (this.role == "ROLE_CUIDADOR")
            {   this.rol = this.role;
                this.getCuidadorEstadistica();
                this.mensajeXmes = "Reservas recibidas en los ultimos  meses";
            }

            if (this.role == "ROLE_USER")
            {       this.rol = this.role;
                this.getUserEstadistica();
                this.mensajeXmes = "Reservas realizadas en los ultimos  meses";

            }
            if (this.role == "ROLE_ADMIN")
            {       this.rol = this.role;
            }

        },
        selected: function(newVal, oldVal) { // watch it

            this.estadisticas.cantidadTotal = this.list[newVal].cantidadTotal.toString();
            this.estadisticas.promedio =  Math.trunc(this.list[newVal].promedio) + " / 5";
            this.estadisticas.cantidadPorMes = this.list[newVal].cantidadPorMes;
            this.estadisticas.totalPorTipo = [];
            this.estadisticas.totalPorTipo = this.list[newVal].totalPorTipo;
            this.estadisticas.nombre = this.list[newVal].nombre;
            this.estadisticas.totalCuidadores = this.list[newVal].totalCuidadores;

            this.resetCanvas();
        },


    },
    mounted () {

       // var childMylogin = this.role;




    },
    methods: {
        getCuidadorEstadistica() {

           ///api/cuidador/me/reservas/estadisticas/
            axios.get('/api/estadisticas/cuidadores/')
                .then((response) => {
                    this.banner="Resumen";
                    this.estadisticas = response.data;
                    this.estadisticas.cantidadTotal = response.data.cantidadTotal.toString();
                    this.estadisticas.promedio = response.data.promedio.toString();
                    this.estadisticas.promedio =   this.estadisticas.promedio + " / 5";
                    this.estadisticas.cantidadPorMes = response.data.cantidadPorMes;
                    this.estadisticas.totalVisitas = response.data.totalVisitas.toString();
                    this.estadisticas.totalPorTipo = response.data.totalPorTipo;
                    this.estadisticas.nombre = response.data.nombre;

                    // this.estadisticas.cantidadPorMes = [4,8,7,12,1,8]
                    //

                })
                .catch(error => {
                    sweetAlert({
                            title: "Error",
                            text: "No se pudo recuperar la información",
                            type: "error",
                            confirmButtonText: "Aceptar",
                            closeOnConfirm: false,
                        },
                        function () {
                                window.location.href = "/";
                        });
                });
        },
        getUserEstadistica() {
                    //'/api/user/me/reservas/estadisticas/'
            axios.get('/api/estadisticas/usuarios/')
                .then((response) => {
                    this.list = response.data;
                    if (this.list.length >0) {
                        this.banner="Estos son tus datos";
                        for (i = 0; i < this.list.length; i++) {
                            this.dogs[i] = {value: i, text: this.list[i].nombrePerro};
                        }
                        this.estadisticas.cantidadTotal = this.list[0].cantidadTotal.toString();
                        this.estadisticas.promedio = this.list[0].promedio.toString();
                        this.estadisticas.promedio =   Math.trunc(this.estadisticas.promedio) + " / 5";
                        this.estadisticas.cantidadPorMes = this.list[0].cantidadPorMes;
                        this.estadisticas.totalPorTipo = this.list[0].totalPorTipo;
                        this.estadisticas.nombre = this.list[0].nombre;
                        this.estadisticas.totalCuidadores = this.list[0].totalCuidadores;
                    }
                    else
                    {
                        //sweetAlert("Estadisticas", "Actualmente no posees, genera reservas para ver tus estadísticas", "info");
                        this.banner = "Actualmente no posees reservas, agrega tus mascotas para ver tus estadísticas";
                        document.getElementById("selector_perro").disabled = true;
                        this.estadisticas.cantidadTotal = 0;
                        this.estadisticas.totalCuidadores =0;
                        this.estadisticas.promedio ="0 / 5";
                    }

                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },



    }
});

