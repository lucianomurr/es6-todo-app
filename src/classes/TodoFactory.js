import {Todo} from './Todo.js';
/**
 * 
 */


export class TodoFactory extends Todo {


  constructor($rootScope, StorageService) {
    super();
    TodoFactory.StorageService = StorageService;
    TodoFactory.rootScope = $rootScope;
    TodoFactory.todoItems = [];
    TodoFactory.listItems = new WeakMap();
  }

  /**
   * set item to completed to true
   * @return {[type]} [description]
   */
  complete(itemId) {
    console.log('ToDo: complete index: ', itemId);

    // ES 5
    // var index = _.findIndex(TodoFactory.listItems, function (item) {
    //   return item.itemId == itemId;
    // });
    // TodoFactory.listItems[index].completed = true;

    //ES 6
    TodoFactory.listItems.get(itemId).completed = true;

    TodoFactory.save();

  }

  /**
   * add new item to database
   * @param {[type]} list [description]
   */
  addNew(detail) {

    let todoItemLabelNew = detail.trim();

    if (!todoItemLabelNew.length) {
      return false;
    }
    var _item = new Todo(moment().format('x'), todoItemLabelNew, moment().format('LLL'));

    console.log('Add new item: ',_item.todoItem);
    TodoFactory.listItems.set(_item.todoItem.itemId, _item.todoItem);
    
    TodoFactory.save();

    return true;

  }

  /**
   * save _listIitems to database
   * @return {[type]} [description]
   */
  static save() {

    let itemToSave = Array.from(TodoFactory.listItems.entries());
    itemToSave = JSON.stringify(itemToSave);

    if (TodoFactory.StorageService.set(itemToSave)){
      TodoFactory.rootScope.$emit('added_new_item');
      
      TodoFactory.todoItems = Array.from(TodoFactory.listItems);

      console.log('added_new_item fired', TodoFactory.todoItems);
    }

  }



  /**
   * remove item from database
   * @return {[type]} [description]
   */
  remove(itemIndex) {

    console.log('ToDo: remove index: ', itemIndex);

    // ES 5
    // _.remove(TodoFactory.listItems, function (n) {
    //   if (n.itemId === itemIndex) {
    //     return true;
    //   }
    // });
    
    // ES 6 
    TodoFactory.listItems.delete(itemIndex);
    TodoFactory.save();

  }

  /**
   * get list of items from database
   * @return {[type]} [description]
   */
  get() {

    return new Promise( function(success) {

      TodoFactory.StorageService.get().then(function (value) {
          
          TodoFactory.listItems = new Map(JSON.parse(value));
          TodoFactory.todoItems = Array.from(TodoFactory.listItems);
          console.log('Factory: todoItems data: ', TodoFactory.todoItems);
          success(TodoFactory.todoItems);

      });

    });

  }

}