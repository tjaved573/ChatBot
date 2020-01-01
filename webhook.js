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

app.get('/webhook', (req, res) => {  // The server response functions are stored in the res parameter; How server responds
                                // req is a variable that stores all the information for the incoming request from the client

  let challenge = req.query['hub.challenge'];
  let verify_token = "thegoldentux";
  if (req.query['hub.mode']=== 'subscribe' && req.query['hub.verify_token'] === verify_token){
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge); // 200 - OK, return challenge if tokens match
  }else {
    res.sendStatus(401);  // Unauthorized token,
  }
});

app.post('/webhook', (req, res) => {
  console.log("request body = ",req.body);
  if (req.body.object === 'page'){    // checks if this is an event from a page subscription
    req.body.entry.forEach((entry) => {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      // entry.messaging.forEach((event) => {
      //   if (event.message && event.message.text) {
      //     sendMessage(event);
      //   }
      // });
    });
    res.status(200).send('EVENT_RECEIVED');   // OK response
  } else{
    res.sendStatus(404);  // PageNotFound token
  }
});