#pragma once
#include <iostream>
#include <time.h>
#include <windows.h>

void now(char result[]) {
	time_t timer;
	struct tm *t;

	timer = time(NULL); 
	t = localtime(&timer); 

	snprintf(result, 256, "%d-%02d-%02d %02d:%02d:%02d",
		t->tm_year + 1900, t->tm_mon + 1, t->tm_mday, t->tm_hour, t->tm_min, t->tm_sec);
}

void initLog(void) {
	char logTime[256];
	char log[256];

	ZeroMemory(&logTime, 256);
	ZeroMemory(&log, 256);

	now(logTime);
	snprintf(log, 256, "[Init] :  Start UCMS (%s)", logTime);
	std::cout << log << std::endl;
}

void exitLog(void) {
	char logTime[256];
	char log[256];

	ZeroMemory(&logTime, 256);
	ZeroMemory(&log, 256);

	now(logTime);
	snprintf(log, 256, "[Exit] :  Stop UCMS (%s)", logTime);
	std::cout << log << std::endl;
}

void error(char *msg) {
	char logTime[256];
	char log[256];

	ZeroMemory(&logTime, 256);
	ZeroMemory(&log, 256);

	now(logTime);
	snprintf(log, 256, "[Error] :  %s (%s)", msg, logTime);
	std::cout << log << std::endl;
}