require('dotenv').config({ path: '.env' });

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// decode the JWT so we can get the user id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

// create a middleware that populares the user on each request
server.express.use(async (req, res, next) => {
  // if the aren't logged in, skip this
  if (!req.userId) return next();

  const user = await db.query.user({ where: { id: req.userId } }, '{id, permissions, email, name}');
  req.user = user;
  return next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  details => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Server is now running on port http:/localhost:${details.port}`);
  }
);
