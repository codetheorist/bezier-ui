'use strict';

(function ( $ ) {

  $.fn.bezierViz = function( options ) {

    // This is the easiest way to have default options.
    var settings = $.extend({
        // These are the defaults.
        output: 'full',
        appendHtml: 'FALSE'
    }, options );

    if (settings.appendHtml == 'TRUE') {
      console.log('True');
    }
    else {
      console.log('False');
    }

  }
}( jQuery ));
