# Fetching the latest node image on apline linux
FROM node:alpine AS builder



# Setting up the work directory
WORKDIR /app
ENV NODE_OPTIONS="--openssl-legacy-provider"
# Installing dependencies
COPY ./package.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# production environment
FROM nginx:stable-alpine
#copying the build folder to the nginx/html folder
COPY --from=builder /app/build /usr/share/nginx/html

#copying the nginx.conf file to the nginx/conf.d folder
#etc is the default folder for nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exposing the port
EXPOSE 80

# Starting our application
#daemon off; is used to keep the container running
CMD ["nginx", "-g", "daemon off;"]
