# bedav scripts

## Contributing

## Prerequisites

1. virtualenv - If you don't have it run `pip3 install virtualenv`
2. Node & npm
3. PostgreSQL

#### Go to your terminal and run the following commands.

### 1. Clone the repository

```
mkdir bedav && \
cd bedav && \
git clone https://github.com/shreyas44/bedav && \
```

### 2. Setup Python Virtual environment

```
pip3 install virtualenv && \
virtualenv . && \
source bin/activate && \
pip install -r requirements.txt && \
```

### 3. Run the scripts to get the initial data

```
cd scripts && \
python bangalore.py && \
python pune.py
```

### 4. Run python api server

```
cd scripts && \
python manage.py runserver
```

### 5. Install node dependencies and build static files

```
npm install && \
npm run build-dev
```

### 6. Run the webpack dev server

```
npm run dev
```

Go to 
- `http://localhost:9000` to view the website!
- `http://localhost:9000/playground` to play with the GraphQL APi

## Finally

- Make your changes
- Run the script
- Check if it works - this can be done either be checking the database directy, using the GraphQL API or checking if the data is updated on the website
- Commit your changes and push it to your fork
- Create a Pull Request!