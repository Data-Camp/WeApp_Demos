// register
import register from 'helpers/register'

// directives
import tabset from './tabset'
import tab from './tab'
import filemodel from './filemodel'
import star from './star'
import image404 from './image404'
import inputClear from './inputClear'
import skyvowBtn from './btn'
import ellipsisH from './ellipsisH'
import promptMessage from './message'

export default 
	angular
		.module('app.directive', [])


    register('app.directive')
    	.directive('tabset', tabset)
	    .directive('tab', tab)
	    .directive('fileModel', filemodel)
	    .directive('star', star)
	    .directive('image404', image404)
	    .directive('inputClear', inputClear)
	    .directive('skyvowBtn', skyvowBtn)
	    .directive('ellipsisH', ellipsisH)
	    .directive('promptMessage', promptMessage)