Vue.component('my-detalle-reserva', {
    template: `
<div>       
<div id="footer">
    <h2 class="text-center"> Detalles de la Reserva</h2>
    <br>
	<!-- Header -->
	<div class="row">
	 <div class="col-md-1"></div>
		<div class="col-md-3">
		<img id="foto_perro"  :src="reserva.perro.user.profileImageUrl" alt="">
		</div>

		<div class="col-md-6">	

			<p id="details" style="margin-left: 50%;">
				<strong>estado:</strong> {{reserva.status}} <br>
					<strong>fecha:</strong>  {{reserva.fechaTransaccion}} <br>
				
			</p>
			<p id="details" style="margin-left: 50%;">
				<strong>Usuario:</strong> {{reserva.perro.user.fullName}} <br>
				
				
			</p>
		</div>
	</div>


	<!-- Client & Supplier -->
	<div class="row">
		<div class="col-md-12">
		<strong>Mensaje:</strong>
			<h2>{{reserva.mensaje}}</h2>
			
		</div>
        <div class="col-md-12">
		 
			
		</div>
		<div class="col-md-6">	
			<strong class="margin-bottom-5">Fecha inicio</strong>
			<p> {{reserva.fechaInicio}}
			</p>
		</div>

		<div class="col-md-6">	
			<strong class="margin-bottom-5">Fecha Fin</strong>
			<p> {{reserva.fechaFin}}
			</p>
		</div>
		<div class="col-md-4 ">	
		<h3> Precio total: </h3> {{reserva.precioTotal}}
			
		</div>
		
	</div>

		
	</div>
	<br>
	<br>
	

  
    <div id="footer">
				<div class="dashboard-list-box margin-top-0">
					<h4>Perros a cuidar</h4>
					<ul>
	       	<li>
							<div class="list-box-listing">
								<div class="list-box-listing-img"><a href="#"><img :src="reserva.perro.fotoPerfil" alt="" ></a></div>
								<div class="list-box-listing-content">
									<div class="inner">
										<h3>{{reserva.perro.nombre}}</h3>
										<span>{{reserva.perro.raza.nombre}}</span><br>
										<span>{{edadPerro}} años</span>
										<div class="star-rating" data-rating="5.0">
											<div class="rating-counter">(23 reviews)</div>
										</div>
									</div>
								</div>
							</div>
							<div class="buttons-to-right">
								<button id="show-modal" @click="showModal = true" class="button gray"><i class="sl sl-icon-action-redo"></i> ver Perfil</button>
								 <modal style="z-index:5;" v-if="showModal" @close="showModal = false">
                                    <h3 slot="header">{{reserva.perro.nombre}}</h3>
                                    <img slot="body" class="col-md-3" :src="reserva.perro.fotoPerfil">
                                    <div slot="body">
                                    
                                   <h2> {{reserva.perro.raza.nombre}} </h2>
                                    <h2> tamaño de perro:</h2> <img  class="col-md-3" src="/img/perro_grande.jpg" alt="">
                                    <h2>  edad:</h2> {{edadPerro}}
                                    
                                    ----------
                                    <div id="listing-reviews" class="listing-section">
    <h3 class="listing-desc-headline margin-top-75 margin-bottom-20">Reviews <span>(12)</span></h3>

    <div class="clearfix"></div>

    <!-- Reviews -->
    <section class="comments listing-reviews">

        <ul>
            <li>
                <div class="avatar"><img src="../../assets/images/review-image-01.jpg" alt=""/>
                </div>
                <div class="comment-content">
                    <div class="arrow-comment"></div>
                    <div class="comment-by">Fede Backhaus<span class="date">June 2017</span>
                        <div class="star-rating" data-rating="5"></div>
                    </div>
                    <p>Eres la mejor persona que conoci en mi vida, hurra por ti, te escogeré
                        siempre </p>

                    <a href="#" class="rate-review"><i class="sl sl-icon-like"></i> Helpful Review
                        <span>12</span></a>
                </div>
            </li>
        </ul>
    </section>
</div>
                                    
                                    
                                    
                                    
                                    -----------------
                                    </div>
                                    
                                    </slot>
                                   
                            </modal>
							</div>
						</li>
	       
	       
	       
	         
  <!-- use the modal component, pass in the prop -->
 
	       
	       
	       
	       

		

	
             <div class="col-xs-12 col-md-3" v-if="reserva.status !== 'CANCEL'" style="z-index: -1;">
                                    <a v-on:click="confirmarReservaButton(index)"  style="color: blue; border-color: blue; " href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Confirmar</a>
                                </div>
                               

                                <div class="col-xs-12 col-md-3" v-if="reserva.status !== 'CANCEL'" style="z-index: -1;">
                                    <a v-on:click="cancelarReservaActionButton(index)"  style="  margin-top: 10px;" href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Cancelar</a>                        
                                </div>



</div>   
    `,
    data:
        function () {
            return {
                url:'',
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
                            raza: {}

                        },
                        fechaInicio: "",
                        fechaFin: "",
                        precioTotal: 1,
                        status: '',
                        mensaje: '',
                        transaccion:'',

                    }
                 ,
                message: '',
                perroProfileUrl: '',
                id: null,
                edadPerro:'',
                showModal: false
            }
        },
    mounted() {
        this.id = this.getParameterByName('id');
        this.getReserva();
    },
    methods: {

        getReserva() {
            axios.get('/api/cuidador/me/reservas/' + this.id)
                .then((response) => {
                this.reserva = response.data;
               // document.getElementById("foto_perro").src = this.reserva.perro.fotoPerfil;
                    this.edadPerro = this.calcularEdad(this.reserva.perro.birthday);
        })
        .catch(error => {
                console.log(error);
            this.message = "Actualmente no se encuentra la reserva.";
            sweetAlert("Oops...", "Actualmente no se encuentra la reserva.", "error");
        });
        },
        cancelarReserva(index) {

            var id = this.reservas[index].id;
            axios.put('/api/cuidador/me/reservas/' + id + '/cancelarReserva')
                .then((response) => {

                sweetAlert("Cancelada", "Tu reserva a sido cancelada", "success");
            Vue.delete(this.reservas, index);
        })
        .catch(error => {
                console.log(error);
            sweetAlert("Oops...", "Error, ver consola", "error");
        }
        );
        },
        ConfirmarReserva(index) {

            var id = this.reservas[index].id;
            axios.put('/api/cuidador/me/reservas/' + id + '/confirmarReserva')
                .then((response) => {

                sweetAlert("Aceptada", "Has confirmado la solicitud de reserva, cuando el huesped page te confirmaremos la reserva.", "success");
            Vue.delete(this.reservas, index);
        })
        .catch(error => {
                console.log(error);
            sweetAlert("Oops...", "Error, ver consola", "error");

        }
        );
        },
        confirmarReservaButton(index) {
            var reserva = this.reservas[index];
            sweetAlert({
                    title: "Confirmar accion",
                    text: "Quiere confirmar su reserva con " + reserva.perro.user.fullName + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, confirmar reserva",
                    closeOnConfirm: false,
                    cancelButtonText: "Atras",
                    showLoaderOnConfirm: true,
                },
                function () {
                    console.log(vm);
                    vm.$refs.myReservasCuidadorList.$refs.currentView.ConfirmarReserva(index)
                });
        },
        cancelarReservaActionButton(index) {
            var reserva = this.reservas[index];
            sweetAlert({
                    title: "Confirmar accion",
                    text: "Quieres rechazar su reserva con " + reserva.perro.user.fullName + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, cancelar reserva",
                    closeOnConfirm: false,
                    cancelButtonText: "Atras",
                    showLoaderOnConfirm: true,
                },
                function () {
                    console.log(vm);
                    vm.$refs.myReservasCuidadorList.$refs.currentView.cancelarReserva(index)
                });
        },
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        calcularEdad(fecha) {
            var hoy = new Date();
            var cumpleanos = new Date(fecha);
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }

            return edad;
        },
    },


    computed: {
        tipoDeReservas: function () {
            if (this.reserva.status == 'CONFIRMATION_PENDING') {
                return 'pendientes'
            }
            if (this.reserva.status== 'CANCEL') {
                return 'canceladas'
            }
            return 'Error'
        },
        listClass: function () {
            if (this.reserva.status == 'CONFIRMATION_PENDING') {
                return 'col-xs-12 col-md-7'
            }
            if (this.reserva.status== 'CANCEL') {
                return 'col-xs-12 col-md-10'
            }
        },


    }
});
