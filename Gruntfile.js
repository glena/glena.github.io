
module.exports = function(grunt) {

  grunt.initConfig({

    jekyll: {   
      
      options: {                          
          src : './jekyll-data',
          dest : './jekyll-data/_site'
      },
      dist: {                             
        options: {}
      }

    }

    , uglify: {

      resume: {
        files: {
          'jekyll-data/assets/js/resume.all.min.js': [
            'jekyll-data/assets/js/vendor/d3.v3.min.js',
            'jekyll-data/assets/js/vendor/sha1.js',
            'jekyll-data/assets/js/resume.js'
          ]
        }
      }

      ,base: {
        files: {
          'jekyll-data/assets/js/base.min.js': [
            'jekyll-data/assets/js/vendor/jquery-1.11.0.min.js',
            'jekyll-data/assets/bootstrap/js/bootstrap.min.js'
          ]
        }
      }

      ,mine: {
        files: {
          'jekyll-data/assets/js/main.min.js': 'jekyll-data/assets/js/main.js'
        }
      }

    }

    ,cssmin: {
      combine: {
        files: {
          'jekyll-data/assets/css/all.min.css': [
            'jekyll-data/assets/bootstrap/css/bootstrap.min.css', 
            'jekyll-data/assets/css/normalize.css',
            'jekyll-data/assets/css/animate.css',
            'jekyll-data/assets/css/main.css'
          ]
        }
      }
    }

    ,jshint: {
      all: [
        'jekyll-data/assets/js/main.js'
      ]
    }
    
    , copy: {
      bootstrap: {
        files: [
          {expand: true, cwd: 'jekyll-data/assets/bootstrap/fonts/', src: ['**'], dest: 'jekyll-data/_site/assets/fonts/'},
        ]
      },
      deploy: {
        files: [
          {expand: true, cwd: 'jekyll-data/_site/', src: ['**','*'], dest: '.'},
        ]
      }
    }

    ,clean: {
      oldbuild: {
        src:[
          'assets/',
          'home/',
          '404.html',
          'crossdomain.xml',
          'favicon.ico',
          'index.html',
          'robots.txt'
        ]
      },
      build: {
        src: [
          "jekyll-data/_site/node_modules/", 
          "jekyll-data/_site/assets/bootstrap/", 
          "jekyll-data/_site/assets/css/animate.css", 
          "jekyll-data/_site/assets/css/main.css", 
          "jekyll-data/_site/assets/css/normalize.css", 
          "jekyll-data/_site/assets/js/vendor/", 
          "jekyll-data/_site/assets/js/main.js", 
          "jekyll-data/_site/assets/js/resume.js", 
          "jekyll-data/_site/package.json",
          "jekyll-data/_site/Gruntfile.js",
          "jekyll-data/_site/bower.json"
        ]
      },
      cleanbuild: {
        src: [
          "jekyll-data/_site/", 
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

  grunt.registerTask('build', [
    'jshint', 
    'uglify', 
    'cssmin', 
    'jekyll', 
    'copy:bootstrap', 
    'clean:build', 
    'clean:oldbuild', 
    'copy:deploy', 
    'clean:cleanbuild'
  ]);
  
};