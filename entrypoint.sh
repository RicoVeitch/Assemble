#!/bin/bash

# run_cmd="dotnet run --project API/API.csproj"
run_cmd="dotnet API.dll"
sleep 30

echo "MYSQL Server is up - executing command"
exec $run_cmd