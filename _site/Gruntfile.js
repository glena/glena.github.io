
module.exports = function(grunt) {

  grunt.initConfig({

    uglify: {

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

    ,'json-minify': {
      build: {
        files: 'jekyll-data/_site/assets/data/resume.json'
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
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-json-minify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', [
    'jshint',
    'uglify',
    'cssmin',
    'jekyll',
    'copy:bootstrap',
    'json-minify',
    'clean:build',
    'clean:oldbuild',
    'copy:deploy',
    'clean:cleanbuild'
  ]);

  grunt.registerTask('gen', [
    'jekyll',
    'clean:build',
    'clean:oldbuild',
    'copy:deploy',
    'clean:cleanbuild'
  ]);

};
