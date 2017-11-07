let myGenerarReserva = Vue.component('my-generar-reserva', {
        template: `
<div class="container">
    <form v-on:submit.prevent="postReserva">
        <div class="form-group">
        <!--cuidador resume-->
        <div class="col-lg-6 col-md-12 col-lg-offset-3 ">
            <!-- Titlebar -->
            <div id="titlebar" class="listing-titlebar padding-bottom-35 padding-top-35 padding-left-35">
                <div class="listing-titlebar-title">
                    <h2 id="nombre"> {{ reserva.cuidador.user.fullName}} 
                        <span class="listing-tag">Cuidador</span>
                    </h2>
                    <i class="fa fa-map-marker"></i> {{reserva.cuidador.user.direccion.ciudad}}
                    <br>
                    <i class="fa fa-paw"></i> Cantidad maxima de perros: {{reserva.cuidador.cantidadMaxDePerros}}
                    <div class="star-rating" data-rating="5.0">
                        <div class="rating-counter">({{reserva.cuidador.cantidadReviews}} reviews)</div>
                        
                    </div>
                </div>
            </div>
        </div>
    <!-- Fechas -->
    <div class="col-lg-6 col-md-12 col-lg-offset-3">
        <!-- Book Now -->
        <div class="boxed-widget">
            <h3><i class="fa fa-calendar-check-o "></i> Fechas de Reserva </h3>
            <div class="row with-forms  margin-top-0">
                <div class="col-lg-12 col-md-12">
                    <my-hotel-date-picker
                            ref="myHotelDatePicker"
                            format="DD/MM/YYYY"
                            v-on:updateDateRange="bindDates"
                            datePickerId="datepickerId"
                    ></my-hotel-date-picker>
                </div>
            </div>

        </div>
        <!-- Book Now / End -->
    </div>
    <!-- perros-->
    <div class="col-lg-6 col-md-12 col-lg-offset-3">
        <!-- Book Now -->
        <div class="boxed-widget">
            <h3><i class="fa  fa-heart-o"></i>Mis Perros </h3>
            <div class="row with-forms  margin-top-0">
                <!-- Date Picker - docs: http://www.vasterad.com/docs/listeo/#!/date_picker -->
                <div class="col-lg-12 col-md-12">
                    <div class="checkboxes in-row margin-top-0">
                        <template v-for="perro in perros">
                            <input v-bind:id="'perro_' +perro.id" type="checkbox" name="check"
                                   v-bind:value="perro.id"
                                   v-model="checkboxPerros">
                            <label v-bind:for="'perro_' +perro.id">{{perro.nombre}}</label>
                        </template>

                    </div>
                </div>

            </div>

        </div>
        <!-- Book Now / End -->
    </div>
    <!--mensaje-->
    <div class="col-lg-6 col-md-12 col-lg-offset-3">

        <!-- Book Now -->
        <div class="boxed-widget">
            <h3><i class="fa  fa-pencil-square-o "></i> Mensaje </h3>
            <div class="row with-forms  margin-top-0">
                <!-- Date Picker - docs: http://www.vasterad.com/docs/listeo/#!/date_picker -->
                <div class="col-lg-12 col-md-12">
                    <textarea v-model="reserva.mensaje" name="summary" spellcheck="true" required></textarea>
                </div>
            </div>

        </div>
        <!-- Book Now / End -->

    </div>


    <div class="col-lg-6 col-lg-offset-3 padding-bottom-30">
        <!-- progress button animation handled via custom.js -->
        <button class="progress-button button fullwidth margin-top-5">
            <span>Confirmar Solicitud de Reserva</span>
        </button>
    </div>

</div>
</form>
</div>
        `,
        data: function () {
            return {
                urlCuidador: "/api/cuidadores",
                perros: [
                    {
                        id: '',
                        nombre: '',
                    }
                ],
                isAuthenticated: false,
                reserva: {
                    cuidador:
                        {
                            id: null,
                            cantidadMaxDePerros: null,
                            precioPorNoche: 100.0,
                            user: {
                                id: null,
                                email: "",
                                fullName: "",
                                direccion: {
                                    ciudad: "",
                                }
                            },
                        },
                    perro: {
                        id: null
                    },
                    fechaInicio: null,
                    fechaFin: null,
                    precioTotal: null,
                    mensaje: ''
                },
                checkboxPerros: [],
                isMounted: false
            }
        }
        , mounted() {
            this.bindUrlWithVue();
            this.setDates();
        },
        methods: {
            bindDates(e) {
                console.log()
                var split = e.split('-');
                this.reserva.fechaInicio = split[0].replace(/\s/g, '');
                this.reserva.fechaFin = split[1].replace(/\s/g, '');
            },
            bindUrlWithVue() {
                this.reserva.fechaInicio = this.getParameterByName('from');
                this.reserva.fechaFin = this.getParameterByName('to');
            },
            loadReservaContent() {
                this.idCuidador = this.getParameterByName('id');
                this.getCuidador();
                this.getPerros();
            },

            getCuidador() {
                axios.get(this.urlCuidador + "/" + this.idCuidador)
                    .then((response) => {
                        this.reserva.cuidador = response.data;
                    })
                    .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, de Cuidador ", "errorx");
                        }
                    );
            },
            getParameterByName(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            },
            getPerros() {
                axios.get("/api/user/me/perros")
                    .then((response) => {
                        this.perros = response.data;
                        if (this.perros.length == 0) {
                            sweetAlert({
                                    title: "Reserva",
                                    text: "Para reservar necesita agregar al menos un perro",
                                    type: "info",
                                },
                                function () {
                                    console.log("redirect");
                                    document.location.href = "/views/perros/perros.html";
                                });
                        }

                    })
                    .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, ver consola", "error");
                        }
                    );
            },
            postReserva() {
                this.reserva.perro.id = this.checkboxPerros[0];


                if (this.reserva.fechaInicio == "" || this.reserva.fechaFin == "") {
                    console.log("fecha inicio vacia");
                    sweetAlert("Campo Vacio", "Completar Fecha Inicio", "info");

                    return;
                }
                var dateFromObj = fecha.parse(this.reserva.fechaInicio, 'DD/MM/YYYY'); // new Date(2010, 11, 10, 14, 11, 12)
                var dateToObj = fecha.parse(this.reserva.fechaFin, 'DD/MM/YYYY'); // new Date(2010, 11, 10, 14, 11, 12)
                if (dateToObj <= dateFromObj) {
                    console.log("Fecha inicio igual a fecha fin");
                    sweetAlert("Campo Vacio", "Fecha inicio igual a fecha fin", "info");
                    return;
                }
                //MUY IMPORTANTE, EL FORMATO EN FRONT Y EN BACK DEBE SER EL MISMO
                this.reserva.fechaInicio = fecha.format(dateFromObj, 'YYYY-MM-DD');
                this.reserva.fechaFin = fecha.format(dateToObj, 'YYYY-MM-DD');
                //this.reserva.cuidador.user.birthday = null;

                axios.post("/api/user/me/reservas", this.reserva)
                    .then((response) => {
                        sweetAlert({
                                title: "Guardado",
                                text: "Nueva reserva creada exitosamente.",
                                type: "success",
                            },
                            function () {
                                console.log("redirect");
                                document.location.href = "/views/reserva/mis-reservas-user.html?status=creada-dueño";
                            });

                    })
                    .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, ver consola", "error");
                        }
                    );
            },
            setDates() {
                if (this.reserva.fechaInicio != "" & this.reserva.fechaFin != "") {
                    var value = this.reserva.fechaInicio + '-' + this.reserva.fechaFin;
                    this.$refs.myHotelDatePicker.setValue(value);
                }
            },
            complemento: function (promedioReviews) {
                return 5 - promedioReviews
            }


        }
    })
;


