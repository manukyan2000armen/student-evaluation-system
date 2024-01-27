FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /project5

# Installing dependencies
COPY package.json package.json 
COPY package-lock.json package-lock.json 

RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["npm","start"]