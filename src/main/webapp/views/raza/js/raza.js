let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/razas",
        item: {
            index: '',
            id: '',
            nombre: ''
        },
        items: [],
        formPost: true,

    },
    mounted() {

        this.getItems(this.url);
    },
    methods: {
        toggleLoader() {
            $('#spinner').toggle();
        },
        getItems() {
            axios.get(this.url)
                .then((response) => {
                    this.items = response.data;
                    this.toggleLoader();
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        postItem() {
            this.toggleLoader();
            var payload = jQuery.extend(true, {}, this.item); //copio el objeto a mandar porque despues lo edito
            axios.post(this.url, payload)
                .then((response) => {
                    this.toggleLoader();
                    console.log(response);
                    this.items.push(response.data); //agrego la respuesta asi no refresco la pagina
                    this.item.nombre = '';
                    sweetAlert("Guardado!", "Nueva raza creada exitosamente.", "success");

                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },
        editItem() {
            this.toggleLoader();
            var payload = jQuery.extend(true, {}, this.item);
            axios.put(this.url + '/' + this.item.id, payload)
                .then((response) => {
                    this.toggleLoader();
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
            this.toggleLoader();
            var id = this.items[index].id;
            axios.delete(this.url + '/' + id)
                .then((response) => {
                    this.toggleLoader();
                    sweetAlert("Deleted!", "Your imaginary file has been deleted.", "success");
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
                    text: "Quiere eliminar la raza con id: " + id + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, borrar",
                    closeOnConfirm: false,
                    cancelButtonText: "Cancelar",
                    showLoaderOnConfirm: true,
                },
                function () {
                    vm.deleteItem(index, id)
                });
        },
        editItemButtonUndo() {
            this.formPost = true;
            this.item.id = null;
            this.item.nombre = null;
        },

    }
});

