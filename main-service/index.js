const restify = require('restify');
const axios = require('axios');
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({  
    origins: ["*"],
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"]
});

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);  
server.use(cors.actual);

const url = {
    personalServiceURL: `http://${process.env.PERSONAL_SERVICE_URL}`,
    workServiceURL: `http://${process.env.WORK_SERVICE_URL}`,
    homeServiceURL: `http://${process.env.HOME_SERVICE_URL}`
}

// const url = {
//     personalServiceURL: `http://localhost:5000`,
//     workServiceURL: `http://localhost:5001`,
//     homeServiceURL: `http://localhost:5002`
// }

function getIndividualValues(values){
    let completedCount = 0;
    values.forEach(value => {
        if(value.completed){
            completedCount++;
        }
    })
    return { total: values.length, completed: completedCount, inCompleted: values.length - completedCount };
}

server.get('/', async (req, res, next) => {
    const personalTasks = await axios.get(`${url.personalServiceURL}`).then(response => response.data.items);
    const workTasks = await axios.get(`${url.workServiceURL}`).then(response => response.data.items);
    const homeTasks = await axios.get(`${url.homeServiceURL}`).then(response => response.data.items);
    const personalResults = getIndividualValues([...personalTasks, ...workTasks, ...homeTasks]);
    return res.json(200,personalResults);
});

server.get('/home-service',async(req,res,next) => {
    const response = await axios.get(`${url.homeServiceURL}`).then(response => response.data.items);
    return res.json(200,response);
})

server.post('/home-service',async(req,res,next) => {
    const response = await axios.post(`${url.homeServiceURL}`,req.body).then(response => response.data.items);
    return res.json(200,response);
})

server.put('/home-service',async(req,res,next) => {
    const response = await axios.put(`${url.homeServiceURL}`,req.body).then(response => response.data.items);
    return res.json(200,response);
})

server.del('/home-service',async(req,res,next) => {
    const response = await axios.delete(`${url.homeServiceURL}/${req.body.id}`).then(response => response.data.items);
    return res.json(200,response);
})

server.get('/work-service',async(req,res,next) => {
    const response = await axios.get(`${url.workServiceURL}`).then(response => response.data.items);
    return res.json(200,response);
})

server.post('/work-service',async(req,res,next) => {
    const response = await axios.post(`${url.workServiceURL}`,req.body).then(response => response.data.items);
    return res.json(200,response);
})

server.put('/work-service',async(req,res,next) => {
    const response = await axios.put(`${url.workServiceURL}`,req.body).then(response => response.data.items);
    return res.json(200,response);
})

server.del('/work-service',async(req,res,next) => {
    const response = await axios.delete(`${url.workServiceURL}/${req.body.id}`).then(response => response.data.items);
    return res.json(200,response);
})

server.get('/personal-service',async(req,res,next) => {
    const response = await axios.get(`${url.personalServiceURL}`).then(response => response.data.items);
    return res.json(200,response);
})

server.post('/personal-service',async(req,res,next) => {
    const response = await axios.post(`${url.personalServiceURL}`,req.body).then(response => response.data.items);
    return res.json(200,response);
})

server.put('/personal-service',async(req,res,next) => {
    const response = await axios.put(`${url.personalServiceURL}`,req.body).then(response => response.data.items);
    return res.json(200,response);
})

server.del('/personal-service',async(req,res,next) => {
    const response = await axios.delete(`${url.personalServiceURL}/${req.body.id}`).then(response => response.data.items);
    return res.json(200,response);
})

server.listen(process.env.MAIN_SERVICE_PORT | 5003, () => {
  console.log('Main Service is listening at %s', server.url);
});