/*************************
 * JS Document by: Larico 
 *************************/

// GO TO TOP   
jQuery(function() {
    var $ = jQuery;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


    // JS for NAVIGATION RESPONSIVE

    $(".example").click(function() {
        $(".toAction").slideToggle("slow");
    });

    //  FILE UPLOADS

    'use strict';;
    (function(document, window, index) {
        var inputs = document.querySelectorAll('.inputfile');
        Array.prototype.forEach.call(inputs, function(input) {
            var label = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener('change', function(e) {
                var fileName = '';
                if (this.files && this.files.length > 1)
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                else
                    fileName = e.target.value.split('\\').pop();

                if (fileName)
                    label.querySelector('span').innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
            });

            // Firefox bug fix
            input.addEventListener('focus', function() { input.classList.add('has-focus'); });
            input.addEventListener('blur', function() { input.classList.remove('has-focus'); });
        });
    }(document, window, 0));


});

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