$winW = $(window).width();
$winH = $(window).height();


/* scroll effects */
$scrollDur = $winH * 2;
var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onLeave'
    }
});


/**/
$('#about .slide').each(function (index, value){
  
  var $id = $(this).attr("id");

  var tl1 = new TimelineMax();
  tl1.to("#top-arrow-"+$id.substr($id.length - 1), 1, {top: "100%"}, 0)
    .to("#right-arrow-"+$id.substr($id.length - 1), 1, {right: "100%"}, 0)
    .to("#bottom-arrow-"+$id.substr($id.length - 1), 1, {bottom:"100%"}, 0)
    .to("#left-arrow-"+$id.substr($id.length - 1), 1, {left: "100%"}, 0);
  
  var tl2 = new TimelineMax();
/**/
  tl2.to(this, 1, {backgroundColor:"rgba(172,212,191, 0)"}, 0)
     .to(this, 1, {backgroundColor:"rgba(172,212,191, 1)"}, 1)
     .to(this, 1, {backgroundColor:"rgba(172,212,191, 1)"}, 2)
     .to(this, 1, {backgroundColor:"rgba(172,212,191, 0)"}, 3)
     .to($(this).find("span"), 1, {backgroundColor:"rgba(172,212,191, 0)"}, 0)
     .to($(this).find("span"), 1, {backgroundColor:"rgba(172,212,191, 1)"}, 1)
     .to($(this).find("span"), 1, {backgroundColor:"rgba(172,212,191, 1)"}, 2)
     .to($(this).find("span"), 1, {backgroundColor:"rgba(172,212,191, 0)"}, 3);
  
  if($id.substr($id.length - 1) == 4 ) { 
    var tl2 = new TimelineMax();
    tl2.to(this, 1, {backgroundColor:"rgba(172,212,191, 1)"}, 0)
       .to($(this).find("span"), 1, {backgroundColor:"rgba(172,212,191, 1)"}, 0);
  }  
  
  /** Mobile **/
  if ( $winW < 768 ) { 
    $(".slide .left").hide();
    $(".slide .right").hide();
    
  var tl3 = new TimelineMax();
  tl3.to($(this).find(".up"), 1, {height:0}, 0)
     .to($(this).find(".down"), 1, {height:0}, 0);
    
  } else {
   $(".slide .up").hide();
   $(".slide .down").hide();
    
   var tl3 = new TimelineMax();
  tl3.to($(this).find(".left"), 1, {width:0}, 0)
     .to($(this).find(".right"), 1, {width:0}, 0);   
  }
  // arrow animation
	var scene = new ScrollMagic.Scene({triggerElement: this, duration: $scrollDur})
					.setTween(tl1) 
					//.addIndicators({name: "1"}) 
					.addTo(controller);
  
  scene.triggerHook(0);
  
  // slide bg color animation
 	var scene = new ScrollMagic.Scene({triggerElement: this, duration: $scrollDur})
					.setTween(tl2) 
					//.addIndicators({name: "2"}) 
					.addTo(controller);
  
  scene.triggerHook(0); 
 
 // caption reveal animation
 	var scene = new ScrollMagic.Scene({triggerElement:this, duration: $winH / 2, offset: $winH })
					.setTween(tl3) 
					//.addIndicators({name: "3"}) 
					.addTo(controller);
 
  scene.triggerHook(0);  

  // Text fade out as scrolled down
  //var tl4 = new TimelineMax();
 // tl1.to($(this).find("p"), 1, {opacity: "0"}, 0)
  //   .to($(this).find("i"), 1, {opacity: "0"}, 0);
  var tween = TweenMax.to($(this).find("p"), 1, {opacity: "0"});

  var scene = new ScrollMagic.Scene({triggerElement: this, duration: $winH * .5, offset: $winH * 1.5})
  .setTween(tween)
  //.addIndicators({name: "tween css class"}) 
  .addTo(controller);
  /* Captions */

  var scene = new ScrollMagic.Scene({
    offset: $winH / 2,
    triggerElement: this,
    duration: $winH
  })
    .setPin(this)
    .addTo(controller); 
  
});




/////////// NAVIGATION ///////////

/*   nav smooth scroll to corresponding sections
     & update active links
*/

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
   var $offset = 0;
   if( $(this).attr("href") == "#about") {
      $offset = $winH * 1.5;                  
   }
   var $trigger = $(this);
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default 
        //if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top + $offset
        }, 1000, function() {
          // Callback after animation
          //highlight active link 
          $trigger.parent().siblings().removeClass("active");
          $trigger.parent().addClass("active");
          
        });
      }
    }
  });

  /*   change active nav element on page scroll   */

  // get top positions of page anchors
  var $targetProject = $("#projects").offset().top;
  var $targetContact = $("#contact").offset().top;

  $(window).scroll(function() {

    var $windscroll = $(window).scrollTop();    

    $('section').each(function(i) {
      
      if ($(this).position().top <= $windscroll ) {
        // reflect location in nav
        $('nav ul.nav li.active').removeClass('active');
        $('nav ul.nav li').eq(i).addClass('active');
        if ($(this).attr("id") == "location") {
          
          $('nav ul.nav li').eq(i-1).addClass('active');
        }
        // change logo color depandant on bg
        if ( $windscroll + 110 >= $targetProject && $windscroll + 110 < $targetContact  ) {   
          $("#logo").css("background-image", "url(http://iancross.net/images/logo.svg)");
        } else {
           $("#logo").css("background-image", "url(http://iancross.net/images/logo-inverse.svg)");         
        }    
      }
       

    });
  }).scroll();



  var $prev = 0;
  var $window = $(window);
  var $nav = $('nav');
  
  /**   Hide / show nav dependant on scroll direction   
        on mobile devices
  **/

  if ($winW <= 768) {
    $window.on('scroll', function(){
      var $scrollTop = $window.scrollTop();
      $nav.toggleClass('hide-nav', scrollTop > $prev);
      $prev = $scrollTop;
    });
  }
  
/////////// END NAVIGATION ///////////

///////////    ABOUT      ///////////

$(".fa").click(function() {

  var $id = $(this).attr("id");
  var $pos = 0;
switch ($id) { 
 	case 'down-0': 
		$pos = $winH * 2.5;
		break;
	case 'up-1': 
		$pos = 0;
		break;
	case 'down-1': 
		$pos = $winH * 5.5;
		break;
	case 'up-2': 
		$pos = $winH * 2.5;
		break;		
	case 'down-2': 
		$pos = $winH * 8.5;
		break;
 	case 'up-3': 
		$pos = $winH * 5.5;
		break;
	case 'down-3': 
		$pos = $winH * 11.5;
		break;
	case 'up-4': 
		$pos = $winH * 8.5;
		break;		
	case 'down-4': 
		$pos = $targetProject;
		break;
	default:
		//alert('Nobody Wins!');
}
  $('html, body').animate({
    scrollTop: $pos
  }, 2000);
});


////////////// CONTACT ///////////////

    $('input,textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'))
               .attr('placeholder', '');
    }).blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });

////////////  LOCATION  /////////////////////

	google.maps.event.addDomListener( window, 'load', gmaps_results_initialize );
	
	function gmaps_results_initialize() {
		
		if ( null === document.getElementById( 'map-canvas' ) ) {
			return;
		}

		var map, marker, infowindow;
		
		var map = new google.maps.Map( document.getElementById( 'map-canvas' ), {
			zoom:           12,
			center:         new google.maps.LatLng( 52.625786, -1.154658 ),
		    mapTypeId:google.maps.MapTypeId.SATELLITE, // TERRAIN, ROADMAP, HYBRID (photographic map + roads and city names)
			disableDefaultUI: true
		});
		
		
		// Place a marker @ my place in Bournemouth
		marker = new google.maps.Marker({
	
			position: new google.maps.LatLng( 52.625786, -1.154658 ),
			map:      map,
			icon: {
        url: "http://iancross.net/images/map-marker.svg",
        scaledSize: new google.maps.Size(48, 64)
      }
			/*
			infoWindow: {
			  content: 'Hello!   '
			}
			*/
	
		});

		// Add an InfoWindow for My place
		infowindow = new google.maps.InfoWindow({
		  content:"Hello! 25 Ashleigh Road, Leicester, LE3 0FA.  "
		});
		google.maps.event.addListener( marker, 'click', ( function( marker ) {
	
			return function() {
				infowindow.open( map, marker );
			}
	
		})( marker ));	
	
	
		// Zoom to 9 when clicking on marker
		google.maps.event.addListener(marker,'click',function() {
			  map.setZoom(20);
			  map.setCenter(marker.getPosition());
		  });
		  

		zoomInButton = $("#map-nav .in a");
		zoomOutButton = $("#map-nav .out a");
		zoomInButton.click(function(e) {
		//$(document).on("click", zoomInButton, function (e) {
			 e.preventDefault();
			 map.setZoom(map.getZoom() + 1);
		});
		zoomOutButton.click(function(e) {
			 e.preventDefault();
			 map.setZoom(map.getZoom() - 1);
		});

		roadmapButton = $("#map-nav .map a");
		satButton = $("#map-nav .sat a");
		roadmapButton.click(function(e) {
		
			 e.preventDefault();
			 map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			 $(this).parent().css({ "background-color": "#7e7c78", "color": "white" });
			 $(this).parent().siblings(".sat").css({ "background-color": "white", "color": "black" });

		});
		satButton.click(function(e) {		
			 e.preventDefault();
			 map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
			 $(this).parent().css({ "background-color": "#7e7c78", "color": "white" });
			 $(this).parent().siblings(".map").css({ "background-color": "white", "color": "black" });
		});
		
				
		var coords = [0,0];
		var box_area = {x1:0, y1:0, x2:0, y2:0};
		var box = $('#map-nav');

		function is_mouse_in_area() {
			var C = coords, B = box_area;
			if (C[0] >= B.x1 && C[0] <= B.x2) {
				if (C[1] >= B.y1 && C[1] <= B.y2) {
					return true;
				}
			}
			return false;
		};
				
		var offset = $("#location").offset();
		$("#location").bind('mousemove', function(e){
				
				var C = coords; // one global lookup
				C[0] = e.pageX; 
				C[1] = e.pageY; 

				var B = box, O = B.offset();
				box_area = { 
					x1: O.left - 20, 
					y1: O.top - 20,
					x2: O.left + B.width() + 20,
					y2: O.top + B.height() + 20
				};
				
				//console.log( box_area );
				//console.log( coords );
				//console.log( is_mouse_in_area() );
				
				if( !is_mouse_in_area() ) {
					$('#map-nav').css({
					   left:  e.pageX - offset.left + 5,
					   top:   e.pageY - offset.top
					});	
				}
	
		});
		
	

	}
