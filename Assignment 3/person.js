"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
var Person = /** @class */ (function () {
    function Person(name, email) {
        this._name = name;
        this._email = email;
        this._gatherings = [];
    }
    Object.defineProperty(Person.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "gatherings", {
        get: function () {
            return this.gatherings;
        },
        enumerable: false,
        configurable: true
    });
    Person.prototype.addGathering = function (slug) {
        this._gatherings.push(slug);
    };
    return Person;
}());
exports.Person = Person;
