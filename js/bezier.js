'use strict';

(function($) {
  $.fn.bezierFields = function( options ) {

    var settings = $.extend( {}, $.fn.bezierFields.defaults, options ),
        selector,
        coords = ['sx', 'sy', 'ex', 'ey'],
        count = 0;

    if (settings.selector == 'attribute') {
      selector = 'input[' + settings.dataAttribute + ']';
    }
    else if (settings.selector == 'class') {
      selector = 'input.' + settings.fieldClass;
    }

    function updateCanvas(sx, sy, ex, ey, ctx) {
      ctx.lineWidth = 6;
      ctx.strokeStyle = "black";
      ctx.clearRect(0, 0, settings.size, settings.size);
      ctx.beginPath();
      ctx.moveTo(0, settings.size);
      ctx.bezierCurveTo(sx, sy, ex, ey, settings.size, 0);
      ctx.stroke();
    }

    function uiHtml(id) {
      var size = settings.size;

      var html = '<div class="bezier-ui-wrapper" style="width: ' + size + 'px; height: ' + size + 'px">';
          html = html + '<div class="coordinate-plane" data-bezier-ui-coordinates="' + id + '">';
          html = html + '<span class="control-point bezier-ui-start-control"></span>';
          html = html + '<div class="control-point bezier-ui-end-curve" style="top: 50px; left: 250px;"></div>';
          html = html + '<div class="control-point bezier-ui-start-curve" style="left: 50px; top: 250px;"></div>';
          html = html + '<span class="control-point bezier-ui-end-control"></span>';
          html = html + '<canvas class="bezier-ui-canvas" id="bezier-ui-canvas-' + id + '" data-bezier-canvas="' + id + '"" width="' + size + 'px" height="' + size + 'px"></canvas>';
          html = html + '<span class="bezier-ui-value" data-bezier-ui-value="' + id + '"><span class="sx">0</span>, <span class="sy">0</span>, <span class="ex">0</span>, <span class="ey">0</span></span>'
          html = html + '</div>';
          html = html + '</div>';
      return html;
    }

    function setTextValues(id) {
      var valuesUi = $('[data-bezier-ui-coordinates="' + id + '"]');
      console.log(id);
      if ($('[data-bezier="' + id + '""]').val() !== null) {
        var value = $('[data-bezier="' + id + '"]').val().replace('cubic-bezier(', '').replace(')', '');
      }
      else {
        var value = $('[data-bezier="' + id + '"]').attr('placeholder').replace('cubic-bezier(', '').replace(')', '');
      }

      var values = JSON.parse("[" + value + "]");

      for (var i = 0; i < values.length; i++) {
        $(valuesUi).find('.' + coords[i]).text(values[i]);
      }

      controlsInit(values, id);
    }

    function controlsInit(values, id) {
      var points = arrayCombine(coords, values),
          ui = $('[data-bezier-ui-coordinates="' + id + '"]');

      for (var i = 0; i < coords.length; i++) {
        points[coords[i]] = reverseValue(points[coords[i]]);
      }

      ui.find('.bezier-ui-start-curve').css({'top': points['sy'], 'left': points['sx']});
      ui.find('.bezier-ui-end-curve').css({'top': points['ey'], 'left': points['ex']});
    }

    function appendHtml(elem, id) {
      $(uiHtml(id)).insertAfter(elem);
      var value = $('[data-bezier="' + id + '"]').val().replace('cubic-bezier(', '').replace(')', ''),
          values = JSON.parse("[" + value + "]");
      setTextValues(id);
    }

    function arrayCombine(keys, values) {
      var newArray = {};
      var i = 0;

      if (typeof keys !== 'object') {
        return false;
      }

      if (typeof values !== 'object') {
        return false;
      }

      if (typeof keys.length !== 'number') {
        return false;
      }

      if (typeof values.length !== 'number') {
        return false;
      }

      if (!keys.length) {
        return false;
      }

      if (keys.length !== values.length) {
        return false;
      }

      for (i = 0; i < keys.length; i++) {
        newArray[keys[i]] = values[i];
      }

      return newArray;
    }

    function trueValue(offset, size) {
      var value,
          size = settings.size;

      value = (offset / size).toFixed(2);
      return value;
    }

    function reverseValue(value) {
      var offset,
          size = settings.size;

      offset = value * size;
      return offset;
    }

    $(selector).each(function() {

      var $count = count,
          $this = this;


      $(this).attr('data-bezier', $count);

      if ($(this).parent('label').length > 0) {
        $(this).parent().wrap('<div class="bezier-field-ui"></div>');
        appendHtml($(this).parent(), $count);
      } else {
        $(this).wrap('<div class="bezier-field-ui"></div>');
        appendHtml($(this), $count);
      }

      var canvas = $('#bezier-ui-canvas-' + count)[0],
          ctx = $('#bezier-ui-canvas-' + count)[0].getContext('2d'),
          curveBoundingBox = canvas.getBoundingClientRect(),
          valuesUi = $('[data-bezier-ui-coordinates="' + $count + '"]'),
          $start = $($this).parent().siblings().find('.bezier-ui-start-curve'),
          $end = $($this).parent().siblings().find('.bezier-ui-end-curve');

      // Make start control draggable
      $start.draggable({
        containment: 'parent',
        drag: function(e) {
          $(valuesUi).find('.sy').text(trueValue($start.css('top').replace('px', '')));
          $(valuesUi).find('.sx').text(trueValue($start.css('left').replace('px', '')));
          sx = $start.css('left').replace('px', '');
          sy = $start.css('top').replace('px', '');
          updateCanvas(sx, sy, ex, ey, ctx);
          var input = 'cubic-bezier(' +
            trueValue(sx) + ', ' +
            trueValue(sy) + ', ' +
            trueValue(ex) + ', ' +
            trueValue(ey) + ')';
          $(selector + '[data-bezier="' + $count + '"]').val(input);
        }
      });

      // Make end control draggable
      $end.draggable({
        containment: 'parent',
        drag: function(e) {
          $(valuesUi).find('.ey').text(trueValue($end.css('top').replace('px', '')));
          $(valuesUi).find('.ex').text(trueValue($end.css('left').replace('px', '')));
          ex = $end.css('left').replace('px', '');
          ey = $end.css('top').replace('px', '');
          updateCanvas(sx, sy, ex, ey, ctx);
          var input = 'cubic-bezier(' +
            trueValue(sx) + ', ' +
            trueValue(sy) + ', ' +
            trueValue(ex) + ', ' +
            trueValue(ey) + ')';
          $(selector + '[data-bezier="' + $count + '"]').val(input);
        }
      });

      var sx = $start.css('top').replace('px', ''),
          sy = $start.css('left').replace('px', ''),
          ex = $end.css('top').replace('px', ''),
          ey = $end.css('left').replace('px', '');

      updateCanvas(sx, sy, ex, ey, ctx);
      count++;
    });

  }

  // Plugin defaults – added as a property on our plugin function.
  $.fn.bezierFields.defaults = {
    appendHtml: false,
    selector: 'class',
    dataAttribute: 'data-bezier',
    fieldClass: 'bezier-field',
    size: 300,
    accuracy: 3
  };

})(jQuery);


$(document).bezierFields({
  selector: 'attribute',
  appendHtml: true,
  size: 300,
  accuracy: 2
});
