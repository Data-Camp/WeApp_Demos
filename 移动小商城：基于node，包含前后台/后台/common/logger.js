import log4js from 'log4js'

log4js.configure({
	appenders: [
		{ 
			type: 'console', 
		},
		{
			type      : 'file', 
			filename  : 'logs/access.log', 
			maxLogSize: 1024,
			backups   : 4,
			category  : 'normal', 
		},
	],
	replaceConsole: true,
})

export default function(name){
	const logger = log4js.getLogger(name)
	logger.setLevel('INFO')
	return logger
}