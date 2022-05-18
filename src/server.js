import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './route/web';
import socketIoController from './controllers/socketIoController';
import cronJob from './controllers/cronJob';
var cookieParser = require('cookie-parser');
var cron = require('node-cron');

require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();

// tạo 1 sever socketio
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config web
configViewEngine(app);

// Cron job
cron.schedule('*/1 * * * *', async() => {
    await cronJob.cronParity(io);
    await cronJob.cronMiniGame(io);
}, {
    scheduled: true,
    timeZone: 'Asia/Ho_Chi_Minh'
});

cron.schedule('3-39/4 * * * * *', async() => {
    // await cronJob.botJoinMiniGame(io);
}, {
    scheduled: true,
    timeZone: 'Asia/Ho_Chi_Minh'
});

// init route
initWebRoutes(app);

// Check xem ai connect vào server
socketIoController.sendMessageAdmin(io);

server.listen(port, () => {
    console.log("Connected success port: " + port);
});