class TodoListCtrl {
  constructor($scope, $mdBottomSheet, TodoService){
    
    $scope.list = TodoService.get();
    $scope.complete = TodoService.complete;
    $scope.remove = TodoService.remove;

    $scope.showAddNewTask = function($event) {
      $scope.alert = '';
      $mdBottomSheet.show({
        templateUrl: 'views/todo-add-new.html',
        controller: 'TodoListNewCtrl',
        targetEvent: $event
      }).then(function(clickedItem) {
        $scope.alert = clickedItem.name + ' clicked!';
      });
    };

  }

}

TodoListCtrl.$inject = ['$scope', '$mdBottomSheet', 'TodoService'];

export {TodoListCtrl};
