const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const fs = require("fs");


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3001;

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('new-message', (message) => {
        console.log('message: ', message);

        fs.appendFile('text.txt', message, (error) => {
            if (error) throw  console.log('error', error); // если возникла ошибка
            console.log("Запись файла завершена. Содержимое файла:");
            fs.readFile('text.txt','utf-8', (err, data) => {
                console.log('data:', data);

                if (data) {
                    socket.emit('answer', data);
                } else {
                    socket.emit('answer', err);
                }
            });
        });
    });

    socket.on('get-message', () => {
      console.log(6666);
        fs.readFile('text.txt', 'utf-8', (err, data) => {
            console.log('dataBack:', data);
            if (data) {
                socket.emit('get-message', data);
            } else {
                socket.emit('get-message', err);
            }
        })
    });

    socket.on('clear', (message) => {
        console.log('message4444: ', message);

        fs.writeFile('text.txt', message, (error) => {
            if (error) throw  console.log('error', error); // если возникла ошибка
            console.log("очистка файла завершена. Содержимое файла:");
            fs.readFile('text.txt','utf-8', (err, data) => {
                console.log('file:', data);
                if (data) {
                    socket.emit('answer', data);
                } else {
                    socket.emit('answer', err);
                }
            });
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.....');
    });

});

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
