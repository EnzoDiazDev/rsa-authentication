export default class User {
    public readonly id:string;
    public readonly public_key:string;

    constructor(id:string, public_key:string){
        this.id = id,
        this.public_key = public_key;
    }
}
