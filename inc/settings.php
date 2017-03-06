<?php
  $site = [
    'title' => 'Bezier Sandbox',
    'slogan' => 'A sandbox for testing Bezier Curve field UI.',
    'scripts' => array(
      'jquery' => array(
        'location' => 'bottom',
        'path' => 'dist/js/vendor/jquery.min.js'
      ),
      'jquery-ui' => array(
        'location' => 'bottom',
        'path' => 'dist/js/vendor/jquery-ui.min.js'
      ),
      'what-input' => array(
        'location' => 'bottom',
        'path' => 'dist/js/vendor/what-input.min.js'
      ),
      'bezier' => array(
        'location' => 'bottom',
        'path' => 'src/js/bezier-ui.js'
      ),
    ),
    'styles' => array(
      'bezier' => 'src/css/bezier-ui.css',
      'jquery-ui' => 'dist/css/vendor/jquery-ui.min.css',
    ),
  ];
