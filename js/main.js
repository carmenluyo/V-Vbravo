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
(function($) {
  //carousel 


     $("#owl-demo-home").owlCarousel({
   
         navigation: true,
        navigationText: [
        "<img src='images/atras.png' class='width-arrow'>",
        "<img src='images/adelante.png' class='width-arrow'>"
        ],
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        pagination : false
   
        // "singleItem:true" is a shortcut for:
        // items : 1, 
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
   
    });


})(jQuery);
