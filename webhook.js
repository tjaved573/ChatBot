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

app.get('/', (req, res) => {  // The server response functions are stored in the res parameter; How server responds
                              // req is a variable that stores all the information for the incoming request from the client

                              // res.send("Correct page loaded");
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'thegoldentux'){
    res.status(200).send(req.query['hub.challenge']); // 200 - OK
  }else {
    res.status(403).end();  // 403 - Forbidden
  }
});

app.post('/', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page'){
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }

});