export class TodoListNewCtrl {
  
  constructor($rootScope, $scope, $mdDialog, TodoService) {

    $scope.saved = false;
    $scope.todoItemLabelNew = '';

    $scope.saveItem = TodoService.addNew;

    $rootScope.$on('itemlist.changed', function () {
      $mdDialog.hide();
    });

  }

}
TodoListNewCtrl.$inject = ['$rootScope', '$scope', '$mdDialog', 'TodoService'];