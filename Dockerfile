# Specify the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install 

# Copy the rest of the application files to the working directory
COPY . .

# Build the Next.js application
RUN npm run build


# Start the application
CMD ["npm", "start"]
