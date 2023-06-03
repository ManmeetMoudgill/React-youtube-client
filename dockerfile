# Fetching the latest node image on apline linux
FROM node:alpine AS builder



# Setting up the work directory
WORKDIR /app
ENV NODE_OPTIONS="--openssl-legacy-provider"
# Installing dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build


# Stage2 - the web server
# production environment
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
#copying the build folder to the nginx/html folder
COPY --from=builder /app/build /usr/share/nginx/html

#copying the nginx.conf file to the nginx/conf.d folder
#etc is the default folder for nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 777 /usr/share/nginx/html

EXPOSE 3002 
CMD ["nginx", "-g", "daemon off;"]
