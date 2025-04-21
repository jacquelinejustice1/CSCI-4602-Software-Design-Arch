"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gathering = void 0;
var Gathering = /** @class */ (function () {
    function Gathering(title, time, host, slug) {
        this._title = title;
        this._time = time;
        this._host = host;
        this._slug = slug;
    }
    Object.defineProperty(Gathering.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Gathering.prototype, "get_time", {
        get: function () {
            return this._time;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Gathering.prototype, "host", {
        get: function () {
            return this._host;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Gathering.prototype, "slug", {
        get: function () {
            return this._slug;
        },
        enumerable: false,
        configurable: true
    });
    return Gathering;
}());
exports.Gathering = Gathering;
