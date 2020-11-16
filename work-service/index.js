const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const dbURL = process.env.DATABASE_URL;
const dbName = 'Task';

const cors = corsMiddleware({  
  origins: ["*"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"]
});

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);  
server.use(cors.actual);

MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  const col = client.db(dbName).collection('work');

  server.get('/', (req, res, next) => {
    col.find().toArray((err, items) => {
      return res.json(200,{items});
    })
  });

  server.post('/', (req, res, next) => {
      col.insertOne(req.body,(err, response) => {
        if(err) throw err;
        col.find().toArray((err, items) => {
          return res.json(200,{items});
        })
      })
  });

  server.put('/', (req, res, next) => {
    col.updateOne({_id : ObjectId(req.body.id)},{$set: {completed: req.body.value}},(err, resp) =>{
      if(err) throw err;
      col.find().toArray((err, items) => {
        return res.json(200,{items});
      })
    })
  })

  server.del('/', (req, res, next) => {
    console.log(req.body)
    col.deleteOne({_id:ObjectId(req.body.id)},(err, resp) => {
      if(err) throw err;
      col.find().toArray((err, items) => {
        return res.json(200,{items});
      })
    })
  });
  
});
 
server.listen(process.env.WORK_SERVICE_PORT | 5001, () => {
  console.log('Work Service is listening at %s', server.url);
});