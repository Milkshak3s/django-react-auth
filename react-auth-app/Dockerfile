# Stage 1: Build Stage
# Use a specific version of the official Node.js image as the build stage
FROM node:21.5-bullseye AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies efficiently and leverage layer caching
COPY package*.json ./

# Set up npm cache in a designated directory to improve caching
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

# Copy the entire application source code
COPY . .

# Run the build command to generate production-ready artifacts
RUN npm run build


# Stage 2: Deployable Image
# Use a specific version of the official Nginx image as the base image for the deployable image
FROM nginxinc/nginx-unprivileged:1.24-bullseye-perl

# Configure error pages
RUN mkdir -p /etc/nginx/error_pages && mkdir /etc/nginx/snippets/
COPY --from=build /usr/src/app/errors /etc/nginx/error_pages
RUN ln -s /etc/nginx/error_pages/snippets/error_pages.conf /etc/nginx/snippets/error_pages.conf && ln -s /etc/nginx/error_pages/snippets/error_pages_content.conf /etc/nginx/snippets/error_pages_content.conf

# Copy the built artifacts from the build stage to the Nginx HTML directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY --from=build /usr/src/app/app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that the Nginx server will listen on
EXPOSE 8080
