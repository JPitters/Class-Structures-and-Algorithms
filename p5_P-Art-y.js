
var img;
var img2;
var theta = 0;
var c1 = 10;
var c2 = 20;
var c3 = 30;

function setup(){
  var canv = createCanvas(710, 400, WEBGL);
  canv.parent('sketch');
  
  img = loadImage("../media/Face8-1.jpg");
  img2 = loadImage("../media/Face8.png");
}

function draw(){
  background(0);
	strokeWeight(2);
	stroke(0);
	
	//left cube
    translate(-130,-90,0);
  push();
    rotateZ(theta * 0.1);
    rotateX(theta * 0.1);
    rotateY(theta * 0.1);
    texture(img);
    box(100, 100, 100);
  pop();
	
	//right cube
	  translate(250,0,0);
  push();
    rotateZ(theta * 0.1);
    rotateX(theta * 0.1);
    rotateY(theta * 0.1);
	texture(img2);
    box(100, 100, 100);
  pop();
	
	//ball
	translate(-130,0,0);
	//fill(77, 55, 87);
	fill(c2, c1, c3);
	sphere(40);
	
	theta += 0.05;
	
	if(c2 >= 255) {
		c2 = 0;
	} else {
		c2 += 1;
	}
	
	if(c1 >= 105) {
		c1 = 0;
	} else {
		c1 += 0.5;
	}
	
	if(c3 >= 255) {
		c3 = 0;
	} else {
		c3 += c1/2;
	}
	//if(c3 => 255) c3 = 0;
	
	//----------------------------------------------------
	
	//middle
	rect(-60, 180, 120, 40);
	rect(-100, 220, 200, 80);
	
	
	strokeWeight(4);
	//right side
	rect(200, 90, 120,200);
	ellipse(260, 140, 80, 80);//top outer
	ellipse(260, 140, 40, 40);//top inner
	ellipse(260, 240, 80, 80);//bottom outer
	ellipse(260, 240, 40, 40);//bottom inner
	
	//left side
	rect(-320, 90, 120,200);
	ellipse(-260, 140, 80, 80);//top outer
	ellipse(-260, 140, 40, 40);//top inner
	ellipse(-260, 240, 80, 80);//bottom outer
	ellipse(-260, 240, 40, 40);//bottom inner
	
	//person
	stroke(0, 0, 255);
	fill(0,0,255);
	ellipse(0, 120, 40, 40); //head
	strokeWeight(5);
	line(0,140, 0,180); //body
	line(0,150, -40,130); //left arm
	line(0,150, 40,130); //right arm
	
	//ellipse(200, 240, 40, 40); //head
	//line(220,240, 270,190); //body
	//line(225,235, 225,280); //left arm
	//line(0,150, 40,130); //right arm
	
}