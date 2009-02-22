;(function(){

//////// Square ////////

var Square = function(dom_elem){
  this.dom_elem = dom_elem;
  this.i = 0;
  this.counter_interval_id = 0;
};
Square.prototype = {
  
  nextCount: function(){
    this.i++
    $(this.dom_elem).html(this.i);
    if(this.i == 5){
      clearInterval(this.counter_interval_id);
      $().trigger('square.finished_counting', [this]);
    }
  },
  
  countToFive: function(){
    $().trigger('square.starting_to_count', [this]);
    var self = this;
    this.counter_interval_id = setInterval(function(){ self.nextCount() }, 1000);
  },
  
  colourBlue: function(){
    $(this.dom_elem).css({'background-color': 'blue'});
  },

};
$.fn.square = function(){
  $(this).each(function(i){
    
    // Do stuff
    var square = new Square(this);
    square.num = i;
    
    // Public interface
    $(this).bind('click',       function(){ square.countToFive() })
           .bind('colour_blue', function(){ square.colourBlue()  })

  });
}


//////// Message Box ////////

var MessageBox = function(dom_elem){
  this.dom_elem = dom_elem;
};
MessageBox.prototype = {
  display: function(message){
    $(this.dom_elem).html(message);
  }
};
$.fn.messageBox = function(){
  // Do stuff
  var message_box = new MessageBox(this);
  
  // Public interface
  $(this).bind('display', function(e, message){ message_box.display(message) });
}

})(jQuery);