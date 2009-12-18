/*
 * jQuery Image Picker
 * Copyright 2009 Ali Farhadi (http://farhadi.ir/)
 * 
 * Released under the terms of the GNU General Public License.
 * See the GPL for details (http://www.gnu.org/licenses/gpl.html).
 */
(function($){
	$.fn.imagePicker = function(options){
		options = $.extend({
			images: [],
			imagePath: '',
			thumbPath: options.imagePath || '',
			className: 'imagepicker',
			callback: null,
			element: this,
			input: null
		}, options);
		
		options.element = $(options.element);
		options.input = $(options.input);
		
		var index, trigger = this, container = $('<ul/>').addClass(options.className);
		
		$.each(options.images, function(){
			$('<img/>').attr('src', options.thumbPath + this).appendTo($('<li/>').appendTo(container));
		});
		
		container.hide().appendTo('body').find('img').click(function(){
			var image = options.images[container.find('img').index(this)];
			options.element.eq(index).attr('src', options.imagePath + image);
			options.input.eq(index).val(image);
			if (options.callback) {
				options.callback.call(trigger[index], image, index);
			}
		});
		
		this.click(function(event){
			event.stopPropagation();
			index = trigger.index(this);
			var offset = $(this).offset();
			offset.top += $(this).outerHeight();
			container.css(offset).hide().fadeIn('fast');
		});
		
		$(window.document).click(function(){
			container.fadeOut('fast');
		});
		
		return this;
	};
})(jQuery);