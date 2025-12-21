#!/bin/bash
if [[ $# -lt 2 ]]; then 
	echo "Usage : $0 <token_value> <experience_data>"
	exit 1
fi
curl -X PUT 127.0.0.1:5000/api/profile/experience -H "Content-Type: application/json" -H "x-auth-token: $1" -d "$2"
