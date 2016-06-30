angular.module('app.services', [])

.factory('ChartService', ['$http', '$q', function($http, $q){
	
	return {
		
		getCategoryList : function() {
			console.log('call getCategoryList');
			return $http.get('/icms-app-statistics-web/chart/');
		},
		
		getChartList : function(categoryId) {
			console.log('call getChartList : ', categoryId);
			return $http.get('/icms-app-statistics-web/chart/' + categoryId);
		},
		
		getChartData : function(categoryId, chartId, userParams) {
			console.log('call getChartData : ' , categoryId, " / ", chartId, "userParams : ", userParams);
			return $http.get('/icms-app-statistics-web/chart/' + categoryId + '/' + chartId, { params : userParams });
		}
	};
}])

.factory('AnalysisService', ['$http', '$q', 'CommonService', function($http, $q, commonService){
		
	return {
		
		getRankAppReport : function(chartUrl, start, number) {
			return $http.get('/icms-app-statistics-web/analysis/googleRankApp?chartUrl=' + chartUrl + "&start=" + start + "&number=" + number);
		},
		
		downloadRankAppReport : function(categoryList, chartUrl, number) {
			
			var chartUrlList = "";
			categoryListParam = categoryList.forEach( 
				function (item) {
					chartUrlList += "&chartUrlList=" + item.url + chartUrl;
				}
			); 
			console.log('/icms-app-statistics-web/analysis/googleRankApp/excel?' + "number=" + number + chartUrlList);
			
			commonService.saveFile('/icms-app-statistics-web/analysis/googleRankApp/excel?' + "number=" + number + chartUrlList);
			//return $http.get('/icms-app-statis\tics-web/analysis/googleRankApp/excel?' + "number=" + number + chartUrlList);
		},
		
		updateRankAppReport : function(chartUrl) {
			return $http.post('/icms-app-statistics-web/analysis/googleRankApp', "chartUrl=" + chartUrl, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
		},
		
		getSingleRankAppReport : function(packageName) {
			return $http.get('/icms-app-statistics-web/analysis/googleSingleApp?packageName=' + packageName);
		},
		
		linkApp : function(cid, packageName) {
			return $http.post('/icms-app-statistics-web/analysis/linkApp/' + cid, { packageName : packageName } );
		},
		
		unLinkApp : function(cid) {
			return $http.delete('/icms-app-statistics-web/analysis/linkApp/' + cid);
		}
		
	};
}]);

