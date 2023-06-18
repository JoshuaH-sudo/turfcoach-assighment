# Turfcoach Scheduler App Assignment
## Installation
### Prerequisites: 
1. Insure yarn and docker are installed on your machine.
2. This application itself was designed to mainly be run on a Linux, WSL or equivalent OS/System but can be run in docker.

### Run outside of Docker
- Clone repo
- Have an instance of Mongo running.
- Install dependencies: `yarn install`
- Build app:
  - Development version run `yarn dev_build`
  - Production version run `yarn prod_build`
- Run `MONGO_URI=<mongo_uri> PORT=8080 yarn start`
- Open browser [here](http://localhost:8080/)

**Note:** Example mongo_uri: `mongodb://localhost:27017/turfcoach_scheduler`

### Run Docker stack
- Clone repo
- Run either (both will setup MongoDB and run the app):
  - The development build version: `yarn docker_dev`
  - The production build version: `yarn docker_prod` 
- Open browser [here](http://localhost:8080/)

## Follow Up Question Answers
### Implementation
1. What libraries did you use? What are they used for? Why did you choose them specifically?
   1. **Elastic UI library (EUI):** It's a package that I am most experienced and is easy to create good-looking websites quickly
   2. **Webpack:** Really easy to bundle code and has a lot of documentation and support around it.
   3. **FullCalander:** Was simple and easy-to-use, allowing me to quickly convert the schedule display from a table to a calendar.
   4. **NodeJS / ExpressJS:** A backend technology that I have the most experience in and can allow me to separate the logic between designing the routes, creating the data structure of my models and controlling the business logic for them.
   5. **MongoDB / Mongoose:** This schema-less database is really good for quickly storing objects and other simple data in documents that can be used almost in the same way as regular javascript objects. The Mongoose helper functions like `findById` or the filtering functions allow for easily querying the DB without knowing an extra language like SQL.   
2. What improvements or new features would you add if you had more time to work on the problem?
   1. Add Joi validation to the `put` / `post` requests.
   2. Add a testing suite with JEST.
   3. Create other users and pitches.
   4. Display weather information/forecast for any selected day, when the user goes to schedule an activity.
   5. Add a start and end date/time to activities.
   6. More overall weather information at the top and maybe add a scroll feature to see further days ahead.
   7. Better calendar event interaction, add dragging and resizing of the events to change the date and time without using the form modal.
   8. Automate adding the WEATHER_API_KEY through something like Dotenv which could securely provide the API key during runtime.
   9. Allow the user to select a weather zone other than their current location or set it for the pitch specifically so that the information is relative to each location.
3. Which parts did you find most difficult and which parts did you spend the most time with?
   1. It was really difficult to find a free and useable calendar library. A lot of options were paid, did not allow for scheduling events or were designed for other frameworks like Vue.
   2. Trying to get the layout and size correct between the weather and schedule display. The EUI charts are positioned and respond to the parent's height and width during runtime, which can make it a bit tricky to debug.
   3. Checking for overlapping activities on the same pitch. There was no requirement to set an end date and time for an activity, so I assumed that it was ok if another activity started exactly 1 minute or more after another on the same pitch.
4. What are key things to consider when deploying this application for customer use/production?
   1. Need the API key or any sensitive environment variable to be provided dynamically during deployment. Something like Github Secrets or Dotenv can do this.
   2. Apply username and password to the database.
   3. Testing suite needs to accommodate for both desktop and mobile environments.

### Feedback
#### How did you find the challenge overall? Did you have any issues or have difficulties completing?

I thought it was really fun. I enjoyed using a feature-rich weather API, I can imagine a lot of versatility with an API like that. I have never had to set up a calendar display before or create an application heavily centered around time and dates, it was interesting from a UI perspective how to design a layout that conveyed this information well. 

I had some confusion of the requirements around setting the time and date of an activity and avoiding conflicting with others. Since there was no requirement for an end date, the only way to check for a conflict with another activity, was if they started on the exact same time. So, if the difference is one minute then it is technically fine, which is not realistic. But this would not be difficult to change later on.

#### We would love to hear any suggestions or improvements you have to make this challenge better!

Maybe provide an example of what kind of data goes into an activity or a step-by-step use case, outlining a customer using the application or performing an action.