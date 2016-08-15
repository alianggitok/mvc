define(['jquery'],function($){

	//配置
	function config(validationProvider){
		
		var successClass='has-feedback has-success',
			errorClass='has-feedback has-error',
			successIcon='<span class="glyphicon glyphicon-ok form-control-feedback"></span>',
			errorIcon='<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
			
		validationProvider.showSuccessMessage = false;
		validationProvider.showErrorMessage = true;
		
		validationProvider.validCallback=function(element){
			$(element).closest('.form-group').removeClass(errorClass).addClass(successClass);
		};
		validationProvider.invalidCallback=function(element){
			$(element).closest('.form-group').removeClass(successClass).addClass(errorClass);
		};
		validationProvider.resetCallback = function(element) {
            $(element).closest('.form-group').removeClass(successClass+' '+errorClass);
        };
		
		validationProvider.setSuccessHTML(function(msg,element,attrs) {
			return successIcon+'<span class="control-label">' + msg + '</span>';
		});
		validationProvider.setErrorHTML(function(msg) {
			return errorIcon+'<span class="control-label">' + msg + '</span>';
		});
		validationProvider.addMsgElement = function(element) {
            $(element).after('<span></span>');
        };
	}

	return {
		config:config
	};


});
