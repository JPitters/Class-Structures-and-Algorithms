#include "room.h"
#include <iostream>
using namespace std;

class Builder {
public:
	virtual void furnish(Room*, int) = 0;
};

class Director {
	Builder* build;

public:
	void setBuilder(Builder& b) {
		build = &b;
	}

	Room* buildRoom(int numStudents) {
		Room* rc = new Room();
		build->furnish(rc, numStudents);
		return rc;
	}

};
class ALCBuilder : public Builder {
public:
	void furnish(Room* rc, int num) {
		int tables = 0;

		for (int i = 1; i <= num; i++) {
			rc->addChair("Low Back Plastic with Wheels", 100);
		}

		for (int i = 1; i <= num; i += 3) {
			rc->addTable("half hex tables", 600);
			tables++;
		}
		if (tables % 2 != 0) {
			rc->addTable("half hex tables", 600);
		}
	}
};
class LabBuilder : public Builder {
public:
	void furnish(Room* rc, int num) {
		rc->addChair("instructor stool", 80);
		
		for (int i = 1; i <= num; i++) {
			rc->addChair("Student Desk Chair", 130);
			rc->addComputer("mac mini", 1000);
		}

		for (int i = 1; i <= num; i += 2) {
			rc->addTable("2 station computer desks", 500);
		}
	}
};
class StepRoomBuilder : public Builder {
public:
	void furnish(Room* rc, int num) {
		rc->addChair("instructor stool", 80);
		rc->addTable("instructor table", 200);
		rc->addChair("Regular Chair", 70);
		rc->addTable("8 student long tables", 1000);

		
		for (int j = 1; j <= 7; j++) {
			rc->addChair("padded lecture theater chairs", 150);
		}
		
		for (int i = 8; i <= num; i += 8) {
			for (int j = 0; j < 8; j++) {
				rc->addChair("padded lecture theater chairs", 150);
			}
			rc->addTable("8 student long tables", 1000);
		}
	}
};