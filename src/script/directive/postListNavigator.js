/**
 * Author: csdoker
 * CreateTime: 2017/12/30
 * Tips: main-列表分页指令模块
 */
BlogApp.directive('appPostListNavigator', ['$http', '$stateParams', function($http, $stateParams) {
	return {
		templateUrl: 'view/template/postListNavigator.html',
		restrict: 'ECAM',
		replace: true,
		controller: function($scope) {
			$http({
		        method: 'GET',
		        url: 'http://localhost:3000/api/postcount'
		    }).then(function(response) {
		    	// 最多可选分页按钮 其余按钮被省略
		    	var maxPageLink = 5;
		    	// 每页显示文章数
		    	var perPageCount = 5;
		    	// 获取文章总数
		        var totalPost = response.data.postcount;
		        // 获取当前页数
		        $scope.currentPage = $stateParams.page === undefined ? 1 : parseInt($stateParams.page);
		        // 获取上一页
		        $scope.prePage = $scope.currentPage - 1;
		        // 获取下一页
		        $scope.nextPage = $scope.currentPage + 1;
		        // 求出总页数
		        var totalPage;
		        if (totalPost % perPageCount === 0) {
		        	totalPage = totalPost / perPageCount;
		        } else {
		        	totalPage = (totalPost - totalPost % perPageCount) / perPageCount + 1;
		        }
		    	// 判断是否显示分页上一步按钮
	            $scope.isShowPre = false;
	            if ($scope.currentPage > 1 && totalPage > 5) {
	                $scope.isShowPre = true;
	            } else {
	                $scope.isShowPre = false;
	            }
	            // 判断是否显示分页下一步按钮
	            $scope.isShowNext = false;
	            if (totalPage - $scope.currentPage > 4) {
	            	$scope.isShowNext = true;
	            } else {
	            	$scope.isShowNext = false;
	            }
	            // 求出所有页码
	            $scope.pageIndexs = [];
	            for (var i = 1; i < totalPage + 1; i++) {
	            	$scope.pageIndexs.push(i);
	            }
	            if ($scope.currentPage > 1 && totalPage > 5) {
	            	if (totalPage - $scope.currentPage < 4) {
	            		$scope.pageIndexs = $scope.pageIndexs.slice(totalPage - 5, totalPage);
	            	} else {
	            		$scope.pageIndexs = $scope.pageIndexs.slice($scope.currentPage - 1, $scope.currentPage + 4);
	            	}
	            } else {
	            	$scope.pageIndexs = $scope.pageIndexs.slice(0, 5);
	            }
		    }, function(response) {
		        // 请求失败执行代码
		        console.log('request failed');
		    });
		},
		link: function($scope) {
			
		}
	};
}]);
