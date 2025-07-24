# API

This directory contains the backend API built with Symfony, running inside a Docker container using FrankenPHP and Caddy.

## Purpose

The API serves as the backend for the application, handling data storage, business logic, and providing RESTful endpoints consumed by the frontend and other clients.

## Local Development

To run the API locally with Docker:

1. Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

2. From the root of this project, run the following commands:

```bash
docker compose build --pull --no-cache
docker compose up --wait
```

3. Access the API at https://localhost in your browser or via your client application.

4. To stop the containers, run:

```bash
docker compose down --remove-orphans
```
