#!/bin/sh

# Exit on error
set -e

LOGFILE="/home/app/logfile.log"

# Redirect stderr to the log file
exec 2>$LOGFILE

# Define a cleanup function
cleanup() {
    echo "An error occurred while trying starting a container. Check the log file for details."
}

trap cleanup EXIT

# Start Gunicorn
echo "Starting Unicorn Service with 4 workers on port 8000 ..."
exec uvicorn 'main:app' \
    --host '0.0.0.0' \
    --port '8000' \
    --workers 4 \
    --log-level 'trace'