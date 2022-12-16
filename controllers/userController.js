const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res) => {
	const features = new APIFeatures(User.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.pagination();
	const users = await features.query;
	res.status(200).json({
		status: 'success',
		results: users.length,
		data: {
			users,
		},
	});
});
exports.createUser = catchAsync(async (req, res, next) => {
	const newUser = await User.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			user: newUser,
		},
	});
});
exports.getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new AppError('No user found with that ID', 404));
	}
	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});
exports.updateUser = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		runValidators: true,
		new: true,
	});
	if (!user) {
		return next(new AppError('No user found with that ID', 404));
	}
	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});
exports.deleteUser = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) {
		return next(new AppError('No user found with that ID', 404));
	}
	res.status(204).json({
		status: 'success',
		data: null,
	});
});
