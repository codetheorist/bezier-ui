(function ( $ ) {
  $(document).ready(function() {

    function addBezierUi($element, $index) {

    }

    console.log('Data Bezier Count: ' + $('input[data-bezier]').length);
    $('input[data-bezier]').each(function() {
      var index = $(this).index('input[data-bezier]');
      console.log(index);
      $('<div class="bezierViz" data-bezier-label="' + index + '"></div>').insertAfter($(this));

      $('div[data-bezier-label="' + index + '"').load('bezier.input.html');

        $.get('bezier.viz.html', function(data) {
           $('div[data-bezier-label="' + index + '"').append(data);
        });
      var curve = $(this).val().replace('curve-bezier(', '').replace(')', '');
      var values = curve.split(',');
      console.log(curve);

      $(this).attr('data-bezier-index', $(this).index('input[data-bezier]'));

      // $this = this;


      // //$($this).css({'display': 'none'});
      // console.log(this);
      // console.log($(this));
      // $($this).css({'display': 'none'});

    });
    $('input[data-bezier]').on('keyup', function() {
      var curve = $(this).val().replace('curve-bezier(', '').replace(')', '');
      var values = curve.split(',');
      console.log(curve);
      console.log('Key Up: ' + curve);
      $this = this;
      var parentIndex = $(this).index('input[data-bezier]');
      console.log(parentIndex);
      $('span[data-bezier-label="' + parentIndex + '"]').text('Help');
      console.log(curve);
      $.each(values, function (index, value) {
        $('input[data-bezier-index="' + parentIndex + '"]').siblings('[data-bezier-label]').find('.P' + index).text(value);
        // value = value.replace(' ', '');
        // values[index] = value;
        // $('span[data-bezier-label="' + parentIndex + '"] code').find('.P' + index).text(value);
        // console.log(index);
        // console.log(value);

      });
    });
  });
}( jQuery ));
    // $('#bezierPresets').change(function() {

    //   $this = this;
    //   $('#bezierCurveInput').val($($this).val());
    //   var values = $(this).val().split(',');
    //   console.log(values);

    //   $.each(values, function (index, value) {
    //     value = value.replace(' ', '');
    //     values[index] = value;
    //     console.log(index);
    //     console.log(value);
    //     $('#P' + index).text(value);
    //     // Will stop running after "three"
    //     return (index !== 3);
    //   });
    //   console.log(values);
    // });
