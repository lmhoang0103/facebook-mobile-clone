require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mainRouter = require('./routes/index');
const {
    MONGO_URI,
    MONGO_DB_NAME,
    PORT,
    SOCKET_PORT,
    MONGO_USER,
    MONGO_PASS,
} = require('./constants/constants');
const bodyParser = require('body-parser');
const app = express();
// const app2 = express();
const http = require('http');
const chatServer = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(chatServer);
const jwt = require('jsonwebtoken');
const chatController = require('./controllers/Chats');
const { Socket } = require('dgram');
const notificationController = require('./controllers/Notification');
// const MessageModel = require("../models/Messages");

// connect to mongodb
mongoose
    .connect(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        user: MONGO_USER,
        pass: MONGO_PASS,
        dbName: MONGO_DB_NAME,
        useFindAndModify: false,
    })
    .then((res) => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.log(err);
    });

// use middleware to parse body req to json

// use middleware to enable cors
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(
    express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
// route middleware
app.use('/', mainRouter);

app.get('/settings', function (req, res) {
    res.send('Settings Page');
});

// app.listen(PORT, () => {
//     console.log('server start - ' + PORT);
// });

// Socket.io chat realtime
io.on('connection', (socket) => {
    // MessageModel.find().then(result => {
    //     socket.emit('output-messages', result)
    // })
    // console.log('a user connected: ', socket.id);
    // console.log(socket.id);
    const token = socket.handshake.headers.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.join(`${decoded.id}`);
        } catch (e) {
            console.log('Invalid token', e);
        }
    }
    // socket.emit('message', 'Hello world');
    socket.on('disconnect', () => {});
    socket.on('chatmessage', async (msg) => {
        // console.log(msg.token)
        if (msg.token && msg.receiverId) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.senderId = decoded.id;
                delete msg.token;
                msg.time = new Date();
                data = await chatController.saveMessage(msg);
                if (data !== null) {
                    msg.chatId = data.chatId;
                    msg._id = data.msgId;

                    io.to(`${msg.senderId}`).emit('message', msg);

                    io.to(`${msg.receiverId}`).emit('message', msg);
                }
            } catch (e) {
                console.log(e);
            }
        }
    });

    socket.on('blockers', async (msg) => {
        // console.log(msg.token)
        if (msg.token && msg.receiverId) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.senderId = decoded.id;
                delete msg.token;
                if (msg.type == 'block') {
                    msg.data = await chatController.blockChat(msg);
                } else {
                    msg.data = await chatController.unBlockChat(msg);
                }

                delete msg.chatId;
                if (msg.data !== null) {
                    io.to(`${msg.senderId}`).emit('blockers', msg);
                    io.to(`${msg.receiverId}`).emit('blockers', msg);
                }
            } catch (e) {
                console.log(e);
            }
        }
    });

    socket.on('recallmessage', async (msg) => {
        // console.log(msg.token)
        if (msg.token && msg.receiverId) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.senderId = decoded.id;
                delete msg.token;
                msg.data = await chatController.recallMessage(msg);

                delete msg.chatId;
                if (msg.data !== null) {
                    io.to(`${msg.senderId}`).emit('recallmessage', msg);

                    io.to(`${msg.receiverId}`).emit('recallmessage', msg);
                }
            } catch (e) {
                console.log(e);
            }
        }
    });

    socket.on('seenMessage', async (msg) => {
        // console.log(msg.token)
        if (msg.token && msg.chatId) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.userId = decoded.id;
                delete msg.token;
                await chatController.seenMessage(msg);
            } catch (e) {
                console.log(e);
            }
        }
    });

    // Notification
    socket.on('user_like', async (msg) => {
        const { token, targetId, module } = msg;
        if (token) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.userId = decoded.id;
                delete msg.token;
                const notification = await notificationController.create({
                    targetId,
                    module,
                    action: 'like',
                    senderId: decoded.id,
                });
                const {
                    target,
                    sender,
                    receiver,
                    action,
                    isRead,
                    createdAt,
                    updatedAt,
                } = notification;

                io.to(`${receiver._id}`).emit('notification', notification);
            } catch (e) {
                console.log(e);
            }
        }
    });

    socket.on('user_comment', async (msg) => {
        const { token, targetId, module } = msg;
        if (token) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.userId = decoded.id;
                delete msg.token;
                const notification = await notificationController.create({
                    targetId,
                    module,
                    action: 'comment',
                    senderId: decoded.id,
                });
                const {
                    target,
                    sender,
                    receiver,
                    action,
                    isRead,
                    createdAt,
                    updatedAt,
                } = notification;

                io.to(`${receiver._id}`).emit('notification', notification);
            } catch (e) {
                console.log(e);
            }
        }
    });

    socket.on('user_send_request', async (msg) => {
        const { token, targetId, module } = msg;
        if (token) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.userId = decoded.id;
                delete msg.token;
                const notification = await notificationController.create({
                    targetId,
                    module,
                    action: 'send_request',
                    senderId: decoded.id,
                });
                const {
                    target,
                    sender,
                    receiver,
                    action,
                    isRead,
                    createdAt,
                    updatedAt,
                } = notification;

                io.to(`${receiver._id}`).emit('notification', notification);
            } catch (e) {
                console.log(e);
            }
        }
    });

    socket.on('request_follow_post', async (msg) => {
        const { token, postId } = msg;
        if (token) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.userId = decoded.id;
                delete msg.token;
                socket.join(`${postId}`);
            } catch (e) {
                console.log(e);
            }
        }
    });

    socket.on('request_unfollow_post', async (msg) => {
        const { token, postId } = msg;
        if (token) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.userId = decoded.id;
                delete msg.token;
                socket.leave(`${postId}`);
            } catch (e) {
                console.log(e);
            }
        }
    });

    socket.on('notify_update_post', async (msg) => {
        const { token, postId } = msg;
        if (token) {
            try {
                decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
                msg.userId = decoded.id;
                delete msg.token;
                io.to(`${postId}`).emit('update_post', { postId });
            } catch (e) {
                console.log(e);
            }
        }
    });
});

chatServer.listen(process.env.PORT || PORT, () => {
    console.log('server chat start - ' + process.env.PORT || PORT);
});
