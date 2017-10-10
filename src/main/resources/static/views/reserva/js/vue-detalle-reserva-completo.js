Vue.component('my-detalle-reserva-completo', {
    template: `
<div>       

 
 <div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2>Datos de la Reserva </h2>
					<!-- Breadcrumbs -->
					<nav id="breadcrumbs">
						<ul>
							<li><a href="#">Home</a></li>
							<li><a href="#">Dashboard</a></li>
							<li>Datos de la reserva </li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
		
			<div class="add-listing-section">

						<!-- Headline -->
						<div class="add-listing-headline">
							<h3><i class="sl sl-icon-doc"></i> Información Básica del Cuidador</h3>
						</div>

						<!-- Title -->
						<div class="row with-forms">
							<div class="col-md-12">
								<h3> <b>Nombre del cuidador </b></h3>
								{{reserva.cuidador.nombre}}
							</div>
						</div>

						<!-- Row -->
						<div class="row with-forms">

							<!-- Status -->
							<div class="col-md-6">
								<h5>Category</h5>
								<select class="chosen-select-no-single" >
									<option label="blank">Select Category</option>	
									<option>Eat & Drink</option>
									<option>Shops</option>
									<option>Hotels</option>
									<option>Restaurants</option>
									<option>Fitness</option>
									<option>Events</option>
								</select>
							</div>

							<!-- Type -->
							<div class="col-md-6">
								<h3><b>Precio Final </b></h3>
								{{reserva.PrecioTotal}}
							</div>

						</div>
						<!-- Row / End -->

					</div>
					
					
					<!-- Section -->
					<div class="add-listing-section margin-top-45">

						<!-- Headline -->
						<div class="add-listing-headline">
							<h3><i class="sl sl-icon-location"></i> Direccion</h3>
						</div>

						<div class="submit-section">

							<!-- Row -->
							<div class="row with-forms">

								<!-- City -->
								<div class="col-md-6">
									<h5>City</h5>
									<select class="chosen-select-no-single" >
										<option label="blank">Select City</option>	
										<option>New York</option>
										<option>Los Angeles</option>
										<option>Chicago</option>
										<option>Houston</option>
										<option>Phoenix</option>
										<option>San Diego</option>
										<option>Austin</option>
									</select>
								</div>

								<!-- Address -->
								<div class="col-md-6">
									<h5>Address</h5>
									<input type="text" placeholder="e.g. 964 School Street">
								</div>

								<!-- City -->
								<div class="col-md-6">
									<h5>State</h5>
									<input type="text">
								</div>

								<!-- Zip-Code -->
								<div class="col-md-6">
									<h5>Zip-Code</h5>
									<input type="text">
								</div>

							</div>
							<!-- Row / End -->

						</div>
					</div>
					
					
					<div class="add-listing-section margin-top-45">

						<!-- Headline -->
						<div class="add-listing-headline">
							<h3><i class="sl sl-icon-picture"></i> Mapa</h3>
						</div>

						<!-- Dropzone -->
						<div class="submit-section">
							<form action="/file-upload" class="dropzone" ></form>
						</div>

					</div>
					
					---
				
					---
					
					

</div>   
    `,
    data:
        function () {
            return {
                url: '',
                reserva:
                    {
                        id: null,
                        perro: {
                            user: {
                                fullName: '',
                                profileImageUrl: '',
                                direccion: {
                                    ciudad: '',
                                },

                            },
                            fotoPerfil: '',
                            nombre: '',
                            birthday: '',
                            raza: {},
                            sexo: '',
                            tamaño: {},
                            listaVacunas: [],
                        },
                        fechaInicio: "",
                        fechaFin: "",
                        precioTotal: 1,
                        status: '',
                        mensaje: '',
                        transaccion: '',
                        cuidador: {
                            nombre:'',
                            user:{
                                email:'',
                                phone:'',
                                profileImageUrl:'',
                                edad:'',
                                direccion:{}
                            }

                        }

                    }
                ,
                message: '',
                perroProfileUrl: '',
                id: null,
                edadPerro: '',
                showModal: false,
                tamaño: '',

            }
        },
    mounted() {

    },
    methods: {


    }

});
