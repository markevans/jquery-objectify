(function($){

// On page ready
$(function(){

  // Do stuff to DOM elements
  $('.js_square').square();
  $('.js_clock').clock();
  
  // Bindings
  $.connect('square.starting_to_count', '.js_message_box', function(obj, elem){ $(elem).html('Number '+obj.num+' starting to count!') });
  $.connect('square.finished_counting', '.js_message_box', function(obj, elem){ $(elem).html('Number '+obj.num+' finished counting!') });

})
  
})(jQuery);