 $(document).ready(function(){


 	$('.menu-mobile').click(function(event){
        event.preventDefault();
        $('.menu-responsive').addClass('active-menu');
        $('.r-overlay').addClass('active-overlay');
      }); 

      // js submenu 2do nivel
      function cerrar_submenu(){
        $('.menu-responsive .u-submenu').stop(false).slideUp();
      }

    // funcion  para cerrar menu responsive 
    function cerrar_nav() {
      $('.menu-responsive').removeClass('active-menu');
      $('.r-overlay').removeClass('active-overlay');
    };

    $('.r-overlay').click(function() {
      cerrar_nav();
      cerrar_submenu();
    });

    $('.close-nav').click(function() {
      cerrar_nav();
      cerrar_submenu();
    });

});

 //change color

	$(window).scroll(function(){
		var prueba = $(this).scrollTop();
		
		if (prueba > 120) {
			$("header").addClass("navegacion");
		}
			else if (prueba < 120) {
			$("header").removeClass("navegacion");
		}
	});
