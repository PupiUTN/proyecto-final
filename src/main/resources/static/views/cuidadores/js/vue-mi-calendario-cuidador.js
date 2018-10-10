Vue.component('mi-calendario-cuidador', {
    template:
        `
<div class="row">
    <div class="col-lg-12">
        <div id="add-listing">
            <!-- Section -->
            <div class="add-listing-section">
                <!-- Headline -->
                <div class="add-listing-headline">
                    <h3><i class="sl sl-icon-calender"></i><b>Cuidador:</b> Mi Calendario</h3>
                </div>
                <!-- Form -->
                <div class="row">
                    <div>
                        <form v-on:submit.prevent='postItem()'>
                            <div class="col-md-6 col-sm-12">
                                <my-hotel-date-picker
                                ref="myHotelDatePicker"
                                format="DD/MM/YYYY"
                                infoFormat="DD/MM/YYYY"
                                datePickerId="datepickerId"
                                v-on:updateDateRange="bindDates"
                                :selectForward="true"
                                v-if="showDatePicker"
                                :moveBothMonths="true"
                                :idCuidador="cuidador.id"
                                :cantidadMaxDePerros="cuidador.cantidadMaxDePerros"
                                required
                                removeLeft
                                 >
                                </my-hotel-date-picker>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <div>
                                    <button type="submit" class="button medium border pull-right"><i
                                            class="sl sl-icon-plus"></i> Insertar Fechas
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- Section -->
                </br>
                <table class="table basic-table table-bordered table-hovers" id="tableList">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody id="table-items">
                    <tr v-for="(item, index) in items" id="table-section">
                        <td>{{ item.id }}</td>
                        <td>{{ item.fechaDeshabilitada }}</td>
                        <td><a href="#" v-on:click='deleteItemActionButton(index)'><i
                                class="sl sl-icon-close"></i> Eliminar</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- Section / End -->
        </div>
    </div>
</div>

    `,
    data: function () {
        return {
            cuidadorUrl: "/api/cuidadores",
            url: "/api/cuidadores/calendario",
            items: [],
            formPost: true,
            showDatePicker: false,
            idUser: parseInt(localStorage.getItem('idUser'), 10),
            cuidador: null,
            fechaInicio: null,
            fechaFin: null
        }
    },
    mounted() {
        this.getCuidadorByUserId(this.url);
    },
    methods: {
        getCalendario() {
            axios.get(this.url + "/" + this.cuidador.id)
                .then((response) => {
                    this.items = response.data;
                    this.showDatePicker = true
                }).catch(error => {
                console.log(error);
                sweetAlert("Oops...", "Error, getCalendario", "error");
            });
        },
        getCuidadorByUserId() {
            this.showDatePicker = false
            axios.get(this.cuidadorUrl + "/user/", {
                params: {
                    "id": this.idUser
                }
            })
                .then((response) => {
                    this.cuidador = response.data;
                    this.getCalendario()
                })
                .catch(error => {
                        this.showDatePicker = true
                        console.log(error);
                        sweetAlert("Oops...", "Error getCuidadorByUserId ", "error");
                    }
                );
        },
        bindDates(e) {
            console.log('bindDates', e);
            var split = e.split('-');
            this.fechaInicio = split[0].replace(/\s/g, '');
            this.fechaFin = split[1].replace(/\s/g, '');
        },
        postItem() {
            let fechasArray = this.$refs.myHotelDatePicker.getDatesBetween(this.fechaInicio, this.fechaFin)
            let body = []
            for (let i = 0; i < fechasArray.length; i++) {
                const fecha = fechasArray[i];
                body.push({
                    fechaDeshabilitada: fecha.fecha,
                    cuidador: this.cuidador

                })
            }
            this.showDatePicker = false
            axios.post(this.url, body)
                .then((response) => {
                    console.log(response);
                    this.items = this.items.concat(response.data); //agrego la respuesta asi no refresco la pagina
                    this.fechaInicio = null;
                    this.fechaFin = null;
                    sweetAlert("Guardado!", "Nuevo Calendario agregado exitosamente.", "success");
                    this.showDatePicker = true
                    setTimeout(() => {
                        this.$refs.myHotelDatePicker.clear()
                    }, 1000);

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                        this.showDatePicker = true
                    }
                );
        },
        deleteItem(index) {
            var id = this.items[index].id;
            this.showDatePicker = false
            axios.delete(this.url + '/' + id)
                .then((response) => {
                    this.showDatePicker = true
                    sweetAlert("Eliminada!", "Fecha eliminada correctamente.", "success");
                    Vue.delete(this.items, index);
                })
                .catch(error => {
                        this.showDatePicker = true
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");

                    }
                );
        },
        deleteItemActionButton(index) {
            var id = this.items[index].id;
            sweetAlert({
                    title: "Confirmar accion",
                    text: "Quiere eliminar la Fecha con id: " + id + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, borrar",
                    closeOnConfirm: false,
                    cancelButtonText: "Cancelar",
                    showLoaderOnConfirm: true,
                },
                function () {
                    vm.$refs.miCalendarioCuidador.$refs.currentView.deleteItem(index, id)
                });
        }

    },
    computed: {}
});
