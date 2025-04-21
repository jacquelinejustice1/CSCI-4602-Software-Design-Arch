//your code goes here!
import {People} from './people';
import {Gatherings} from './gatherings';

export class GatheringManager {
    people: People;
    gatherings: Gatherings;

    constructor() {
        this.people = new People();
        this.gatherings = new Gatherings();
    }

    addPerson(name: string, email: string) {
        //calling the add_person method from people class
         this.people.add_person(name,email);
    }

    addGathering(title: string, time: string, host: string, slug: string) {
        //calling the add_gethering methhod from gatherings class
        this.gatherings.add_gathering(title,time,host,slug);
    }

    addPersonToGathering(email: string, gatheringSlug: string) {
        //calling both add_guests and add_gatherings from people/gathering classes
        this.gatherings.add_guests(email, gatheringSlug);
        this.people.add_gatherings(email, gatheringSlug);
    }

    getPeople(): string[] {
        //returns all people's emails
       return this.people.all_emails;
    }

    getGatherings(): string[] {
        //returns all gathering's slugs
        return this.gatherings.all_slugs;
    }

    getPeopleAttendingGathering(slug: string): string[] {
        //returns the guest's email defined by the gathering's slug, from gatherings class
        return this.gatherings.get_guests(slug);
       
    }

    getGatheringsAttendedByPerson(email: string): string[] {
        //returns the gathering's slug defined by the person's email, from the people class
        return this.people.get_gatherings(email); 
    }

}
