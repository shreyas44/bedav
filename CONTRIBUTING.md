# Prerequisites

1. Node & npm
2. Docker and Docker hub

# Contributing

### 1. Fork the repository

### 2. Clone the forked repository

  Run the below code to clone the forked repository

  ```
  git clone https://github.com/<your-username>/bedav
  ```

### 3. Create a new branch

  To create a new branch run `git branch <branch_name>`. The branch name is often the feature/fix you'll be working on in the branch. After creating the new branch run `git checkout <branch_name>` to switch to that branch.

### 4. Setup dev environment

#### Install npm dependencies for the website and create a development build of it
```
cd website && npm install && npm run build-dev && cd ..
```

#### Create and run docker containers
```
docker-compose up -d
```

You can run `docker-compose logs` to view the logs from all the docker containers.

Once the containers are built and running, you can go to `http://localhost/` to view the website, `http://localhost/playground` to view the GraphQL Playground.

To stop the docker containers run `docker-compose down`.

When you run `docker-compose up` and `docker-compose down` make sure you're in the root directory of the project.

*Note: the first time you run docker-compose up, the docker images will have to be built, which may take a while*

### Optional

If you have access to Google Maps API keys, then you can go to `website/map.dev.env` and set `MAPS_API_KEY` to your Google Maps API key to view a complete version of the Google Maps on the website. 

### 5. Make, commit and push your changes

To commit your changes run `git commit <commit_message>`. The commit message should give a brief description on the changes you've made. To push your changes to GitHub run `git push origin <branch_name>`.

### 6. Create a Pull Request

## Project Structure

There are three parts to the project

1. [API](/api) - A GraphQL API which provides access to the data in the database
2. [Scripts](/scripts) - Python scripts which scrape hospital data and the availability of beds from websites, get additional data of the hospitals such as co-ordinates, phone number and website and add it to the database
3. [Website](/web) - The front end website responsible for representing the data provided by the GraphQL API

To learn more about each project headover to their respective directories.
