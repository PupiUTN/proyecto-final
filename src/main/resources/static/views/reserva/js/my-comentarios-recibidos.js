Vue.component('my-comentarios-recibidos-list', {
    template: `

<div>

    <!-- Titlebar -->
    <div id="titlebar">
        <div class="row">
            <div class="col-md-12">
                <div >
                    <h2>Calificaciones recibidas</h2>
                </div>

            </div>

        </div>

    </div>
    <div class="col-md-12 row">
        <div class="col-md-3"></div>
        <div class="col-md-3 margin-top-10 row opening-day js-demo-hours"> <label><h4><i class="im im-icon-Dog" style="margin-right: 10px;"></i>Elige a tu mascota</h4></label></div>
        <div class="col-md-3">
            <select id='selector_perro' v-model="selected" >
                <option v-for="dog in dogs" :value="dog.id">
                    {{ dog.nombre }}
                </option>
            </select>

        </div>
    </div>
    <br>

    <div class="row">
       
        <div class="col-lg-12 col-md-12">
        <div class="col-md-4"></div>
            <h4 class="col-md-8">{{ message}}</h4>

        </div>
    </div>
        <br>
        <div class="row">

            <!-- Listings -->
            <div class="col-lg-12 col-md-12">
                <div class="messages-container margin-top-0">
                    <div class="messages-inbox">
                        <ul>
                            <li v-for="(calificacion, index) in gridCalificaciones" style="margin-bottom: 5px;">
                                <a v-bind:style="listColor">
                                    <div style=" top: 70px;" class="message-avatar"><img
                                            :src="calificacion.reserva.cuidador.user.profileImageUrl" alt=""></div>
                                    <div class="message-by">

                                        <div class="row">
                                            <div class="col-xs-12 col-md-7">
                                                <div class="message-by-headline">
                                                    <a href="" style="all: unset"><h5>{{
                                                        calificacion.reserva.cuidador.user.fullName }} </h5></a>
                                                </div>
                                                <div class="col-xs-12 col-md-10">
                                                    <p><i> {{ calificacion.comentario}} </i></p>
                                                    <p><b>Puntuacion: </b>
                                                    <div class="star-rating"  id="rating" data-rating ="0">
                                                        <span v-bind:class="{'star': calificacion.puntaje >= 1, 'star empty': calificacion.puntaje  < 1 }" ></span>
                                                        <span v-bind:class="{'star': calificacion.puntaje  >= 2, 'star empty': calificacion.puntaje  < 2 }"></span>
                                                        <span v-bind:class="{'star': calificacion.puntaje  >= 3, 'star empty': calificacion.puntaje  < 3 }" ></span>
                                                        <span v-bind:class="{'star': calificacion.puntaje  >= 4, 'star empty': calificacion.puntaje  < 4 }"></span>
                                                        <span v-bind:class="{'star': calificacion.puntaje  >= 5, 'star empty': calificacion.puntaje  < 5 }"></span>
                                                    </div>

                                                    </p>
                                                </div>

                                            </div>
                                            <div class="col-xs-12 col-md-2">
                                                <p><b>Precio</b> </br>&#36 {{ calificacion.reserva.precioTotal }}</p>
                                            </div>
                                            <div class="col-xs-12 col-md-2">
                                                <p><b>Fecha Reserva</b> </br>{{ calificacion.reserva.fechaInicio }}</p>
                                            </div>


                                        </div>

                                    </div>
                                    <br>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    

<!-- Pagination -->
<div class="clearfix"></div>
<div class="row" v-show="flagPaginate">
    <div class="col-md-12" v-show=" this.calificaciones.length > 0" >
        <!-- Pagination -->
        <div class="pagination-container margin-top-20 margin-bottom-40">
            <nav class="pagination">
                <ul>
                    <li><a :style="offset > 0 ? 'background-color: crimson' : 'background-color: darkgrey'" @click="previous()"><i class="sl sl-icon-arrow-left" style=" font-weight: bold;color: white;"></i></a></li>

                    <li><a  :style="(offset + perPage) < gridData.length ? 'background-color: crimson' : 'background-color: darkgrey'" @click="next()"><i class="sl sl-icon-arrow-right" style=" font-weight: bold;color: white;"></i></a></li>
                </ul>
            </nav>
        </div>
    </div>
</div>



</div>
    `,
    data:
        function () {
            return {
                calificaciones: [
                    {
                        calificacion: {
                            id: '',
                            comentario: '',
                            puntaje: '',
                            from_owner: '',
                            reserva: {
                                id: '',
                                precioTotal:'',
                                status: '',
                                fechaInicio:'',
                                cuidador: {
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
                                    raza: {
                                        nombre:'',
                                    }

                                },
                            },
                        },

                    }
                ],
                message:'',
                perro: {
                },
                offset: 0,
                gridData:[],
                gridCalificaciones: [],
                perPage: 3,
                countPages:1,
                dogs: [],
                selected:0,
                flagPaginate:true,


            }
        },
    watch: {
        offset: function () {
            this.paginate();
        },
        selected: function(newVal, oldVal) { // watch it

            this.getCalificacionesPerro(newVal);
        },

    },
    mounted() {
        this.getPerrosXuser();

    },
    methods:
        {   getPerrosXuser(){

            axios.get('/api/calificaciones/misPerros/')
                .then((response) => {
                    this.dogs = response.data;
                    if (this.dogs.length === 0) {
                        this.message = "Actualmente no tenés ningún perro registrado. Agrega el primero!";
                        document.getElementById("selector_perro").disabled = true;
                        this.flagPaginate= false;
                    }
                    else
                    {  //  this.getCalificacionesPerro(this.dogs[0].id);
                        this.flagPaginate= true;
                        this.selected = this.dogs[0].id;
                    }

                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });


                 },
            getCalificacionesPerro(index) {
                this.gridCalificaciones = [];
                axios.get('/api/calificaciones/misCalificacionesPerro/' + '?id=' + index)
                    .then((response) => {
                        this.calificaciones = response.data;
                        if (this.calificaciones.length === 0) {
                            this.message = "Actualmente no tienes ninguna calificacion.";
                        }
                        else
                        {
                            this.message = "Te calificaron " +this.calificaciones.length + " veces!" ;

                            this.gridData = this.calificaciones;

                            this.gridCalificaciones = this.gridData.slice(this.offset, this.offset + this.perPage);
                        }

                    })
                    .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    });
            },

            paginate() {
                this.countPages = this.gridData / this.perPage;
                if (this.countPages - Math.trunc(this.countPages)> 0.0)
                {
                    this.countPages = Math.trunc(this.countPages) +1;
                }

                this.gridCalificaciones = this.gridData.slice(this.offset, this.offset + this.perPage);

            },
            previous() {
                if(this.offset >0)
                    this.offset = this.offset - this.perPage;
            },
            next() {
                if (this.offset + this.perPage < this.gridData.length)
                    this.offset = this.offset + this.perPage;
            },




        },
    computed: {
        listColor: function () {
            return 'background: rgba(192,192,192,0.3); margin-bottom: 10px;';
        }

    }
});
/**
 * Created by gabriellorenzatti on 9/8/18.
 */