# Assesment Engineer
 
Assessment Engineer is a microservice architecture application built with FastAPI.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.11
- Pip
- FastAPI
- MongoDB

### Installing

A step by step series of examples that tell you how to get a development environment running.

```bash
# Clone the repository
git clone https://github.com/luigi-dv/assesment-engineer.git

# Navigate into the directory
cd assesment-engineer/backend

# Install dependencies
pip install -r requirements.txt

# Run the application
uvicorn main:app --reload
```

### Docker

You can also run the application using Docker.

```bash
# Build the image
docker build -t assesment-enginee:latest .
# Run the container
docker run -p 8000:8000 assesment-engineer:latest
# Run the container in detached mode
docker run -d -p 8000:8000 assesment-enginer:latest
 ```
## Built With

- [FastAPI](https://fastapi.tiangolo.com/) - The web framework used
- [Python](https://www.python.org/) - The programming language used

## Authors

- [Luigi Davila](https://github.com/luigi-dv)

