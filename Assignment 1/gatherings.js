"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gatherings = void 0;
var gathering_1 = require("./gathering");
var Gatherings = /** @class */ (function () {
    function Gatherings() {
        this.all_gatherings = [];
        this.all_guests = [];
        this.allSlugs = [];
    }
    //for the addGathering method in the manager class
    //has to check for unique slugs, and returns out of it if there is already the same slug
    //otherwise, just pushes a new gatherings to the all_gatherings list
    Gatherings.prototype.add_gathering = function (title, time, host, slug) {
        for (var _i = 0, _a = this.all_gatherings; _i < _a.length; _i++) {
            var gathering = _a[_i];
            if (gathering.slug === slug) {
                return;
            }
        }
        this.all_gatherings.push(new gathering_1.Gathering(title, time, host, slug));
    };
    Object.defineProperty(Gatherings.prototype, "all_slugs", {
        //for the getGatherings() method in the manager class
        //pushes the slug to the allSlugs list
        //returns the slugs of all of the gathering's slugs
        get: function () {
            this.allSlugs = [];
            for (var i = 0; i < this.all_gatherings.length; i++) {
                this.allSlugs.push(this.all_gatherings[i].slug);
            }
            return this.allSlugs;
        },
        enumerable: false,
        configurable: true
    });
    //for the getGatheringsAttendedByPerson() method in the manager class
    //if the slugs are the same from the add_guests method, returns the guests for that gathering
    //otherwise, just returns an empty list
    Gatherings.prototype.get_guests = function (slug) {
        this.all_guests = [];
        for (var _i = 0, _a = this.all_gatherings; _i < _a.length; _i++) {
            var gathering = _a[_i];
            if (gathering.slug === slug) {
                return this.all_guests;
            }
        }
        return [];
    };
    //for the addPersontoGathering() method in the manager class
    //if the slugs are the same, then the guest's email is pushes to the all_guests list
    //returns out of it, wouldn't work if it wasn't there :\
    Gatherings.prototype.add_guests = function (email, gatheringSlug) {
        for (var _i = 0, _a = this.all_gatherings; _i < _a.length; _i++) {
            var gathering = _a[_i];
            if (gathering.slug === gatheringSlug) {
                this.all_guests.push(email);
            }
        }
        return;
    };
    return Gatherings;
}());
exports.Gatherings = Gatherings;
