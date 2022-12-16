const mongoose = require('mongoose');
const validator = require('validator');
const logger = require('../logger');

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'A User must have a name'],
		},
		lastName: {
			type: String,
			required: [true, 'A User must have a name'],
		},
		email: {
			type: String,
			required: [true, 'A User must have a email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email'],
		},
	},
	{ timestamps: true }
);
userSchema.pre('save', async function (next) {
	logger.log({ level: 'info', message: 'Creating User', label: 'DB' });
	next();
});
userSchema.pre(/^find/, function (next) {
	let message;
	if (this.op === 'find') message = 'Reading All Users';
	if (this.op === 'findOne') message = 'Reading Single User';
	if (this.op === 'findOneAndUpdate') message = 'Updating User';
	if (this.op === 'findOneAndDelete') message = 'Deleting User';
	logger.log({ level: 'info', message: message, label: 'DB' });
	next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
