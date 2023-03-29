const express = require("express");
const session = require("express-session");
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");

const RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");

dotenv.config();

const { SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(
  session({
    store: new RedisStore({ client: new Redis() }), // Use Redis to store session data
    secret: SESSION_SECRET, // A secret key used to sign the session ID cookie
    name: "sid", // Name of the session ID cookie
    resave: false, // Do not save the session if it was not modified
    saveUninitialized: true, // Save uninitialized sessions (i.e., new and not modified)
  })
);

// Add middleware to log requests in the console
app.use(logger("dev"));

app.post("/create", require("./controllers/create"));
app.post("/verify", require("./controllers/verify"));

app.listen(3002, () => {
  console.log("Server started on port 3002");
});
