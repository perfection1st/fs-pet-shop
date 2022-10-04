import * as http from 'http';
import * as fs from 'fs';


let server = {
  port: '3000',  
  hostname: '127.0.0.1',
  isRunning: false,
  command: process.argv.slice(2),

  create: function() {
      http.createServer((req, res) => {
        fs.readFile('./pets.json', 'utf-8', function(err, petsJSON) {
          if(req.url === '/pets') {
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSON);
          } else if(req.url === '/pets/1') {
            let petsObj = JSON.parse(petsJSON);
            let index = petsObj[0];
            res.end(JSON.stringify(index));
          } else if(req.url === '/pets/2') {
            let petsObj = JSON.parse(petsJSON);
            let index = petsObj[1];
            res.end(JSON.stringify(index));
          }
        });
      }).listen(server.port, () => {console.log(`Server listening on ${server.port}`)});
  }
}

server.create();