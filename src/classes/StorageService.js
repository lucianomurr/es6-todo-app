export class StorageService {

   constructor(){
      this.APP_STORAGE_KEY = 'es6App';      
   }
    
    get () {
      var jsonData = localStorage.getItem(this.APP_STORAGE_KEY) || '[]';
      if (jsonData !== 'undefined'){
         return JSON.parse(jsonData);
      } else {
         return '';
      }
    }

    set(list){
      localStorage.setItem(this.APP_STORAGE_KEY, JSON.stringify(list));
    }

}
// export {StorageService};