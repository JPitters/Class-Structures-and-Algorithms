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

//Interface: Stack, Adaptee: DList
class ClassAdapter: public Stack, private DList {

public:
	//utilize inherited constructor to initialize "stack" (linked list)
	ClassAdapter() : DList() { }

	//Stacks are FIFO (First in, First Out), thus only need to "push" to the front to add to stack
	virtual void push(const Object& o) {
		DList::push_front(o);
	}
	
	//Stacks are FIFO (First in, First Out), thus only need to "pop" the first (front) node to take from stack
	virtual void pop() {
		if (!isEmpty()) {
			DList::pop_front();
		}
	}
	
	//Top of stack is the last item that was added to it, thus return the beginning
	virtual Object top() {
		return DList::begin();
	}

	virtual bool isEmpty() {
		//Intentions: dlist->begin() returns a const_iterator. 
		//	The const_iterator has a dereferencing operator that returns the Node's data as an object
		if ( *(DList::begin()) == nullptr ) {
			return true;
		}

		return false;
	}
	
	//virtual Stack::~Stack() { }
};


#endif
