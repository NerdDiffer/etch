module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    recess: {
      options: {
        noIDs: false
      },
      lint: {
        src: 'dev/less/*.less'
      },
      lintCompile: {
        options: {
          compile: true
        },
        files: {
          'pub/styles/styles.css': 'dev/less/*.less' 
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'package.json', 'dev/js/*.js'],
      dev: {
        src: ['dev/js/*.js']
      },
      runner: {
        src: ['Gruntfile.js', 'package.json'] 
      }
    },
    concat: {
      options: {

      },
      generate: {
        files: {
          'pub/js/generate.js': 'dev/js/generate.js'
        }
      },
      input: {
        files: {
          'pub/js/input.js': 'dev/js/input.js'
        }
      }
    },
    watch: {
      recess: {
        files: 'dev/less/*.less',
        tasks: 'recess:lintCompile'
      }, 
      generate: {
        files: 'dev/js/generate.js',
        tasks: 'concat:generate' 
      }, 
      input: {
        files: 'dev/js/input.js',
        tasks: 'concat:input'
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // tasks
  grunt.registerTask('default', 'watch');
  grunt.registerTask('test', 'recess:lint', 'jshint:dev');
};
