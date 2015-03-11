class TodoListNewCtrl {
  constructor($rootScope, $scope, $mdBottomSheet, TodoService){
    
    $scope.saved = false;
    $scope.todoItemLabelNew = '';

    $scope.saveItem = TodoService.addNew;

    $rootScope.$on('added_new_item', function(){
      console.log('added_new_item intercepted');
      $mdBottomSheet.hide();
    });

  }

}
TodoListNewCtrl.$inject = ['$rootScope','$scope', '$mdBottomSheet', 'TodoService'];
export {TodoListNewCtrl};


