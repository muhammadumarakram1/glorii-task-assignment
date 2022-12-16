const express = require('express');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const errorController = require('./controllers/errorController');
const logger = require('./logger');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res, next) => {
	logger.log({
		level: 'info',
		message: 'Hey',
	});

	res.status(200).json({
		status: 'success',
		message: 'hello',
	});
});

app.use('/users', userRouter);
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorController);

module.exports = app;
