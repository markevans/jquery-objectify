;(function(){

  //////// Message Box ////////
  $.objectify('messageBox', {
    display: function(message){
      this.jElem().html(message);
    }
  });

  //////// Square ////////

  $.objectify('square', {
    nextCount: function(){
      this.count++;
      this.jElem().html(this.count);
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
      this.counter_interval_id = setInterval(function(){ self.nextCount(); }, 400);
    },
    colour: function(clr){
      this.jElem().css({'background-color': clr});
    },
    init: function(){
      var self = this;
      this.num = this.meta.obj_index;
      this.count = 0;
      $(self.elem).click(function(){ self.countToFive(); });
    }
  });
  
  ////// Clock ///////
  $.objectify('clock',{
    start: function(){
      var self = this;
      this.interval_id = window.setInterval(function(){self.incrementTime();}, 1000);
    },
    stop: function(){
      window.clearInterval(this.interval_id);
    },
    set: function(hours, minutes, seconds){
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      this.updateDisplay();
    },
    incrementTime: function(){
      if(this.seconds < 59){
        this.seconds += 1;
      } else if (this.minutes < 59){
        this.minutes += 1;
        this.seconds = 0;
      } else if (this.hours < 12) {
        this.hours += 1;
        this.minutes = 0;
        this.seconds = 0;
      } else {
        this.hours = 1;
        this.minutes = 0;
        this.seconds = 0;
      }
      this.updateDisplay();
    },
    updateDisplay: function(){
      this.jElem().find('.js_hours').html(this.hours).end().
                 find('.js_minutes').html(this.minutes).end().
                 find('.js_seconds').html(this.seconds);
    },
    seconds: 33,
    init: function(start_hour, start_minutes){
      this.hours = start_hour;
      this.minutes = start_minutes;
      this.start();
    }
  });

})(jQuery);