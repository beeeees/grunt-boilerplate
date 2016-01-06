///////////////////////////////////////////////
// Configuration Options
///////////////////////////////////////////////
var uglifyWhenWatching = false;
var sassOutputStyle = 'expanded'; // expanded | nested | compact | compressed




// Require any extras that we might need.
var fs = require('fs');

///////////////////////////////////////////////
// Helper Functions
///////////////////////////////////////////////
function merge(source, target) {
  for(var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
}

// Main Grunt section
module.exports = function(grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          // jQuery
          'js/vendor/jquery-1.11.1.min.js',

          // Bootstrap individual components (load order matters)
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
          'js/vendor/*.js',            // Include rest of vendor scripts in no particular order.
          '!js/vendor/html5shiv.js', // [!] Needs to be in the head to work properly.
          '!js/vendor/respond.min.js', // [!] Needs to be in the head to work properly.


          'js/*.js',        // All .js files.
          'js/scripts.js',  // Add the scripts.js file last.
          '!js/all.js',     // [!] Do not concat all.js
          '!js/all.min.js'  // [!] Do not concat all.min.js
        ],
        dest: 'js/all.js',
      },
    },
    sass: {
      dist: {
        options: {
          style: sassOutputStyle
        },
        files: {
          'css/pre/styles.css': 'sass/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          // require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: ['last 2 versions', 'IE 9'] }), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        expand: true,
        flatten: true,
        src: ['css/pre/*.css'],
        dest: 'css/',
        ext: '.css'
      }
    },
    watch: {
      scripts: {
        files: [
          // Run the concat task when any of these files change:
          'js/**/*.js',    // all of the .js files
          '!js/all.js' // [!] We don't want to watch the generated file.
        ],
        tasks: ['concat']
      },
      css: {
        // Run the sass task when any of these files change:
        files: [
          'sass/**/*.scss'  // all of the .scss files.
        ],
        tasks: ['sass', 'postcss']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            // Livereload when any of these files change:
            'css/**/*.css',      // compiled CSS
            '!css/pre/*.css',    // Not! pre-compiled CSS
            'js/**/all*.js',     // concatenated/minified JS
            '**/*.html',         // any HTML files
            '**/*.php'           // any PHP files
          ]
        },
        options: {
          watchTask: true,
          server: './',
          port: 8000,
          snippetOptions: {
            // Inject the snippet at the end of the body tag.
            // this helps with issues related to IE conditional
            // comments getting in the way.
            rule: {
              match: /<\/body>/i,
              fn: function (snippet, match) {
                return snippet + match;
              }
            }
          }
        }
      }
    }
  };


  ///////////////////////////////////////////////
  // Tasks
  ///////////////////////////////////////////////
  var defaultTasks = [
    'browserSync',
    'concat',
    'sass',
    'postcss'
  ];


  ///////////////////////////////////////////////
  // Conditional for CoffeeScript
  ///////////////////////////////////////////////
  if (fs.existsSync('coffee')) {
    var coffeeConfig = {
      coffee: {
        compile: {
          expand: true,
          flatten: true,
          src: ['coffee/*.coffee'],
          dest: 'js/',
          ext: '.js'
        }
      }
    };
    var coffeeWatch = {
      coffee: {
        files: ['coffee/**.coffee'], // Watch the coffee files.
        tasks: ['coffee'] // Run the coffee processor.
      }
    };
    merge(coffeeConfig, config); // Add the coffee configuration.
    merge(coffeeWatch, config.watch); // Add the coffee watcher.
    defaultTasks.unshift('coffee');
    grunt.loadNpmTasks('grunt-contrib-coffee');
  }


  ///////////////////////////////////////////////
  // Conditional for Uglification
  ///////////////////////////////////////////////
  if(uglifyWhenWatching){
    var uglifyConfig = {
      uglify: {
        dist: {
          files: {
            'js/all.min.js': ['js/all.js']
          }
        }
      }
    };
    merge(uglifyConfig, config); // Add the uglify configuration.
    config.watch.scripts.tasks.push('uglify'); // Add uglify to the concat watcher.
    defaultTasks.push('uglify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
  }


  ///////////////////////////////////////////////
  // Where we tell Grunt we plan to use
  // the plug-ins configured above
  ///////////////////////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-postcss');


  // Initialize the Grunt configuration
  grunt.initConfig(config);


  ///////////////////////////////////////////////
  // What will initialize when we type
  // "grunt" into the terminal.
  ///////////////////////////////////////////////
  //
  // grunt
  // grunt uglify - to minify the JavaScript
  //
  // Minification of JavaScript is kept separate to keep the
  // save -> refresh cycle fast. Run `grunt uglify` before switching
  // the all.js script tag to all.min.js

  defaultTasks.push('watch'); // Watch blocks, so it must be pushed last.
  grunt.registerTask('default', defaultTasks);
};
