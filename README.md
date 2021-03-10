
# Picfolio

## Installation Instructions
````javascript
// Clone this repo 
git clone https://github.com/solidsnacks/Picfolio.git

// Change to Picfolio directory
cd Picfolio

// Install server dependencies in Picfolio root directory
npm install

// Change into client folder
cd client

// Install client dependencies
npm install

// Go back to root directory
cd ..

// Create your own /config/default.json file
// Note: mongoURI can be for remote database or local mongoDB instance
// Note: tokenSecret can be any string, like "mysecret"
{
  mongoURI: 'YOUR_MONGO_URI',
  tokenSecret: 'SOME_TOKEN_SECRET'
}

// Run server and client concurrently
// server will run on http://localhost:5000
// client will run on http://localhost:3000
npm run dev
````


## Testing Instructions
````javascript
// Make sure Picfolio and MongoDB are installed

// Start local MongoDB instance in any terminal directory
mongod

// Run test script in Picfolio root directory
npm run test

// Mocha test suite will now run
````

## Misc Documentation
-----
![picfolio app architecture diagram](https://i.imgur.com/a4cOlNd.png)
