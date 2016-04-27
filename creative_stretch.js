var jellos = {};

var id_num = 0;
var left_splat = false;
var right_splat = false;

var audio = new Audio("Slime_Splash.mp3");


Leap.loop(function(frame) {

  frame.hands.forEach(function(hand, index) {
    
    var jello = jellos[index];    
    jello.setTransform(hand.screenPosition(), hand.roll());
    
    
    var coords = hand.screenPosition();
    var x = coords[0];
    var y = coords[1];

    var splat = document.createElement('img');
    splat.src = 'splat.png';
    splat.style.position = 'absolute';
    splat.style.left = x - splat.width  / 2 +'px';
    splat.style.top = y - splat.height  / 2 +'px';
    
    if(hand.grabStrength == 1 && hand.type == "left" && left_splat == false){
      audio.play();
      
      document.body.appendChild(splat);
      document.body.removeChild(document.getElementById("0"));
      left_splat = true;
    }
    else if(hand.grabStrength == 1 && hand.type == "right" && right_splat == false){
      audio.play();

      document.body.appendChild(splat);
      document.body.removeChild(document.getElementById("1"));
      right_splat = true;
    }

  });
  
}).use('screenPosition', {scale: 0.25});


var Jello = function() {
  var jello = this;
  var img = document.createElement('img');
  img.src = 'jello.png';
  img.id = id_num++;
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
jellos[1] = new Jello();

// This allows us to move the jello even whilst in an iFrame.
Leap.loopController.setBackground(true)