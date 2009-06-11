(function(){
  
  // Taken from http://github.com/markevans/jquery-objectify
  // See the README for usage instructions

  $.objectify = function(name, opts){
    
    // '..._vars' correspond to both methods and attributes
    
    var instance_vars  = opts.instance  || {};
    var prototype_vars = opts.prototype || {};
    var code_block     = opts.init      || function(){};

    // Add the 'transmit' method to the prototype
    prototype_vars.transmit = function(event_name){
      $().trigger(name+'.'+event_name, this);
    };

    // Define class with prototype methods and attributes
    var klass = function(){};
    $.extend(klass.prototype, prototype_vars);

    // Define the plugin
    $.fn[name] = function(){
    
      var n = $(this).length; // Number of elements matching selector
    
      $(this).each(function(i){
        var elem = this;
        
        // Instantiate the object and add instance methods/attributes to it
        var obj = new klass();
        $.extend(obj, instance_vars);
        
        obj.elem = elem; // Make the elem available for use in object methods via 'this.elem'
        elem.obj = obj;  // Make the obj available for use in jquery methods via 'this.obj'

        code_block.call(obj, i, n);

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