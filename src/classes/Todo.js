class Todo{


   /**
    * define class default item
    * @return {[type]} [description]
    */
   constructor(itemId,label,datetime,completed = false){
      
      this.todoItem = {
         'itemId': itemId,
         'label': label,
         'datetime': datetime,
         'completed': completed
      };

   }

}

export {Todo};