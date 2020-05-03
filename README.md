<div align="center">
  <img width="128px" src="https://github.com/manjillama/threadly/blob/master/public/static/images/threadly-logo.png"/>
  <br/>

> A simple online story sharing medium like platform built using React and Node.js

</div>

## Setup

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

You can create a .env file in your root project folder and add theses configurations. Be sure to modify the values beforehand. **_Never commit .env file to github._**.

```bash
# If elastic search server is set up
## By default I've disabled all elastic search functions
ELASTIC_SEARCH_HOST = "localhost:9200" # Optional

# Postgres database connection string
DATABASE_URL = "postgres://localhost:5432/sample_db"

# Used for encoding/decoding jwt token
SECRET = ksykd784ndg3399jjnm-338djddkdmdsd91hds-4hdk

# Path to the folder from your local OS root directory for saving images in your local machine
# Make sure to create the folders first
IMAGE_RESOURCE_FOLDER = "/Documents/threadly/images/"

# Resource host | (your local server address)
RESOURCE_HOST = "http://localhost:5000"

```

Live demo [here](https://bit.ly/2zAtaBo)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
