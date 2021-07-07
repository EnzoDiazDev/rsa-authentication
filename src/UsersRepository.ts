import User from "./User";

// Simulates a user database
class UsersRepository {
    private db = new Map<string, User>();

    public get_user(id:string):User|null {
        return this.db.get(id) || null;
    }

    public get_users():User[] {
        return Array.from(this.db.values());
    }

    public add_user(user:User):void {
        if(this.db.has(user.id)) throw new Error("this user already exists");
        this.db.set(user.id, user);
    }

    public remove_user(user:User):void {
        this.db.delete(user.id);
    }
}

/* repository simplification */
export default new UsersRepository();

