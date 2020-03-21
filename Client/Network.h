#pragma once
#include <stdio.h>
#include <WinSock.h>
#include <windows.h>
#include <IPHlpApi.h>                       
#include <string.h>
#include <conio.h>
#include "Utility.h"
#pragma comment(lib, "iphlpapi.lib" )
#pragma comment(lib, "ws2_32.lib")

#define MAC_SIZE 64
#define DESCRIPTION_SIZE 128

unsigned int ipCount;
unsigned int macCount;
char mac[100][MAC_SIZE];
char description[100][DESCRIPTION_SIZE];
char **ip;
char *hostname;

void getMacAddress(void) {
	DWORD size = sizeof(IP_ADAPTER_INFO);
	IP_ADAPTER_INFO *info = NULL;
	char tmp[6];

	ZeroMemory(&mac, MAC_SIZE);
	info = new IP_ADAPTER_INFO[100];
	if (!info) error("new() in getMacAddress of Network");

	if (GetAdaptersInfo(NULL, &size) != ERROR_BUFFER_OVERFLOW)
		error("GetAdaptersInfo() in getMacAddress of Network");

	GetAdaptersInfo(info, &size);
	while (info) {
		snprintf(mac[macCount], MAC_SIZE, "%02X-%0.2X-%0.2X-%0.2X-%0.2X-%0.2X",
			info->Address[0], info->Address[1], info->Address[2], info->Address[3], info->Address[4], info->Address[5]);
		strncpy(description[macCount], info->Description, DESCRIPTION_SIZE);
		info = info->Next;
		macCount++;
	}

	if(info) delete info;
}

void getIpAddress(void) {
	WSADATA wsaData;
	struct hostent *pLocalHostInformation = NULL;
	char szLocalHostName[512];
	int i;

	ZeroMemory(&wsaData, sizeof(WSADATA));

	WSAStartup(MAKEWORD(1, 1), &wsaData);

	gethostname(szLocalHostName, sizeof(szLocalHostName));
	hostname = new char[strlen(szLocalHostName) + 1];
	strcpy(hostname, szLocalHostName);

	pLocalHostInformation = gethostbyname(szLocalHostName);
	
	for (i = 0; pLocalHostInformation->h_addr_list[i] != NULL; i++);

	ipCount = i;
	ip = new char*[ipCount];

	for (i = 0; i < ipCount; i++){
		ip[i] = new char[strlen(inet_ntoa(*(struct in_addr*)pLocalHostInformation->h_addr_list[i])) + 1];
		strcpy(ip[i], inet_ntoa(*(struct in_addr*)pLocalHostInformation->h_addr_list[i]));
	}
}