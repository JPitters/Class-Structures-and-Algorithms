#include <cstdlib>
#include <iostream>
using namespace std;
enum states {A,B,C,D};
void printState(states myStates);


class State;
//----------------------------------------



class FSMachine{
	friend class State;
	states temp;
	State* state_;
	void changeState(State* s){
		state_ = s;
	}
	
public:
	FSMachine(){
		
		temp=A;
	}
	states state(){
		return temp;
	}
	void actionOne(){
		changeState(StateA1::Instance(temp));
		temp = state_->action();
		/*switch(state_){
			case A: state_=B; break;
			case B: state_=C; break;
			case C: state_=B; break;
			case D: state_=A; break;
		}*/
	}
	void actionTwo(){
		switch(temp){
			case A: state_=A; break;
			case B: state_=A; break;
			case C: state_=A; break;
			case D: state_=C; break;
		}
	}
	void actionThree(){
		switch(temp){
			case A: state_=D; break;
			case B: state_=D; break;
			case C: state_=D; break;
			case D: state_=D; break;
		}

	}

};

//------------------------------------------------

class State {
protected:
	State(){
		state_ = nullptr;
	}
	void changeState(FSMachine* t, State* s){
		t->ChangeState(s);
	}
	
public:
	virtual states action() = 0;
}

class StateA1 : public State {
	states state_;
public:
	static StateA1* Instance(states s){
		state_ = s;
	}
	virtual states action(FSMachine* m){
		switch(state_){
			case A: state_=B; break;
			case B: state_=C; break;
			case C: state_=B; break;
			case D: state_=A; break;
		}
		
		return state_;
	}
}

class StateA2 : public State {
	states state_;
public:
	static StateA1* Instance(states s){
		state_ = s;
	}
	virtual states action(){
		switch(state_){
			case A: state_=A; break;
			case B: state_=A; break;
			case C: state_=A; break;
			case D: state_=C; break;
		}
		
		return state_;
	}
}

class StateA3 : public State {
	states state_;
public:
	static StateA3* Instance(states s){
		state_ = s;
	}
	virtual states action(){
		switch(state_){
			case A: state_=D; break;
			case B: state_=D; break;
			case C: state_=D; break;
			case D: state_=D; break;
		}
		
		return state_;
	}
}

int main(void){
	FSMachine machine;
	states correctList[500]={
		A,A,D,D,C,D,A,D,D,C,B,D,A,D,A,D,C,A,A,A,B,A,B,D,C,B,C,B,D,C,A,D,D,C,D,
		A,A,A,B,C,A,D,C,B,D,D,D,C,B,A,D,D,C,A,A,D,A,D,A,A,A,A,B,D,D,C,B,C,B,A,
		A,A,A,A,B,A,D,A,D,D,A,A,B,A,D,D,A,D,A,B,C,D,D,C,B,D,C,B,D,A,B,C,D,D,D,
		D,C,B,C,B,D,D,D,A,B,D,C,A,D,D,A,A,B,A,A,B,D,C,A,B,A,A,A,A,A,B,C,A,B,D,
		D,A,D,A,A,D,D,C,D,C,D,C,B,C,B,D,C,D,C,B,C,D,D,D,A,A,B,D,C,A,D,A,A,B,A,
		A,D,A,A,B,A,A,D,A,D,A,A,A,A,A,D,D,C,B,C,D,C,D,A,B,C,A,D,D,A,B,A,D,D,C,
		B,A,D,D,D,A,B,A,A,B,A,D,D,A,B,A,A,B,C,A,A,D,D,C,D,A,A,B,A,D,D,C,B,C,B,
		A,D,C,B,C,B,D,A,D,A,B,C,D,A,A,D,C,D,A,A,A,A,A,B,C,B,C,D,D,D,A,B,C,D,A,
		A,D,C,B,D,D,C,B,D,D,A,A,B,A,D,A,D,D,A,B,D,C,A,D,A,B,D,A,A,D,A,B,D,D,D,
		A,D,C,D,A,B,C,D,D,C,A,A,D,A,D,A,B,C,A,B,C,A,D,C,B,D,C,B,C,A,D,A,A,A,B,
		D,D,D,D,A,A,B,C,B,A,D,A,A,A,A,B,C,D,A,B,C,B,C,A,D,C,B,D,D,A,B,A,B,A,B,
		C,A,A,D,C,B,D,D,D,C,A,D,C,D,C,A,A,D,D,A,A,A,A,B,A,D,C,B,D,A,D,A,A,D,A,
		B,D,A,B,C,D,D,A,D,D,A,B,D,A,A,D,D,A,D,D,D,A,A,D,C,B,C,B,A,A,B,C,D,D,A,
		D,D,D,D,D,D,A,D,D,D,A,D,A,D,D,D,A,D,D,A,A,D,D,D,C,D,C,A,A,A,D,C,D,C,D,
		A,A,B,C,A,D,A,A,D,A};
	states myStates[500];
	int actions[500]={
		2,2,3,3,2,3,1,3,3,2,1,3,1,3,1,3,2,2,2,2,1,2,1,3,2,1,1,1,3,2,2,3,3,2,3,
		1,2,2,1,1,2,3,2,1,3,3,3,2,1,2,3,3,2,2,2,3,1,3,1,2,2,2,1,3,3,2,1,1,1,2,
		2,2,2,2,1,2,3,1,3,3,1,2,1,2,3,3,1,3,1,1,1,3,3,2,1,3,2,1,3,1,1,1,3,3,3,
		3,2,1,1,1,3,3,3,1,1,3,2,2,3,3,1,2,1,2,2,1,3,2,2,1,2,2,2,2,2,1,1,2,1,3,
		3,1,3,1,2,3,3,2,3,2,3,2,1,1,1,3,2,3,2,1,1,3,3,3,1,2,1,3,2,2,3,1,2,1,2,
		2,3,1,2,1,2,2,3,1,3,1,2,2,2,2,3,3,2,1,1,3,2,3,1,1,1,2,3,3,1,1,2,3,3,2,
		1,2,3,3,3,1,1,2,2,1,2,3,3,1,1,2,2,1,1,2,2,3,3,2,3,1,2,1,2,3,3,2,1,1,1,
		2,3,2,1,1,1,3,1,3,1,1,1,3,1,2,3,2,3,1,2,2,2,2,1,1,1,1,3,3,3,1,1,1,3,1,
		2,3,2,1,3,3,2,1,3,3,1,2,1,2,3,1,3,3,1,1,3,2,2,3,1,1,3,1,2,3,1,1,3,3,3,
		1,3,2,3,1,1,1,3,3,2,2,2,3,1,3,1,1,1,2,1,1,2,3,2,1,3,2,1,1,2,3,1,2,2,1,
		3,3,3,3,1,2,1,1,1,2,3,1,2,2,2,1,1,3,1,1,1,1,1,2,3,2,1,3,3,1,1,2,1,2,1,
		1,2,2,3,2,1,3,3,3,2,2,3,2,3,2,2,2,3,3,1,2,2,2,1,2,3,2,1,3,1,3,1,2,3,1,
		1,3,1,1,1,3,3,1,3,3,1,1,3,1,2,3,3,1,3,3,3,1,2,3,2,1,1,1,2,2,1,1,3,3,1,
		3,3,3,3,3,3,1,3,3,3,1,3,1,3,3,3,1,3,3,1,2,3,3,3,2,3,2,2,2,2,3,2,3,2,3,
		1,2,1,1,2,3,1,2,3,1
	};
	for(int i=0;i<500;i++){
		switch(actions[i]){
			case 1: machine.actionOne(); break;
			case 2: machine.actionTwo(); break;
			case 3: machine.actionThree(); break;
		}
		myStates[i]=machine.state();
	}
	bool isGood=true;
	for(int i=0;isGood && i<500;i++){
		if(myStates[i]!=correctList[i]){
			cout << "You have a bug." << endl  ;
			cout << "The correct state should be: ";
			printState(correctList[i]);
			cout << endl;
			cout << "Your State is: ";
			printState(myStates[i]);
			cout << endl;
		}
	}
	if(isGood){
		cout << "Congrats, you have passed testing for A6" << endl;

	}
	else{
		cout << "Sorry you did not pass Testing for A6" << endl;
	}
#if DEBUG == 1
	for(int i=0;i<500;i++){
		printState(myStates[i]);
		cout << ",";
		if(i%35==34){
			cout << endl;
		}
	}
#endif
}
void printState(states myStates){
	char theState;
	switch(myStates){
		case 0:theState='A'; break;
		case 1:theState='B'; break;
		case 2:theState='C'; break;
		case 3:theState='D'; break;
	}
	cout << theState;
}
