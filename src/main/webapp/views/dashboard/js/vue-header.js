let myHeader = Vue.component('my-header', {
    template: `
<div>
    <!-- Header Container
================================================== -->
<!--<header id="header-container" class="fixed fullwidth dashboard">-->
<header id="header-container" class="dashboard fixed fullwidth" >

	<!-- Header -->
	<div id="header" class="not-sticky">
		<div class="container">
			
                    <!-- Left Side Content -->
                    <div class="left-side">

                        <!-- Logo -->
				        <div id="logo">
					        <a href="/"><img src="/assets/images/logo.png" alt=""></a>
					        <a href="/" class="dashboard-logo"><img src="/assets/images/logo2.png" alt=""></a>
				        </div>
				        
                        <div class="clearfix"></div>
                        <!-- Main Navigation / End -->
                        
                        <!-- Main Navigation -->
				        <nav id="navigation" class="style-1">
					        <ul id="responsive">
                                <li><a href="#">|</a>
                                </li>
						    </ul>
						</nav>

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