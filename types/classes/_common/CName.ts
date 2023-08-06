// class that stores a name as firstname and lastname
export default class CName {
    first?: string;
    last?: string;

    toString(): string {
        return this.first + " " + this.last;
    }
}
