let myDashboard = Vue.component('my-dashboard', {
    template: `
<span>
    <my-header></my-header>
    <!-- Header Container / End -->

    <!-- Dashboard -->
    <div id="dashboard">

        <!-- Navigation
        ================================================== -->
        <!-- Responsive Navigation Trigger -->
        <a href="#" class="dashboard-responsive-nav-trigger"><i class="fa fa-reorder"></i> Dashboard Navigation</a>
        <my-sidebar></my-sidebar>


        <!-- Content
        ================================================== -->
        <div class="dashboard-content">
            <!-- render the currently active component/page here -->
            <component :is="currentView"></component>
        </div>
        <!-- Content / End -->


    </div>
    <!-- Dashboard / End -->
</span>
`,
    props: ['currentView']
});