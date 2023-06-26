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