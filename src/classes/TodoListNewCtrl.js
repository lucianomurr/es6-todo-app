class TodoListNewCtrl {
  constructor($rootScope, $scope, $mdDialog, TodoService) {

    $scope.saved = false;
    $scope.todoItemLabelNew = '';

    $scope.saveItem = TodoService.addNew;

    $rootScope.$on('added_new_item', function() {
      console.log('added_new_item intercepted');
      $mdDialog.hide();
    });

  }

}
TodoListNewCtrl.$inject = ['$rootScope', '$scope', '$mdDialog', 'TodoService'];
export {
  TodoListNewCtrl
};