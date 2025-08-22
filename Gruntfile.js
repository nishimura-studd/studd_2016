module.exports = function(grunt) {

    grunt.file.expand({cwd: 'node_modules'}, 'grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

      requirejs: {
        main: {
          options: {
              appDir: './assets/js',
              baseUrl: './',
              mainConfigFile: './assets/js/common.js',
              optimize: 'uglify2',
              dir: './assets/js_deploy',                  
              modules:[
                      { name: 'index' }
              ]
          }
        }           
      },
      clean: {
        main: {
          options: {
              force: true
          },
          src: [
                 './assets/js_deploy/top/'          
                ,'./assets/js_deploy/build.txt'
                ,'./assets/js_deploy/request.js'
              ]    
        }        
      },

      image: {
        dynamic: {
          files: [{
            expand: true,
            cwd: './assets/img/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: './assets/img/'
          }]
        }
      }  
          
    });

    grunt.registerTask('min',     ['imagemin']);  
    grunt.registerTask('default', ['requirejs', 'clean']);      
};
