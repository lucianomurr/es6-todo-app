class TodoListCtrl {
  constructor($scope, $mdDialog, TodoService) {

    $scope.list = TodoService.get();
    $scope.complete = TodoService.complete;

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
        TodoService.remove(ev);
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

  }

}

TodoListCtrl.$inject = ['$scope', '$mdDialog', 'TodoService'];

export {
  TodoListCtrl
};