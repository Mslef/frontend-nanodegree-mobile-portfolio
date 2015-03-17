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
          name: 'small',
          width: '100px',
          quality: 65
        }]
      },
      files: [{
        expand: true,
        src: ['*.{gif,jpg,png}'],
        cwd: 'img/demoPics/',
        dest: 'img/build/'
      }]
    }
   },
   //TODO: add autoprefixer for legacy browsers

   //Minimizing main CSS and JS
    cssmin: {
        css: {
            src: 'css/style.css',
            dest: 'css/style.min.css'
        }
    },
    uglify: {
        js: {
            files: {
                'js/perfmatters.min.js': ['js/perfmatters.js']
            }
        }
    },

    //Testing webpage against Google pagespeed insights using ngrok
    pagespeed: { 
      options: { 
        nokey: true, 
        locale: 'en_GB', 
        threshold: 40 }, 
      local: { 
        options: { 
          strategy: 'desktop' }
      }, 
      mobile: { 
        options: { 
          strategy: 'mobile' } 
        } 
      },

    //Watch for changes in the images folder, JS or CSS files
     watch: {
      css:{
        files: ['css/*'],
      tasks: ['cssmin','psi-ngrok']
    },
    js:{
          files: ['js/*'],
          tasks: ['uglify', 'psi-ngrok']
    },
    img:{
          files: ['img/*'],
          tasks: ['responsive_images', 'psi-ngrok']
    }
  }
  });

  //funtion pulled from http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() { 
    var done = this.async(); 
    var port = 8080;
    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    }); 
  });
  
  grunt.registerTask('default', ['responsive_images', 'cssmin:css', 'uglify:js', 'psi-ngrok']);

};