# Mongo + Node lab: Pantry app

### Assignment
Build a Node/Express/Mongo CRUD app that keeps track of what you have in your pantry. Your DB entries will look like this:

`{food: "carrot", type: "vegetable"}`

`{food: "apple", type: "fruit"}`

Build the interface to:
- List all food in your pantry
- Add a new food
- Find a food
- Delete a food
- Update a food

# Directions:

### Files
- In a directory `mongo-node-express-lab`, create two directories, `frontend` and `backend`
- In `frontend`, touch `index.html` and `main.js`
- In `backend`, touch `app.js` and a `.gitignore` (you know what to write in here - `node_modules`)

### Packages
- Set up the basics of your files.
- You will need all the normal packages: nodemon, express, cors, body-parser, mongodb, MongoClient; go ahead and npm init/require/install these.

### Terminal
- You'll need 4 terminal tabs open at the same time
- 1: run `mongod` from anywhere
- 2: run `mongo` from anywhere
- 3: navigate to your backend & run `nodemon app.js`; then in your browser navigate to 3000
  - If you get error nodemon command not found it means you haven't installed it, `npm install nodemon -g`
- 3: navigate to your frontend & run `http-server`; in your browser navigate to 8080

### In the `mongo` terminal
- Create & switch your db using the `use` command
- Use `insert` to add a few entries to play with: `db.contacts.insert({name:'liza', email:'liza@ga.co'})`

### Start coding
- Frontend: Start by building the HTML, creating event listeners & setting up AJAX calls.
- Backend: Create your routes
- For now, leave them empty except for `responses`; something like: `response.json({"description":"this is the root route"});`
- Frontend: fill out your AJAX calls and see if you can make calls to the  routes & get back the appropriate `response`
- If you have all that setup, you can start filling in the Mongo stuff.
