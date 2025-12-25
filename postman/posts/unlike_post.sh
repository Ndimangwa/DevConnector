#!/bin/bash
if [[ $# -lt 2 ]]; then 
	echo "Usage : $0 <token_value> <post_id>"
	exit 1
fi
curl -X PUT "127.0.0.1:5000/api/posts/unlike/$2" -H "Content-Type: application/json" -H "x-auth-token: $1"
