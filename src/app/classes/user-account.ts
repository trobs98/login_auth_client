export class UserAccount {
    private firstName: string;
    private lastName: string;
    private email: string;

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    getName(): string {
        return this.firstName + this.lastName;
    }

    getEmail(): string {
        return this.email;
    }
}
