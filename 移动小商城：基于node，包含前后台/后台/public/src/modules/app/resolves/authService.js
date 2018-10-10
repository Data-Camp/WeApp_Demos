function authService($state, AuthService) {
	return AuthService.isAuthorized()
	.then( data => {
		if (!data) $state.go('web.login')
	})
}

authService.$inject = [
	'$state', 
	'AuthService'
]

export default authService