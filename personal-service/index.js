const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const dbURL = `mongodb://${process.env.DATABASE_URL}:27017`;
// const dbURL = `mongodb://127.0.0.1:27017`;
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
  console.log("DB Connected");
  const col = client.db(dbName).collection('personal');

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

  server.del('/:id', (req, res, next) => {
    col.deleteOne({_id:ObjectId(req.params.id)} , (err, resp) => {
      if(err) throw err;
      col.find().toArray((err, items) => {
        return res.json(200,{items});
      })
    })
  });

});

server.listen(process.env.PERSONAL_SERVICE_PORT | 5000, () => {
  console.log('Personal Service is listening at %s', server.url);
});