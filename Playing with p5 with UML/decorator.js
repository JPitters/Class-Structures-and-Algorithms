//Code for a regular border
function Border(x, y, w, h){
	this.x_coord = x;
	this.y_coord = y;
	this.width_ = w;
	this.height_ = h;
	//this.type_ = t;
}
Border.prototype.draw = function(){
	//console.log(this);
	rectMode(CENTER);
	strokeWeight(1);
	stroke(0,0,0);
	noFill();
	rect(this.x_coord,this.y_coord,this.width_,this.height_);			
}

//Code for a Thick border class
function ThickBorder(x, y, w, h){
	Border.call(this, x, y, w, h);
}
ThickBorder.prototype = Object.create(Border.prototype);
ThickBorder.prototype.draw = function(){
	rectMode(CENTER);
	strokeWeight(3);
	stroke(0,0,0);
	noFill();
	rect(this.x_coord,this.y_coord,this.width_,this.height_);
}

//Code for a dotted border class inherited from the normal Border class
function DottedBorder(x, y, w, h){
	Border.call(this, x, y, w, h);
}
DottedBorder.prototype = Object.create(Border.prototype);
DottedBorder.prototype.draw = function(){
	ellipseMode(CENTER);
	strokeWeight(1);
	fill(255,0,0);
	stroke(255,0,0);
			
	//above label
	for(var i=0;i<this.width_/10 + 1;i++){
		ellipse((this.x_coord-this.width_/2+i*10),(this.y_coord-this.height_/2),5,5);
	}
	
	//below label
	for(var i=0;i<this.width_/10 +1;i++){
		ellipse((this.x_coord-this.width_/2+i*10),(this.y_coord+this.height_/2),5,5);
	}
	
	//left of label
	for(var i=0;i<this.height_/10-1;i++){
		ellipse((this.x_coord-this.width_/2),(this.y_coord-this.height_/2+((i+1)*10)),5,5);
	}
	
	//right of label
	for(var i=0;i<this.height_/10-1;i++){
		ellipse((this.x_coord+this.width_/2),(this.y_coord-this.height_/2+((i+1)*10)),5,5);
	}
}



//var dborder = new DottedBorder();

var Label = function(labelText,x,y){
	var that = {};
	var labelText_=labelText || "";
	var x_=x || 200;
	var y_=y || 200;
	var width_ = labelText_.length * 10;
	var height_ = 40;
	var styles = [];

	that.draw = function(){
		
		for (i = 0; i < styles.length; i++) { 
			var newX = x_ - 1*i;
			var newY = y_ - 1*i;
			var newW = width_ + 15*i;
			var newH = height_ + 15*i;
			
			if(styles[i] == "RBorder"){
				var rB = new Border(newX, newY, newW, newH);
				rB.draw();
			}
			else if(styles[i] == "TBorder"){
				var tB = new ThickBorder(newX, newY, newW, newH);
				tB.draw();						
			}
			else if (styles[i] == "DBorder"){
				var dB = new DottedBorder(newX, newY, newW, newH);
				dB.draw();
			}
		}
		
		strokeWeight(1);
		stroke(0,0,0);
		fill(0,0,0);
		textAlign(CENTER,CENTER);
		text(labelText_,x_,y_);

	}
	that.toggleRectBorder = function(){
		styles.push("RBorder");
		//styles.push(new Border());
	}
	that.toggleThickBorder = function(){
		styles.push("TBorder");
	}
	that.toggleDots = function(){
		styles.push("DBorder");
	}
	that.removeBorder = function(){
		styles.pop();
	}
	return that;
};

var l;
var thickBorderButton;
var borderButton;
var dotButton;
var removeButton;
function addBorder(){
	l.toggleRectBorder();
}
function addThick(){
	l.toggleThickBorder();
}
function addDots(){
	l.toggleDots();
}
function removeB(){
	l.removeBorder();
}
function setup(){
    thickBorderButton=createButton("Add Thick Border");
    thickBorderButton.mousePressed(addThick);
    borderButton=createButton("Add Border");
    borderButton.mousePressed(addBorder);
    dotButton=createButton("Add Dots Border");
    dotButton.mousePressed(addDots);
    removeButton=createButton("Remove Last");
	removeButton.mousePressed(removeB);

	createCanvas(1200,900);
	l = Label("the Label", 430,430);

}
function draw(){
	background(255,255,255);
	l.draw();
}
	