var ngrok = require("ngrok");

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Resizing all images and compressing them
    responsive_images: {
    dev: {
      options: {
        engine: 'gm',
        sizes: [{
          name: 'large',
          width: '600px',
          quality: 70
        }]
      },
      files: [{
        expand: true,
        src: ['*.{gif,jpg,png}'],
        cwd: 'images/',
        dest: 'images/build/'
      }]
    }
   },
   //TODO: add autoprefixer for legacy browsers

   //Minimizing main CSS and JS
    cssmin: {
        css: {
            src: 'css/style.css',
            dest: 'css/style.min.css'
        }, bootstrap: {
            src: 'css/bootstrap-grid.css',
            dest: 'css/bootstrap-grid.min.css'
        }   
    },
    uglify: {
        js: {
            files: {
                'js/main.min.js': ['js/main.js']
            }
        }
    },

   
    //Watch for changes in the images folder, JS or CSS files
     watch: {
      css:{
        files: ['css/*'],
      tasks: ['cssmin']
    },
    js:{
          files: ['js/*'],
          tasks: ['uglify']
    },
    img:{
          files: ['img/*'],
          tasks: ['responsive_images']
    }
  }
  });

  
  grunt.registerTask('default', ['responsive_images', 'cssmin:css', 'uglify:js']);

};