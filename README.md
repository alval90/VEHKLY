# VEHKLY

VEHKLY is the final product of a semester project at the Technische Hochschule Augsburg.\
Using VEHKLY users are being enabled to easily plan and manage meals they intend to cook
on a weekly basis.

## Starting the App

To start the app it is required to have `Python` and `Node.js` as well as `npm`|`yarn` installed.

### Frontend (./frontend)

For the grading of the semester project, the final frontend build has already been added to the repository. If no changes have been done on the frontend side, the following two steps may be skipped.

1. Install dependencies\
`npm install` or `yarn install`
2. Build application\
`npm run build` or `yarn run build`

### Backend (Root)
3. Set up virtual environment\
`python -m venv venv`\
`. venv/bin/activate`    # Using MacOS/Linux\
`vènv\Scripts\activate`  # Using Windows
4. Install dependencies\
`pip install -r requirements.txt`
6. Start application\
`python manage.py runserver`\
Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in the browser.

7. (optional) Create super user\
`python manage.py createsuperuser`\
Open [http://127.0.0.1:800ß/admin/](http://127.0.0.1:8000/admin/) to manage the database.