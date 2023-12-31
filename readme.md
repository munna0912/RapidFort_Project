# Flask Web Application with Kubernetes Deployment

## Overview

This project is a simple Flask web application that allows users to upload, download, update, and delete files. It includes a Dockerfile for containerization and Kubernetes manifest files for deployment in a Kubernetes cluster.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.11.0
- Docker
- Kubernetes cluster (for production deployment)

## Setup

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/munna0912/RapidFort_Project.git
2. Change to the project directory:

    ```bash
    RapidFort_Project
3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt

4. Running Locally
To run the Flask application locally, use the following command:

    ```bash
    python app.py
5. Access the application in your browser at http://127.0.0.1:5000.


## Building and Running with Docker
To build and run the application in a Docker container, follow these steps:

1. Build the Docker image:

    ```bash
    docker build -t munna0912/rapidfort:latest .

2. Run the Docker container:

    ```bash
    docker run -d -p 5000:5000 --name munna0912 munna0912/rapidfort:latest
Access the application in your browser at http://127.0.0.1:5000.

## Deployment to Kubernetes
To deploy the application to a Kubernetes cluster, use the provided Kubernetes manifest files. Ensure that you have a Kubernetes cluster set up and kubectl configured to communicate with it.

1. Apply the Kubernetes manifests:

    ```bash
    kubectl apply -f kubernetes/namespace.yaml 
    kubectl apply -f kubernetes/deployment.yaml
    kubectl apply -f kubernetes/service.yaml
2. Access the application using the appropriate URL provided by your Kubernetes service (e.g., LoadBalancer IP or NodePort).

## Usage
- Use the web interface to upload, download, update, and delete files.
- You can also interact with the application programmatically using the provided API endpoints.
## Contributing
Contributions are welcome! If you have any ideas, enhancements, or bug fixes, please open an issue or submit a pull request.
