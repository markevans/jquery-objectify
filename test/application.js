(function($){

// On page ready
$(function(){

  // Do stuff to DOM elements
  $('.js_square').square();
  
  // Bindings
  $.connect('square.starting_to_count', '.js_message_box', function(s){ $(this).html('Number '+s.num+' starting to count!') });
  $.connect('square.finished_counting', '.js_message_box', function(s){ $(this).html('Number '+s.num+' finished counting!') });

})
  
})(jQuery);