export class User {
        id: String;
        name: String;
        // groups: String[] = [];
        cardPermissions: String[];
        // propertyPermissions: String[];
        password:String;
        email:String;

        constructor(id:String, name:String, password:String, email:String, cardPermissions:String[], propertyPermissions:String[]){
            this.id = id;
            this.name = name;
            this.password = password;
            this.email = email;
            this.cardPermissions = cardPermissions;
            // this.propertyPermissions = propertyPermissions;
        }
    }