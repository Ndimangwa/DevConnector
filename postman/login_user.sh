#!/bin/bash
curl -X POST 127.0.0.1:5000/api/auth -H "Content-Type: application/json" -d '{"email": "ndimangwa@gmail.com", "password": "123456"}' 
