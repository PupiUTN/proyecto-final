// https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

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
                                :disabledDates="fechasDeshabilitadas"
                                v-if="showDatePicker"
                        >
                        </my-hotel-date-picker>
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
                    <div class="radio-button-reserva in-row margin-top-0">
                        <template v-for="perro in perros">
                            <input v-bind:id="'perro_' +perro.id" type="radio" name="perro"
                                   v-bind:value="perro"
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
                checkboxPerros: {},
                isMounted: false,
                fechasDeshabilitadas: [],
                showDatePicker: false,
                idCuidador: null
            }
        }
        , mounted() {
            this.bindUrlWithVue();
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
                this.idCuidador = this.getParameterByName('id');
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
                        this.getReservasPagadasYEjecucion();
                    })
                    .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, get Cuidador ", "error");
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
                            sweetAlert("Oops...", "Error get perro, ver consola", "error");
                        }
                    );
            },
            postReserva() {
                this.reserva.perro = this.checkboxPerros;
                if (this.reserva.perro.tamaño.valorMaximo > this.reserva.cuidador.tamaño.valorMaximo) {
                    sweetAlert("Perro Invalido", "El tamaño del perro selecionado excede el tamaño maximo admitido por el cuidador actual", "info");
                    return;
                }
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
                // todo MUY IMPORTANTE, EL FORMATO EN FRONT Y EN BACK DEBE SER EL MISMO
                this.reserva.fechaInicio = fecha.format(dateFromObj, 'YYYY-MM-DD');
                this.reserva.fechaFin = fecha.format(dateToObj, 'YYYY-MM-DD');
                //this.reserva.cuidador.user.birthday = null;
                console.log(this.reserva);
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
                            sweetAlert("Oops...", "Error post reserva, ver consola", "error");
                        }
                    );
            },
            setDatesToDatePickerInput() {
                var self = this;
                setTimeout(function () {
                    if (self.reserva.fechaInicio != "" & self.reserva.fechaFin != "") {
                        var value = self.reserva.fechaInicio + '-' + self.reserva.fechaFin;
                        self.$refs.myHotelDatePicker.setValue(value);
                    }
                }, 1000);

            },
            complemento: function (promedioReviews) {
                return 5 - promedioReviews
            },
            getReservasPagadasYEjecucion() {
                // obtengo las reservas
                // PAGADAS DUEÑO y ejecucion
                axios.get("/api/reservas/fromToday/?idCuidador=" + this.idCuidador + "&status=pagada-due%C3%B1o&status=ejecucion")
                    .then((response) => {
                        let fechasList = this.calcularListadoDeFechas(response.data);
                        this.fechasDeshabilitadas = this.calcularFechasDeshabilitadas(fechasList);
                        // como las properties del componente no son reactivas debo montar el date picker luego de calcular las fecha
                        this.showDatePicker = true
                        this.setDatesToDatePickerInput();
                    })
                    .catch(error => {
                        this.showDatePicker = true
                        console.log(error);
                        sweetAlert("Oops...", "Error getReservasPagadasYEjecucion ", "error");
                    });

            },
            calcularFechasDeshabilitadas(fechasList) {
                // debemos deshabilitar aquellas fechas que en el mismo dia tiene mayor o igual cantidad de reservas
                // que la maxima admitida por el cuidador
                let cantidadReservasPorDia = new Map()
                for (let i = 0; i < fechasList.length; i++) {
                    let fecha = fechasList[i];
                    let frecuencia = cantidadReservasPorDia.get(fecha);
                    if (frecuencia === undefined) {
                        cantidadReservasPorDia.set(fecha, 1);
                    } else {
                        cantidadReservasPorDia.set(fecha, frecuencia + 1);
                    }
                }
                let fechasSuperanCantidadMaximaDePerro = [];
                for (var [key, value] of cantidadReservasPorDia.entries()) {
                    if (value >= this.reserva.cuidador.cantidadMaxDePerros) {
                        fechasSuperanCantidadMaximaDePerro.push(key)
                    }
                }
                return fechasSuperanCantidadMaximaDePerro;
            },
            calcularListadoDeFechas(reservasPagadasYEjecucion) {
                // creo una lista con todas las fechas de todas las reservas
                let datesList = [];
                for (var i = 0; i < reservasPagadasYEjecucion.length; i++) {
                    // Do stuff with arr[i] or i
                    let reserva = reservasPagadasYEjecucion[i];
                    let dates = this.getDatesBetween(reserva.fechaInicio, reserva.fechaFin)
                    datesList.push(...dates)
                }
                return datesList;
            },
            getDatesBetween(startDate, stopDate) {
                var dateArray = new Array();
                var currentDate = fecha.parse(startDate, 'YYYY-MM-DD');
                var stopDate = fecha.parse(stopDate, 'YYYY-MM-DD');
                while (currentDate <= stopDate) {
                    dateArray.push(fecha.format(currentDate, 'YYYY-MM-DD'));
                    currentDate = currentDate.addDays(1);
                }
                return dateArray;
            }


        }
    })
;


