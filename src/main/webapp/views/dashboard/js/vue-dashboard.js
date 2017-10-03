Vue.component('my-dashboard', {
    template: `
<span>
    <my-header v-on:is-authenticated="isAuthenticatedMethod" ref="myHeader"></my-header>
    <!-- Header Container / End -->

    <!-- Dashboard -->
    <div id="dashboard">

        <!-- Navigation
        ================================================== -->
        <!-- Responsive Navigation Trigger -->
        <a href="#" class="dashboard-responsive-nav-trigger"><i class="fa fa-reorder"></i> Dashboard Navigation</a>
        <my-sidebar v-bind:role="role" ></my-sidebar>


        <!-- Content
        ================================================== -->
        <div class="dashboard-content">
            <!-- render the currently active component/page here -->
            <component :is="currentView" ref="currentView"></component>
        </div>
        <!-- Content / End -->


    </div>
    <!-- Dashboard / End -->
</span>
`,
    props: ['currentView'],
    data: function () {
        return {
            role: "NO_ROLE"
        }
    },
    methods: {
        isAuthenticatedMethod(isAuthenticated) {
            // TRIGGER MOUNTED METHOD
            this.isAuthenticated = isAuthenticated;
            var childMylogin = this.$refs.myHeader.$refs.myLogin;

            if (!this.isAuthenticated) {
                childMylogin.openLoginPopUp();
            } else {
                this.role = childMylogin.user.role;
            }
        }
    }


});