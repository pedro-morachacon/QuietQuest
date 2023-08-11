## First Setup
On the first run, you might have to install all the python packages. Inside the *backend* directory run:

### `pip install -r QuietQuest_requirements.txt`

On the first run, you might have to install all the node modules. Inside the *frontend* directory run: 

### `npm install`

Also in the *backend/quietquestapp* directory, you will need a file called *info.py* that has the API key for open
route service in the format: ors_key = "API_KEY"

## Running Production

Inside the *frontend* directory of the project, run:

### `npm run build`

Inside the *backend* directory of the project, run:

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
