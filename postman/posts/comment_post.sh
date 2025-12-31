#!/bin/bash
if [[ $# -lt 3 ]]; then 
	echo "Usage : $0 <token_value> <post_id> <comment_text>"
	exit 1
fi
curl -X POST "127.0.0.1:5000/api/posts/comment/$2" -H "Content-Type: application/json" -H "x-auth-token: $1" -d "{\"text\":\"$3\"}"
