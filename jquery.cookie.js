/*
 * jQuery Cookie Plugin 
 * Copyright 2009 Ali Farhadi (http://farhadi.ir/)
 * 
 * Released under the terms of the GNU General Public License.
 * See the GPL for details (http://www.gnu.org/licenses/gpl.html).
 * 
 * To set:
 * $.cookie(name, value, [options])
 * $.cookie(pairs, [options])
 * 
 * To get:
 * $.cookie(name)
 * 
 * To get all:
 * $.cookie()
 * 
 * To delete:
 * $.cookie(name, null, [options])
 * $.cookie(keys, null, [options])
 */
(function($){
	$.cookie = function(name, value, options){
		if (arguments.length < 2 && typeof name != 'object') {
			var result = arguments.length ? null : {};
			$.each(document.cookie.split(';'), function(){
				var cookie = this.match(/^ *(.*?)=(.*)$/);
				if (cookie) {
					try {cookie[1] = decodeURIComponent(cookie[1])} catch(e) {}
					try {cookie[2] = decodeURIComponent(cookie[2])} catch(e) {}
					if (result) result[cookie[1]] = cookie[2];
					else if (cookie[1] == name) {
						result = cookie[2];
						return false;
					}
				}
			});
			return result;
		}
		
		var params = '', data = {};
		
		if (value === null) {
			if (name instanceof Array) {
				$.each(name, function(){
					data[this] = '';
				});
			} else data[name] = '';
			(options = options || {}).expires = new Date(0);
		} else if (typeof name == 'object') {
			data = name;
			options = value;
		} else {
			data[name] = value;
		}
		
		options = $.extend({}, $.cookie.options, options);
		
		if (options.expires) {
			if (!(options.expires instanceof Date)) {
				if (isNaN(Number(options.expires))) {
					options.expires = new Date(options.expires);
				} else {
					var date = new Date(); 
					date.setTime(date.getTime() + options.expires * 1000);
					options.expires = date;
				}
			}
			params += '; expires=' + options.expires.toUTCString();
		}
		if (options.path) params += '; path=' + options.path;
		if (options.domain) params += '; domain=' + (options.domain);
		if (options.secure) params += '; secure';
		
		$.each(data, function(name, value){
			if (value === null) $.cookie(name, value, options);
			else document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + params;
		});
	};
	
	$.cookie.options = {
		expires: null,
		path: '/',
		domain: null,
		secure: false
	};
})(jQuery);