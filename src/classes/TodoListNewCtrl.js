export class TodoListNewCtrl {
  
  constructor($rootScope, $scope, $mdDialog, TodoFactory) {

    $scope.saved = false;
    $scope.todoItemLabelNew = '';

    $scope.saveItem = TodoFactory.addNew;

    $rootScope.$on('added_new_item', function () {
      console.log('added_new_item intercepted');
      $mdDialog.hide();
    });

  }

}
TodoListNewCtrl.$inject = ['$rootScope', '$scope', '$mdDialog', 'TodoFactory'];