
module.exports = function(grunt) {

  grunt.initConfig({

    jekyll: {   
                              // Task
      options: {                          // Universal options
          //bundleExec: true,
          src : './jekyll-data'
      },
      dist: {                             // Target
        options: {                        // Target options
          watch: true,
          doctor: true
        }
      }

    }

    , uglify: {

      resume: {
        files: {
          'assets/js/resume.all.min.js': [
            'assets/js/vendor/d3.v3.min.js',
            'assets/js/vendor/sha1.js',
            'assets/js/resume.js'
          ]
        }
      }

      ,base: {
        files: {
          'assets/js/base.min.js': [
            'assets/js/vendor/jquery-1.11.0.min.js',
            'assets/bootstrap/js/bootstrap.min.js'
          ]
        }
      }

      ,mine: {
        files: {
          'assets/js/main.min.js': 'assets/js/main.js'
        }
      }

    }

    ,cssmin: {
      combine: {
        files: {
          'assets/css/all.min.css': [
            'assets/bootstrap/css/bootstrap.min.css', 
            'assets/css/normalize.css',
            'assets/css/animate.css',
            'assets/css/main.css'
          ]
        }
      }
    }

    ,jshint: {
      all: [
        'assets/js/main.js'
      ]
    }
    
    , copy: {
      bootstrap: {
        files: [
          {expand: true, cwd: 'assets/bootstrap/fonts/', src: ['**'], dest: '_site/assets/fonts/'},
        ]
      },
      deploy: {
        files: [
          {expand: true, cwd: '_site/', src: ['**'], dest: '..'},
        ]
      }
    }

    ,clean: {
      /*oldbuild: {
        src:[
          '../assets/',
          '../home/',
          '../404.html',
          '../crossdomain.xml',
          '../favicon.ico',
          '../index.html',
          '../robots.txt'
        ]
      },*/
      build: {
        src: [
          "_site/node_modules/", 
          "_site/assets/bootstrap/", 
          "_site/assets/css/animate.css", 
          "_site/assets/css/main.css", 
          "_site/assets/css/normalize.css", 
          "_site/assets/js/vendor/", 
          "_site/assets/js/main.js", 
          "_site/assets/js/resume.js", 
          "_site/package.json",
          "_site/Gruntfile.js",
          "_site/bower.json"
        ]
      },
      cleanbuild: {
        src: [
          "_site/", 
        ]
      }
    }
    


  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'jekyll', 'copy:bootstrap', 'clean:build', 'copy:deploy', 'clean:cleanbuild']);
  
};