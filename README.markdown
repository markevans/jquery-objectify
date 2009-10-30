JQuery Objectify
================

Objectify is not so much a jquery plugin, but a jquery plugin *generator*.

It's a single function which allows you to easily create jquery plugins where you wish to attach an object with behaviour to a DOM element.
Not that you couldn't do this anyway, but it DRYs up a commonly used pattern and enforces a good convention for inter-object communication.

The best way to demonstrate it is with an example!!

Let's build a simple digital clock.

- We put the following markup in the HTML:

        <div class="js_clock">
          <span class="js_hours"></span>:<span class="js_minutes"></span>:<span class="js_seconds"></span>
        </div>
    
    (NB it's good practice to distinguish javascript hooks from normal css class with something like 'js_...' so that css and js can be independently modified without any unforeseen side-effects)

    Before showing you the entire code, let's just break it down into chunks...

- We put the code which defines the object's behaviour in a common js file, e.g. 'lib.js':

        $.objectify('clock',{
          someMethod: function(){
            // ...
          },
          someMethod2: function(someArg){
            // ...
          },
          
          some_attribute: 5, // this is the initial value for this attribute
          
          init: function(start_hour){
            // initialization code here...
          }
        });

    This has created a jquery-style plugin, equivalent to writing
        
        $.fn.clock = function(start_hour){...

- We attach the object to the dom element, in the main javascript file in an on-ready e.g. 'application.js'

        $('.js_clock').clock(12);

...and hey presto! We have a digital clock!!

What does the code for the clock look like?
-------------

    $.objectify('clock',{
      start: function(){
        var self = this;
        this.interval_id = window.setInterval(function(){self.incrementTime()}, 1000)
      },
      stop: function(){
        window.clearInterval(this.interval_id)
      },
      set: function(hours, minutes, seconds){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.updateDisplay();
      },
      incrementTime: function(){
        if(this.seconds < 59){
          this.seconds += 1
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
        this.jelem.find('.js_hours').html(this.hours).end().
                   find('.js_minutes').html(this.minutes).end().
                   find('.js_seconds').html(this.seconds);
      },
      minutes: 0,
      seconds: 0,
      init: function(start_hour){    // INITIALIZATION
        this.hours = start_hour || 12;
        this.start();
      }
    });


Notes on the code
-----------------
- methods in the hash:

    Instance methods.
    In each method, `this` corresponds to the object, `this.elem` corresponds to the DOM element, and `this.jelem` is a shortcut for `$(this.elem)`

- attributes in the hash:

    Starting values for any instance attributes

- `init` method:

    Any initialization code here.
    
    Any arguments passed to `clock` are passed straight through to here
    
    `this`, `this.elem` and `this.jelem` are as in other methods


Inter-object communication
========================

It's good practice for normally unrelated objects not to know about each other.

Suppose on some pages we want to display a message every hour to remind us of the time (how annoying!).

This requires the following simple code:

Inside clock's `incrementTime` method, we add the line
        
    this.transmit('hour_changed')
    
when the hour has changed.
This is clock shouting into the ether that it's updated the hour, but not caring about who might be listening.
This is actually just a simple wrapper around jquery's `trigger`, and is equivalent to saying

    $().trigger('clock.hour_changed', this)
    
I like to use it because it enforces (and DRYs up) the convention of using the document event listener,
using the namespace 'clock' and attaching itself to the event.

We can then bind to this event in the usual jquery way, e.g in 'application.js':

    $().bind('clock.hour_changed', function(evt, clock_obj){
      $('.js_message_box').html("The time is "+clock_obj.hours+"o'clock!") 
    });

...or if we had another objectify object `messageBox`, we could use the provided `connect` method to connect directly:

    $.connect('clock.hour_changed', 'messageBox', function(obj1, obj2){
      obj2.display("It's "+obj1.hours+" o'clock!")
    });

Meta data
=========
Every objectify object has a bit of meta data added to it which may be useful, in the form of `obj.meta`.
If, for example, you attached an objectify object to each of six DOM elements using:

    $('.js_square').square();
    
..then each of the six objects would have the following meta attributes:

    obj.meta.obj_index     // number between 0 and 5, depending on the object
    obj.meta.total_objs    // 6
    obj.meta.selector      // '.js_square', i.e. the selector which was used to objectify the element.

Accessing objects directly
==========================

Every DOM element with an objectify object attached has an `obj` attribute, and this is reciprocated by the object, which
has a `elem` attribute pointing to the DOM element.

So to access an object directly, we can, for example, set the third clock object to 2 o'clock by doing

    $('.js_clock')[2].obj.set(2,0,0)

You can often avoid needing to access it like this, however, by using `$.connect`, as described above.

Requirements
===========
- [jQuery](http://jquery.com/) (works with at least version 1.2.6 as far as I know, probably earlier too)

Installation
============
Simply copy the file jquery.objectify.js, and include it in your html files after jquery.