var config = require('./config/config.json'),
    server = require('./server/server');

config.PORT = process.env.PORT || config.PORT;

server.run(config);
