export class Person {
    
    private _name: string;
    private _email: string;
    private _gatherings: string[];
    
    constructor(name: string, email: string){
        this._name = name;
        this._email = email;
        this._gatherings = [];
    }

    public get email(): string{
        return this._email;
    }
    public get name(): string{
        return this._name;
    }
    public get gatherings(): string[]{
        return this.gatherings;
    }

    public addGathering(slug: string): void{
        this._gatherings.push(slug);
    }
}
