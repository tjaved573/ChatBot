const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const server = app.listen(PORT, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
    console.log('Address of server is ', server.address());
  });

app.get("/hello", (req, res) => {
  console.log("Req variable has value ", req);  // The server response functions are stored in the res parameter;
                        // req is a variable that stores all the information for the incoming request from the client
  res.send("Hello world");
});



