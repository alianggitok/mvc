define(function(){
	return ['$scope',function($scope){
		var formOData={
			name:'',
			password:'',
			gender:'',
			remember:true,
		};

		$scope.formData=formOData;
		
		$scope.form={
			submit:function(){
				
			},
			reset:function(){
				$scope.formData=formOData;
			}
		}
		
		
	}];
});
