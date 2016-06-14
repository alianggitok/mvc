define(['jquery','bootstrap'],function($,bs){
	return {
		translateStatus:function(lang){
			$('.btn[data-trans-lang="'+lang+'"]').addClass('btn-primary').siblings().removeClass('btn-primary');
		},

		loader:function(){
			var loader=$('body>.masker');
			function show(){
				loader.stop(false,true).fadeIn();
			}
			function hide(){
				loader.fadeOut();
			}

			return {
				show:show,
				hide:hide
			};
		}
	};
});
