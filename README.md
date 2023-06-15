# Turfcoach Scheduler App Assignment
## Setup
### Prerequisites: 
Have yarn and docker installed on your machine.
This application was designed to mainly be run on a linux, WSL or equivalent OS/System

### Run locally from repo
- Clone repo
- Have a instance of mongo running.
- Install dependencies: `yarn install`
- Build app:
  - Development version run `yarn dev_build`
  - Production version run `yarn prod_build`
- Run `MONGO_URI=<mongo_uri> PORT=8080 yarn start`
- Open browser [here](http://localhost:8080/)

**Note:** Example mongo_uri: `mongodb://localhost:27017/hsl_bike_app`

### Run docker stack from repo
- Clone repo
- Run either (both will setup mongo database and run the app):
  - The development build version: `yarn docker_dev`
  - The production build version: `yarn docker_prod` 
- Open browser [here](http://localhost:8080/)