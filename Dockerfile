# Use an Alpine Linux base image with Python 3.11
FROM python:3.11-alpine

WORKDIR /app

COPY requirements.txt .

RUN apk add --update --no-cache gcc musl-dev libffi-dev openssl-dev \
    && pip install -r requirements.txt \
    && apk del gcc musl-dev libffi-dev openssl-dev

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
