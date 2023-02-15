const express = require('express');
const apiRoutes = require('./api');
const path = require('path');

const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    res.sendStatus(200);
});
mainRouter.use('/api/v1', apiRoutes);
mainRouter.use('/files/', express.static(path.join(__dirname, '../files')));

module.exports = mainRouter;
