# WTWR (What to Wear?) (Backend)

## Overview

- Intro - About the project
- Description of the Project
- Technologies
- Figma Design
- Links
- Demo Credentials
- Plans for Improvement

### Intro - About the project

The WTWR application serves as a platform for users to establish an account. After the user successfully signs up and logs in, they gain the ability to upload images of their clothing items. Utilizing external weather data, the application provides tailored clothing recommendations to the user based on the current weather conditions in their local area.

### Description of the Project

The WTWR backend component was built using Node.js, Express.js, and MongoDB. Node.js serves as the main backend component of the WTWR Application. Express.js was used to create the REST API and MongoDB is used for the non-relational database, which houses information about the users and the items. A module-based approach was used to keep the code structure clean and organized throughout the entire application. ES-Lint was used to guide code maintence and ensure code standards are being met. It functions as the central hub for user authentication, user authorization, routing, file delivery to the frontend, and error management (utilizing controller functions and middlewares). In addition, Schema models were employed to validate MongoDB-related files. Additionally, security measures, such as the helmet module and a rate limiter, have been integrated to fortify against DDoS attacks.

### Technologies

- Frontend: JavaScript, React.js, CSS3, AJAX
- Backend: Node.js, Express.js, Mongoose, REST API, Google Cloud
- Backend Security: Express Modules (CORS, Winston, bcrypt, rate limiting)
- Tools Used: Webpack, Postman, ESLint

### Figma Design

Figma was employed to create the design for this single-page application, provided by TripleTen. The design encompasses intricate views of each component utilized in the React application, with images and logos also incorporated. Additionally, the Figma design offers comprehensive information for constructing applications tailored to various screen sizes.

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

### Links

- The project's frontend can be found by using this [link](https://github.com/mnunezsa95/se_project_express)
- The project is hosted on at the following domain (https://www.wtwear-mooo.com/). Click this [link](https://www.wtwear.mooo.com/) to view.
- The API (OpenWeather) used in this application can be found by clicking on this [link](https://openweathermap.org/)

### Demo Credentials

Use the following credentials to test out the application

- Demo username: user1@gmail.com
- Demo password: user1

### Plans for Improvement

1. Dynamic Weather Banner:
   Currently, the weather banner changes based on weather conditions. To enhance user experience, I plan to incorporate a feature that adjusts the banner according to the time of day. For instance, during snowy nights, it will display a moon and snow.

2. "Feels Like" Segment:
   Introducing a "feels like" segment to provide users with both the actual temperature in their location and the perceived temperature. This addition aims to offer users more comprehensive weather information.

3. User-Specific Clothing Data:
   Currently, the code displays all clothing data uploaded by all users. To address this, I intend to implement a feature that restricts users to seeing only their uploaded clothes. This change ensures privacy and a more personalized experience for each user.

4. Search Feature:
   Integrate a search feature enabling users to explore weather conditions in different locations, coupled with clothing recommendations tailored to the weather in the chosen destination. This enhancement will transform the app into a versatile tool for travel suggestions, ensuring users are well-prepared for varying climates.
