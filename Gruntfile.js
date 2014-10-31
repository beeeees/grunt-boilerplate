///////////////////////////////////////////////
// Configuration Options
///////////////////////////////////////////////
var enableCoffeeScript = false;
var uglifyWhenWatching = false;


///////////////////////////////////////////////
// Helper Functions
///////////////////////////////////////////////
function mix(source, target) {
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
        tasks: ['concat']
      },
      css: {
        files: ['sass/**/*.scss'], // Watch all scss files.
        tasks: ['sass'] // Run the Sass processor.
      }
    },
    connect: {
      server: {
        options: {
          port: 8000 // Start a static server on port 8000 (optional)
        }
      }
    }
  };


  ///////////////////////////////////////////////
  // Tasks
  ///////////////////////////////////////////////
  var defaultTasks = [
    'concat',
    'sass'
  ];
  var serveTasks = [
    'connect',
    'concat',
    'sass'
  ];


  ///////////////////////////////////////////////
  // Conditional for CoffeeScript
  ///////////////////////////////////////////////
  if(enableCoffeeScript){
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
    mix(coffeeConfig, config); // Add the coffee configuration.
    mix(coffeeWatch, config.watch); // Add the coffee watcher.
    defaultTasks.push('coffee');
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
    mix(uglifyConfig, config); // Add the uglify configuration.
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
  grunt.loadNpmTasks('grunt-contrib-connect');


  // Initialize the Grunt configuration
  grunt.initConfig(config);


  ///////////////////////////////////////////////
  // What will initialize when we type
  // "grunt" into the terminal.
  ///////////////////////////////////////////////
  //
  // grunt
  // grunt serve
  // grunt dev
  // grunt uglify - to minify the JavaScript
  //
  // Minification of JavaScript is kept separate to keep the
  // save -> refresh cycle fast. Run `grunt uglify` before switching
  // the all.js script tag to all.min.js

  defaultTasks.push('watch'); // Watch blocks, so it must be pushed last.
  serveTasks.push('watch'); // Watch blocks, so it must be pushed last.
  grunt.registerTask('default', defaultTasks);
  grunt.registerTask('serve', serveTasks);
  grunt.registerTask('dev', ['serve']);
};
