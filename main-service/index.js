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
 
server.listen(process.env.MAIN_SERVICE_PORT | 5003, () => {
  console.log('Main Service is listening at %s', server.url);
});