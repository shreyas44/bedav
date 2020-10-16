# bedav API

The GraphQL Schema Definition can be accessed at `/api/schema.graphql`

## Contributing

Go to your terminal and run the following commands.

## Prerequisites

1. virtualenv - If you don't have it run `pip3 install virtualenv`
2. Node & npm
3. PostgreSQL

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

### 3. Run scripts to get initial data

```
cd scripts && \
python bangalore.py && \
python pune.py && \
cd ..
```

### 4. Run python api server

```
cd api && \
python manage.py runserver
```

To test the API and play around with it, go to `http://loclahost:8000/playground`

If you want to test the API on the site, then follow the steps below on top of the above steps

### 1. Install node dependencies and build static files

```
npm install && \
npm run build-dev
```

### 2. Run the webpack dev server

```
npm run dev
```

Go to `http://localhost:9000` to view the website!


**Make your changes, commit, push to your fork and create a Pull Request!**
