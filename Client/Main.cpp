#include <iostream>
#include <string>
#include "Network.h"
#include "Utility.h"

int main(int argc, char** argv[]) {
	initLog();

	/* Test getMacAddress() */
	getMacAddress();
	for (int i = 0; i < macCount; i++) {
		std::cout << std::endl;
		std::cout << "Mac Address[" << i << "] : " << mac[i] << std::endl;
		std::cout << "Description[" << i << "] : " << description[i] << std::endl << std::endl;
	}

	/* Test getIpAddress() */
	getIpAddress();
	std::cout << "Hostname : " << hostname << std::endl;

	for (int i = 0; i < ipCount; i++)
		std::cout << "ip[" << i << "] : " << ip[i] << std::endl;

	exitLog();

	return 0;
}