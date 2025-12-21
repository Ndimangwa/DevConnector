#!/bin/bash
if [[ $# -lt 2 ]]; then
	echo "Usage : $0 <email> <password>"
	exit 1
fi
curl -X POST 127.0.0.1:5000/api/auth -H "Content-Type: application/json" -d "{\"email\": \"$1\", \"password\": \"$2\"}" 
