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
                            <a href="#" class="listing-item">
        
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
                                        <span>{{dog.comentario}}</span>
                                        <div class="star-rating" data-rating="3.5">
                                            <div class="rating-counter">(12 reviews)</div>
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
                message: ""
            }
        },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        toggleLoader() {
            Pace.start;
        },
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
        getUserDogs() {
            axios.get(this.url + this.user.id + "/perros")
                .then((response) => {
                    this.dogs = response.data;
                    if (this.dogs.length === 0) {
                        this.message = "Actualmente no tenés ningún perro registrado. Agrega el primero!";
                    }
                    this.toggleLoader();
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        }
    }
});

