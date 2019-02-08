class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name) {
        this.users.push({ id, name });
    }
}