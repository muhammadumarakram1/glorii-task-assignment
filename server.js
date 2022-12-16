const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./logger');

const DB = 'mongodb://localhost:27017/test-users';
mongoose.set('strictQuery', true);
mongoose
	.connect(DB)
	.then(() =>
		logger.log({ level: 'info', message: 'DB is Connected', label: 'DB' })
	)
	.catch((err) => logger.log({ level: 'error', message: err, label: 'DB' }));
const port = 5050;

app.listen(port, () => {
	logger.log({
		level: 'info',
		message: `App is running on port: ${port}`,
		label: 'Server',
	});
});
