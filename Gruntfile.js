module.exports = function(grunt) {

	'use strict';

	var

		packageFile = 'package.json',

		data = grunt.file.readJSON(packageFile),

		jQueryData = grunt.file.readJSON(data.name + '.jquery.json'),

		uglifyFiles = {};

	uglifyFiles[data.name + '.min.js'] = data.name + '.js';

	grunt.config.init({
		uglify : {
			dist : {
				files : uglifyFiles,
				options : {
					banner : '/* ' + jQueryData.title + ' ' + jQueryData.version + ' - http://plugins.jquery.com/' + jQueryData.name + '/' + jQueryData.version + ' */\n;'
				}
			}
		},
		jshint : {
			dist : {
				src : [data.name + '.js'],
				options : {
					camelcase : true,
					immed : true,
					indent : true,
					latedef : true,
					newcap : true,
					noarg : true,
					noempty : true,
					quotmark : true,
					undef : true,
					unused : true,
					strict : true,
					trailing : true,
					browser: true,
					globals : {
						jQuery : true
					}
				}
			}
		},
		qunit : {
			dist : {
				options : {
					urls : [data.name + '.test.html']
				}
			}
		},
		watch : {
			dist : {
				files : [data.name + '.js', packageFile],
				tasks : ['uglify:dist', 'jshint:dist', 'qunit:dist']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify:dist', 'jshint:dist', 'qunit:dist']);
};