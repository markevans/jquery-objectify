(function($){

// On page ready
$(function(){

  // Do stuff to DOM elements
  $('.js_square').square();
  $('.js_clock').clock(2,30);
  $('.js_message_box').messageBox();
  
  // Bindings
  $.connect('square.starting_to_count', 'messageBox', function(obj1, obj2){ obj2.display('Number '+obj1.num+' starting to count!'); });
  $.connect('square.finished_counting', 'messageBox', function(obj1, obj2){ obj2.display('Number '+obj1.num+' finished counting!'); });

});
  
})(jQuery);