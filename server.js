const express = require('express'); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// the 3 amigas: rachel, rita, nacy
// function logger(req, res, next) {
//   console.log(`${req.method} Request to ${req.originalUrl}`);
//     next();
// }


// middleware
server.use(express.json()); // built in middleware
// server.use(morgan("dev"));

// adding helmet
server.use(helmet());
server.use(logger);

// routes - endpoints
server.use("/api/hubs", logger, gatekeeper("mellon"), hubsRouter);

server.get('/', logger, greeter, gatekeeper("notto"),(req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function greeter(req, res, next) {
  req.cohort = "Web 26";

  next();
}

// the 3 amigas: rachel, rita, nacy
function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
    next();
}

//  Luis example  - working now
// added gatekeeper to endpoint
function gatekeeper(guess){
  return function (req, res, next) {
    const password = req.headers.password;
      console.log("gk headers", req.headers);

      if(password && password.toLowerCase() === guess) {
        next();
      } else {
        res.status(401).json({ you: "shall not pass!" })
      }
  }
}



// my example - worked (from training kit) but not as secure

// function atGate(req, res, next) {
//   console.log('At the gate');
//   next();
// }

// function auth(req, res, next) {
//   if(req.url === '/mellon') {
//     next();
//   } else {
//     res.send('You shall not pass')
//   }
// }

// server.use(atGate);
// server.use(logger);

// server.get('/mellon', auth, (req, res) => {
//   console.log('Gate Opening...');
//   console.log('Inside');
//   res.send('Welcome Traveler - you passed');
// })
