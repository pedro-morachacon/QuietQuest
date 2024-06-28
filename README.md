# QuietQuest App Project

Project Team: Miaomiao Shi, Conor McElduff, Jin-Hau Liu, Aisling Cooke, Michael Moyles, Pedro Mora
Chacón.

Supervisor: Dr. Gavin McArdle

## Application Overview
Navigating urban enviroments creates unique challenges for individuals with sensory sensitivities, such as visual difficulties and autism. This web application is designed to seamlessly aid this target group in finding a route through Manhattan that avoids busy and noisy areas. Alongside the application’s primary function of navigation assistance, it boasts advanced features such as heat maps highlighting predicted crowded zones and the ability to store favourited destinations in user accounts. Central to the development strategy of the application was its optimisation for both desktop and mobile platforms, a quality crucial for a travel companion tool.

![QuietQuest routing image](https://github.com/pedro-morachacon/QuietQuest/blob/main/QuietQuest.jpg?raw=true)


----
## Features Summary

1. Noise and Crowd Avoidance Routing
QuietQuest provides routing options that help users avoid noisy and crowded areas. The backend assigns noise/busyness levels to coordinates, clusters high levels to form avoidable areas, and uses OpenRouteService to generate the most efficient and quietest routes. By entering start and end locations, users receive options for the quickest route and a quieter, less crowded path.

2. Real-time Data Visualization
QuietQuest uses historical and real-time data to create heatmaps that display noise and crowd levels. These visualizations help users plan their routes effectively, avoiding busy and noisy areas.

3. Real-time Weather Updates
Current weather conditions are displayed on the main page using data from the OpenWeatherAPI, alongside visual icons from FontAwesome. This feature helps users plan their outings better by staying informed about the weather

4. Efficient and Fast Performance
Built with React JS and Next.js, the app delivers quick loading times and smooth performance. This is crucial for users who might have a lower frustration tolerance and require a responsive application.

5. Peaceful Playlist
A "Peaceful Playlist" feature provides calming music to help users self-regulate during stressful times. This feature is particularly beneficial for users seeking tranquility and mental relaxation.

6. Simple and Clean User Interface
The interface of QuietQuest is designed to be straightforward and uncluttered, avoiding overlapping images, background images, and pop-ups. Prominent interaction buttons with both icons and text make navigation intuitive and stress-free.

7. Accessible Font Choices
The app uses sans serif fonts to enhance readability, especially for users with dyslexia. This choice ensures text is clear and easy to understand, improving accessibility across the board.

8. Interactive Dark View Map
The app includes an interactive map created with React Leaflet and StadiaMaps, featuring a dark view to reduce visual strain. Custom location markers and color-coded routes make navigation easy and visually comfortable.

9. Safe and Secure User Accounts
QuietQuest uses Firebase for secure user authentication, allowing login via Google or a QuietQuest account. Users can safely store and manage their profiles, with added protection against unauthorized access.

10. Personalized Color Scheme
QuietQuest offers a color palette designed specifically for users with ASD, focusing on calming greens and browns while avoiding sensory-overloading yellows. This tailored color scheme helps create a visually soothing experience for all users.

11. Optional Feedback and Support
Users can provide feedback through a structured survey without disruptive pop-ups. There’s also a contact section for users to reach the QuietQuest team directly for support.

12. Secure and Flexible Django Framework
QuietQuest utilizes both Django for backend services. Django handles heat maps, webpage delivery, and routing functionality. Using Django’s MVC architecture, the App provides a flexible environment and with built-in security features, it helps prevent common cyber-attacks and make the backend robust and maintainable.

13. Personalized User Experience with Firebase
QuietQuest utilizes Firebase to manage user accounts and personalized features such as saved destinations and the peaceful playlist. Firebase’s Firestore database allows users to save their peaceful playlist and preferred destinations securely in the cloud. This ensures a personalized and seamless experience, with saved data easily accessible whenever needed.

14. Efficient SQLite3 Database
An SQLite3 database is used due to its simplicity and efficiency for the app's needs. It supports the storage and quick retrieval of busyness data without requiring the complexity of more advanced databases, making it suitable for the current server capabilities.

15. High Test Coverage and Reliability
Unit testing with Pytest ensures the reliability and performance of the Django backend. Tests cover models and views, achieving 99% coverage, which helps maintain a high-quality, dependable application.

16. Data-Driven Insights
The app integrates extensive datasets including taxi trips, noise complaints, and crime data to predict busyness and ensure safe routing. Machine learning models analyze these datasets to provide accurate predictions and improve the user experience.

17. Comprehensive Data Preparation and Clustering
The backend processes and cleans vast datasets to ensure high-quality data for analysis. Clustering algorithms like K-Means are used to identify busier and quieter areas in Manhattan, optimizing the app’s routing and heatmap features.

18. Advanced Machine Learning Models
The app employs supervised and unsupervised machine learning models to predict busyness and enhance routing accuracy. These models are rigorously trained and validated to ensure they provide reliable data for users.

----

## Possible Future Work

We recognised an accessibility oversight: our buttons lack descriptive names for visually impaired users. As screen readers only label them as "buttons”, this limits functionality for those reliant on these technologies. Prioritising inclusivity, our next steps would focus on addressing this issue. By providing clear labels for our buttons, we could ensure QuietQuest is universally accessible. 

In the final QuietQuest application, the user registration supports custom and Gmail sign-ins. Other sign-in methods such as Facebook, Apple ID, and Microsoft accounts could be incorporated to simplify onboarding and cater to a broader audience, highlighting the project’s commitment to inclusivity. 

Although the application allows the user to follow directions as they walk, QuietQuest was limited to the service of OSM and ORS. There is the potential to refine the in-app navigation further to include public transport. NYC Open Data provides a wealth of information on public transit, including such as subway station entry and exit data and bus hourly ridership, which we could use to predict the least crowded of possible routes. 

The NYC Autism Community suggested incorporating a decibel meter to gauge the sound levels in areas users might visit during their journey. While this addition could be complex to implement across a range of devices, it would enhance user experience, offering a more refined navigation aid for individuals using the application. 

A significant evolution for QuietQuest would be the deployment of Docker containers, specifically for ORS. Transitioning to Docker container for our main routing service reduces the dependence on external an API. This change could not only boosts the application’s scalability and reliability but also provides more control over data processing and routing mechanics. This adaptation would aim to offer users a smoother experience, faster response times, and a robust platform for future feature additions.

----

## First Setup
On the first run, you might have to install all the python packages. Inside the *backend* directory run:

### `pip install -r QuietQuest_requirements.txt`

On the first run, you might have to install all the node modules. Inside the *frontend* directory run: 

### `npm install`

In the *backend/quietquestapp* directory, you will need a file called *info.py* that has the API key for open
route service in the format: ors_key = "API_KEY"

Also in the *front/quietquestapp* directory, you will need a file called *.env* that has the API key for Firebase for the user accounts, the API key for OpenWeatherAPI and the API key for StadiaMap in the followingformat: 

Firebase:  
REACT_APP_FIREBASE_API_KEY=...  
REACT_APP_FIREBASE_AUTH_DOMAIN=...  
REACT_APP_FIREBASE_PROJECT_ID=...  
REACT_APP_FIREBASE_STORAGE_BUCKET=...  
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...  
REACT_APP_FIREBASE_APP_ID=...  

OpenWeatherAPI:  
REACT_APP_WEATHER_API_KEY=...

StadiaMap:  
REACT_APP_TILELAYER_API_KEY=...

## Running Production

Inside the *frontend* directory of the project, run:

### `npm run build`

Then, inside the *backend* directory of the project, run:

### `python manage.py collectstatic`

Then run, still inside the *backend* directory:

### `python manage.py runserver`

Open [http://localhost:8000](http://localhost:8000) to view the site in the browser.

## Database Setup
First try the above instructions, if you are getting an error you may have to set up the database rather than just 
pulling it from the branch as the db.sqlite3 database may be empty. This means you may need to populate it yourself 
with the Noise_Lat_Long.csv. 

**DO NOT DELETE** the *__init__.py* file in the directory below.
Start by deleting all the *numbered* files in the *backend/quietquestapp/migrations* directory, e.g. 0001_initial.py.

Then delete the *db.sqlite3* file in the *backend* directory. 

Inside the *backend* directory run each of these commands in the terminal to recreate the database from the data.

Start with running:

### `python manage.py makemigrations`

Then run:

### `python manage.py migrate`

To populate the 3 databases (this may take a lot of time to finish as the files are quiet large), run:

### `python manage.py runscript populate_databases`

The application should have all the data required to run now.
