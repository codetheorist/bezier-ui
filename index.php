<?php
  define('__ROOT__', dirname(__FILE__));
  require_once(__ROOT__.'/inc/settings.php');
?>
<!DOCTYPE html>
<html class="no-js" lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $site['title'] ?></title>

    <?php
      // Load header scripts
      foreach ($site['scripts'] as $script) {
        if ($script['location'] === 'top') {
          echo('<script src="' . $script['path'] .'"></script>');
        }
      }
    ?>

    <?php
      // Load stylesheets
      foreach ($site['styles'] as $style) {
        echo('<link rel="stylesheet" href="' . $style .'">');
      }
    ?>
    <link rel="stylesheet" href="node_modules/mocha/mocha.css">
    <style type="text/css">
      #mocha-stats {
        position: relative;
        top: 0;
      }
    </style>
  </head>
  <body>
    <div class="row">
      <div class="medium-6 columns">
        <h3><?php echo $site['title'] ?></h3>
        <h5><?php echo $site['slogan'] ?></h5>
        <form>
          <label>Bezier
            <input class="bezier-field" type="text" data-bezier placeholder="cubic-bezier(0.14, 0.65, 0.80, 0.38)">
          </label>
          <label>Bezier
            <input class="bezier-field" type="text" data-bezier value="cubic-bezier(0.25, 0.75, 0.75, 0.99)">
          </label>
        </form>
      </div>
      <div class="medium-6 columns">
        <div id="mocha"></div>

      </div>
    </div>

    <?php
      // Load footer scripts
      foreach ($site['scripts'] as $script) {
        if ($script['location'] === 'bottom') {
          echo('<script src="' . $script['path'] .'"></script>');
        }
      }
    ?>

    <script src="node_modules/mocha/mocha.js"></script>
    <script src="node_modules/chai/chai.js"></script>
    <script>mocha.setup({
      ui: 'bdd',
      ignoreLeaks: true
    });
    </script>

    <!-- load code you want to test here -->

    <!-- load your test files here -->
    <script>
      var assert = chai.assert;
      var expect = chai.expect;

      describe('Bezier UI Sandbox', function() {
        beforeEach(function(done) {
          this.timeout(200); // A very long environment setup.
          setTimeout(done, 100);
        });
        describe('Two input fields', function() {
          it('There should be two input fields.', function() {
            var res = $('input').length;
            expect(res).to.equal(2);
          });
        });
        describe('One input placeholder', function() {
          it('Only one of the inputs should have a placeholder.', function() {
            var res = $('input').filter('[placeholder]').length;
            expect(res).to.equal(1);
          });
        });
        describe('Both inputs disabled', function() {
          it('Both of the input fields should be disabled.', function() {
            var res = $('input').filter('[disabled]').length;
            expect(res).to.equal(2);
          });
        });
        describe('One input value', function() {
          it('Only one of the inputs should have a default value.', function() {
            var res = $('input').filter(function() { return $(this).val() != ''; }).length;
            expect(res).to.equal(1);
          });
        });
      });

      describe('Bezier UI Plugin Interface', function() {
        beforeEach(function(done) {
          this.timeout(200); // A very long environment setup.
          setTimeout(done, 100);
        });
        describe("Canvas", function() {
          it("Each coordinate-plane should have it's own canvas element.", function() {
            var canvas = $('canvas').filter('[data-bezier-canvas]');
            var plane = $('.coordinate-plane');
            expect(plane.length).to.equal(canvas.length);
          });
        });
        describe("Coordinate Plane", function() {
          it("Each input field should have it's own coordinate-plane.", function() {
            var input = $('input');
            var plane = $('.coordinate-plane');
            expect(plane.length).to.equal(input.length);
          });
        });
        describe('Data-bezier', function() {
          it('All input fields should have a "data-bezier" attribute.', function() {
            var input = $('input');
            var res = input.filter('[data-bezier]').length;
            expect(res).to.equal(input.length);
          });
        });
      });

      describe('Bezier UI Plugin Functions', function() {
        beforeEach(function(done) {
          this.timeout(200); // A very long environment setup.
          setTimeout(done, 100);
        });
        describe("Canvas", function() {
          it("Each coordinate-plane should have it's own canvas element.", function() {
            var input = $('canvas').filter('[data-bezier-canvas]');
            var plane = $('.coordinate-plane');
            expect(plane.length).to.equal(input.length);
          });
        });
      });
    </script>
    <script>
      mocha.run();
    </script>
  </body>
</html>
