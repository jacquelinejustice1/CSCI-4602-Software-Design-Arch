import {Gathering} from './gathering';

export class Gatherings {
    private all_gatherings: Gathering[];
   // private all_guests: string[];
    private allSlugs: string[];
    
    constructor(){
        this.all_gatherings = [];
      //  this.all_guests = [];
        this.allSlugs = [];
    }

    //for the addGathering method in the manager class
    //has to check for unique slugs, and returns out of it if there is already the same slug
    //otherwise, just pushes a new gatherings to the all_gatherings list
    public add_gathering(title: string, time: string, host: string, slug: string): void{
          for (let gathering of this.all_gatherings) {
            if (gathering.slug === slug) {
                return; 
            }
        }
        this.all_gatherings.push(new Gathering(title, time, host, slug));
                
    }

    //for the getGatherings() method in the manager class
    //pushes the slug to the allSlugs list
    //returns the slugs of all of the gathering's slugs
    public get all_slugs(): string[]{
        this.allSlugs = [];
        for(let i = 0; i < this.all_gatherings.length; i++){
            this.allSlugs.push(this.all_gatherings[i].slug);
        }
        return this.allSlugs;
    }

    //for the getGatheringsAttendedByPerson() method in the manager class
    //if the slugs are the same from the add_guests method, returns the guests for that gathering
    //otherwise, just returns an empty list
    public get_guests(slug: string): string[]{
        for (let gathering of this.all_gatherings) {
             if (gathering.slug === slug) {
                return gathering.guests; 
            }
        }
        return [];
    }

    //for the addPersontoGathering() method in the manager class
    //if the slugs are the same, then the guest's email is pushes to the all_guests list
    //returns out of it, wouldn't work if it wasn't there :\
    public add_guests(email: string, gatheringSlug: string) : void{
        for (let gathering of this.all_gatherings) {
            if (gathering.slug === gatheringSlug) {
                gathering.addGuests(email);
            }
        }
        return;   
    } 

}
