
let vm = new Vue({
    el: '#appVue',
    data: {
        url: "/api/cuidadores",
        item: {
            index: '',
            id: '',
            nombre: ''
        },
        items: [],
        cuidador: {},
        formPost: true,

    }
        ,
    mounted() {
        q =this.getParameterByName('id');
        this.getItemsAjax(this.url);



    },
    methods: {
        toggleLoader() {
            $('#spinner').toggle();
        },
        getItemsAjax() {
            var id = this.$route.params.id;

            axios.get(this.url + '/' + id)
                .then((response) => {
                    this.cuidador = response.data;
                    this.toggleLoader();
                })
                .catch(error => {
                        console.log(error);
                        sweetAlert("Oops...", "Error, ver consola", "error");
                    }
                );
        },

         getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

    }
});

