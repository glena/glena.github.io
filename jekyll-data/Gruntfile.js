
module.exports = function(grunt) {

  grunt.initConfig({
    jekyll: {                             // Task
      options: {                          // Universal options
          //bundleExec: true,
          src : './jekyll-data'
      },
      dist: {                             // Target
        options: {                        // Target options
          watch: true,
          serve: true,
          doctor: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('default', ['jshint', 'jekyll']);
  
};