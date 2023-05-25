# Set a Node.js base image
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Add your node.js package.json file to the root directory
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all files into the image
COPY . .

# Build the project for production
RUN npm run build

# Set nginx as the base image to serve the frontend contents
FROM nginx:1.19.0-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
