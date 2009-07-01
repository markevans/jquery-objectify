(function(){
  
  // Taken from http://github.com/markevans/jquery-objectify
  // See the README for usage instructions

  $.objectify = function(name, opts){
    
    // 'prototype_vars' correspond to both methods and attributes
    var prototype_vars = opts || {};

    // Add the 'transmit' method to the prototype
    prototype_vars.transmit = function(event_name){
      $().trigger(name+'.'+event_name, this);
    };

    // Define class with prototype methods and attributes
    var klass = function(){};
    $.extend(klass.prototype, prototype_vars);

    // Define the plugin
    $.fn[name] = function(){
    
      var selector = $(this).selector;
      var n = $(this).length; // Number of elements matching selector
      var args = arguments;
    
      $(this).each(function(i){
        // Instantiate the object and add instance methods/attributes to it
        var obj = new klass();
        
        obj.elem = this; // Make the elem available for use in object methods via 'this.elem'
        this.obj = obj;  // Make the obj available for use in jquery methods via 'this.obj'

        // Add some useful meta-data to the object
        obj.meta = {
          obj_index: i,
          total_objs: n,
          selector: selector
        };

        // Call the init function if it exists
        if(obj.init) obj.init.apply(obj, args);
      });
    
      return $(this);
    };
  
  };

  // Connect is a thin wrapper around bind for global events
  $.connect = function(global_event, selector, func){
    $().bind(global_event, function(){
      var obj = arguments[1];
      $(selector).each(function(){
        func.call(this, obj, this.obj);
      });
    });
  };

})(jQuery);