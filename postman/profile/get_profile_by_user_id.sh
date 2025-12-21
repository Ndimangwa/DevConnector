#!/bin/bash
if [[ $# -lt 1 ]]; then
	echo "Usage : $0 <user_id>"
	exit 1
fi
curl -X GET "127.0.0.1:5000/api/profile/user/$1" -H "Content-Type: application/json" 
