 Vue.component('Review', {
    template: `
<div>

           <div id="add-review" class="add-review-box" style="background-color: whitesmoke;">

                    <!-- Add Review -->
                    <h1 class="listing-desc-headline margin-bottom-20"  style="font-size: -webkit-xxx-large;"> Reviews </h1>

                
                 <div class="row">
                         <div class="col-md-8"> 
                              	<h3 class="listing-desc-headline margin-bottom-20" style="font-size: xx-large;">tu  calificación para {{entity.name}}</h3>
                         
                         </div>
                   <div class="col-md-3">
						<!-- Uplaod Photos -->
						<div class="add-review-photos margin-bottom-30">
						
							     <div style=" top: 70px;" class="message-avatar"><img :src="entity.profileImage" alt="" style=" width: 100px; height: 100px;"></div>
							
						</div>
					</div>
                 </div>
       
				
				<span class="leave-rating-title" style="margin-top: 0px;">Tu Puntaje para esta reserva  </span>
                    <!-- Rating / Upload Button -->
                    <div class="row">
                        <div class="col-md-6">
                            <!-- Leave Rating -->
                            <div class="clearfix"></div>
                            <div class="leave-rating margin-bottom-30">
                                <input type="radio" name="rating1" id="rating-1" :checked="rating[4] == true" v-on:click="editarPuntaje(4)"/>
                                <label for="rating-1" class="fa fa-star"></label>
                                <input type="radio" name="rating2" id="rating-2" :checked="rating[3] == true" v-on:click="editarPuntaje(3)"/>
                                <label for="rating-2" class="fa fa-star"></label>
                                <input type="radio" name="rating3" id="rating-3" :checked="rating[2] == true" v-on:click="editarPuntaje(2)"/>
                                <label for="rating-3" class="fa fa-star"></label>
                                <input type="radio" name="rating4" id="rating-4"  :checked="rating[1] == true" v-on:click="editarPuntaje(1)"/>
                                <label for="rating-4" class="fa fa-star"></label>
                                <input type="radio" name="rating5" id="rating-5" :checked="rating[0] == true" v-on:click="editarPuntaje(0)"/>
                                <label for="rating-5" class="fa fa-star"></label>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        
					
                    </div>

                    <!-- Review Comment -->
                    <div id="add-comment" class="add-comment">
                        <fieldset>


                            <div>
                                <label>Comentario:</label>
                                <textarea cols="40" rows="3" v-model="calificacion.comentario" required maxlength="500"></textarea>
                            </div>

                        </fieldset>

                        <button class="button" v-on:click="enviarReview()">Enviar </button>
                        <div class="clearfix"></div>
                    </div>

                </div>
              
     
</div>
 
`,
     data:
 function () {
     return {

            calificacion:{
                id:'',
                comentario:'',
                puntaje:'',
                from_owner:'',
                reserva: {
                    id:'',
                    status:'',
                },
            },
             entity:{
              name:'',
                 profileImage:'',

             }
            ,
            id:'',
           rating: [false,false,false,false,false],
            total : 0,
         rol:'',
         url:'/api/calificaciones/',
     }
 },
 mounted() {
     this.id = this.getParameterByName('id');
     this.getReserva(this.id);


 },
 methods: {
     getParameterByName(name) {
         name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
         var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
             results = regex.exec(location.search);
         return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
     },
     getReserva(id) {
         //this.id ="32";
         axios.get('/api/user/me/reservas/' + id)
             .then((response) => {
                 this.calificacion.reserva = response.data;
                 this.rol = this.getParameterByName('rol');

                  if (this.rol ==="CUIDADOR")
                  {

                      this.entity.name = this.calificacion.reserva.perro.nombre;
                      this.entity.profileImage = this.calificacion.reserva.perro.fotoPerfil;
                      this.calificacion.from_owner = false;
                  }
                  else
                  {


                      this.entity.name = this.calificacion.reserva.cuidador.user.fullName;
                      this.entity.profileImage = this.calificacion.reserva.cuidador.user.profileImageUrl;
                      this.calificacion.from_owner = true;
                  }
             })
             .catch(error => {
                 console.log(error);
                 this.message = "Actualmente no se encuentra la reserva.";
                 sweetAlert("Oops...", "Actualmente no se encuentra la reserva.", "error");
             });
     },
     enviarReview()
        {
            if (!this.obtenerPuntaje() ||this.calificacion.comentario === "" ) {
                sweetAlert("Oops...", "Error, Se deben ingresar un Puntaje o comentario   ", "error");
                return;
            }
            this.calificacion.puntaje = this.total;
           // var urlReview = "/api/calificaciones/";
           // this.setearEstadoReserva();
            var payload = jQuery.extend(true, {}, this.calificacion);
            axios.post(this.url,payload )
                .then((response) => {
                    console.log(response);
                    sweetAlert({
                            title: " Review exitosa ",
                            text: "tu calificación  fue  guardarda  exitosamente.",
                            type: "success",
                        },
                        function () {
                            window.location.href = "/views/dashboard/dashboard.html";
                        });

                   // sweetAlert("Guardada!", "tu calificacion  fue  guardarda  exitosamente.", "success");

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error", "error");
                    }
                );
        },
         editarPuntaje(point)
         {

             this.rating =[false,false,false,false,false];
             for (i = 4; i >= 0; i--) {
                    if (i> point)
                    {
                        this.rating[i] = false
                    }
                    else
                    {
                     this.rating[i] = true}

                 }


         },

     obtenerPuntaje()
     {
          var flag = false;

         for (i = 4; i >= 0; i--) {
               if (this.rating[i] === true)
               {
                   this.total = i+1;
                   flag = true;
                   break;
               }

         }



          return flag;

     },
     setearEstadoReserva()
     {

         if( this.calificacion.reserva.status === "finalizada")
         {
             this.calificacion.reserva.status = "comentario-cuidador";

         }

         else
         {   if( this.calificacion.reserva.status === "comentario-dueño")
              {  this.calificacion.reserva.status = "cerrada";}

         }

     }
 },
});