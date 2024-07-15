# Polling App Solution Repository

[![Polling App Image](https://github.com/luigi-dv/assessment-engineer/actions/workflows/docker-image.yml/badge.svg)](https://github.com/luigi-dv/assessment-engineer/actions/workflows/docker-image.yml)

This repository contains the solution for the Polling App assessment.

## Requirements

- A basic polling app that enables users to vote and view results.
- Utilizes FastAPI for backend vote handling and result display.

## Getting Started

To get started with the Polling App solution, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/luigi-dv/assessment-engineer.git
   cd assessment-engineer
   ```
   
2. **Setup Backend**

   Navigate to the backend/ directory:

   ```bash
   cd backend/
   ```

   Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
   
   Start the FastAPI server:

   ```bash
     uvicorn app.main:app --reload
   ```
   
   The FastAPI server should now be running at http://localhost:8000.

3. **Setup Frontend**

   Navigate to the frontend/ directory from the root directory:

   ```bash
   cd frontend/
   ````
   
4. Install dependencies:

   ```bash
   npm install
   ```
   Start the React development server:

   ```bash
   npm start
   ```
   
   The React development server should now be running at http://localhost:3000.

## Running with Docker

   You can also run the backend service using Docker.
   
   ```bash
   # Build the image
   docker build -t assesment-engineer:latest .
   # Run the container
   docker run -p 8000:8000 assesment-engineer:latest
   # Run the container in detached mode
   docker run -d -p 8000:8000 assesment-enginer:latest
   ```

## Usage

Open your web browser and go to http://localhost:3000 to access the Polling App.
Vote on available polls and observe real-time updates on the results.
