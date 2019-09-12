
# Node 


## What is Node
- Node is similar to the backend of Rails (when paired w/Express)
- Node receives requests and accesses a DB 
- What's special about node
  - Until Node you had to use a server-side language to write server code 


---


## Getting started 

Install Node through homebrew (only do this once)
- `brew install node` 

Upgrade Node (do this often)
- `brew upgrade node`
- `node -v`

Begin a node project (do this every time you begin a new app)
- `npm init` 

Explore what this command generates ^
- `package.json`, etc.

Entry point file
- Usually `server.js`, `index.js`, `app.js`

The `npm install` command
- What it does: reads your package.json and installs the list of packages
- When to use it  
  - When you clone someone else's repo
  - Or you can delete your `node_modules` and `npm install` anew 

Touch a git ignore
- Then put `node_modules` in it 
- Never push your `node_modules` up
- If someone clones, they should `npm install`


---


## REPL
- Repeat Evaluate Print Loop 
- Type in JS directly
- Or run a .js file 


---


## Modules/Packages & NPM

**3 Kinds of modules**
1. Built in
1. Packages downloaded from npm 
1. Modules/packages you build yourself! 


---


**1- Built-in Modules**
- Node has 35+ built-in packages
- These ship with Node when you install it
- Simple `require` them in your file  


---

**2- You can build your own node module & put it up on NPM!**


---


**3- Packages from npm**
- There are like a million 
- Packages that other people have built 
- Install through Node Package Manager (npm)

**Ways to install packages: Global, local, dev**
- Globally on your machine: `npm install <package-name>`
- Local to your node app: `npm install <package-name> --save`
- Package you'll only use while developing: `npm install <package-name> --save-dev` 

**Uninstall a package:**
- Global: `npm uninstall <package name> -g` 
- Local: `npm uninstall <package name> --save`

**Common packages for a CRUD app**
- http
- cors
- body-parser
- express
- mongodb
- request
- nodemon
- path

**How to `require` packages in a file** 
- Check out the demo app 

