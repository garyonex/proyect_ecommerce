import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import { Server as webSocket } from 'socket.io';
import http from 'http';
// id aleatorios
import { v4 as uuid } from 'uuid';
import { engine } from 'express-handlebars';
import {router as indexRouter} from './routes/index.routes'
const path = require('path');
import Container from './container';
const productos = new Container(path.join(__dirname, './dataBase/products.json'))
//INICIO SERVIDOR
const app = express();
const httpServer = http.createServer(app);
const io = new webSocket(httpServer);
const PORT = 3000;
httpServer.listen(PORT);
console.log(`Servidor en puerto ${PORT}`);

//routes
app.use('/', indexRouter)

//MULTER

const storage = multer.diskStorage({
    destination:  path.join(__dirname, 'public/files'), 
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})
//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(multer({
    storage,
    dest: path.join(__dirname, './public/upload')
}).single('myFile'))

//Seteo - motor de plantilla

app.set('views', path.join(__dirname, 'views'));
app.engine(
    '.hbs',
    engine({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs',
    })
);
app.set('view engine', 'hbs');

//SOCKET
const mensajes = [];

io.on('connection', (socket) => {
    
    console.log(`Nueva conexion cliente ${socket.id}`);
    socket.emit('server:productos', productos)
    console.log(productos)
    socket.emit('server:mensajes', mensajes)

    socket.on('client:chat', (data) => {
        const chat = { ...data, id: uuid() };
        mensajes.push(chat);
        io.sockets.emit('server:chat', chat);
    });
});
