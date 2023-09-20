# Stage 1: Build the application
FROM node:14 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create a smaller final image
FROM node:14-slim

# Set the working directory in the final image
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose the port on which your app will run
EXPOSE 3000

# Define the command to run your app
CMD ["node", "dist/index.js"]