const notificationController = require('../controllers/Notification');
const { asyncWrapper } = require('../utils/asyncWrapper');
const express = require('express');
const notificationRoutes = express.Router();
const auth = require('../middlewares/auth');

notificationRoutes.get(
    '/list',
    auth,
    asyncWrapper(notificationController.getList)
);

notificationRoutes.patch(
    '/:id/set-read',
    auth,
    asyncWrapper(notificationController.setRead)
);

module.exports = notificationRoutes;
