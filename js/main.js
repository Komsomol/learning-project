var app = {
	vars:{
		url:'https://www.reddit.com/r/movies.json'
	},

	init:function(){
		// Defining the method for Fetch.
		var method = {
			method:'GET',
		};

		$('.main').css('opacity','0');

		// Using the new FETCH API to get data. Fetch does not support JSONP sources
		fetch(app.vars.url).then(function(response, method){
			console.log(response.status);
			return response.json();
		}).then(function(jsonObject){
			app.injectHTML(jsonObject.data.children);
		});
	},

	// HTML injection will take place here
	injectHTML:function(data){
		var stuff = app.processData(data);

		var html = '<div class="post"><h3 class="name"><%=data.title %></h3><iframe width="640" height="360" src="https://www.youtube.com/embed/<%=app.formatYoutubeURL(data.url)%>?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe> </div>';

		var template = _.template(html);

		// This time we use underscores each method to iterate over all data to render to template
		_.each(stuff, function (stuff) {
			$('.main').append(template(stuff));
		});

		document.querySelector('iframe').onload = function(){
			console.log('iframe loaded');
			$('.main').css('opacity','1');
		};
	},

	// We filter the JSON data response from the Reddit API to get only Youtube embeds
	processData:function(data){
		return data.filter(function(currentValue, index){
			if((currentValue.data.domain == 'youtube.com') || (currentValue.data.domain == 'm.youtube.com') || (currentValue.data.domain == 'youtu.be') ){
				return currentValue.data.media;
			}
		});
	},

	// We want a custom YT Embed code to be used so we strip the URL given by Reddit API
	formatYoutubeURL:function(url){
		// url is https://www.youtube.com/watch?v=N3dJLRfBtu4 
		if(url.length == 43){
			return url.substr(32);
		// url is https://youtu.be/RHtpN0ypQuc
		} else {
			return url.substr(17);
		}
	},

	// Reddit API stores iframe embeds as HTML entities so we decode them using this.
	htmlDecode:function(input){
		var e = document.createElement('div');
		e.innerHTML = input;
		return  e.childNodes[0].nodeValue;
	}
};

window.onload = app.init();