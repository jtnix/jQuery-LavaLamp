# jQuery LavaLamp

A JavaScript hover effect library to enhance navigation user experience. See the project detail, demos, examples and tutorials at https://nixbox.com/projects/jquery-lavalamp for more info.

# Features

## Targeting and Container Options

Enhanced `target` and `container` options in version 1.3.5 along with the new `includeMargins` option allows various targeting applications. This allows LavaLamp to play nice with sub-level menus as provided with CMS software like Joomla and Wordpress. Apply the `noLava` class to sub-element targets you do **not** want LavaLamp to hover on. _LavaLamp is no longer restricted to `ul` and `ol` elements since version 1.3.4._

### Automatic Default Location

LavaLamp carefully compares the link in the _client location bar_ to the `a href` within the `li` elements of the container jQuery LavaLamp was assigned and default the starting location of the hover element to the matching `li` element. This can be overridden in several ways: with the `startItem` option, by assigning a `selectedLava` class to a list item, or by using the Home element feature.

### Vertical and Horizontal morphing

Using proper CSS, you can style the hover element to morph based on the destination `li` element's height and width, simulating a Lava Lamp effect.

### Home element

if you define homing options, the `.homeLava` element is enabled and the hover element will start from that location to produce some unique effects (unless overridden by the `startItem` option or `selectedLava` class.)

### Other features

* use the `returnDelay` option to delay the return animation.
* use the `click` option to define a custom callback function to be run when a menu item is clicked.
* manually add the `noLava` class to sub-element targets you do **not** want LavaLamp to attach hover events to.
* supports jQuery `noConflict` mode.
* accurately calculates destination size including borders.

Version 1.4.1 of LavaLamp has been tested successfully with jQuery versions 2.2.4 and 1.12.4 and should work with jQuery version 1.7 and later.

## jQuery LavaLamp Options

The following options can also be found at the head of the latest jquery.lavalamp.js file:

### target - default: 'li' _version 1.3.4_

defines the elements to target inside the container passed to lavaLamp

Example:

`jQuery("div#article").lavaLamp({ target:'p' });`

assigns all `p` within `div#article` to receive LavaLamp hover events. [See target demos](demos/targetdemo.html "target demos") for examples.

### container - default: '' _version 1.3.5_

DOM element to create for the hover element. If container is empty, LavaLamp will assume it is the same as the target option.

Example:

`jQuery("div#article").lavaLamp({ target:'li > a', container:'li' });`

assigns all `a` children of `li` elements under `div#article` to receive lavaLamp hover events using an li element as the hover `.backLava` container. [See the new multi-layer demos](demos/original.html#multi "target demos") for examples.

### fx - default: 'swing'

selects the easing formula for the animation - requires the jQuery Easing library to be loaded for additional effects

Example:

`jQuery("ul.navMenu").lavaLamp({ fx: "easeOutElastic" });`

animates the `backLava` element using the `easeOutElastic` easing formula

### speed - default: 500

sets animation speed in milliseconds

Example:

`jQuery("ul.navMenu").lavaLamp({ speed: 1000 });`

sets the animation speed to one second.

### click - default: function() { return true; }

Callback to be executed when the menu item is clicked. The 'event' object and source `li` DOM element will be passed in as arguments so you can use them in your function.

Example:

`jQuery("ul.navMenu").lavaLamp({ click: function(event, menuItem) { alert(event+el); return false; } });`

causes the browser to display an alert message of the variables passed and return false aborts any other click events on child items, including not following any links contained within the target

### startItem - default: '' _changed from `linum` version 1.3.1_

specifies the number target element as default, starting with 0 for the first element used to manually set the default LavaLamp highlight on load.

Example:

`jQuery("ul.navMenu").lavaLamp({ startItem: 2 });`

selects the third element in the list as default location for backLava

### includeMargins - default: false _version 1.3.5_

expands the hover `.backLava` element to include the margins of the target element. Best used in combination with the target and container options.

Example:

`jQuery("ul.navMenu").lavaLamp({ includeMargins: true });`

expands the hover `.backLava` element dimensions to include the margins of all target elements inside `ul.navMenu`.

### autoReturn - default: true _version 1.3.1_

defines whether the `backLava` hover should return to the last `selectedLava` element upon `mouseleave`.

Example:

`jQuery("ul.navMenu").lavaLamp({ autoReturn: false });`

turns off the `autoReturn` feature - `backLava` element will stay on the last element that you hovered over.

### returnDelay - default: 0 _version 1.3.1_

how many milliseconds to wait before returning the `backLava` element to the last selected element. Only works if `autoReturn` is set to true (default setting)

Example:

`jQuery("ul.navMenu").lavaLamp({ returnDelay: 1000 });`

waits one second after `mouseleave` event before returning to the last selected element.

### setOnClick - default: true _version 1.3.1_

defines whether a clicked element should receive the `selectLava` class and become the most recently selected element

Example:

`jQuery("ul.navMenu").lavaLamp({ setOnClick:false });`

disables selecting of elements once clicked - after you leave the parent list element the `backLava` will return to the original default element the page was loaded with.

### homeTop - default: 0, homeLeft - default: 0, homeHeight - default: 0, homeWidth - default: 0 _version 1.3.1_

allows you to define an independent 'home' element where the `backLava` defaults to or can be sent to. This can be used to define a unique starting and/or resting place for the `backLava` upon leaving the parent element.

Example:

`jQuery("ul.navMenu").lavaLamp({ homeTop:-100, homeLeft:0, homeHeight:20, homeWidth:600 });`

creates a home element 100 pixels above the parent container with a height of `20px` and width of `600px`. If the parent element has CSS of `overflow:hidden`, this can provide an interesting fly-in effect

### returnHome - default:false _version 1.3.1_

adjusts behavior of the `backLava` element when the the mouse leaves the parent container. the default behavior of 'false' causes the `backLava` element to stay on the active menu items after it is first triggered. this feature respects the `returnDelay` parameter, if set. this feature overrides the `autoReturn` parameter.

Example:

`jQuery("ul.navMenu").lavaLamp({ returnHome:true });`

causes the `backLava` element to always return to the `homeLava` position after mouse leaves the parent container. this can be manually triggered by running the command `jQuery("ul.navMenu").mouseover();`

### autoResize - default:false _version 1.3.1_

triggers the `selectedLava` `mouseenter` event when the window is resized. Setting `autoResize` to true causes the `backLava` element to reposition and change dimensions if the resizing the screen changes the shape of the LavaLamp. `autoResize` is best used with the target option. Default is false for efficiency as this feature is new and seldom used.

Example:

`jQuery('div#articles').lavaLamp({target:'p',autoSize:true});`

causes the `backLava` element to resize and reposition to the `p.selectedLava` position and dimensions when the window resizes. [See target demo for example.](demos/targetdemo.html "target demos")

### selectClass - default: 'selectedLava' _version 1.4_

### homeClass - default: 'homeLava' _version 1.4_

### skipClass - default: 'noLava' _version 1.4_

Overrides for internally used classes
note: changing these options will break some of the demos

### hoverStart - default: empty function _version 1.4_

A method to be called when a new target hover animation starts
The method is called with target element as the only parameter

Example:
`jQuery("div#articles").lavaLamp({hoverStart: function() { alert('new target hover started'); }});`
Triggers an alert message when LavaLamp hover starts moving to a new target element.

### hoverFinish - default: empty function _version 1.4_

A method to be called when a new target hover animation finishes
The method is called with target element as the only parameter

Example:
`jQuery("div#articles").lavaLamp({hoverFinish: function() { alert('new target hover finished'); }});`
Triggers an alert message when LavaLamp hover finishes returning to the home element.

### returnStart - default: empty function _version 1.4_

A method to be called when the hover return animation starts
The method is called with home element as the only parameter

Example:
`jQuery("div#articles").lavaLamp({returnStart: function() { alert('return hover started'); }});`
Triggers an alert message when LavaLamp hover starts returning to the home element.

### returnFinish - default: empty function _version 1.4_

A method to be called when the hover return animation finishes
The method is called with home element as the only parameter

Example:
`jQuery("div#articles").lavaLamp({returnFinish: function() { alert('return hover finished'); }});`
Triggers an alert message when LavaLamp hover finishes returning to the home element.

## Release History

* Version: 1.0 - adapted for jQuery 1.2.x series
* Version: 1.1 - added linum parameter
* Version: 1.2 - modified to support vertical resizing of elements
* Version: 1.3
  * enhanced automatic \<li> item hilighting, will now attempt to lock onto li > a element with href closest to selected window.location
  * click always returns 'true' by default, for standard link follow through.
* Version: 1.3.1 - verified for use with jQuery 1.3 - should still work with 1.2.x series
  * changed linum parameter to startItem for clarity
  * improved slide-in accuracy for .back elements with borders
  * changed .current class to .selectedLava for clarity and improved support
  * appended 'Lava' to all internal class names to avoid conflicts
  * fixed bug applying selectedLava class to elements with matching location.hash
  * now supports jquery.compat plugin for cross-library support
  * performance improvements
  * added new options:
  * autoReturn: true - if set to false, hover will not return to last selected item upon list mouseout.
  * returnDelay: 0 - if set, will delay auto-return feature specified # of milliseconds.
  * setOnClick: true - if set to false, hover will return to default element regardless of click event.
  * homeLeft: 0, homeTop: 0 - if either set to non zero value, absolute positioned li element with class .homeLava is prepended to list for homing feature.
  * homeWidth: 0, homeHeight: 0 - if set, are used for creation of li.homeLava element.
  * returnHome: false - if set along with homeLeft or homeTop, lavalamp hoverwill always return to li.home after click.
* Version: 1.3.2
  * fixed: stray $ references inside the plugin to work with jQuery.noConflict() properly - thanks Colin.
* Version: 1.3.3
  * fixed: added closure with null passed argument for move() command in returnDelay to fix errors some were seeing - thanks to Michel and Richard for noticing this.
  * fixed: changed mouseover/out events to mouseenter/leave to fix jerky animation problem when using excessive margins instead of padding. Thanks to Thomas for the solution and Chris for demonstrating the problem.
  * requires jQuery 1.3 or better (changed back to 1.2.2 in next release)
  * enhanced: added 'noLava' class detection to prevent LavaLamp effect application to <li> elements with this class. This feature allows you to create submenus - for details, see examples at https://nixbox.com/demos/jquery-lavalamp-demos.html
  * enhanced: modified to better automatically find default location for relative links. Thanks to Harold for testing and finding this bug.
* Version: 1.3.4 - major overhaul on practically everything:
  * enhanced: added autoResize option; see examples below.
  * enhanced: better automatic default item selection and URI resolution, better support for returnHome and returnDelay, refined internal variable usage and test to be as lean as possible
  * fixed: backLava hover element now exactly covers the destination LI dimensions.
  * fixed: changed use of mouseleave/mouseenter to bind events so will work with jQuery 1.2.2 onward.
  * fixed: proper closure on instance - should finally play nice with other libraries
  * fixed: proper quotes around all object element labels.
  * enhanced: behaves more like a plugin should and now automatically adds proper position and display CSS tags to the backLava element and parent container if absent.
* Version: 1.3.5 - new options:
  * target: 'li' - plain element to target to receive hover events.
  * container: '' - plain element to create for the hover .backLava and .homeLava elements. If left blank (default) same value as target option is used.
  * includeMargins: false - set to true to expand the hover element dimensions to include the margins of the target element.
  * changed: the backLava hover element now has all margins and padding manually set to zero to allow proper resizing of hover when used with custom target, container and includeMargins options. While this workaround has no effect with the site demos, it may affect your current implementation. If you experience problems try re-adjusting the CSS padding and margins for your target elements.
* Version: 1.4 - new options:
  * hoverStart, hoverFinish, returnStart, returnFinish - callbacks for different stages of the hover process.
  * selectClass, homeClass, skipClass - optional overrides for internally used classes 'selectedLava', 'homeLava' and 'noLava'
  * fixed: improved check for skipClass (noLava)
  * enhanced: lava animations now trigger on focusin and focusout to support keyboard usage
  * thanks to: MoOx for the customizable class and keyboard support suggestion many people who identified the noLava bug
* Version: 1.4.1
  * moved release history and usage to README.md for github clarity
  * changes usage of `bind` event to `on`, updated jQuery version requirements to 1.7 or greater
  * new minified version using latest Google closure compiler
