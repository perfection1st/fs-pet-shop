import { application, request } from 'express';
import express, { json } from 'express';
const PORT = 9000;
import pg from "pg";
const { Client } = pg;
const connectionString = 'postgres://postgres:postgrespw@localhost:49153/petshop';

const client = new Client({
    connectionString: connectionString
});

const app = express();
client.connect();

app.use(json());


// /pets 
app.route('/pets')
.get((req, res) => {
    client.query('SELECT * FROM pet')
    .then(result => {
        res.send(result.rows);
    });
})
.post((req, res) => {
    const {pet_name, pet_kind, pet_age} = req.body;
    client.query('INSERT INTO pet (pet_name, pet_kind, pet_age) VALUES ($1, $2, $3)', [pet_name, pet_kind, pet_age], 
    (error, results) => {
        if (error) {
          throw error
        }
        res.status(201).send(`Pet added`)
      });
});

//  /pets id
app.route('/pets/:pet_id')
.get((req, res) => {
    client.query(`SELECT * FROM pet WHERE pet_id = ${req.params.pet_id}`)
    .then(result => {
        result.rows.length < 1 ? res.send('Cannot find that pet! Sorry broski. Maybe you should AskJeff :P') : res.send(result.rows);
    });
})
.patch((req, res) => {
    client.query(`UPDATE pet SET pet_name = '${req.body.pet_name}' WHERE pet_id = ${req.params.pet_id}`)
    .then(result => {
        res.status(201).send(`Pet name updated`);
    })
    .catch(error => {
        console.error(error);
    });
})
.delete((req, res) => {
    client.query(`DELETE FROM pet WHERE pet_id = ${req.params.pet_id}`)
    .then(() => {
        res.status(200).send('Pet deleted');
    })
    .catch(error => {
            console.error(error);
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to the pet shop API!');
});

app.listen(PORT, (req, res) => {
  console.log('listening on port ' + PORT);
});