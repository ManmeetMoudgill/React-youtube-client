# Specify the base image
FROM node:14-alpine

# Create a directory for the app
WORKDIR /app/react-app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .


# Build the React app
#RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

VOLUME ["/app/react-app/data"]

# Start the Node.js server
CMD ["npm", "start"]