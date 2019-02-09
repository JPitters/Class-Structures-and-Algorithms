
var Shapes = function(posX, posY){
	var x_ = posX;
	var y_ = posY;
	
}


// -------------------------------------------------------------------------
var DaddySorter = function(arr, sz, sID){
	var that = {};
	//var mainIter_ = 0;
	var array_ = arr;
	var size_ = sz;
	var sorterID_ = sID;
	var sortAlg_ = [];
	var isPaused_ = false;
	var frames_ = 60;
	
	var bubble = BubbleSort(array_, size_);
	var insertion;
	var merge;
	
	
	if (this.constructor === DaddySorter) {
      throw new Error("Can't instantiate abstract class!");
    }
	
	that.runAlg = function(){
		sortAlg_[sorterID_].run();
	}
	
	that.setPaused = function(p){
		isPaused_ = p;
		if(isPaused){
			noLoop();
		} else {
			loop();
		}
	}
	
	this.setFrameRate = function(fr){
		frameRate(fr);
	}
	
	//return that;
}





var BubbleSort = function(arr, sz){
	DaddySorter.apply(this, arguments);
	
	var that = {};
	var mainIter_;
	
	that.run = function(){
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
	}
	
	
	return that;
}

BubbleSort.prototype = Object.create(DaddySorter.prototype);

