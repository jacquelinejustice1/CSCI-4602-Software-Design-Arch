"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.People = void 0;
var person_1 = require("./person");
var People = /** @class */ (function () {
    function People() {
        this.allPeople = [];
        // this.all_gatherings_by_person = [];
        this.allEmails = [];
    }
    //for addPerson() method in manager class
    //pushes new Person object to the allPeople list
    People.prototype.add_person = function (name, email) {
        this.allPeople.push(new person_1.Person(name, email));
    };
    Object.defineProperty(People.prototype, "all_emails", {
        //for allPeople() method in manager class
        //pushes the email to the allEmails list
        //returns the emails of all people registered
        get: function () {
            this.allEmails = [];
            for (var i = 0; i < this.allPeople.length; i++) {
                this.allEmails.push(this.allPeople[i].email);
            }
            return this.allEmails;
        },
        enumerable: false,
        configurable: true
    });
    //for getGatheringsAttendedByPerson() method in manager class
    //returns all of the gathering's slugs from the add_gathering method below if the emails match
    //otherwise returns an empty list if the email doesn't match
    People.prototype.get_gatherings = function (email) {
        for (var _i = 0, _a = this.allPeople; _i < _a.length; _i++) {
            var person = _a[_i];
            if (person.email === email) {
                return person.gatherings;
            }
        }
        return [];
    };
    //for the addPersonToGathering() method, just to get the values for the email 
    //and gatheringSlug to be about to add the slug to the all_gatherings_by_person list
    //returns out of it at the end, wouldn't work if it wasn't there :\
    People.prototype.add_gatherings = function (email, gatheringSlug) {
        for (var _i = 0, _a = this.allPeople; _i < _a.length; _i++) {
            var person = _a[_i];
            if (person.email === email) {
                //this.all_gatherings_by_person.push(gatheringSlug); 
                person.addGathering(gatheringSlug);
            }
        }
        return;
    };
    return People;
}());
exports.People = People;
