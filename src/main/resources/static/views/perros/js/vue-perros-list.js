Vue.component('my-perros-list', {
    template: `
<div>       
        
        <!-- Titlebar -->
		<div id="titlebar">
			<div class="row">
				<div class="col-md-12">
					<h2>Mis Perros</h2><span>Agrega a tus mejores amigos</span>

                        <!-- Breadcrumbs -->
                        <nav id="breadcrumbs">
                            <ul>
                                <a href="/views/perros/registrar-perros.html" class="button border with-icon">Añadir
                                    Perro <i class="sl sl-icon-plus"></i></a>
                            </ul>
                        </nav>
				</div>
			</div>
		</div>
      
        <div class="row">
            
        
            <div class="col-lg-12 col-md-12 padding-right-30">
        
                <div class="row">
        
                    <!-- Listing Item -->
                    <div v-show="dogs.length > 0" v-for="dog in dogs" :id="dog.id" class="col-lg-6 col-md-12">
                        <div class="listing-item-container list-layout">
                            <a :href="'/views/perros/registrar-perros.html?id=' + dog.id " class="listing-item">
        
                                <!-- Image -->
                                <div class="listing-item-image">
                                    <img :src="dog.fotoPerfil" alt="">
                                    <span class="tag"> {{dog.raza.nombre}} </span>
                                </div>
        
                                <!-- Content -->
                                <div class="listing-item-content">
                                    <div class="listing-badge now-open"> {{dog.tamaño.nombre}}</div>
        
                                    <div class="listing-item-inner">
                                        <h3>{{dog.nombre}}</h3>
                                        <span>promedio:</span>
                                        <div class="star-rating" data-rating="3.5">
                                            <div class="rating-counter"><h3>{{dog.promedioReviews}}</h3></div>
                                            
                                                <br>
                                                <br>
                                             <div class="" >
                                            <a v-on:click="eliminarPerro(dog.id)" href="#" class="button medium border pull-right"><i class="sl sl-icon-docs"></i> Eliminar</a>
                                 </div>
                                        </div>
                                    </div>                               
                                    <!--<span class="like-icon"></span>-->
                                </div>
                                
                            </a>
                              
                        </div>
                    </div>
        
                    <div v-show="dogs.length == 0">
                        <h3>{{message}}</h3>
                    </div>
                    <!-- Listing Item / End -->
                </div>
        
            </div>
        </div>
</div>    
    `,
    data:
        function () {
            return {
                user: {},
                dogs: [],
                url: "/api/user/",
                message: "",
                deleteDog: false,
                flagDelete: '',
                indexPerro:0,
                promedio:'3,5'
            }
        },
    mounted() {
        this.getUserInfo();
    },
    methods: {

        getUserInfo() {
            axios.get("/api/user/me")
                .then((sessionInfo) => {
                    this.isUserLoggedIn(sessionInfo);
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                    console.log("redirect");
                    document.location.href = "/";
                });
        },
        isUserLoggedIn(sessionInfo) {
            if (sessionInfo.status === 200) {
                this.user = sessionInfo.data.principal.user;
                this.getUserDogs();
            }
            else {
                console.log(sessionInfo.status + "|" + sessionInfo.statusText);
                sweetAlert("Oops...", "Necesitas estar logueado para acceder a este contenido", "error");
            }
        },
          eliminarPerro(index)
          {
              swal({
                      title: "Estas seguro?",
                      text: "Deseas eliminar esta mascota de tu lista ?",
                      type: "warning",
                      showCancelButton: true,
                      cancelButtonText:"Cancelar",
                      confirmButtonClass: "btn-danger",
                      confirmButtonText: "si, hazlo!",
                      closeOnConfirm: false
                  },
                  function(){

                      vm.$refs.myPerrosList.$refs.currentView.eliminar(index);
                  });


          },
        eliminar(index)
        {
            axios.get(this.url + this.user.id + "/eliminarPerro/" + index)
                .then((response) => {
                    this.deleteDog = response.data;

                    if (this.deleteDog )
                    {
                        sweetAlert({
                                title: "Tu mascota ha sido borrada!",
                                text: "Tu mascota ha sido eliminada de tu lista",
                                type: "success",
                                confirmButtonText: "aceptar"
                            },
                            function(){
                                vm.$refs.myPerrosList.$refs.currentView.getUserDogs();
                            });

                    }
                    else
                    {
                        sweetAlert({
                                title: "No se puede eliminar tu mascota!",
                                text: "Tu mascota tiene una reserva en ejecuccion o un comentario pendiente, por lo tanto no puede ser eliminada",
                                type: "warning",
                                confirmButtonText: "aceptar"
                            },
                            function(){
                            });
                    }


                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });

        },
        getUserDogs() {
            axios.get(this.url + this.user.id + "/perros")
                .then((response) => {
                    this.dogs = response.data;
                    if (this.dogs.length === 0) {
                        this.message = "Actualmente no tenés ningún perro registrado. Agrega el primero!";
                    }





                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        }
    }
});

