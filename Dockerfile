# Use the official Python image from the Docker Hub as a builder stage
FROM python:3.11 as builder

LABEL authors="Luigi Davila"

# Defining app as the working directory
WORKDIR /app

# Copy the requirements file into the builder stage
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Use the official Python image from the Docker Hub as a runtime stage
FROM python:3.11-slim

# Create a group and user
RUN groupadd -g 10999 app && useradd -r -u 10999 -g app app

# Set the working directory
WORKDIR /home/app

# Copy the installed dependencies from the builder stage
COPY --from=builder /usr/local /usr/local

# Copy the source code into the runtime stage
COPY --chown=app:app backend/src /home/app/src
COPY --chown=app:app backend/main.py /home/app/main.py
COPY --chown=app:app backend/.env /home/app/.env
COPY --chown=app:app backend/entrypoint.sh /home/app/entrypoint.sh

# Change script permissions
RUN chmod +x /home/app/entrypoint.sh

# Expose port
EXPOSE 8000

# Set the entrypoint script to initiate the container
ENTRYPOINT ["/home/app/entrypoint.sh"]