module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var project_name = 'bezier-ui';

  var global_vars = {
    project_name: project_name
  };

  var jsVendor = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-ui/jquery-ui.js',
    'bower_components/what-input/dist/what-input.js'
  ];

  var jsVendorMin = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/**/jquery-ui.min.js',
    'bower_components/what-input/dist/what-input.min.js'
  ];

  var cssVendor = [
    'bower_components/jquery-ui/themes/ui-lightness/jquery-ui.css'
  ];

  var cssVendorMin = [
    'bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css'
  ];


  grunt.initConfig({
    global_vars: global_vars,
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      vendorJS : {
        files : [
          {
            expand : true,
            dest   : 'src/js/vendor',
            cwd    : '',
            flatten: true,
            src    : jsVendor
          }
        ]
      },
      vendorJSMin : {
        files : [
          {
            expand : true,
            dest   : 'dist/js/vendor',
            cwd    : '',
            flatten: true,
            src    : jsVendorMin
          }
        ]
      },
      vendorCSS : {
        files : [
          {
            expand : true,
            dest   : 'src/css/vendor',
            cwd    : '',
            flatten: true,
            src    : cssVendor
          }
        ]
      },
      vendorCSSMin : {
        files : [
          {
            expand : true,
            dest   : 'dist/css/vendor',
            cwd    : '',
            flatten: true,
            src    : cssVendorMin
          }
        ]
      }
    },
    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: {
                'dist/js/bezier-ui.js': 'src/js/bezier-ui.js'
            }
        }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : ['src/js/bezier-ui.js', '**/*.php', 'src/css/bezier-ui.css']
        },
        options: {
          watchTask: true,
          open: false,
          host: "http://cubic.bezier"
        }
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      js: {
        files: [
          'src/js/bezier-ui.js'
        ],
        tasks: ['babel']
      },
    }

  });

  grunt.registerTask('init', ['copy', 'babel']);
  grunt.registerTask('build', ['copy']);
  grunt.registerTask('default', ['babel', 'browserSync', 'watch']);
};
