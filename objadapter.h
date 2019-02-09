#ifndef STACK_H
#define STACK_H
#include "dlist.h"

//the abstract base class Stack, the interface of a Stack.
class Stack{
public:
	Stack();
	virtual void push(const Object& o)=0;
	virtual void pop()=0;
	virtual Object top()=0;
	virtual bool isEmpty()=0;
	virtual ~Stack();
};


//This class implementation takes the structure of the interface 
class DLObjAdapter : public Stack {
	 
	DList *dlist; //Adaptee

public:
	//Simple instantiation/ prep
	DLObjAdapter() {
		dlist = nullptr;
	}

	//in the case dlist is being passed info is being passed in
	DLObjAdapter(DList *DL) {
		dlist = DL;
	}

	//Stacks are FIFO (First in, First Out), thus only need to "push" to the front to add to stack
	virtual void push(const Object& o) {
		dlist->push_front(o);
	}

	//Stacks are FIFO (First in, First Out), thus only need to "pop" the first (front) node to take from stack
	virtual void pop() {
		if (!isEmpty() || dlist != nullptr) {
			dlist->pop_front();
		}
	}

	//Top of stack is the last item that was added to it, thus return the beginning
	virtual Object top() {
		return dlist->begin(); //I believe this still returns a nullptr ref is dlist isn't init
	}

	virtual bool isEmpty() {
		//Intentions: dlist->begin() returns a const_iterator. 
		//	The const_iterator has a dereferencing operator that returns the Node's data as an object
		if ( *(dlist->begin()) == nullptr ) {
			return true;
		}

		return false;
	}
};


#endif
