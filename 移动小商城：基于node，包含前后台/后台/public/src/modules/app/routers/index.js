// routers
import Router from './router'

// run
import Run from './run'

export default 
	angular
		.module('app.router', [])
		.config(Router)
		.run(Run)