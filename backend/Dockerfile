# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

# Set the working directory in the container
WORKDIR /app

# Add current directory code to working directory
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Print out the PATH and the locations of the gunicorn executable
RUN echo $PATH
RUN find / -name gunicorn

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["gunicorn", "-w", "4", "-b", ":5000", "app:app"]
