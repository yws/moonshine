/**
 * @fileOverview EventEmitter class.
 * @author <a href="http://paulcuth.me.uk">Paul Cuthbertson</a>
 */

var luajs = luajs || {};



/**
 * Abstract object that fires events.
 * @constructor
 */
luajs.EventEmitter = function () {
	this._listeners = {};
};




/**
 * Triggers an event.
 * @param {string} name Name of the event.
 * @param {Array} [data = []] Array containing any associated data.
 */
luajs.EventEmitter.prototype._trigger = function (name, data) {
	var listeners = this._listeners[name],
		result,
		i;
		
	if (!listeners) return;
	if (!((data || {}) instanceof Array)) data = [data];
	
	for (i in listeners) {
		result = listeners[i].apply (this, data);
		if (result !== undefined && !result) break;
	}
};




/**
 * Adds an event listener.
 * @param {string} name Name of the event.
 * @param {Function} Callback Listener function.
 */
luajs.EventEmitter.prototype.bind = function (name, callback) {
	if (!this._listeners[name]) this._listeners[name] = [];
	this._listeners[name].push (callback);
}




/**
 * Removes an event listener.
 * @param {string} name Name of the event.
 * @param {Function} Callback Listener function to be removed.
 */
luajs.EventEmitter.prototype.unbind = function (name, callback) {
	for (var i in this._listeners[name]) {
		if (this._listeners[name][i] === callback) this._listeners[name].splice (i, 1);
	}
}
