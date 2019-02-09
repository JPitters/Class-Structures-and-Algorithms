//Note:
// Particle and Particle system borrowed from: https://p5js.org/examples/simulate-smokeparticles.html
// Coded by: Jordan Pitters

var theta = 0;
var c1 = 10;
var c2 = 20;
var c3 = 30;
var x, y;
var bottom = 320;
var top = -80;

var acceleration = 0.0198;
var nDrops = 100;
var drops = [];

var particle_texture = null;
var ps = null;

function preload() {
    particle_texture = loadImage("../media/particle_texture.png");
}


function setup(){
  var canv = createCanvas(710, 400);
  canv.parent('sketch');
  
	x = 0;
  y = bottom;
	for (i = 0; i < nDrops; i++) {
    drops.push(new Drop());
  }
	
  
	//initialize our particle system
  ps = new ParticleSystem(0,createVector(width / 2 - 10, height - 10),particle_texture);
}

function draw(){
  background(0);
	
	drops.forEach(function(d) {
    d.drawAndDrop();
  });
	
	strokeWeight(2);
	stroke(0);
	
	
	//--------------------------------
	//Background 
	/*
	stroke(50);
  ellipse(x, y, 24, 24);
	
  // Jiggling randomly on the horizontal axis
  x = x + random(-1, 1);
  // Moving up at a constant speed
  y = y - 4;
  
  // Reset to the bottom
  if (y < -200) {
    y = bottom;
  }
	*/
	
	//---------------------------------
	// Animate
	theta += 0.05;
	
	if(c2 >= 250) {
		c2 = 0;
	} else {
		c2 += 0.8;
	}
	
	if(c1 >= 135) {
		c1 = 0;
	} else {
		c1 += 0.2;
	}
	
	if(c3 >= 200) {
		c3 = 0;
	} else {
		c3 += c1/4;
	}
	
	//----------------------------------------------------
	
	//star(0, 0, 30, 70, 5); 
	
	
	strokeWeight(4);
	
	//person - left side
	stroke(0, 0, 255);
	fill(0,0,255);
	ellipse(245, 330, 30, 30); //head
	strokeWeight(5);
	line(245, 330, 240, 400); //body
	//line(-70, 150, -15, 158); //left arm
	line(245, 350, 270, 370); //arm on knees
	line(245, 397, 270, 370); //thigh
	line(270, 370, 280, 400); //leg
	
	//person - left side
	stroke(255, 0, 0);
	fill(255,0, 0);
	ellipse(450, 320, 30, 30); //head
	strokeWeight(5);
	line(450, 330, 450, 400); //body
	line(450, 345, 420, 350); //left arm
	//line(-100, 150, -70, 175); //arm on knees
	line(450, 375, 420, 375); //thigh
	line(420, 375, 420, 400); //leg
	line(450, 397, 480, 397); //leg
	
	line(420, 350, 418, 345); //hand
	
	//log
	stroke(0);
	fill(110,72,45);
	rect(310, 380, 70, 20);
	
	
	//fill(110,72,45);
	rect(200, 290, 15, 120);// left
	rect(500, 290, 15, 120);//right
	stroke(50, 100, 50);
	line(190, 290, 520, 290);//top
	line(190, 290, 180, 300);//top left
	line(520, 290, 530, 300);//top right
	
	//----------------- Fire Physics -------------
	
	var dx = map(mouseX,0,width,-0.2,0.2);
	var wind = createVector(dx/4,0);

  ps.applyForce(wind);
  ps.run();
  for (var i = 0; i < 2; i++) {
       ps.addParticle();
  }
	
	
}

function Drop() {
  this.initX = function() {
    this.x = random() * width - 0;
  };
  this.initY = function() {
    this.y = -random() * height/3 - 70; // Initialise rain somewhat off the screen
  };

  this.initX();
  this.y = random() * height;

  this.length = random() * 10;
  this.speed = random();

  this.drawAndDrop = function() {
    this.draw();
    this.drop();
  };

  this.draw = function() {
		stroke(c1, c2, c3);
    line(this.x, this.y, this.x, this.y + this.length);
  };

  this.drop = function() {
    if (this.y < height) {
      this.y += this.speed;
      this.speed += acceleration;
    } else {
      this.speed = random();
      this.initY();
      this.initX();
    }
  };
}


//========= PARTICLE SYSTEM ===========

var ParticleSystem = function(num,v,img_) {

    this.particles = [];
    this.origin = v.copy(); // we make sure to copy the vector value in case we accidentally mutate the original by accident
    this.img = img_
    for(var i = 0; i < num; ++i){
        this.particles.push(new Particle(this.origin,this.img));
    }
};


ParticleSystem.prototype.run = function() {

    // cache length of the array we're going to loop into a variable
    // You may see <variable>.length in a for loop, from time to time but
    // we cache it here because otherwise the length is re-calculated for each iteration of a loop
    var len = this.particles.length;

    //loop through and run particles
    for (var i = len - 1; i >= 0; i--) {
        var particle = this.particles[i];
        particle.run();

        // if the particle is dead, we remove it.
        // javascript arrays don't have a "remove" function but "splice" works just as well.
        // we feed it an index to start at, then how many numbers from that point to remove.
        if (particle.isDead()) {
            this.particles.splice(i,1);
        }
    }
}


ParticleSystem.prototype.applyForce = function(dir) {
    var len = this.particles.length;
    for(var i = 0; i < len; ++i){
        this.particles[i].applyForce(dir);
    }
}


ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin,this.img));
}

//========= PARTICLE  ===========
var Particle = function (pos, img_) {
    this.loc = pos.copy();

    var vx = randomGaussian() * 0.3;
    var vy = randomGaussian() * 0.3 - 1.0;

    this.vel = createVector(vx,vy);
    this.acc = createVector();
    this.lifespan = 100.0;
    this.texture = img_;
}


Particle.prototype.run = function() {
    this.update();
    this.render();
}

Particle.prototype.render = function() {
    imageMode(CENTER);
    tint(210,105,30,this.lifespan);
    image(this.texture,this.loc.x,this.loc.y);
}

Particle.prototype.applyForce = function(f) {
    this.acc.add(f);
}


Particle.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
        return true;
    } else {
        return false;
    }
}


Particle.prototype.update = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.lifespan -= 2.5;
    this.acc.mult(0);
}


