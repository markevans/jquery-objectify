(function(){
  
  // objectify defines a new jquery 'plugin' method using the name passed in
  //
  // e.g. $.objectify('hello', ...) is equivalent to
  //      $.fn.hello = function(){ ... }
  //
  // However it also defines a class (i.e. function), and when $('some_selector').hello() is called,
  // instantiates objects of that class and 'attaches' one to each of the selected elements
  //
  // The arguments passed to this method define the behaviour of the class, as in this example:
  //
  // $.objectify('hello',{
  //   instance: { colour: red },                                                            // instance methods/attributes of the class
  //   prototype: { display: function(){ alert('hello'); } },                                // prototype methods/attributes of the class
  //   init: function(i, obj, elem){ ...do stuff as you would with a normal plugin...},      // what the plugin actually does
  // })
  //
  //
  $.objectify = function(name, opts){
    
    // '..._vars' correspond to both methods and attributes
    
    var instance_vars  = opts.instance  || {};
    var prototype_vars = opts.prototype || {};
    var code_block     = opts.init      || function(){};

    // Define class with prototype methods and attributes
    var klass = function(){};
    $.extend(klass.prototype, prototype_vars);

    // Define the plugin
    $.fn[name] = function(){
    
      var n = $(this).length; // Number of elements matching selector
    
      $(this).each(function(i){
        var elem = this;
        var obj  = new klass();
        
        // Instantiate the object and add instance methods/attributes to it
        var obj = new klass();
        $.extend(obj, instance_vars);
        
        obj.elem = elem; // Make the elem available for use in object methods via 'this.elem'
        elem.obj = obj;  // Make the obj available for use in jquery methods via 'this.obj'

        code_block(elem, obj, i, n);

      });
    
      return $(this);
    }
  
  }

})(jQuery);