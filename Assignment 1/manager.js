"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatheringManager = void 0;
//your code goes here!
var people_1 = require("./people");
var gatherings_1 = require("./gatherings");
var GatheringManager = /** @class */ (function () {
    function GatheringManager() {
        this.people = new people_1.People();
        this.gatherings = new gatherings_1.Gatherings();
    }
    GatheringManager.prototype.addPerson = function (name, email) {
        //calling the add_person method from people class
        this.people.add_person(name, email);
    };
    GatheringManager.prototype.addGathering = function (title, time, host, slug) {
        //calling the add_gethering methhod from gatherings class
        this.gatherings.add_gathering(title, time, host, slug);
    };
    GatheringManager.prototype.addPersonToGathering = function (email, gatheringSlug) {
        //calling both add_guests and add_gatherings from people/gathering classes
        this.gatherings.add_guests(email, gatheringSlug);
        this.people.add_gatherings(email, gatheringSlug);
    };
    GatheringManager.prototype.getPeople = function () {
        //returns all people's emails
        return this.people.all_emails;
    };
    GatheringManager.prototype.getGatherings = function () {
        //returns all gathering's slugs
        return this.gatherings.all_slugs;
    };
    GatheringManager.prototype.getPeopleAttendingGathering = function (slug) {
        //returns the guest's email defined by the gathering's slug, from gatherings class
        return this.gatherings.get_guests(slug);
    };
    GatheringManager.prototype.getGatheringsAttendedByPerson = function (email) {
        //returns the gathering's slug defined by the person's email, from the people class
        return this.people.get_gatherings(email);
    };
    return GatheringManager;
}());
exports.GatheringManager = GatheringManager;
