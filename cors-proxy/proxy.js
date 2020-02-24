// JavaScript CORS Proxy
// Save this in a file like cors.js and run with `node cors [port]`
// It will listen for your requests on the port you pass in command line or port 8080 by default
const port = process.argv.length > 2 ? parseInt(process.argv[2]) : 8081 // default
const corsProxy = require('cors-anywhere')
corsProxy
  .createServer()
  .listen(port, 'localhost',() => {
    console.log('Running CORS Anywhere on',port)
  })
