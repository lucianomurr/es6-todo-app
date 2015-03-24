import {Todo} from './Todo.js';
/**
 * 
 */

var StorageService = new WeakMap(),
  rootScope = new WeakMap(),
  listItems = new WeakMap();

export class TodoService extends Todo {


  constructor($rootScope, $StorageService) {
    super();
    StorageService = $StorageService;
    rootScope = $rootScope;
    TodoService.itemsList = [];
  }

  /**
   * set item to completed to true
   * @return {[type]} [description]
   */
  complete(itemId) {
    console.log('ToDo: complete index: ', itemId);

    // ES 5
    // var index = _.findIndex(listItems, function (item) {
    //   return item.itemId == itemId;
    // });
    // listItems[index].completed = true;

    //ES 6
    listItems.get(itemId).completed = true;

    TodoService.save();

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
    listItems.set(_item.todoItem.itemId, _item.todoItem);
    
    TodoService.save();

    return true;

  }

  /**
   * save _listIitems to database
   * @return {[type]} [description]
   */
  static save() {

    let itemToSave = Array.from(listItems.entries());
    itemToSave = JSON.stringify(itemToSave);

    if (StorageService.set(itemToSave)){
      
      rootScope.$emit('itemlist.changed');
      
    }

  }


  /**
   * remove item from database
   * @return {[type]} [description]
   */
  remove(itemIndex) {

    console.log('ToDo: remove index: ', itemIndex);

    // ES 5
    // _.remove(listItems, function (n) {
    //   if (n.itemId === itemIndex) {
    //     return true;
    //   }
    // });
    
    // ES 6 
    listItems.delete(itemIndex);
    TodoService.save();

  }

  /**
   * get list of items from database
   * @return {[type]} [description]
   */
  get() {

    return StorageService.get().then(function (value) {
          
        console.log('Get todoItems data: ', value);
        listItems = new Map(JSON.parse(value));
        TodoService.itemsList = Array.from(listItems);

    });

  }

  getTodo(){
    return Array.from(listItems);
  }

}

TodoService.$inject = ['$rootScope', 'StorageService'];