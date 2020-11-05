const fs = require('fs');

fs.copyFileSync('./.env.production', './dist/.env.production')
fs.copyFileSync('./.env.development', './dist/.env.development')
fs.copyFileSync('./.env.test', './dist/.env.test')