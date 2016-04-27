var cats = {};
var count = 0;

Leap.loop(function(frame) {

  frame.hands.forEach(function(hand, index) {
    
    var cat = ( cats[index] || (cats[index] = new Cat()) );
    cat.setTransform(hand.screenPosition(), hand.roll());
    
    //jello gets smaller when you clench fist
    document.getElementById("cat_"+index).style.width = 50 - (hand.grabStrength*100)/2 +'%';
    
  });
  
}).use('screenPosition', {scale: 0.25});


var Cat = function() {
  var cat = this;
  var img = document.createElement('img');
  img.id = "cat_" + count;
  if(count > 0){
    cats[count] = new Cat();
  }
  
  count++;


  img.src = 'jello.png';
  img.style.position = 'absolute';
  img.onload = function () {
    cat.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }
  
  cat.setTransform = function(position, rotation) {

    img.style.left = position[0] - img.width  / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';

    img.style.transform = 'rotate(' + -rotation + 'rad)';
    
    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};

cats[0] = new Cat();

// This allows us to move the cat even whilst in an iFrame.
Leap.loopController.setBackground(true)