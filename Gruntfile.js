module.exports = function(grunt) {
  //  All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          // jQuery
          'js/vendor/jquery-1.11.1.min.js',

          // Bootstrap individual components
            'bootstrap/assets/javascripts/bootstrap/affix.js',
            'bootstrap/assets/javascripts/bootstrap/alert.js',
            'bootstrap/assets/javascripts/bootstrap/button.js',
            'bootstrap/assets/javascripts/bootstrap/carousel.js',
            'bootstrap/assets/javascripts/bootstrap/collapse.js',
            'bootstrap/assets/javascripts/bootstrap/dropdown.js',
            'bootstrap/assets/javascripts/bootstrap/tab.js',
            'bootstrap/assets/javascripts/bootstrap/transition.js',
            'bootstrap/assets/javascripts/bootstrap/scrollspy.js',
            'bootstrap/assets/javascripts/bootstrap/modal.js',
            'bootstrap/assets/javascripts/bootstrap/tooltip.js',
            'bootstrap/assets/javascripts/bootstrap/popover.js',

          // OR simply include all Bootstrap
            // 'bootstrap/assets/javascripts/bootstrap.js',

          // Blanket Vendor Scripts
          'js/vendor/*.js', // Include rest of vendor scripts in no particular order.
          '!js/vendor/respond.min.js', // [!] Needs to be in the head to work properly.

          // Hand Written
          'js/scripts.js',
        ],
        dest: 'js/all.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'js/all.min.js': ['js/all.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded' // If your .map file works, this can be changed to compressed.
        },
        files: {
          'css/styles.css': 'sass/main.scss'
        }
      }
    },
    watch: {
      livereload: {
        options: { livereload: true },
        files: [
          'css/**/*.css', // compiled CSS
          'js/**/*.js', // any JS files
          '**/*.html', // any HTML files
          '**/*.php' // any PHP files
        ]
      },
      scripts: {
        files: [
          'js/**/*.js',
          '!js/all.js' // [!] We don't want to watch the generated file.
        ],
        tasks: ['concat'] // Optionally add 'uglify' to this if you need it.
      },
      css: {
        files: [
          'sass/**/*.scss' // Recompile when any of our scss files change.
        ],
        tasks: ['sass']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000 // Start a static assets server on port 8000 (optional)
        }
      }
    }
  });

  //  Where we tell Grunt we plan to use the plug-ins configured above
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // What will initialize when we type "grunt" into the terminal.
  // grunt
  // grunt serve
  // grunt dev 
  // grunt uglify - to minify the JavaScript
  // 
  // Minification of JavaScript is kept separate to keep the 
  // save -> refresh cycle fast. Run `grunt uglify` before switching
  // the all.js script tag to all.min.js
  grunt.registerTask('default', ['concat', 'sass', 'watch']);
  grunt.registerTask('serve', ['concat', 'sass', 'connect', 'watch']);
  grunt.registerTask('dev', ['serve']);
};
