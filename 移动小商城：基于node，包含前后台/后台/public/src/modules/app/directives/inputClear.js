class inputClear{
    constructor(){
        this.restrict = 'A'
        this.require  = 'ngModel'
    }

    link(scope, element, attrs, ctrl) {
    	let clear = '<i class="input-clear"></i>';
    	let $cl   = angular.element(clear);
    	let lock  = false;

    	function add() {

			if (element.next().hasClass('input-clear')) {
				return false
			}

        	element.parent().append($cl)

        	$cl.on('click', function(event) {
            	event.preventDefault()
            	event.stopPropagation()
            	ctrl.$viewValue = ''
            	element.val('')
            	scope.$apply(function() {
            		ctrl.$setViewValue('')
            	})
            })
		}

        function remove() {
        	let $i = element.parent().find('i');
        	if ($i && $i.hasClass('input-clear')) {
        		$i.remove()
        	}
        }

    	// 获得焦点并且值不为空显示clear按钮
        element.on('focus', function() {
            if (!lock) {
            	lock = true;
            	ctrl.$viewValue !== '' && add()
            }
        })

        // 失去焦点时移除clear按钮
        element.on('blur', function() {
        	if (lock) {
        		lock = false;
        		remove()
        	}
        })

        let $viewValueName = ctrl.$$parentForm.$name + '.' + ctrl.$name + '.$viewValue',
        	$dirty         = ctrl.$$parentForm.$name + "." + ctrl.$name + ".$dirty";
        
        // 监听数据模型变化
        scope.$watch($viewValueName, function (newValue, oldValue) {
            if (newValue) {
            	lock && add()
            } else {
            	remove()
            }
        }, true);
    }
}

export default inputClear