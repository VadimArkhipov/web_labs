import express from 'express';
import https from 'https';
import routes from './routes.js';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { Server } from "socket.io";
import Rollbar from 'rollbar';



let rollbar = new Rollbar({
    accessToken: 'SECRET_KEY',
    captureUncaught: true,
    captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar


export let rollbarJournal = rollbar;



const app = express();
const corsOptions = {
    'credentials': true,
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
}

app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

//
//const moduleURL = new URL(import.meta.url);
//const __dirname = path.dirname(moduleURL.pathname);
//

app.use('/', routes);
//app.set('view engine', 'pug');

//Родная сборка
app.use(express.static('./src/public'));
app.use(express.static('./src/public/userPics'));
//app.set('views', './src/public/views');

//Gulp
// server.use('/gulp', express.static('C:\\Users\\user\\WebstormProjects\\lab3\\build_gulp'));
// server.set('views', 'C:\\Users\\user\\WebstormProjects\\lab3\\build_gulp\\views');

//Webpack
//server.use('/webpack', express.static('C:\\Users\\user\\WebstormProjects\\lab3\\build_webpack'));
//server.set('views', 'C:\\Users\\user\\WebstormProjects\\lab3\\build_webpack\\views');


const host = '127.0.0.1';
const port = 7000;

const server = https
    .createServer(
        {
            key: fs.readFileSync('./src/certificate/privateKey.key'),
            cert: fs.readFileSync('./src/certificate/certificate.crt'),
        },
        app
    );

const io = new Server(server,  { cors: {origin : '*'}})
io.on('connection', (socket)=>{
    console.log('user connected');

    socket.on('disconnect', function (){
        console.log('user disconnected');
    });

    socket.on('message', message=> {
        console.log(`MessageReceived: ${message}`);
        io.emit('message', {type: 'new-message', text: message});
    });
});

server.listen(port, host, function () {
    console.log(`Server listens https://${host}:${port}`);
});

