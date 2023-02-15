const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    target: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'module',
    },
    module: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
});
notificationSchema.set('timestamps', true);
module.exports = mongoose.model('Notification', notificationSchema);
