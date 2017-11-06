let myApp = Vue.component('my-app', {
    template: `
<span>
    <div id="page-loader"></div>
    <!-- Header Container
    ================================================== -->
    <my-navbar v-on:is-authenticated="isAuthenticatedMethod" ref="myNavbar"></my-navbar>
    <component :is="currentView" ref="currentView"></component>
</span>
`,
    props: ['currentView'],
    methods: {
        isAuthenticatedMethod(isAuthenticated) {
            if (this.currentView == 'my-generar-reserva') {
                var childMylogin = this.$refs.myNavbar.$refs.myLogin;
                if (!isAuthenticated) {
                    childMylogin.openLoginPopUp();
                } else {
                    this.$refs.currentView.loadReservaContent();
                }
            }

        }
    }
});