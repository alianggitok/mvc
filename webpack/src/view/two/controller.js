// define(function(){
(function(){
	return ['$scope',function($scope){

		$scope.form={
			name:'Form',
			data:{},
			default:function(){
				return {
					name:'1',
					password:'',
					gender:'',
					remember:true
				};
			},
			setDefault:function(){
				$scope.form.data=$scope.form.default();
			},
			submit:function(){
				
			}
		};
		
		$scope.form.setDefault();

	}];

}());
// });
