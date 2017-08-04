
/**
 * jquery.dlmenu.js v1.0.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {

  'use strict';

  // global
  var Modernizr = window.Modernizr, $body = $( 'body' );

  $.DLMenu = function( options, element ) {
    this.$el = $( element );
    this._init( options );
  };

  // the options
  $.DLMenu.defaults = {
    // classes for the animation effects
    animationClasses : { classin : 'dl-animate-in-1', classout : 'dl-animate-out-1' },
    // callback: click a link that has a sub menu
    // el is the link element (li); name is the level name
    onLevelClick : function( el, name ) { return false; },
    // callback: click a link that does not have a sub menu
    // el is the link element (li); ev is the event obj
    onLinkClick : function( el, ev ) { return false; }
  };

  $.DLMenu.prototype = {
    _init : function( options ) {

      // options
      this.options = $.extend( true, {}, $.DLMenu.defaults, options );
      // cache some elements and initialize some variables
      this._config();
      
      var animEndEventNames = {
          'WebkitAnimation' : 'webkitAnimationEnd',
          'OAnimation' : 'oAnimationEnd',
          'msAnimation' : 'MSAnimationEnd',
          'animation' : 'animationend'
        },
        transEndEventNames = {
          'WebkitTransition' : 'webkitTransitionEnd',
          'MozTransition' : 'transitionend',
          'OTransition' : 'oTransitionEnd',
          'msTransition' : 'MSTransitionEnd',
          'transition' : 'transitionend'
        };
      // animation end event name
      this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ] + '.dlmenu';
      // transition end event name
      this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.dlmenu',
      // support for css animations and css transitions
      this.supportAnimations = Modernizr.cssanimations,
      this.supportTransitions = Modernizr.csstransitions;

      this._initEvents();

    },
    _config : function() {
      this.open = false;
      this.$trigger = this.$el.children( '.dl-trigger' );
      this.$menu = this.$el.children( 'ul.dl-menu' );
      this.$menuitems = this.$menu.find( 'li:not(.dl-back)' );
      this.$el.find( 'ul.dl-submenu' ).prepend( '<li class="dl-back h5 mv-0"><a href="#" class="links-principales text-left pl-21 pt-21 pb-14">ATRÁS</a></li>' );
      this.$back = this.$menu.find( 'li.dl-back' );
    },
    _initEvents : function() {

      var self = this;

      this.$trigger.on( 'click.dlmenu', function() {
        
        if( self.open ) {
          self._closeMenu();
        } 
        else {
          self._openMenu();
        }
        return false;

      } );

      this.$menuitems.on( 'click.dlmenu', function( event ) {
        
        event.stopPropagation();

        var $item = $(this),
          $submenu = $item.children( 'ul.dl-submenu' );

        if( $submenu.length > 0 ) {

          var $flyin = $submenu.clone().css( 'opacity', 0 ).insertAfter( self.$menu ),
            onAnimationEndFn = function() {
              self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classout ).addClass( 'dl-subview' );
              $item.addClass( 'dl-subviewopen' ).parents( '.dl-subviewopen:first' ).removeClass( 'dl-subviewopen' ).addClass( 'dl-subview' );
              $flyin.remove();
            };

          setTimeout( function() {
            $flyin.addClass( self.options.animationClasses.classin );
            self.$menu.addClass( self.options.animationClasses.classout );
            if( self.supportAnimations ) {
              self.$menu.on( self.animEndEventName, onAnimationEndFn );
            }
            else {
              onAnimationEndFn.call();
            }

            self.options.onLevelClick( $item, $item.children( 'a:first' ).text() );
          } );

          return false;

        }
        else {
          self.options.onLinkClick( $item, event );
        }

      } );

      this.$back.on( 'click.dlmenu', function( event ) {
        
        var $this = $( this ),
          $submenu = $this.parents( 'ul.dl-submenu:first' ),
          $item = $submenu.parent(),

          $flyin = $submenu.clone().insertAfter( self.$menu );

        var onAnimationEndFn = function() {
          self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classin );
          $flyin.remove();
        };

        setTimeout( function() {
          $flyin.addClass( self.options.animationClasses.classout );
          self.$menu.addClass( self.options.animationClasses.classin );
          if( self.supportAnimations ) {
            self.$menu.on( self.animEndEventName, onAnimationEndFn );
          }
          else {
            onAnimationEndFn.call();
          }

          $item.removeClass( 'dl-subviewopen' );
          
          var $subview = $this.parents( '.dl-subview:first' );
          if( $subview.is( 'li' ) ) {
            $subview.addClass( 'dl-subviewopen' );
          }
          $subview.removeClass( 'dl-subview' );
        } );

        return false;

      } );
      
    },
    closeMenu : function() {
      if( this.open ) {
        this._closeMenu();
      }
    },
    _closeMenu : function() {
      var self = this,
        onTransitionEndFn = function() {
          self.$menu.off( self.transEndEventName );
          self._resetMenu();
        };
      
      this.$menu.removeClass( 'dl-menuopen' );
      this.$menu.addClass( 'dl-menu-toggle' );
      this.$trigger.removeClass( 'dl-active' );
      
      if( this.supportTransitions ) {
        this.$menu.on( this.transEndEventName, onTransitionEndFn );
      }
      else {
        onTransitionEndFn.call();
      }

      this.open = false;
    },
    openMenu : function() {
      if( !this.open ) {
        this._openMenu();
      }
    },
    _openMenu : function() {
      var self = this;
      // clicking somewhere else makes the menu close
      $body.off( 'click' ).on( 'click.dlmenu', function() {
        self._closeMenu() ;
      } );
      this.$menu.addClass( 'dl-menuopen dl-menu-toggle' ).on( this.transEndEventName, function() {
        $( this ).removeClass( 'dl-menu-toggle' );
      } );
      this.$trigger.addClass( 'dl-active' );
      this.open = true;
    },
    // resets the menu to its original state (first level of options)
    _resetMenu : function() {
      this.$menu.removeClass( 'dl-subview' );
      this.$menuitems.removeClass( 'dl-subview dl-subviewopen' );
    }
  };

  var logError = function( message ) {
    if ( window.console ) {
      window.console.error( message );
    }
  };

  $.fn.dlmenu = function( options ) {
    if ( typeof options === 'string' ) {
      var args = Array.prototype.slice.call( arguments, 1 );
      this.each(function() {
        var instance = $.data( this, 'dlmenu' );
        if ( !instance ) {
          logError( "cannot call methods on dlmenu prior to initialization; " +
          "attempted to call method '" + options + "'" );
          return;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
          logError( "no such method '" + options + "' for dlmenu instance" );
          return;
        }
        instance[ options ].apply( instance, args );
      });
    } 
    else {
      this.each(function() {  
        var instance = $.data( this, 'dlmenu' );
        if ( instance ) {
          instance._init();
        }
        else {
          instance = $.data( this, 'dlmenu', new $.DLMenu( options, this ) );
        }
      });
    }
    return this;
  };

} )( jQuery, window );

(function($) {
  $(document).ready(function() {
   /*COLLAPSE CHANGE BUTTON*/
    $('.change-arrow .up').on('click',function(e){
      e.preventDefault();console.log($(this).parent());
      $(this).parents(".collapse-one").addClass('active');
      $(this).addClass("hide");
      $(this).parents(".change-arrow").find('.down').removeClass("hide");

    });
    $('.change-arrow .down').on('click',function(e){
      e.preventDefault();
      $(this).parents(".collapse-one").removeClass('active');
       $(this).addClass("hide");
      $(this).parents(".change-arrow").find('.up').removeClass("hide");
    });
    $('#btnInscribete').on('click',function(e){
      e.preventDefault();
      $(this).parents('#inscribete').toggleClass('active');
      $('.up').toggleClass('hide');
      $('.down').toggleClass('hide');
    });
    $("#inscribete").click(function(){
      $(".submenu").css("display", "none");
    });


    $('.change-arrow .up').on('click',function(e){
      e.preventDefault();console.log($(this).parent().parent());
      $(this).parents().addClass('active');
      $(this).addClass("hide");
      $(this).parents(".change-arrow").find('.down').removeClass("hide");

    });
    $('.change-arrow .down').on('click',function(e){
      e.preventDefault();
      $(this).parents(".collapse-two").removeClass('active');
      $(this).addClass("hide");
      $(this).parents(".change-arrow").find('.up').removeClass("hide");
    });
    $(".menu-toggle").on('click', function() {
        $(this).toggleClass("on");
    });
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if(target.length) {
              $('html,body').animate({
                  scrollTop: target.offset().top - 170
              }, 1000);
              return false;
            }
        }
      });
      $(function() {
      $( '#dl-menu' ).dlmenu({
          animationClasses : { classin : 'dl-animate-in-5', classout : 'dl-animate-out-5' }
      });
    });

    var listLeft = $(".list-left").height();
    var listRight = $(".list-right").height();
    if (listLeft > listRight) {
      $(".list-right").height(listLeft);
    } else {
      $(".list-left").height(listRight);
    }
    //Vision, mision
    var windowSize = $(window).width();
    if(windowSize <= 800) {
      $(".mision").insertBefore(".vision");
    }
    //

    var id_scroll = location.hash;
    if (id_scroll) {
      var target = $(id_scroll);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if(target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top - 170
        }, 1000);
        return false;
      }
    }
    //VISTA CONSULTORIA
    $(".box-edicion").click(function() {
      console.log($(".link-edicion", $(this)).get(0).click());
      // $(".link-edicion", $(this)).get(0).click();
      $(".link-edicion", $(this)).triggerHandler('click');
    });
    
    //HEIGHT CONTROL
    // $("#beneficios li").ready(function(){
    //  var height = $(this).height();
    //  console.log(height);
    // });
    // var before = $("#beneficios li .bg-white").parent().find(".li:before");
    // var li = before.parent();
    // // var heightLi = before
    // // var heightLi2 = $(".")
    // console.log (before);
    // console.log (li);
    var altomaxTeario = 0;

    //HEIGHT CONTROL SEDES
    var altomax = 0;
    $(".same-height").each(function(){
      if($(this).height() > altomax) {
        altomax = $(this).height();
      }
    });
    $(".same-height").height(altomax);
    
    // var heightInicial = 0;
    $("#beneficios li").each(function(){
      var beforeHeight = $("li::before", $(this)).height();
      if ($(this).height() > beforeHeight) {
        beforeHeight = $(this).height();
      } else {
        this.height(beforeHeight);
      }
    });
    //LINK FOOTER
    $(".li-sedes").append('<div class="container"></div>');
    $(".link-oficinas").appendTo(".li-sedes .container");

    //ERROR CAPTCHA
    $("#mensaje").insertAfter(".g-recaptcha");
    //REDES MENÚ MOVIL
    $( ".redes-movil-style a" ).empty();
  });
})(jQuery);