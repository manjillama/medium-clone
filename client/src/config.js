let SERVER_URL = "/";

if (process.env.REACT_APP_ENV === "dev") SERVER_URL = "http://localhost:5000/";

export default {
  BASE_URL:
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    window.location.port,
  SERVER_URL
};
