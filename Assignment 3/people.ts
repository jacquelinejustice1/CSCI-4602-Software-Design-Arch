import {Person} from './person';

export class People {
    private allPeople: Person[];
   // private all_gatherings_by_person: string[];
    private allEmails: string[];
   
    constructor(){
        this.allPeople = [];  
       // this.all_gatherings_by_person = [];
        this.allEmails = [];
    }
    
    //for addPerson() method in manager class
    //pushes new Person object to the allPeople list
    public add_person(name: string, email: string): void{
        this.allPeople.push(new Person(name, email));
    }
    
    //for allPeople() method in manager class
    //pushes the email to the allEmails list
    //returns the emails of all people registered
    public get all_emails(): string[]{
        this.allEmails = [];
        for(let i = 0; i < this.allPeople.length; i++){
            this.allEmails.push(this.allPeople[i].email);
        }
        return this.allEmails;

    }

    //for getGatheringsAttendedByPerson() method in manager class
    //returns all of the gathering's slugs from the add_gathering method below if the emails match
    //otherwise returns an empty list if the email doesn't match
    public get_gatherings(email: string): string[]{
        for (let person of this.allPeople) { 
            if (person.email === email) { 
                return person.gatherings; 
            }
        }
        return [];
    }

    //for the addPersonToGathering() method, just to get the values for the email 
    //and gatheringSlug to be about to add the slug to the all_gatherings_by_person list
    //returns out of it at the end, wouldn't work if it wasn't there :\
    public add_gatherings(email: string, gatheringSlug: string) : void{
        for (let person of this.allPeople) {
            if (person.email === email) {
                //this.all_gatherings_by_person.push(gatheringSlug); 
                person.addGathering(gatheringSlug);
            }
        }
        return;
    } 

}
