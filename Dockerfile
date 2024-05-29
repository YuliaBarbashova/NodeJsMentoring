# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /HW9

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies and clean npm's cache
RUN npm install --production && \
    npm cache clean --force

# Copy the rest of the application code to the working directory
COPY . .

# Set the non-root user to run the application
USER node

# Expose the port that the application runs on
EXPOSE 8000

# Define a health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:8000/healthcheck || exit 1

# Start the application
CMD [ "npm", "start:prod" ]
