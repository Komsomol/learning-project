var app = {
	vars:{
		url:'https://www.reddit.com/r/movies.json'
	},

	init:function(){
		var method = {
			method:'GET',
		};

		fetch(app.vars.url).then(function(response, method){
			console.log(response.status);
			return response.json();
		}).then(function(jsonObject){
			console.log(jsonObject.data.children);
			app.processData(jsonObject.data.children);
		});
	},

	processData:function(data){
		var youtubeData = data.reduce(function(previous, current){
			// console.log(current.data.domain);
			if((current.data.domain == 'youtube.com') || (current.data.domain == 'm.youtube.com') || (current.data.domain == 'youtu.be') ){
				console.log(current.data.media);
				console.log(current.data.media.oembed.thumbnail_url);
				console.log(current.data.media.oembed.html);
				$('.main').append('<img src='+current.data.media.oembed.thumbnail_url+' />' + '<br>' + current.data.media.oembed.html.toString());
			}
		});


	}
};

window.onload = app.init();