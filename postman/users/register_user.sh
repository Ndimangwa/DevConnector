#!/bin/bash
if [[ $# -lt 3 ]]; then
	echo "Usage : $0 <name> <email> <password>"
	exit 1
fi
curl -X POST 127.0.0.1:5000/api/users -H "Content-Type: application/json" -d "{\"name\": \"$1\", \"email\": \"$2\", \"password\": \"$3\"}" 
