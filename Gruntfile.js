///////////////////////////////////////////////
// Configuration Options
///////////////////////////////////////////////
var sassOutputStyle = 'expanded'; // expanded | nested | compact | compressed

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
    sass: {
      options: {
          sourceMap: true
      },
      main: {
        options: {
          style: sassOutputStyle
        },
        files: {
          'css/pre/main.css': 'sass/main.scss'
        }
      }
    },
    watch: {
      css: {
        // Run the sass task when any of these files change:
        files: [
          'sass/**/*.scss'  // all of the .scss files.
        ],
        tasks: ['sass', 'postcss']
      },
      grunt: {
        files: ['Gruntfile.js']
      }
    }
  };


  ///////////////////////////////////////////////
  // Tasks
  ///////////////////////////////////////////////
  var defaultTasks = [
    'clean',
    'sass',
    'postcss',
    'browserify',
    'uglify'
  ];
  var watchTasks = [
    'browserSync',
    'clean',
    'sass',
    'postcss',
    'browserify',
    'watch'
  ];


  ///////////////////////////////////////////////
  // Clean transpiled files
  ///////////////////////////////////////////////
  var cleanConfig = {
    clean: [
      'css/pre/*.css'
    ]
  };
  merge(cleanConfig, config);


  ///////////////////////////////////////////////
  // Clean transpiled files
  ///////////////////////////////////////////////
  var browserifyConfig = {
    browserify: {
       main: {
          options: {
            watch: true,
            keepAlive: false,
            transform: [
              ['babelify', {presets: ['es2015', 'react']}]
            ]
          },
          files: {
             "dist/js/main.js": ["js/main.js"]
          }
       }
    }
  };
  merge(browserifyConfig, config);


  ///////////////////////////////////////////////
  // Conditional for Uglification
  ///////////////////////////////////////////////
  var uglifyConfig = {
    uglify: {
      dist: {
        files: [{
          expand: true,
          src: '**/*.js',
          dest: 'dist/js',
          cwd: 'dist/js'
        }]
      }
    }
  };
  merge(uglifyConfig, config); // Add the uglify configuration.


  var browserSyncConfig = {
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            // Livereload when any of these files change:
            'dist/css/**/*.css',      // compiled CSS
            'dist/js/**/*.js',        // concatenated/minified JS
            '**/*.html',              // any HTML files
            '**/*.php'                // any PHP files
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
  merge(browserSyncConfig, config);


  ///////////////////////////////////////////////
  // Includes Conditional for PostCSS in prod.
  ///////////////////////////////////////////////
  var postCSSConfig = {
    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('autoprefixer')({browsers: ['last 2 versions'] }), // add vendor prefixes
          require('postcss-flexbugs-fixes')(),
        ]
      },
      dist: {
        expand: true,
        flatten: true,
        src: ['css/pre/*.css'],
        dest: 'dist/css/',
        ext: '.css'
      }
    }
  };
  if(process.env.NODE_ENV == 'production'){
    postCSSConfig.postcss.options.processors.push(
      require('cssnano')()
    )
  }
  merge(postCSSConfig, config);


  ///////////////////////////////////////////////
  // Where we tell Grunt we plan to use
  // the plug-ins configured above
  ///////////////////////////////////////////////
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');


  // Initialize the Grunt configuration
  grunt.initConfig(config);

  grunt.registerTask('default', defaultTasks);
  grunt.registerTask('dev', watchTasks);
};
