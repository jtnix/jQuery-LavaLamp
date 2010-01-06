/**
 * LavaLamp - A menu plugin for jQuery with cool hover effects.
 * @requires jQuery v1.2.x
 *
 * http://nixbox.com/lavalamp.php
 *
 * Copyright (c) 2008 Jolyon Terwilliger (nixbox.com)
 * Original code Copyright (c) 2007, 2008
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * credits to Guillermo Rauch and Ganeshji Marwaha (gmarwaha.com) for previous editions
 *
 * Version: 1.0 - adapted for jQuery 1.2.x series
 * Version: 1.1 - added linum parameter
 * Version: 1.2 - modified to support vertical resizing of elements
 * Version: 1.3 - enhanced automatic <li> item hi-lighting - will now default to 
 *					location.pathname + location.search + location.hash if linum not defined.
 *			 	- always returns 'true' by default, for standard link follow through. 				  
 *
 * Creates a menu with an unordered list of menu-items. You can either use the CSS 
 * that comes with the plugin, or write your own styles 
 *
 * The HTML markup used to build the menu can be as simple as...
 *
 *       <ul class="lavaLamp">
 *           <li><a href="#">Phone Home</a></li>
 *           <li><a href="#">Make Contact</a></li>
 *           <li><a href="#">Board Ship</a></li>
 *           <li><a href="#">Fly to Venus</a></li>
 *       </ul>
 *
 * Once you have included the style sheet that comes with the plugin, you will have to include 
 * a reference to the jQuery library, easing plugin (optional) and the LavaLamp(this) plugin.
 *
 * Use the following snippet to initialize the menu using jQuery easing library::
 * Easing Library 1.3 available here:  http://plugins.jquery.com/project/Easing
 * 
 *   $(function() { $(".lavaLamp").lavaLamp({ fx: "easeOutBack", speed: 700}) });
 *
 * @param Object - You can specify all the options shown below as object variables:
 *
 * @option fx - default is "linear"
 * @example
 * $(".lavaLamp").lavaLamp({ fx: "easeOutElastic" });
 * @desc Creates a menu with "Elastic" easing effect. You need to include the easing plugin for this to work.
 *
 * @option speed - default is 500 ms
 * @example
 * $(".lavaLamp").lavaLamp({ speed: 500 });
 * @desc Creates a menu with an animation speed of 500 ms.
 *
 * @option click - no defaults
 * @example
 * $(".lavaLamp").lavaLamp({ click: function(event, menuItem) { return false; } });
 * @desc You can supply a callback to be executed when the menu item is clicked. 
 * The event object and the menu-item that was clicked will be passed in as arguments.
 * 
 * @option linum - default is 'no'
 * @example
 * $(".lavaLamp").lavaLamp({ linum: 2 });
 * @desc linum specifies the li element to default to, beginning with 0 for the first li element 
 * within the parent UL or OL used to initialize lavaLamp.  This can be used to set default
 * lavaLamp hilight on page reloads.
 */
 
(function($) {
$.fn.lavaLamp = function(o) {
	o = $.extend({ fx: 'linear', speed: 500, click: function(){return true}, linum: 'no' }, o || {});

	return this.each(function() {
		var path = location.pathname + location.search + location.hash;
		var $current = new Object;
		var $li = $('li', this);
		
		// check for complete path match, if so flag element into $current
		if ( o.linum == 'no' )
			$current = $('li a[href$="' + path + '"]', this).parent('li');
			
		// double check, this may be just an anchor match
		if ($current.length == 0 && o.linum == 'no')
			$current = $('li a[href$="' + location.hash + '"]', this).parent('li');

		// no default current element matches worked, or the user specified an index via linum
		if ($current.length == 0 || o.linum != 'no') {
			if (o.linum == 'no') o.linum = 0;
			$current = $($li[o.linum]);
		}

		var $back = $('<li class="back"><div class="left"></div><div class="bottom"></div><div class="corner"></div></li>').appendTo(this);
		//if (o.linum=='off') { $back.css('left',-200) };
		var curr = $('li.current', this)[0] || $($current).addClass('current')[0];

		$li.not('.back').hover(function() {
			move(this);
		}, function(){});

		$(this).hover(function(){}, function() {
			move(curr);
		});

		$li.click(function(e) {
			setCurr(this);
			return o.click.apply(this, [e, this]);
		});

        setCurr(curr);

        function setCurr(el) {
            $back.css({ 'left': el.offsetLeft+'px', 
						'width': el.offsetWidth+'px', 
						'height': el.offsetHeight+'px', 
						'top': el.offsetTop+'px' });
            curr = el;
		};

		function move(el) { 
			$back.stop()
			.animate({
					width: el.offsetWidth,
					left: el.offsetLeft,
					height: el.offsetHeight,
					top: el.offsetTop
			}, o.speed, o.fx);
		};
	});
};
})(jQuery);
