function Run($rootScope, $state, $ionicPlatform, amMoment) {
    $rootScope.$state = $state
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
		$rootScope.tabsHidden = toState.tabsHidden
    })

    $ionicPlatform.ready( () => {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
			cordova.plugins.Keyboard.disableScroll(true)
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault()
		}
	})

	// set moment locale
  	amMoment.changeLocale('zh-cn')
}

Run.$inject = [
	'$rootScope', 
	'$state', 
	'$ionicPlatform', 
	'amMoment', 
]

export default Run