export class Property {
    name: string;
    type: string;
    value?: any;
    options: string[];
    visibility: boolean;

    constructor(name:string, type:string, options:string[], visibility:boolean, value?:any){
        this.name = name;
        this.type = type;
        this.options = options;
        this.visibility = visibility; 
        this.value = value; 
    }
}