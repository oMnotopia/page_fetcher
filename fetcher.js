const request = require('request');
const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

//Get the two arguments provided by the user;
const args = process.argv.slice(2);

//Users first argument is webpage to be downloaded
const downloadData = () => {
  request(`${args[0]}`, (err, response, body) => {
    if (err) console.log('error:', err);
  
    fs.writeFile(`${args[1]}`, body, err => {
      if (err) {
        console.log(err);
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`);
    });
    
  });
};

//If the file already exists ask the user if they want to overwrite it.
//If the file doesn't exist create the filename provided and write to it.
if (fs.existsSync(args[1])) {
  const rl = readline.createInterface({ input, output });
  rl.question("The file already exists. If you want it to be overwritten type 'y', otherwise hit any other key: ", (answer) => {
    if (answer !== 'y') {
      console.log("File was not overwritten. Exiting application");
      rl.close();
      return;
    }
    downloadData();
    rl.close();
  });
} else {
  downloadData();
}





