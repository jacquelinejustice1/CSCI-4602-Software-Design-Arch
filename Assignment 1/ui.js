"use strict";
//User Interface for The Gathering Manager
//@author James Church
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = start;
var readlineSync = require("readline-sync"); //for easier repeated prompts
var manager_1 = require("./manager");
/**
 * Function to run the UI
 */
function start() {
    showMainMenu(new manager_1.GatheringManager());
}
/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(em) {
    while (true) { //run until we exit
        console.log("\n  Welcome to the Affair Manager! Pick an option:\n\n  1. Register a new person \n  2. Register a new gathering\n  3. Add a person to a gathering \n  4. List all people.\n  5. List all gatherings.\n  6. List all people who attended a gathering.\n  7. List all gatherings attneded by a person.\n  8. Exit");
        var response = readlineSync.question('> ');
        if (response === '8' || response.slice(0, 2).toLowerCase() === ':q') {
            break; //stop looping, thus leaving method
        }
        switch (response) { //handle each response
            case '1':
                showNewPersonMenu(em);
                break;
            case '2':
                showNewGatheringMenu(em);
                break;
            case '3':
                showAddPersonToGathering(em);
                break;
            case '4':
                showListAllPeople(em);
                break;
            case '5':
                showListAllGatherings(em);
                break;
            case '6':
                showListPeopleWhoAttendGathering(em);
                break;
            case '7':
                showListGatheringsAttendedByPerson(em);
                break;
            //case 8 handled above
            default: console.log('Invalid option!');
        }
        console.log(''); //extra empty line for revisiting
    }
}
/**
 * Show menu to add a new person.
 */
function showNewPersonMenu(em) {
    var people = em.getPeople();
    console.log('Add a new member.');
    var name = readlineSync.question('  Name: ');
    var email = readlineSync.question('  Email: ');
    if (!people.includes(email)) {
        em.addPerson(name, email);
        console.log('Person added!');
    }
    else {
        console.log('Error: This email address already exists in our system.');
    }
}
/**
 * Show menu to add a new gathering.
 */
function showNewGatheringMenu(em) {
    var gatherings = em.getGatherings();
    console.log('Add a new gathering.');
    var title = readlineSync.question('  Title of Gathering: ');
    var time = readlineSync.question('  Time: ');
    var host = readlineSync.question('  Email address of Host: ');
    var slug = readlineSync.question('  Provide a unique slug for this event.');
    if (!gatherings.includes(slug)) {
        em.addGathering(title, time, host, slug);
        console.log('Gathering added!');
    }
    else {
        console.log('Error: This gathering already exists in our system.');
    }
}
/**
 * Show menu to add a person to gathering. Will verify that person and gathering are registered.
 */
function showAddPersonToGathering(em) {
    var gatherings = em.getGatherings();
    var people = em.getPeople();
    console.log('Add a new gathering.');
    var email = readlineSync.question('  Email address of Person: ');
    if (!people.includes(email)) {
        console.log("Error: This email address is unknown to our system.");
        return;
    }
    var slug = readlineSync.question('  Slug of Gathering: ');
    if (!gatherings.includes(slug)) {
        console.log("Error: This slug is unknown to our system.");
        return;
    }
    em.addPersonToGathering(email, slug);
    console.log("This person was added to the gathering.");
}
function showListAllPeople(em) {
    var people = em.getPeople();
    if (people.length == 0) {
        console.log("There are no people registered in the system.");
    }
    if (people.length == 1) {
        console.log("There is one person registered in the system.");
    }
    if (people.length > 1) {
        console.log("There are " + people.length + " people registered in the system.");
    }
    console.log("");
    var i = 1;
    for (var _i = 0, people_1 = people; _i < people_1.length; _i++) {
        var person = people_1[_i];
        console.log("  " + i + ". " + person);
        i += 1;
    }
}
function showListAllGatherings(em) {
    var gatherings = em.getGatherings();
    if (gatherings.length == 0) {
        console.log("There are no gatherings registered in the system.");
    }
    if (gatherings.length == 1) {
        console.log("There is one gathering registered in the system.");
    }
    if (gatherings.length > 1) {
        console.log("There are " + gatherings.length + " gatherings registered in the system.");
    }
    console.log("");
    var i = 1;
    for (var _i = 0, gatherings_1 = gatherings; _i < gatherings_1.length; _i++) {
        var gathering = gatherings_1[_i];
        console.log("  " + i + ". " + gathering);
        i += 1;
    }
}
function showListPeopleWhoAttendGathering(em) {
    var slug = readlineSync.question('  Slug of Desired Gathering: ');
    var people = em.getPeopleAttendingGathering(slug);
    console.log("");
    var i = 1;
    for (var _i = 0, people_2 = people; _i < people_2.length; _i++) {
        var person = people_2[_i];
        console.log("  " + i + ". " + person);
        i += 1;
    }
    console.log(people.length + " person or people total.");
}
function showListGatheringsAttendedByPerson(em) {
    var email = readlineSync.question('  Email of Desired Person: ');
    var gatherings = em.getGatheringsAttendedByPerson(email);
    console.log("");
    var i = 1;
    for (var _i = 0, gatherings_2 = gatherings; _i < gatherings_2.length; _i++) {
        var gathering = gatherings_2[_i];
        console.log("  " + i + ". " + gathering);
        i += 1;
    }
    console.log(gatherings.length + " gathering(s) total.");
}
