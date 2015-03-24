export class TodoListCtrl {
  constructor($rootScope, $scope, $mdDialog, TodoService) {

    var vm = this;
    vm.list = TodoService.todoItems;

    vm.complete = TodoService.complete;

    vm.remove = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Attenzione!')
        .content('Sicuro di voler eliminare il task selezionato?.')
        .ariaLabel('Sicuro di voler eliminare il task selezionato?')
        .ok(' Si ')
        .cancel(' No ')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        TodoService.remove(ev);
      }, function() {
        return false;
      });
    };

    vm.showAddNewTask = function($event) {
      vm.alert = '';
      $mdDialog.show({
        templateUrl: 'views/todo-add-new.html',
        controller: 'TodoListNewCtrl',
        targetEvent: $event
      });
    };

     TodoService.get().then(function(value){

      vm.list = TodoService.getTodo();
      $scope.$apply();
     });

     $rootScope.$on('itemlist.changed', function () {
       TodoService.get().then(function (value) {
         console.log('Value is ready: ' + value);
         vm.list = TodoService.getTodo();
         $scope.$apply();
       });
     });

  }

}

TodoListCtrl.$inject = ['$rootScope','$scope', '$mdDialog', 'TodoService'];