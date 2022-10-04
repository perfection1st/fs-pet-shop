import * as fs from 'fs';
import process from 'node:process';

const pets = {
  file: './pets.json',
  encoding: 'utf-8',
  commands: process.argv.slice(2),
  usage: 'Usage: node pets.js [read [INDEX] ] | create | update | destroy]',

  fromJSON: function(data) {
    let output = JSON.parse(data);
    return output;
  },

  toJSON: function(data) {
    let output = JSON.stringify(data);
    return output;
  },

  run: function() {
    // Access the file
    fs.readFile(this.file, this.encoding, function(err, data) {
      if(err) {
        console.error(`Could not read ${this.file}`);
      } else {
        pets.data = pets.fromJSON(data);
      }

    });

    // Run the appropriate command on the file
    switch(this.commands[0]) {
      case 'read':
        this.read();
        break;
      case 'create':
        this.create();
        break;
      default: 
      console.error('Invalid command entered', this.usage);
    }
  },

  read: function() {
    fs.readFile(this.file, this.encoding, function(err, data) {
      if(err) {
        console.error(`Could not read ${this.file}`);
      } else {
        let petsObj = pets.fromJSON(data);
        let index = pets.commands[1];
        if(pets.commands.length === 2) {
          (typeof pets.data[index] === 'undefined') ? console.error(`The pet doesn't exist at ${index}, please enter a valid index (starts at index 0). ${'\n'}${pets.usage}`) : console.log(pets.data[index]);
        } else {
          console.log(petsObj);
        }

      }
    });
  }
};


(pets.commands.length === 0) ? console.error(pets.usage) : pets.run();