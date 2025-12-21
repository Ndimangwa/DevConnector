#!/bin/bash
if [[ $# -lt 2 ]]; then 
	echo "Usage : $0 <token_value> <experience_id>"
	exit 1
fi
curl -X DELETE "127.0.0.1:5000/api/profile/experience/$2" -H "Content-Type: application/json" -H "x-auth-token: $1"
