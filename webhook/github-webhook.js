var secret = '12345678'; // Ваш секретный ключ из Настроек в GitHub
var repo = '/home/ec2-user/strapi-2/'; // Путь к корневой папке вашего проекта Strapi на сервере

const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const PM2_CMD = 'cd ~/strapi-2 && ~/.nvm/versions/node/v20.12.2/bin/npm run build && pm2 startOrRestart ecosystem.config.js';

http.createServer(function(req, res) {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', function() {
      let sig = 'sha1=' + crypto.createHmac('sha1', secret).update(data).digest('hex');
      if (req.headers['x-hub-signature'] == sig) {
        exec(`cd ${repo} && git pull && NODE_ENV=production ${PM2_CMD}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        });
      }
    });
  }
  res.end();
}).listen(8080);
