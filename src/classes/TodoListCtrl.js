export class TodoListCtrl {
  constructor($rootScope, $scope, $mdDialog, TodoFactory) {

    $scope.list = TodoFactory.todoItems;

    $scope.complete = TodoFactory.complete;

    $scope.remove = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Attenzione!')
        .content('Sicuro di voler eliminare il task selezionato?.')
        .ariaLabel('Sicuro di voler eliminare il task selezionato?')
        .ok(' Si ')
        .cancel(' No ')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        TodoFactory.remove(ev);
      }, function() {
        return false;
      });
    };

    $scope.showAddNewTask = function($event) {
      $scope.alert = '';
      $mdDialog.show({
        templateUrl: 'views/todo-add-new.html',
        controller: 'TodoListNewCtrl',
        targetEvent: $event
      });
    };

     TodoFactory.get().then(function(value){
       console.log('Value is ready: '+value);
       $scope.list = value;
       $scope.$apply();
     });

     $rootScope.$on('added_new_item', function () {
       TodoFactory.get().then(function (value) {
         console.log('Value is ready: ' + value);
         $scope.list = value;
       });
     });

  }

}

TodoListCtrl.$inject = ['$rootScope','$scope', '$mdDialog', 'TodoFactory'];