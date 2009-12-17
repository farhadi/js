/*
 * jQuery Color Picker
 * Copyright 2009 Ali Farhadi (http://farhadi.ir/)
 * 
 * Released under the terms of the GNU General Public License.
 * See the GPL for details (http://www.gnu.org/licenses/gpl.html).
 */
(function($){
	$.fn.colorPicker = function(options){
		options = $.extend({
			colors: ['#000000','#993300','#333300','#003300','#003366','#000080','#333399','#333333',
			         '#800000','#FF6600','#808000','#008000','#008080','#0000FF','#666699','#808080',
			         '#FF0000','#FF9900','#99CC00','#339966','#33CCCC','#3366FF','#800080','#999999',
			         '#FF00FF','#FFCC00','#FFFF00','#00FF00','#00FFFF','#00CCFF','#993366','#C0C0C0',
			         '#FF99CC','#FFCC99','#FFFF99','#CCFFCC','#CCFFFF','#99CCFF','#CC99FF','#FFFFFF'],
			className: 'colorpicker',
			callback: null,
			element: this,
			input: null
		}, options);
		
		options.element = $(options.element);
		options.input = $(options.input);
		
		var index, trigger = this, container = $('<ul/>').addClass(options.className);
		
		if (options.input.length && options.element.length) {
			options.input.each(function(i){
				options.element.eq(i).css('background', $(this).val());
			}).keyup(function(){
				options.element.eq(options.input.index(this)).css('background', $(this).val());
			});
		}
		
		$.each(options.colors, function(){
			$('<li/>').css('background', this).appendTo(container);
		});
		
		container.hide().appendTo('body').find('li').click(function(){
			var color = options.colors[container.find('li').index(this)];
			options.element.eq(index).css('background', color);
			options.input.eq(index).val(color);
			if (options.callback) {
				options.callback.call(trigger[index], color, index);
			}
		});
		
		this.click(function(event){
			event.stopPropagation();
			index = trigger.index(this);
			var offset = $(this).offset();
			offset.top += $(this).outerHeight();
			container.css(offset).hide().fadeIn('fast');
		});
		
		$(window).click(function(){
			container.fadeOut('fast');
		});
		
		return this;
	};
})(jQuery);