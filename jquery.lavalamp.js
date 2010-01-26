/**
 jQuery LavaLamp 1.3.4a 

 Requires jQuery v1.3.2 or better from http://jquery.com

 http://nixboxdesigns.com/projects/jquery-lavalamp/

 Copyright (c) 2008, 2009 Jolyon Terwilliger, jolyon@nixbox.com
 Source code Copyright (c) 2008, 2009
 Dual licensed under the MIT and GPL licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html

 credits to Guillermo Rauch and Ganeshji Marwaha (gmarwaha.com) for previous editions

 Version: 1.0 - adapted for jQuery 1.2.x series
 Version: 1.1 - added linum parameter
 Version: 1.2 - modified to support vertical resizing of elements
 Version: 1.3 - enhanced automatic <li> item hi-lighting - will attempt to
					lock onto li > a element with href closest to selected
					window.location
			 	- click always returns 'true' by default, for standard link follow through.

 Version: 1.3.1 - verified for use with jQuery 1.3 - should still work with 1.2.x series
				- changed linum parameter to startItem for clarity
				- improved slide-in accuracy for .back elements with borders
				- changed .current class to .selectedLava for clarity and improved
					support
				- appended 'Lava' to all internal class names to avoid conflicts
				- fixed bug applying selectedLava class to elements with matching
					location.hash
				- now supports jquery.compat plugin for cross-library support
				- performance improvements
				- added new options:
				autoReturn: true - if set to false, hover will not return to last selected
									item upon list mouseout.
				returnDelay: 0 - if set, will delay auto-return feature specified # of
									milliseconds.
				setOnClick: true - if set to false, hover will return to default element
									regardless of click event.
				homeLeft: 0, homeTop: 0 - if either set to non zero value, absolute
									positioned li element with class .homeLava is 
									prepended to list for homing feature.
				homeWidth: 0, homeHeight: 0 - if set, are used for creation of li.homeLava
									element.
				returnHome: false - if set along with homeLeft or homeTop, lavalamp hover
									will always return to li.home after click.

 Version: 1.3.2 - fixed: stray $ references inside the plugin to work with
 					jQuery.noConflict() properly - thanks Colin.

 Version: 1.3.3 - fixed: added closure with null passed argument for move() command in
 					returnDelay to fix errors some were seeing - thanks to Michel and 
					Richard for noticing this.

					fixed: changed mouseover/out events to mouseenter/leave to fix jerky
					animation problem when using excessive margins instead of padding.  
					Thanks to Thomas for the solution and Chris for demonstrating the problem.

					enhanced: added 'noLava' class detection to prevent LavaLamp effect
					application to LI elements with this class. This feature allows you to
					create submenus - for details, see examples at
					http://nixboxdesigns.com/demos/jquery-lavalamp-demos.html

					enhanced: modified to better automatically find default location for 
					relative links. Thanks to Harold for testing and finding this bug.

 Examples and usage:

 The HTML markup used to build the menu can be as simple as...

       <ul class="lavaLamp">
           <li><a href="#">Phone Home</a></li>
           <li><a href="#">Make Contact</a></li>
           <li><a href="#">Board Ship</a></li>
           <li><a href="#">Fly to Venus</a></li>
       </ul>

 Once you have included the style sheet that comes with the plugin, you will have to include 
 a reference to the jQuery library, easing plugin (optional) and the LavaLamp(this) plugin.

 Use the following snippet to initialize the menu using jQuery easing library::
 Easing Library 1.3 available here:  http://plugins.jquery.com/project/Easing
 
 Example:
 $(function() { $(".lavaLamp").lavaLamp({ fx: "easeOutBack", speed: 700}) });
 sets the easing to 'Out, Back' with a speed of 7/10ths of a second.

 @param fx - default: 'swing'
 Creates a menu with "Elastic" easing effect. You need to include the easing plugin for the example to work.
 
 Example:
 $(".lavaLamp").lavaLamp({ fx: "easeOutElastic" });
 
 @param speed - default: 500
 sets animation speed in milliseconds
 
 Example:
 $(".lavaLamp").lavaLamp({ speed: 1000 });
 sets the animation speed to one second.
 
 @param onclick - default: function() { return true; }
 Callback to be executed when the menu item is clicked. The 'event' object and the menu-item that was clicked will be passed in as arguments.
 
 Example:
 $(".lavaLamp").lavaLamp({ click: function(event, menuItem) { return false; } });

 @param startItem - default: 'no'
 specifies the number li element to default hover on, starting with 0 for the first li element within the parent UL or OL list used to initialize lavaLamp.  Used to manually set the default lavaLamp hi-light on load.

 Example:
 jQuery(".lavaLamp").lavaLamp({ startItem: 2 });
 selects the third element in the list
 */

(function(jQuery) {
jQuery.fn.lavaLamp = function(o) {

	o = jQuery.extend({ fx: 'swing',
				speed: 500, 
				click: function(){return true}, 
				startItem: 'no',
				autoReturn: true,
				returnDelay: 0,
				setOnClick: true,
				homeTop:0,
				homeLeft:0,
				homeWidth:0,
				homeHeight:0,
				returnHome:false
				}, 
			o || {});

	var $home;
	// create homeLava element if origin dimensions set
	if (o.homeTop || o.homeLeft) { 
		$home = jQuery('<li class="homeLava selectedLava"></li>').css({ left:o.homeLeft, top:o.homeTop, width:o.homeWidth, height:o.homeHeight, position:'absolute' });
		jQuery(this).prepend($home);
	}
		
	return this.each(function() {
		var path = location.pathname + location.search + location.hash, $selected, $back, $li = jQuery('li[class!=noLava]', this), delayTimer, ce // current element

		// check for complete path match, if so flag element into $selected
		if ( o.startItem == 'no' )
			$selected = jQuery('li a[href$="' + path + '"]', this).parent('li');
			
		// if still no match, this may be a relative link match 
		if ($selected.length == 0 && o.startItem == 'no')
			$selected = jQuery('li a[href$="' +location.pathname.substring(location.pathname.lastIndexOf('/')+1)+ location.search+location.hash + '"]', this).parent('li');

		// no default selected element matches worked, 
		// or the user specified an index via startItem
		if ($selected.length == 0 || o.startItem != 'no') {
			// always default to first item, if no startItem specified.
			if (o.startItem == 'no') o.startItem = 0;
			$selected = jQuery($li[o.startItem]);
		}
		// set up raw element - this allows user override by class .selectedLava on load
		ce = jQuery('li.selectedLava', this)[0] || jQuery($selected).addClass('selectedLava')[0];

		// add mouseover event for every sub element
		$li.mouseenter(function() {
			if (jQuery(this).hasClass('homeLava')) {
				ce = jQuery(this)[0];
			}
			move(this);
		});

		$back = jQuery('<li class="backLava"><div class="leftLava"></div><div class="bottomLava"></div><div class="cornerLava"></div></li>').appendTo(this);
		
		// after we leave the container element, move back to default/last clicked element
		jQuery(this).mouseleave( function() {
			if (o.autoReturn) {
				if (o.returnHome && $home) {
					move($home[0]);
				}
				else if (o.returnDelay) {
					if(delayTimer) clearTimeout(delayTimer);
					delayTimer = setTimeout(function(){move(null);},o.returnDelay + o.speed);
				}
				else {
					move(null);
				}
			}
		});

		$li.click(function(e) {
			if (o.setOnClick) {
				jQuery(ce).removeClass('selectedLava');
				jQuery(this).addClass('selectedLava');
				ce = this;
			}
			return o.click.apply(this, [e, this]);
		});

		// set the starting position for the lavalamp hover element: .back
		if (o.homeTop || o.homeLeft)
			$back.css({ left:o.homeLeft, top:o.homeTop, width:o.homeWidth, height:o.homeHeight });
		else
			$back.css({ left: ce.offsetLeft, top: ce.offsetTop, width: ce.offsetWidth, height: ce.offsetHeight });


		function move(el) {
			if (!el) el = ce;
			// .backLava element border check and animation fix
			var bx=0, by=0;
			/* rethink
			if (jQuery.browser.msie) {
				bx = ($back.outerWidth() - $back.innerWidth())/2;
				by = ($back.outerHeight() - $back.innerHeight())/2;
			}
			*/
			$back.stop()
			.animate({
				left: el.offsetLeft-bx,
				top: el.offsetTop-by,
				width: el.offsetWidth,
				height: el.offsetHeight
			}, o.speed, o.fx);
		};
	});
};
})(jQuery);
