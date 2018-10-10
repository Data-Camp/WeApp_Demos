class star{
    constructor(){
        this.restrict = 'A';
        this.template = '<ul class="rating" ng-mouseleave="leave()">' +
			        	'<li ng-repeat="star in stars" ng-class="star" on-tap="click($index + 1, $event)" ng-mouseover="over($index + 1)">' +
			        	'<i class="fa fa-star"></i>' +
			        	'</li>' +
			        	'</ul>';
	    this.scope = {
			ratingValue: '=',
			max: '=',
			readonly: '@',
			onHover: '=',
			onLeave: '='
	    }

	    this.controller = ['$scope', function($scope){
			$scope.ratingValue = $scope.ratingValue || 0; //点亮星星个数
			$scope.max = $scope.max || 5; //星星最大个数

			//点击更新点亮星星个数
			$scope.click = function(val, $event){
				$event.preventDefault();
				$event.stopPropagation();
				if ($scope.readonly && $scope.readonly === 'true') {
					return;
				}
				$scope.ratingValue = val;
				console.log($event)
			};

			//鼠标进入
			$scope.over = function(val){
				$scope.onHover(val);
			};

			//鼠标移开
			$scope.leave = function(){
				$scope.onLeave();
			}
	    }]
    }

    link(scope, elem, attrs) {

    	//更新视图
	    var updateStars = function () {
			scope.stars = [];
			for (var i = 0; i < scope.max; i++) {
				scope.stars.push({
					filled: i < scope.ratingValue
				});
			}
			
	    };
     	updateStars();
 		
 		//监听点亮星星个数，更新视图
		scope.$watch('ratingValue', function (oldVal, newVal) {
			if (newVal) {
				updateStars();
			}
		});

		//监听星星最大个数，更新视图
		scope.$watch('max', function (oldVal, newVal) {
			if (newVal) {
				updateStars();
			}
		});
    }
}

export default star;