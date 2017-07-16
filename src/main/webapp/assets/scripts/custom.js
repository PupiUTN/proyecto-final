/* ----------------- Start Document ----------------- */
(function($){
"use strict";

$(document).ready(function(){

	/*--------------------------------------------------*/
	/*  Navigation
	/*--------------------------------------------------*/
	var jPanelMenu = $.jPanelMenu({
	  menu: '#responsive',
	  animated: false,
	  duration: 200,
	  keyboardShortcuts: false,
	  closeOnContentClick: true
	});

	// Menu Trigger
	$('.menu-trigger').on('click', function(){

	  var jpm = $(this);

	  if( jpm.hasClass('active') )
	  {
	    jPanelMenu.off();
	    jpm.removeClass('active');
	  }
	  else
	  {
	    jPanelMenu.on();
	    jPanelMenu.open();
	    jpm.addClass('active');

		// Removes SuperFish Styles
		$('#jPanelMenu-menu').removeClass('menu');
		$('ul#jPanelMenu-menu li').removeClass('dropdown');
		$('ul#jPanelMenu-menu li ul').removeAttr('style');
		$('ul#jPanelMenu-menu li div').removeClass('mega').removeAttr('style');
		$('ul#jPanelMenu-menu li div div').removeClass('mega-container');
	  }
	  return false;
	});

	$(window).resize(function (){
		var winWidth = $(window).width();
		if(winWidth>992) {
			jPanelMenu.close();
		}
	});

    /*  User Menu */
    $('.user-menu').on('click', function(){
		$(this).toggleClass('active');
	});


	/*----------------------------------------------------*/
	/*  Sticky Header 
	/*----------------------------------------------------*/
	$( "#header" ).not( "#header.not-sticky" ).clone(true).addClass('cloned unsticky').insertAfter( "#header" );
	$( "#navigation.style-2" ).clone(true).addClass('cloned unsticky').insertAfter( "#navigation.style-2" );

	// Logo for header style 2
	$( "#logo .sticky-logo" ).clone(true).prependTo("#navigation.style-2.cloned ul#responsive");


	// sticky header script
	var headerOffset = $("#header-container").height() * 2; // height on which the sticky header will shows

	$(window).scroll(function(){
		if($(window).scrollTop() >= headerOffset){
			$("#header.cloned").addClass('sticky').removeClass("unsticky");
			$("#navigation.style-2.cloned").addClass('sticky').removeClass("unsticky");
		} else {
			$("#header.cloned").addClass('unsticky').removeClass("sticky");
			$("#navigation.style-2.cloned").addClass('unsticky').removeClass("sticky");
		}
	});


	/*----------------------------------------------------*/
	/*  Back to Top
	/*----------------------------------------------------*/
	var pxShow = 600; // height on which the button will show
	var scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

	$(window).scroll(function(){
	 if($(window).scrollTop() >= pxShow){
		$("#backtotop").addClass('visible');
	 } else {
		$("#backtotop").removeClass('visible');
	 }
	});

	$('#backtotop a').on('click', function(){
	 $('html, body').animate({scrollTop:0}, scrollSpeed);
	 return false;
	});


	/*----------------------------------------------------*/
	/*  Inline CSS replacement for backgrounds etc.
	/*----------------------------------------------------*/
	function inlineCSS() {

		// Common Inline CSS
		$(".main-search-container, section.fullwidth, .listing-slider .item, .address-container, .img-box-background, .image-edge, .edge-bg").each(function() {
			var attrImageBG = $(this).attr('data-background-image');
			var attrColorBG = $(this).attr('data-background-color');

	        if(attrImageBG !== undefined) {
	            $(this).css('background-image', 'url('+attrImageBG+')');
	        }

	        if(attrColorBG !== undefined) {
	            $(this).css('background', ''+attrColorBG+'');
	        }
		});

	}

	// Init
	inlineCSS();

	function parallaxBG() {

		$('.parallax').prepend('<div class="parallax-overlay"></div>');

		$( ".parallax").each(function() {
			var attrImage = $(this).attr('data-background');
			var attrColor = $(this).attr('data-color');
			var attrOpacity = $(this).attr('data-color-opacity');
			
	        if(attrImage !== undefined) {
	            $(this).css('background-image', 'url('+attrImage+')');
	        }

	        if(attrColor !== undefined) {
	            $(this).find(".parallax-overlay").css('background-color', ''+attrColor+'');
	        }

	        if(attrOpacity !== undefined) {
	            $(this).find(".parallax-overlay").css('opacity', ''+attrOpacity+'');
	        }

		});
	}

	parallaxBG();



    /*----------------------------------------------------*/
    /*  Image Box 
    /*----------------------------------------------------*/
	$('.category-box').each(function(){

		// add a photo container
		$(this).append('<div class="category-box-background"></div>');

		// set up a background image for each tile based on data-background-image attribute
		$(this).children('.category-box-background').css({'background-image': 'url('+ $(this).attr('data-background-image') +')'});

		// background animation on mousemove
		// $(this).on('mousemove', function(e){
		//   $(this).children('.category-box-background').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
		// })
	});


    /*----------------------------------------------------*/
    /*  Image Box 
    /*----------------------------------------------------*/
	$('.img-box').each(function(){
		$(this).append('<div class="img-box-background"></div>');
		$(this).children('.img-box-background').css({'background-image': 'url('+ $(this).attr('data-background-image') +')'});
	});



	/*----------------------------------------------------*/
	/*  Parallax
	/*----------------------------------------------------*/

	/* detect touch */
	if("ontouchstart" in window){
	    document.documentElement.className = document.documentElement.className + " touch";
	}
	if(!$("html").hasClass("touch")){
	    /* background fix */
	    $(".parallax").css("background-attachment", "fixed");
	}

	/* fix vertical when not overflow
	call fullscreenFix() if .fullscreen content changes */
	function fullscreenFix(){
	    var h = $('body').height();
	    // set .fullscreen height
	    $(".content-b").each(function(i){
	        if($(this).innerHeight() > h){ $(this).closest(".fullscreen").addClass("overflow");
	        }
	    });
	}
	$(window).resize(fullscreenFix);
	fullscreenFix();

	/* resize background images */
	function backgroundResize(){
	    var windowH = $(window).height();
	    $(".parallax").each(function(i){
	        var path = $(this);
	        // variables
	        var contW = path.width();
	        var contH = path.height();
	        var imgW = path.attr("data-img-width");
	        var imgH = path.attr("data-img-height");
	        var ratio = imgW / imgH;
	        // overflowing difference
	        var diff = 100;
	        diff = diff ? diff : 0;
	        // remaining height to have fullscreen image only on parallax
	        var remainingH = 0;
	        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
	            //var maxH = contH > windowH ? contH : windowH;
	            remainingH = windowH - contH;
	        }
	        // set img values depending on cont
	        imgH = contH + remainingH + diff;
	        imgW = imgH * ratio;
	        // fix when too large
	        if(contW > imgW){
	            imgW = contW;
	            imgH = imgW / ratio;
	        }
	        //
	        path.data("resized-imgW", imgW);
	        path.data("resized-imgH", imgH);
	        path.css("background-size", imgW + "px " + imgH + "px");
	    });
	}


	$(window).resize(backgroundResize);
	$(window).focus(backgroundResize);
	backgroundResize();

	/* set parallax background-position */
	function parallaxPosition(e){
	    var heightWindow = $(window).height();
	    var topWindow = $(window).scrollTop();
	    var bottomWindow = topWindow + heightWindow;
	    var currentWindow = (topWindow + bottomWindow) / 2;
	    $(".parallax").each(function(i){
	        var path = $(this);
	        var height = path.height();
	        var top = path.offset().top;
	        var bottom = top + height;
	        // only when in range
	        if(bottomWindow > top && topWindow < bottom){
	            //var imgW = path.data("resized-imgW");
	            var imgH = path.data("resized-imgH");
	            // min when image touch top of window
	            var min = 0;
	            // max when image touch bottom of window
	            var max = - imgH + heightWindow;
	            // overflow changes parallax
	            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
	            top = top - overflowH;
	            bottom = bottom + overflowH;


	            // value with linear interpolation
	            // var value = min + (max - min) * (currentWindow - top) / (bottom - top);
	            var value = 0;
				if ( $('.parallax').is(".titlebar") ) {
				    value = min + (max - min) * (currentWindow - top) / (bottom - top) *2;
				} else {
					value = min + (max - min) * (currentWindow - top) / (bottom - top);
				}

	            // set background-position
	            var orizontalPosition = path.attr("data-oriz-pos");
	            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
	            $(this).css("background-position", orizontalPosition + " " + value + "px");
	        }
	    });
	}
	if(!$("html").hasClass("touch")){
	    $(window).resize(parallaxPosition);
	    //$(window).focus(parallaxPosition);
	    $(window).scroll(parallaxPosition);
	    parallaxPosition();
	}

	// Jumping background fix for IE
	if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
	    $('body').on("mousewheel", function () {
	        event.preventDefault(); 

	        var wheelDelta = event.wheelDelta;
	        var currentScrollPosition = window.pageYOffset;
	        window.scrollTo(0, currentScrollPosition - wheelDelta);
	    });
	}
	

    /*----------------------------------------------------*/
    /*  Chosen Plugin
    /*----------------------------------------------------*/

    var config = {
      '.chosen-select'           : {disable_search_threshold: 10, width:"100%"},
      '.chosen-select-deselect'  : {allow_single_deselect:true, width:"100%"},
      '.chosen-select-no-single' : {disable_search_threshold:100, width:"100%"},
      '.chosen-select-no-single.no-search' : {disable_search_threshold:10, width:"100%"},
      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      '.chosen-select-width'     : {width:"95%"}
    };

    for (var selector in config) {
	   	if (config.hasOwnProperty(selector)) {
	      $(selector).chosen(config[selector]);
	  	}
    }


	/*----------------------------------------------------*/
	/*  Range Sliders
	/*----------------------------------------------------*/

	// Area Range
	$("#area-range").each(function() {

		var dataMin = $(this).attr('data-min');
		var dataMax = $(this).attr('data-max');
		var dataUnit = $(this).attr('data-unit');

		$(this).append( "<input type='text' class='first-slider-value'disabled/><input type='text' class='second-slider-value' disabled/>" );

		$(this).slider({

		  range: true,
		  min: dataMin,
		  max: dataMax,
		  step: 10,
		  values: [ dataMin, dataMax ],

		  slide: function( event, ui ) {
			 event = event;
			 $(this).children( ".first-slider-value" ).val( ui.values[ 0 ]  + " " + dataUnit );
			 $(this).children( ".second-slider-value" ).val( ui.values[ 1 ] + " " +  dataUnit );
		  }
		});
		 $(this).children( ".first-slider-value" ).val( $( this ).slider( "values", 0 ) + " " + dataUnit );
		 $(this).children( ".second-slider-value" ).val( $( this ).slider( "values", 1 ) + " " + dataUnit );

	});


  	/*----------------------------------------------------*/
    /*  Magnific Popup
    /*----------------------------------------------------*/

	$('.mfp-gallery-container').each(function() { // the containers for all your galleries

		$(this).magnificPopup({
			 type: 'image',
			 delegate: 'a.mfp-gallery',

			 fixedContentPos: true,
			 fixedBgPos: true,

			 overflowY: 'auto',

			 closeBtnInside: false,
			 preloader: true,

			 removalDelay: 0,
			 mainClass: 'mfp-fade',

			 gallery:{enabled:true, tCounter: ''}
		});
	});

	$('.popup-with-zoom-anim').magnificPopup({
		 type: 'inline',

		 fixedContentPos: false,
		 fixedBgPos: true,

		 overflowY: 'auto',

		 closeBtnInside: true,
		 preloader: false,

		 midClick: true,
		 removalDelay: 300,
		 mainClass: 'my-mfp-zoom-in'
	});

	$('.mfp-image').magnificPopup({
		 type: 'image',
		 closeOnContentClick: true,
		 mainClass: 'mfp-fade',
		 image: {
			  verticalFit: true
		 }
	});

	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		 disableOn: 700,
		 type: 'iframe',
		 mainClass: 'mfp-fade',
		 removalDelay: 160,
		 preloader: false,

		 fixedContentPos: false
	});



   	/*----------------------------------------------------*/
    /*  Slick Carousel
    /*----------------------------------------------------*/

	$('.fullwidth-slick-carousel').slick({
	  centerMode: true,
	  centerPadding: '15%',
	  slidesToShow: 3,
	  dots: true,
	  arrows: false,
	  responsive: [
		{
		  breakpoint: 1441,
		  settings: {
		    centerPadding: '10%',
		    slidesToShow: 3
		  }
		},
		{
		  breakpoint: 1025,
		  settings: {
		    centerPadding: '10px',
		    slidesToShow: 2,
		  }
		},
		{
		  breakpoint: 767,
		  settings: {
		    centerPadding: '10px',
		    slidesToShow: 1
		  }
		}
	  ]
	});


	$('.testimonial-carousel').slick({
	  centerMode: true,
	  centerPadding: '34%',
	  slidesToShow: 1,
	  dots: true,
	  arrows: false,
	  responsive: [
		{
		  breakpoint: 1025,
		  settings: {
		    centerPadding: '10px',
		    slidesToShow: 2,
		  }
		},
		{
		  breakpoint: 767,
		  settings: {
		    centerPadding: '10px',
		    slidesToShow: 1
		  }
		}
	  ]
	});


	 $('.listing-slider').slick({
		centerMode: true,
		centerPadding: '20%',
		slidesToShow: 2, 
		responsive: [
			{
			  breakpoint: 1367,
			  settings: {
			    centerPadding: '15%'
			  }
			},
			{
			  breakpoint: 1025,
			  settings: {
			    centerPadding: '0'
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
			    centerPadding: '0',
			    slidesToShow: 1
			  }
			}
		]
	});


	$('.simple-slick-carousel').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: true,
		arrows: true,
		responsive: [
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 769,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
	  ]
	});


	$('.simple-fw-slick-carousel').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		dots: true,
		arrows: false,

		responsive: [
		{
		  breakpoint: 1610,
		  settings: {
			slidesToShow: 4,
		  }
		},
		{
		  breakpoint: 1365,
		  settings: {
			slidesToShow: 3,
		  }
		},
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 2,
		  }
		},
		{
		  breakpoint: 767,
		  settings: {
			slidesToShow: 1,
		  }
		}
		]
	});


	$('.logo-slick-carousel').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 4,
		dots: true,
		arrows: true,
		responsive: [
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3
		      }
		    },
		    {
		      breakpoint: 769,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
	  ]
	});


	/*----------------------------------------------------*/
	/*  Tabs
	/*----------------------------------------------------*/ 

	var $tabsNav    = $('.tabs-nav'),
	$tabsNavLis = $tabsNav.children('li');

	$tabsNav.each(function() {
		 var $this = $(this);

		 $this.next().children('.tab-content').stop(true,true).hide()
		 .first().show();

		 $this.children('li').first().addClass('active').stop(true,true).show();
	});

	$tabsNavLis.on('click', function(e) {
		 var $this = $(this);

		 $this.siblings().removeClass('active').end()
		 .addClass('active');

		 $this.parent().next().children('.tab-content').stop(true,true).hide()
		 .siblings( $this.find('a').attr('href') ).fadeIn();

		 e.preventDefault();
	});
	var hash = window.location.hash;
	var anchor = $('.tabs-nav a[href="' + hash + '"]');
	if (anchor.length === 0) {
		 $(".tabs-nav li:first").addClass("active").show(); //Activate first tab
		 $(".tab-content:first").show(); //Show first tab content
	} else {
		 anchor.parent('li').click();
	}


	/*----------------------------------------------------*/
	/*  Accordions
	/*----------------------------------------------------*/
	var $accor = $('.accordion');

	 $accor.each(function() {
		 $(this).toggleClass('ui-accordion ui-widget ui-helper-reset');
		 $(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
		 $(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
		 $(this).find("div").hide();

	});

	var $trigger = $accor.find('h3');

	$trigger.on('click', function(e) {
		 var location = $(this).parent();

		 if( $(this).next().is(':hidden') ) {
			  var $triggerloc = $('h3',location);
			  $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
			  $triggerloc.find('span').removeClass('ui-accordion-icon-active');
			  $(this).find('span').addClass('ui-accordion-icon-active');
			  $(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
		 }
		  e.preventDefault();
	});


	/*----------------------------------------------------*/
	/*	Toggle
	/*----------------------------------------------------*/

	$(".toggle-container").hide();

	$('.trigger, .trigger.opened').on('click', function(a){
		$(this).toggleClass('active');
		a.preventDefault();
	});

	$(".trigger").on('click', function(){
		$(this).next(".toggle-container").slideToggle(300);
	});

	$(".trigger.opened").addClass("active").next(".toggle-container").show();


	/*----------------------------------------------------*/
	/*  Tooltips
	/*----------------------------------------------------*/

	$(".tooltip.top").tipTip({
	  defaultPosition: "top"
	});

	$(".tooltip.bottom").tipTip({
	  defaultPosition: "bottom"
	});

	$(".tooltip.left").tipTip({
	  defaultPosition: "left"
	});

	$(".tooltip.right").tipTip({
	  defaultPosition: "right"
	});



    /*----------------------------------------------------*/
    /*  Like Icon Trigger
    /*----------------------------------------------------*/
    $('.like-icon, .widget-button, .like-button').on('click', function(e){
    	e.preventDefault();
		$(this).toggleClass('liked');
		$(this).children('.like-icon').toggleClass('liked');
	});

    /*----------------------------------------------------*/
    /*  Searh Form More Options
    /*----------------------------------------------------*/
    $('.more-search-options-trigger').on('click', function(e){
    	e.preventDefault();
		$('.more-search-options, .more-search-options-trigger').toggleClass('active');
		$('.more-search-options.relative').animate({height: 'toggle', opacity: 'toggle'}, 300);
	});


    /*----------------------------------------------------*/
    /*  Half Screen Map Adjustments
    /*----------------------------------------------------*/
	$(window).on('load resize', function() {
		var winWidth = $(window).width();
		var headerHeight = $("#header-container").height(); // height on which the sticky header will shows
		
		$('.fs-inner-container, .fs-inner-container.map-fixed, #dashboard').css('padding-top', headerHeight);

		if(winWidth<992) {
			$('.fs-inner-container.map-fixed').insertBefore('.fs-inner-container.content');
		} else {
			$('.fs-inner-container.content').insertBefore('.fs-inner-container.map-fixed');
		}

	});


    /*----------------------------------------------------*/
    /*  Counters
    /*----------------------------------------------------*/
    $(window).on('load resize', function() {
		$('.dashboard-stat-content h4').counterUp({
	        delay: 100,
	        time: 800
	    });
    });


    /*----------------------------------------------------*/
    /*  Rating Script Init
    /*----------------------------------------------------*/

	// Leave Rating 
	$('.leave-rating input').change(function () {
		var $radio = $(this);
		$('.leave-rating .selected').removeClass('selected');
		$radio.closest('label').addClass('selected');
	});


	/*----------------------------------------------------*/
	/* Dashboard Scripts
	/*----------------------------------------------------*/
    $('.dashboard-nav ul li a').on('click', function(){
		if ($(this).closest('li').has('ul').length) {
			$(this).parent('li').toggleClass('active');
		}
	});

    // Dashbaord Nav Scrolling
	$(window).on('load resize', function() {
		var wrapperHeight = window.innerHeight;
		var headerHeight = $("#header-container").height();
		var winWidth = $(window).width();

		if(winWidth>992) {
			$(".dashboard-nav-inner").css('max-height', wrapperHeight-headerHeight);
		} else {
			$(".dashboard-nav-inner").css('max-height', '');
		}
	});


    // Tooltip
	$(".tip").each(function() {
		var tipContent = $(this).attr('data-tip-content');
		$(this).append('<div class="tip-content">'+ tipContent + '</div>');
	});


    // Switcher
	$(".add-listing-section").each(function() {

		var switcherSection = $(this);
		var switcherInput = $(this).find('.switch input');

		if(switcherInput.is(':checked')){
			$(switcherSection).addClass('switcher-on');
		} 

		switcherInput.change(function(){
			if(this.checked===true){
				$(switcherSection).addClass('switcher-on');
			} else {
				$(switcherSection).removeClass('switcher-on');
			}
		});

	});


	// Responsive Nav Trigger
    $('.dashboard-responsive-nav-trigger').on('click', function(e){
    	e.preventDefault();
		$(this).toggleClass('active');

		var dashboardNavContainer = $('body').find(".dashboard-nav");

		if( $(this).hasClass('active') ){
			$(dashboardNavContainer).addClass('active');
		} else {
			$(dashboardNavContainer).removeClass('active');
		}

	});

    // Dashbaord Messages Alignment
	$(window).on('load resize', function() {
		var msgContentHeight = $(".message-content").outerHeight();
		var msgInboxHeight = $(".messages-inbox ul").height();
		
		if( msgContentHeight > msgInboxHeight ){
			$(".messages-container-inner .messages-inbox ul").css('max-height', msgContentHeight)
		}
	});



    /*----------------------------------------------------*/
	/* Pricing List
	/*----------------------------------------------------*/
	function newMenuItem() {
		var newElem = $('tr.pricing-list-item.pattern').first().clone();
		newElem.find('input').val('');
		newElem.appendTo('table#pricing-list-container');
	}

	if ($("table#pricing-list-container").is('*')) {
		$('.add-pricing-list-item').on('click', function(e) {
			e.preventDefault();
			newMenuItem();
		});

		// remove ingredient
		$(document).on( "click", "#pricing-list-container .delete", function(e) {
			e.preventDefault();
			$(this).parent().parent().remove();
		});

		// add submenu
		$('.add-pricing-submenu').on('click', function(e) {
			e.preventDefault();

			var newElem = $(''+
				'<tr class="pricing-list-item pricing-submenu">'+
					'<td>'+
						'<div class="fm-move"><i class="sl sl-icon-cursor-move"></i></div>'+
						'<div class="fm-input"><input type="text" placeholder="Category Title" /></div>'+
						'<div class="fm-close"><a class="delete" href="#"><i class="fa fa-remove"></i></a></div>'+
					'</td>'+
				'</tr>');

			newElem.appendTo('table#pricing-list-container');
		});

		$('table#pricing-list-container tbody').sortable({
			forcePlaceholderSize: true,
			forceHelperSize: false,
			placeholder : 'sortableHelper',
			zIndex: 999990,
			opacity: 0.6,
			tolerance: "pointer",
			start: function(e, ui ){
			     ui.placeholder.height(ui.helper.outerHeight());
			}
		});
 	}


    // Unit character
    var fieldUnit = $('.pricing-price').children('input').attr('data-unit');
    $('.pricing-price').children('input').before('<i class="data-unit">'+ fieldUnit + '</i>');



	/*----------------------------------------------------*/
	/*  Notifications
	/*----------------------------------------------------*/
	$("a.close").removeAttr("href").on('click', function(){

		function slideFade(elem) {
			var fadeOut = { opacity: 0, transition: 'opacity 0.5s' };
			elem.css(fadeOut).slideUp();
		}
		slideFade($(this).parent());

	});


	/*----------------------------------------------------*/
	/* Panel Dropdown
	/*----------------------------------------------------*/
    function close_panel_dropdown() {
		$('.panel-dropdown').removeClass("active");
		$('.fs-inner-container.content').removeClass("faded-out");
    }
 
    $('.panel-dropdown a').on('click', function(e) {
    	
		if ( $(this).parent().is(".active") ) {
            close_panel_dropdown();
        } else {
            close_panel_dropdown();
            $(this).parent().addClass('active');
			$('.fs-inner-container.content').addClass("faded-out");
        }
 
        e.preventDefault();
    }); 

    // Apply / Close buttons
    $('.panel-buttons button').on('click', function(e) {
	    $('.panel-dropdown').removeClass('active');
		$('.fs-inner-container.content').removeClass("faded-out");
    });

    // Closes dropdown on click outside the conatainer
	var mouse_is_inside = false;

	$('.panel-dropdown').hover(function(){ 
	    mouse_is_inside=true; 
	}, function(){ 
	    mouse_is_inside=false; 
	});

	$("body").mouseup(function(){ 
	    if(! mouse_is_inside) close_panel_dropdown();
	});

    // "All" checkbox
    $('.checkboxes.categories input').on('change', function() {
        if($(this).hasClass('all')){
            $(this).parents('.checkboxes').find('input').prop('checked', false);
            $(this).prop('checked', true);
        } else {
            $('.checkboxes input.all').prop('checked', false);
        }
    });


	$('input[type="range"].distance-radius').rangeslider({
	    polyfill : false,
	    onInit : function() {
	        this.output = $( '<div class="range-output" />' ).insertBefore( this.$range ).html( this.$element.val() );

		    var radiustext = $('.distance-radius').attr('data-title');
		    $('.range-output').after('<i class="data-radius-title">'+ radiustext + '</i>');

	    },
	    onSlide : function( position, value ) {
	        this.output.html( value );
	    }
	});


    /*----------------------------------------------------*/
    /*  Show More Button
    /*----------------------------------------------------*/
    $('.show-more-button').on('click', function(e){
    	e.preventDefault();
    	$(this).toggleClass('active');

		$('.show-more').toggleClass('visible');
		if ( $('.show-more').is(".visible") ) {

			var el = $('.show-more'),
				curHeight = el.height(),
				autoHeight = el.css('height', 'auto').height();
				el.height(curHeight).animate({height: autoHeight}, 400);


		} else { $('.show-more').animate({height: '450px'}, 400); }

	});


	/*----------------------------------------------------*/
	/* Listing Page Nav
	/*----------------------------------------------------*/

    $(window).on('load resize', function() {
      var containerWidth = $(".container").width();
      $('.listing-nav-container.cloned .listing-nav').css('width', containerWidth);
    });

	if(document.getElementById("listing-nav") !== null) {
		$(window).scroll(function(){
			var window_top = $(window).scrollTop();
			var div_top = $('.listing-nav').not('.listing-nav-container.cloned .listing-nav').offset().top + 90;
		    if (window_top > div_top) {
		        $('.listing-nav-container.cloned').addClass('stick');
		    } else {
		        $('.listing-nav-container.cloned').removeClass('stick');
		    }
		});
	}

	$( ".listing-nav-container" ).clone(true).addClass('cloned').prependTo("body");


    // Smooth scrolling using scrollto.js
	$('.listing-nav a, a.listing-address, .star-rating a').on('click', function(e) {
        e.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash, { gap: {y: -20} }); 
    });

	$(".listing-nav li:first-child a, a.add-review-btn, a[href='#add-review']").on('click', function(e) {
        e.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash, { gap: {y: -100} }); 
    });


    // Highlighting functionality.
	$(window).on('load resize', function() {
		var aChildren = $(".listing-nav li").children();
		var aArray = [];
		for (var i=0; i < aChildren.length; i++) {    
		    var aChild = aChildren[i];
		    var ahref = $(aChild).attr('href');
		    aArray.push(ahref);
		}

		$(window).scroll(function(){
		    var windowPos = $(window).scrollTop(); 
		    for (var i=0; i < aArray.length; i++) {
		        var theID = aArray[i];
		        var divPos = $(theID).offset().top - 150;
		        var divHeight = $(theID).height();
		        if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
		            $("a[href='" + theID + "']").addClass("active");
		        } else {
		            $("a[href='" + theID + "']").removeClass("active");
		        }
		    }
		});
	});


	/*----------------------------------------------------*/
	/*  Progress Button
	/*----------------------------------------------------*/
    $('.progress-button').each(function(){
    	$(this).append('<div class="progress-bar"></div>');

		$(this).on('click', function() {
	  		var progressButton = $(this);

			progressButton.children('.progress-bar').addClass('active');

			// progress bar
			setTimeout(function(){
			progressButton.children('.progress-bar').removeClass('active');
			}, 1500);

			setTimeout(function(){
			progressButton.children('.progress-bar').removeClass('active');
			}, 1500);


			// icon
			setTimeout(function(){
			progressButton.addClass('done');
			}, 1800);

			setTimeout(function(){
			progressButton.removeClass('done');
			}, 3500);

		});
    });


	/*----------------------------------------------------*/
	/*  Contact Form
	/*----------------------------------------------------*/

    var shake = "No";

    $('#message').hide();

    // Add validation parts
    $('#contact input[type=text], #contact input[type=number], #contact input[type=email], #contact input[type=url], #contact input[type=tel], #contact select, #contact textarea').each(function(){

    });

	 // Validate as you type
	   $('#name, #comments, #subject').focusout(function() {
	       if (!$(this).val()) {
	           $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
	       }
	       else {
	           $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
	       }
	         $('#submit')
	           .prop('disabled',false)
	           .removeClass('disabled');
	   });
	   $('#email').focusout(function() {
	       if (!$(this).val() || !isEmail($(this).val())) {
	           $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
	       } else {
	           $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
	       }
	   });

	   $('#email').focusin(function() {
	        $('#submit')
	           .prop('disabled',false)
	           .removeClass('disabled');
	   });

	$('#submit').on('click', function() {
        $("#contact-message").slideUp(200,function() {
            $('#contact-message').hide();

            // Kick in Validation
            $('#name, #subject, #phone, #comments, #website, #email').triggerHandler("focusout");

            if ($('#contact mark.error').size()>0) {
                if(shake == "Yes") {
                    $('#contact').effect('shake', { times:2 }, 75, function(){
                        $('#contact input.error:first, #contact textarea.error:first').focus();
                    });
                } else $('#contact input.error:first, #contact textarea.error:first').focus();

                return false;
            }

        });
    });

    $('#contactform').submit(function(){

        if ($('#contact mark.error').size()>0) {
            if(shake == "Yes") {
            $('#contact').effect('shake', { times:2 }, 75);
            }
            return false;
        }

        var action = $(this).attr('action');

        $('#contact #submit').after('<img src="images/loader.gif" class="loader" />');

        $('#submit')
            .prop('disabled',true)
            .addClass('disabled');

        $.post(action, $('#contactform').serialize(),
            function(data){
                $('#contact-message').html( data );
                $('#contact-message').slideDown();
                $('#contactform img.loader').fadeOut('slow',function(){$(this).remove();});
                // $('#contactform #submit').removeAttr('disabled');
                if(data.match('success') !== null) $('#contactform').slideUp('slow');

            }
        );

        return false;

    });

    function isEmail(emailAddress) {

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        return pattern.test(emailAddress);
    }



// ------------------ End Document ------------------ //
});

})(this.jQuery);


/*!
 * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 **/

$.scrollTo = $.fn.scrollTo = function(x, y, options){
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

    options = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: 'swing',
            duration: 600,
            complete: $.noop,
            step: $.noop
        }
    }, options);

    return this.each(function(){
        var elem = $(this);
        elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
        }, options.animation);
    });
};


/*----------------------------------------------------*/
/*  Ratings Script
/*----------------------------------------------------*/

/*  Numerical Script
/*--------------------------*/
function numericalRating(ratingElem) {

	$(ratingElem).each(function() {
		var dataRating = $(this).attr('data-rating');

		// Rules
	    if (dataRating >= 4.0) {
	        $(this).addClass('high');
	    } else if (dataRating >= 3.0) {
	        $(this).addClass('mid');
	    } else if (dataRating < 3.0) {
	        $(this).addClass('low');
	    }

	});

} numericalRating('.numerical-rating');


/*  Star Rating
/*--------------------------*/
function starRating(ratingElem) {

	$(ratingElem).each(function() {

		var dataRating = $(this).attr('data-rating');

		// Rating Stars Output
		function starsOutput(firstStar, secondStar, thirdStar, fourthStar, fifthStar) {
			return(''+
				'<span class="'+firstStar+'"></span>'+
				'<span class="'+secondStar+'"></span>'+
				'<span class="'+thirdStar+'"></span>'+
				'<span class="'+fourthStar+'"></span>'+
				'<span class="'+fifthStar+'"></span>');
		}

		var fiveStars = starsOutput('star','star','star','star','star');

		var fourHalfStars = starsOutput('star','star','star','star','star half');
		var fourStars = starsOutput('star','star','star','star','star empty');

		var threeHalfStars = starsOutput('star','star','star','star half','star empty');
		var threeStars = starsOutput('star','star','star','star empty','star empty');

		var twoHalfStars = starsOutput('star','star','star half','star empty','star empty');
		var twoStars = starsOutput('star','star','star empty','star empty','star empty');

		var oneHalfStar = starsOutput('star','star half','star empty','star empty','star empty');
		var oneStar = starsOutput('star','star empty','star empty','star empty','star empty');

		// Rules
        if (dataRating >= 4.75) {
            $(this).append(fiveStars);
        } else if (dataRating >= 4.25) {
            $(this).append(fourHalfStars);
        } else if (dataRating >= 3.75) {
            $(this).append(fourStars);
        } else if (dataRating >= 3.25) {
            $(this).append(threeHalfStars);
        } else if (dataRating >= 2.75) {
            $(this).append(threeStars);
        } else if (dataRating >= 2.25) {
            $(this).append(twoHalfStars);
        } else if (dataRating >= 1.75) {
            $(this).append(twoStars);
        } else if (dataRating >= 1.25) {
            $(this).append(oneHalfStar);
        } else if (dataRating < 1.25) {
            $(this).append(oneStar);
        }

	});

} starRating('.star-rating');


