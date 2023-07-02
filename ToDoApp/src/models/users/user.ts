export class User {
        id: String;
        name: String;
        // groups: String[] = [];
        // cardPermissions: String[] = [];
        // propertiesPermissions: String[] = [];
        password:String;
        email:String;

        constructor(id:String, name:String, password:String, email:String){
            this.id = id;
            this.name = name;
            this.password = password;
            this.email = email
        }
    }