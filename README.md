<div align="center">
  <img width="128px" src="https://github.com/manjillama/threadly/blob/master/public/static/images/threadly-logo.png"/>
  <br/>

> A simple online story sharing medium like platform built using React and Node.js

</div>

## Installation

- Clone the repository.

  ```bash
  $ git clone https://github.com/manjillama/threadly.git
  ```

- Navigate to `root` and `client` directory and install the dependencies.

  ```bash
  $ npm install
  ```

- Run in development mode

  ```bash
  $ npm run dev
  or
  $ yarn dev
  ```

- Build react client project for production

  ```bash
  $ npm run build:react
  or
  $ yarn build:react
  ```

- Run in production mode

  ```bash
  $ npm run start
  or
  $ yarn start
  ```

## Set environment variables

You can create a .env file in your root project folder and add theses configurations. Be sure to modify the values beforehand.

```python
# If elastic search server is set up
## By default I've disabled all elastic search functions
ELASTIC_SEARCH_HOST = "localhost:9200" # Optional

# Postgres database connection string
DATABASE_URL = "postgres://localhost:5432/sample_db"

# Run the project in development mode, no environment variable needed for production
MODE = "dev"

# Used for encoding jwt token
SECRET = "ksykd784ndg3399jjnm-338djddkdmdsd91hds-4hdk"

# Path to the folder from your local OS root directory for saving images in your local machine
# Make sure to create the folders first
IMAGE_RESOURCE_FOLDER = "/Documents/threadly/images/"

# Resource host
RESOURCE_HOST = "http://localhost:5000"

```

## Cors support for client-side development

```javascript
/*
Add cors support for local development
In index.js file, replace
*/
const origins = [];
// with
const origins = ["http://localhost:3000"];
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
