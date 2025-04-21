export class Gathering {
    private _time: string;
    private _title: string;
    private _host: string;
    private _slug: string;
    private _guests: string[];
   
    constructor(title: string, time: string, host: string, slug: string){
        this._title = title;
        this._time = time;
        this._host = host;
        this._slug = slug;
        this._guests = [];
       
    }
    
    public get title(): string{
        return this._title;
    }
    public get get_time(): string{
        return this._time;
    }
    public get host(): string{
        return this._host;
    }
    public get slug(): string{
        return this._slug;
    }
    public get guests(): string[]{
        return this._guests;
    }

    public addGuests(email: string): void{
        this.guests.push(email);
    }
    
}
