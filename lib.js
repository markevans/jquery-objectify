;(function(){

//////// Square ////////

$.objectify('square', {
  instance: {
    count: 0,
    counter_interval_id: 0
  },
  prototype: {
    colourBlue: function(){
      $(this.elem).css({'background-color': 'blue'});
    },
    nextCount: function(){
      this.count++
      $(this.elem).html(this.count);
      if(this.count == 5){
        clearInterval(this.counter_interval_id);
        $().trigger('square.finished_counting', [this]);
      }
    },
    countToFive: function(){
      $().trigger('square.starting_to_count', [this]);
      var self = this;
      this.counter_interval_id = setInterval(function(){ self.nextCount() }, 1000);
    }
  },
  init: function(elem, obj, i, n){
    obj.num = i;
    $(elem).click(function(){ obj.countToFive() })
  }
});

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