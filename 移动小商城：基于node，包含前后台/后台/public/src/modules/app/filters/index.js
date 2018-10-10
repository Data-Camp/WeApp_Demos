// filters
import to_trusted from './to_trusted'

export default 
	angular
		.module('app.filter', [])
		.filter('to_trusted', to_trusted)