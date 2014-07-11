module.exports = function(grunt) {
	//  All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
					'js/vendor/*.js',
					'js/scripts.js'
				],
				dest: 'js/build/main.js',
			}
		},
		uglify: {
			build: {
				src: 'js/build/main.js',
				dest: 'js/main.min.js'
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/'
				}]
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/styles.min.css': 'css/styles.scss'
				}
			}
		},
		watch: {
		 options: {
			livereload: true,
		},
		scripts: {
			files: ['js/*.js'],
			tasks: ['concat', 'uglify'],
			options: {
				spawn: false,
			},
		},
		css: {
			files: ['css/*.scss'],
			tasks: ['sass'],
			options: {
				spawn: false,
			}
		}
	}
	});

	//  Where we tell Grunt we plan to use the plug-ins configured above
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');


	// What will initialize when we type "grunt" into the terminal. "grunt watch" will run all of these continually 
	grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass']);

};
