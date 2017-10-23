let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/vacunas",
        item: {
            index: '',
            id: '',
            nombre: ''
        },
        items: [],
        formPost: true,
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

            var payload = jQuery.extend(true, {}, this.item);
            console.log(payload);
            axios.post(this.url, payload)
                .then((response) => {

                    console.log(response);
                    this.items.push(response.data);
                    this.item.nombre = '';
                    sweetAlert("Guardado!", "Nueva vacuna creada exitosamente.", "success");

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
                    sweetAlert("Editado!", "Vacuna editada exitosamente.", "success");
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

                    sweetAlert("Eliminada!", "Vacuna eliminada exitosamente.", "success");
                    Vue.delete(this.items, index);
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");

                    }
                );
        },
        deleteItemActionButton(index) {
            var nombre = this.items[index].nombre;
            var id = this.items[index].id;
            sweetAlert({
                    title: "Confirmar accion",
                    text: "Quiere eliminar la vacuna: " + nombre + " ?",
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
