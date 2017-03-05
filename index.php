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
          echo('<script src="js/' . $script['path'] .'"></script>');
        }
      }
    ?>

    <?php
      // Load stylesheets
      foreach ($site['styles'] as $style) {
        echo('<link rel="stylesheet" href="css/' . $style .'">');
      }
    ?>

  </head>
  <body>
    <div class="row">
      <div class="medium-12 medium-centered text-center columns">
        <h1><?php echo $site['title'] ?></h1>
        <h3><?php echo $site['slogan'] ?></h3>
      </div>
    </div>
    <div class="row">
      <div class="medium-12 medium-centered columns">
        <form>
          <label>Bezier
            <input class="bezier-field" type="text" data-bezier placeholder="cubic-bezier(0.14, 0.65, 0.80, 0.38)">
          </label>
          <label>Bezier
            <input class="bezier-field" type="text" data-bezier value="cubic-bezier(0.25, 0.75, 0.75, 0.99)">
          </label>
        </form>
      </div>
    </div>

    <?php
      // Load footer scripts
      foreach ($site['scripts'] as $script) {
        if ($script['location'] === 'bottom') {
          echo('<script src="js/' . $script['path'] .'"></script>');
        }
      }
    ?>
  </body>
</html>
