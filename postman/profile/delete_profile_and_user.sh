#!/bin/bash
if [[ $# -lt 1 ]]; then 
	echo "Usage : $0 <token_value>"
	exit 1
fi
curl -X DELETE 127.0.0.1:5000/api/profile -H "Content-Type: application/json" -H "x-auth-token: $1" 
