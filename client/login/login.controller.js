/* login-controller.js - all functionality on the login */
(function () {
	'use strict'; 

	
//	angular.module('spx')
//		.controller('loginController', 
//			['$scope', '$location', 'loginFactory',
//			function ($scope, $location, loginFactory) {//

//				$scope.login = function () {//

//					/* Set initial values */
//					$scope.error = false;
//					$scope.disabled = true;
//	
//					/* Call login from service */
//					loginFactory.logIn($scope.loginForm.username, $scope.loginForm.password)//

//						/* Handle if success */
//						.then(function () {
//							$location.path('/');
//							$scope.disabled = false;
//							$scope.loginForm = {};
//						})
//						/* Handle if error occurs */
//						.catch(function () {
//							$scope.error = true;
//							$scope.errorMesssage = "Invalid username and/or password";
//							$scope.disabled = false;
//							$scope.loginForm = {};
//					});
//				};
//			}]);

	angular.module('spx')
		.controller('logOutController',
			['$scope', '$location', '$window', 
			
			function ($scope, $location, $window) {
				$window.localStorage.clear();
				$window.location.href = '/';
		}]);

})();