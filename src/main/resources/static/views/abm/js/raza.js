Vue.component('my-raza', {
    template:
        `
<div class="row">
    <div class="col-lg-12">
        <div id="add-listing">
            <!-- Section -->
            <div class="add-listing-section">
                <!-- Headline -->
                <div class="add-listing-headline">
                    <h3><i class="sl sl-icon-doc"></i>Razas</h3>
                </div>
                <!-- Form -->
                <div class="row">
                    <div v-if="formPost">
                        <form v-on:submit.prevent='postItem()'>
                            <div class="col-md-10 col-sm-12">
                                <div>
                                    <input type="text" v-model="item.nombre" placeholder="Raza"
                                           required="required">
                                </div>
                            </div>
                            <div class="col-md-2 col-sm-12">
                                <div>
                                    <button type="submit" class="button medium border"><i
                                            class="sl sl-icon-plus"></i> Nueva Raza
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-else>
                        <form v-on:submit='editItem()'>
                            <div class="col-md-2 col-sm-12">
                                <div>
                                    <input type="number" class="disabled" v-model="item.id" placeholder="Id"
                                           required="required" disabled>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-12">

                                <div>
                                    <input type="text" v-model="item.nombre" placeholder="Raza"
                                           required="required">
                                </div>
                            </div>
                            <div class="col-md-2 col-sm-12">
                                <div>
                                    <button type="submit" class="button medium border"><i
                                            class="sl sl-icon-note"></i> Editar Raza
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-2 col-sm-12">
                                <div>
                                    <a href="#" class="button medium border"
                                       v-on:click='editItemButtonUndo'><i
                                            class="sl sl-icon-action-undo"></i> Volver a Nueva</a>
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
                        <th>Raza</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody id="table-items">
                    <tr v-for="(item, index) in items" id="table-section">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nombre }}</td>
                        <td><a href="#" v-on:click='editItemActionButton(index)'> <i
                                class="sl sl-icon-note"></i>
                            Editar </a></td>
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
        url: "/api/razas",
        item: {
            index: '',
            id: '',
            nombre: ''
        },
        items: [],
        formPost: true,
        }
    },
    mounted() {
        this.getCuidador(this.url);
    },
    methods: {
        getCuidador() {
            axios.get(this.url)
                .then((response) => {
                    this.items = response.data;
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        postItem() {
            var payload = jQuery.extend(true, {}, this.item); //copio el objeto a mandar porque despues lo edito
            axios.post(this.url, payload)
                .then((response) => {
                    console.log(response);
                    this.items.push(response.data); //agrego la respuesta asi no refresco la pagina
                    this.item.nombre = '';
                    sweetAlert("Guardado!", "Nueva Raza creada exitosamente.", "success");
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        editItem() {
            var payload = jQuery.extend(true, {}, this.item);
            axios.put(this.url + '/' + this.item.id, payload)
                .then((response) => {
                    this.items[this.item.index] = response.data;
                    sweetAlert("Editado!", "Raza editada exitosamente.", "success");
                    this.editItemButtonUndo();
                    console.log(response);
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");

                    }
                );
        },
        editItemActionButton(index) {
            this.formPost = false;
            this.item.index = index;
            this.item.id = this.items[index].id;
            this.item.nombre = this.items[index].nombre;

        },
        deleteItem(index) {

            var id = this.items[index].id;
            axios.delete(this.url + '/' + id)
                .then((response) => {
                    sweetAlert("Eliminada!", "Raza eliminada correctamente.", "success");
                    Vue.delete(this.items, index);
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");

                    }
                );
        },
        deleteItemActionButton(index) {
            var id = this.items[index].id;
            sweetAlert({
                    title: "Confirmar accion",
                    text: "Quiere eliminar la Raza con id: " + id + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, borrar",
                    closeOnConfirm: false,
                    cancelButtonText: "Cancelar",
                    showLoaderOnConfirm: true,
                },
                function () {
                    vm.$refs.myRaza.$refs.currentView.deleteItem(index, id)
                });
        },
        editItemButtonUndo() {
            this.formPost = true;
            this.item.id = null;
            this.item.nombre = null;
        },

    }
});

