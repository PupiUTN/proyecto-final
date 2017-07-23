let vm = new Vue({
    el: '#appVue',
    data: {
        items: [],
        url: "/api/razas",
        item: {
            nombre: ''
        }
    },
    mounted() {
        this.showLoader();
        this.getItems(this.url);
    },
    methods: {
        showLoader() {
            $('.spinner').show();
        },
        getItems() {
            axios.get(this.url)
                .then((response) => {
                    $('.spinner').hide();
                    this.items = response.data;
                })
                .catch(error => {
                        console.log(error);
                    }
                );
        },
        postItem() {
            var payload = {nombre: this.item.nombre};
            this.item.nombre = 'Guardando...';
            axios.post(this.url, payload)
                .then((response) => {
                    console.log(response);
                    this.items.push(response.data);
                    this.item.nombre = '';
                    window.scrollTo(0,document.body.scrollHeight);
                })
                .catch(error => {
                        console.log(error);
                    }
                );
        },
        deleteItemAjax(index, id) {
            axios.delete(this.url + '/' + id)
                .then((response) => {
                    sweetAlert("Deleted!", "Your imaginary file has been deleted.", "success");
                    Vue.delete(this.items, index);
                })
                .catch(error => {
                        console.log(error);
                    }
                );
        },
        deleteItemConfirm(index, id) {
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
                    vm.deleteItemAjax(index, id)
                });
        }
    }
});

