import { Property } from "./properties";

export class Task {
        title:string;
        properties:Property[];

        constructor(title:string, properties:Property[]) {
            this.title = title;
            this.properties = properties;
          }
    }