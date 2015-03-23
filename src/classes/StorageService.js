var APP_STORAGE_KEY = '',
_$timeout,
_$log;

export class StorageService {

  constructor($timeout, $log) {
    APP_STORAGE_KEY = 'es6App';
    _$timeout = $timeout;
    _$log = $log;
  }

  get() {
 
    return new Promise(function(success){

      let jsonData = localStorage.getItem(APP_STORAGE_KEY);

      _$log.debug('Service: get stored item!', jsonData);

      if (!JSON.parse(jsonData)){
        jsonData = new Map();
      }
      
      success(jsonData);

    });


  }

  set(list) {
    if (JSON.parse(list)){
      localStorage.setItem(APP_STORAGE_KEY, list);
      return true;
    }
    return false;
  }

}

StorageService.$inject = ['$timeout', '$log'];