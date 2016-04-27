var jellos = {};
var count = 0;

Leap.loop(function(frame) {

  frame.hands.forEach(function(hand, index) {
    
    var jello = ( jellos[index] || (jellos[index] = new Jello()) );
    jello.setTransform(hand.screenPosition(), hand.roll());
    
    //jello gets smaller when you clench fist
    document.getElementById("jello_"+index).style.width = 50 - (hand.grabStrength*100)/2 +'%';
    
  });
  
}).use('screenPosition', {scale: 0.25});


var Jello = function() {
  var jello = this;
  var img = document.createElement('img');
  img.id = "jello_" + count;
  if(count > 0){
    jellos[count] = new jello();
  }
  
  count++;


  img.src = 'jello.png';
  img.style.position = 'absolute';
  img.onload = function () {
    jello.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }
  
  jello.setTransform = function(position, rotation) {

    img.style.left = position[0] - img.width  / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';

    img.style.transform = 'rotate(' + -rotation + 'rad)';
    
    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};

jellos[0] = new Jello();

// This allows us to move the jello even whilst in an iFrame.
Leap.loopController.setBackground(true)