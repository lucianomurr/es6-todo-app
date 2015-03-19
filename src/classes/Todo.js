export class Todo {


  constructor(itemId, label, datetime, completed = false) {

    this.todoItem = {
      'itemId': itemId,
      'label': label,
      'datetime': datetime,
      'completed': completed
    };

  }

}