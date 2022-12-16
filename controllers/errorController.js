const logger = require('../logger');
const AppError = require('../utils/appError');

const sendError = (err, res) => {
	logger.log({
		level: 'error',
		message: err.message,
		status: err.status,
		statusCode: err.statusCode,
	});
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
};

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	console.log(err.keyValue);
	const value = Object.keys(err.keyValue);
	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
	console.log(err);
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errors.join('. ')}`;
	return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
	console.log(err);
	let error = { ...err };
	error.statusCode = error.statusCode || 500;
	error.status = error.status || 'error';
	error.message = error._message || 'Something went wrong';
	if (error.name === 'CastError') error = handleCastErrorDB(error);
	if (error.code === 11000) error = handleDuplicateFieldsDB(error);
	if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
	sendError(error, res);
};
