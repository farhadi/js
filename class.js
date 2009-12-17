/*
 * JavaScript Inheritance
 * Copyright (c) 2009 Ali Farhadi (http://farhadi.ir/)
 * 
 * Released under the terms of the GNU General Public License.
 * See the GPL for details (http://www.gnu.org/licenses/gpl.html).
 * 
 * Based on John Resig's Simple JavaScript Inheritance
 */

(function(){
	var initializing = false;
	
	// The base Class implementation (does nothing)
	this.Class = function(){};
	
	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;
		
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			prototype[name] = prop[name];
		}
		
		// The dummy class constructor
		function Class() {
			if (!initializing) {
				if (!(this instanceof Class)) {
					//When a class is used as a function, self function will be called (if defined) 
					return Class.self ? Class.self.apply(this, arguments) : null;
				}
					
				var _this = this;
				var parent = this.parent = {};
				var parentClass = Class.parent;
				
				// Creating parent methods
				while (true) {
					for (key in parentClass.prototype) if (typeof parentClass.prototype[key] == 'function') {
						parent[key] = (function(key, parentClass){
							return function(){
								var tmp = _this.parent;
								_this.parent = _this.parent.parent; 
								parentClass.prototype[key].apply(_this, arguments);
								_this.parent = tmp;
							};
						})(key, parentClass);
					}
					if (!parentClass.parent) break; 
					parentClass = parentClass.parent;
					parent = parent.parent = {};
				}
				
				// Enforce the constructor to be what we expect
				this.constructor = Class;
				
				// All construction is actually done in the init method
				if (this.init) this.init.apply(this, arguments);
			}
		}
		
		// Preserve parent class
		Class.parent = this;
		
		// Populate our constructed prototype object
		Class.prototype = prototype;
		
		// And make this class extendable
		Class.extend = arguments.callee;
		
		return Class;
	};
})();