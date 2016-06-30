angular.module('app.controllers', [])
     
.controller('page4Ctrl', function($scope) {
	$scope.roomState = {};
	$scope.roomState['13-1'] = "사용중";
})

.controller('LoginPageCtrl', ['$window', '$rootScope', '$scope', '$state', 'LoginService', function($window, $rootScope, $scope, $state, LoginService) {
	
	$scope.login = function (user) {
		console.log(user);
		LoginService.login(user)
		.success(function (response) {
			$state.go('menu.dashboard');
			$window.location.reload(true);
		});
	};
	
}])

.controller('SideMenuCtrl', ['$window', '$rootScope', '$scope', '$state', 'ChartService', 'LoginService', function($window, $rootScope, $scope, $state, ChartService, LoginService) {
	$rootScope.loginState = false;
	
	$scope.getCategoryList = function () {
		ChartService.getCategoryList()
		.success(function(data, status) {
			console.log("response : ", data, status);
			$scope.categoryList = data;
			$rootScope.loginState = true;
		});
	};
	
	$scope.logout = function() {
		LoginService.logout()
		.success(function() {
			$rootScope.loginState = false;
			$rootScope.username = null;
			$scope.categoryList = null;
			
			$state.go('menu.login');
			//$window.location.reload(true);
		});
	};
	
	$scope.init =  function() {
		return LoginService.getUserInfo()
			   .success(function(user) {
				  console.log("getUserInfo response : ", user);
				  
				  if (user && user != "") {
					  $rootScope.loginState = true;
					  $rootScope.username = user;
					  $scope.getCategoryList();
				  } else {
					  $state.go('menu.login');
				  }
				  return;
			   });
		;
	};
	
//	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
//		console.log("on $stateChangeSuccess : SideMenuCtrl ", toState, toParams);
//		
//		if (toState.name == "menu.login" && $rootScope.loginState == true) {
//			$state.go('menu.dashboard');
//		}
//	});
	
	$scope.init();
}]);
 