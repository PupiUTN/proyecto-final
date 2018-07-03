Vue.component('my-estadistica', {
    template: `
<div>


        <!-- Titlebar -->
		<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2> Mis Estadisticas </h2> <h2> </h2> 
				</div>
			</div>
		</div>
		<!-- Content -->
		<div v-show="flag">
		<div class="row">
			<div class="col-md-12">			    
				<div class="notification success closeable margin-bottom-30 ">
					<p> <strong>Estos son tus datos</strong>!</p>    					                    <!-- <a class="close" href="#"></a>-->
			</div>
			
			</div>
		
		</div>
		
		<div class="col-md-12 row"> 
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
			<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-1">
					<div class="dashboard-stat-content" style="font-size: 40px;">{{estadisticas.cantidadTotal}} <br><span>Reservas</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Cursor-Click2"></i></div>
				</div>
			</div>
           
			<!-- Item -->
	
	<div  class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-2">
					<div class="dashboard-stat-content" style="font-size: 40px;">{{estadisticas.totalCuidadores}} <br><span>Me Cuidaron</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-MaleFemale"></i></div>
				</div>
			</div>

			
			<!-- Item -->
			<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-3">
					<div class="dashboard-stat-content" style="font-size: 40px;">{{estadisticas.promedio}}<br> <span>Puntaje</span></div>
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
				<h4 style="background-color:gainsboro;"> <i class="im im-icon-Line-Chart"></i> Mis ultimos  meses</h4>
             <button-counter :cantidad="estadisticas.cantidadPorMes" >
             
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
				<h4 style="background-color: gainsboro;"><i class="im im-icon-Line-Chart"></i> Estados de mis Reservas</h4>
               <chart-pie :totalPorTipo="estadisticas.totalPorTipo">
               
                </chart-pie>
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
            flag: false,
            list:{},
        }
    },
    watch: {
        selected: function(newVal, oldVal) { // watch it

            this.estadisticas.cantidadTotal = this.list[newVal].cantidadTotal.toString();
            this.estadisticas.promedio = this.list[newVal].promedio.toString();
            this.estadisticas.cantidadPorMes = this.list[newVal].cantidadPorMes;
            this.estadisticas.totalPorTipo = this.list[newVal].totalPorTipo;
            this.estadisticas.nombre = this.list[newVal].nombre;
            this.estadisticas.totalCuidadores = this.list[newVal].totalCuidadores;
        },


    },
    mounted () {

        // var childMylogin = this.role;

        this.getUserEstadistica();


    },
    methods: {
        getUserEstadistica() {

            axios.get('/api/estadisticas/usuarios/')
                .then((response) => {
                    this.list = response.data;
                    if (this.length > 0) {
                        this.flag = true;
                    for (i = 0; i < this.list.length; i++) {
                        this.dogs[i] = {value: i, text: this.list[i].nombrePerro};
                    }
                    this.estadisticas.cantidadTotal = this.list[0].cantidadTotal.toString();
                    this.estadisticas.promedio = this.list[0].promedio.toString();
                    this.estadisticas.cantidadPorMes = this.list[0].cantidadPorMes;
                    this.estadisticas.totalPorTipo = this.list[0].totalPorTipo;
                    this.estadisticas.nombre = this.list[0].nombre;
                    this.estadisticas.totalCuidadores = this.list[0].totalCuidadores;


                }
                    else
                    {    this.flag = false;
                        sweetAlert({
                                title: "No encontramos reservas!",
                                text: "Tus perros no poseen reservas",
                                type: "warning",
                                confirmButtonText: "agrega uno!"
                            },
                        function(){
                            document.location.href = '/views/perros/registrar-perros.html';
                        });



                    }

                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        }

    }
});


