const { format, createLogger, transports } = require('winston');
const { timestamp, combine, simple } = format;

const logger = createLogger({
	level: 'info',
	format: combine(timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.json()),
	transports: [
		new transports.File({
			filename: 'logs/error.log',
			level: 'error',
		}),
		new transports.File({ filename: 'logs/combined.log' }),
		new transports.Console({ format: simple() }),
	],
});
module.exports = logger;
