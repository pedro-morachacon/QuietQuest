## First Setup
On the first run, you might have to install all the python packages. Inside the root *QuietQuest* directory run:

### `pip install -r pip_QuietQuest_requirements.txt`

On the first run, you might have to install all the node modules. Inside the *frontend* directory run: 

### `npm install`

Also in the *backend/quietquestapp* directory, you will need a file called *info.py* that has the API key for open
route service. If you don't have it, Michael can give it to you.

## Development Testing

2 terminal windows are needed to run the application

In the 1st terminal window, you need to be inside the *backend* directory of the project, you run:

### `python manage.py runserver`

In the 2nd terminal window, you need to be inside the *frontend* directory of the project, you run:

### `npm run dev`

Both of these terminal windows have to be running at the same time

Open [http://localhost:3000](http://localhost:3000) to view the site in the browser.
(http://localhost:8000 might not always work)

## Database Setup
First try the above instructions, if you are getting an error you may have to set up the database rather than just 
pulling it from the branch as the db.sqlite3 database may be empty. This means you may need to populate it yourself 
with the Noise_Lat_Long.csv. Inside the *backend* directory run each of these commands in terminal.

Start with running:

### `python manage.py makemigrations`

Then run:

### `python manage.py migrate`

To populate the database (this may take up to 20 minutes to finish), run:

### `python manage.py runscript scv_storing_script`

The application should have all the data required to run now