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
			<div class="col-md-12">			    
				<div class="notification success closeable margin-bottom-30 ">
					<p> <strong>Estos son los datos de pupi</strong>!</p>    					                    <!-- <a class="close" href="#"></a>-->
			</div>
			
			</div>
		
		</div>
		
			<div class="row">
			<!-- Item -->
			<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-1">
					<div class="dashboard-stat-content" style="font-size: 40px;">0<br><span>Reservas</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Cursor-Click2"></i></div>
				</div>
			</div>
           
			<!-- Item -->
		
			<div  class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-2">
					<div class="dashboard-stat-content" style="font-size: 40px;">0 <br><span>Visitas</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Line-Chart"></i></div>
				</div>
			</div>
	<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-4">
					<div class="dashboard-stat-content"><h4>0</h4> <span>Favoritos</span></div>
					<div class="dashboard-stat-icon"><i class="im im-icon-Heart"></i></div>
				</div>
			</div>



			
			<!-- Item -->
			<div class="col-lg-3 col-md-6">
				<div class="dashboard-stat color-3">
					<div class="dashboard-stat-content" style="font-size: 40px;">0<br> <span>Puntaje</span></div>
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
						<h3>Denuncias</h3>
						<span class="value">Free</span>
						<span class="period">Free of charge one standard listing active for 90 days</span>
					</div>


				</div>
				
					<div class="plan">

					<div class="plan-price">
						<h3>Solicitudes</h3>
						<span class="value">Free</span>
						<span class="period">Free of charge one standard listing active for 90 days</span>
					</div>


				</div>


				<!-- Plan #3 -->

				<!-- Plan #3 -->
				<div class="plan">

					<div class="plan-price">
						<h3>Dinero Actual</h3>
						<span class="value">$59</span>
						<span class="period">Monthly subscription for unlimited listings and lifetime availability</span>
					</div>

			
				</div>

			</div>
		</div>
	</div>
	<!-- Row / End -->


<div class="row">
		
		<div class="col-md-12">

			<h4 class="headline margin-top-70 margin-bottom-30">TABLA</h4>
			<table class="basic-table">

				<tr>
					<th>Column 1</th>
					<th>Column 2</th>
					<th>Column 3</th>
					<th>Column 4</th>
				</tr>

				<tr>
					<td>Item</td>
					<td>Description</td>
				</tr>

				<tr>
					<td>Item</td>
					<td>Description</td>
				</tr>

				<tr>
					<td>Item</td>
					<td>Description</td>
				</tr>

				<tr>
					<td>Item</td>
					<td>Description</td>
				</tr>
			</table>
		</div>

		
   
   
</div>
    `,
    data: function () {
        return {

        }

    }
    ,
    mounted() {

    },
    methods: {

    }
});


