//User Interface for The Gathering Manager
//@author James Church

import readlineSync = require('readline-sync'); //for easier repeated prompts
import {GatheringManager} from './manager';

/**
 * Function to run the UI
 */
export function start() {
  showMainMenu(new GatheringManager());
}

/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(em:GatheringManager) {
  while(true){ //run until we exit
    console.log(`
  Welcome to the Affair Manager! Pick an option:

  1. Register a new person 
  2. Register a new gathering
  3. Add a person to a gathering 
  4. List all people.
  5. List all gatherings.
  6. List all people who attended a gathering.
  7. List all gatherings attneded by a person.
  8. Exit`);

    let response = readlineSync.question('> ')
    if(response === '8' || response.slice(0,2).toLowerCase() === ':q'){
      break; //stop looping, thus leaving method
    }

    switch(response) { //handle each response
      case '1': showNewPersonMenu(em); break;
      case '2': showNewGatheringMenu(em); break;
      case '3': showAddPersonToGathering(em); break;
      case '4': showListAllPeople(em); break;
      case '5': showListAllGatherings(em); break;
      case '6': showListPeopleWhoAttendGathering(em); break;
      case '7': showListGatheringsAttendedByPerson(em); break;
      //case 8 handled above
      default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
  }
}

/**
 * Show menu to add a new person.
 */
function showNewPersonMenu(em:GatheringManager) {
  let people: string[] = em.getPeople(); 
  
  console.log('Add a new member.');
  let name:string = readlineSync.question('  Name: ');
  let email:string = readlineSync.question('  Email: ');

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
function showNewGatheringMenu(em:GatheringManager) {
  let gatherings: string[] = em.getGatherings();

  console.log('Add a new gathering.');
  let title:string = readlineSync.question('  Title of Gathering: ');
  let time:string = readlineSync.question('  Time: ');
  let host:string = readlineSync.question('  Email address of Host: ');
  let slug:string = readlineSync.question('  Provide a unique slug for this event.');

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
function showAddPersonToGathering(em:GatheringManager) {
  let gatherings: string[] = em.getGatherings(); 
  let people: string[] = em.getPeople();

  console.log('Add a new gathering.');
  let email:string = readlineSync.question('  Email address of Person: ');

  if (!people.includes(email)) {
      console.log("Error: This email address is unknown to our system.");
      return;
  }

  let slug:string = readlineSync.question('  Slug of Gathering: ');

  if (!gatherings.includes(slug)) {
      console.log("Error: This slug is unknown to our system.");
      return;
  }

  em.addPersonToGathering(email, slug);
  console.log("This person was added to the gathering.");
}

function showListAllPeople(em: GatheringManager) {
  let people: string[] = em.getPeople();

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

  let i = 1;
  for (let person of people) {
      console.log("  " + i + ". " + person);
      i += 1;
  }
}

function showListAllGatherings(em: GatheringManager) {
  let gatherings: string[] = em.getGatherings(); 

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

  let i = 1;
  for (let gathering of gatherings) {
      console.log("  " + i + ". " + gathering);
      i += 1;
  }

}

function showListPeopleWhoAttendGathering(em: GatheringManager) {
  let slug:string = readlineSync.question('  Slug of Desired Gathering: ');

  let people = em.getPeopleAttendingGathering(slug);

  console.log("");

  let i = 1;
  for (let person of people) {
      console.log("  " + i + ". " + person);
      i += 1;
  }

  console.log(people.length + " person or people total.");
}

function showListGatheringsAttendedByPerson(em: GatheringManager) {
  let email:string = readlineSync.question('  Email of Desired Person: ');

  let gatherings: string[] = em.getGatheringsAttendedByPerson(email); 

  console.log("");

  let i = 1;
  for (let gathering of gatherings) {
      console.log("  " + i + ". " + gathering);
      i += 1;
  }

  console.log(gatherings.length + " gathering(s) total.");
}
 
