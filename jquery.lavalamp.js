/**
 * LavaLamp - A menu plugin for jQuery with cool hover effects.
 * @requires jQuery v1.2.x
 *
 * http://nixbox.com/lavalamp.php
 *
 * Copyright (c) 2008 Jolyon Terwilliger (nixbox.com)
 * Original code Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * original version for mootools by Guillermo Rauch
 *
 * Version: 1.0 - adapted for jQuery 1.2.x series
 * Version: 1.1 - added linum parameter
 * Version: 1.2 - modified to support vertical resizing of elements
 */

/**
 * Creates a menu with an unordered list of menu-items. You can either use the CSS that comes with the plugin, or write your own styles 
 * to create a personalized effect
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
 * a reference to jquery library, easing plugin(optional) and the LavaLamp(this) plugin.
 *
 * Use the following snippet to initialize the menu using jQuery easing library version 1.3
 * Easing Library 1.2 available here:  http://plugins.jquery.com/project/Easing
 * 
 *   $(function() { $(".lavaLamp").lavaLamp({ fx: "easeOutBack", speed: 700}) });
 *
 * @param an options object - You can specify all the options shown below as an options object param.
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
 * @option linum - default is 0
 * @example
 * $(".lavaLamp").lavaLamp({ linum: 2 });
 * @desc linum specifies the li element to default to, beginning with 0 for the first li element 
 * within the parent UL or OL used to initialize lavaLamp.  This can be used to set default
 * lavaLamp hilight on page reloads.
 */
(function($) {
$.fn.lavaLamp = function(o) {
    o = $.extend({ fx: "linear", speed: 500, click: function(){}, linum: 0 }, o || {});

    return this.each(function() {
        var me = $(this),
			noop = function(){},
        	$back = $('<li class="back"><div class="left"></div><div class="bottom"></div><div class="corner"></div></li>').appendTo(me),
        	$li = $("li", this), 
			curr = $("li.current", this)[0] || $($li[o.linum]).addClass("current")[0];

        $li.not(".back").hover(function() {
            move(this);
        }, noop);

        $(this).hover(noop, function() {
            move(curr);
        });

        $li.click(function(e) {
            setCurr(this);
            return o.click.apply(this, [e, this]);
        });

        setCurr(curr);

        function setCurr(el) {
            $back.css({ "left": el.offsetLeft+"px", "width": el.offsetWidth+"px", "height": el.offsetHeight+"px", "top": el.offsetTop+"px" });
            curr = el;
        };

        function move(el) { 
            //$back.each(function() {  // re-enable if using jQuery 1.1.x
            //   $(this).dequeue(); }) // re-enable if using jQuery 1.1.x
			$back.stop()  // patch from http://www.gmarwaha.com/blog/?p=7 , comment 91
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
