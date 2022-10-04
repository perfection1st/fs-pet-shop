import express from 'express';
import * as fs from 'fs';
import process from 'node:process';

const app = express();
const PORT = 3000;

const pets = {
  file: './pets.json',
  encoding: 'utf-8',
}

app.get('/pets', function(req, res) {
    fs.readFile(pets.file, pets.encoding, function(err, data) {
      if(err) {
        next(err);
      } else {
        res.send(data);
      }
    });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});