export class CardPermissions {
    id: String;
    type: String;
    userId: String;
    
    constructor(id:String, type:String, userId:String){
        this.id = id;
        this.type = type;
        this.userId = userId;

    }
}