'use strict';

(function($) {
  $.fn.bezierFields = function( options ) {

    var settings = $.extend( {}, $.fn.bezierFields.defaults, options ),
        selector,
        count = 0;

    if (settings.selector == 'attribute') {
      selector = 'input[' + settings.dataAttribute + ']';
    }
    else if (settings.selector == 'class') {
      selector = 'input.' + settings.fieldClass;
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
          html = html + '<span class="bezier-ui-value" data-bezier-ui-value="' + id + '"><span class="startX">0</span>, <span class="startY">0</span>, <span class="endX">0</span>, <span class="endY">0</span></span>'
          html = html + '</div>';
          html = html + '</div>';
      return html;
    }

    function appendHtml(elem, id) {
      $(uiHtml(id)).insertAfter(elem);
    }

    $(selector).each(function() {
      var $count = count,
          $this = this;

      $(this).attr('data-bezier', $count);

      if (settings.appendHtml === true) {
        if ($(this).parent('label').length > 0) {
          $(this).parent().wrap('<div class="bezier-field-ui"></div>');
          appendHtml($(this).parent(), $count);
        } else {
          $(this).wrap('<div class="bezier-field-ui"></div>');
          appendHtml($(this), $count);
        }
      }

      var canvas = $('#bezier-ui-canvas-' + count)[0],
          ctx = $('#bezier-ui-canvas-' + count)[0].getContext('2d'),
          curveBoundingBox = canvas.getBoundingClientRect();

      console.log(ctx);
      console.log(curveBoundingBox);
      count++;
    });

    $('.bezier-ui-start-curve, .bezier-ui-end-curve').each(function(){

      var $this = this;
      var sx = $(this).children('.bezier-ui-start-curve').css('left'),
          sy = $(this).children('.bezier-ui-start-curve').css('top'),
          ex = $(this).children('.bezier-ui-end-curve').css('left'),
          ey = $(this).children('.bezier-ui-end-curve').css('top');

      $(this).draggable({
        drag: function(e) {
          var $left = ($($this).css('left').replace('px', '') / settings.size).toFixed(2),
              $top = ($($this).css('top').replace('px', '') / settings.size).toFixed(2),
              $values = $(this).siblings('.bezier-ui-value');

          sx = $($values).find('.startX').text();
          sy = $($values).find('.startY').text();
          ex = $($values).find('.endX').text();
          ey = $($values).find('.endY').text();
          if ($(this).hasClass('bezier-ui-start-curve')) {
            sx = $left;
            sy = $top;
            $($values).find('.startX').text(sx);
            $($values).find('.startY').text(sy);
            updateCanvas(sx, sy, ex, ey, $($this).siblings('.bezier-ui-canvas')[0].getContext("2d"));
          }
          else if ($(this).hasClass('bezier-ui-end-curve')) {
            ex = $left;
            ey = $top;
            $($values).find('.endX').text(ex);
            $($values).find('.endY').text(ey);
            updateCanvas(sx, sy, ex, ey, $($this).siblings('.bezier-ui-canvas')[0].getContext("2d"));
          }
          var id = $(this).parent().data('bezierUiCoordinates');
          $('[data-bezier="' + id + '"]').attr('value', 'cubic-bezier(' + sx + ', ' + sy + ', ' + ex + ', ' + ey + ')');
        },
        containment: 'parent'
      });

      function updateCanvas(sx, sy, ex, ey, ctx) {
        var ctx = ctx;
        // Setup canvas stroke
        ctx.lineWidth = 6;
        ctx.strokeStyle = "black";

        // Clear canvas
        ctx.clearRect(0, 0, settings.size, settings.size);

        // Begin canvas draw
        ctx.beginPath();

        // Move to bottom left of canvas
        ctx.moveTo(0, settings.size);

        // Create bezier to top right of canvas
        ctx.bezierCurveTo(
          sx * settings.size,
          sy * settings.size,
          ex * settings.size,
          ey * settings.size,
          settings.size, 0
        );

        // Actually draw curve on canvas
        ctx.stroke();
      }
    });

    $(document).ready(function() {
      $('.coordinate-plane').each(function() {
        var id = $(this).data('bezierUiCoordinates');
        var sx = $(this).children('.bezier-ui-start-curve').css('left').replace('px', ''),
            sy = $(this).children('.bezier-ui-start-curve').css('top').replace('px', ''),
            ex = $(this).children('.bezier-ui-end-curve').css('left').replace('px', ''),
            ey = $(this).children('.bezier-ui-end-curve').css('top').replace('px', '');
        var $values = $(this).find('.bezier-ui-value');
        $($values).find('.startX').text(sx);
        $($values).find('.startY').text(sy);

        $($values).find('.endX').text(ex);
        $($values).find('.endY').text(ey);

        console.log(sx, sy, ex, ey);
        var ctx = $(this).children('.bezier-ui-canvas')[0].getContext("2d");
        ctx.lineWidth = 6;
        ctx.strokeStyle = "black";
        ctx.clearRect(0, 0, settings.size, settings.size);
        ctx.beginPath();
        ctx.moveTo(0, settings.size);
        ctx.bezierCurveTo(sx, sy, ex, ey, settings.size, 0);
        ctx.stroke();
      });
    });
  }
//   // Plugin defaults – added as a property on our plugin function.
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
