import {StorageService} from './classes/StorageService.js';
import {TodoFactory} from './classes/TodoFactory.js';
import {TodoListCtrl} from './classes/TodoListCtrl.js';
import {TodoListNewCtrl} from './classes/TodoListNewCtrl.js';

angular.module('es6App', ['ngRoute', 'ngMaterial']);

angular.module('es6App').config(['$routeProvider', '$mdThemingProvider',
  function ($routeProvider, $mdThemingProvider) {

    $routeProvider.
    when('/list', {
      templateUrl: 'views/todo-list.html',
      controller: 'TodoListCtrl'
    }).
    when('/list/:itemId', {
      templateUrl: 'views/todo-item-detail.html',
      controller: 'TodoDetailCtrl'
    }).
    otherwise({
      redirectTo: '/list'
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('teal', {
        'default': '400', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('lime', {
        'default': '200' // use shade 200 for default, and keep all other shades the same
      });
  }
]);


angular.module('es6App')
  .service('StorageService', StorageService)
  .factory('TodoFactory', ['$rootScope','StorageService',($rootScope, Storageservice) => new TodoFactory($rootScope, Storageservice)])
  .controller('TodoListCtrl', TodoListCtrl)
  .controller('TodoListNewCtrl', TodoListNewCtrl);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['es6App']);
});
