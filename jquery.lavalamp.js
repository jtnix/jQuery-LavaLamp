/**
 * jquery.LavaLamp v1.4.1 - light up your menus with fluid, jQuery powered animations.
 *
 * Requires jQuery version 1.7 or later from https://jquery.com
 * Tested on jQuery versions 1.7 through 2.2.4
 *
 * https://nixbox.com/projects/jquery-lavalamp/
 *
 * Copyright (c) 2008, 2009, 2010, 2012 Jolyon Terwilliger, jolyon@nixbox.com
 * Source code Copyright (c) 2008, 2009, 2010, 2012
 * Dual licensed under the MIT and GPL licenses:
 * https://www.opensource.org/licenses/mit-license.php
 * https://www.gnu.org/licenses/gpl.html
 *
 * LavaLamp Usage and Release History moved to
 * github page at https://github.com/jtnix/jQuery-LavaLamp
 **/

(function($) {
  jQuery.fn.lavaLamp = function(o) {
    o = $.extend(
      {
        target: "li",
        container: "",
        fx: "swing",
        speed: 500,
        click: function() {
          return true;
        },
        startItem: "",
        includeMargins: false,
        autoReturn: true,
        returnDelay: 0,
        setOnClick: true,
        homeTop: 0,
        homeLeft: 0,
        homeWidth: 0,
        homeHeight: 0,
        returnHome: false,
        autoResize: false,
        selectClass: "selectedLava",
        homeClass: "homeLava",
        skipClass: "noLava",
        returnStart: function() {},
        returnFinish: function() {},
        hoverStart: function() {},
        hoverFinish: function() {}
      },
      o || {}
    );

    // safe parseInt for easy mathing
    function getInt(arg) {
      var myint = parseInt(arg);
      return isNaN(myint) ? 0 : myint;
    }

    if (o.container == "") o.container = o.target;

    if (o.autoResize)
      $(window).resize(function() {
        $(o.target + "." + o.selectClass).trigger("mouseenter");
      });

    return this.each(function() {
      // ensures parent UL or OL element has some positioning
      if ($(this).css("position") == "static")
        $(this).css("position", "relative");

      // create homeLava element if origin dimensions set
      if (o.homeTop || o.homeLeft) {
        var $home = $(
          "<" +
            o.container +
            ' class="' +
            o.homeClass +
            '"></' +
            o.container +
            ">"
        ).css({
          left: o.homeLeft,
          top: o.homeTop,
          width: o.homeWidth,
          height: o.homeHeight,
          position: "absolute",
          display: "block"
        });
        $(this).prepend($home);
      }

      var path = location.pathname + location.search + location.hash,
        $selected,
        $back,
        $lt = $(o.target, this).not("." + o.skipClass),
        delayTimer,
        bx = 0,
        by = 0,
        mh = 0,
        mw = 0,
        ml = 0,
        mt = 0;

      // start $selected default with CSS `selectedClass`
      $selected = $(o.target + "." + o.selectClass, this);

      // override $selected if startItem is set
      if (o.startItem != "") $selected = $lt.eq(o.startItem);

      // default to $home element
      if ((o.homeTop || o.homeLeft) && $selected.length < 1) $selected = $home;

      // loop through all the target element a href tags and
      // the longest href to match the location path is deemed the most
      // accurate and selected as default
      if ($selected.length < 1) {
        var pathmatch_len = 0,
          $pathel;

        $lt.each(function() {
          var thishref = $("a:first", this).attr("href");
          if (path.indexOf(thishref) > -1 && thishref.length > pathmatch_len) {
            $pathel = $(this);
            pathmatch_len = thishref.length;
          }
        });
        if (pathmatch_len > 0) {
          $selected = $pathel;
        }
      }

      // if still no matches, default to the first element
      if ($selected.length < 1) $selected = $lt.eq(0);

      // make sure we only have one element as $selected and apply selectedClass
      $selected = $($selected.eq(0).addClass(o.selectClass));

      // add mouseover event for every sub element
      $lt
        .on("mouseenter focusin", function() {
          // help backLava behave if returnDelay is set
          if (delayTimer) {
            clearTimeout(delayTimer);
            delayTimer = null;
          }
          move($(this));
        })
        .click(function(e) {
          if (o.setOnClick) {
            $selected.removeClass(o.selectClass);
            $selected = $(this).addClass(o.selectClass);
          }
          return o.click.apply(this, [e, this]);
        });

      // creates and adds to the container a backLava element with absolute positioning
      $back = $(
        "<" +
          o.container +
          ' class="backLava"><div class="leftLava"></div><div class="bottomLava"></div><div class="cornerLava"></div></' +
          o.container +
          ">"
      )
        .css({ position: "absolute", display: "block", margin: 0, padding: 0 })
        .prependTo(this);

      // setting css height and width actually sets the innerHeight and innerWidth, so
      // compute border and padding differences on styled backLava element to fit them in also.
      if (o.includeMargins) {
        mh =
          getInt($selected.css("marginTop")) +
          getInt($selected.css("marginBottom"));
        mw =
          getInt($selected.css("marginLeft")) +
          getInt($selected.css("marginRight"));
      }
      bx =
        getInt($back.css("borderLeftWidth")) +
        getInt($back.css("borderRightWidth")) +
        getInt($back.css("paddingLeft")) +
        getInt($back.css("paddingRight")) -
        mw;
      by =
        getInt($back.css("borderTopWidth")) +
        getInt($back.css("borderBottomWidth")) +
        getInt($back.css("paddingTop")) +
        getInt($back.css("paddingBottom")) -
        mh;

      // set the starting position for the lavalamp hover element: .back
      if (o.homeTop || o.homeLeft)
        $back.css({
          left: o.homeLeft,
          top: o.homeTop,
          width: o.homeWidth,
          height: o.homeHeight
        });
      else {
        if (!o.includeMargins) {
          ml = getInt($selected.css("marginLeft"));
          mt = getInt($selected.css("marginTop"));
        }
        $back.css({
          left: $selected.position().left + ml,
          top: $selected.position().top + mt,
          width: $selected.outerWidth() - bx,
          height: $selected.outerHeight() - by
        });
      }

      // after we leave the container element, move back to default/last clicked element
      $(this).on("mouseleave focusout", function() {
        var $returnEl = null;
        if (o.returnHome) $returnEl = $home;
        else if (!o.autoReturn) return true;

        if (o.returnDelay) {
          if (delayTimer) clearTimeout(delayTimer);
          delayTimer = setTimeout(function() {
            move($returnEl, "return");
          }, o.returnDelay);
        } else {
          move($returnEl, "return");
        }
        return true;
      });

      function move($el, cbType) {
        if (cbType == "return") {
          o.returnStart($el);
        } else {
          o.hoverStart($el);
        }

        if (!$el) $el = $selected;

        if (!o.includeMargins) {
          ml = getInt($el.css("marginLeft"));
          mt = getInt($el.css("marginTop"));
        }
        var dims = {
          left: $el.position().left + ml,
          top: $el.position().top + mt,
          width: $el.outerWidth() - bx,
          height: $el.outerHeight() - by
        };

        $back.stop().animate(dims, o.speed, o.fx, function() {
          if (cbType == "return") {
            o.returnFinish($el);
          } else {
            o.hoverFinish($el);
          }
        });
      }
    });
  };
})(jQuery);
