//import and export from FILES, import this with require function, requires string, which is either a relative path to file, or the name of the module, require tells node js to import from file system 
const fs = require('fs');

const userName = 'Max';

//write path creates the path, creating a text file, define the data, third argument is the callback to be executed once the function is done, in this case an error object, if it's truthy it will log the error 
fs.writeFile('user-data.txt', 'Name: ' + userName, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('WROTE FILE');
});

//when you console log node node1.js it will execute the code written above, userdata text file with data passed into the writeFile function, after being given access to the file system 
