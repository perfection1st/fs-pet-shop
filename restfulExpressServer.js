const { application } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const PORT = 9000;

app.get('/pets', (req, res) => {
    res.send("hello world!");
})

app.get('/pets/:id', (req, res) => {
    fs.readFile('./pets.json', 'utf8', function(err, petsJSON) {
        let pets = JSON.parse(petsJSON);
        if (err) {
                console.log(err);
                res.status(500)
                res.send(err);
        }     
        else if (!pets[req.params.id]){
                res.status(404)
                res.send(err);
        }
        else {
            var petsData = JSON.stringify(pets[req.params.id]);
            res.status(200);
            res.send(petsData);
        }
    });
});

app.patch('/pets/:id', function(req, res) {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
        console.log(req.params)
        console.log(req.body);
              if (err) {
                  console.log(err)
              }
              else {
                let pets = JSON.parse(data);
                console.log(pets);
                for(var i = 0; i < pets.length; i++) {
                      if (req.body.name != null && pets[i].name != null) {
                        pets[req.params.id].name = req.body.name;
                        res.status(200);
                        res.send(JSON.stringify(pets));
                        process.exit();
                    }
                    else {
                        console.log('input not found');
                    }
                }
                
              }
    }) 
});



app.post('/pets', (req, res) => {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
        console.log(req.body);
              if (err) {
                  console.log(err)
              }
              else {
                let pets = JSON.parse(data);
                console.log(pets);
                pets.push(req.body)
                res.status(200);
                res.send(JSON.stringify(pets));
                process.exit();
              }
          }) 
    })
    
app.listen(PORT, (req, res) => {
  console.log('listening on port ' + PORT);
})