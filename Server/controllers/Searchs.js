const ChatModel = require('../models/Chats');
const FriendModel = require('../models/Friends');
const Messages = require('../models/Messages');
const MessagesModel = require('../models/Messages');
const httpStatus = require('../utils/httpStatus');
const UserModel = require('../models/Users');
const PostModel = require('../models/Posts');
const friendController = require('./Friends');
const searchController = {};

searchController.search = async (req, res, next) => {
    try {
        let key = req.params.key;
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        let friendList = [];
        let peopleList = [];
        let messageList = [];
        let friends = await FriendModel.find({
            $and: [
                {
                    $or: [{ sender: userId }, { receiver: userId }],
                },
                { status: '1' },
            ],
        }).populate('messsages');

        let friendIds = [];
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].sender == userId) {
                friendIds.push(friends[i].receiver);
            } else {
                friendIds.push(friends[i].sender);
            }
        }

        friendList = await UserModel.find({
            $and: [
                { _id: { $in: friendIds } },
                {
                    $or: [
                        {
                            username: {
                                $regex: new RegExp(key.split(' ').join('|')),
                                $options: 'i',
                            },
                        },
                        { phonenumber: { $regex: key, $options: 'i' } },
                        {
                            firstName: {
                                $regex: new RegExp(key.split(' ').join('|')),
                                $options: 'i',
                            },
                        },
                        {
                            lastName: {
                                $regex: new RegExp(key.split(' ').join('|')),
                                $options: 'i',
                            },
                        },
                    ],
                },
            ],
        })
            .populate('avatar')
            .limit(10);

        friendIds.push(userId);
        const excludedList = [...user.blocked, ...friendIds];
        peopleList = await UserModel.find({
            $and: [
                { _id: { $nin: excludedList } },
                {
                    $or: [
                        {
                            username: {
                                $regex: new RegExp(key.split(' ').join('|')),
                                $options: 'i',
                            },
                        },
                        { phonenumber: { $regex: key, $options: 'i' } },
                        {
                            firstName: {
                                $regex: new RegExp(key.split(' ').join('|')),
                                $options: 'i',
                            },
                        },
                        {
                            lastName: {
                                $regex: new RegExp(key.split(' ').join('|')),
                                $options: 'i',
                            },
                        },
                    ],
                },
            ],
        })
            .populate('avatar')
            .limit(5);

        let temp = [];

        for (let i = 0; i < peopleList.length; i++) {
            let friendStatus = await friendController.getFriendStatus(
                userId,
                peopleList[i]._id
            );
            let object = {
                gender: peopleList[i].gender,
                blocked_inbox: peopleList[i].blocked_inbox,
                blocked: peopleList[i].blocked,
                _id: peopleList[i]._id,
                phonenumber: peopleList[i].phonenumber,
                username: peopleList[i].username,
                avatar: peopleList[i].avatar,
                cover_image: peopleList[i].avatar,
                firstName: peopleList[i].firstName,
                lastName: peopleList[i].lastName,
                friendStatus: friendStatus,
            };
            temp.push(object);
        }
        peopleList = temp;

        let messages = await MessagesModel.find({
            $and: [
                {
                    $or: [
                        {
                            $and: [
                                { senderId: userId },
                                { receiverId: { $nin: user.blocked } },
                            ],
                        },
                        {
                            $and: [
                                { senderId: { $nin: user.blocked } },
                                { receiverId: userId },
                            ],
                        },
                    ],
                },
                { content: { $regex: key, $options: 'i' } },
            ],
        })
            .populate({
                path: 'senderId',
                model: 'Users',
                populate: {
                    path: 'avatar',
                    model: 'Documents',
                },
            })
            .populate({
                path: 'receiverId',
                model: 'Users',
                populate: {
                    path: 'avatar',
                    model: 'Documents',
                },
            })
            .limit(10);

        for (let i = 0; i < messages.length; i++) {
            let message = {};
            message.content = messages[i].content;
            message.time = messages[i].time;
            message.chatId = messages[i].chatId;
            message.senderId = messages[i].senderId;
            if (messages[i].senderId._id == userId) {
                message['friend'] = messages[i].receiverId;
            } else {
                message['friend'] = messages[i].senderId;
            }

            messageList.push(message);
        }

        let posts = await PostModel.find({
            $and: [
                {
                    $and: [{ author: { $nin: user.blocked } }],
                },
                { described: { $regex: key, $options: 'i' } },
            ],
        })
            .sort([['createdAt', -1]])
            .limit(10)
            .populate('images', ['fileName'])
            .populate({
                path: 'author',
                select: '_id username phonenumber avatar firstName lastName',
                model: 'Users',
                populate: {
                    path: 'avatar',
                    select: '_id fileName',
                    model: 'Documents',
                },
            });

        return res.status(httpStatus.OK).json({
            data: {
                friends: friendList,
                people: peopleList,
                messages: messageList,
                posts,
            },
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
};

module.exports = searchController;
