define(['jquery'],function($){
	
	return {
		debug:function(turn){
			if(typeof(turn)==='undefined'){
				turn=true;
			}
			
			function output(method,content){
				if(turn){
					console[method].apply(console,content);
				}
			}
			
			return {
				log:function(){
					output('log',arguments);
				},
				error:function(){
					output('error',arguments);
				},
				info:function(){
					output('info',arguments);
				},
				warn:function(){
					output('warn',arguments);
				},
				dir:function(){
					output('dir',arguments);
				}
			};
		},
		loadScript:function(url,callback){
			$.ajax({
				type: "GET",
				url: url,
				dataType: "script",
				complete:function(res){
					callback(eval(res.responseText));
				}
			});
			
		}
	};
	
});

