# bedav website

## Contributing

### Prerequisites

1. virtualenv - If you don't have it, run `pip3 install virtualenv`
2. node & npm
3. PostgreSQL

#### Go to your terminal and run the following commands

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

### 3. Run Scripts to Get initial data

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

### 5. Install node dependencies and build static files

```
npm install && \
npm run build-dev
```

### 6. Run the webpack dev server

```
npm run start
```

Go to `http://localhost:9000` to view the website!

**Make your changes, commit, push to your fork and create a Pull Request!**
