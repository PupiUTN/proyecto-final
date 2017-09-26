Vue.component('my-detalle-reserva', {
    template: `
<div>       
  <h1 > Detalles de la Reserva</h1>
<div id="footer">

    
	<!-- Header -->
	<div class="row">
	
		<div class="col-md-2 col-lg-12 col-xs-12">
		<div class="avatar"><img id="foto_user"  :src="reserva.perro.user.profileImageUrl" alt="" style="max-width: 200px;margin-left: 20px;margin-top: -50px;"></div>
		
		</div>

		<div class="col-md-4 col-lg-12" style="margin-top: -30px; ">	
            <p id="details" style="margin-left: 50%;">
				<strong>Usuario:</strong> {{reserva.perro.user.fullName}} <br>					
			</p>
			<p id="details" style="margin-left: 50%;">
				<strong>Estado:</strong> {{reserva.status}} <br>
					<strong>Fecha:</strong>  {{reserva.fechaTransaccion}} <br>				
			</p>
			
		</div>
	</div>
<br>

	<!-- Client & Supplier -->
	<div class="row">
	
        <div class="col-md-6">
		 
			
		</div>
		<div class="col-md-2">	
			<strong class="margin-bottom-5">Fecha inicio</strong>
			<p> {{reserva.fechaInicio}}
			</p>
		</div>

		<div class="col-md-2">	
			<strong class="margin-bottom-5">Fecha Fin</strong>
			<p> {{reserva.fechaFin}}
			</p>
		</div>
		<div class="col-md-12 " style=" left: 40px;">	
		<strong class="margin-bottom-5">Precio total: </strong> <label style=" color: green;font-size: 30px;margin-bottom: 20px;">{{reserva.precioTotal}} $</label>
			
		</div>
			<div class="col-md-12" style=" left: 25px;">
		 <div class=" col col-md-12 col-lg-10"> <strong class="margin-bottom-5">Mensaje:</strong></div> 
		     
			<div class=" col col-md-10 col-lg-10">{{reserva.mensaje}}</div>
			
		</div>
	</div>

		
	</div>
	<br>
	<br>
	
  <h1 > Mascota a Cuidar </h1>
  
    <div id="footer">
	    <!-- Header -->
<div class="row">

    <div class="col-md-2 col-lg-12 col-xs-12">
    <div class="zoom">
          <div  class="avatar"><img id="foto_perro" class="zoom" :src="reserva.perro.fotoPerfil" alt="" style="max-width: 200px;margin-left: 20px;margin-top: -50px;"></div>
    </div>
    </div>
    

    <div class="col-md-4 col-lg-12" style="margin-top: -30px; ">
        <p id="details" style="margin-left: 50%;">
            <strong>Nombre:</strong> {{reserva.perro.nombre}} <br>
        </p>
        <p id="details" style="margin-left: 50%;">
            <strong>Edad:</strong> {{edadPerro}} <br>
            <strong>Raza:</strong> {{reserva.perro.raza.nombre}} <br>
        </p>

    </div>
    
    
</div>
<br>

<div class="row">


    <div class="col-md-12 " style=" left: 40px;">
        <strong class="margin-bottom-5">Tamaño  : </strong> <label style=" margin-bottom: 20px;">{{tamaño}} </label>

    </div>
   
</div>
        
   <!-- Reviews -->
<div id="listing-reviews" class="listing-section">
<div class = "text-center">
    <h3 class="listing-desc-headline margin-top-20 margin-bottom-20">Reviews <span>(1)</span></h3>
</div>
    <div class="clearfix"></div>
     <div class = "col-md-1"> </div>
    <!-- Reviews -->
    <section class="comments listing-reviews" style=" margin-left: 40px;">

        <ul>
            <li>
                <div class="avatar"><img src="../../assets/images/review-image-01.jpg" alt=""/>
                </div>
                <div class="comment-content">
                    <div class="arrow-comment"></div>
                    <div class="comment-by">Fede Backhaus<span class="date">June 2017</span>
                        <div class="star-rating" data-rating="5"></div>
                    </div>
                    <p>Eres el mejor  persona que conoci en mi vida, hurra por ti, te cuidaré
                        siempre </p>
                    <a href="#" class="rate-review"><i class="sl sl-icon-like"></i> Helpful Review
                        <span>12</span></a>
                </div>
            </li>

         </ul>
    </section>

    <!-- Pagination -->
    <div class="clearfix"></div>
    <div class="row">
        <div class="col-md-12">
            <!-- Pagination -->
            <div class="pagination-container margin-top-15">
                <nav class="pagination">
                    <ul>
                        <li><a href="#" class="current-page">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#"><i class="sl sl-icon-arrow-right"></i></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <!-- Pagination / End -->
</div>


        
        </div>
 
	      <br> 
	       
	       
	       
    
	            <div class="center-block">	

	            <div class="col-md-1"></div>
             <div class="col-xs-12 col-md-4" v-if="reserva.status === 'CONFIRMATION_PENDING'" >
                                    <a v-on:click="confirmarReservaButton()"  style="color: blue; border-color: blue; " href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Confirmar</a>
                                </div>
                               

                                <div class="col-xs-12 col-md-3" v-if="reserva.status !== 'CANCEL'" >
                                    <a v-on:click="cancelarReservaActionButton()"  href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Cancelar</a>                        
                                </div>
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
                            raza: {},
                            sexo:'',
                            tamaño: {},

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
                showModal: false,
                tamaño:'',

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
                     this.reserva.fechaTransaccion = new Date();
                    if (this.edadPerro  === 0)
                    {

                        this.edadPerro = " menor a un año";
                    } else
                    {
                         if (this.edadPerro === 1)
                         {
                             this.edadPerro = this.edadPerro + " " + "año";

                         } else
                             if(this.edadPerro  >1)
                         {

                             this.edadPerro = this.edadPerro + " " + "años";
                         }else
                             {
                                 this.edadPerro =  " " ;
                             }

                    }
                    this.tamaño = this.reserva.perro.tamaño.nombre + " " +" (" + this.reserva.perro.tamaño.valorMinimo +" - " + this.reserva.perro.tamaño.valorMaximo +")" +" kgs" ;
                  //  this.reserva.mensaje = " hola que tal buenos dias cmo va
                })
        .catch(error => {
                console.log(error);
            this.message = "Actualmente no se encuentra la reserva.";
            sweetAlert("Oops...", "Actualmente no se encuentra la reserva.", "error");
        });
        },
        cancelarReserva() {

            var id = this.reserva.id;
            axios.put('/api/cuidador/me/reservas/' + id + '/cancelarReserva')
                .then((response) => {

                sweetAlert("Cancelada", "Tu reserva a sido cancelada", "success");
                    document.location.href = "/";
        })
        .catch(error => {
                console.log(error);
            sweetAlert("Oops...", "Error, ver consola", "error");
        }
        );
        },
        ConfirmarReserva() {

            var id = this.reserva.id;
            axios.put('/api/cuidador/me/reservas/' + id + '/confirmarReserva')
                .then((response) => {

                sweetAlert("Aceptada", "Has confirmado la solicitud de reserva, cuando el huesped page te confirmaremos la reserva.", "success");
                    document.location.href = "/";
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
            // var fecha=document.getElementById("user_date").value;

                // Si la fecha es correcta, calculamos la edad
                var values = fecha.split("-");
                var dia = values[2];
                var mes = values[1];
                var ano = values[0];

                // cogemos los valores actuales
                var fecha_hoy = new Date();
                var ahora_ano = fecha_hoy.getYear();
                var ahora_mes = fecha_hoy.getMonth() + 1;
                var ahora_dia = fecha_hoy.getDate();

                // realizamos el calculo
                var edad = (ahora_ano + 1900) - parseInt(ano);
                if (ahora_mes < mes) {
                    edad--;
                }
                if ((mes === ahora_mes) && (ahora_dia < dia)) {
                    edad--;
                }
                if (edad > 1900) {
                    edad -= 1900;
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
