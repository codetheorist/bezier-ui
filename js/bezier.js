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


      count++;
      console.log($(this).find('.bezier-ui-start-curve'));

      // Store curve controls in variables
      var $start = $($this).parent().siblings().find('.bezier-ui-start-curve');
      var $end = $($this).parent().siblings().find('.bezier-ui-end-curve');

      // Make start control draggable
      $start.draggable({
        containment: 'parent'
      });

      // Make end control draggable
      $end.draggable({
        containment: 'parent'
      });

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
