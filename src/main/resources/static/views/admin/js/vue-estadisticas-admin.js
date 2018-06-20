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
		
			<br>
			<div class="row">
			<div class="zoom">
		<div class="col-lg-6 col-md-6">
		
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color:gainsboro;"> <i class="im im-icon-Line-Chart"></i> Mis ultimos  meses</h4>
             <chart-admin1>
             
            </chart-admin1>
                </div>
         </div>
         </div>

         
         <div class="zoom">
         <div class="col-lg-6 col-md-6">
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color: gainsboro;"><i class="im im-icon-Line-Chart"></i> Estados de mis Reservas</h4>
               <chart-admin2>
               
                </chart-admin2>
                </div>
         </div>
           </div>
			</div>
			
					<div class="row">
			<div class="zoom">
		<div class="col-lg-6 col-md-6">
		
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color:gainsboro;"> <i class="im im-icon-Line-Chart"></i> Mis ultimos  meses</h4>
             <chart-admin3>
             
            </chart-admin3>
                </div>
         </div>
         </div>

         
         <div class="zoom">
         <div class="col-lg-6 col-md-6">
				<div class="dashboard-list-box invoices with-icons">
				<h4 style="background-color: gainsboro;"><i class="im im-icon-Line-Chart"></i> Estados de mis Reservas</h4>
               <chart-admin4>
               
                </chart-admin4>
                </div>
         </div>
           </div>
			</div>
   
   
   
</div>
    `,
    data: {

    }
    ,
    mounted() {

    },
    methods: {

    }
});


