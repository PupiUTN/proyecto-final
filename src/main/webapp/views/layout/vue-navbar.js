Vue.component('my-navbar', {
    template: `
<div>
    <!-- Header Container
    ================================================== -->
    <header id="header-container">

        <!-- Header -->
        <div id="header">
            <div class="container">

                <!-- Left Side Content -->
                <div class="left-side">

                    <!-- Logo -->
                    <div id="logo">
                        <a href="/"><img src="/assets/images/logo.png" alt=""></a>
                    </div>

                    <div class="clearfix"></div>
                    <!-- Main Navigation / End -->

                </div>
                <!-- Left Side Content / End -->
                
                <!-- Right Side Content / End -->
                <my-login></my-login>
                <!-- Right Side Content / End -->
            </div>
        </div>
        <!-- Header / End -->

    </header>
    <div class="clearfix"></div>
    <!-- Header Container / End -->
</div>
    `
});
