define(['jquery'],function($){
	
	return {
		debug:function(turn){
			if(typeof(turn)==='undefined'){
				turn=true;
			}
			
			function output(method,contents){
				// console.log(method,contents)
				function exec(args){
					this[method](args);
				}
				if(turn){
					exec.apply(console,contents);
				}
			}
			return {
				log:function(){
					output.call(null,'log',arguments);
				},
				error:function(){
					output.call(null,'error',arguments);
				},
				info:function(){
					output.call(null,'info',arguments);
				},
				warn:function(){
					output.call(null,'warn',arguments);
				},
				dir:function(){
					output.call(null,'dir',arguments);
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

