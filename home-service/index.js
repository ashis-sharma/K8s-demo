const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const dbURL = `mongodb://${process.env.DATABASE_URL}:27017`;
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
  const col = client.db(dbName).collection('home');

  server.get('/', (req, res, next) => {
    col.find().toArray((err, items) => {
      return res.json(200,{items});
    })
  });

  server.post('/', (req, res, next) => {
    col.insertOne(req.body,(err, resp) => {
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
    col.deleteOne({_id:ObjectId(req.body.id)},(err, resp) => {
      if(err) throw err;
      col.find().toArray((err, items) => {
        return res.json(200,{items});
      })
    })
  });
  
});
 
server.listen(process.env.HOME_SERVICE_PORT | 5002, () => {
  console.log('Home Service is listening at %s', server.url);
});