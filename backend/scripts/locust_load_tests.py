import time

from locust import HttpUser, between, task

# To run tests 
# 1) Start python venv in Terminal
# 2) Go to scripts folder 
# 3) Run command  'locust -f locust_load_tests.py'
# 4) Open port link and enter total or max # users, how many per step, & url (https://quietquest.my.to/) 
# Watch 8 minute youtube video! (https://youtu.be/SOu6hgklQRA)

class WebsiteUser(HttpUser):
    wait_time = between(1, 5) #time between escalation.

    @task
    def root_page(self):
        self.client.get(url="/")

    @task
    def contact_page(self):
        self.client.get(url="/contact")

    @task
    def feedback_page(self):
        self.client.get(url="/feedback")

    @task
    def firebaseauth_page(self):
        self.client.get(url="/firebaseauth")

    @task
    def signup_page(self):
        self.client.get(url="/firebaseauth/signup")

    @task
    def resetpwd_page(self):
        self.client.get(url="/resetpwd")
