 Vue.component('modal', {
    template: `
<div>
<transition name="modal'">
    <div class="modal-mask">
      <div class="modal-container">
       
        <div class="modal-body">
           <div id="add-review" class="add-review-box">

                    <!-- Add Review -->
                    <h2 class="listing-desc-headline margin-bottom-20"> Review </h2>

                    <span class="leave-rating-title">tu  calificación para </span> <h3>{{entity.name}}</h3>  
            <div style=" top: 70px;" class="message-avatar"><img :src="entity.profileImage" alt=""></div>
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
                    <form id="add-comment" class="add-comment">
                        <fieldset>


                            <div>
                                <label>Review:</label>
                                <textarea cols="40" rows="3" v-model="calificacion.comentario" required maxlength="500"></textarea>
                            </div>

                        </fieldset>

                        <button class="button" v-on:click="enviarReview()">Enviar Review</button>
                        <div class="clearfix"></div>
                    </form>

                </div>
              
        </div>
       
      </div>
    </div>
  </transition>
</div>
 
`,
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        }
    },

     data:
 function () {
     return {
            calificacion:{
                id:'',
                comentario:'',
                puntaje:'',
                reserva: {
                    id:'',
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
     }
 },
 mounted() {
     this.id = this.getParameterByName('id');
     this.getReserva();


 },
 methods: {
     getParameterByName(name) {
         name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
         var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
             results = regex.exec(location.search);
         return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
     },
     getReserva() {
         this.id ="32";
         axios.get('/api/user/me/reservas/' + this.id)
             .then((response) => {
                 this.reserva = response.data;
                 this.rol = this.getParameterByName('rol');

                  if (this.rol ==="CUIDADOR")
                  {

                      this.entity.name = this.reserva.perro.nombre;
                      this.entity.profileImage = this.reserva.perro.fotoPerfil;

                  }
                  else
                  {


                      this.entity.name = this.reserva.cuidador.user.fullName;
                      this.entity.profileImage = this.reserva.cuidador.user.profileImageUrl;

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
            if (!this.obtenerPuntaje()) {
                sweetAlert("Oops...", "Error, Se deben ingresar un Puntaje    ", "error");
                return;
            }
            this.calificacion.puntaje = this.total;
            var urlReview = "/api/calificaciones/";
            axios.post(urlReview, this.calificacion)
                .then((response) => {
                    console.log(response);

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola lalalal", "error");
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

     }
 },
});