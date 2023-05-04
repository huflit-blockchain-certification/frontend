# Specify the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN yarn install 

# Copy the rest of the application files to the working directory
COPY . .

# Copy the production environment variables file
COPY .env.production .

# Set NODE_ENV to production
ENV NODE_ENV=production

# Build the Next.js application
RUN yarn build

# Expose the default Next.js port
EXPOSE 3006

# Start the application
CMD ["yarn", "start"]