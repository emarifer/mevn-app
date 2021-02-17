# mevn-project

## Project setup
```
npm i
```

### Compiles and minifies for production
```
npm run build
```
------------

##### If you want to run the application on another server that is not local, you must change the baseURL of the main.js file located in the path "mevn-project / src / app /":
```
axios.defaults.baseURL = 'http://localhost:3000/api';
```

##### by the URL where our NodeJS server is running.
------------

##### You need to create an .env file that stores the environment variables required by the DB (DB username, password and DB name):
```
USER_NAME=xxx
PASSWORD=xxx
DBNAME=xxx
```
##### that are valid in our database created in MongoDB Atlas.
