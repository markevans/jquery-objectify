;(function(){

  //////// Square ////////

  $.objectify('square', {
    instance: {
      count: 0,
      counter_interval_id: 0
    },
    prototype: {
      nextCount: function(){
        this.count++
        $(this.elem).html(this.count);
        if(this.count == 5){
          clearInterval(this.counter_interval_id);
          this.colour('green');
          this.transmit('finished_counting');
        }
      },
      countToFive: function(){
        this.transmit('starting_to_count');
        this.colour('yellow');
        var self = this;
        this.counter_interval_id = setInterval(function(){ self.nextCount() }, 1000);
      },
      colour: function(clr){
        $(this.elem).css({'background-color': clr});
      }
    },
    init: function(elem, obj, i, n){
      obj.num = i;
      $(elem).click(function(){ obj.countToFive() })
    }
  });

})(jQuery);