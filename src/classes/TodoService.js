import {Todo} from './Todo.js';
/**
 * 
 */

var _StorageService = {}, 
  _listItems = [],
  _rootScope = {};

class TodoService extends Todo{


   constructor($rootScope, StorageService){
      super();
      _StorageService = StorageService;
      _rootScope = $rootScope;
   }

   /**
    * set item to completed to true
    * @return {[type]} [description]
    */
   complete (itemId) {
      console.log('ToDo: complete index: ', itemId);

      var index = _.findIndex(_listItems, function(item) {
        return item.itemId == itemId;
      });

      _listItems[index].completed = true;
      _StorageService.set(_listItems);

   }

   /**
    * add new item to database
    * @param {[type]} list [description]
    */
   addNew(detail){
      
      let todoItemLabelNew = detail.trim();

      if (!todoItemLabelNew.length){
        return false;
      }
      var _item = new Todo(moment().format('x'), todoItemLabelNew, moment().format('LLL'));

      console.log(_item.todoItem);
      _listItems.push(_item.todoItem);
      _StorageService.set(_listItems);
      
      _rootScope.$emit('added_new_item');
      console.log('added_new_item fired');

      return true;

   }

   /**
    * remove item from database
    * @return {[type]} [description]
    */
   remove(itemIndex){

      console.log('ToDo: remove index: ', itemIndex);

      _.remove(_listItems, function(n){
        if (n.itemId === itemIndex){
          return true;
        }
      });

      _StorageService.set(_listItems);

   }


   /**
    * get list of items from database
    * @return {[type]} [description]
    */
   get(){
      return _listItems =  _StorageService.get();
   }

}

TodoService.$inject = ['$rootScope','StorageService'];

export {TodoService};
