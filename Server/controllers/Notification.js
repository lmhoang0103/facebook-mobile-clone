const { connection } = require('mongoose');
const NotificationModel = require('../models/Notification');
const httpStatus = require('../utils/httpStatus');
const PostModel = require('../models/Posts');
const PostCommentModel = require('../models/PostComment');
const FriendModel = require('../models/Friends');

const { NOTIFICATION_MODULE } = require('../constants/constants');
const { ObjectId } = require('mongodb');

const notificationController = {};

notificationController.create = async ({
    targetId,
    module,
    action,
    senderId,
}) => {
    let receiverId;
    let target;

    const existedNotification = await NotificationModel.findOne({
        target: new ObjectId(targetId),
        module,
        action,
        sender: new ObjectId(senderId),
    });

    if (existedNotification) {
        existedNotification.updatedAt = Date.now();
        existedNotification.isRead = false;
        await existedNotification.save();
        const notification = await NotificationModel.findById(
            existedNotification._id
        )
            .populate('sender')
            .populate('receiver')
            .populate('target');
        return notification;
    }

    switch (module) {
        case NOTIFICATION_MODULE.POST:
            target = await PostModel.findById(targetId);
            receiverId = target.author;
            break;
        case NOTIFICATION_MODULE.COMMENT:
            target = await PostCommentModel.findById(targetId);
            receiverId = target.user;
            break;
        case NOTIFICATION_MODULE.FRIEND:
            target = await FriendModel.findOne({
                sender: senderId,
                receiver: targetId,
            });
            receiverId = target.receiver;
            break;
    }

    if (!receiverId) throw new Error('Invalid receiverId');

    const body = {
        target: target._id,
        module,
        action,
        sender: senderId,
        receiver: receiverId,
    };

    const createdNotification = await NotificationModel.create(body);
    const notification = await NotificationModel.findById(
        createdNotification._id
    )
        .populate('sender')
        .populate('receiver')
        .populate('target');
    return notification;
};

notificationController.getList = async (req, res, next) => {
    try {
        const userId = req.userId;
        const notificationList = await NotificationModel.find({
            receiver: userId,
            sender: {
                $ne: userId,
            },
        })
            .sort([['updatedAt', -1]])
            .populate({
                path: 'sender',
                select: '_id username phonenumber avatar firstName lastName',
                model: 'Users',
                populate: {
                    path: 'avatar',
                    select: '_id fileName',
                    model: 'Documents',
                },
            })
            .populate({
                path: 'receiver',
                select: '_id username phonenumber avatar firstName lastName',
                model: 'Users',
                populate: {
                    path: 'avatar',
                    select: '_id fileName',
                    model: 'Documents',
                },
            })
            .populate('target');
        return res.status(httpStatus.OK).json({
            data: notificationList,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
};

notificationController.setRead = async (req, res, next) => {
    try {
        const notificationId = req.params.id;

        const notification = await NotificationModel.findByIdAndUpdate(
            notificationId,
            { isRead: true }
        );
        return res.status(httpStatus.OK).json({
            data: notification,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
};

module.exports = notificationController;
