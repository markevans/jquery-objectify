(function($){

// On page ready
$(function(){
  
  // Do stuff to DOM elements
  $('.js_square').square();
  $('.js_message_box').messageBox();
  
  // Bindings
  $().bind('square.finished_counting', function(e, s){ $('.js_message_box').trigger('display', ['Number '+s.num+' finished counting!']) });

})
  
})(jQuery);