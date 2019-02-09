var numbers = new Array(15);
var finished = false;

function setup(){
    //this function is called exactly one time when the sketch starts
    //creates a drawing area, 500px X 500px
    createCanvas(900,500);
	//thickBorderButton=createButton("Start");
    //thickBorderButton.mousePressed(drawTriangle('black', 275, 150););
    //this next lines draws an ellipse
    //ellipse(100,100,100,100);
	for (var i = 0; i < numbers.length; i++) { 
		numbers[i] = parseInt((Math.random() * 100) + 1);
	}
	frameRate(1);
	//frameRate(10);
}

var i = 0;
var j;
var l;
var temp;
var textB = "*RUNNING* [PRESS SPACE BAR TO PAUSE]";

function draw(){
    //this function is called 60 times per second
    //draws a white background (this effectively erases the previous frame)
	background(255,255,255);
	text(textB, 260, 50);
	for (l = 0; l < numbers.length; l++) { 
			drawSqWithNum(numbers[l], 'red', 'white', 50, ((l * 50) + 100), 100);
		}
	for (j = 0; j < (numbers.length - i) - 1; j++){
        if (numbers[j] > numbers[j+1]){
			temp = numbers[j];
			numbers[j] = numbers[j+1];
			numbers[j+1] = temp;
			background(255,255,255);
			text(textB, 260, 50);
			for (l = 0; l < numbers.length; l++) { 
			drawSqWithNum(numbers[l], 'red', 'white', 50, ((l * 50) + 100), 100);
			}
		}
    }
    i++;
    if (i > numbers.length-1){
		finished = true;
		background(255,255,255);
		textB = "*FINISHED* [RELOAD PAGE TO TRY AGAIN]";
		text(textB, 260, 50);
		for (l = 0; l < numbers.length; l++) { 
			drawSqWithNum(numbers[l], 'red', 'white', 50, ((l * 50) + 100), 100);
		}
        noLoop();
    }
	/*
	drawSqWithNum(78, 'red', 'white', 50, 100, 100);
	drawSqWithNum(66, 'red', 'white', 50, 150, 100);
	drawSqWithNum(88, 'red', 'white', 50, 200, 100);
	drawSqWithNum(7, 'red', 'white', 50, 250, 100);
	drawSqWithNum(70, 'red', 'white', 50, 300, 100);
	drawSqWithNum(78, 'red', 'white', 50, 350, 100);
	drawSqWithNum(44, 'red', 'white', 50, 400, 100);
	drawSqWithNum(12, 'red', 'white', 50, 450, 100);
	drawSqWithNum(5, 'red', 'white', 50, 500, 100);
	drawSqWithNum(5, 'red', 'white', 50, 550, 100);
	drawSqWithNum(75, 'red', 'white', 50, 600, 100);
	drawSqWithNum(85, 'red', 'white', 50, 650, 100);
	drawSqWithNum(43, 'red', 'white', 50, 700, 100);
	drawSqWithNum(22, 'red', 'white', 50, 750, 100);
	drawSqWithNum(91, 'red', 'white', 50, 800, 100);
	*/
	
	//drawDownTriangle('black', 125, 100);
	//drawTriangle('black', 175, 150);
}

//draws a square with the number c inside it.  Assume that c is 2 digits max.
//offsetX and offsetY are positional offset from top left corner of drawarea.
//co is colour of text
//sz is size of the square
function drawSqWithNum(c, co, bg, sz, offsetX, offsetY){
  stroke(0);
  fill(bg);
  rect(offsetX,offsetY,sz,sz);
  stroke(co);
  fill(co);
  textAlign(CENTER);
  text(c,offsetX+0.5*sz,offsetY+(sz*0.5)+5);
}

//draws a  triangle that is placed under a square that has size of sz.
//posX and posY are positional offset from top left corner of draw
//area and the position of the square
function drawTriangle(co, posX, posY){
  stroke(co);
  fill(co);
  triangle(posX,posY,posX+10,posY+10,posX-10,posY+10);
}

//draws a  triangle that is placed under a square that has size of sz.
//posX and posY are positional offset from top left corner of draw
//area and the position of the square
function drawDownTriangle(co, posX, posY){
  stroke(co);
  fill(co);
  triangle(posX,posY,posX+10,posY-10,posX-10,posY-10);
}

var pause = false;

function keyPressed() {
  if (keyCode === 32) {
	  if (pause == false)
	  {
		  textB = "*PAUSED* [PRESS SPACE BAR TO PLAY]";
		  pause = true;
		  noLoop();
	  }
	  
	  else if (pause == true && finished == false)
	  {
		  textB = "*RUNNING* [PRESS SPACE BAR TO PAUSE]";
		  pause = false;
		  loop();  
	  }
  }
}