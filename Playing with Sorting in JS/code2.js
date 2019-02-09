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
	frameRate(10);
	//frameRate(10);
}

var i = 0;
var j = 0;
var iT = 0;
var l;
var temp;
var textB = "*RUNNING* [PRESS SPACE BAR TO PAUSE]";

function draw(){
    //this function is called 60 times per second
    
	background(255,255,255); //draws a white background (this effectively erases the previous frame)
	text(textB, 260, 50); //Writes the text label
	
	//#1: Draw the array with (or without) the changes implemented
	for (l = 0; l < numbers.length; l++) { 
		drawSqWithNum(numbers[l], 'red', 'white', 50, ((l * 50) + 100), 100);
	}
	
	//#2: Loop through the array to look for an option to make a switch between numbers (in the case of bubble sort)
	if (j < (numbers.length - i) - 1){
        if (numbers[j] > numbers[j+1]){
			temp = numbers[j];
			numbers[j] = numbers[j+1];
			numbers[j+1] = temp;
			
			checkSorted(); //Check if any elements were sorted into place
			
			console.log("j = " + j);
			console.log("i = " + i);
		}
    }
	
    j++; //Increment j to continue checking throughout the array
	
	//Check if variable 'i' was incremented, if so then reset j to 0 (Back to start of array)
	if(iT != i){ 
		iT++;
		j = 0;
	}
	
	//i++; //increment the number of elements that are correctly sorted
    
	if (i > numbers.length-1){
		finished = true;
		background(255,255,255);
		textB = "*FINISHED* [RELOAD PAGE TO TRY AGAIN]";
		text(textB, 260, 50);
		//#4
		for (l = 0; l < numbers.length; l++) { 
			drawSqWithNum(numbers[l], 'red', 'white', 50, ((l * 50) + 100), 100);
		}
        noLoop();
    }
	
}

function checkSorted(){
	var largest = 0;
	
	//determine the largest number
	for(n = 0; n < (numbers.length - i); n++){
		if(numbers[n] > largest){
			largest = numbers[n];
		}	
	}
	
	//Check if the largest element was sorted into its correct place
	if(numbers[(numbers.length-i)-1] == largest){
		i++; //if so, increment the number of elements that are correctly sorted
	}
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